import { zeroAddress, PublicClient } from "viem";
import { readContract } from "viem/actions";
import { describe, it, expect, vi } from "vitest";

import { decimals } from "../../src/public/decimals";

vi.mock("viem/actions", () => ({
  readContract: vi.fn(),
}));

// @ts-expect-error - We only create an empty client for testing purposes
const client: PublicClient = {};

describe("decimals", function () {
  it("should throw an error if the token address is not valid", async function () {
    const parameters = { address: "invalid_address" };

    await expect(decimals(client, parameters)).rejects.toThrow(
      "Invalid token address",
    );
  });

  it("should call readContract if the address is valid", async function () {
    const expectedDecimals = 18;
    const parameters = { address: zeroAddress };

    vi.mocked(readContract).mockResolvedValueOnce(expectedDecimals);

    const result = await decimals(client, parameters);

    expect(readContract).toHaveBeenCalledWith(client, {
      abi: expect.anything(),
      address: parameters.address,
      functionName: "decimals",
    });
    expect(result).toBe(expectedDecimals);
  });

  it("should handle empty parameters gracefully", async function () {
    const parameters = {};

    await expect(decimals(client, parameters)).rejects.toThrow(
      "Invalid token address",
    );
  });

  it("should handle no parameters gracefully", async function () {
    await expect(decimals(client, undefined)).rejects.toThrow(
      "Invalid token address",
    );
  });
});
