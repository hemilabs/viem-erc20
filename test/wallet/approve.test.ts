import { zeroAddress } from "viem";
import { WalletClient } from "viem";
import { writeContract } from "viem/actions";
import { hemiSepolia } from "viem/chains";
import { describe, it, expect, vi } from "vitest";

import { approve } from "../../src/wallet/approve";

vi.mock("viem/actions", () => ({
  writeContract: vi.fn(),
}));

// @ts-expect-error - We only create an empty client for testing purposes
const client: WalletClient = { account: zeroAddress, chain: hemiSepolia };

const validParameters = {
  address: zeroAddress,
  amount: BigInt(1000),
  spender: zeroAddress,
};

describe("approve", function () {
  it("should throw an error if the token address is not valid", async function () {
    const parameters = { ...validParameters, address: "invalid_address" };

    await expect(approve(client, parameters)).rejects.toThrow(
      "Invalid address",
    );
  });

  it("should throw an error if the spender address is not valid", async function () {
    const parameters = { ...validParameters, spender: "invalid_spender" };

    await expect(approve(client, parameters)).rejects.toThrow(
      "Invalid spender address",
    );
  });

  it("should throw an error if the amount is not a bigint", async function () {
    const parameters = { ...validParameters, amount: 1000 }; // Not a bigint

    await expect(approve(client, parameters)).rejects.toThrow("Invalid amount");
  });

  it("should throw an error if the amount is less than or equal to 0", async function () {
    const parameters = { ...validParameters, amount: BigInt(0) };

    await expect(approve(client, parameters)).rejects.toThrow(
      "Invalid amount, must be greater than 0",
    );
  });

  it("should throw an error if the client account is not set", async function () {
    const badClient: WalletClient = { chain: hemiSepolia };

    await expect(approve(badClient, validParameters)).rejects.toThrow(
      "Client account is not set",
    );
  });

  it("should call writeContract if all parameters are valid", async function () {
    vi.mocked(writeContract).mockResolvedValueOnce({ success: true });

    const result = await approve(client, validParameters);

    expect(writeContract).toHaveBeenCalledWith(client, {
      abi: expect.anything(),
      account: client.account,
      address: validParameters.address,
      args: [validParameters.spender, validParameters.amount],
      chain: client.chain,
      functionName: "approve",
    });
    expect(result).toEqual({ success: true });
  });
});
