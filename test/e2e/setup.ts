import { anvilFork } from "@hemilabs/anvil-fork-setup";
import { hemi } from "viem/chains";

export default anvilFork({
  chainId: hemi.id,
  forkUrl: hemi.rpcUrls.default.http[0],
});
