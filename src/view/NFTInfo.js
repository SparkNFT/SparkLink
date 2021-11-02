import React, { Component } from 'react'
import '../App.css'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { createTheme, ThemeProvider, withStyles } from '@material-ui/core/styles'
import Skeleton from '@material-ui/lab/Skeleton'
import Typography from '@material-ui/core/Typography'
import TopBar from '../components/TopBar'
import Poster from '../components/Poster'
import MaskLayer from '../components/MaskLayer'
import Paper from '@material-ui/core/Paper'
import {
	DownloadOutlined,
	FireOutlined,
	ArrowLeftOutlined,
	MoneyCollectOutlined,
	DollarCircleOutlined,
} from '@ant-design/icons'
import { Container } from '@material-ui/core'
import contract from '../utils/contract'
import { Progress, Spin, message } from 'antd'
import axios from 'axios'
import web3 from '../utils/web3'
import config from '../global/config'
import { TOKENPOCKET, METAMASK, LASTCONNECT, MATHWALLET } from '../global/globalsString'
const { gateway, backend } = config

const mathwallet = require('math-js-sdk');
const tp = require('tp-js-sdk')
const FileSaver = require('file-saver')
const CryptoJS = require('crypto-js')
const abi = require('erc-20-abi')

const theme = createTheme({
	palette: {
		primary: {
			main: '#2196f3',
		},
	},
})

