import { type Address, type Client, erc20Abi, isAddress } from "viem";
import { readContract } from "viem/actions";

export const totalSupply = async function (
  client: Client,
  parameters: { address: Address },
) {
  const { address } = parameters ?? {};

  if (!isAddress(address)) {
    throw new Error("Invalid address");
  }

  return readContract(client, {
    abi: erc20Abi,
    address,
    args: [],
    functionName: "totalSupply",
  });
};
