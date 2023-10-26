import BN from 'src/utils/BN';
import { calculateTotalAmount } from 'src/utils/calculateTotalAmount';
import { checkBalance } from 'src/utils/checkBalance';
import { rateInNumber } from 'src/utils/rateInNumber';
import { CustomError } from 'src/models';
import { FormValues } from './index';

type Validation = {
  address: CustomError;
  rate: CustomError;
  total: CustomError;
  a: CustomError;
};

const validateForm = (values: FormValues, setIsFormValidated: (_: boolean) => void) => {
  const errors = {} as Validation;

  setIsFormValidated(false);

  if (
    !values.address ||
    !values.token ||
    !values.rate.amount ||
    new BN(values.rate.amount).isZero() ||
    !values.endDate
  ) {
    return {
      values,
      errors,
    };
  }

  let totalAmount = calculateTotalAmount(
    values.startDate,
    values.endDate,
    new BN(values.rate.amount),
    rateInNumber(values.rate.rateTime.value),
  );

  const [isSuccessful, errorMessage] = checkBalance(values.token.value, totalAmount);

  if (!isSuccessful) {
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
