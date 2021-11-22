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
		this.gateway = 'https://coldcdn.com/api/cdn/v5ynur/ipfs/';
		this.backend = 'https://staging.sparklink.io'
	}
	get sparkAddr(){
		return getContractAddress();
	}
	
}
const config = new configs()
export default config
