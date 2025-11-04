import { zeroAddress } from "viem";
import { PublicClient } from "viem";
import { readContract } from "viem/actions";
import { describe, it, expect, vi } from "vitest";

import { balanceOf } from "../../src/public/balanceOf";

vi.mock("viem/actions", () => ({
  readContract: vi.fn(),
}));

// @ts-expect-error - We only create an empty client for testing purposes
const client: PublicClient = {};

const validParameters = {
  account: zeroAddress,
  address: zeroAddress,
};

describe("balanceOf", function () {
  it("should throw an error if the account address is not valid", async function () {
    const parameters = { ...validParameters, account: "invalid_account" };

    await expect(balanceOf(client, parameters)).rejects.toThrow(
      "Invalid account",
    );
  });

  it("should throw an error if the token address is not valid", async function () {
    const parameters = { ...validParameters, address: "invalid_address" };

    await expect(balanceOf(client, parameters)).rejects.toThrow(
      "Invalid owner address",
    );
  });

  it("should call readContract if all addresses are valid", async function () {
    const balance = BigInt(1000);

    vi.mocked(readContract).mockResolvedValueOnce(balance);

    const result = await balanceOf(client, validParameters);

    expect(readContract).toHaveBeenCalledWith(client, {
      abi: expect.anything(),
      address: validParameters.address,
      args: [validParameters.account],
      functionName: "balanceOf",
    });
    expect(result).toBe(balance);
  });

  it("should handle empty parameters gracefully", async function () {
    const parameters = {};

    await expect(balanceOf(client, parameters)).rejects.toThrow(
      "Invalid account",
    );
  });

  it("should handle no parameters gracefully", async function () {
    await expect(balanceOf(client, undefined)).rejects.toThrow(
      "Invalid account",
    );
  });
});
