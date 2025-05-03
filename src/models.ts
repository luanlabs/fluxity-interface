import { SetStateAction } from 'react';
import { GroupBase, StylesConfig, MultiValue, SingleValue, ActionMeta } from 'react-select';

import { rates } from './constants/rates';
import { IToken } from './reducers/tokens';
import { IResponseToken } from './constants/types';

export interface ISelectItem<T> {
  label: string;
  value: T;
}

export type Optional<T> = T | null;

export type ReactState<T> = React.Dispatch<SetStateAction<T>>;

export type Status = 'ongoing' | 'completed' | 'pending';

export type ISelectItemString = ISelectItem<string>;

export type Rates = keyof typeof rates;
export type RateValue = ISelectItem<keyof typeof rates>;

export interface ISelectToken extends ISelectItem<IToken> {
  icon: string;
}

export type ReactSelectType = StylesConfig<
  ISelectItemString,
  boolean,
  GroupBase<ISelectItemString>
>;

export type ReactSelectOnChangeType = (
  newValue: MultiValue<ISelectItemString> | SingleValue<ISelectItemString>,
  actionMeta: ActionMeta<ISelectItemString>,
) => void;

export type RateSelectOnChangeType = (
  newValue: MultiValue<Rates> | SingleValue<Rates>,
  actionMeta: ActionMeta<Rates>,
) => void;

export type SvgProps = {
  fill?: string;
};

export type CustomError = {
  type: 'error';
  message: string;
};

export interface IFluxityAPIResponse<T> {
  status: 'error' | 'success';
  message: string;
  result: T;
}

export interface ITokenStream {
  address: string;
  decimals: number;
  logo: string;
  name: string;
  symbol: string;
}

export interface IResponseStream {
  id: string;
  amount: string;
  cancellable_date: number;
  cliff_date: number;
  end_date: number;
  is_cancelled: boolean;
  is_vesting: boolean;
  rate: number;
  receiver: string;
  sender: string;
  start_date: number;
  token: ITokenStream;
  withdrawn: string;
  status: Status;
}

export type IResponseStreamResult = IFluxityAPIResponse<IResponseStream>;

export interface StreamDetailsIconProps {
  fill: string;
  arrowFill: string;
  lineFill: string;
}

export type CancelAmounts = {
  senderAmount: number;
  receiverAmount: number;
};

export type OperationType = 'stream' | 'vesting';

export interface ITokenDetails extends IResponseToken {
  address: string;
  balance: string;
  symbol: string;
  decimals: string;
}

export type StellarConfig = {
  network: string;
  contract: string;
  networkUrl: string;
  networkPassphrase: string;
  sorobanRpcUrl: string;
};
