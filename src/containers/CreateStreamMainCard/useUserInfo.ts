import { useAppSelector } from 'src/hooks/useRedux';

const useUserInfo = () => {
  const { asset_type, balance } = useAppSelector((state) => state.user?.info?.balances[0]);

  return { asset_type, balance };
};

export default useUserInfo;
