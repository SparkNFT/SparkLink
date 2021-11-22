import React, { Component } from 'react'
import '../App.css'
import Button from '@material-ui/core/Button'
import { createTheme, ThemeProvider, withStyles } from '@material-ui/core/styles'
import { blue } from '@material-ui/core/colors'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import { message, Checkbox } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import Dragger from 'antd/lib/upload/Dragger'
import { CloudUploadOutlined } from '@ant-design/icons'
// import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import { Input, InputNumber, Select, Spin } from 'antd'
import 'antd/dist/antd.css'
import TopBar from '../components/TopBar'
import axios from 'axios'
import contract, { freshContract } from '../utils/contract'
import web3 from '../utils/web3'
import Paper from '@material-ui/core/Paper'
import * as tokens_matic from '../global/tokens_list_matic.json'
import * as tokens_bsc from '../global/tokens_list_bsc.json'
import * as tokens_eth from '../global/tokens_list_eth.json'
import { withTranslation } from 'react-i18next'
//import { TOKENPOCKET, METAMASK, LASTCONNECT, MATHWALLET } from '../global/globalsString'
import withCommon from '../styles/common'
import Footer from '../components/Footer'
import { generateZipFile } from '../utils/zipFile.js'
import { getWalletAccount, getChainName, getChainId } from '../utils/getWalletAccountandChainID'
import Swtich from '@material-ui/core/Switch'
import config from '../global/config'
import { CircularProgress, Dialog, DialogContent, DialogTitle ,DialogActions} from '@material-ui/core'
// const receiptDataTypes = [
// 	{ type: 'address', name: 'publisher', indexed: true },
// 	{ type: 'uint64', name: 'rootNFTId', indexed: true },
// 	{ type: 'address', name: 'token_addr' },
// ]

// const mathwallet = require('math-js-sdk');
// const tp = require('tp-js-sdk');
const { pinata_api_key, pinata_secret_api_key } = require('../project.secret.js')
const BigNumber = require('bignumber.js');
const { backend } = config
const FormData = require('form-data')
const bs58 = require('bs58')
const { Option } = Select
const abi = require('erc-20-abi')
let CryptoJS = require('crypto-js')
const theme = createTheme({
	palette: {
		primary: {
			main: '#2196f3',
		},
		secondary: {
			main: '#EF8F71',
		},
	},
})

const sleep = (milliseconds) => {
	const date = Date.now();
	let currentDate = null;
	do {
		currentDate = Date.now();
	} while (currentDate - date < milliseconds);
}


const styles = (theme) => ({
	h5: {
		color: '#757575'
	},
	h3: {
		marginTop: 20
	},
	main: {
		maxWidth: '100vw'
	},
	titleCon: {
		marginTop: 50,
		fontFamily: 'ANC,source-han-sans-simplified-c, sans-serif',
		[theme.breakpoints.between('xs', 'sm')]: {
			fontSize: 30,
		},
		[theme.breakpoints.up('sm')]: {
			fontSize: 40,
		},
	},
	paperImg: {
		backgroundColor: '#EFEBE9',
		inherit: 'PaddingL5,PaddingR5,PaddingT5,PaddingB5'
	},
	coverImg: {
		[theme.breakpoints.between('xs', 'sm')]: {
			width: '80vw'
		},
		[theme.breakpoints.between('sm', 'md')]: {
			width: '30vw'
		},
		[theme.breakpoints.between('md', 'lg')]: {
			width: '30vw'
		},
		[theme.breakpoints.between('lg', 'xl')]: {
			width: '30vw'
		},
		[theme.breakpoints.up('xl')]: {
			width: '30vw'
		},
	},
	checkBox: {
		[theme.breakpoints.between('xs', 'sm')]: {
			marginLeft: '0px !important'
		},
	},
	titlePub: {
		marginTop: '3%',
		fontFamily: 'ANC,source-han-sans-simplified-c, sans-serif',
		[theme.breakpoints.between('xs', 'sm')]: {
			fontSize: 20,
		},
		[theme.breakpoints.up('sm')]: {
			fontSize: 30,
		},
	},
	btn: {
		inherit: 'MarginT5'
	},
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		fontFamily: 'ANC,source-han-sans-simplified-c, sans-serif',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: blue[500],
		width: 60,
		height: 60,
	},
	form: {
		width: '80%',
		marginTop: theme.spacing(7),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	fileBtn: {
		padding: '10px 30px 10px 30px',
		background: '#66C1E4',
		border: 'none',
		color: '#FFF',
		boxShadow: '1px 1px 1px #4C6E91',
	},
	button: {
		margin: theme.spacing(1),
		fontSize: 20,
		borderRadius: 25,
		color: '#FFFFFF',
		backgroundColor: '#2196f3',
	},
	input: {
		height: 40,
		borderRadius: 3,
		width: '100%',
		['@media (min-width:3200px)']: {
			height: 100
		}
	},
	inputNum: {
		height: 40,
		borderRadius: 3,
		width: '100%',
		fontSize: 20,
		['@media (min-width:3200px)']: {
			height: 100
		}
	},
	btnMini: {
		inherit: 'MarginT10'
	},
	Display9: {
		inherit: 'MarginT9,DisplaySeBold9'

	}
})

