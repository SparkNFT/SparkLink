import React, { Component } from 'react'
import '../App.css'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { createTheme, ThemeProvider, withStyles } from '@material-ui/core/styles'
import TopBar from '../components/TopBar'
import Typography from '@material-ui/core/Typography'
import axios from 'axios'
import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container'
import { DollarCircleOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import { Spin, message } from 'antd'
import contract,{freshContract} from '../utils/contract'
import web3 from '../utils/web3'
import Skeleton from '@material-ui/lab/Skeleton'
import config from '../global/config'
import { withTranslation } from 'react-i18next'
import withCommon from '../styles/common'
import Footer from '../components/Footer'

const { gateway, backend, sparkAddr } = config
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
class BuySingle extends Component {
	constructor(props) {
		super(props)
		this.state = {
			name: '',
			bonusFee: 0,
			coverURL: '',
			description: '',
			price: 0,
			priceString: '',
			ipfsHashMeta: '',
			open: false,
			address: '',
			NFTId: '',
			onSale: false,
			owner: '',
			approvedAddr: '',
			currentAcc: '',
			onLoading: false,
			childrenNum: 0,
			loadItem: true,
			encrypted: '未知',
			tokenAddr: null,
			tokenSymbol: '',
			decimal: 0,
			approved: false,
		}
	}

	async componentDidMount() {
		await freshContract();
		console.log(sparkAddr,backend,gateway)
		const accounts = await window.ethereum.request({
			method: 'eth_requestAccounts',
		})
		const account = accounts[0]
		this.setState({
			currentAcc: account,
			NFTId: this.props.match.params.NFTId,
		})
		const royalty = await contract().methods.getRoyaltyFeeByNFTId(this.state.NFTId).call()
		const metadata = await contract().methods.tokenURI(this.props.match.params.NFTId).call()
		let hash = metadata.split('/')
		this.setState({
			ipfsHashMeta: hash[hash.length - 1],
		})
		let url = gateway + this.state.ipfsHashMeta
		try {
			const res = await axios({ method: 'get', url: url, timeout: 1000 * 3 })
			let content = res.data
			let bonus = content.attributes[0].value
			let encrypted
			if (content.attributes[3].value.toUpperCase() === 'TRUE') {
				encrypted = '是'
			} else {
				encrypted = '否'
			}

			this.setState({
				loadItem: false,
				name: content.name,
				description: content.description,
				bonusFee: bonus,
				coverURL: content.image,
				encrypted: encrypted,
			})
		} catch (error) {
			let name_holder = 'SparkNFT#' + this.props.match.params.NFTId
			this.setState({
				loadItem: false,
				name: name_holder,
				description: '暂时无法获取到该nft的相关描述',
				bonusFee: royalty,
				coverURL: 'https://via.placeholder.com/100x140.png?text=SparkNFT',
			})
		}

		let owner = await contract().methods.ownerOf(this.props.match.params.NFTId).call()
		let approved = await contract().methods.getApproved(this.props.match.params.NFTId).call()
		let price = await contract().methods.getTransferPriceByNFTId(this.props.match.params.NFTId).call()
		let token_addr = await contract().methods.getTokenAddrByNFTId(this.props.match.params.NFTId).call()
		this.setState({
			owner: owner,
			approvedAddr: approved,
			price: price,
		})
		if (token_addr == '0x0000000000000000000000000000000000000000') {
			this.setState({
				tokenAddr: token_addr,
				tokenSymbol: 'MATIC',
				decimal: 18,
				approved: true,
			})
		} else {
			try {
				const token_contract = new web3.eth.Contract(abi, token_addr)
				const token_symbol = await token_contract.methods.symbol().call()
				const decimal = await token_contract.methods.decimals().call()
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

		let price_with_decimal = price / 10 ** this.state.decimal
		price_with_decimal = price_with_decimal + ' ' + this.state.tokenSymbol
		this.setState({
			priceString: price_with_decimal,
		})

		const child_url = backend + '/api/v1/nft/info?nft_id=' + this.state.NFTId
		try {
			const response = await axios.get(child_url)
			let children_num = response.data.children_count
			this.setState({
				childrenNum: children_num,
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

	handleBuy = async () => {
		const accounts = await window.ethereum.request({
			method: 'eth_requestAccounts',
		})
		const account = accounts[0]

		let gasPrice = await web3.eth.getGasPrice()
		let new_gas_price = Math.floor(parseInt(gasPrice) * 1.5).toString()
		let obj = this
		if (this.state.tokenAddr == '0x0000000000000000000000000000000000000000') {
			this.setState({
				onLoading: true,
			})
			contract().methods
				.safeTransferFrom(this.state.owner, account, this.state.NFTId)
				.send({
					from: account,
					value: this.state.price,
					gasPrice: new_gas_price,
				})
				.on('receipt', function () {
					obj.setState({
						onLoading: false,
					})
					message.success({
						content: '交易已经上链',
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
		} else {
			this.setState({
				onLoading: true,
			})
			contract().methods
				.safeTransferFrom(this.state.owner, account, this.state.NFTId)
				.send({
					from: account,
					gasPrice: new_gas_price,
				})
				.on('receipt', function () {
					obj.setState({
						onLoading: false,
					})
					message.success({
						content: '交易已经上链',
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
	}

	handleApprove = async () => {
		const accounts = await window.ethereum.request({
			method: 'eth_requestAccounts',
		})
		const account = accounts[0]

		this.setState({
			onLoading: true,
		})
		let obj = this
		try {
			const token_contract = new web3.eth.Contract(abi, this.state.tokenAddr)
			let gasPrice = await web3.eth.getGasPrice()
			let new_gas_price = Math.floor(parseInt(gasPrice) * 1.5).toString()
			let price = this.state.price.toString()

			token_contract.methods
				.approve(this.sparkAddr, price)
				.send({
					from: account,
					gasPrice: new_gas_price,
				})
				.on('receipt', function () {
					obj.setState({
						onLoading: false,
						approved: true,
					})
					message.success({
						content: '已经成功授权合约',
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

	handleGetPrice = (value) => {
		this.setState({
			price: value,
		})
	}

	handleGetAddr = (e) => {
		this.setState({
			address: e.target.value,
		})
	}

	render() {
		const { classes } = this.props
		const { t } = this.props
		const buyButton = () => {
			if (this.state.approvedAddr.toLowerCase() !== this.state.currentAcc.toLowerCase()) {
				return (
					<Button
						startIcon={<DollarCircleOutlined style={{ fontSize: '100%' }} />}
						className={classes.btn}
						disabled
					>
						{t('购买')}
					</Button>
				)
			} else if (!this.state.approved) {
				return (
					<Button className={classes.btn} onClick={this.handleApprove}>
						{t('授权合约')}
					</Button>
				)
			} else {
				return (
					<Button
						startIcon={<DollarCircleOutlined style={{ fontSize: '100%' }} />}
						className={classes.btn}
						onClick={this.handleBuy}
					>
						{t('购买')}
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
									href="/"
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
											<Typography
												align="left"
												color="textPrimary"
												paragraph
												className={classes.Display10}
												style={{
													marginTop: '2%',
												}}
											>
												{t('售价：')} {this.state.priceString}
											</Typography>					
											
											<Typography
												align="left"
												color="textPrimary"
												paragraph
												className={classes.Display11}
												style={{
													marginTop: '2%',
												}}
											>
												{t('当前拥有者：')} {this.state.owner}		
											</Typography>				
												
											<Typography align="left" color="textPrimary" paragraph className={classes.Display11} >
												{t('当前拥有的子节点数量：')} {this.state.childrenNum}
											</Typography>
											<Typography align="left" color="textPrimary" paragraph className={classes.Display11} >
												{t('NFT是否加密：')} {this.state.encrypted}	
											</Typography>
											<div style={{display:'flex',justifyContent:'start'}}>{buyButton()}</div>
										</Grid>
									</Grid>
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

export default withTranslation()(withStyles(withCommon(styles), { withTheme: true })(BuySingle))
//todo  涉及交易
