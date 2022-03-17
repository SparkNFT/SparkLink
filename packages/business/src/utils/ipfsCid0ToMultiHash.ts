import { base58_to_binary } from "base58-js";
import { bytesToHex } from "web3-utils";

export function ipfsCid0ToMultiHash(cid0: string) {
  const binary = base58_to_binary(cid0);
  return bytesToHex(binary);
}