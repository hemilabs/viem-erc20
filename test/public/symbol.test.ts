import { zeroAddress, PublicClient } from "viem";
import { readContract } from "viem/actions";
import { describe, it, expect, vi } from "vitest";

import { symbol } from "../../src/public/symbol";

vi.mock("viem/actions", () => ({
  readContract: vi.fn(),
}));

// @ts-expect-error - We only create an empty client for testing purposes
const client: PublicClient = {};

describe("symbol", function () {
  it("should throw an error if the token address is not valid", async function () {
    const parameters = { address: "invalid_address" };

    await expect(symbol(client, parameters)).rejects.toThrow(
      "Invalid token address",
    );
  });

  it("should call readContract if the address is valid", async function () {
    const tokenSymbol = "DAI";
    const parameters = { address: zeroAddress };

    vi.mocked(readContract).mockResolvedValueOnce(tokenSymbol);

    const result = await symbol(client, parameters);

    expect(readContract).toHaveBeenCalledWith(client, {
      abi: expect.anything(),
      address: parameters.address,
      functionName: "symbol",
    });
    expect(result).toBe(tokenSymbol);
  });

  it("should handle empty parameters gracefully", async function () {
    const parameters = {};

    await expect(symbol(client, parameters)).rejects.toThrow(
      "Invalid token address",
    );
  });

  it("should handle no parameters gracefully", async function () {
    await expect(symbol(client, undefined)).rejects.toThrow(
      "Invalid token address",
    );
  });
});
