import { FormValues } from './index';
import { CustomError } from 'src/models';
import { rateInNumbers } from '../../utils/rateInNumbers';
import BN from 'src/utils/BN';
import { calculateTotalAmount } from '../SummaryContainer/calculateTotalAmount';
import { userData } from '../SummaryContainer/userData';

type Validation = {
  address: CustomError;
  rate: CustomError;
  total: CustomError;
  a: CustomError;
};

const validateForm = (values: FormValues, setIsFormValidated) => {
  const errors = {} as Validation;

  setIsFormValidated(false);

  if (!values.address || !values.token.label || !values.rate.amount || !values.endDate) {
    return {
      values,
      errors,
    };
  }

  if (new BN(values.rate.amount).isZero()) {
    errors.rate = {
      type: 'error',
      message: 'Invalid Number',
    };

    return {
      values,
      errors,
    };
  }

  let totalAmount = calculateTotalAmount(
    values.startDate,
    values.endDate,
    new BN(values.rate.amount),
    rateInNumbers(values.rate.rateTime.value),
  );

  const checkBalance = () => {
    const findToken = userData.find(({ asset_code }) => asset_code);
    if (!findToken) {
      return { errors, values };
    }

    if (totalAmount.isGreaterThan(new BN(findToken.balance))) {
      errors.total = {
        type: 'error',
        message: 'The account balance is insufficient',
      };

      return {
        values,
        errors,
      };
    }
  };
  checkBalance();

  setIsFormValidated(true);

  return {
    values,
    errors,
  };
};

export default validateForm;
