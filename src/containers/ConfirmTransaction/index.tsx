import { useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { scValToNative } from '@stellar/stellar-sdk';

import BN from 'src/utils/BN';
import { useBlux } from '@bluxcc/react';

import timeout from 'src/utils/timeout';
import toast from 'src/components/CToast';
import { OperationType } from 'src/models';
import approve from 'src/features/soroban/approve';
import { useAppSelector } from 'src/hooks/useRedux';
import humanizeAmount from 'src/utils/humanizeAmount';
import { FormValues } from 'src/containers/CreateLockup';
import CProcessModal from 'src/components/CProcessModal';
import explorersLink from 'src/constants/explorersLink';
import CModalSuccess from 'src/components/CModalSuccess';
import toDecimals from 'src/utils/createLockup/toDecimals';
import createLockup from 'src/features/soroban/createLockup';
import DoubleButtonModal from 'src/components/DoubleButtonModal';
import SingleButtonModal from 'src/components/SingleButtonModal';
import capitalizeFirstLetter from 'src/utils/capitalizeFirstLetter';
import ApproveFormModal from 'src/containers/Modals/ApproveFormModal';
import { calculateTotalAmount } from 'src/utils/calculateTotalAmount';
import getERC20Allowance from 'src/features/soroban/getERC20Allowance';
import informCreateLockupAPI from 'src/features/informCreateLockupAPI';
import passPhraseToNetworkDetail from 'src/utils/passPhraseToNetworkDetail';

interface ConfirmTransactions {
  isConfirmClicked: boolean;
  setIsConfirmClicked: (_: boolean) => void;
  form: UseFormReturn<any, undefined>;
  resetFields: () => void;
  operationType: OperationType;
}

const ConfirmTransaction = ({
  isConfirmClicked,
  setIsConfirmClicked,
  form,
  resetFields,
  operationType,
}: ConfirmTransactions) => {
  const { sendTransaction } = useBlux();
  const values: FormValues = form.getValues();
  const address = useAppSelector((state) => state.user.address);
  const currentNetwork = useAppSelector((state) => state.user.network);

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

  useEffect(() => {
    if (isConfirmClicked) {
      handleCreateLockupOnClick();
    }
  }, [isConfirmClicked]);

  useEffect(() => {
    setIsConfirmClicked(false);
  }, [isApproveModalOpen, setIsConfirmClicked]);

  const handleCreateLockupOnClick = async () => {
    const checkAllowance = await getERC20Allowance(
      values.token.value.address,
      currentNetwork.networkPassphrase,
      address,
      passPhraseToNetworkDetail(currentNetwork.networkPassphrase).contract,
    );

    if (toDecimals(calculateTotalAmount(values)) <= BigInt(checkAllowance)) {
      setIsWalletLoadingApproveModalOpen(false);

      setIsCreateLockupConfirmModalOpen(true);

      return;
    }

    const approveXdr = await approve(
      values.token.value.address,
      currentNetwork.networkPassphrase,
      address,
      calculateTotalAmount(values),
    );

    try {
      await sendTransaction(approveXdr.toXDR());

      toast('success', 'Transaction has been approved successfully');
      setIsCreateLockupConfirmModalOpen(true);
    } catch {
      setIsConfirmClicked(false);
      toast('error', 'Failed to submit the approve transaction');

      return;
    }
  };

  const handleCreateLockupConfirmClick = async () => {
    setIsCreateLockupConfirmModalOpen(false);

    const createLockupXdr = await createLockup(
      currentNetwork.networkPassphrase,
      address,
      values,
      operationType,
    );

    try {
      const finalize = await sendTransaction(createLockupXdr.toXDR(), { isSoroban: true });

      if (!finalize.returnValue) {
        toast('error', 'Failed to send transaction');
      } else {
        await informCreateLockupAPI(
          scValToNative(finalize.returnValue).toString(),
          currentNetwork.network,
        );

        setStreamDetails({
          hash: finalize.txHash,
          id: scValToNative(finalize.returnValue).toString(),
        });

        resetFields();

        setIsSendingCreateLockupTxModalOpen(false);
        setIsSendingApproveTxModalOpen(false);

        await timeout(100);

        setIsCreateLockupResultModalOpen(true);
      }
    } catch (e) {
      toast('error', `Error signing create ${operationType} transaction`);

      return;
    }
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
      network={currentNetwork.network}
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
        explorerLink={
          explorersLink(currentNetwork.network).toLowerCase() +
          '/transactions/' +
          streamDetails.hash
        }
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
