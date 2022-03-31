import axios from "axios";
import Client, {
  ClientBuilder,
  IClaimPinataApiKeyAndStoreEncryptPasswordPayload,
  IRetrieveEncryptPasswordPayload,
  IRetrieveNftIdsPayload,
} from "../../src/client/keyServer";
import sinon from "sinon";
import { config } from "../configs";

export interface ClientExpections {
  claimAndStoreExpection(
    payload: IClaimPinataApiKeyAndStoreEncryptPasswordPayload
  ): void;
  retrieveNftIdsExpection(payload: IRetrieveNftIdsPayload): void;
  retrieveEncryptPasswordException(
    payload: IRetrieveEncryptPasswordPayload
  ): void;
}

export function newBuilder(expections: ClientExpections) {
  const clientBuilder = new ClientBuilder().axios(axios.create());
  let claimAndStoreStub, retrieveNftIdsStub, retrieveEncryptPasswordStub;
  let _client;
  const buildStub = sinon
    .stub(clientBuilder, "build")
    .callsFake(async function () {
      const client = await buildStub.wrappedMethod.apply(this);
      const passwordMap = new Map();
      const nftIdsMap = new Map();
      claimAndStoreStub = sinon
        .stub(client, "claimPinataApiKeyAndStoreEncryptPassword")
        .callsFake(async function (
          payload: IClaimPinataApiKeyAndStoreEncryptPasswordPayload
        ) {
          expections.claimAndStoreExpection(payload);
          passwordMap[payload.nft_id] = payload.key;
          if (!nftIdsMap.has(payload.account))
            nftIdsMap[payload.account] = new Map();
          if (!nftIdsMap[payload.account].has(payload.chain))
            nftIdsMap[payload.account][payload.chain] = [];
          (nftIdsMap[payload.account][payload.chain] as string[]).push(
            payload.nft_id
          );
          await this._authorizationThings.sign(JSON.stringify(payload));
          return {
            apiKey: config.execute.pinata?.apiKey ?? "a",
            secretApiKey: config.execute.pinata?.apiSecret ?? "a",
          };
        });
      retrieveNftIdsStub = sinon
        .stub(client, "retrieveNftIds")
        .callsFake(async function (payload: IRetrieveNftIdsPayload) {
          expections.retrieveNftIdsExpection(payload);
          const chainMap = nftIdsMap[payload.owner];
          if (!chainMap) return [];
          const ids = chainMap[payload.chain];
          if (!ids) return [];
          return ids;
        });
      retrieveEncryptPasswordStub = sinon
        .stub(client, "retrieveEncryptPassword")
        .callsFake(async function (payload: IRetrieveEncryptPasswordPayload) {
          expections.retrieveEncryptPasswordException(payload);
          await this._authorizationThings.sign(
            JSON.stringify({ ...payload, key: "" })
          );
          return passwordMap[payload.nft_id];
        });
      _client = client;
      return client;
    });
  return {
    clientBuilder,
    getStubs: () => ({
      claimAndStoreStub,
      retrieveNftIdsStub,
      retrieveEncryptPasswordStub,
    }),
    getClient: () => _client,
  };
}
