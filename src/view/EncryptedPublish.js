import React, { Component } from 'react'
import '../App.css'
import Button from '@material-ui/core/Button'
import { createTheme, ThemeProvider, withStyles } from '@material-ui/core/styles'
import { blue } from '@material-ui/core/colors'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import { message } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import Dragger from 'antd/lib/upload/Dragger'
import { CloudUploadOutlined } from '@ant-design/icons'
import { Input, InputNumber, Select, Spin } from 'antd'
import 'antd/dist/antd.css'
import TopBar from '../components/TopBar'
import axios from 'axios'
import contract from '../utils/contract'
import web3 from '../utils/web3'
import Paper from '@material-ui/core/Paper'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core'
import * as tokens_matic from '../global/tokens_list_matic.json'
import * as tokens_bsc from '../global/tokens_list_bsc.json'
import * as tokens_eth from '../global/tokens_list_eth.json'
import { withTranslation } from 'react-i18next'
import config from '../global/config'
import withCommon from '../styles/common'
import Footer from '../components/Footer'
import { generateZipFile } from '../utils/zipFile.js'
import { getWalletAccount } from '../utils/getWalletAccountandChainID'


const { backend } = config
const { pinata_api_key, pinata_secret_api_key } = require('../project.secret.js')
const FormData = require('form-data')
const bs58 = require('bs58')
let CryptoJS = require('crypto-js')
const { Option } = Select
const abi = require('erc-20-abi')

const theme = createTheme({
	palette: {
		primary: {
			main: '#2196f3',
		},
		secondary: {
			main: '#FDFEFE',
		},
	},
})

const styles = (theme) => ({
	h3: {
		marginTop: 20
	},
	h5: {
		color: '#757575'
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
	paperImg: {
		backgroundColor: '#EFEBE9',
		inherit:'PaddingL5,PaddingR5,PaddingT5,PaddingB5'
	},
	coverImg:{
		[theme.breakpoints.between('xs', 'sm')]: {
			width:'80vw'
		},
		[theme.breakpoints.between('sm', 'md')]: {
			width:'30vw'
		},
		[theme.breakpoints.between('md', 'lg')]: {
			width:'30vw'
		},
		[theme.breakpoints.between('lg', 'xl')]: {
			width:'30vw'
		},
		[theme.breakpoints.up('xl')]: {
			width:'30vw'
		},
	},
	btnMini:{
		inherit:'MarginT10'
	},
	btnPub: {
		margin: theme.spacing(1),
		borderRadius: 25,
		color: '#FFFFFF',
		backgroundColor: '#2196f3',
		marginBottom: 20,
		marginTop: 40,
		height: 45,
		minWidth: 200,
		[theme.breakpoints.between('xs', 'sm')]: {
			width: '50%',
		},
		[theme.breakpoints.between('sm', 'md')]: {
			fontSize: 16,
			width: '30%',
		},
		[theme.breakpoints.up('md')]: {
			fontSize: 16,
			width: '30%',
		},
	},
	Display9: {
		inherit: 'MarginT9,DisplaySeBold9'
	},
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		maxWidth: '100vw',
		fontFamily: 'ANC,source-han-sans-simplified-c, sans-serif'
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: blue[500],
		width: 60,
		height: 60,
	},
	btn: {
		inherit: 'MarginT10'
	},
	btnOutlineMini: {
		inherit: 'MarginT10'
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
		borderRadius: 5,
		['@media (min-width:3200px)']: {
			height: 100
		}
	},
	inputNum: {
		height: 40,
		borderRadius: 5,
		width: '100%',
		fontSize: 20,
		['@media (min-width:3200px)']: {
			height: 100
		}
	},
})