class PublishEx extends Component {
	constructor(props) {
		super(props);
		//this.onCheckBoxChange = this.
	}

	state = {
		name: '',
		bonusFee: 0,
		price: 0,
		buffer: null,
		ipfsHashCover: '',
		ipfsMeta: '',
		description: '',
		shareTimes: 0,
		onLoading: false,
		rootNFTId: '',
		userAccount: '',
		sig: '',
		finished: false,
		coverURL: '',
		data: [],
		token_addr: null,
		token_symbol: '',
		decimal: 0,
		fileList: [],
		isNC: true,
		isND: false,
		isFree: false,
		uploadBtnDisable: false,
		encryptedPublish: false,
		submitError: false,
		submitDialogText: '',
		submitOk:false,
		isFillFiles:false,
		nowNFT:'',
		onLoadingSpin:false
	}
	UNSAFE_componentWillMount() {
		switch (localStorage.getItem('chainId')) {
		case '0x89':
			this.tokens = tokens_matic;
			this.setState({
				token_symbol: 'MATIC',
			})
			break;
		case '0x38':
			this.tokens = tokens_bsc;
			this.setState({
				token_symbol: 'BNB',
			})
			break;
		default:
			this.tokens = tokens_eth;
			this.setState({
				token_symbol: 'ETH',
			})
			break;
		}
	}

	async componentDidMount() {
		// const params = web3.eth.abi.decodeParameters(receiptDataTypes, '0x000000000000000000000000843d4a358471547f51534e3e51fae91cb4dc3f28');
		// console.log(params.toString())
		await freshContract();
		const { t } = this.props
		if (!window.ethereum) {
			alert(t('please_install_metamask'))
			window.location.href = '/#/'
			return
		}
		if(this.props.match.params['fromNFT']){
			this.setState({
				isFillFiles : true,
				nowNFT:this.props.match.params['fromNFT']
			})
			try{
				this.setState({
					onLoadingSpin: true
				})
				let ipfs_link = await contract().methods.tokenURI(this.state.nowNFT).call();
				var ipfs_hash_arr = ipfs_link.split('/');
				var ipfs_hash = ipfs_hash_arr[ipfs_hash_arr.length - 1];
				var meta = 'https://sparklink.mypinata.cloud/ipfs/' + ipfs_hash;
				let ret;
				if(ipfs_hash === 'QmNLei78zWmzUdbeRB3CiUfAizWUrbeeZh5K1rhAQKCh51' ){
					ret={
						name:'',
						description:'',
					}
				}else{
					ret = (await axios({
						method: 'get',
						url: meta,
						timeout: 1000 * 2,
					})).data
				}

				console.log(ret)
				const account = await getWalletAccount();
				if(account!=-1){
					const owner = await contract().methods.ownerOf(this.state.nowNFT).call()
					const bonus = await contract().methods.getRoyaltyFeeByNFTId(this.state.nowNFT).call()
					if (account == owner.toLowerCase()) {
						this.setState({
							allowSubmitPDF: true,
							bonusFee: bonus,
						})
						this.setState({
							description: ret.description,
							name:ret.name,
							encryptedPublish:true,
							onLoadingSpin: false,
							rootNFTId:this.state.nowNFT,
							usedAcc: account
						})
					} else {
						this.setState({
							onLoadingSpin: false
						})
						message.warning({
							content: t('no_NFT_owner'),
							className: 'custom-class',
							style: {
								marginTop: '10vh',
							},
						})
					}
				}else {
					message.error({
						content: '请先连接钱包',
						className: 'custom-class',
						style: {
							marginTop: '10vh',
						},
					})
					this.setState({
						onLoadingSpin: false
					})
				}

			}catch(e){
				console.log(e)
				alert('获取NFT信息出错')
				this.setState({
					onLoadingSpin: false
				})
			}
			
		}
		console.log(this.props.match)


		// const chainId = await window.ethereum.request({ method: 'eth_chainId' })
		// const chainId = await window.ethereum.request({ method: 'eth_chainId' })
		// if (chainId !== '0x89') {
		// 	alert(t('please_set_polygon'))
		// 	await window.ethereum.request({
		// 		method: 'wallet_switchEthereumChain',
		// 		params: [
		// 			{
		// 				chainId: '0x89',
		// 			},
		// 		],
		// 	})
		// }
	}

	handleGetPubName = (event) => {
		this.setState({
			name: event.target.value,
		})
	}

	handleGetBonusFee = (value) => {
		if (value >= 100) value = 100;
		this.setState({
			bonusFee: value,
		})
	}

	handleGetPrice = (value) => {
		this.setState({
			price: value,
		})
	}

	handleGetShareTimes = (value) => {
		this.setState({
			shareTimes: value,
		})
	}

	handleGetDescription = (e) => {
		this.setState({
			description: e.target.value,
		})
	}

	showError(text){
		this.setState({
			submitError: true,
			submitDialogText: text
		})
	}
	showText(text,isOk){
		this.setState({
			submitDialogText: text,
			submitOk : isOk
		})
	}

