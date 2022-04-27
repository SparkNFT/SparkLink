import { utils } from "ethers";

export class Address {
  private readonly _value: string;
  get value() {
    return this._value;
  }

  constructor(value: string) {
    if (value.startsWith("0x")) this._value = utils.getAddress(value);
    else throw new AddressError();
  }

  isZeroAddress() {
    const num = parseInt(this.value);
    return !num;
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
