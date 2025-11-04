# viem-erc20

[![NPM version](https://img.shields.io/npm/v/viem-erc20)](https://www.npmjs.com/package/viem-erc20) [![Package size](https://img.shields.io/bundlephobia/minzip/viem-erc20)](https://bundlephobia.com/package/viem-erc20) [![Follow Hemi on X](https://img.shields.io/twitter/url?url=https%3A%2F%2Fx.com%2Fhemi_xyz&style=flat&logo=x&label=%40hemi_xyz&labelColor=%23ff6c15&color=%230a0a0a)](https://x.com/intent/follow?screen_name=hemi_xyz)

[Viem](https://viem.sh/) extensions for [ERC20](https://docs.openzeppelin.com/contracts/4.x/api/token/erc20) tokens.

## Installation

Install `viem` and `viem-erc20` as dependencies:

```sh
npm install viem viem-erc20
```

## Methods

This package provides ESM-friendly helpers for interacting with ERC20 contracts using viem.

### `allowance`

Reads the [allowance](https://docs.openzeppelin.com/contracts/4.x/api/token/erc20#IERC20-allowance-address-address-) of a spender for a given owner.

```ts
allowance(client, { address, owner, spender });
```

- **client**: `Client` (from viem) — required
- **address**: `Address` — ERC20 contract address (required)
- **owner**: `Address` — Token holder address (required)
- **spender**: `Address` — Spender address (required)

**Example:**

```ts
import { allowance } from "viem-erc20/actions";
const result = await allowance(client, {
  address: "0x6B175474E89094C44Da98b954EedeAC495271d0F", // DAI
  owner: "0xYourWalletAddress",
  spender: "0xSpenderAddress",
});
```

### `balanceOf`

Reads the [balance](https://docs.openzeppelin.com/contracts/4.x/api/token/erc20#IERC20-balanceOf-address-)
of an account.

```ts
balanceOf(client, { account, address });
```

- **client**: `Client` (from viem) — required
- **account**: `Address` — Account to check balance for (required)
- **address**: `Address` — ERC20 contract address (required)

**Example:**

```ts
import { balanceOf } from "viem-erc20/actions";
const balance = await balanceOf(client, {
  account: "0xYourWalletAddress",
  address: "0x6B175474E89094C44Da98b954EedeAC495271d0F", // DAI
});
```

### `decimals`

Reads the [decimals](https://docs.openzeppelin.com/contracts/4.x/api/token/erc20#ERC20-decimals--) value of an ERC20 token contract.

```ts
decimals(client, { address });
```

- **client**: `Client` (from viem) — required
- **address**: `Address` — ERC20 contract address (required)

**Example:**

```ts
import { decimals } from "viem-erc20/actions";
const tokenDecimals = await decimals(client, {
  address: "0x6B175474E89094C44Da98b954EedeAC495271d0F", // DAI
});
```

### `name`

Reads the [name](https://docs.openzeppelin.com/contracts/4.x/api/token/erc20#ERC20-name--) value of an ERC20 token contract.

```ts
name(client, { address });
```

- **client**: `Client` (from viem) — required
- **address**: `Address` — ERC20 contract address (required)

**Example:**

```ts
import { name } from "viem-erc20/actions";
const tokenName = await name(client, {
  address: "0x6B175474E89094C44Da98b954EedeAC495271d0F", // DAI
});
```

### `symbol`

Reads the [symbol](https://docs.openzeppelin.com/contracts/4.x/api/token/erc20#ERC20-symbol--) value of an ERC20 token contract.

```ts
symbol(client, { address });
```

- **client**: `Client` (from viem) — required
- **address**: `Address` — ERC20 contract address (required)

**Example:**

```ts
import { symbol } from "viem-erc20/actions";
const tokenSymbol = await symbol(client, {
  address: "0x6B175474E89094C44Da98b954EedeAC495271d0F", // DAI
});
```

### `totalSupply`

Gets the [total supply](https://docs.openzeppelin.com/contracts/4.x/api/token/erc20#IERC20-totalSupply--) of the ERC20 token.

```ts
totalSupply(client, { address });
```

- **client**: `Client` (from viem) — required
- **address**: `Address` — ERC20 contract address (required)

**Example:**

```ts
import { totalSupply } from "viem-erc20/actions";
const tokenSupply = await totalSupply(client, {
  address: "0x6B175474E89094C44Da98b954EedeAC495271d0F", // DAI
});
```

### `approve`

Sends an [approval](https://docs.openzeppelin.com/contracts/4.x/api/token/erc20#IERC20-approve-address-uint256-) transaction to allow a spender to spend tokens on behalf of the owner.

```ts
approve(walletClient, { address, spender, amount });
```

- **walletClient**: `WalletClient` (from viem) — required
- **address**: `Address` — ERC20 contract address (required)
- **spender**: `Address` — Spender address (required)
- **amount**: `bigint` — Amount to approve (required, must be > 0)

**Example:**

```ts
import { approve } from "viem-erc20/actions";
const tx = await approve(walletClient, {
  address: "0x6B175474E89094C44Da98b954EedeAC495271d0F", // DAI
  spender: "0xSpenderAddress",
  amount: 1000000000000000000n, // 1 DAI (in wei)
});
```

## Usage with `.extend()`

You can extend your viem client with ERC20 actions using `.extend()` and the provided helpers:

```ts
import { createPublicClient, createWalletClient, http } from "viem";
import { erc20PublicActions, erc20WalletActions } from "viem-erc20";

// Example: extending a public client
const publicClient = createPublicClient({
  chain, // your chain config
  transport: http(),
}).extend(erc20PublicActions());

// Now you can call:
const tokenAllowance = await publicClient.allowance({
  address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
  owner: "0xYourWalletAddress",
  spender: "0xSpenderAddress",
});

// Example: extending a wallet client
const walletClient = createWalletClient({
  account, // your account config
  chain, // your chain config
  transport: http(),
}).extend(erc20WalletActions());

// Now you can call:
const tx = await walletClient.approve({
  address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
  spender: "0xSpenderAddress",
  amount: 1000000000000000000n,
});
```

## Local Setup

To install the dependencies, run:

```sh
npm install
```

To run the tests, run:

```sh
npm test
```
