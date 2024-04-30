import { useEffect, useState } from 'react';
import { scValToNative } from '@stellar/stellar-sdk';
import { UseFormReturn } from 'react-hook-form';

import BN from 'src/utils/BN';
import timeout from 'src/utils/timeout';
import toast from 'src/components/CToast';
import approve from 'src/features/soroban/approve';
import { useAppSelector } from 'src/hooks/useRedux';
import humanizeAmount from 'src/utils/humanizeAmount';
import CProcessModal from 'src/components/CProcessModal';
import CModalSuccess from 'src/components/CModalSuccess';
import { FLUXITY_CONTRACT } from 'src/constants/contracts';
import toDecimals from 'src/utils/createLockup/toDecimals';
import { ExternalPages } from 'src/constants/externalPages';
import createLockup from 'src/features/soroban/createLockup';
import signTransaction from 'src/utils/soroban/signTransaction';
import { FormValues, operationType } from 'src/containers/CreateLockup';
import DoubleButtonModal from 'src/components/DoubleButtonModal';
import SingleButtonModal from 'src/components/SingleButtonModal';
import sendTransaction from 'src/features/soroban/sendTransaction';
import ApproveFormModal from 'src/containers/Modals/ApproveFormModal';
import { calculateTotalAmount } from 'src/utils/calculateTotalAmount';
import getERC20Allowance from 'src/features/soroban/getERC20Allowance';
import informCreateLockupAPI from 'src/features/informCreateLockupAPI';
import finalizeTransaction from 'src/utils/soroban/finalizeTransaction';
import capitalizeFirstLetter from 'src/utils/capitalizeFirstLetter';
import useLoadUserNetwork from 'src/hooks/useLoadUserNetwork';

interface ConfirmTransactions {
  isConfirmClicked: boolean;
  setIsConfirmClicked: (_: boolean) => void;
  form: UseFormReturn<any, undefined>;
  resetFields: () => void;
  operationType: operationType;
}