const styles = (theme) => ({
	container: {
		maxWidth: 1500,
	},
	cbutton: {
		fontFamily: 'Teko',
		height: 70,
		[theme.breakpoints.between('xs', 'sm')]: {
			justifyContent: 'center',
			alignItems: 'flex-start',
		},
		[theme.breakpoints.between('sm', 'md')]: {
			justifyContent: 'center',
			alignItems: 'flex-start',
		},
		[theme.breakpoints.between('md', 'lg')]: {
			justifyContent: 'flex-end',
			alignItems: 'flex-start',
		},
		[theme.breakpoints.between('lg', 'xl')]: {
			justifyContent: 'flex-end',
			alignItems: 'flex-start',
		},
		[theme.breakpoints.up('xl')]: {
			justifyContent: 'flex-end',
			alignItems: 'flex-start',
		},
	},
	content: {
		fontFamily: 'Teko',
		[theme.breakpoints.between('xs', 'sm')]: {
			justifyContent: 'flex-start',
			alignItems: 'flex-start',
		},
		[theme.breakpoints.between('sm', 'md')]: {
			justifyContent: 'flex-start',
			alignItems: 'flex-start',
		},
		[theme.breakpoints.between('md', 'lg')]: {
			justifyContent: 'flex-start',
			alignItems: 'flex-start',
		},
		[theme.breakpoints.between('lg', 'xl')]: {
			justifyContent: 'center',
			alignItems: 'flex-start',
		},
		[theme.breakpoints.up('xl')]: {
			justifyContent: 'center',
			alignItems: 'flex-start',
		},
	},
	btnMain: {
		marginTop: theme.spacing(3),
		color: '#FFFFFF',
		borderWidth: 2,
		borderColor: '#e3f2fd',
		fontSize: 16,
		borderRadius: 25,
		width: 120,
		maxWidth: '20rem',
		minWidth: '10rem',
	},
	btnSecond: {
		marginTop: theme.spacing(3),
		marginLeft: 30,
		color: '#03A9F4',
		borderWidth: 3,
		borderColor: '#03A9F4',
		fontSize: 16,
		borderRadius: 25,
		width: 120,
		maxWidth: '20rem',
		minWidth: '10rem',
	},
	paper: {
		marginTop: theme.spacing(1),
		textAlign: 'center',
		maxWidth: 1370,
		// backgroundColor: "green"
	},
	imagePapaer: {
		[theme.breakpoints.between('xs', 'sm')]: {
			backgroundColor: '#EFEBE9',
			width: 330,
			marginLeft: 25,
		},
		[theme.breakpoints.between('sm', 'md')]: {
			backgroundColor: '#EFEBE9',
			width: 340,
			marginLeft: 25,
		},
		[theme.breakpoints.between('md', 'lg')]: {
			backgroundColor: '#EFEBE9',
			width: 350,
			marginLeft: 25,
		},
		[theme.breakpoints.between('lg', 'xl')]: {
			backgroundColor: '#EFEBE9',
			width: 350,
			marginLeft: 10,
		},
		[theme.breakpoints.up('xl')]: {
			backgroundColor: '#EFEBE9',
			width: 350,
			marginLeft: 10,
		},
	},
	imageStyle: {
		objectFit: 'contain',
		// object- fit: cover
		[theme.breakpoints.between('xs', 'sm')]: {
			width: 280,
			height: 365,
			marginTop: 20,
			marginBottom: 50,
		},
		[theme.breakpoints.between('sm', 'md')]: {
			width: 290,
			height: 385,
			marginTop: 20,
			marginBottom: 50,
		},
		[theme.breakpoints.between('md', 'lg')]: {
			width: 300,
			height: 420,
			marginTop: 20,
			marginBottom: 50,
		},
		[theme.breakpoints.between('lg', 'xl')]: {
			width: 300,
			marginTop: 20,
			marginBottom: 50,
		},
		[theme.breakpoints.up('xl')]: {
			width: 300,
			marginTop: 20,
			marginBottom: 50,
		},
	},
	content2: {
		fontFamily: 'Teko',
		[theme.breakpoints.between('xs', 'sm')]: {
			marginLeft: 10,
			maxWidth: 500,
		},
		[theme.breakpoints.between('sm', 'md')]: {
			marginLeft: 90,
			maxWidth: 500,
		},
		[theme.breakpoints.between('md', 'lg')]: {
			marginLeft: 80,
			maxWidth: 500,
		},
		[theme.breakpoints.between('lg', 'xl')]: {
			marginLeft: 50,
			maxWidth: 500,
		},
		[theme.breakpoints.up('xl')]: {
			marginLeft: 60,
			maxWidth: 500,
		},
	},
	cbutton2: {
		fontFamily: 'Teko',
		height:80,
		[theme.breakpoints.between('xs', 'sm')]: {
			justifyContent: 'center',
			alignItems: 'flex-start',
		},
		[theme.breakpoints.between('sm', 'md')]: {
			justifyContent: 'center',
			alignItems: 'flex-start',
		},
		[theme.breakpoints.between('md', 'lg')]: {
			justifyContent: 'flex-end',
			alignItems: 'flex-start',
		},
		[theme.breakpoints.between('lg', 'xl')]: {
			justifyContent: 'space-evenly',
			alignItems: 'flex-start',
		},
		[theme.breakpoints.up('xl')]: {
			justifyContent: 'space-evenly',
			alignItems: 'flex-start',
		},
	},
	share: {
		fontFamily: 'Teko',
		marginBottom: '10%',
		[theme.breakpoints.between('xs', 'sm')]: {
			fontSize: 14,
		},
		[theme.breakpoints.between('sm', 'md')]: {
			fontSize: 16,
		},
		[theme.breakpoints.between('md', 'lg')]: {
			fontSize: 18,
		},
		[theme.breakpoints.between('lg', 'xl')]: {
			fontSize: 20,
		},
		[theme.breakpoints.up('xl')]: {
			fontSize: 20,
		},
	},
})
class NFTInfo extends Component {
	state = {
		price: '',
		loading: false,
		showDecryptProgress: null,
		decryptPercentage: 0,
		showProgress: false,
		percentage: 0,
		Profit: '',
		account: null,
		loadItem: true,
		Cover: '',
		isCoverLoaded: false,
		Name: '',
		Description: '',
		BonusFee: 0,
		childrenNum: 0,
		encrypted: '未知',
		dataUrl: null,
		isEncrypt: false,
		fileType: '',
		spark: false,
		tokenAddr: '',
		tokenSymbol: '',
	}
	async componentDidMount() {
		if (!window.ethereum) {
			alert('请先安装metamask')
			window.location.href = '/#/collections'
			return
		}

		const chainId = await window.ethereum.request({ method: 'eth_chainId' })
		if (chainId !== '0x89') {
			alert('请切换至Polygon 主网络')
			await window.ethereum.request({
				method: 'wallet_switchEthereumChain',
				params: [
					{
						chainId: '0x89',
					},
				],
			})
		}

		const price = await contract.methods.getShillPriceByNFTId(this.props.match.params.id).call()
		const owner = await contract.methods.ownerOf(this.props.match.params.id).call()

		//获取账号
		// let account
		// const lastConnect = localStorage.getItem(LASTCONNECT)
		// if (lastConnect === METAMASK) {
		// 	const accounts = await window.ethereum.request({
		// 		method: 'eth_requestAccounts',
		// 	})
		// 	account = accounts[0]
		// } else if (lastConnect === TOKENPOCKET) {
		// 	await tp.getCurrentWallet().then((value) => {
		// 		account = value.data.address
		// 	})
		// 	if (account.length === 0) {
		// 		await tp.getWallet({ walletTypes: ['matic'], switch: false }).then((value) => {
		// 			account = value.data.address
		// 		})
		// 	}
		// }
		var account = null;
		var value, accounts;
		const lastConnect = localStorage.getItem(LASTCONNECT);
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
			break;
		default:
			// accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
			// account = accounts[0];
			break;
		}
		if (account === null) {
			alert('请先连接钱包')
			window.location.href = '/#/';
			return;
		}
		this.setState({ account: account })
		// const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
		// const account = accounts[0]
		if (web3.utils.toChecksumAddress(account) !== owner) {
			// alert("这枚nft不属于你");
			message.warning({
				content: '这枚nft不属于你',
				className: 'custom-class',
				style: {
					marginTop: '10vh',
				},
			})
			window.location.href = '/#/'
		}

