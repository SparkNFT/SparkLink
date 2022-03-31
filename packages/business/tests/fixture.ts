import config from "./configs";

export async function mochaGlobalSetup() {
  await config();
}