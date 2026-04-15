import { createPublicClient, http, zeroAddress } from "viem";
import { hemi } from "viem/chains";
import { describe, expect, it } from "vitest";

import { allowance } from "../../src/public/allowance";
import { balanceOf } from "../../src/public/balanceOf";
import { decimals } from "../../src/public/decimals";
import { name } from "../../src/public/name";
import { symbol } from "../../src/public/symbol";
import { totalSupply } from "../../src/public/totalSupply";

// Using a known token from the Hemi chain
const hemiToken = "0x99e3dE3817F6081B2568208337ef83295b7f591D" as const;

const client = createPublicClient({
  chain: hemi,
  transport: http(),
});

describe("public actions e2e", function () {
  it("should return the token name as a string", async function () {
    const result = await name(client, { address: hemiToken });
    expect(typeof result).toBe("string");
  });

  it("should return the token symbol as a string", async function () {
    const result = await symbol(client, { address: hemiToken });
    expect(typeof result).toBe("string");
  });

  it("should return the token decimals as a number", async function () {
    const result = await decimals(client, { address: hemiToken });
    expect(typeof result).toBe("number");
  });

  it("should return the total supply as a bigint", async function () {
    const result = await totalSupply(client, { address: hemiToken });
    expect(typeof result).toBe("bigint");
  });

  it("should return the balance as a bigint", async function () {
    const result = await balanceOf(client, {
      account: zeroAddress,
      address: hemiToken,
    });
    expect(typeof result).toBe("bigint");
  });

  it("should return the allowance as a bigint", async function () {
    const result = await allowance(client, {
      address: hemiToken,
      owner: zeroAddress,
      spender: zeroAddress,
    });
    expect(typeof result).toBe("bigint");
  });
});
