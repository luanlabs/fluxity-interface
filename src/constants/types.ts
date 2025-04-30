import { ITokenStream } from 'src/models';
import { IToken } from 'src/reducers/tokens';
import { StreamStatus } from 'src/components/CStreamStatus';

export type CLinkProps = {
  url: string;
  title: string;
};

export type CModalProps = {
  isOpen: boolean;
  setIsOpen: (_: boolean) => void;
  title: string;
  message?: string;
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
  logo: string;
  _id: string;
  network: string;
  claimable: boolean;
}

export interface IFilterTokens {
  tokens: IToken[];
  showSentStreams: boolean;
  showReceivedStreams: boolean;
}

export type IResponseTokenResult = IFluxityAPIResponse<IResponseToken[]>;

export interface IStream {
  model: 'linear' | 'exponential';
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
  createdAt: string;
  updatedAt: string;
  status: StreamStatus;
}

export interface IStreamHistory extends IStream {
  completionPercentage: string;
  streamAmount: string;
  isSender: boolean;
}

export type IResponseStreamsResult = IFluxityAPIResponse<IStream[]>;

export type INetwork = {
  network: string;
  networkUrl: string;
  networkPassphrase: string;
  sorobanRpcUrl?: string;
};
