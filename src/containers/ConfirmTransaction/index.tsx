import { useEffect, useState } from 'react';
import { scValToNative } from 'stellar-sdk';
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
import toDecimals from 'src/utils/createStream/toDecimals';
import { ExternalPages } from 'src/constants/externalPages';
import createStream from 'src/features/soroban/createStream';
import signTransaction from 'src/utils/soroban/signTransaction';
import { FormValues } from 'src/containers/CreateStreamMainCard';
import DoubleButtonModal from 'src/components/DoubleButtonModal';
import SingleButtonModal from 'src/components/SingleButtonModal';
import sendTransaction from 'src/features/soroban/sendTransaction';
import ApproveFormModal from 'src/containers/Modals/ApproveFormModal';
import { calculateTotalAmount } from 'src/utils/calculateTotalAmount';
import getERC20Allowance from 'src/features/soroban/getERC20Allowance';
import informCreatestreamAPI from 'src/features/informCreatestreamAPI';
import finalizeTransaction from 'src/utils/soroban/finalizeTransaction';

interface ConfirmTransactions {
  isConfirmClicked: boolean;
  setIsConfirmClicked: (_: boolean) => void;
  form: UseFormReturn<any, undefined>;
  resetFields: () => void;
}

const ConfirmTransaction = ({
  isConfirmClicked,
  setIsConfirmClicked,
  form,
  resetFields,
}: ConfirmTransactions) => {
  const address = useAppSelector((state) => state.user.address);
  const values: FormValues = form.getValues();

  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [isWalletLoadingApproveModalOpen, setIsWalletLoadingApproveModalOpen] = useState(false);
  const [isSendingApproveTxModalOpen, setIsSendingApproveTxModalOpen] = useState(false);
  const [isCreateStreamConfirmModalOpen, setIsCreateStreamConfirmModalOpen] = useState(false);
  const [isWalletLoadingConfirmModalOpen, setIsWalletLoadingConfirmModalOpen] = useState(false);
  const [isSendingCreateStreamTxModalOpen, setIsSendingCreateStreamTxModalOpen] = useState(false);
  const [isCreateStreamResultModalOpen, setIsCreateStreamResultModalOpen] = useState(false);

  const [streamDetails, setStreamDetails] = useState({
    hash: '',
    id: 0,
  });

  useEffect(() => {
    if (isConfirmClicked) {
      setIsApproveModalOpen(true);
    }
  }, [isConfirmClicked]);

  useEffect(() => {
    setIsConfirmClicked(false);
  }, [isApproveModalOpen]);

  const handleCreateStreamOnClick = async () => {
    setIsApproveModalOpen(false);
    setIsWalletLoadingApproveModalOpen(true);

    await timeout(100);

    const checkAllowance = await getERC20Allowance(
      values.token.value.address,
      address,
      FLUXITY_CONTRACT,
    );

    if (toDecimals(calculateTotalAmount(values)) <= BigInt(checkAllowance)) {
      setIsSendingApproveTxModalOpen(false);
      setIsCreateStreamConfirmModalOpen(true);

      toast('success', 'Transaction has been approved successfully');

      return;
    }

    const approveXdr = await approve(
      values.token.value.address,
      calculateTotalAmount(values),
      address,
    );

    let signedTx;

    try {
      signedTx = await signTransaction(address, approveXdr);
    } catch {
      setIsWalletLoadingApproveModalOpen(false);
      toast('error', 'Error signing approval transaction');

      return;
    }

    let tx;

    try {
      tx = await sendTransaction(signedTx);
    } catch {
      toast('error', 'Failed to submit the transaction');

      return;
    }

    if (tx) {
      setIsWalletLoadingApproveModalOpen(false);
      await timeout(100);
      setIsSendingApproveTxModalOpen(true);
      const finalize = await finalizeTransaction(tx.hash);

      setIsWalletLoadingApproveModalOpen(false);

      if (!finalize) {
        toast('error', 'Approval transaction failed to finalize');
        return;
      }
    } else {
      setIsSendingApproveTxModalOpen(false);
      return;
    }

    toast('success', 'Transaction has been approved successfully');
    setIsCreateStreamConfirmModalOpen(true);
  };

  const handleCreateStreamConfirmClick = async () => {
    setIsCreateStreamConfirmModalOpen(false);
    setIsWalletLoadingConfirmModalOpen(true);

    const createStreamXdr = await createStream(values, address);

    let signedXdr;

    try {
      signedXdr = await signTransaction(address, createStreamXdr);
    } catch (e) {
      setIsWalletLoadingConfirmModalOpen(false);
      toast('error', 'Error signing create stream transaction');

      return;
    }

    setIsWalletLoadingConfirmModalOpen(false);
    await timeout(50);
    setIsSendingCreateStreamTxModalOpen(true);

    let tx;

    try {
      tx = await sendTransaction(signedXdr);
    } catch {
      setIsSendingApproveTxModalOpen(false);
      toast('error', 'Failed to submit the transaction');

      return;
    }

    if (tx) {
      const finalize = await finalizeTransaction(tx.hash);

      if (!finalize) {
        setIsSendingCreateStreamTxModalOpen(false);
        toast('error', 'Create stream transaction failed to finalize');

        return;
      }

      await informCreatestreamAPI(scValToNative(finalize?.returnValue).toString());

      setStreamDetails({
        hash: tx.hash,
        id: scValToNative(finalize.returnValue).toString(),
      });
    } else {
      setIsSendingCreateStreamTxModalOpen(false);
      return;
    }
    resetFields();

    setIsSendingCreateStreamTxModalOpen(false);
    await timeout(100);
    setIsCreateStreamResultModalOpen(true);
  };

  const handleCloseTransactionSuccessModal = () => {
    setIsCreateStreamResultModalOpen(false);
  };

  let totalAmount = new BN(0).toString();

  try {
    totalAmount = calculateTotalAmount(values).toFixed(3).toString();
  } catch (e) {}

  const ModalButton = (
    <DoubleButtonModal
      buttonText="View Stream Details"
      closeOnClick={handleCloseTransactionSuccessModal}
      stream={streamDetails}
    />
  );

  const ConfirmSuccessButton = (
    <SingleButtonModal
      buttonText="Create Stream"
      buttonVariant="form"
      logoColor="#fff"
      onClick={handleCreateStreamConfirmClick}
    />
  );

  return (
    <div>
      <ApproveFormModal
        isOpen={isApproveModalOpen}
        setIsOpen={setIsApproveModalOpen}
        onClick={handleCreateStreamOnClick}
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
        title="Completing stream creation transaction"
        isOpen={isSendingCreateStreamTxModalOpen}
        setIsOpen={setIsSendingCreateStreamTxModalOpen}
      />

      <CModalSuccess
        successLogoColor="green"
        title="Transaction Successful"
        explorerLink={ExternalPages.EXPLORER + '/transactions/' + streamDetails.hash}
        isOpen={isCreateStreamResultModalOpen}
        setIsOpen={setIsCreateStreamResultModalOpen}
        ButtonPart={ModalButton}
      />

      <CModalSuccess
        successLogoColor="black"
        title="You can now complete your transaction."
        from={address}
        to={values.address}
        amount={humanizeAmount(totalAmount).toString()}
        amountTitle="Total Amount"
        isOpen={isCreateStreamConfirmModalOpen}
        setIsOpen={setIsCreateStreamConfirmModalOpen}
        ButtonPart={ConfirmSuccessButton}
      />
    </div>
  );
};

export default ConfirmTransaction;
