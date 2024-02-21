/* eslint-disable react-hooks/rules-of-hooks */
import BN from 'src/utils/BN';
import { calculateTotalAmount } from 'src/utils/calculateTotalAmount';
import { checkBalance } from 'src/utils/checkBalance';
import { CustomError } from 'src/models';
import { FormValues } from './index';
import { UserInfo, checkUserActived } from './checkUserActived';

type Validation = {
  address: CustomError;
  rate: CustomError;
  total: CustomError;
};

const validateForm = (
  values: FormValues,
  setIsFormValidated: (_: boolean) => void,
  address: string,
  user: UserInfo,
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

  const isActiveAccount = checkUserActived(user);

  if (!isActiveAccount) {
    return {
      values,
      errors,
    };
  }

  let totalAmount = calculateTotalAmount(values);

  const isSuccessful = checkBalance(values.token.value, totalAmount);

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
