import config from "./config";

export async function mochaGlobalSetup() {
	console.log(config);
	await config();
}