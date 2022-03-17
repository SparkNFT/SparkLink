import {toChecksumAddress} from "web3-utils";

export class Address {
  private readonly _value: string;
  get value() {
    return this._value;
  }

  constructor(value: string) {
    if (value.startsWith("0x")) this._value = toChecksumAddress(value);
    else throw new AddressError();
  }

  toString() {
    return this._value;
  }
}

class AddressError extends Error {
  constructor(message = 'Address should begin with "0x".') {
    super(message);
    this.name = "AddressError";
  }
}
