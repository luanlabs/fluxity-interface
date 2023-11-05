import { Contract } from 'soroban-client';

const getContract = (address: string) => {
  return new Contract(address);
};
export default getContract;
