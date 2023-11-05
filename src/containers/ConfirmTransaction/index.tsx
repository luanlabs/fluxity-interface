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
import signedXdr from 'src/utils/soroban/signTransaction';
import timeout from 'src/utils/timeout';
import getERC20Allowance from 'src/features/soroban/getERC20Allowance';
import { useAppSelector } from 'src/hooks/useRedux';
import { calculateTotalAmount } from 'src/utils/calculateTotalAmount';
import { FormValues } from '../CreateStreamMainCard';
import { FLUXITY_CONTRACT } from 'src/constants/contracts';
import toDecimals from 'src/utils/createStream/toDecimals';

interface ConfirmTransactions {
  isConfirm: boolean;
  setIsConfirm: (_: boolean) => void;
  form: UseFormReturn<any, undefined>;
}

const ConfirmTransaction = ({ isConfirm, setIsConfirm, form }: ConfirmTransactions) => {
  const [isOpenApproveModal, setIsOpenApproveModal] = useState(false);
  const [isTokenAccessModal, setIsTokenAccessModal] = useState(false);
  const [isWaitTransactionModal, setIsWaitTransactionModal] = useState(false);
  const [isCreateStreamConfirmModal, setIsCreateStreamConfirmModal] = useState(false);
  const [isWaitTransactionConfirmModal, setIsWaitTransactionConfirmModal] = useState(false);
  const [isCompleteTransactionModal, setIsCompleteTransactionModal] = useState(false);
  const [isOpenTransactionSuccessModal, setIsOpenTransactionSuccessModal] = useState(false);
  const [txStatus, setTxStatus] = useState(false);
  const [hashApprove, setHashApprove] = useState('');
  const [hashStream, setHashStream] = useState('');

  const address = useAppSelector((state) => state.user.address);
  const values: FormValues = form.getValues();

  useEffect(() => {
    if (isConfirm) {
      setIsOpenApproveModal(true);
    } else {
      return;
    }
  }, [isConfirm]);

  useEffect(() => {
    setIsConfirm(false);
  }, [isOpenApproveModal]);

  const handleApproveModalClick = async () => {
    setIsOpenApproveModal(false);
    setIsTokenAccessModal(true);

    setIsTokenAccessModal(false);
    await timeout(100);
    setIsWaitTransactionModal(true);

    const checkAllowance = await getERC20Allowance(address, FLUXITY_CONTRACT);

    if (toDecimals(calculateTotalAmount(values)) <= BigInt(checkAllowance)) {
      setIsWaitTransactionModal(false);
      setIsCreateStreamConfirmModal(true);
      toast('success', 'Transaction has been approved successfully.');
      return;
    }

    const approveXdr = await signedXdr(values, address, 'approve');

    const tx = await sendTransaction(approveXdr);
    if (tx) {
      const finalize = await finalizeTransaction(tx.hash);
      if (!finalize) {
        setIsWaitTransactionModal(false);
        toast('error', 'Approve failed');
        return;
      }

      setHashApprove(tx.hash);
    } else {
      setIsWaitTransactionModal(false);
      return;
    }

    toast('success', 'Transaction has been approved successfully.');

    setIsWaitTransactionModal(false);
    await timeout(100);
    setIsCreateStreamConfirmModal(true);
  };

  const handleCreateStreamConfirmClick = async () => {
    setIsCreateStreamConfirmModal(false);
    setIsWaitTransactionConfirmModal(true);

    const createStreamXdr = await signedXdr(values, address, 'createStream');

    setIsWaitTransactionConfirmModal(false);
    await timeout(50);
    setIsCompleteTransactionModal(true);

    const tx = await sendTransaction(createStreamXdr);
    if (tx) {
      const finalize = await finalizeTransaction(tx.hash);
      setTxStatus(finalize);

      if (!finalize) {
        setIsWaitTransactionModal(false);
        toast('error', 'Approve failed');
        return;
      }
      setHashStream(tx.hash);
    } else {
      setIsCompleteTransactionModal(false);
      return;
    }

    setIsCompleteTransactionModal(false);
    await timeout(100);
    setIsOpenTransactionSuccessModal(true);
  };

  const handleCloseTransactionSuccessModal = () => {
    setIsOpenTransactionSuccessModal(false);
  };

  let totalAmount = new BN(0).toString();
  try {
    totalAmount = calculateTotalAmount(values).toFixed(3).toString();
  } catch (e) {}

  return (
    <div>
      <ApproveFormModal
        isOpen={isOpenApproveModal}
        setIsOpen={setIsOpenApproveModal}
        onClick={handleApproveModalClick}
      />

      <CProcessModal
        title="Waiting for token access approval"
        message="You are granting Fluxity access to your tokens equal to your total order amount."
        isOpen={isTokenAccessModal}
        setIsOpen={setIsTokenAccessModal}
      />

      <CProcessModal
        title="Waiting for transaction approval"
        isOpen={isWaitTransactionModal}
        setIsOpen={setIsWaitTransactionModal}
      />

      <CreateStreamConfirmModal
        from={address}
        to={values.address}
        amount={totalAmount}
        isOpen={isCreateStreamConfirmModal}
        setIsOpen={setIsCreateStreamConfirmModal}
        onClick={handleCreateStreamConfirmClick}
      />

      <CProcessModal
        title="Waiting for transaction confirmation"
        isOpen={isWaitTransactionConfirmModal}
        setIsOpen={setIsWaitTransactionConfirmModal}
      />

      <CProcessModal
        title="Completing stream creation transaction"
        isOpen={isCompleteTransactionModal}
        setIsOpen={setIsCompleteTransactionModal}
      />

      <TransactionSuccessModal
        title={txStatus ? 'Transaction Successful' : 'Transaction Pending'}
        isOpen={isOpenTransactionSuccessModal}
        setIsOpen={setIsOpenTransactionSuccessModal}
        hash={hashStream}
        closeOnClick={handleCloseTransactionSuccessModal}
      />
    </div>
  );
};

export default ConfirmTransaction;
