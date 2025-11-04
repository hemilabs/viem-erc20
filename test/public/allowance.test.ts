import { zeroAddress } from "viem";
import { PublicClient } from "viem";
import { readContract } from "viem/actions";
import { describe, it, expect, vi } from "vitest";

import { allowance } from "../../src/public/allowance";

vi.mock("viem/actions", () => ({
  readContract: vi.fn(),
}));

// @ts-expect-error - We only create an empty client for testing purposes
const client: PublicClient = {};

const validParameters = {
  address: zeroAddress,
  owner: zeroAddress,
  spender: zeroAddress,
};

describe("allowance", function () {
  it("should throw an error if the address is not valid", async function () {
    const parameters = { ...validParameters, address: "invalid_address" };

    await expect(allowance(client, parameters)).rejects.toThrow(
      "Invalid address",
    );
  });

  it("should throw an error if the owner address is not valid", async function () {
    const parameters = { ...validParameters, owner: "invalid_owner" };

    await expect(allowance(client, parameters)).rejects.toThrow(
      "Invalid owner address",
    );
  });

  it("should throw an error if the spender address is not valid", async function () {
    const parameters = { ...validParameters, spender: "invalid_spender" };

    await expect(allowance(client, parameters)).rejects.toThrow(
      "Invalid spender address",
    );
  });

  it("should call readContract if all addresses are valid", async function () {
    const mockedAllowance = BigInt(0);

    vi.mocked(readContract).mockResolvedValueOnce(mockedAllowance);

    const result = await allowance(client, validParameters);

    expect(readContract).toHaveBeenCalledWith(client, {
      abi: expect.anything(),
      address: validParameters.address,
      args: [validParameters.owner, validParameters.spender],
      functionName: "allowance",
    });
    expect(result).toBe(mockedAllowance);
  });

  it("should handle empty parameters gracefully", async function () {
    const parameters = {};

    await expect(allowance(client, parameters)).rejects.toThrow(
      "Invalid address",
    );
  });

  it("should handle no parameters gracefully", async function () {
    await expect(allowance(client, undefined)).rejects.toThrow(
      "Invalid address",
    );
  });
});
