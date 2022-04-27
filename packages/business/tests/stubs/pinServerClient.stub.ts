import axios from "axios";
import sinon from "sinon";
import { PinataSeverClientBuilder } from "../../src/client/pinServer";
import { UniFile } from "../../src/utils/uniFile";

export interface IExpections {
  pinFileExpection(file: UniFile): void;
  pinJsonExpection(obj: object): void;
}

export function newBuilder(expections: IExpections) {
  const builder = new PinataSeverClientBuilder().axios(axios.create());
  let pinFileStub, pinJsonStub;
  let client;
  const stub = sinon.stub(builder, "build").callsFake(function () {
    client = stub.wrappedMethod.apply(this);
    const fakeReturned = {
      ipfsHash: "fake",
      pinSize: 1141514,
    };
    pinFileStub = sinon
      .stub(client, "pinFile")
      .callsFake(async function (file: UniFile) {
        expections.pinFileExpection(file);
        return fakeReturned;
      });
    pinJsonStub = sinon
      .stub(client, "pinJson")
      .callsFake(async function (obj: object) {
        expections.pinJsonExpection(obj);
        return fakeReturned;
      });
    return client;
  });
  return {
    clientBuilder: builder,
    getStub() {
      return { pinFileStub, pinJsonStub };
    },
    getClient() {
      return client;
    },
  };
}
