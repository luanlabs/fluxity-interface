import { UseFormReturn } from 'react-hook-form';
import { useEffect, useState } from 'react';

import ApproveFormModal from 'src/containers/Modals/ApproveFormModal';
import CProcessModal from 'src/components/CProcessModal';
import CreateStreamConfirmModal from 'src/containers/Modals/CreateStreamConfirmModal';
import TransactionSuccessModal from 'src/containers/Modals/TransactionSuccessModal';
import toast from 'src/components/CToast';
import timeout from 'src/utils/timeout';

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

    await timeout(3000);

    setIsTokenAccessModal(false);
    await timeout(100);

    setIsWaitTransactionModal(true);
    await timeout(300);
    toast('success', 'Transaction has been approved successfully.');

    await timeout(2000);

    setIsWaitTransactionModal(false);
    await timeout(100);

    setIsCreateStreamConfirmModal(true);
  };

  const handleCreateStreamConfirmClick = async () => {
    setIsCreateStreamConfirmModal(false);
    setIsWaitTransactionConfirmModal(true);

    await timeout(3000);

    setIsWaitTransactionConfirmModal(false);

    await timeout(100);

    setIsCompleteTransactionModal(true);

    await timeout(3000);

    setIsCompleteTransactionModal(false);

    await timeout(100);

    setIsOpenTransactionSuccessModal(true);
  };

  const handleCloseTransactionSuccessModal = () => {
    setIsOpenTransactionSuccessModal(false);
  };

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
        hash="GAGRCJ46TZ5D7E7JODLUQ5DLTVGXXMKJM5YAXATLXTO4C6H5VOPUJZ6C"
        from="SCIBRPJHZFRHS4KYBMCL53XK6PILIB6PBEHUYVZZ7EZ6FKZO2P7IZSMT"
        to="GAGRCJ46TZ5D7E7JODLUQ5DLTVGXXMKJM5YAXATLXTO4C6H5VOPUJZ6C"
        amount="200"
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
        isOpen={isOpenTransactionSuccessModal}
        setIsOpen={setIsOpenTransactionSuccessModal}
        hash="GAGRCJ46TZ5D7E7JODLUQ5DLTVGXXMKJM5YAXATLXTO4C6H5VOPUJZ6C"
        closeOnClick={handleCloseTransactionSuccessModal}
      />
    </div>
  );
};

export default ConfirmTransaction;
