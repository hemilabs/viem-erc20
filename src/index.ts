import { type Account, type Chain, type Client, type Transport } from "viem";

import { getErc20TokenAllowance } from "./public/allowance.js";
import { getErc20TokenBalance } from "./public/balance.js";
import { getErc20TokenDecimals } from "./public/decimals.js";
import { getErc20TokenTotalSupply } from "./public/totalSupply.js";
import { approveErc20Token } from "./wallet/approve.js";

export const erc20PublicActions =
  () =>
  <
    TTransport extends Transport = Transport,
    TChain extends Chain | undefined = Chain | undefined,
    TAccount extends Account | undefined = Account | undefined,
  >(
    client: Client<TTransport, TChain, TAccount>,
  ) => ({
    getErc20TokenAllowance: (
      params: Parameters<typeof getErc20TokenAllowance>[1],
    ) => getErc20TokenAllowance(client, params),
    getErc20TokenBalance: (
      params: Parameters<typeof getErc20TokenBalance>[1],
    ) => getErc20TokenBalance(client, params),
    getErc20TokenDecimals: (
      params: Parameters<typeof getErc20TokenDecimals>[1],
    ) => getErc20TokenDecimals(client, params),
    getErc20TokenTotalSupply: (
      params: Parameters<typeof getErc20TokenTotalSupply>[1],
    ) => getErc20TokenTotalSupply(client, params),
  });

export const erc20WalletActions = () => (client: Client) => ({
  approveErc20Token: (params: Parameters<typeof approveErc20Token>[1]) =>
    approveErc20Token(client, params),
});