	handleSearch = async (value) => {
		if (value) {
			let values = value.toLowerCase()
			let tokens_list = this.tokens.default.tokens
			//console.log(this.tokens)
			//console.log(tokens_list)
			let matched_data = []
			let reg = new RegExp(values)
			for (let token of tokens_list) {
				let symbol_lower_case = token.symbol.toLowerCase()
				// eslint-disable-next-line no-useless-escape
				let showed_text = `\"${token.symbol}\"` + '   ' + token.address
				let info = {
					value: token.address,
					text: showed_text,
				}
				if (reg.test(symbol_lower_case) && !matched_data.includes(info)) {
					matched_data.push(info)
				}
			}
			if (values.includes('0x') && values.length == 42) {
				let info = {
					value: values,
					text: values,
				}
				matched_data = [info]
			}
			this.setState({
				data: matched_data,
			})
		} else {
			this.setState({ data: [] })
		}
	}

	handleSelectChange = async (value) => {
		const { t } = this.props
		let tokens_list = this.tokens.default.tokens
		let address
		let token_symbol
		let token_decimal
		for (let token of tokens_list) {
			if (value === token.address) {
				address = value
				token_symbol = token.symbol
				token_decimal = token.decimals
			}
		}
		if (token_symbol == undefined) {
			try {
				const token_contract = new web3.eth.Contract(abi, value)
				token_symbol = await token_contract.methods.symbol().call()
				token_decimal = await token_contract.methods.decimals().call()
				address = value
			} catch (error) {
				message.error(t('error_no_erc20'))
			}
		}
		// console.debug(token_symbol)
		this.setState({
			token_addr: address,
			token_symbol: token_symbol,
			decimal: token_decimal,
		})
	}
	submit = async ()=>{
		this.setState({submitError:false,submitDialogText:''})
		if(this.state.isFillFiles){
			await this.uploadFiles_encry();
			return
		}
		if(this.state.encryptedPublish){
			await this.submit_encry();
		}else{
			this.submit_open();
		}
	}
	uploadFiles_encry = async () => {
		const { t } = this.props;
		const failText = t('上传文件失败...不用担心，稍后可在[我的收藏]页面查看NFT并重新上传，失败原因：')
		
		if (this.state.fileList.length !== 0) {
			this.setState({
				uploadBtnDisable: true,
				onLoading: true,
			})
			// console.log('fileList: ')
			// console.log(this.state.fileList);
			const zipedFiles = await generateZipFile(this.state.name, this.state.fileList);
			// console.log('zipedFiles: ')
			// console.log(zipedFiles);
			const account = await getWalletAccount()
			

			if (account !== -1) {
				let error_count = 0;
				const chainName = await getChainName();
				const signer = account;
				let message = {
					account: signer,
					chain: chainName,
					nft_id: this.state.rootNFTId.toString(),
				}
				let sig;
				try{
					sig = await web3.eth.personal.sign(JSON.stringify(message), signer)
				}catch(e){
					this.showError(`Error: ${e.message}`)
				}
				
				this.showText('正在上传文件中...',false)
				while (error_count < 10) {
					try {


						console.log(sig)
						let payload = {
							account: signer,
							chain: chainName,
							nft_id: this.state.rootNFTId.toString(),
							signature: sig,
						}
						let payload_str = JSON.stringify(payload)
						console.log(payload_str)
						let req_key_url = backend + '/api/v1/key/claim'

						try {
							const res = await axios.post(req_key_url, payload_str, {
								headers: {
									'Content-Type': 'application/json',
								},
							})
							// let secret_key = res.data.key //res.data.key 
							let secret_key = res.data.key //res.data.key 
							console.debug(secret_key)
							if(secret_key) {
								let zipedFilesBlob;
								const reader = new FileReader()
								reader.readAsArrayBuffer(zipedFiles)
								reader.onload = (e) => {
									let b = e.target.result
									let wordArray = CryptoJS.lib.WordArray.create(b)
									const str = CryptoJS.enc.Hex.stringify(wordArray)
									let cipher_text = CryptoJS.AES.encrypt(str, secret_key).toString()
									zipedFilesBlob = new Blob([cipher_text])
									const params = new FormData()
									params.append('file', zipedFilesBlob)
									console.log(params)
									this.postFiles2IPFS(params)
								}
							}
						} catch (error) {
							if (error.response.status == 400) {
								if (error.response.data.message.includes('signature invalid')) {
									this.showError(failText + t('您的签名有误，请查看签名账号是否正确'),false)

								} else if (error.response.data.message.includes('param invalid')) {
									this.showError(failText + t('参数错误'),false)
								} else if (error.response.data.message.includes('not owned')) {
									this.showError(failText + t('您并不拥有此NFT'),false)
								} else if (error.response.data.message.includes('not found')) {
									this.showError(failText + t('此NFT还未生成'),false)
								}
							} else {
								this.showError(failText + t('请求加密密钥失败'),false)
							}
						}
						error_count = 10;
					}
					catch (e) {
						error_count++;
						this.showError(failText + t('读取文件出错！'))
						console.log(e);
						sleep(2000);
					}

				}

			}
			else {
				message.error({
					content: '请先连接钱包',
					className: 'custom-class',
					style: {
						marginTop: '10vh',
					},
				})
			}
		}
		else {
			this.showError(failText + t('未知错误 ！'))
		}


	}
	postFiles2IPFS = async (zipedFilesForm) => {
		const {t} =this.props;
		const failText = t('上传文件失败...不用担心，稍后可在[我的收藏]页面查看NFT并重新上传，失败原因：')
		const pinFileUrl = 'https://api.pinata.cloud/pinning/pinFileToIPFS';
		try {
			// console.log('Form: ');
			// console.log(zipedFilesForm)
			this.showText('上传文件到服务器中...',false)
			const response = await axios.post(
				pinFileUrl,
				zipedFilesForm,
				{
					maxBodyLength: 'infinity',
					headers: {
						'Content-Type': 'multipart/form-data;',
						pinata_api_key: pinata_api_key,
						pinata_secret_api_key: pinata_secret_api_key,
					}
				})
			// console.log(response)
			if (response.statusText === 'OK') {
				this.setState({
					submitBtnDisable: false,
					fileIpfs: response.data.IpfsHash,
					fileType: 'zip',
				})
				if(!this.state.submitError){
					await this.submitWork();
				}
			}
			else {
				this.showError(failText+'上传失败');
				this.setState({
					onLoading: false,
				})
			}

			if (this.state.fileIpfs === '') {
				this.setState({
					uploadBtnDisable: false,
				})
			}
		} catch (e) {
			console.log(e);
		}
	}

