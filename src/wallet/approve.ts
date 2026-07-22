import {
  type Address,
  Client,
  encodeFunctionData,
  erc20Abi,
  isAddress,
} from "viem";
import { writeContract } from "viem/actions";

type ApproveParams = {
  amount: bigint;
  spender: Address;
};

const assertApproveParams = function (parameters: ApproveParams) {
  const { amount, spender } = parameters;
  if (typeof amount !== "bigint") {
    throw new Error("Invalid amount");
  }
  if (!isAddress(spender)) {
    throw new Error("Invalid spender address");
  }
  if (amount <= BigInt(0)) {
    throw new Error("Invalid amount, must be greater than 0");
  }
};

export const approve = async function (
  client: Client,
  parameters: ApproveParams & { address: Address },
) {
  const { address, amount, spender } = parameters ?? {};
  if (!isAddress(address)) {
    throw new Error("Invalid address");
  }
  if (!client.account) {
    throw new Error("Client account is not set");
  }

  assertApproveParams({ amount, spender });

  return writeContract(client, {
    abi: erc20Abi,
    account: client.account,
    address,
    args: [spender, amount],
    chain: client.chain,
    functionName: "approve",
  });
};

export const encodeApproveData = function (parameters: ApproveParams) {
  const { amount, spender } = parameters ?? {};
  assertApproveParams({ amount, spender });

  return encodeFunctionData({
    abi: erc20Abi,
    args: [spender, amount],
    functionName: "approve",
  });
};
