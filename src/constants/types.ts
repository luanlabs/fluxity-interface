import { StreamStatus } from 'src/components/CStreamStatus';

export type CLinkProps = {
  url: string;
  title: string;
};

export interface CNavLinkProps {
  url: string;
  title: string;
  isMinimized?: boolean;
  icon: JSX.Element | React.ReactNode;
  activeIcon: JSX.Element | React.ReactNode;
}

export type SvgProps = {
  fill?: string;
};

export interface IFluxityAPIResponse<T> {
  status: 'error' | 'success';
  message: string;
  result: T;
}

export interface IResponseAlreadyMintedResult {
  minted: boolean;
}

export type IResponseAlreadyMinted = IFluxityAPIResponse<IResponseAlreadyMintedResult>;

export interface IResponseToken {
  address: string;
  decimals: string;
  name: string;
  symbol: string;
  _id: string;
}

export type IResponseTokenResult = IFluxityAPIResponse<IResponseToken[]>;

export interface IStream {
  model: 'linear' | 'exponential';
  _id: string;
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
  token: string;
  withdrawn: string;
  createdAt: string;
  updatedAt: string;
  status: StreamStatus;
}

export interface IStreamHistory extends IStream {
  completionPercentage: number | string;
  streamAmount: number | string;
  type: 'receive' | 'send';
}

export type IResponseStreamsResult = IFluxityAPIResponse<IStream[]>;
