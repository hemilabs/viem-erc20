import { type Address, Client, erc20Abi, isAddress } from "viem";
import { writeContract } from "viem/actions";

export const approve = async function (
  client: Client,
  parameters: {
    address: Address;
    amount: bigint;
    spender: Address;
  },
) {
  const { address, amount, spender } = parameters;
  if (!isAddress(address)) {
    throw new Error("Invalid address");
  }
  if (typeof amount !== "bigint") {
    throw new Error("Invalid amount");
  }
  if (!isAddress(spender)) {
    throw new Error("Invalid spender address");
  }
  if (amount <= BigInt(0)) {
    throw new Error("Invalid amount, must be greater than 0");
  }
  if (!client.account) {
    throw new Error("Client account is not set");
  }

  return writeContract(client, {
    abi: erc20Abi,
    account: client.account,
    address,
    args: [spender, amount],
    chain: client.chain,
    functionName: "approve",
  });
};
