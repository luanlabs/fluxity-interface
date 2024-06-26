/* eslint-disable react-hooks/rules-of-hooks */
import BN from 'src/utils/BN';
import { calculateTotalAmount } from 'src/utils/calculateTotalAmount';
import { checkBalance } from 'src/utils/checkBalance';
import { CustomError } from 'src/models';
import { FormValues } from './index';
import { xlmAssetType, checkIsUserActive } from './checkIsUserActive';

type Validation = {
  address: CustomError;
  rate: CustomError;
  total: CustomError;
};

const validateForm = (
  values: FormValues,
  setIsFormValidated: (_: boolean) => void,
  address: string,
  user: xlmAssetType,
) => {
  const errors = {} as Validation;
  setIsFormValidated(false);

  if (
    !values.address ||
    !values.token ||
    !values.rate?.amount ||
    new BN(values.rate?.amount).isZero() ||
    !values.endDate
  ) {
    return {
      values,
      errors,
    };
  }

  const isActiveAccount = checkIsUserActive(user);

  if (!isActiveAccount) {
    return {
      values,
      errors,
    };
  }

  let totalAmount = calculateTotalAmount(values);

  const isSuccessful = checkBalance(values.token.value, totalAmount);

  if (totalAmount.isLessThan(0)) {
    return {
      values,
      errors,
    };
  }

  if (!isSuccessful) {
    return {
      values,
      errors,
    };
  }

  if (address === values.address) {
    return {
      values,
      errors,
    };
  }

  setIsFormValidated(true);

  return {
    values,
    errors,
  };
};

export default validateForm;
