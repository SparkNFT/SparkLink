import Web3 from "web3";

export function getCurrentAccount(web3: Web3) {
	return web3.defaultAccount ?? web3.eth.getAccounts()[0];
}