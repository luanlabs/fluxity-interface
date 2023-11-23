interface IResponseStream {
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
  status: string;
}

export const streamDataa: IResponseStream = {
  _id: '24',
  amount: '119000000',
  cancellable_date: 1699956257,
  cliff_date: 1699956257,
  end_date: 1700042657,
  is_cancelled: false,
  is_vesting: false,
  rate: 86400,
  receiver: 'GDK3NJDFD3DG3OO5ZLSSSM56L7ULYKHVUH7UEWV3N5WQBMG4NP72A2O2',
  sender: 'GBLBJBTC2URCWUTIXY42W7M5GAZ2NIKTS4QF77BHHWHSBKKSPS2DTOHA',
  start_date: 1699956257,
  token: 'CBBDKFZZPWJQADUXHS3CCIXYRYVKK2SOPIOUDNA5SWXRC7B7APZN3I3H',
  withdrawn: '0',
  status: 'ongoing',
};
