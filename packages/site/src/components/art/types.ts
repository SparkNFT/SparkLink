import { getNftInfo } from "../../store/info";

export type NftInformation = Awaited<ReturnType<typeof getNftInfo>>