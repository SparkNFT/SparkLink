import { TOKENPOCKET, METAMASK, LASTCONNECT, MATHWALLET } from '../global/globalsString'
const mathwallet = require('math-js-sdk');
const tp = require('tp-js-sdk');
// import { message } from 'antd'

export const getWalletAccount = async () => {
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

export const getChainNameByChainId = (chainId) => {
	let chainName;
	switch (chainId) {
	case '0x89':
		chainName = 'matic';
		break;
	case '0x1':
		chainName = 'eth';
		break;
	case '0x38':
		chainName = 'bsc';
		break;
	}
	return chainName;
}

export const getChainIdByChainName = (chainName) => {
	let chainId;
	switch (chainName) {
	case 'matic':
		chainId = '0x89';
		break;
	case 'eth':
		chainId = '0x1';
		break;
	case 'bsc':
		chainId = '0x38';
		break;
	}
	return chainId;
}

export const getChainId = async () => {
	const lastConnect = localStorage.getItem(LASTCONNECT);
	if (lastConnect) {
		let chainId, tpWallet;
		switch (lastConnect) {
		case TOKENPOCKET:
			tpWallet = await tp.getCurrentWallet();
			chainId = await getChainIdByChainName(tpWallet.data.blockchain);
			break;
		case MATHWALLET:
			break;
		case METAMASK:
			chainId = await window.ethereum.request({ method: 'eth_chainId' })
			break;
		default:
			// accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
			// account = accounts[0];
			break;
		}
		return chainId;
	}
	else {
		return null;
	}
}

export const getChainName = async () => {
	const chainId = await getChainId();
	if (chainId) {
		let chainName;
		switch (chainId) {
		case '0x89':
			chainName = 'matic';
			break;
		case '0x1':
			chainName = 'eth';
			break;
		case '0x38':
			chainName = 'bsc';
			break;
		}
		return chainName;
	}
	else {
		return null;
	}
}

export const switchChain = async (chainId) => {
	const lastConnect = localStorage.getItem(LASTCONNECT);
	const currentChainId = await getChainId();
	const toChainName = await getChainNameByChainId(chainId);
	//alert(toChainName)
	if(chainId !== currentChainId) {
		switch (lastConnect) {
		case METAMASK:
			try {
				await window.ethereum.request({
					method: 'wallet_switchEthereumChain',
					params: [
						{
							chainId: chainId,
						},
					],
				})
				localStorage.setItem('chainId', chainId);
				return true;
			}
			catch (e) {
				// message.error(e);
				return false;
			}
		case TOKENPOCKET:
			try {
				tp.getWallet({walletTypes: [toChainName], switch: true});
				localStorage.setItem('chainId', chainId);
				return true;
			}
			catch (e) {
				// message.error(e);
				return false;
			}
		case MATHWALLET:
			break;
		}
	}
}

