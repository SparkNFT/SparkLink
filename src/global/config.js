import { getContractAddress } from '../utils/contract';

/*
 * @Author: Chan
 * @Date: 2021-10-26 16:02:25
 * @LastEditTime: 2021-10-26 16:04:10
 * @LastEditors: Chan
 * @Description: 全局变量
 */

class configs{
	constructor(){
		this.gateway = 'https://sparklink.mypinata.cloud/ipfs/';
		this.backend = 'https://staging.sparklink.io'
		this.pinata_secret_api_key = ''
		this.pinata_api_key = ''
	}
	get SparkAddr(){
		return getContractAddress();
	}
	setKey(pinata_api_key,pinata_secret_api_key){
		this.pinata_api_key = pinata_api_key;
		this.pinata_secret_api_key = pinata_secret_api_key;
	}

}
const config = new configs()
export default config