		const token_addr = await contract.methods.getTokenAddrByNFTId(this.props.match.params.id).call()
		const res = await contract.methods.getProfitByNFTId(this.props.match.params.id).call()
		if (token_addr == '0x0000000000000000000000000000000000000000') {
			let price_with_decimal = res / 10 ** 18
			let profit = price_with_decimal + ' MATIC'
			let price_poster = price / 10 ** 18
			price_poster = price_poster + ' MATIC'
			this.setState({
				price: price_poster,
				tokenAddr: '0x0000000000000000000000000000000000000000',
				tokenSymbol: 'MATIC',
				Profit: profit,
			})
		} else {
			const token_contract = new web3.eth.Contract(abi, token_addr)
			const token_symbol = await token_contract.methods.symbol().call()
			const decimal = await token_contract.methods.decimals().call()
			let price_with_decimal = res / 10 ** decimal
			let price_poster = price / 10 ** decimal
			price_poster = price_poster + ' ' + token_symbol
			let profit = price_with_decimal + ` ${token_symbol}`
			this.setState({
				price: price_poster,
				tokenAddr: token_addr,
				tokenSymbol: token_symbol,
				Profit: profit,
			})
		}
		const meta = await contract.methods.tokenURI(this.props.match.params.id).call()
		// https://coldcdn.com/api/cdn/v5ynur/ipfs/QmV7s3xrtwxfBa7VDcqHGFKcSjKdLZL7offiC31yM2NSqz
		let hash = meta.split('/')
		const issue = await contract.methods.getIssueIdByNFTId(this.props.match.params.id).call()
		const royalty = await contract.methods.getRoyaltyFeeByIssueId(issue).call()
		let file_hash = hash[hash.length - 1]
		let request_url = 'https://coldcdn.com/api/cdn/v5ynur/ipfs/' + file_hash

