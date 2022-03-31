import { ipfsCid0ToMultiHash } from "./ipfsCid0ToMultiHash";
import { ipfsCdnUrlToCid0 } from "./toIpfsCid0";

export function ipfsCdnUrlToMultiHashInHex(cdnUrl: string) {
  const cid0 = ipfsCdnUrlToCid0(cdnUrl);
  const multiHashInHex = ipfsCid0ToMultiHash(cid0);
  return multiHashInHex;
}
