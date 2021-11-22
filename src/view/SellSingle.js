import React, { Component } from 'react'
import '../App.css'
import { Button, Grid } from '@material-ui/core'
import { createTheme, ThemeProvider, withStyles } from '@material-ui/core/styles'
import TopBar from '../components/TopBar'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from '@material-ui/core'
import { Typography, Paper, Container } from '@material-ui/core'
import axios from 'axios'
import { DollarCircleOutlined, ArrowLeftOutlined, CopyOutlined } from '@ant-design/icons'
import { TOKENPOCKET, METAMASK, LASTCONNECT, MATHWALLET } from '../global/globalsString'
import { Spin, message } from 'antd'
import { Input, InputNumber } from 'antd'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import contract, { freshContract } from '../utils/contract'
import Skeleton from '@material-ui/lab/Skeleton'
import web3 from '../utils/web3';
import config from '../global/config'
import { withTranslation } from 'react-i18next'
import Web3 from 'web3'
import withCommon from '../styles/common'
import Footer from '../components/Footer'
import { getWalletAccount, getChainName, getChainId } from '../utils/getWalletAccountandChainID'

//TP钱包支持
const tp = require('tp-js-sdk');
//麦子钱包支持
const mathwallet = require('math-js-sdk');
const { gateway, backend } = config
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
		fontFamily: 'ANC,source-han-sans-simplified-c, sans-serif',
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
		fontFamily: 'ANC,source-han-sans-simplified-c, sans-serif',
		
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
		fontFamily: 'ANC,source-han-sans-simplified-c, sans-serif',
		justifyContent: 'flex-start',
		alignItems: 'center',
		[theme.breakpoints.between('xs', 'sm')]: {
			justifyContent:'',
			textAlign:'left'
		},
	},
	share: {
		fontFamily: 'ANC,source-han-sans-simplified-c, sans-serif',
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
class SellSingle extends Component {
	state = {
		name: '',
		bonusFee: 0,
		coverURL: '',
		description: '',
		price: 0,
		ipfsHashMeta: '',
		open: false,
		toAddress: '',
		NFTId: '',
		onSale: false,
		copied: false,
		onLoading: false,
		owner: '',
		currentAcc: '',
		childrenNum: 0,
		loadItem: true,
		tokenAddr: null,
		tokenSymbol: '',
		decimal: 0,
	}

	async componentDidMount() {
		const { t } = this.props;
		const chainName = await getChainName();
		await freshContract();
		switch(chainName){
		case 'matic':
			web3.setProvider(new Web3.providers.HttpProvider('https://polygon-mainnet.infura.io/v3/0232394ba4b34544a778575aefa2ee8c'))
			break;
		case 'bsc':
			web3.setProvider(new Web3.providers.HttpProvider('https://bsc-dataseed1.binance.org:443'))
			break;
		case 'eth':
			web3.setProvider(new Web3.providers.HttpProvider('https://polygon-mainnet.infura.io/v3/0232394ba4b34544a778575aefa2ee8c'))
			break;
		default: 
			web3.setProvider(new Web3.providers.HttpProvider('https://polygon-mainnet.infura.io/v3/0232394ba4b34544a778575aefa2ee8c'))
			break;
		}
		localStorage.setItem('hasSetHttpProvider', 'true')
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

		let obj = this
		this.setState({
			currentAcc: account,
			NFTId: this.props.match.params.NFTId,
		})
		const royalty = await contract().methods.getRoyaltyFeeByNFTId(this.state.NFTId).call()
		const metadata = await contract().methods.tokenURI(this.state.NFTId).call()
		let hash = metadata.split('/')
		this.setState({ ipfsHashMeta: hash[hash.length - 1] })
		var url = gateway + this.state.ipfsHashMeta
		try {
			const res = await axios({ method: 'get', url: url, timeout: 1000 * 2 })
			let content = res.data
			let bonus = content.attributes[0].value
			// let encrypted = content.attributes[3].value
			this.setState({
				loadItem: false,
				name: content.name,
				description: content.description,
				bonusFee: bonus,
				coverURL: content.image,
			})
		} catch (error) {
			var name_holder = 'SparkNFT#' + this.props.match.params.NFTId
			obj.setState({
				loadItem: false,
				name: name_holder,
				description: t('暂时无法获取到该nft的相关描述'),
				bonusFee: royalty,
				coverURL: 'https://via.placeholder.com/100x140.png?text=SparkNFT',
			})
			console.debug(error)
		}

		var owner = await contract().methods.ownerOf(this.props.match.params.NFTId).call()
		var price = await contract().methods.getTransferPriceByNFTId(this.props.match.params.NFTId).call()
		var token_addr = await contract().methods.getTokenAddrByNFTId(this.props.match.params.NFTId).call()
		if (price == '0') {
			this.setState({
				owner: owner.toLowerCase(),
				onSale: false,
			})
		} else {
			this.setState({
				owner: owner.toLowerCase(),
				onSale: true,
			})
		}

		if (token_addr == '0x0000000000000000000000000000000000000000') {
			this.setState({
				tokenAddr: token_addr,
				tokenSymbol: 'MATIC',
				decimal: 18,
			})
		} else {
			try {
				const token_contract = new web3.eth.Contract(abi, token_addr)
				const token_symbol = await token_contract.methods.symbol().call()
				const decimal = await token_contract.methods.decimals().call()
				this.setState({
					tokenAddr: token_addr,
					tokenSymbol: token_symbol,
					decimal: decimal,
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

		const child_url = backend + '/api/v1/nft/info?nft_id=' + this.state.NFTId
		try {
			const res = await axios.get(child_url)
			var children_num = res.data.children_count
			this.setState({
				childrenNum: children_num,
			})
		} catch (error) {
			if (error.response === undefined) {
				message.error({
					content: t('错误：服务器未响应'),
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
					content:t('获取nft子节点情况页面失败：')+ ` ${error}`,
					className: 'custom-class',
					style: {
						marginTop: '10vh',
					},
				})
			}
		}
	}

	handleClickOpen = () => {
		this.setState({
			open: true,
		})
	}

	handleClose = () => {
		this.setState({
			open: false,
		})
	}

	handleGetPrice = (value) => {
		this.setState({
			price: value,
		})
	}

	handleGetAddr = (e) => {
		this.setState({
			toAddress: e.target.value,
		})
	}

	handleClickLink = async () => {
		const chainId = await getChainId()
		let new_url = `/#/NFT/${this.state.rootNFTId}/${chainId}`;
		window.open(new_url, '_self')
	}

	sell = async () => {
		const {t} = this.props;
		this.setState({
			open: false,
		})
		const account = await getWalletAccount();

		var price_with_decimal = this.state.price * 10 ** this.state.decimal
		price_with_decimal = price_with_decimal.toString()
		var obj = this
		this.setState({
			onLoading: true,
		})
		var gasPrice = await web3.eth.getGasPrice()
		var new_gas_price = Math.floor(parseInt(gasPrice) * 1.5).toString()
		contract().methods
			.determinePriceAndApprove(this.state.NFTId, price_with_decimal, this.state.toAddress)
			.send({
				from: account,
				gasPrice: new_gas_price,
			})
			.on('receipt', function () {
				obj.setState({
					onSale: true,
					onLoading: false,
				})
				message.success({
					content: t('已经成功授权买方'),
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
				message.error({
					content: `Error: ${error.message}`,
					className: 'custom-class',
					style: {
						marginTop: '10vh',
					},
				})
			})
	}

	render() {
		const { classes } = this.props
		const { t } = this.props
		const sell_info = () => {
			let host = window.location.host
			let toUrl = 'https://' + host + '/#/buySingle/' + this.state.NFTId
			if (this.state.onSale) {
				return (
					<Grid container>
						<Grid item xs>
							<Typography color="inherit" align="center" noWrap className={classes.share}>
								{t('请将下方链接分享给买方，')}
								<br />{t('买方会进入此链接来购买这个NFT')}<br />
								{toUrl}
								<CopyToClipboard text={toUrl} onCopy={() => this.setState({ copied: true })}>
									<IconButton color="primary" aria-label="upload picture" component="span">
										<CopyOutlined />
									</IconButton>
								</CopyToClipboard>
							</Typography>
						</Grid>
					</Grid>
				)
			}
		}
		const showSellBtn = () => {
			if (this.state.currentAcc == this.state.owner) {
				return (
					<Button
						startIcon={<DollarCircleOutlined style={{ fontSize: '100%'}} />}
						className={classes.btn}
						onClick={this.handleClickOpen}
					>
						{t('售卖')}
					</Button>
				)
			} else {
				return (
					<Button
						startIcon={<DollarCircleOutlined style={{ fontSize:  '100%' }} />}
						className={classes.btn}
						disabled
					>
						{t('售卖')}
					</Button>
				)
			}
		}

		return (
			<Spin spinning={this.state.onLoading} size="large">
				<ThemeProvider theme={theme}>
					<TopBar />
					<Container component="main" className={classes.container}>
						<Grid container item xs={11} md={10} sm={10} lg={10} xl={10}>
							<div>
								<Button
									startIcon={<ArrowLeftOutlined style={{ fontSize: '100%' }} />}
									onClick={this.handleClickLink}
									className={classes.Display8}
									style={{ marginTop: 20, marginBottom: 10}}
								>
									{t('返回')}
								</Button>
							</div>
							<div className={classes.paper}>
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
									<Grid 
										container
										direction="row"
										className={classes.content}
									>
										<Grid container justifyContent='center' item xs={12} sm={5} md={5} lg={5} xl={5}>
											<Paper className={classes.imagePapaer}>
												<img className={classes.imageStyle} src={this.state.coverURL} onError={() => this.setFlag('isCoverLoaded')} id="cover" crossOrigin="anonymous" ></img>
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
											>
												#{this.state.NFTId}
											</Typography>
											<Typography
												color="inherit"
												align="left"
												noWrap
												className={classes.Display8}
											>
												<b>{this.state.name}</b>
											</Typography>
											<Typography
												align="justify"
												color="textSecondary"
												className={classes.Display10}
												paragraph
												style={{
													marginTop: '2%',
													maxWidth: '100%',
												}}
											>
												{this.state.description}
											</Typography>
											<Typography
												align="left"
												color="textPrimary"
												paragraph
												className={classes.Display10}
												style={{ marginTop: '6%'}}
											>
												{t('创作者分红比例：')}{this.state.bonusFee} %
											</Typography>
											<Typography align="left" color="textPrimary" paragraph className={classes.Display10} >
												{t('当前拥有的子节点数量：')} {this.state.childrenNum}
											</Typography>
											<div style={{display:'flex',justifyContent:'start'}}>{showSellBtn()}</div>
											<Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
												<DialogTitle   className={classes.MarginB11+' '+classes.MarginT10+' '+classes.MarginL9+' '+classes.MarginR9} id="form-dialog-title" >
													<span className={classes.Display9}>{t('填写售卖信息')}</span>
												</DialogTitle>
												<DialogContent  className={classes.MarginL9+' '+classes.MarginR9}>
													<DialogContentText className={classes.Display11}>
														{t('请在下方区域填写你希望售卖的价格，以及售卖对象的钱包地址。')}
													</DialogContentText>
													<label  className={classes.Display11+' '+classes.MarginR10}>{t('售卖价格')} ({this.state.tokenSymbol})*</label>
													<InputNumber
														defaultValue={0}
														min={0}
														onChange={this.handleGetPrice}
														className={classes.inputNum}
													/>
													<br/>
													<label
														className={classes.Display11+' '+classes.MarginR10}
													>
														{t('买方钱包地址 *')}
													</label>
													<Input
														placeholder={t('买方钱包地址 *')}
														allowClear
														id="pubName"
														onChange={this.handleGetAddr}
														className={classes.input}
													/>
												</DialogContent>
												<DialogActions className={classes.MarginB7+' '+classes.MarginT7+' '+classes.MarginL9+' '+classes.MarginR9}>
													<Button onClick={this.handleClose} className={classes.btnOutlineMini} color="primary">
														{t('取消')}
													</Button>
													<Button className={classes.btnMini} onClick={this.sell} color="primary">
														{t('售卖')}
													</Button>
												</DialogActions>
											</Dialog>
										</Grid>
									</Grid>
								)}
							</div>
							<div style={{ marginTop: 50 }}>{sell_info()}</div>
						</Grid>
					</Container>
					<Footer></Footer>
				</ThemeProvider>
			</Spin>
		)
	}
}

export default withTranslation()(withStyles(withCommon(styles), { withTheme: true })(SellSingle))
//todo 涉及交易