		try {
			const res = await axios({
				method: 'get',
				url: request_url,
				timeout: 1000 * 5,
			})
			let data = res.data
			let bouns = 0
			let fileAddr = ''
			let isEncrypt = false
			let fileType = data.attributes[2].value
			let encrypted = '未知'

			for (let i = 0; i < data.attributes.length; i++) {
				if (data.attributes[i].trait_type === 'Bonuse Percentage') {
					bouns = data.attributes[i].value
					console.log(bouns)
				}
				if (data.attributes[i].trait_type === 'File Address') {
					fileAddr = data.attributes[i].value
				}
				if (data.attributes[i].trait_type === 'Encrypted') {
					if (data.attributes[i].value === 'FALSE') {
						isEncrypt = false
						encrypted = '否'
					} else {
						isEncrypt = true
						encrypted = '是'
					}
				}
			}

			this.setState({
				Name: data.name,
				Description: data.description,
				BonusFee: royalty,
				Cover: data.image,
				isCoverLoaded: true,
				dataUrl: fileAddr,
				isEncrypt: isEncrypt,
				encrypted: encrypted,
				fileType: fileType,
				loadItem: false,
			})
		} catch (error) {
			this.setState({ Name: 'SparkNFT' })
			this.setState({ Description: '暂时无法获取到该nft的相关描述' })
			this.setState({ BonusFee: royalty })
			this.setState({
				Cover: 'https://via.placeholder.com/100x140.png?text=SparkNFT',
			})
			this.setState({ dataUrl: 'fileAddr_PlaceHolder', loadItem: false })
		}