const ConfirmTransaction = ({
  isConfirmClicked,
  setIsConfirmClicked,
  form,
  resetFields,
  operationType,
}: ConfirmTransactions) => {
  const address = useAppSelector((state) => state.user.address);
  const values: FormValues = form.getValues();

  const variant = capitalizeFirstLetter(operationType);

  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [isWalletLoadingApproveModalOpen, setIsWalletLoadingApproveModalOpen] = useState(false);
  const [isSendingApproveTxModalOpen, setIsSendingApproveTxModalOpen] = useState(false);
  const [isCreateLockupConfirmModalOpen, setIsCreateLockupConfirmModalOpen] = useState(false);
  const [isWalletLoadingConfirmModalOpen, setIsWalletLoadingConfirmModalOpen] = useState(false);
  const [isSendingCreateLockupTxModalOpen, setIsSendingCreateLockupTxModalOpen] = useState(false);
  const [isCreateLockupResultModalOpen, setIsCreateLockupResultModalOpen] = useState(false);

  const [streamDetails, setStreamDetails] = useState({
    hash: '',
    id: 0,
  });

  const currentNetwork = useLoadUserNetwork();

  useEffect(() => {
    if (isConfirmClicked) {
      setIsApproveModalOpen(true);
    }
  }, [isConfirmClicked]);

  useEffect(() => {
    setIsConfirmClicked(false);
  }, [isApproveModalOpen, setIsConfirmClicked]);

  const handleCreateLockupOnClick = async () => {
    setIsApproveModalOpen(false);
    setIsWalletLoadingApproveModalOpen(true);

    const checkAllowance = await getERC20Allowance(
      values.token.value.address,
      currentNetwork.networkPassphrase,
      address,
      FLUXITY_CONTRACT,
    );

    if (toDecimals(calculateTotalAmount(values)) <= BigInt(checkAllowance)) {
      setIsWalletLoadingApproveModalOpen(false);

      setIsCreateLockupConfirmModalOpen(true);

      toast('success', 'Transaction has been approved successfully');

      return;
    }

    const approveXdr = await approve(
      values.token.value.address,
      currentNetwork.networkPassphrase,
      calculateTotalAmount(values),
      address,
    );

    let signedTx;

    try {
      signedTx = await signTransaction(address, currentNetwork.networkPassphrase, approveXdr);
    } catch {
      setIsWalletLoadingApproveModalOpen(false);
      toast('error', 'Error signing approval transaction');

      return;
    }

    let tx;

    try {
      tx = await sendTransaction(signedTx, currentNetwork.networkPassphrase);
    } catch {
      toast('error', 'Failed to submit the transaction');

      return;
    }

    if (tx) {
      setIsWalletLoadingApproveModalOpen(false);
      await timeout(100);
      setIsSendingApproveTxModalOpen(true);
      const finalize = await finalizeTransaction(tx.hash, currentNetwork.networkPassphrase);

      setIsWalletLoadingApproveModalOpen(false);

      if (!finalize) {
        setIsSendingApproveTxModalOpen(false);

        toast('error', 'Approval transaction failed to finalize');
        return;
      }
    } else {
      setIsSendingApproveTxModalOpen(false);
      return;
    }

    toast('success', 'Transaction has been approved successfully');
    setIsCreateLockupConfirmModalOpen(true);
  };

  const handleCreateLockupConfirmClick = async () => {
    setIsCreateLockupConfirmModalOpen(false);
    setIsWalletLoadingConfirmModalOpen(true);

    const CreateLockupXdr = await createLockup(
      values,
      currentNetwork.networkPassphrase,
      address,
      operationType,
    );

    let signedXdr;

    try {
      signedXdr = await signTransaction(address, currentNetwork.networkPassphrase, CreateLockupXdr);
    } catch (e) {
      setIsWalletLoadingConfirmModalOpen(false);
      toast('error', `Error signing create ${operationType} transaction`);

      return;
    }

    setIsWalletLoadingConfirmModalOpen(false);
    await timeout(50);
    setIsSendingCreateLockupTxModalOpen(true);

    let tx;

    try {
      tx = await sendTransaction(signedXdr, currentNetwork.networkPassphrase);
    } catch {
      setIsSendingApproveTxModalOpen(false);
      toast('error', 'Failed to submit the transaction');

      return;
    }

    if (tx) {
      const finalize = await finalizeTransaction(tx.hash, currentNetwork.networkPassphrase);

      if (!finalize) {
        setIsSendingCreateLockupTxModalOpen(false);
        toast('error', `Create ${operationType} transaction failed to finalize`);

        return;
      }

      await informCreateLockupAPI(scValToNative(finalize?.returnValue).toString());

      setStreamDetails({
        hash: tx.hash,
        id: scValToNative(finalize.returnValue).toString(),
      });
    } else {
      setIsSendingCreateLockupTxModalOpen(false);
      return;
    }
    resetFields();

    setIsSendingCreateLockupTxModalOpen(false);
    setIsSendingApproveTxModalOpen(false);
    await timeout(100);
    setIsCreateLockupResultModalOpen(true);
  };

  const handleCloseTransactionSuccessModal = () => {
    setIsCreateLockupResultModalOpen(false);
  };

  let totalAmount = new BN(0).toString();

  try {
    totalAmount = calculateTotalAmount(values).toString();
  } catch (e) {}

  const ModalButton = (
    <DoubleButtonModal
      buttonText={`View ${variant} Details`}
      closeOnClick={handleCloseTransactionSuccessModal}
      stream={streamDetails}
    />
  );

  const ConfirmSuccessButton = (
    <SingleButtonModal
      buttonText={`Create ${variant}`}
      buttonVariant="form"
      logoColor="#fff"
      onClick={handleCreateLockupConfirmClick}
    />
  );

  return (
    <div>
      <ApproveFormModal
        isOpen={isApproveModalOpen}
        setIsOpen={setIsApproveModalOpen}
        onClick={handleCreateLockupOnClick}
      />

      <CProcessModal
        title="Waiting for token access approval"
        message="You are granting Fluxity access to your tokens equal to your total order amount"
        isOpen={isWalletLoadingApproveModalOpen}
        setIsOpen={setIsWalletLoadingApproveModalOpen}
      />

      <CProcessModal
        title="Waiting for transaction approval"
        isOpen={isSendingApproveTxModalOpen}
        setIsOpen={setIsSendingApproveTxModalOpen}
      />

      <CProcessModal
        title="Waiting for transaction confirmation"
        isOpen={isWalletLoadingConfirmModalOpen}
        setIsOpen={setIsWalletLoadingConfirmModalOpen}
      />

      <CProcessModal
        title={`Completing ${variant} creation transaction`}
        isOpen={isSendingCreateLockupTxModalOpen}
        setIsOpen={setIsSendingCreateLockupTxModalOpen}
      />

      <CModalSuccess
        successLogoColor="green"
        title="Transaction Successful"
        explorerLink={ExternalPages.EXPLORER + '/transactions/' + streamDetails.hash}
        isOpen={isCreateLockupResultModalOpen}
        setIsOpen={setIsCreateLockupResultModalOpen}
        ButtonPart={ModalButton}
      />

      <CModalSuccess
        successLogoColor="black"
        title="You can now complete your transaction."
        from={address}
        to={values.address}
        amount={humanizeAmount(totalAmount).toString()}
        amountTitle="Total Amount"
        isOpen={isCreateLockupConfirmModalOpen}
        setIsOpen={setIsCreateLockupConfirmModalOpen}
        ButtonPart={ConfirmSuccessButton}
      />
    </div>
  );
};

export default ConfirmTransaction;
