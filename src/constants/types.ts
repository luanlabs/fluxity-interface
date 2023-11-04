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

export type IResponseAlreadyMinted =
  IFluxityAPIResponse<IResponseAlreadyMintedResult>;

export interface IResponseToken {
  address: string;
  decimals: string;
  name: string;
  symbol: string;
  _id: string;
}

export type IResponseTokenResult = IFluxityAPIResponse<IResponseToken[]>;
