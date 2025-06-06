import { PublicClient, zeroAddress } from "viem";
import { readContract } from "viem/actions";
import { describe, it, expect, vi } from "vitest";

import { getErc20TokenTotalSupply } from "../../src/public/totalSupply";

vi.mock("viem/actions", () => ({
  readContract: vi.fn(),
}));

const validParameters = {
  address: zeroAddress,
};

describe("getErc20TokenTotalSupply", function () {
  it("should throw an error if the address is not valid", async function () {
    // @ts-expect-error - We only create an empty client for testing purposes
    const client: PublicClient = {};
    const parameters = { address: "invalid_address" };

    await expect(getErc20TokenTotalSupply(client, parameters)).rejects.toThrow(
      "Invalid address",
    );
  });

  it("should call readContract if the address is valid", async function () {
    const totalSupply = BigInt(1000);
    // @ts-expect-error - We only create an empty client for testing purposes
    const client: PublicClient = {};
    const parameters = { ...validParameters };

    vi.mocked(readContract).mockResolvedValueOnce(totalSupply);

    const result = await getErc20TokenTotalSupply(client, parameters);

    expect(readContract).toHaveBeenCalledWith(client, {
      abi: expect.anything(),
      address: zeroAddress,
      args: [],
      functionName: "totalSupply",
    });
    expect(result).toBe(totalSupply);
  });

  it("should handle empty parameters gracefully", async function () {
    // @ts-expect-error - We only create an empty client for testing purposes
    const client: PublicClient = {};
    const parameters = {};

    await expect(getErc20TokenTotalSupply(client, parameters)).rejects.toThrow(
      "Invalid address",
    );
  });

  it("should handle no parameters gracefully", async function () {
    // @ts-expect-error - We only create an empty client for testing purposes
    const client: PublicClient = {};

    await expect(getErc20TokenTotalSupply(client, undefined)).rejects.toThrow(
      "Invalid address",
    );
  });
});
