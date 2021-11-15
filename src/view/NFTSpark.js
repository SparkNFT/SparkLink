import React, { Component } from 'react'
import '../App.css'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { createTheme, ThemeProvider, withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import TopBar from '../components/TopBar'
import { Paper, Container, Link } from '@material-ui/core'
import axios from 'axios'
import contract from '../utils/contract'
import web3 from '../utils/web3'
import { ArrowLeftOutlined, FireOutlined } from '@ant-design/icons'
import Skeleton from '@material-ui/lab/Skeleton'
import { Progress, message, Spin } from 'antd'
import config from '../global/config'
import { TOKENPOCKET, METAMASK, LASTCONNECT } from '../global/globalsString'
import {getWalletAccount } from '../utils/getWalletAccountandChainID'
import { withTranslation } from 'react-i18next'
import withCommon from '../styles/common'
import Footer from '../components/Footer'

const { gateway, backend, sparkAddr } = config

// const mathwallet = require('math-js-sdk');
const tp = require('tp-js-sdk')
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
	container: {
		maxWidth: 1500,
		// backgroundColor: '#2196f3'
	},
	btnMain: {
		marginTop: theme.spacing(3),
		color: '#FFFFFF',
		backgroundColor: '#03A9F4',
		borderWidth: 3,
		// borderColor: '#03A9F4',
		fontSize: 16,
		borderRadius: 25,
		width: 150,
		maxWidth: '20rem',
		minWidth: '10rem',
	},
	btnSecond: {
		marginTop: theme.spacing(3),
		color: '#03A9F4',
		borderWidth: 3,
		borderColor: '#03A9F4',
		fontSize: 16,
		borderRadius: 25,
		width: 150,
		maxWidth: '20rem',
		minWidth: '10rem',
	},
	paper: {
		marginTop: theme.spacing(1),
		textAlign: 'center',
		maxWidth: 1400,
	},
	content: {
		fontFamily: 'ANC,source-han-sans-simplified-c, sans-serif',
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
	imagePaper: {
		[theme.breakpoints.between('xs', 'sm')]: {
			backgroundColor: '#EFEBE9',
			width: 330,
			height: 420,
			marginLeft: 10,
		},
		[theme.breakpoints.between('sm', 'md')]: {
			backgroundColor: '#EFEBE9',
			width: 340,
			height: 440,
			marginLeft: 10,
		},
		[theme.breakpoints.between('md', 'lg')]: {
			backgroundColor: '#EFEBE9',
			width: 350,
			height: 465,
			marginLeft: 10,
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
		fontFamily: 'ANC,source-han-sans-simplified-c, sans-serif',
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
	title: {
		fontFamily: 'ANC,source-han-sans-simplified-c, sans-serif',
		[theme.breakpoints.between('xs', 'sm')]: {
			fontSize: 48,
		},
		[theme.breakpoints.between('sm', 'md')]: {
			fontSize: 60,
		},
		[theme.breakpoints.between('md', 'lg')]: {
			fontSize: 70,
		},
		[theme.breakpoints.between('lg', 'xl')]: {
			fontSize: 75,
		},
		[theme.breakpoints.up('xl')]: {
			fontSize: 80,
		},
	},
})
class NFTSpark extends Component {
	state = {
		Name: '',
		Description: '',
		BonusFee: 0,
		Cover: '',
		price: '',
		priceString: '',
		onLoading: false,
		loadItem: true,
		open: false,
		approved: false,
		tokenAddr: '',
		tokenSymbol: '',
		isEncrypt: true,
		percentage: 0,
		showProgress: false,
		fileType: '',
		remainShillTimes: 0,
		maxShillTimes: 0,
	}

	async componentDidMount() {
		//?RPC请求
		//TODO
		// const chainId = await window.ethereum.request({ method: 'eth_chainId' })
		// if (chainId !== '0x89') {
		// 	alert('请切换至Polygon 主网络')
		// 	await window.ethereum.request({
		// 		method: 'wallet_switchEthereumChain',
		// 		params: [
		// 			{
		// 				chainId: '0x89',
		// 			},
		// 		],
		// 	})
		// }

		// let account
		// const lastConnect = localStorage.getItem(LASTCONNECT)
		// if (lastConnect === METAMASK) {
		// 	const accounts = await window.ethereum.request({
		// 		method: 'eth_requestAccounts',
		// 	})
		// 	account = accounts[0]
		// } else if (lastConnect === TOKENPOCKET) {
		// 	await tp.getWallet({ walletTypes: ['matic'], switch: false }).then((value) => {
		// 		account = value.data.address
		// 	})
		// }
		// var account = null;
		// var value, accounts;
		// const lastConnect = localStorage.getItem(LASTCONNECT)
		// switch (lastConnect) {
		// case TOKENPOCKET:
		// 	value = await tp.getCurrentWallet()
		// 	account = value.data.address;
		// 	break;
		// case MATHWALLET:
		// 	value = await mathwallet.getCurrentWallet()
		// 	account = value.address;
		// 	break;
		// case METAMASK:
		// 	accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
		// 	account = accounts[0];
		// 	break;
		// default:
		// 	// accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
		// 	// account = accounts[0];
		// 	break;
		// }
		const account = await getWalletAccount()

		if (account === null) {
			alert('请先连接钱包');
			window.location.href = '/#/';
			return;
		}


		// const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
		// const account = accounts[0]

		const meta = await contract.methods.tokenURI(this.props.match.params.id).call()
		let hash = meta.split('/')
		this.setState({ hash: hash[hash.length - 1] })
		let isEncrypt
		try {
			let url = gateway + this.state.hash
			const res = await axios.get(url)
			let data = res.data
			let bouns = data.attributes[0].value
			let fileAddr = data.attributes[1].value
			let fileType = data.attributes[2].value
			if (data.attributes[3].value === 'FALSE') {
				isEncrypt = false
			} else {
				isEncrypt = true
			}
			this.setState({
				Name: data.name,
				Description: data.description,
				BonusFee: bouns,
				Cover: data.image,
				fileType: fileType,
				dataUrl: fileAddr,
				isEncrypt: isEncrypt,
			})
		} catch (error) {
			message.error({
				content: `Error: ${error}`,
				className: 'custom-class',
				style: {
					marginTop: '10vh',
				},
			})
		}

		const price = await contract.methods.getShillPriceByNFTId(this.props.match.params.id).call()
		const token_addr = await contract.methods.getTokenAddrByNFTId(this.props.match.params.id).call()

		this.setState({
			price: price,
			tokenAddr: token_addr,
		})

		if (token_addr == '0x0000000000000000000000000000000000000000') {
			let price_with_decimal = price / 10 ** 18
			price_with_decimal = price_with_decimal + ' MATIC'
			this.setState({
				priceString: price_with_decimal,
				approved: true,
			})
		} else {
			try {
				const token_contract = new web3.eth.Contract(abi, token_addr)
				const decimals = await token_contract.methods.decimals().call()
				const token_symbol = await token_contract.methods.symbol().call()
				let price_with_decimal = price / 10 ** decimals
				price_with_decimal = price_with_decimal + ' ' + token_symbol
				this.setState({ priceString: price_with_decimal })
				const approved_amount = await token_contract.methods.allowance(account, sparkAddr).call()
				if (approved_amount >= price) {
					this.setState({
						approved: true,
					})
				} else {
					this.setState({
						approved: false,
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

		const leafUrl = backend + '/api/v1/nft/info?nft_id=' + this.props.match.params.id
		try {
			const res = await axios.get(leafUrl)
			let children_num = res.data.children_count
			let remain_shill_times = res.data.max_shill_times - res.data.shill_times
			let max_shill_times = res.data.max_shill_times
			this.setState({
				remainShillTimes: remain_shill_times,
				maxShillTimes: max_shill_times,
			})
			if (res.data.suggest_next_nft === this.props.match.params.id) {
				this.setState({
					childrenNum: children_num,
					recommendNFT: res.data.suggest_next_nft,
					showRecommend: false,
				})
			} else if (res.data.suggest_next_nft === '0') {
				this.setState({
					childrenNum: children_num,
					recommendNFT: res.data.suggest_next_nft,
					showRecommend: false,
				})
			} else {
				this.setState({
					childrenNum: children_num,
					recommendNFT: res.data.suggest_next_nft,
					showRecommend: true,
				})
			}
		} catch (error) {
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
		} finally {
			this.setState({
				loadItem: false,
			})
		}
	}

	handleClickLink = () => {
		let new_url = '/#/NFT/Spark/' + this.state.recommendNFT
		window.open(new_url)
	}

	downloadIPFS = async () => {
		let obj = this
		let dataSplits = this.state.dataUrl.split('/')
		let dataHash = dataSplits[dataSplits.length - 1]
		let dataUrl = gateway + dataHash
		this.setState({
			showProgress: true,
		})
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
			let suffix = '.' + this.state.fileType
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

	approve = async () => {
		const accounts = await window.ethereum.request({
			method: 'eth_requestAccounts',
		})
		const account = accounts[0]
		this.setState({ onLoading: true })

		let obj = this
		try {
			const price = this.state.price.toString()
			const token_contract = new web3.eth.Contract(abi, this.state.tokenAddr)
			let gasPrice = await web3.eth.getGasPrice()
			let new_gas_price = Math.floor(parseInt(gasPrice) * 1.5).toString()
			token_contract.methods
				.approve(sparkAddr, price)
				.send({
					from: account,
					gasPrice: new_gas_price,
				})
				.on('receipt', function () {
					message.success({
						content: '已经成功授权合约',
						className: 'custom-class',
						style: {
							marginTop: '10vh',
						},
					})
					obj.setState({
						onLoading: false,
						approved: true,
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
				content: `Error: ${error}`,
				className: 'custom-class',
				style: {
					marginTop: '10vh',
				},
			})
		}
	}

	shill = async () => {
		// const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
		// const account = accounts[0]
		let account
		const{ t } =this.props;
		const lastConnect = localStorage.getItem(LASTCONNECT)
		if (lastConnect === METAMASK) {
			const accounts = await window.ethereum.request({
				method: 'eth_requestAccounts',
			})
			account = accounts[0]
		} else if (lastConnect === TOKENPOCKET) {
			await tp.getWallet({ walletTypes: ['matic'], switch: false }).then((value) => {
				account = value.data.address
			})
		}
		let gasPrice = await web3.eth.getGasPrice()
		let new_gas_price = Math.floor(parseInt(gasPrice) * 1.5).toString()
		let obj = this

		this.setState({ onLoading: true })
		if (this.state.tokenAddr == '0x0000000000000000000000000000000000000000') {
			contract.methods
				.acceptShill(this.props.match.params.id)
				.send({
					from: account,
					value: this.state.price,
					gasPrice: new_gas_price,
				})
				.on('receipt', function () {
					message.success({
						content: t('交易已经上链'),
						className: 'custom-class',
						style: {
							marginTop: '10vh',
						},
					})
					obj.setState({
						onLoading: false,
						onSale: true,
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
		} else {
			contract.methods
				.acceptShill(this.props.match.params.id)
				.send({
					from: account,
					gasPrice: new_gas_price,
				})
				.on('receipt', function () {
					message.success({
						content: t('交易已经上链'),
						className: 'custom-class',
						style: {
							marginTop: '10vh',
						},
					})
					obj.setState({
						onLoading: false,
						onSale: true,
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
		}
	}

	render() {
		const { classes } = this.props
		const { t } = this.props
		const showBtn = () => {
			if (this.state.showRecommend) {
				return (
					<div>
						{this.state.isEncrypt ? (
							<Grid container justifyContent="space-around">
								<Button
									size="large"
									style={{ fontSize: '3rem' }}
									variant="contained"
									className={classes.btnMain}
									disabled
								>
									<Typography>
										<font size="4"> {t('下载')}</font>
									</Typography>
								</Button>
								<Grid item>
									<Button
										size="large"
										style={{ fontSize: '2rem' }}
										variant="outlined"
										color="secondary"
										target="_blank"
										className={classes.btnSecond}
										startIcon={<FireOutlined />}
										disabled
									>
										<Typography>
											<font size="4"> {t('铸造')} </font>
										</Typography>
									</Button>
								</Grid>
							</Grid>
						) : (
							<Grid container direction="row" justifyContent="space-around">
								<Grid item>
									<Button
										size="large"
										style={{ fontSize: '3rem' }}
										variant="contained"
										className={classes.btnMain}
										onClick={this.downloadIPFS}
									>
										<Typography>
											<font size="4"> {t('下载')} </font>
										</Typography>
									</Button>
								</Grid>
								<Grid item>
									<Button
										size="large"
										style={{ fontSize: '2rem' }}
										variant="outlined"
										color="secondary"
										target="_blank"
										className={classes.btnSecond}
										startIcon={<FireOutlined />}
										disabled
									>
										<Typography>
											<font size="4"> {t('铸造')} </font>
										</Typography>
									</Button>
								</Grid>
							</Grid>
						)}
					</div>
				)
			} else if (!this.state.approved) {
				return (
					<div>
						{this.state.isEncrypt ? (
							<Grid container justifyContent="space-around">
								<Button
									size="large"
									style={{ fontSize: '3rem' }}
									variant="contained"
									className={classes.btnColor2}
									disabled
								>
									<Typography>
										<font size="4"> {t('下载')}</font>
									</Typography>
								</Button>
								<Grid item>
									<Button
										size="large"
										style={{ fontSize: '3rem' }}
										target="_blank"
										className={classes.btnColor}
										onClick={this.approve}
									>
										<Typography>
											<font size="4"> {t('授权合约')}</font>
										</Typography>
									</Button>
								</Grid>
							</Grid>
						) : (
							<Grid container direction="row" justifyContent="space-around">
								<Grid item>
									<Button
										size="large"
										style={{ fontSize: '3rem' }}
										variant="contained"
										className={classes.btnColor2}
										onClick={this.downloadIPFS}
									>
										<Typography>
											<font size="4"> {t('下载')} </font>
										</Typography>
									</Button>
								</Grid>
								<Grid item>
									<Button
										size="large"
										style={{ fontSize: '3rem' }}
										variant="outlined"
										target="_blank"
										className={classes.btnColor}
										onClick={this.approve}
									>
										<Typography>
											<font size="4"> {t('授权合约')} </font>
										</Typography>
									</Button>
								</Grid>
							</Grid>
						)}
					</div>
				)
			} else {
				return (
					<div>
						{this.state.isEncrypt ? (
							<Grid container justifyContent="space-around">
								<Button
									size="large"
									style={{ fontSize: '3rem' }}
									variant="contained"
									className={classes.btnColor2}
									disabled
								>
									<Typography variant="button"  gutterBottom>
										<font size="4"> {t('下载')} </font>
									</Typography>
								</Button>
								<Grid item>
									<Button
										size="large"
										className={classes.btnColor}
										style={{ fontSize: '3rem' }}
										target="_blank"
										startIcon={<FireOutlined />}
										onClick={this.shill}
									>
										<Typography variant="button" gutterBottom>
											<font size="4"> {t('铸造')} </font>
										</Typography>
									</Button>
								</Grid>
							</Grid>
						) : (
							<Grid container direction="row" justifyContent="space-around">
								<Grid item>
									<Button
										size="large"
										style={{ fontSize: '3rem' }}
										variant="contained"
										className={classes.btnColor2}
										onClick={this.downloadIPFS}
									>
										<Typography variant="button"  gutterBottom>
											<font size="4"> {t('下载')} </font>
										</Typography>
									</Button>
								</Grid>
								<Grid item>
									<Button
										size="large"
										style={{ fontSize: '3rem' }}
										target="_blank"
										className={classes.btnColor}
										startIcon={<FireOutlined />}
										onClick={this.shill}
									>
										<Typography variant="button"  gutterBottom>
											<font size="4"> {t('铸造')} </font>
										</Typography>
									</Button>
								</Grid>
							</Grid>
						)}
					</div>
				)
			}
		}

		if (this.state.showProgress) {
			return (
				<Spin spinning={this.state.onLoading} size="large">
					<ThemeProvider theme={theme}>
						<TopBar />
						<div style={{ textAlign: 'center', marginTop: '2%', marginLeft: 40 }}>
							<Typography color="textPrimary" gutterBottom style={{ marginRight: 50, marginTop: 20, fontSize: 24 }}>
								<b>{t('正在下载文件')}</b>
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
				<Spin spinning={this.state.onLoading} size="large">
					<ThemeProvider theme={theme}>
						<TopBar />
						<Container component="main" className={classes.container}>
							<Button
								startIcon={<ArrowLeftOutlined style={{ fontSize: '2rem' }} />}
								href="/#/collections"
								style={{ marginTop: 20, marginBottom: 10, fontSize: '2rem' }}
							>
								{t('回到我的收藏馆')}
							</Button>
							<Grid container direction="row" justifyContent="center" alignItems="center" xs={12}>
								<Typography color="inherit" noWrap className={classes.title}>
									🔥 NFT 🔥
								</Typography>
							</Grid>

							<div className={classes.paper}>
								{this.state.loadItem ? (
									<Grid container spacing={5} className={classes.content}>
										<Grid item>
											<Skeleton
												variant="rect"
												width={300}
												height={500}
												style={{ width: 370, marginLeft: 50, marginBottom: 50 }}
											/>
										</Grid>
										<Grid item style={{ marginLeft: '5%' }}>
											<Skeleton animation="wave" variant="text" width={200} height={30} />
											<Skeleton animation="wave" variant="text" width={400} height={70} />
											<Skeleton animation="wave" variant="rect" width={500} height={300} style={{ marginBottom: 50 }} />
										</Grid>
									</Grid>
								) : (
									<Grid container direction="row" justifyContent="space-between" className={classes.content}>
										<Grid item style={{ maxWidth: 200 }}>
											<Paper className={classes.imagePaper}>
												<img className={classes.imageStyle} src={this.state.Cover}></img>
											</Paper>
										</Grid>

										<Grid xs={2}></Grid>

										<Grid item xs={12} className={classes.content2}>
											<Typography
												color="inherit"
												align="left"
												// eslint-disable-next-line react/jsx-no-duplicate-props
												color="textSecondary"
												noWrap
												style={{
													fontFamily: 'ANC,source-han-sans-simplified-c, sans-serif',
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
													fontFamily: 'ANC,source-han-sans-simplified-c, sans-serif',
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
												{t('点火价格: ')} {this.state.priceString}
											</Typography>
											<Typography align="left" color="textPrimary" paragraph style={{ maxWidth: '100%', fontSize: 18 }}>
												{t('最大分享次数：')} {this.state.maxShillTimes} 次
											</Typography>
											<Typography align="left" color="textPrimary" paragraph style={{ maxWidth: '100%', fontSize: 18 }}>
												{t('剩余分享次数：')} {this.state.remainShillTimes} 次
											</Typography>
											{this.state.isEncrypt ? (
												<Typography
													align="left"
													color="textPrimary"
													paragraph
													style={{ maxWidth: '100%', fontSize: 16 }}
												>
													{t('加密作品')}
												</Typography>
											) : (
												<Typography
													align="left"
													color="textPrimary"
													paragraph
													style={{ maxWidth: '100%', fontSize: 16 }}
												>
													{t('开源作品')}
												</Typography>
											)}
											{showBtn()}
										</Grid>
									</Grid>
								)}

								{this.state.showRecommend ? (
									<Grid style={{ marginTop: 50 }}>
										<Typography variant="h4" gutterBottom>
											{t('此NFT的子节点已经售完，我们给您推荐了其他还能购买的节点：')}
										</Typography>
										<Link onClick={this.handleClickLink} style={{ fontSize: 20, textDecoration: 'underline' }}>
											{window.location.host + '/#/NFT/Spark/' + this.state.recommendNFT}
										</Link>
									</Grid>
								) : (
									<div></div>
								)}
							</div>
						</Container>
						<Footer></Footer>
					</ThemeProvider>
				</Spin>
			)
		}
	}
}

export default withTranslation()(withStyles(withCommon(styles), { withTheme: true })(NFTSpark))
//todo 涉及交易
//account的获取方式做了修改
