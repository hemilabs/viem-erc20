import { createPublicClient, createWalletClient, http, isHash } from "viem";
import { mnemonicToAccount } from "viem/accounts";
import { waitForTransactionReceipt } from "viem/actions";
import { hemi } from "viem/chains";
import { describe, expect, inject, it } from "vitest";

import { allowance } from "../../src/public/allowance";
import { approve } from "../../src/wallet/approve";

// Using a known token from the Hemi chain
const hemiToken = "0x99e3dE3817F6081B2568208337ef83295b7f591D" as const;
// well knon mnemonic from Anvil
const anvilMnemonic =
  "test test test test test test test test test test test junk";

const account = mnemonicToAccount(anvilMnemonic, { addressIndex: 0 });
const spenderAccount = mnemonicToAccount(anvilMnemonic, { addressIndex: 1 });

describe("wallet actions e2e", function () {
  it("should approve and verify allowance", async function () {
    const anvilUrl = inject("anvilUrl");

    const walletClient = createWalletClient({
      account,
      chain: hemi,
      transport: http(anvilUrl),
    });

    const publicClient = createPublicClient({
      chain: hemi,
      transport: http(anvilUrl),
    });
    const amount = BigInt(1000);
    const spender = spenderAccount.address;

    const hash = await approve(walletClient, {
      address: hemiToken,
      amount,
      spender,
    });

    expect(isHash(hash)).toBe(true);

    const receipt = await waitForTransactionReceipt(publicClient, { hash });
    expect(receipt.status).toBe("success");

    const result = await allowance(publicClient, {
      address: hemiToken,
      owner: account.address,
      spender,
    });
    expect(result).toBe(amount);
  });
});
