import { TOKENPOCKET, METAMASK, LASTCONNECT, MATHWALLET } from '../global/globalsString'
const mathwallet = require('math-js-sdk');
const tp = require('tp-js-sdk');

const getWalletAccount = async () => {
	const lastConnect = localStorage.getItem(LASTCONNECT);
	if (lastConnect) {
		let value, accounts, account;
		switch (lastConnect) {
		case TOKENPOCKET:
			value = await tp.getCurrentWallet()
			account = value.data.address;
			break;
		case MATHWALLET:
			value = await mathwallet.getCurrentWallet()
			account = value.address;
			break;
		case METAMASK:
			accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
			account = accounts[0];
			//alert("hello")
			break;
		default:
			// accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
			// account = accounts[0];
			break;    
		}
		return account;
	}
	else {
		return -1;
	}

}
export default getWalletAccount;