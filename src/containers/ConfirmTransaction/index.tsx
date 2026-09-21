import { useCallback, useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';

import BN from 'src/utils/BN';
import { readContracts, useBlux, useLedgers, useNetwork, useWriteContract } from '@bluxcc/react';

import timeout from 'src/utils/timeout';
import toast from 'src/components/CToast';
import { OperationType } from 'src/models';
import humanizeAmount from 'src/utils/humanizeAmount';
import { FormValues } from 'src/containers/CreateLockup';
import CProcessModal from 'src/components/CProcessModal';
import explorersLink from 'src/constants/explorersLink';
import CModalSuccess from 'src/components/CModalSuccess';
import toDecimals from 'src/utils/createLockup/toDecimals';
import createStreamValues from 'src/utils/soroban/createStreamValues';
import DoubleButtonModal from 'src/components/DoubleButtonModal';
import SingleButtonModal from 'src/components/SingleButtonModal';
import capitalizeFirstLetter from 'src/utils/capitalizeFirstLetter';
import ApproveFormModal from 'src/containers/Modals/ApproveFormModal';
import { calculateTotalAmount } from 'src/utils/calculateTotalAmount';
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
  const { user } = useBlux();
  const networkPassphrase = useNetwork();
  const { mutateAsync: writeContract, error } = useWriteContract<string | bigint>();
  const { data: latestLedger } = useLedgers({
    limit: 1,
    order: 'desc',
    network: networkPassphrase,
  });
  const values: FormValues = form.getValues();
  const address = user?.address ?? '';
  const currentNetwork = passPhraseToNetworkDetail(networkPassphrase);
  const contractAddress = currentNetwork.contract;
  const expirationLedger = Number(latestLedger?.response.records[0]?.sequence ?? 0) + 1000;

  const variant = capitalizeFirstLetter(operationType);

  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [isWalletLoadingApproveModalOpen, setIsWalletLoadingApproveModalOpen] = useState(false);
  const [isSendingApproveTxModalOpen, setIsSendingApproveTxModalOpen] = useState(false);
  const [isCreateLockupConfirmModalOpen, setIsCreateLockupConfirmModalOpen] = useState(false);
  const [isWalletLoadingConfirmModalOpen, setIsWalletLoadingConfirmModalOpen] = useState(false);
  const [isSendingCreateLockupTxModalOpen, setIsSendingCreateLockupTxModalOpen] = useState(false);
  const [isCreateLockupResultModalOpen, setIsCreateLockupResultModalOpen] = useState(false);

  console.log('write contract error');
  console.log(error);

  const [streamDetails, setStreamDetails] = useState({
    hash: '',
    id: 0,
  });

  const handleCreateLockupOnClick = useCallback(async () => {
    if (!address) {
      toast('error', 'You need to connect your wallet first.');
      return;
    }

    const currentValues = form.getValues() as FormValues;
    const allowanceResult = await readContracts<readonly [string | bigint]>(
      [
        {
          address: currentValues.token.value.address,
          fn: 'allowance',
          args: [address, contractAddress],
        },
      ],
      { network: networkPassphrase },
    );
    const checkAllowance = BigInt(allowanceResult.values[0] ?? 0);

    if (toDecimals(calculateTotalAmount(currentValues)) <= checkAllowance) {
      setIsWalletLoadingApproveModalOpen(false);

      setIsCreateLockupConfirmModalOpen(true);

      return;
    }

    try {
      await writeContract({
        call: {
          address: currentValues.token.value.address,
          fn: 'approve',
          args: [
            address,
            contractAddress,
            toDecimals(calculateTotalAmount(currentValues)),
            expirationLedger,
          ],
        },
        options: { network: networkPassphrase },
      });

      toast('success', 'Transaction has been approved successfully');
      setIsCreateLockupConfirmModalOpen(true);
    } catch {
      setIsConfirmClicked(false);
      toast('error', 'Failed to submit the approve transaction');

      return;
    }
  }, [
    address,
    contractAddress,
    expirationLedger,
    form,
    networkPassphrase,
    setIsConfirmClicked,
    writeContract,
  ]);

  useEffect(() => {
    if (isConfirmClicked) {
      setIsConfirmClicked(false);
      void handleCreateLockupOnClick();
    }
  }, [handleCreateLockupOnClick, isConfirmClicked, setIsConfirmClicked]);

  const handleCreateLockupConfirmClick = async () => {
    setIsCreateLockupConfirmModalOpen(false);

    console.log('abcd');

    try {
      console.log('efgh');
      console.log(currentNetwork.contract);
      console.log('values');
      console.log(createStreamValues(values, address, operationType));

      const transaction = await writeContract({
        call: {
          address: currentNetwork.contract,
          fn: 'create_lockup',
          args: [createStreamValues(values, address, operationType)],
        },
        options: { network: networkPassphrase },
      });

      console.log('transaction');
      console.log(transaction);

      const streamId = await transaction.returnValue();

      if (streamId === null) {
        toast('error', 'Failed to send transaction');
      } else {
        await informCreateLockupAPI(streamId.toString(), currentNetwork.network);

        setStreamDetails({
          hash: transaction.hash,
          id: Number(streamId),
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
  } catch (e) { }

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
          explorersLink(networkPassphrase).toLowerCase() + '/transactions/' + streamDetails.hash
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
