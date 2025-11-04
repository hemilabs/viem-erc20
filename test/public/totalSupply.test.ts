import { PublicClient, zeroAddress } from "viem";
import { readContract } from "viem/actions";
import { describe, it, expect, vi } from "vitest";

import { totalSupply } from "../../src/public/totalSupply";

vi.mock("viem/actions", () => ({
  readContract: vi.fn(),
}));

// @ts-expect-error - We only create an empty client for testing purposes
const client: PublicClient = {};

const validParameters = {
  address: zeroAddress,
};

describe("totalSupply", function () {
  it("should throw an error if the address is not valid", async function () {
    const parameters = { address: "invalid_address" };

    await expect(totalSupply(client, parameters)).rejects.toThrow(
      "Invalid address",
    );
  });

  it("should call readContract if the address is valid", async function () {
    const expectedSupply = BigInt(1000);

    vi.mocked(readContract).mockResolvedValueOnce(expectedSupply);

    const result = await totalSupply(client, validParameters);

    expect(readContract).toHaveBeenCalledWith(client, {
      abi: expect.anything(),
      address: validParameters.address,
      args: [],
      functionName: "totalSupply",
    });
    expect(result).toBe(expectedSupply);
  });

  it("should handle empty parameters gracefully", async function () {
    const parameters = {};

    await expect(totalSupply(client, parameters)).rejects.toThrow(
      "Invalid address",
    );
  });

  it("should handle no parameters gracefully", async function () {
    await expect(totalSupply(client, undefined)).rejects.toThrow(
      "Invalid address",
    );
  });
});