	submitWork = async () => {
		const { t } = this.props
		const failText = t('更新文件信息失败...不用担心，稍后可在[我的收藏]页面查看NFT并重新上传，失败原因：')
		
		if (this.state.ipfsHashCover === '' || this.state.fileIpfs === '') {
			message.error({
				content: t('你有信息尚未填写'),
				className: 'custom-class',
				style: {
					marginTop: '10vh',
				},
			})
		} else {
			let img_url = 'https://coldcdn.com/api/cdn/v5ynur/ipfs/' + this.state.ipfsHashCover
			this.setState({
				coverURL: img_url,
			})
			this.showText('正在更新NFT信息..',false)
			console.debug('coverURL: ', this.state.coverURL)
			let trimmed_des = this.state.description.replace(/(\r\n\t|\n|\r\t)/gm, ' ')
			// const accounts = await window.ethereum.request({
			// 	method: 'eth_requestAccounts',
			// })
			// const account = accounts[0]
			const account = await getWalletAccount();
			if (account !== this.state.usedAcc) {
				this.showError('账户发生变化，请切换回原账户')
				return
			}
			let file_url = 'https://coldcdn.com/api/cdn/v5ynur/ipfs/' + this.state.fileIpfs
			let JSONBody = {
				name: this.state.name,
				description: trimmed_des,
				image: this.state.coverURL,
				attributes: [
					{
						display_type: 'boost_percentage',
						trait_type: 'Bonuse Percentage',
						value: this.state.bonusFee,
					},
					{
						trait_type: 'File Address',
						value: file_url,
					},
					{
						value: this.state.fileType,
					},
					{
						trait_type: 'Encrypted',
						value: 'TRUE',
					},
				],
			}
			console.debug(JSONBody)
			const url = 'https://api.pinata.cloud/pinning/pinJSONToIPFS'
			let obj = this
			this.setState({
				onLoading: true,
			})

			try {
				const response = await axios.post(url, JSONBody, {
					headers: {
						pinata_api_key: pinata_api_key,
						pinata_secret_api_key: pinata_secret_api_key,
					},
				})
				console.debug('metadata: ', response.data.IpfsHash)
				const bytes = bs58.decode(response.data.IpfsHash)
				const bytesToContract = bytes.toString('hex').substring(4)
				// console.log(bytesToContract)
				// console.log(response.data.IpfsHash)
				this.setState({
					ipfsMeta: bytesToContract,
				})

				let ipfsToContract = '0x' + bytesToContract

				let gasPrice = await web3.eth.getGasPrice()
				let new_gas_price = Math.floor(parseInt(gasPrice) * 1.5).toString()

				contract().methods
					.setURI(obj.state.rootNFTId, ipfsToContract)
					.send({
						from: obj.state.usedAcc,
						gasPrice: new_gas_price,
					})
					.on('receipt', function (receipt) {
						console.debug(receipt.events.SetURI)
						message.success({
							content: t('作品基本信息已提交成功'),
							className: 'custom-class',
							style: {
								marginTop: '10vh',
							},
						})
						obj.setState({
							allowSubmitPDF: false,
							finished: true,
							onLoading: false,
						})
					})
					.on('error', function (error) {
						obj.setState({
							onLoading: false,
						})
						obj.showError(failText+`Error: ${error.message}`)
					})
			} catch (error) {
				obj.showError(failText + `Error: ${error.message}`)
			}
		}
	}
	submit_encry = async () => {

		const account = await getWalletAccount();

		if (account !== -1) {
			const { t } = this.props;
			this.setState({
				usedAcc: account,
			})

			let obj = this
			if (
				this.state.price === 0 ||
				this.state.bonusFee === 0 ||
				this.state.shareTimes === 0 ||
				this.state.token_addr === null
			) {
				message.error({
					content: t('你有信息尚未填写'),
					className: 'custom-class',
					style: {
						marginTop: '10vh',
					},
				})
			} else {
				this.setState({
					onLoading: true,
				})
				try{
					let JSONBody = {
						name: this.state.name,
						description: this.state.description.replace(/(\r\n\t|\n|\r\t)/gm, ' '),
						image: 'No Set',
						attributes: [
							{
								display_type: 'boost_percentage',
								trait_type: 'Bonuse Percentage',
								value: this.state.bonusFee,
							},
							{
								trait_type: 'File Address',
								value: 'Not Set',
							},
							{
								value: 'null',
							},
							{
								trait_type: 'Encrypted',
								value: 'FALSE',
							},
						],
					}
					let url = 'https://api.pinata.cloud/pinning/pinJSONToIPFS';
					const response = await axios.post(url, JSONBody, {
						headers: {
							pinata_api_key: pinata_api_key,
							pinata_secret_api_key: pinata_secret_api_key,
						},
					})
					console.debug('metadata: ', response.data.IpfsHash)
					const bytes = bs58.decode(response.data.IpfsHash)
					const bytesToContract = bytes.toString('hex').substring(4)
					// console.log(bytesToContract)
					// console.log(response.data.IpfsHash)
					this.setState({
						ipfsMeta: bytesToContract,
					})
	
					let ipfsToContract = '0x' + bytesToContract
					const priceBN = BigNumber(this.state.price * 10 ** this.state.decimal);
					let price_with_decimal = web3.utils.toBN(priceBN)
					price_with_decimal = price_with_decimal.toString()
					console.debug('price_with_decimal: ', price_with_decimal)
					let gasPrice = await web3.eth.getGasPrice()
					let new_gas_price = Math.floor(parseInt(gasPrice) * 1.5).toString()
					this.showText(t('正在创建NFT...请在钱包中确认您的请求..'),false)
					contract().methods
						.publish(
							price_with_decimal,
							this.state.bonusFee,
							this.state.shareTimes,
							ipfsToContract,
							this.state.token_addr,
							this.state.isFree,
							this.state.isNC,
							this.state.isND
						)
						.send({
							from: this.state.usedAcc,
							gasPrice: new_gas_price,
						})
						.on('receipt', function (receipt) {
							console.log(receipt)
							const data = receipt.events.Publish.raw.topics;
							const root_nft_id = parseInt(data[2], 16);
							obj.setState({
								rootNFTId: root_nft_id,
								//issueId: issue_id,
								allowSubmitPDF: true,
							})
							obj.showText(t('作品基本信息已提交成功....等待签名..'),false)
							if(!obj.state.submitError){
								obj.uploadFiles_encry();
							}
						})
						.on('error', function (error) {
							if (error.message.includes('not mined')) {
								obj.showText(t('作品基本信息已提交成功....当前网络较拥堵...'),false)
							} else {
								obj.showError(`Error: ${error.message}`,true)
							}
						})
				}catch(e){
					this.showError(e.toString());
				}


			}
		}
		else {
			message.error({
				content: '请先连接钱包',
				className: 'custom-class',
				style: {
					marginTop: '10vh',
				},
			})
		}


	}
	submit_open = async () => {
		const account = await getWalletAccount();
		if (account !== -1) {
			const { t } = this.props;
			let obj = this
			if (
				this.state.price === 0 ||
				this.state.bonusFee === 0 ||
				this.state.shareTimes === 0 ||
				this.state.ipfsHashCover === '' ||
				this.state.fileList.length === 0 ||
				this.state.token_addr === null
			) {
				message.error({
					content: t('你有信息尚未填写'),
					className: 'custom-class',
					style: {
						marginTop: '10vh',
					},
				})
			} else {
				this.setState({
					onLoading: true,
				})
				this.showText(t('正在打包文件...'),false)
				const zipedFileObj = await this.uploadFiles()
				let img_url = 'https://coldcdn.com/api/cdn/v5ynur/ipfs/' + this.state.ipfsHashCover
				this.setState({
					coverURL: img_url,
				})
				let trimmed_des = this.state.description.replace(/(\r\n\t|\n|\r\t)/gm, ' ')
				this.setState({
					userAccount: account,
				})
				if (zipedFileObj === null) {
					this.showError(t('文件打包失败，请重试'))
					return;
				}
				let file_url = 'https://coldcdn.com/api/cdn/v5ynur/ipfs/' + zipedFileObj.ipfsHash
				let JSONBody = {
					name: this.state.name,
					description: trimmed_des,
					image: this.state.coverURL,
					attributes: [
						{
							display_type: 'boost_percentage',
							trait_type: 'Bonuse Percentage',
							value: this.state.bonusFee,
						},
						{
							trait_type: 'File Address',
							value: file_url,
						},
						{
							value: zipedFileObj.fileType,
						},
						{
							trait_type: 'Encrypted',
							value: 'FALSE',
						},
					],
				}
				const url = 'https://api.pinata.cloud/pinning/pinJSONToIPFS'
				try {
					this.showText(t('正在上传文件...'),false)
					const response = await axios.post(url, JSONBody, {
						headers: {
							pinata_api_key: pinata_api_key,
							pinata_secret_api_key: pinata_secret_api_key,
						},
					})
					console.debug('metadata: ', response.data.IpfsHash)
					const bytes = bs58.decode(response.data.IpfsHash)
					const bytesToContract = bytes.toString('hex').substring(4)
					this.setState({
						ipfsMeta: bytesToContract,
					})

					const priceBN = BigNumber(this.state.price * 10 ** this.state.decimal);
					let price_with_decimal = web3.utils.toBN(priceBN)
					price_with_decimal = price_with_decimal.toString()
					console.debug('price_with_decimal: ', price_with_decimal)
					let ipfsToContract = '0x' + bytesToContract

					let gasPrice = await web3.eth.getGasPrice()
					this.showText(t('正在发布您的作品...请在钱包中处理请求...'),false)
					let new_gas_price = Math.floor(parseInt(gasPrice) * 1.5).toString()
					contract().methods
						.publish(
							price_with_decimal,
							this.state.bonusFee,
							this.state.shareTimes,
							ipfsToContract,
							this.state.token_addr,
							this.state.isFree,
							this.state.isNC,
							this.state.isND
						)
						.send({
							from: this.state.userAccount,
							gasPrice: new_gas_price,
						})
						.on('receipt', function (receipt) {

							console.log(receipt)
							const data = receipt.events.Publish.raw.topics;
							console.log(data)

							let root_nft_id = parseInt(data[2], 16);
							obj.setState({
								rootNFTId: root_nft_id,
								//issueId: issue_id,
								finished: true,
							})
							this.showText(t('已成功发布您的作品'),true)
						})
						.on('error', function (error) {
							if (error.message.includes('not mined')) {
								
								obj.showText(t('交易已提交，当前网络较拥堵，请稍等后去我的收藏中查看'),true)
							} else {
								obj.showError(`Error: ${error.message}`,true)
							}
						})
				} catch (error) {
					console.debug(error)
					obj.showError( t('似乎遇到了些小问题：') + ` ${error}`,true)
				}
			}

		}
		else {
			message.error('请先连接钱包');
		}

	}

