export interface IAttribute {
  display_type?: string;
  trait_type: string;
  value: number | "TRUE" | "FALSE" | string;
}

export interface IMetadata_1_0_0 {
  name: string;
  description: string;
  image: string;
  // the attributes should come from the result set of a call to toAttributes function.
  // You can add any attributes you like, but NEVER change or remove the result set.
  attributes: IAttribute[];
  version: "1.0.0";
  encryptMethod?: string
}

export interface IAttributesForm {
  bonusPercentage: number;
  fileAddress: string;
  filenameExtension: string;
  encrypted: boolean;
}

export function toAttributes(form: IAttributesForm): IAttribute[] {
  validateAttributesArgs(form);
  return [
    {
      display_type: "boost_percentage",
      trait_type: "Bonus Percentage",
      value: form.bonusPercentage,
    },
    {
      trait_type: "File Address",
      value: form.fileAddress,
    },
    {
      trait_type: "Filename Extension",
      value: form.filenameExtension,
    },
    {
      trait_type: "Encrypted",
      value: form.encrypted ? "TRUE" : "FALSE",
    },
  ];
}

export function fromAttributes(attributes: IAttribute[]): IAttributesForm {
  const result: any = {};
  const transformMap = {
    "Bonus Percentage": "bonusPercentage",
    "File Address": "fileAddress",
    "Filename Extension": "filenameExtension",
    "Encrypted": "encrypted"
  }
  for (const attribute of attributes) {
    let value = attribute.value as any;
    if(value === "TRUE") value = true;
    else if (value === "FALSE") value = false;
    result[transformMap[attribute.trait_type]] = value;
  }
  try {
    validateAttributesArgs(result);
  } catch (error) {
    throw new Error("The attributes are not in the version 1.0.0.");
  }
  return result as IAttributesForm;
}

function validateAttributesArgs(form: IAttributesForm) {
  if (form.bonusPercentage < 0 || form.bonusPercentage >= 100) {
    throw new Error(
      `bonusPercentage should be between 0 and 100, but now it is ${form.bonusPercentage}.`
    );
  }
  if (!form.fileAddress.startsWith("https://")) {
    throw new Error(
      `fileAddress should be a valid https url, but now it is ${form.fileAddress}.`
    );
  }
  if (!form.filenameExtension) {
    throw new Error("filenameExtension should be a non-empty string.");
  }
  if (typeof form.encrypted != "boolean") {
    throw new Error(
      `encrypted should be a boolean value, but now it is ${form.encrypted}`
    );
  }
}
