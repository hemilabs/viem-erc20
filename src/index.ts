import { type Account, type Chain, type Client, type Transport } from "viem";

import { allowance } from "./public/allowance.js";
import { balanceOf } from "./public/balanceOf.js";
import { decimals } from "./public/decimals.js";
import { name } from "./public/name.js";
import { symbol } from "./public/symbol.js";
import { totalSupply } from "./public/totalSupply.js";
import { approve } from "./wallet/approve.js";

export const erc20PublicActions =
  () =>
  <
    TTransport extends Transport = Transport,
    TChain extends Chain | undefined = Chain | undefined,
    TAccount extends Account | undefined = Account | undefined,
  >(
    client: Client<TTransport, TChain, TAccount>,
  ) => ({
    allowance: (params: Parameters<typeof allowance>[1]) =>
      allowance(client, params),
    balanceOf: (params: Parameters<typeof balanceOf>[1]) =>
      balanceOf(client, params),
    decimals: (params: Parameters<typeof decimals>[1]) =>
      decimals(client, params),
    name: (params: Parameters<typeof name>[1]) => name(client, params),
    symbol: (params: Parameters<typeof symbol>[1]) => symbol(client, params),
    totalSupply: (params: Parameters<typeof totalSupply>[1]) =>
      totalSupply(client, params),
  });

export const erc20WalletActions = () => (client: Client) => ({
  approve: (params: Parameters<typeof approve>[1]) => approve(client, params),
});