	checkDetail = async () => {
		const chainId = await getChainId()
		let new_url = `/#/NFT/${this.state.rootNFTId}/${chainId}`;
		window.open(new_url, '_self')
	}

	/* Get ziped files and upload ziped files to IPFS
	 * @return: an Object contains {fileIpfsHash, fileType}  or  null (if errro)
	 */
	uploadFiles = async () => {
		if (this.state.fileList.length !== 0) {
			const zipedFiles = await generateZipFile(this.state.name, this.state.fileList);
			const params = new FormData()
			params.append('file', zipedFiles)
			//console.log('binary: ')
			const pinFileUrl = 'https://api.pinata.cloud/pinning/pinFileToIPFS';
			try {
				const response = await axios.post(
					pinFileUrl,
					params,
					{
						maxBodyLength: 'infinity',
						headers: {
							'Content-Type': 'multipart/form-data;',
							pinata_api_key: pinata_api_key,
							pinata_secret_api_key: pinata_secret_api_key,
						}
					})
				if (response.statusText === 'OK') {
					message.success('文件打包上传成功!');
					//TODO: 默认所有文件都为zip类型（单文件同样打包）
					const fileIpfsHash = response.data.IpfsHash;
					const fileType = 'zip'
					return { ipfsHash: fileIpfsHash, fileType: fileType };
				}
				else {
					message.error({
						content: '文件打包上传失败,请重新上传',
						className: 'custom-class',
						style: {
							marginTop: '10vh',
						},
					})
					return null;
				}
			} catch (e) {
				console.log(e.response);
			}
		}
		else {
			message.error('上传文件不能为空！')
		}
	}

