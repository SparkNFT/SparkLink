import { ipfsCdnUrlToCid0 } from "./toIpfsCid0";
import { join } from "./url";

export function ipfsCdnUrlExchange(
  oldCdnUrl: string,
  newCdnUrlBase: string
): string {
  const cid0 = ipfsCdnUrlToCid0(oldCdnUrl);
  return join(newCdnUrlBase, cid0);
}
