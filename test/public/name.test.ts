import { zeroAddress, PublicClient } from "viem";
import { readContract } from "viem/actions";
import { describe, it, expect, vi } from "vitest";

import { name } from "../../src/public/name";

vi.mock("viem/actions", () => ({
  readContract: vi.fn(),
}));

// @ts-expect-error - We only create an empty client for testing purposes
const client: PublicClient = {};

describe("name", function () {
  it("should throw an error if the token address is not valid", async function () {
    const parameters = { address: "invalid_address" };

    await expect(name(client, parameters)).rejects.toThrow(
      "Invalid token address",
    );
  });

  it("should call readContract if the address is valid", async function () {
    const tokenName = "TokenName";
    const parameters = { address: zeroAddress };

    vi.mocked(readContract).mockResolvedValueOnce(tokenName);

    const result = await name(client, parameters);

    expect(readContract).toHaveBeenCalledWith(client, {
      abi: expect.anything(),
      address: parameters.address,
      functionName: "name",
    });
    expect(result).toBe(tokenName);
  });

  it("should handle empty parameters gracefully", async function () {
    const parameters = {};

    await expect(name(client, parameters)).rejects.toThrow(
      "Invalid token address",
    );
  });

  it("should handle no parameters gracefully", async function () {
    await expect(name(client, undefined)).rejects.toThrow(
      "Invalid token address",
    );
  });
});
