import React, { Component } from 'react'
import '../App.css'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { createTheme, ThemeProvider, withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import TopBar from '../components/TopBar'
import { Paper, Container, Link } from '@material-ui/core'
import axios from 'axios'
import contract, { freshContract } from '../utils/contract'
import web3 from '../utils/web3'
import { ArrowLeftOutlined, FireOutlined, DownloadOutlined} from '@ant-design/icons'
import Skeleton from '@material-ui/lab/Skeleton'
import { Progress, message, Spin } from 'antd'
import config from '../global/config'
// eslint-disable-next-line no-unused-vars
import { TOKENPOCKET, METAMASK, LASTCONNECT } from '../global/globalsString'
import {getChainNameByChainId, getWalletAccount } from '../utils/getWalletAccountandChainID'
import { withTranslation } from 'react-i18next'
import withCommon from '../styles/common'
import Footer from '../components/Footer'
import BigNumber from 'bignumber.js'

let { gateway, backend, sparkAddr } = config
//刷新合约后需要重新设置sparkAddr，建议使用config.sparkAddr


// const mathwallet = require('math-js-sdk');
// const tp = require('tp-js-sdk')
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
		justifyContent:'center',
		display:'flex',
		flexDirection:'column',
		alignItems:'center'
	},
	cbutton: {
		fontFamily: 'montserrat,source-han-sans-simplified-c, sans-serif',
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
		fontFamily: 'montserrat,source-han-sans-simplified-c, sans-serif',
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
			justifyContent: 'flex',
			alignItems: 'flex-start',
		},
		[theme.breakpoints.up('xl')]: {
			justifyContent: 'center',
			alignItems: 'flex-start',
		},
	},
	paper: {
		marginTop: theme.spacing(1),
		textAlign: 'center',
		width:'100%'
		// backgroundColor: "green"
	},
	imagePapaer: {
		backgroundColor: '#EFEBE9',
		width:'100%'
	},
	imageStyle: {
		objectFit: 'contain',
		// object- fit: cover
		width:'80%',
		marginLeft:'10%',
		marginRight:'10%',
		marginTop:'10%',
		marginBottom:'10%'
	},
	content2: {
		fontFamily: 'montserrat,source-han-sans-simplified-c, sans-serif',
		
		[theme.breakpoints.between('xs', 'sm')]: {
			marginLeft:15,
		},
		[theme.breakpoints.between('sm', 'md')]: {
			marginLeft:25,
		},
		[theme.breakpoints.between('md', 'lg')]: {
			marginLeft:45,
		},
		[theme.breakpoints.between('lg', 'xl')]: {
			marginLeft:55,
		},
		[theme.breakpoints.up('xl')]: {
			marginLeft:75,
		},
		['@media (min-width:3200px)']: {
			marginLeft:140,
		},
	},
	cbutton2: {
		fontFamily: 'montserrat,source-han-sans-simplified-c, sans-serif',
		justifyContent: 'flex-start',
		alignItems: 'center',
		[theme.breakpoints.between('xs', 'sm')]: {
			justifyContent:'',
			textAlign:'left'
		},
	},
	share: {
		fontFamily: 'montserrat,source-han-sans-simplified-c, sans-serif',
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
	btnOutline:{
		inherit:'MarginL10'
	}
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

		if (account === -1) {
			alert('请先连接钱包');
			window.location.href = '/#/';
			return;
		}


		// const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
		// const account = accounts[
		await freshContract();
		sparkAddr = config.sparkAddr;
		console.log(contract());
	
		const meta = await contract().methods.tokenURI(this.props.match.params.id).call()
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

		const price = await contract().methods.getShillPriceByNFTId(this.props.match.params.id).call()
		const token_addr = await contract().methods.getTokenAddrByNFTId(this.props.match.params.id).call()

		this.setState({
			price: price,
			tokenAddr: token_addr,
		})
		
		if (token_addr == '0x0000000000000000000000000000000000000000') {
			const chainId = localStorage.getItem('chainId')
			let name = getChainNameByChainId(chainId).toUpperCase()
			let decimal = 18
			if(name == 'BSC'){
				name = 'BNB'
			}
			let price_poster = new BigNumber(price / 10 ** decimal)
			let price_string = price_poster.toString(10)
			console.log('num：'+price_string +'&'+price) 
			price_string = price_string + ' ' + name
			this.setState({
				priceString:  price_string,
				approved: true,
			})
		} else {
			try {
				const token_contract = new web3.eth.Contract(abi, token_addr)
				const decimals = await token_contract.methods.decimals().call()
				const token_symbol = await token_contract.methods.symbol().call()
				let price_with_decimal = new BigNumber(price / 10 ** decimals)
				price_with_decimal = price_with_decimal.toString(10) + ' ' + token_symbol
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
			if(remain_shill_times == -1) remain_shill_times = 0;
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
		const{ t } =this.props;
		let account;
		const lastConnect = localStorage.getItem(LASTCONNECT)
		if(lastConnect) {
			account = await getWalletAccount()
		}
		else{
			message.error('请先链接钱包！')
			return;
		}		
		
		let gasPrice = await web3.eth.getGasPrice()
		let new_gas_price = Math.floor(parseInt(gasPrice) * 1.5).toString()
		let obj = this

		this.setState({ onLoading: true })
		if (this.state.tokenAddr == '0x0000000000000000000000000000000000000000') {
			contract().methods
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
			contract().methods
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
									className={classes.btn}
									startIcon={<DownloadOutlined />}
									disabled
								>
									{t('下载')}
								</Button>
								<Grid item>
									<Button
										color="secondary"
										target="_blank"
										className={classes.btnOutline}
										startIcon={<FireOutlined />}
										disabled
									>
										{t('铸造')}
									</Button>
								</Grid>
							</Grid>
						) : (
							<Grid container direction="row">
								<Grid item>
									<Button
										startIcon={<DownloadOutlined />}
										className={classes.btn}
										onClick={this.downloadIPFS}
									>
										 {t('下载')}
									</Button>
								</Grid>
								<Grid item>
									<Button
										target="_blank"
										className={classes.btnOutline}
										startIcon={<FireOutlined />}
										disabled
									>
										{t('铸造')}
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
							<Grid container>
								<Button
									startIcon={<DownloadOutlined />}
									className={classes.btn}
									disabled
								>
									{t('下载')}
								</Button>
								<Grid item>
									<Button
										target="_blank"
										className={classes.btnOutline}
										onClick={this.approve}
									>
										{t('授权合约')}
									</Button>
								</Grid>
							</Grid>
						) : (
							<Grid container direction="row">
								<Grid item>
									<Button
										className={classes.btn}
										startIcon={<DownloadOutlined />}
										onClick={this.downloadIPFS}
									>
										{t('下载')}
									</Button>
								</Grid>
								<Grid item>
									<Button

										target="_blank"
										className={classes.btnOutline}
										onClick={this.approve}
									>
										{t('授权合约')}
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
							<Grid container>
								<Button
									startIcon={<DownloadOutlined />}
									className={classes.btn}
									disabled
								>
									{t('下载')}
								</Button>
								<Grid item>
									<Button
										className={classes.btnOutline}
										target="_blank"
										startIcon={<FireOutlined />}
										onClick={this.shill}
									>
										{t('铸造')}
									</Button>
								</Grid>
							</Grid>
						) : (
							<Grid container direction="row">
								<Grid item>
									<Button
										startIcon={<DownloadOutlined />}
										className={classes.btn}
										onClick={this.downloadIPFS}
									>
										{t('下载')}
									</Button>
								</Grid>
								<Grid item>
									<Button
										className={classes.btnOutline}
										startIcon={<FireOutlined />}
										onClick={this.shill}
									>
										{t('铸造')}
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
							<Grid container item xs={11} md={10} sm={10} lg={10} xl={10}>
								<Button
									startIcon={<ArrowLeftOutlined style={{fontSize:'100%'}} />}
									href="/#/collections"
									className={classes.Display11xs}
									style={{ marginTop: 20, marginBottom: 10,textDecorationLine:'underline'}}
								>
									{t('回到我的收藏馆')}
								</Button>
								<Grid container direction="row" justifyContent="center" alignItems="center" xs={12}>
									<Typography color="inherit" noWrap className={classes.Display5}>
										🔥 NFT 🔥
									</Typography>
								</Grid>

								<div className={classes.paper+' '+classes.PaddingT5}>
									{this.state.loadItem ? (
										<Grid container className={classes.content} spacing={5}>
											<Grid item xs={10} sm={5} md={5} lg={5} xl={5}>
												<Skeleton
													variant="rect"
													width={300}
													height={500}
													style={{ width: 370, marginLeft: 0, marginBottom: 50 }}
												/>
											</Grid>

											<Grid item xs={10} sm={5} md={5} lg={5}>
												<Skeleton animation="wave" variant="text" width={200} height={30} />
												<Skeleton animation="wave" variant="text" width={400} height={70} />
												<Skeleton animation="wave" variant="rect" width={500} height={300} style={{ marginBottom: 50 }} />
											</Grid>
										</Grid>
									) : (
										<Grid container direction="row" className={classes.content}>
											<Grid container justifyContent='center' item xs={12} sm={5} md={5} lg={5} xl={5}>
												<Paper className={classes.imagePapaer}>
													<img className={classes.imageStyle} src={this.state.Cover} onError={() => this.setFlag('isCoverLoaded')} id="cover" crossOrigin="anonymous" ></img>
												</Paper >
											</Grid >
											<Grid item xs={10} sm={6} md={6} lg={6} className={classes.content2 +' ' +classes.PaddingT9}>
												<Typography
													color="inherit"
													align="left"
													// eslint-disable-next-line react/jsx-no-duplicate-props
													color="textSecondary"
													noWrap
													className={classes.Display10}
													style={{fontWeight:'800',color:'#9F2225'}}
												>
													#{this.props.match.params.id}
												</Typography>
												<Typography
													color="inherit"
													align="left"
													className={classes.Display7}
													noWrap
													style={{
														fontFamily: 'montserrat,source-han-sans-simplified-c, sans-serif',
														marginTop: '2%',
													}}
												>
													<b>{this.state.Name}</b>
												</Typography>
												<Typography
													align="justify"
													color="textSecondary"
													className={classes.Display11xs}
													paragraph
													style={{
														marginTop: '2%',
														maxWidth: '100%',
														fontWeight: 300
													}}
												>
													{this.state.Description}
												</Typography>
												<Typography
													align="left"
													color="textPrimary"
													paragraph
													className={classes.Display10}
													style={{
														marginTop: '3%',
														maxWidth: '100%',
														fontWeight:'800',
													}}
												>
													{t('点火价格: ')} {this.state.priceString}
												</Typography>
												<Typography align="left" color="textPrimary" className={classes.Display10} style={{marginTop:'2%',fontWeight:'800'}} >
													{t('最大分享次数：')} {this.state.maxShillTimes} 次
												</Typography>
												<Typography align="left" color="textPrimary" className={classes.Display10} style={{marginTop:'2%',fontWeight:'800'}} >
													{t('剩余分享次数：')} {this.state.remainShillTimes} 次
												</Typography>
												{this.state.isEncrypt ? (
													<Typography
														align="left"
														color="textPrimary"
														className={classes.Display10}
														paragraph
														style={{ maxWidth: '100%',marginTop:'2%',fontWeight:'800'}}
													>
														{t('加密作品')}
													</Typography>
												) : (
													<Typography
														align="left"
														color="textPrimary"
														className={classes.Display10}
														paragraph
														style={{ maxWidth: '100%',marginTop:'2%',fontWeight:'800' }}
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
											<Typography className={classes.Display8} gutterBottom>
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
							</Grid>

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
