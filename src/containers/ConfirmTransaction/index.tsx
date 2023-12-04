import { useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';

import BN from 'src/utils/BN';
import CreateStreamConfirmModal from 'src/containers/Modals/CreateStreamConfirmModal';
import TransactionSuccessModal from 'src/containers/Modals/TransactionSuccessModal';
import finalizeTransaction from 'src/utils/soroban/finalizeTransaction';
import sendTransaction from 'src/features/soroban/sendTransaction';
import ApproveFormModal from 'src/containers/Modals/ApproveFormModal';
import CProcessModal from 'src/components/CProcessModal';
import toast from 'src/components/CToast';
import signTransaction from 'src/utils/soroban/signTransaction';
import timeout from 'src/utils/timeout';
import getERC20Allowance from 'src/features/soroban/getERC20Allowance';
import { useAppSelector } from 'src/hooks/useRedux';
import { calculateTotalAmount } from 'src/utils/calculateTotalAmount';
import { FormValues } from '../CreateStreamMainCard';
import { FLUXITY_CONTRACT } from 'src/constants/contracts';
import toDecimals from 'src/utils/createStream/toDecimals';
import approve from 'src/features/soroban/approve';
import createStream from 'src/features/soroban/createStream';
import { scValToNative } from 'soroban-client';
import { sendStreamId } from 'src/features/sendStreamId';

interface ConfirmTransactions {
  isConfirm: boolean;
  setIsConfirm: (_: boolean) => void;
  form: UseFormReturn<any, undefined>;
}

const ConfirmTransaction = ({ isConfirm, setIsConfirm, form }: ConfirmTransactions) => {
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
    if (isConfirm) {
      setIsApproveModalOpen(true);
    }
  }, [isConfirm]);

  useEffect(() => {
    setIsConfirm(false);
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
      toast('error', 'Failed to sign the transaction');

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
        toast('error', 'Approve failed');
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
      toast('error', 'Failed to sign the transaction');

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
        toast('error', 'Approve failed');

        return;
      }

      await sendStreamId(scValToNative(finalize?.returnValue).toString());

      setStreamDetails({
        hash: tx.hash,
        id: scValToNative(finalize.returnValue).toString(),
      });
    } else {
      setIsSendingCreateStreamTxModalOpen(false);
      return;
    }

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

      <CreateStreamConfirmModal
        from={address}
        to={values.address}
        amount={totalAmount}
        isOpen={isCreateStreamConfirmModalOpen}
        setIsOpen={setIsCreateStreamConfirmModalOpen}
        onClick={handleCreateStreamConfirmClick}
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

      <TransactionSuccessModal
        title="Transaction Successful"
        isOpen={isCreateStreamResultModalOpen}
        setIsOpen={setIsCreateStreamResultModalOpen}
        stream={streamDetails}
        closeOnClick={handleCloseTransactionSuccessModal}
      />
    </div>
  );
};

export default ConfirmTransaction;