		const leafUrl = backend + '/api/v1/nft/info?nft_id=' + this.props.match.params.id
		axios
			.get(leafUrl)
			.then((res) => {
				let children_num = res.data.children_count
				this.setState({
					childrenNum: children_num,
				})
			})
			.catch((error) => {
				if (error.response === undefined) {
					message.error({
						content: '错误：服务器未响应',
						className: 'custom-class',
						style: {
							marginTop: '10vh',
						},
					})
					return
				}
				if (error.response.status === 400 && error.response.data.message.includes('children not found')) {
					console.debug('no children')
				} else {
					message.error({
						content: `获取nft子节点情况页面失败： ${error}`,
						className: 'custom-class',
						style: {
							marginTop: '10vh',
						},
					})
				}
			})
	}

	return = async () => {
		window.location.reload(true)
	}

	claim = async () => {
		this.setState({
			loading: true,
		})
		let gasPrice = await web3.eth.getGasPrice()
		let new_gas_price = Math.floor(parseInt(gasPrice) * 1.5).toString()
		try {
			await contract.methods.claimProfit(this.props.match.params.id).send({
				from: this.state.account,
				gasPrice: new_gas_price,
			})
		} catch (error) {
			message.error({
				content: `Error: ${error}`,
				className: 'custom-class',
				style: {
					marginTop: '10vh',
				},
			})
		} finally {
			this.setState({
				loading: false,
			})
		}
	}

	downloadIPFS = async () => {
		let obj = this
		let dataSplits = this.state.dataUrl.split('/')
		let dataHash = dataSplits[dataSplits.length - 1]
		let dataUrl = gateway + dataHash
		this.setState({
			showProgress: true,
		})
		if (this.state.isEncrypt) {
			let cipher_config = {
				method: 'get',
				url: dataUrl,
				onDownloadProgress(progress) {
					let percentage = Math.round((progress.loaded / progress.total) * 100)
					obj.setState({
						percentage: percentage,
					})
				},
			}

			const response = await axios(cipher_config)
			let ciphertext = response.data
			//TODO请求account
			let accounts = await await window.ethereum.request({
				method: 'eth_requestAccounts',
			})
			let account = accounts[0]
			// let signJSON = {
			// 	account: account,
			// 	root_nft_id: this.props.match.params.id,
			// }
			// signJSON = JSON.stringify(signJSON)
			this.setState({
				showProgress: false,
			})
			await this.signDataAndDecrypt(account, ciphertext)
		} else {
			let open_config = {
				url: dataUrl, //your url
				method: 'GET',
				responseType: 'blob', // important
				onDownloadProgress(progress) {
					let percentage = Math.round((progress.loaded / progress.total) * 100)
					obj.setState({
						percentage: percentage,
					})
				},
			}
			try {
				const response = await axios(open_config)
				const url = window.URL.createObjectURL(new Blob([response.data]))
				const link = document.createElement('a')
				link.href = url
				link.style.display = 'none'
				let suffix = '.' + obj.state.fileType
				let fileName = this.state.Name + suffix
				link.download = fileName
				document.body.appendChild(link)
				link.click()
				document.body.removeChild(link)
				URL.revokeObjectURL(url)
			} catch (error) {
				message.error({
					content: `Error: ${error}`,
					className: 'custom-class',
					style: {
						marginTop: '10vh',
					},
				})
			} finally {
				this.setState({ showProgress: false })
			}
		}
	}

	signDataAndDecrypt = async (signer, ciphertext) => {
		let JSONBody = {
			account: signer,
			nft_id: this.props.match.params.id,
		}
		let json_str = JSON.stringify(JSONBody)
		const sig = await web3.eth.personal.sign(json_str, signer)

		this.setState({
			showDecryptProgress: true,
		})

		let payload = {
			account: signer,
			nft_id: this.props.match.params.id,
			signature: sig,
		}
		let payload_str = JSON.stringify(payload)
		let req_key_url = backend + '/api/v1/key/claim'
		try {
			const res = await axios.post(req_key_url, payload_str, {
				headers: {
					'Content-Type': 'application/json',
				},
			})

			if (res.status == 200) {
				let key = res.data.key
				let data = CryptoJS.AES.decrypt(ciphertext, key)
				let plainText = data.toString(CryptoJS.enc.Utf8)
				const wordArray = CryptoJS.enc.Hex.parse(plainText)
				let BaText = this.wordArrayToByteArray(wordArray, wordArray.length)
				let blob = new Blob([BaText])
				let suffix = '.' + this.state.fileType
				FileSaver.saveAs(blob, this.state.Name + suffix)
			} else {
				let error_msg = res.data.message
				message.error({
					content: `Error: ${error_msg}`,
					className: 'custom-class',
					style: {
						marginTop: '10vh',
					},
				})
			}
		} catch (error) {
			message.error({
				content: `Error: ${error}`,
				className: 'custom-class',
				style: {
					marginTop: '10vh',
				},
			})
		}
	}

	wordToByteArray = (result, word, length) => {
		const lengthBefore = result.length
		const xff = 0xff
		if (length > 0) result.push(word >>> 24)
		if (length > 1) result.push((word >>> 16) & xff)
		if (length > 2) result.push((word >>> 8) & xff)
		if (length > 3) result.push(word & xff)

		let info = {
			result: result,
			addedLength: result.length - lengthBefore,
		}
		return info
	}

	wordArrayToByteArray = (wordArray, length) => {
		console.debug('enter in wordArrayToByte')
		if (
			Object.prototype.hasOwnProperty.call(wordArray, 'sigBytes') &&
			Object.prototype.hasOwnProperty.call(wordArray, 'words')
		) {
			length = wordArray.sigBytes
			wordArray = wordArray.words
		}

		let result = [],
			bytesAdded,
			current_bytes = 0,
			lengthBefore = length,
			i = 0
		while (length > 0) {
			let added_info = this.wordToByteArray(result, wordArray[i], Math.min(4, length))
			result = added_info.result
			bytesAdded = added_info.addedLength
			current_bytes = current_bytes + bytesAdded
			let percent = Math.round((current_bytes / lengthBefore) * 100)
			if (percent !== this.state.decryptPercentage) {
				this.setState({
					decryptPercentage: percent,
				})
			}
			length -= bytesAdded
			i++
		}

		return new Uint8Array(result)
	}

	setFlag = (name) => {
		const obj = {}
		const flag = this.state[name]
		obj[name] = !flag
		this.setState(obj)
	}

	downloadPoster = (res) => {
		console.log(res)
	}
	render() {
		const { classes } = this.props
		const sell_info = () => {
			let url = window.location.host
			let toUrl = 'https://' + url + '/#/NFT/Spark/' + this.props.match.params.id
			// let share = '分享复制链接：' + toUrl
			// this.state.onSale
			const coverRef = document.getElementById('cover')
			if (this.state.spark && this.state.Cover !== '' && coverRef ) {
				//const coverHeight = coverRef.height
				//const coverWidth = coverRef.width
				return (
					<div>
						{this.state.spark ? (
							<MaskLayer onClose={() => this.setFlag('spark')}>
								<Poster
									addr={this.state.tokenAddr}
									coverImg={coverRef.src}
									str={this.state.price}
									share={toUrl}
								/>
							</MaskLayer>
						) : null}
					</div>
				)
			}
		}

		if (this.state.showDecryptProgress) {
			return (
				<Spin spinning={this.state.loading} size="large">
					<ThemeProvider theme={theme}>
						<TopBar />
						<div style={{ textAlign: 'center', marginTop: '2%', marginLeft: 40 }}>
							<Typography color="textPrimary" gutterBottom style={{ marginRight: 50, marginTop: 20, fontSize: 24 }}>
								<b>正在解密文件</b>
							</Typography>
						</div>
						<div style={{ textAlign: 'center', marginTop: '10%' }}>
							<Progress type="circle" percent={this.state.decryptPercentage} width={200} />
						</div>
						<div style={{ textAlign: 'center' }}>
							<Button
								variant="contained"
								className={classes.button}
								style={{
									marginTop: 50,
									width: 200,
									height: 50,
									marginBottom: 50,
								}}
								onClick={this.return}
							>
								返回信息页面
							</Button>
						</div>
					</ThemeProvider>
				</Spin>
			)
		} else if (this.state.showProgress) {
			return (
				<Spin spinning={this.state.loading} size="large">
					<ThemeProvider theme={theme}>
						<TopBar />
						<div style={{ textAlign: 'center', marginTop: '2%', marginLeft: 40 }}>
							<Typography color="textPrimary" gutterBottom style={{ marginRight: 50, marginTop: 20, fontSize: 24 }}>
								<b>正在下载文件</b>
							</Typography>
						</div>
						<div style={{ textAlign: 'center', marginTop: '10%' }}>
							<Progress type="circle" percent={this.state.percentage} width={200} />
						</div>
					</ThemeProvider>
				</Spin>
			)
		} else {
			return (
				<Spin spinning={this.state.loading} size="large">
					<ThemeProvider theme={theme}>
						<TopBar />
						<Container component="main" className={classes.container}>
							<Button
								startIcon={<ArrowLeftOutlined style={{ fontSize: '2rem' }} />}
								href="/#/collections"
								style={{ marginTop: 20, marginBottom: 10, fontSize: '2rem' }}
							>
								回到我的收藏馆
							</Button>
							<Grid container direction="row" justifyContent="center" alignContent="flex-start">
								<Grid container direction="row" className={classes.cbutton}>
									<Grid item>
										<Typography
											color="textPrimary"
											gutterBottom
											style={{ marginRight: 50, marginTop: 20, fontSize: 14 }}
										>
											<b>目前收益: {this.state.Profit}</b>
										</Typography>
									</Grid>

									<Grid item>
										<Button
											style={{
												marginTop: 10,
												marginRight: 30,
												marginBottom: 20,
											}}
											size="large"
											variant="contained"
											color="primary"
											className={classes.btnMain}
											startIcon={<MoneyCollectOutlined />}
											onClick={this.claim}
										>
											<Typography id="isSpark" variant="button" component="h3" gutterBottom>
												<font size="3" color="white">
													领收益
												</font>
											</Typography>
										</Button>
									</Grid>

									<Grid item>
										<Button
											style={{ marginTop: 10, marginBottom: 20 }}
											size="large"
											variant="outlined"
											className={classes.btnSecond}
											startIcon={<DollarCircleOutlined />}
											href={'/#/sellSingle/' + this.props.match.params.id}
										>
											<Typography variant="button" component="h2" gutterBottom>
												<font size="3">售卖</font>
											</Typography>
										</Button>
									</Grid>
								</Grid>
							</Grid>

							<div className={classes.paper}>
								{this.state.loadItem ? (
									<Grid container className={classes.content} spacing={5}>
										<Grid item xs={4}>
											<Skeleton
												variant="rect"
												width={300}
												height={500}
												style={{ width: 370, marginLeft: 50, marginBottom: 50 }}
											/>
										</Grid>

										<Grid item xs style={{ marginLeft: '5%' }}>
											<Skeleton animation="wave" variant="text" width={200} height={30} />
											<Skeleton animation="wave" variant="text" width={400} height={70} />
											<Skeleton animation="wave" variant="rect" width={500} height={300} style={{ marginBottom: 50 }} />
										</Grid>
									</Grid>
								) : (
									<Grid
										container
										direction="row"
										justifyContent="space-between"
										spacing={5}
										className={classes.content}
									>
										<Grid style={{ maxWidth: 200 }}>
											<Paper className={classes.imagePapaer}>

												<img className={classes.imageStyle} src={this.state.Cover} onError={() => this.setFlag('isCoverLoaded')} id="cover" crossOrigin="anonymous" ></img>

											</Paper >
										</Grid >

										<Grid item xs={2}></Grid>

										<Grid item className={classes.content2}>
											<Typography
												color="inherit"
												align="left"
												// eslint-disable-next-line react/jsx-no-duplicate-props
												color="textSecondary"
												noWrap
												style={{
													fontFamily: 'Teko',
													fontSize: 16,
													marginTop: '2%',
												}}
											>
												#{this.props.match.params.id}
											</Typography>
											<Typography
												color="inherit"
												align="left"
												noWrap
												style={{
													fontFamily: 'Teko',
													fontSize: 34,
													marginTop: '2%',
												}}
											>
												<b>{this.state.Name}</b>
											</Typography>
											<Typography
												align="justify"
												color="textSecondary"
												paragraph
												style={{
													marginTop: '2%',
													maxWidth: '100%',
													fontSize: 16,
												}}
											>
												{this.state.Description}
											</Typography>
											<Typography
												align="left"
												color="textPrimary"
												paragraph
												style={{
													marginTop: '6%',
													maxWidth: '100%',
													fontSize: 24,
												}}
											>
												分红比例: {this.state.BonusFee} %
											</Typography>
											<Typography align="left" color="textPrimary" paragraph style={{ maxWidth: '65%', fontSize: 12 }}>
												当前拥有的子节点数量: {this.state.childrenNum}
											</Typography>
											<Typography align="left" color="textPrimary" paragraph style={{ maxWidth: '65%', fontSize: 12 }}>
												NFT作品是否加密: {this.state.encrypted}
											</Typography>

											<Grid container direction="row" className={classes.cbutton2}>
												<Grid item>
													<Button
														size="small"
														variant="contained"
														color="primary"
														target="_blank"
														className={classes.btnMain}
														startIcon={<DownloadOutlined />}
														onClick={this.downloadIPFS}
													>
														<font size="3" color="white">
															下载
														</font>
													</Button>
												</Grid>

												<Grid>
													<Button
														size="small"
														variant="outlined"
														target="_blank"
														className={classes.btnSecond}
														startIcon={<FireOutlined />}
														onClick={() => this.setFlag('spark')}
														disabled={!this.state.isCoverLoaded}
													>
														<font size="3">点火分享</font>
													</Button>
												</Grid>
											</Grid>
										</Grid>
									</Grid >
								)
								}
							</div >

							{sell_info()}
						</Container >
					</ThemeProvider >
				</Spin >
			)
		}
	}
}
export default withStyles(styles, { withTheme: true })(NFTInfo)
//todo 涉及交易
//account的获取方式做了修改
