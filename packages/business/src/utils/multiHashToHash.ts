/**
 *
 * @param multiHash multi-hash in hex.
 */
export function multiHashToHash(multiHash: string) {
  if (!multiHash.startsWith("0x1220"))
    throw new Error(
      "Currently only sha-256 multi-hash is supported by this method."
    );
  return "0x" + multiHash.slice(6);
}