	onCheckBoxChange(e) {
		console.log(`checked = ${e.target.checked}`);
		console.log(e.target.id)
		switch (e.target.id) {
		case 'isNC':
			this.setState({
				isNC: e.target.checked,
			});
			break;
		case 'isND':
			this.setState({
				isND: e.target.checked,
			})
			break;
		case 'isFree':
			this.setState({
				isFree: e.target.checked,
			})
			break;
		}
	}

	onUpdateChain() {
		this.UNSAFE_componentWillMount();
	}

	render() {
		const { t } = this.props
		const { classes } = this.props
		let obj = this
		const { TextArea } = Input
		const { fileList } = this.state;
		const options = this.state.data.map((d) => <Option key={d.value}>{d.text}</Option>)
		const prop = {
			name: 'file',
			action: 'https://api.pinata.cloud/pinning/pinFileToIPFS',
			headers: {
				pinata_api_key: pinata_api_key,
				pinata_secret_api_key: pinata_secret_api_key,
			},
			data: this.state.buffer,
			beforeUpload: (file) => {
				return new Promise((resolve, reject) => {
					try {
						const reader = new FileReader()
						reader.readAsArrayBuffer(file)
						reader.onload = (e) => {
							let b = e.target.result
							let params = new FormData()
							params.append('file', b)
							this.setState({
								buffer: params,
							})
						}
						resolve()
					} catch (e) {
						message.error('Read file error')
						reject()
					}
				})
			},

			async onChange(info) {
				const { status } = info.file
				// text/plain image/jpeg application/pdf
				if (status === 'done') {
					message.success(`${info.file.name} file uploaded successfully.`)
					obj.setState({
						ipfsHashCover: info.file.response.IpfsHash,
					})
				} else if (status === 'error') {
					message.error(`${info.file.name} file upload failed.`)
				}
			},
			onDrop(e) {
				message.error('Only image file supported')
				console.log('Dropped files', e.dataTransfer.files)
			},
		}
		const onSwtichChange = (e)=>{
			console.log(`checked = ${e.target.checked}`);
			this.setState({
				encryptedPublish: e.target.checked
			})
		}
	

		const propFile = {			
			onRemove: file => {
				this.setState(state => {
					const index = state.fileList.indexOf(file);
					const newFileList = state.fileList.slice();
					newFileList.splice(index, 1);
					return {
						fileList: newFileList,
					};
				});
			},
			beforeUpload: file => {
				this.setState(state => ({
					fileList: [...state.fileList, file],
				}));
				//console.log(this.state.fileList)
				return false;
			},
			fileList,
		}

		if (this.state.finished) {
			return (
				<Spin spinning={this.state.onLoadingSpin} size="large">
					<ThemeProvider theme={theme}>
						<TopBar />
						<div style={{ textAlign: 'center' }}>
							<Typography className={classes.titleCon + ' ' + classes.MarginB5}>
								<b>{t('pulish_success')}</b>
							</Typography>
							<div style={{ display: 'flex', justifyContent: 'center' }}>
								<Paper className={classes.paperImg}>
									<img className={classes.coverImg} src={this.state.coverURL}></img>
								</Paper>
							</div>
							<Typography className={classes.Display9 + ' ' + classes.MarginT10}>
								{t('you_gain_nft')} #{this.state.rootNFTId}
							</Typography>

							<Button
								className={classes.btn + ' ' + classes.MarginB5}
								onClick={this.checkDetail}
							>
								{t('show_detail')}
							</Button>
						</div>
						<Footer></Footer>
					</ThemeProvider>
				</Spin>
			)
		} else {
			return (
				<Spin spinning={this.state.onLoading} size="large" style={{ marginTop: 1000 }}>
					<ThemeProvider theme={theme}>
						<Dialog open={this.state.onLoading}>
							<DialogTitle className={classes.MarginB10 + ' ' + classes.MarginT10 + ' ' + classes.MarginL9 + ' ' + classes.MarginR9} id="form-dialog-title" >
								<span className={classes.Display9}>{(this.state.submitError)?(t('好像出现了点小问题')):(t('稍安勿躁，马上就好'))}</span>
							</DialogTitle>
							<DialogContent className={classes.MarginL9 + ' ' + classes.MarginR9+' '+classes.MarginB10} style={{display:'flex',justifyContent:'center',flexDirection:'column',alignItems:'center'}}>
								<CircularProgress style={{display:(this.state.submitError)?('none'):('')}}></CircularProgress>
								<br/>
								<br/>
								<p className={classes.Display11} style={{color:(this.state.submitError)?('red'):('black')}}><br/>{this.state.submitDialogText}</p>
							</DialogContent>	
							<DialogActions style={{display:(this.state.submitError)?(''):('none')}} className={classes.MarginB10 + ' ' + classes.MarginT10 + ' ' + classes.MarginL10 + ' ' + classes.MarginR10}>
								<Button onClick={()=>{this.setState({onLoading:false})}} className={classes.btnOutlineMini} color="primary">
									{t('cancel')}
								</Button>
							</DialogActions>					
						</Dialog>
						<TopBar parent={this} />
						<Container component="main" maxWidth="xs" className={classes.main}>
							<div className={classes.paper}>
								{/* {showLoading()} */}
								<Typography className={classes.Display7}>
									<b>{t('art_info')}</b>
								</Typography>
								<Typography className={classes.Display8} style={{display:((this.state.isFillFiles)?(''):('none'))}}>
									{t('您正在为该NFT补充信息：')+'#'+this.state.nowNFT}
								</Typography>
								<form className={classes.form} noValidate>
									<Grid container spacing={2}>
										<Grid item style={{ width: '100%' }}>
											<label className={classes.Display9}>
												{t('art_name')} <span style={{ color: 'red' }}>*</span>
											</label>
											<Input
												placeholder={t('art_name')}
												allowClear
												id="pubName"
												onChange={this.handleGetPubName}
												value={this.state.name}
												className={classes.input}
												maxLength={16}
											/>
										</Grid>
										<Grid item style={{display:((this.state.isFillFiles)?('none'):(''))}} xs={12}>
											<label className={classes.Display9}>
												{t('fit_rate')} <span style={{ color: 'red' }}>*</span>
											</label>
											<p className={classes.Display11}>{t('fit_rate_tip')}</p>
											<InputNumber
												id="bonusFee"
												defaultValue={0}
												min={0}
												formatter={(value) => { return (value <= 100) ? (`${value}%`) : ('100%') }}
												parser={(value) => value.replace('%', '')}
												onChange={this.handleGetBonusFee}
												className={classes.inputNum}
											/>
										</Grid>
										<Grid item style={{display:((this.state.isFillFiles)?('none'):(''))}} xs={12}>
											<label className={classes.Display9}>
												{t('access_coin')} <span style={{ color: 'red' }}>*</span>
											</label>
											<p className={classes.Display11}>{t('access_coin_tip')}</p>
											<Select
												showSearch
												value={this.state.token_addr}
												placeholder={t('please_input_coin')}
												// className={classes.input}
												style={{ width: '100%' }}
												size="large"
												defaultActiveFirstOption={false}
												showArrow={false}
												filterOption={false}
												onSearch={this.handleSearch}
												onChange={this.handleSelectChange}
												notFoundContent={null}
											>
												{options}
											</Select>
										</Grid>
										<Grid item style={{display:((this.state.isFillFiles)?('none'):(''))}} xs={12}>
											<label className={classes.Display9}>
												{t('price')} ({this.state.token_symbol})<span style={{ color: 'red' }}>*</span>
											</label>
											<InputNumber
												id="price"
												defaultValue={0}
												min={0}
												onChange={this.handleGetPrice}
												className={classes.inputNum}
											/>
										</Grid>
										<Grid item style={{display:((this.state.isFillFiles)?('none'):(''))}} xs={12}>
											<label className={classes.Display9}>
												{t('max_share')} (MAX： 65535)
												<span style={{ color: 'red' }}>*</span>
											</label>
											<p className={classes.Display11}>{t('max_share_tip')}</p>
											<InputNumber
												id="shareTimes"
												defaultValue={0}
												min={0}
												max={65535}
												onChange={this.handleGetShareTimes}
												className={classes.inputNum}
											/>
										</Grid>
										<Grid item style={{display:((this.state.isFillFiles)?('none'):(''))}} xs={12}>
											<label className={classes.Display9}>
												{t('作品权限')} <span style={{ color: 'red' }}>*</span>
											</label>
											<br />
											{/* <p className={classes.Display11}>{'is_NC & is_ND'}</p> */}
											<Checkbox id='isND' className={classes.Display11 + ' ' + classes.checkBox} defaultChecked onChange={this.onCheckBoxChange.bind(this)}>{t('是否允许二次创作')}</Checkbox>
											<Checkbox id='isNC' className={classes.Display11 + ' ' + classes.checkBox} onChange={this.onCheckBoxChange.bind(this)}>{t('是否允许商用')}</Checkbox>
											<Checkbox id='isFree' className={classes.Display11 + ' ' + classes.checkBox} onChange={this.onCheckBoxChange.bind(this)}>{t('允许一级节点免费铸造')}</Checkbox>
										</Grid>

										<Grid item xs={12}>
											<label className={classes.Display9}>
												{t('加密发布')} <span style={{ color: 'red' }}>*</span>
											</label>
											<br />
											<div style={{display:'flex',alignItems:'center'}}>
												<Swtich disabled={this.state.isFillFiles} onChange={onSwtichChange}></Swtich><span className={classes.Display11}>{this.state.encryptedPublish ? (t('choose_encryPublish')):(t('choose_openPublish'))}</span>
											</div>
										</Grid>

										<Grid item xs={12}>
											<label className={classes.Display9}>
												{t('art_desc')} <span style={{ color: 'red' }}>*</span>
											</label>
											<p className={classes.Display11}>{t('art_desc_tip')}</p>
											<TextArea rows={3} id="Description" value={this.state.description} onChange={this.handleGetDescription} placeholder={t('最大长度为50个字符')} maxLength={50}/>
										</Grid>
									</Grid>
									<label className={classes.Display9 + ' ' + classes.MarginT10}>
										{t('pic_cover')} <span style={{ color: 'red' }}>*</span>
									</label>
									<p className={classes.Display11}>{t('pic_cover_tip')}</p>
									<Dragger {...prop} style={{ width: '100%', minHeight: 200 }} id="Uploader" maxCount='1' accept="image/*">
										<p className="ant-upload-drag-icon">
											<InboxOutlined />
										</p>
										<p className={classes.Display11}>{t('upload_file_tip1')}</p>
										<p className={classes.Display11}>{t('upload_file_tip2')}</p>
									</Dragger>

									<label className={classes.Display9 + ' ' + classes.MarginT10}>
										{t('art_file')} <span style={{ color: 'red' }}>*</span>
									</label>
									<p className={classes.Display11}> {t('art_file_tip')}</p>
									<Dragger {...propFile} style={{ width: '100%', minHeight: 200 }} id="Uploader2">
										<p className="ant-upload-drag-icon">
											<InboxOutlined />
										</p>
										<p className={classes.Display11}>{t('upload_file_tip1')}</p>
										<p className={classes.Display11}>{t('upload_file_tip2')}</p>
									</Dragger>
								</form>
								<Button
									className={classes.btn}
									startIcon={<CloudUploadOutlined style={{ fontSize: '100%' }} />}
									onClick={this.submit}
								>
									{t('submit')}
								</Button>
							</div>
						</Container>
						<Footer></Footer>
					</ThemeProvider>
				</Spin>
			)
		}
	}
}

export default withTranslation()(withStyles(withCommon(styles), { withTheme: true })(PublishEx))
//todo 涉及交易
