import { scValToNative, Contract, Server, Address } from "soroban-client";

import createTransaction from "../../utils/soroban/baseTransaction";
// import getServer from "../getServer";
// import ToScVal from "../scVal";

export const getERC20Balance = async (
  user: string,
  contract: Contract
): Promise<string> => {
  // const server = getServer();
  const server = new Server(String("https://rpc-futurenet.stellar.org"));
  const account = await server.getAccount(user);

  const addressScVal = Address.fromString(user).toScVal();
  const call = contract.call("balance", addressScVal);
  const transactionResult = createTransaction(account, call);

  const txSimulate = await server.simulateTransaction(transactionResult);
  const retval: bigint = scValToNative(Object(txSimulate).result.retval);

  return retval.toString();
};

export default getERC20Balance;