class EncryptedPublish extends Component {
	state = {
		name: '',
		bonusFee: 0,
		price: 0,
		buffer: null,
		file: null,
		ipfsHashCover: '',
		ipfsMeta: '',
		fileType: '',
		fileIpfs: '',
		description: '',
		shareTimes: 0,
		onLoading: false,
		rootNFTId: '',
		issueId: '',
		allowSubmitPDF: false,
		// allowSubmitPDF: true,
		usedAcc: '',
		sig: '',
		finished: false,
		open: false,
		coverURL: '',
		jumped: false,
		// jumped: true,
		data: [],
		token_addr: null,
		token_symbol: '',
		decimal: 0,
		fileList: [],
		zipedFilesForm: null,
		submitBtnDisable: true,

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
		const { t } = this.props
		if (!window.ethereum) {
			alert(t('please_install_metamask'))
			window.location.href = '/#/introPublish'
			return
		}

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

	handleGetNFTId = (value) => {
		this.setState({
			rootNFTId: String(value),
		})
	}

	handleClose = () => {
		this.setState({
			open: false,
		})
	}

	handleClickOpen = () => {
		this.setState({
			open: true,
		})
	}

	handleSearch = async (value) => {
		if (value) {
			value = value.toLowerCase()
			let tokens_list = this.tokens.default.tokens
			let matched_data = []
			let reg = new RegExp(value)
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
			if (value.includes('0x') && value.length == 42) {
				let info = {
					value: value,
					text: value,
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

	jump = async () => {
		const { t } = this.props
		// const accounts = await window.ethereum.request({
		// 	method: 'eth_requestAccounts',
		// })
		// const account = accounts[0]
		const account = await getWalletAccount();
		if (account !== -1) {
			this.setState({
				usedAcc: account,
			})

			const owner = await contract.methods.ownerOf(this.state.rootNFTId).call()
			let issueId = await contract.methods.getIssueIdByNFTId(this.state.rootNFTId).call()

			let bonus = await contract.methods.getRoyaltyFeeByIssueId(issueId).call()

			if (account == owner.toLowerCase()) {
				this.setState({
					onLoading: false,
					allowSubmitPDF: true,
					jumped: true,
					bonusFee: bonus,
				})
			} else {
				message.warning({
					content: t('no_NFT_owner'),
					className: 'custom-class',
					style: {
						marginTop: '10vh',
					},
				})
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

	submit = async () => {
		/*TODO: call smart contract publish() and wait for publish success event
		 * then call backend to get a secret key. Then encrypt the pdf file and upload it to IPFS
		 * Finally, form a new metadata json file and send its ipfs hash to backend and publish it
		 */
		const account = await getWalletAccount();
		// console.log('account: ' + account);
		// console.log(account);

		if (account !== -1) {
			// const accounts = await window.ethereum.request({
			// 	method: 'eth_requestAccounts',
			// })
			// const account = accounts[0]
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
					content: '你有信息尚未填写',
					className: 'custom-class',
					style: {
						marginTop: '10vh',
					},
				})
			} else {
				this.setState({
					onLoading: true,
				})
				let price_with_decimal = this.state.price * 10 ** this.state.decimal
				price_with_decimal = price_with_decimal.toString()
				let ipfsToContract = '0x0000000000000000000000000000000000000000000000000000000000000000'
				console.debug('price_with_decimal: ', price_with_decimal)
				let gasPrice = await web3.eth.getGasPrice()
				let new_gas_price = Math.floor(parseInt(gasPrice) * 1.5).toString()
				contract.methods
					.publish(price_with_decimal, this.state.bonusFee, this.state.shareTimes, ipfsToContract, this.state.token_addr)
					.send({
						from: this.state.usedAcc,
						gasPrice: new_gas_price,
					})
					.on('receipt', function (receipt) {
						// console.log(receipt)
						let publish_event = receipt.events.Publish
						let returned_values = publish_event.returnValues
						let root_nft_id = String(returned_values.rootNFTId)
						console.debug(typeof root_nft_id)
						let issue_id = returned_values.issue_id
						obj.setState({
							onLoading: false,
							rootNFTId: root_nft_id,
							issueId: issue_id,
							allowSubmitPDF: true,
						})
						message.success({
							content: '作品基本信息已提交成功',
							className: 'custom-class',
							style: {
								marginTop: '10vh',
							},
						})
					})
					.on('error', function (error) {
						obj.setState({
							onLoading: false,
						})
						if (error.message.includes('not mined')) {
							message.warning({
								content: '交易已提交，当前网络较拥堵，请稍等后去我的收藏中查看',
								className: 'custom-class',
								style: {
									marginTop: '10vh',
								},
							})
						} else {
							console.debug(error.message)
							message.error({
								content: `Error: ${error.message}`,
								className: 'custom-class',
								style: {
									marginTop: '10vh',
								},
							})
						}
					})
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

	checkDetail = async () => {
		let new_url = '/#/NFT/' + this.state.rootNFTId
		window.open(new_url, '_self')
	}

	submitWork = async () => {
		const { t } = this.props
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
			console.debug('coverURL: ', this.state.coverURL)
			let trimmed_des = this.state.description.replace(/(\r\n\t|\n|\r\t)/gm, ' ')
			// const accounts = await window.ethereum.request({
			// 	method: 'eth_requestAccounts',
			// })
			// const account = accounts[0]
			const account = await getWalletAccount();
			if (account !== this.state.usedAcc) {
				message.warning({
					content: t('账户发生变化，请切换回原账户'),
					className: 'custom-class',
					style: {
						marginTop: '10vh',
					},
				})
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

				contract.methods
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
						message.error({
							content: `Error: ${error.message}`,
							className: 'custom-class',
							style: {
								marginTop: '10vh',
							},
						})
					})
			} catch (error) {
				message.error({
					content: `Error: ${error.message}`,
					className: 'custom-class',
					style: {
						marginTop: '10vh',
					},
				})
			}
		}
	}


	postFiles2IPFS = async (zipedFilesForm) => {
		const pinFileUrl = 'https://api.pinata.cloud/pinning/pinFileToIPFS';
		try {
			// console.log('Form: ');
			// console.log(zipedFilesForm)
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
				message.success('文件打包上传成功!');
				this.setState({
					onLoading: false,
				})
				//TODO: 默认所有文件都为zip类型（单文件同样打包）
				this.setState({
					submitBtnDisable: false,
					fileIpfs: response.data.IpfsHash,
					fileType: 'zip',
				})
			}
			else {
				message.error({
					content: '文件打包上传失败,请重新上传',
					className: 'custom-class',
					style: {
						marginTop: '10vh',
					},
				})
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
			console.log(e.response);
		}
	}

	/* Get ziped files and upload ziped files to IPFS
	 */
	uploadFiles = async () => {
		const { t } = this.props;
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
				try {
					const signer = account;
					let message = {
						account: signer,
						nft_id: this.state.rootNFTId,
					}
					const sig = await web3.eth.personal.sign(JSON.stringify(message), signer)
					console.debug(sig)
					let payload = {
						nft_id: this.state.rootNFTId,
						account: signer,
						signature: sig,
					}
					let payload_str = JSON.stringify(payload)
					// console.log(payload_str)
					let req_key_url = backend + '/api/v1/key/claim'

					try {
						const res = await axios.post(req_key_url, payload_str, {
							headers: {
								'Content-Type': 'application/json',
							},
						})
						let secret_key = res.data.key //res.data.key
						console.debug(secret_key)
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
							this.postFiles2IPFS(params)
						}

					} catch (error) {
						if (error.response.status == 400) {
							if (error.response.data.message.includes('signature invalid')) {
								message.error({
									content: t('您的签名有误，请查看签名账号是否正确'),
									className: 'custom-class',
									style: {
										marginTop: '10vh',
									},
								})
							} else if (error.response.data.message.includes('param invalid')) {
								message.error({
									content: t('参数错误'),
									className: 'custom-class',
									style: {
										marginTop: '10vh',
									},
								})
							} else if (error.response.data.message.includes('not owned')) {
								message.error({
									content: t('您并不拥有此nft'),
									className: 'custom-class',
									style: {
										marginTop: '10vh',
									},
								})
							} else if (error.response.data.message.includes('not found')) {
								message.error({
									content: t('此nft还未生成'),
									className: 'custom-class',
									style: {
										marginTop: '10vh',
									},
								})
							}
						} else {
							message.error({
								content: t('请求文件加密密钥失败'),
								className: 'custom-class',
								style: {
									marginTop: '10vh',
								},
							})
						}
					}
				}
				catch (e) {
					message.error({
						content: 'Read file error',
						className: 'custom-class',
						style: {
							marginTop: '10vh',
						},
					})
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
			message.error({
				content: '上传文件不能为空！',
				className: 'custom-class',
				style: {
					marginTop: '10vh',
				},
			})
		}


	}

	render() {
		const { t } = this.props
		const { classes } = this.props
		const { fileList } = this.state;
		//console.log(t, classes)
		let obj = this
		const { TextArea } = Input
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
			// name: 'file',
			// action: 'https://api.pinata.cloud/pinning/pinFileToIPFS',
			// headers: {
			// 	pinata_api_key: pinata_api_key,
			// 	pinata_secret_api_key: pinata_secret_api_key,
			// },
			// beforeUpload: (file) => {
			// 	const { t } = this.props;
			// 	// eslint-disable-next-line no-async-promise-executor
			// 	return new Promise(async (resolve, reject) => {
			// 		try {
			// 			const accounts = await window.ethereum.request({
			// 				method: 'eth_requestAccounts',
			// 			})
			// 			const signer = accounts[0]
			// 			let message = {
			// 				account: signer,
			// 				nft_id: obj.state.rootNFTId,
			// 			}
			// 			const sig = await web3.eth.personal.sign(JSON.stringify(message), signer)
			// 			console.debug(sig)
			// 			let payload = {
			// 				nft_id: obj.state.rootNFTId,
			// 				account: signer,
			// 				signature: sig,
			// 			}
			// 			let payload_str = JSON.stringify(payload)
			// 			console.log(payload_str)
			// 			let req_key_url = backend + '/api/v1/key/claim'
			// 			try {
			// 				const res = await axios.post(req_key_url, payload_str, {
			// 					headers: {
			// 						'Content-Type': 'application/json',
			// 					},
			// 				})
			// 				let secret_key = res.data.key //res.data.key
			// 				console.debug(secret_key)
			// 				// if (file.type === 'text/plain') {
			// 				const reader = new FileReader()
			// 				reader.readAsArrayBuffer(file)
			// 				reader.onload = (e) => {
			// 					let b = e.target.result
			// 					let wordArray = CryptoJS.lib.WordArray.create(b)
			// 					const str = CryptoJS.enc.Hex.stringify(wordArray)
			// 					let cipher_text = CryptoJS.AES.encrypt(str, secret_key).toString()
			// 					let myblob = new Blob([cipher_text])
			// 					resolve(myblob)
			// 				}
			// 			} catch (error) {
			// 				if (error.response.status == 400) {
			// 					if (error.response.data.message.includes('signature invalid')) {
			// 						message.error({
			// 							content: t('您的签名有误，请查看签名账号是否正确'),
			// 							className: 'custom-class',
			// 							style: {
			// 								marginTop: '10vh',
			// 							},
			// 						})
			// 					} else if (error.response.data.message.includes('param invalid')) {
			// 						message.error({
			// 							content: t('参数错误'),
			// 							className: 'custom-class',
			// 							style: {
			// 								marginTop: '10vh',
			// 							},
			// 						})
			// 					} else if (error.response.data.message.includes('not owned')) {
			// 						message.error({
			// 							content: t('您并不拥有此nft'),
			// 							className: 'custom-class',
			// 							style: {
			// 								marginTop: '10vh',
			// 							},
			// 						})
			// 					} else if (error.response.data.message.includes('not found')) {
			// 						message.error({
			// 							content: t('此nft还未生成'),
			// 							className: 'custom-class',
			// 							style: {
			// 								marginTop: '10vh',
			// 							},
			// 						})
			// 					}
			// 				} else {
			// 					message.error({
			// 						content: t('请求文件加密密钥失败'),
			// 						className: 'custom-class',
			// 						style: {
			// 							marginTop: '10vh',
			// 						},
			// 					})
			// 				}
			// 			}
			// 		} catch (e) {
			// 			message.error({
			// 				content: 'Read file error',
			// 				className: 'custom-class',
			// 				style: {
			// 					marginTop: '10vh',
			// 				},
			// 			})
			// 			reject()
			// 		}
			// 	})
			// },
			// onChange(info) {
			// 	const { status } = info.file
			// 	if (status === 'done') {
			// 		let file_type = info.file.name.split('.')
			// 		let file_suffix = file_type[file_type.length - 1]
			// 		obj.setState({
			// 			fileIpfs: info.file.response.IpfsHash,
			// 			fileType: file_suffix,
			// 		})
			// 		console.debug('encrypted file hash: ', info.file.response.IpfsHash)
			// 		message.success(`${info.file.name} file uploaded successfully.`)
			// 	}
			// },
			// onDrop(e) {
			// 	console.log('Dropped files', e.dataTransfer.files)
			// },
		}

		if (this.state.allowSubmitPDF) {
			return (
				<Spin spinning={this.state.onLoading} size="large">
					<Container component="main" maxWidth="xs" className={classes.main}>
						<div className={classes.paper}>
							<Typography className={classes.Display6}>
								<b>{t('up_file')}</b>
							</Typography>
							<form className={classes.form} noValidate>
								{this.state.jumped ? (
									<div>
										<Grid item style={{ width: '100%' }}>
											<label className={classes.Display9}>{t('art_name')} *</label>
											<Input
												placeholder={t('art_name')}
												allowClear
												id="pubName"
												onChange={this.handleGetPubName}
												value={this.state.name}
												className={classes.input}
											/>
										</Grid>
										<Grid item style={{ width: '100%' }}>
											<label style={{ marginTop: 20 }} className={classes.Display9}>{t('art_desc')} *</label>
											<p className={classes.Display11}>{t('art_desc_tip')}</p>
											<TextArea rows={4} id="Description" onChange={this.handleGetDescription} />
										</Grid>
									</div>
								) : (
									<div></div>
								)}
								<label className={classes.Display9+' '+classes.MarginT10}>{t('pic_cover')} *</label>
								<p className={classes.Display11}>{t('pic_cover_tip')}</p>
								<Dragger {...prop} style={{ width: '100%', minHeight: 100 }} id="Uploader" maxCount='1' accept="image/*">
									<p className="ant-upload-drag-icon">
										<InboxOutlined />
									</p>
									<p className={classes.Display9}>{t('upload_file_tip1')}</p>
									<p className={classes.Display11}>{t('upload_file_tip2')}</p>
								</Dragger>

								<label className={classes.Display9+' '+classes.MarginT10}>{t('art_file')} *</label>
								<p className={classes.Display11}>{t('art_file_tip')} </p>
								<Dragger {...propFile} style={{ width: '100%', minHeight: 100 }} id="Uploader2">
									<p className="ant-upload-drag-icon">
										<InboxOutlined />
									</p>
									<p className={classes.Display9}>{t('upload_file_tip1')}</p>
									<p className={classes.Display11}>{t('upload_file_tip2')}</p>
								</Dragger>
								<Button
									variant="contained"
									className={classes.btnMini}
									disabled={this.state.uploadBtnDisable}
									style={{
										float: 'right',
										//fontSize: '14px',
									}}
									onClick={this.uploadFiles}
								>
									{t('打包并上传')}
								</Button>
								<div style={{ textAlign: 'center' }}>
									<Button
										disabled ={this.state.submitBtnDisable}
										startIcon={<CloudUploadOutlined />}
										className={classes.btn}
										onClick={this.submitWork}
									>
										{t('发布作品')}
									</Button>
								</div>
							</form>
						</div>
					</Container>
				</Spin>
			)
		} else if (this.state.finished) {
			return (
				<Spin spinning={this.state.onLoading} size="large">
					<ThemeProvider theme={theme}>
						<TopBar />
						<div style={{ textAlign: 'center' }}>
							<Typography className={classes.titleCon+' '+classes.MarginB5}>
								<b>{t('pulish_success')}</b>
							</Typography>
							<div style={{display:'flex',justifyContent:'center'}}>
								<Paper className={classes.paperImg}>
									<img className={classes.coverImg} src={this.state.coverURL}></img>
								</Paper>
							</div>
							<Typography className={classes.Display9+' '+classes.MarginT10}>
								{t('you_gain_nft')} #{this.state.rootNFTId}
							</Typography>

							<Button
								className={classes.btn + ' ' +classes.MarginB5}
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
				<Spin spinning={this.state.onLoading} size="large">
					<ThemeProvider theme={theme}>
						<TopBar />
						<Container component="main" maxWidth="xs" className={classes.main}>
							<div className={classes.paper}>
								<Typography className={classes.Display6}>
									<b>{t('art_info')}</b>
								</Typography>
								<form className={classes.form} noValidate>
									<Grid container spacing={2}>
										<Grid item style={{ width: '100%' }}>
											<label className={classes.Display9}>{t('art_name')} *</label>
											<Input
												placeholder={t('art_name')}
												allowClear
												id="pubName"
												onChange={this.handleGetPubName}
												value={this.state.name}
												className={classes.input}
											/>
										</Grid>
										<Grid item style={{ width: '100%' }}>
											<label className={classes.Display9}>{t('fit_rate')} *</label>
											<p className={classes.Display11}>{t('fit_rate_tip')}</p>
											<InputNumber
												id="bonusFee"
												defaultValue={0}
												min={0}
												max={100}
												formatter={(value) => `${value}%`}
												parser={(value) => value.replace('%', '')}
												onChange={this.handleGetBonusFee}
												className={classes.inputNum}
											/>
										</Grid>
										<Grid item style={{ width: '100%' }}>
											<label className={classes.Display9}>{t('access_coin')} *</label>
											<p className={classes.Display11}>{t('access_coin_tip')}</p>
											<Select
												showSearch
												value={this.state.token_addr}
												placeholder={t('please_input_coin')}
												className={classes.input}
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
										<Grid item style={{ width: '100%' }}>
											<label className={classes.Display9}>
												{t('price')} ({this.state.token_symbol})*
											</label>
											<InputNumber
												id="price"
												defaultValue={0}
												min={0}
												onChange={this.handleGetPrice}
												className={classes.inputNum}
											/>
										</Grid>
										<Grid item style={{ width: '100%' }}>
											<label className={classes.Display9}>{t('max_share')} (MAX： 65535)*</label>
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
										<Grid item style={{ width: '100%' }}>
											<label className={classes.Display9}>{t('art_desc')} *</label>
											<p className={classes.Display11}>{t('art_desc_tip')}</p>
											<TextArea rows={4} id="Description" onChange={this.handleGetDescription} />
										</Grid>
									</Grid>
								</form>
								<Grid container alignItems="center" direction="column" spacing={4} style={{ marginTop: 20, marginBottom: 50 }}>
									<Grid item xs style={{ textAlign: 'center' }}>
										<Button
											className={classes.btn}
											startIcon={<CloudUploadOutlined style={{ fontSize: '100%' }} />}
											onClick={this.submit}
										>
											{t('submit')}
										</Button>
									</Grid>
									<Grid item xs style={{ textAlign: 'center' }}>
										<Button className={classes.btnMini} onClick={this.handleClickOpen}>
											<span className={classes.Display10}> {t('have_submit')} </span>
										</Button>
									</Grid>
								</Grid>
								<Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
									<DialogTitle   className={classes.MarginB10+' '+classes.MarginT10+' '+classes.MarginL9+' '+classes.MarginR9} id="form-dialog-title" ><span className={classes.Display9}>{t('inpt_NFT_ID')}</span></DialogTitle>
									<DialogContent className={classes.MarginL9+' '+classes.MarginR9}>
										<DialogContentText><span  className={classes.Display11}>{t('inpt_NFT_ID_tip')}</span></DialogContentText>
										<label style={{marginBottom: 10,marginRight:10}}><span   className={classes.Display11}>NFT ID *</span></label>
										<InputNumber className={classes.inputNum} defaultValue={0} min={0} onChange={this.handleGetNFTId} />
									</DialogContent>
									<DialogActions  className={classes.MarginB7+' '+classes.MarginT7+' '+classes.MarginL9+' '+classes.MarginR9}>
										<Button onClick={this.handleClose} className={classes.btnOutlineMini} color="primary">
											{t('cancel')}
										</Button>
										<Button className={classes.btnMini} onClick={this.jump} color="primary">
											{t('go_upload')}
										</Button>
									</DialogActions>
								</Dialog>
							</div>
						</Container>
						<Footer />
					</ThemeProvider>
				</Spin>
			)
		}
	}
}

export default withTranslation()(withStyles(withCommon(styles), { withTheme: true })(EncryptedPublish))
//todo 涉及交易
