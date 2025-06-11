import { zeroAddress, PublicClient } from "viem";
import { readContract } from "viem/actions";
import { describe, it, expect, vi } from "vitest";

import { getErc20TokenDecimals } from "../../src/public/decimals";

vi.mock("viem/actions", () => ({
  readContract: vi.fn(),
}));

describe("getErc20TokenDecimals", function () {
  it("should throw an error if the token address is not valid", async function () {
    // @ts-expect-error - We only create an empty client for testing purposes
    const client: PublicClient = {};
    const parameters = { address: "invalid_address" };

    await expect(getErc20TokenDecimals(client, parameters)).rejects.toThrow(
      "Invalid token address",
    );
  });

  it("should call readContract if the address is valid", async function () {
    const decimals = 18;
    // @ts-expect-error - We only create an empty client for testing purposes
    const client: PublicClient = {};
    const parameters = { address: zeroAddress };

    vi.mocked(readContract).mockResolvedValueOnce(decimals);

    const result = await getErc20TokenDecimals(client, parameters);

    expect(readContract).toHaveBeenCalledWith(client, {
      abi: expect.anything(),
      address: zeroAddress,
      functionName: "decimals",
    });
    expect(result).toBe(decimals);
  });

  it("should handle empty parameters gracefully", async function () {
    // @ts-expect-error - We only create an empty client for testing purposes
    const client: PublicClient = {};
    const parameters = {};

    await expect(getErc20TokenDecimals(client, parameters)).rejects.toThrow(
      "Invalid token address",
    );
  });

  it("should handle no parameters gracefully", async function () {
    // @ts-expect-error - We only create an empty client for testing purposes
    const client: PublicClient = {};

    await expect(getErc20TokenDecimals(client, undefined)).rejects.toThrow(
      "Invalid token address",
    );
  });
});
