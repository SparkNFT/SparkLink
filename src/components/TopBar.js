import React, { Component } from 'react'
import fullLogo from '../imgs/logo.png'
import sLogo from '../imgs/sparkLink.png'
import TPpic from '../imgs/TP.png'
import metamaskpic from '../imgs/metamask.png'
import mathwalletpic from '../imgs/mathwallet.png'
import '../App.css'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
//import ChooseWalletDialog from './ChooseWalletDialog'
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core'
import Web3 from 'web3'
import isMobile from '../utils/isMobile'
import LanguageBtn from './LanguageBtn'
import { withTranslation } from 'react-i18next'
import { TOKENPOCKET, METAMASK, LASTCONNECT, MATHWALLET } from '../global/globalsString'
import web3 from '../utils/web3';
import withCommon, { colors } from '../styles/common.js'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { message } from 'antd'
import { getChainId, getChainIdByChainName, getChainName, switchChain } from '../utils/getWalletAccountandChainID'
import logoETH from '../imgs/chainLogo/ETH.png'
import logoBSC from '../imgs/chainLogo/BSC.png'
import logoMatic from '../imgs/chainLogo/matic.png'
import { IconButton } from '@material-ui/core'
import { freshContract, nowContractChainId } from '../utils/contract'
import { swtichContract } from '../utils/contract'
import btnbg from '../imgs/btnbg.png'

//import WalletBtn from './WalletBtn'

//TP钱包支持
const tp = require('tp-js-sdk')
//麦子钱包支持
const mathwallet = require('math-js-sdk');

//const [anchorEl, setAnchorEl] = React.useState(null)

// const theme = createTheme({
// 	breakpoints: {
// 		values: {
// 			xs: 0,
// 			sm: 600,
// 			md: 900,
// 			lg: 1200,
// 			xl: 1536,
// 		},
// 	},
// 	palette: {
// 		primary: {
// 			main: '#2196f3',
// 		},
// 		secondary: {
// 			main: '#FDFEFE',
// 		},
// 	},
// })

//todo theme传参无用
const styles = (theme) => ({
	btngroup: {
		height:'100%',
		display: 'flex',
		[theme.breakpoints.down('sm')]: {
			display: 'none'
		},
		['@media (min-width:600px) and (max-width:1279.95px) and (min-height:768px) and (max-height:1024px)']: {
			display: 'none'
		}

	},
	noPadding: {
		paddingLeft: 0,
		paddingRight: 0

	},
	Toolbar: {
		backgroundColor: colors.color1,
		maxWidth: '100vw',
		overflow: 'hidden',
		minHeight: '0px',
	},
	icon: {
		[theme.breakpoints.down('xl')]: {
			fontSize: 19,
		},
		[theme.breakpoints.up('xl')]: {
			fontSize: 27,
		},
	},
	titleGrid: {
		display: 'flex',
		alignItems: 'center',
		width: '100vw',
	},
	titleToken: {
		fontSize: 22,
		fontFamily: 'montserrat,source-han-sans-simplified-c, sans-serif',
		[theme.breakpoints.between('xs', 'sm')]: {
			fontSize: 15,
		},
		[theme.breakpoints.between('sm', 'md')]: {
			fontSize: 15,
		},
		[theme.breakpoints.between('md', 'lg')]: {
			fontSize: 22,
		},
		[theme.breakpoints.between('lg', 'xl')]: {
			fontSize: 25,
		},
		[theme.breakpoints.up('xl')]: {
			fontSize: 25,
		},
	},
	title: {
		minWidth: 100,
		fontSize: 25,
		fontFamily: 'montserrat,source-han-sans-simplified-c, sans-serif',
		inherit: 'Display7,MarginL7,MarginT7,MarginB10,MarginR7'
	},

	btnGrid: {
		// marginTop: 25,
		display: 'flex',
		alignItems: 'center',
		flexWrap: 'nowrap'
		// backgroundColor: '#e3f2fd',
	},
	dialog: {
		textAlign: 'center',
	},
	btnImg: {
		[theme.breakpoints.between('xs', 'sm')]: {
			fontSize: 20,
			width: 100,
		},
		[theme.breakpoints.between('sm', 'md')]: {
			width: 120,
		},
		[theme.breakpoints.between('md', 'lg')]: {
			width: 120,
		},
		[theme.breakpoints.up('xl')]: {
			width: 180,
		},
		['@media (min-width:3200px)']: {
			width: 280,
		},
	},
	btnTopbar: {
		fontWeight: 900,
		fontFamily: 'montserrat,source-han-sans-simplified-c, sans-serif',
		color: '#FFFFFF',
		borderColor: '#FFFFFF',
		borderWidth: 2,
		borderRadius: '100vw',
		inherit: 'MarginL8',
		display:'flex',
		alignItems:'center',
		paddingBottom: 0,
		'&:hover': {
			color: 'rgb(255,112,67)',
			backgroundColor: 'transparent'
		},
		'&:active': {
			color: '#fafafa'
		},
		'&:focus': {
			color: '#fafafa'
		},
		[theme.breakpoints.between('xs', 'sm')]: {
			fontSize: 12,
		},
		[theme.breakpoints.between('sm', 'md')]: {
			fontSize: 14,
		},
		[theme.breakpoints.between('md', 'xl')]: {
			fontSize: 18,
		},
		[theme.breakpoints.up('xl')]: {
			fontSize: 20,
		},
		['@media (min-width:3200px)']: {
			fontSize: 40,
		},
	},
	btnTopbarSelect:{
		color:'#D9D5CC',
		background: 'url('+btnbg+') center center no-repeat',
	},
	btnColor3: {
		paddingTop: 0,
		paddingBottom: 0
	},
	logo: {
		marginRight: 24,
		objectFit: 'contain',
		content: 'url(' + fullLogo + ')',
		height: 'auto',
		[theme.breakpoints.between('sm', 'md')]: {
			height: '18px',
		},
		[theme.breakpoints.between('md', 'lg')]: {
			height: '18px',
		},
		[theme.breakpoints.between('lg', 'xl')]: {
			height: '18px',
		},
		[theme.breakpoints.up('xl')]: {
			height: '22px',
		},
		['@media (min-width:3200px)']: {
			height: '80px',
		},
		[theme.breakpoints.down('sm')]: {
			width: '30px',
			transform: 'scale(2.0,2.0)',
			content: 'url(' + sLogo + ')'
		},
	},
	btnWallet: {
		inherit: 'MarginL9,MarginR9',
		[theme.breakpoints.between('xs', 'sm')]: {
			width: 100,
		},
		[theme.breakpoints.between('sm', 'md')]: {
			width: 120,
		},
		[theme.breakpoints.between('md', 'lg')]: {
			width: 120,
		},
		[theme.breakpoints.up('xl')]: {
			width: 180,
		},
		['@media (min-width:3200px)']: {
			width: 280,
		},
	},
	btnBox: {
		inherit: 'PaddingL7,PaddingT7,PaddingB7,PaddingR7'
	},
	chainLogo:{
		borderRadius:'50%',
		[theme.breakpoints.between('xs', 'sm')]: {
			width: 26,
		},
		[theme.breakpoints.between('sm', 'md')]: {
			width: 26,
		},
		[theme.breakpoints.between('md', 'xl')]: {
			width: 28,
		},
		[theme.breakpoints.up('xl')]: {
			width: 36,
		},
		['@media (min-width:3200px)']: {
			width: 72,
		},
	},
	btnTopBarMenu:{
		fontFamily: 'montserrat,source-han-sans-simplified-c, sans-serif',
		backgroundColor: colors.color0,
		color:'white',
		paddingTop: 9,
		paddingBottom: 9,
		fontWeight:700,
		lineHeight:1,
		borderRadius:'0px',
		boxShadow: '0px 4px 4px rgba(159, 34, 37, 0.15)',
		border: '2px solid #9F2225',
		'&:hover':{
			color: colors.color0,
		},
		[theme.breakpoints.between('xs', 'sm')]: {
			fontSize: 16,
			paddingRight: 14,
			paddingLeft: 14,
		},
		[theme.breakpoints.between('sm', 'md')]: {
			fontSize: 16,
			paddingRight: 14,
			paddingLeft: 14,
		},
		[theme.breakpoints.between('md', 'lg')]: {
			fontSize: 18,
			paddingRight: 14,
			paddingLeft: 14,
		},
		[theme.breakpoints.between('lg', 'xl')]: {
			fontSize: 18,
			paddingRight: 16,
			paddingLeft: 16,
		},
		[theme.breakpoints.up('xl')]: {
			fontSize: 20,
			paddingRight: 20,
			paddingLeft: 20,
		},
		['@media (min-width:3200px)']: {
			fontSize: 56,
			paddingRight: 64,
			paddingLeft: 64,
			paddingTop: 20,
			paddingBottom: 20,

		},
	},
})

class TopBar extends Component {
	state = {
		isConnected: '',
		userAddress: '',
		accountInfo: '',
		dialogOpen: false,
		wallet: '',
		isFixed: false,
		isPCFixed: false,
		topbarHeight: 0,
		anchorEl: null,
		walletMenuDisplay: false,
		walletAnchorEl: null,
		networkMenuDisplay: false,
		networkMenuAnchorEl: null,
		chainName: '',
		chainId: '',
		nowHash:'home'
	}
	onScroll() {
		if (this.state.topbarHeight == 0) {
			this.setState({
				topbarHeight: document.getElementById('topbar').offsetHeight
			})
			console.log(this.state.topbarHeight)
		}
		const fixedTop = document.getElementById('topbar').offsetTop + 1;
		window.ontouchmove = () => {
			let scrollTop = Math.max(
				document.body.scrollTop,
				document.documentElement.scrollTop,
				window.pageYOffset
			);
			if ((scrollTop > fixedTop) && (!this.state.isFixed)) {
				this.setState({ isFixed: true });
			} else if ((scrollTop <= fixedTop) && (this.state.isFixed)) {
				this.setState({ isFixed: false });
			}
		};
		window.addEventListener('scroll', () => {
			let scrollTop = Math.max(
				document.body.scrollTop,
				document.documentElement.scrollTop,
				window.pageYOffset
			);
			if ((scrollTop > fixedTop) && (!this.state.isFixed)) {
				this.setState({
					isFixed: true,
					isPCFixed: true
				});
			} else if ((scrollTop <= fixedTop) && (this.state.isFixed)) {
				this.setState({
					isFixed: false,
					isPCFixed: false
				});
			}
		});
	}
	constructor(props) {
		super(props)
		this.onScroll = this.onScroll.bind(this)
	}
	scrollEvent() {
		window.addEventListener('scroll', this.onScroll);
	}
	componentWillUnmount() {
		window.removeEventListener('scroll', this.onScroll);
		clearTimeout(this.onScroll);
		clearTimeout(this.scrollEvent);
	}

	// eslint-disable-next-line react/no-deprecated
	async componentDidMount() {
		let onWindowHrefChange = ()=>{
			let hash = window.location.hash.toLowerCase()
			let newHash = '';
			if(hash == '#/'){
				newHash = 'home'
			}
			if(hash == '#/publishex'){
				newHash = 'publish'
			}
			if(hash=='#/collections'){
				newHash = 'collection'
			}
			if(hash.indexOf('nft')>=0 || hash.indexOf('sell')>=0){
				newHash = 'collection'
			}
			if(newHash != ''){
				this.setState({
					nowHash: newHash
				})
			}
	
			
		}
		onWindowHrefChange();
		this.scrollEvent()
		if (this.props.onRef) {
			this.props.onRef(this)
		}
		await freshContract();
		//todo 从本地获取登陆状态（登陆记录）
		const lastConnect = localStorage.getItem(LASTCONNECT)
		if (lastConnect) {
			const chainId = await getChainId();
			const chainName = await getChainName();
			//console.log(chainName);
			if (chainId === '0x89' || chainId === '0x38' || chainId === '0x1') {
				localStorage.setItem('chainId', chainId);
				this.setState({
					chainName: chainName,
					chainId: chainId,
				})
				await freshContract();

			}
			else {
				alert('请切换网络');
				switchChain('0x1');
				this.setState({
					chainId : '0x1' 
				})
				await freshContract();
				//刷新logo
				this.handleUpdateChainToParent();
				//刷新发布页面token
			}
		}
		console.log('lastconnect:  ' + lastConnect)
		if(localStorage.getItem('hasSetHttpProvider')=='true'){
			web3.setProvider(window.ethereum);
			localStorage.setItem('hasSetHttpProvider','false')
		}
		switch (lastConnect) {
		case METAMASK:
			this.checkMetaMask();
			break;
		case TOKENPOCKET:
			this.checkTokenPocket();
			break;
		case MATHWALLET:
			this.checkMathWallet();
			break;
		case null:
			this.setState({
				isConnected: false,
			});
			break;
		default:
			break;
		}
		
	}
	handleUpdateChainToParent(){
		if(this.props.parent&&this.props.parent.onUpdateChain){
			this.props.parent.onUpdateChain();
		}
	}
	// //在Web端仅检测小狐狸登陆状态
	// if (!isMobile) {
	//   this.checkMetaMask()
	// }
	// //在手机端先检测TP
	// else {
	//   tp.getCurrentWallet().then(value => {
	//     const account = await value.data.address;
	//     if (account.length == 0) {
	//       this.setState({
	//         isConnected: true
	//       });
	//     } else {
	//       console.log(accounts)

	//       this.setState({ accountInfo: account.substring(0, 5), });
	//       this.setState({
	//         isConnected: true
	//       });
	//       localStorage.setItem(USERADDRESS, account);
	//     }

	//     // })

	//   })
	// }

	// if (Web3.givenProvider) {
	//   //console.log(Web3.givenProvider)
	//   //let web3 = new Web3(window.ethereum);
	//   let web3 = new Web3(window.web3.currentProvider);
	//   const accounts = await web3.eth.getAccounts();
	//   if (accounts.length == 0) {
	//     this.setState({
	//       isConnected: false
	//     });
	//   } else {
	//     console.log(accounts)
	//     var account = accounts[0]
	//     this.setState({ accountInfo: account.substring(0, 5), });
	//     this.setState({
	//       isConnected: true
	//     });
	//     localStorage.setItem("userAddress", account);
	//   }
	//   console.log(Web3.givenProvider);
	//   console.log(this.state.isConnected)
	// }
	handleSwitchNetworkClick = (event) => {
		if (event.currentTarget.id === 'switchNetworkBtn') {
			this.setState({
				networkMenuDisplay: true,
				networkMenuAnchorEl: event.currentTarget,
			})
		}
	}

	handleNetworkMenuClose = () => {
		this.setState({
			networkMenuDisplay: false,
		})
	}

	//handleWalletMenu(for disconnect)
	handleWalletMenuClick = (event) => {
		//setAnchorEl(event.currentTarget)
		//console.log('current: ')
		//console.log(event.currentTarget)
		// this.setState({
		// 	walletAnchorEl: event.currentTarget,
		// })
		if (event.currentTarget.id === 'connectedBtn' && this.state.isConnected) {
			this.setState({
				walletMenuDisplay: true,
				walletAnchorEl: event.currentTarget,
			})
		}
	}

	handleWalletMenuClose = () => {
		//setAnchorEl(null)
		this.setState({
			walletMenuDisplay: false,
		})
	}


	//check小狐狸账户
	checkMetaMask = async () => {
		if (Web3.givenProvider) {
			//console.log(Web3.givenProvider)
			//let web3 = new Web3(window.ethereum);
			//let web3 = new Web3(window.web3.currentProvider)
			const accounts = await web3.eth.getAccounts();
			console.log('accounts: ' + accounts)
			if (accounts.length == 0) {
				this.setState({
					isConnected: false,
				})
			} else {
				const account = accounts[0]
				console.log('account: ' + account)
				this.setState({ accountInfo: account.substring(0, 5) })
				this.setState({
					isConnected: true,
				})
				this.setState({ userAddress: account })
				//localStorage.setItem(USERADDRESS, account);
				localStorage.setItem(LASTCONNECT, METAMASK);
			}
			console.log(Web3.givenProvider)
			console.log(this.state.isConnected)
		}
	}

	//check TP账户
	checkTokenPocket = async () => {
		await tp.getCurrentWallet().then((value) => {
			const account = value.data.address
			if (account.length == 0) {
				this.setState({
					isConnected: false,
				})
			} else {
				//console.log(accounts)
				this.setState({ accountInfo: account.substring(0, 5) })
				this.setState({
					isConnected: true,
				})
				//localStorage.setItem(USERADDRESS, account);
				this.setState({ userAddress: account })
				localStorage.setItem(LASTCONNECT, TOKENPOCKET)
			}

			// })
		})
	}

	//check 麦子钱包
	checkMathWallet = async () => {
		await mathwallet.getCurrentWallet().then(
			value => {
				const account = value.address;
				if (account.length == 0) {
					this.setState({
						isConnected: false
					});
				}
				else {
					//console.log(accounts)
					this.setState({ accountInfo: account.substring(0, 5), });
					this.setState({
						isConnected: true
					});
					//localStorage.setItem(USERADDRESS, account);
					this.setState({ userAddress: account });
					localStorage.setItem(LASTCONNECT, MATHWALLET);
				}
			})
	}

	//点击使用tokenpocket
	handleSelectTokenPockect = () => {
		this.getTokenPocketAccount()
		this.setState({
			dialogOpen: false,
			walletMenuDisplay: false,
		})
	}

	//点击使用MetaMask
	handleSelectMetaMask = () => {
		this.getMetaMaskAccount()
		this.setState({
			dialogOpen: false,
			walletMenuDisplay: false,
		})
	}

	//点击使用MathWallet
	handleSelectMathWallet = () => {
		this.getMathWalletAccount();
		this.setState({
			dialogOpen: false,
			walletMenuDisplay: false,
		})
	}

	handleDialogOpen = () => {
		this.setState({
			dialogOpen: true,
		})
	}

	handleDialogClose = () => {
		this.setState({
			dialogOpen: false,
		})
	}

	sleep = async (ms) => {
		return new Promise((resolve) => setTimeout(resolve, ms))
	}

	//获取MetaMask用户地址
	getMetaMaskAccount = async () => {
		const { t } = this.props
		try {
			//const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
			const accounts = await window.web3.currentProvider.request({
				method: 'eth_requestAccounts',
			})
			const account = accounts[0]
			message.success(t('您已经连接metamask, 当前账户： ') + account)
			this.setState({ isConnected: true })
			this.setState({ userAddress: account })
			//localStorage.setItem(USERADDRESS, account);
			localStorage.setItem(LASTCONNECT, METAMASK)
			const chainId = await window.ethereum.request({ method: 'eth_chainId' })
			this.setState({chainId: chainId});
			localStorage.setItem('chainId', chainId);
			await freshContract();
			this.handleUpdateChainToParent();

		} catch (error) {
			console.debug(error)
			this.setState({ isConnected: false })
		}
	}

	//获取TokenPocket用户地址
	getTokenPocketAccount = async () => {
		const { t } = this.props
		if (this.state.isConnected) {
			message.success(t('您已经连接tokenpocket, 当前账户： ') + this.state.userAddress)
		} else {
			try {
				//todo 使用TP链接
				let account, chainName;
				await tp.getWallet({ walletTypes: ['matic', 'bsc', 'eth'], switch: false }).then((value) => {
					account = value.data.address;
					chainName = value.data.blockchain;
				})
				message.success(t('您已经连接tokenpocket, 当前账户： ') + account)
				this.setState({ isConnected: true })
				this.setState({ userAddress: account })
				//localStorage.setItem(USERADDRESS, account); //储存用户address
				localStorage.setItem(LASTCONNECT, TOKENPOCKET) //储存上次登陆的信息
				const chainId = getChainIdByChainName(chainName);
				//alert(chainId)
				this.setState({chainId: chainId});
				localStorage.setItem('chainId', chainId);
				//alert(localStorage.getItem('chainId'))
				await freshContract();
				this.handleUpdateChainToParent();
			} catch (error) {
				console.debug(error)
				this.setState({ isConnected: false })
			}
		}
	}

	//获取MathWallet用户地址
	getMathWalletAccount = async () => {
		const { t } = this.props
		if (this.state.isConnected) {
			message.success(t('您已经连接MathWallet, 当前账户： ') + this.state.userAddress)
		}
		else {
			try {
				//todo 使用TP链接
				let account;
				await mathwallet.getCurrentWallet().then(
					value => {
						account = value.address;
					}
				)
				message.success(t('您已经连接MathWallet, 当前账户： ') + account)
				this.setState({ isConnected: true, });
				this.setState({ userAddress: account });
				//localStorage.setItem(USERADDRESS, account); //储存用户address
				localStorage.setItem(LASTCONNECT, MATHWALLET); //储存上次登陆的信息
				await freshContract();
				this.handleUpdateChainToParent();
			} catch (error) {
				console.debug(error);
				this.setState({ isConnected: false });
			}
		}
	}

	handleSwitchNetwork = async (e) => {
		//console.log(e.target.id)
		console.log(e)
		let switchResponse;
		switch(e){
		case 'maticBtn':
			switchResponse = await switchChain('0x89');
			if(switchResponse) this.setState({chainName: 'matic',chainId: '0x89'})
			this.handleNetworkMenuClose();
			break;
		case 'bscBtn':
			switchResponse = await switchChain('0x38');
			if(switchResponse) this.setState({chainName: 'BSC',chainId: '0x38'})
			this.handleNetworkMenuClose();
			break;
		case 'ethBtn':
			switchResponse = await switchChain('0x1');
			if(switchResponse) this.setState({chainName: 'ETH',chainId: '0x1'})
			this.handleNetworkMenuClose();
			break;
		}
		if(this.state.chainId != nowContractChainId){
			swtichContract(this.state.chainId)
		}
		this.handleUpdateChainToParent();
	}

	//登陆后点击token按钮
	// handleTokenButtonOnClick = () => {
	// 	switch (localStorage.getItem(LASTCONNECT)) {
	// 	case METAMASK:
	// 		this.getMetaMaskAccount();
	// 		break;
	// 	case TOKENPOCKET:
	// 		this.getTokenPocketAccount()
	// 		break;
	// 	case MATHWALLET:
	// 		this.getMathWalletAccount();
	// 		break;
	// 	default:
	// 		break;
	// 	}
	// }

	//logout
	//todo 未做登出
	disconnect = () => {
		this.setState({ 
			isConnected: false,
			chainName: '',
		})
		//localStorage.removeItem(USERADDRESS);
		localStorage.removeItem(LASTCONNECT)
		localStorage.removeItem('chainId');
	}

	render() {
		const { classes } = this.props
		const { t } = this.props
		const { isFixed } = this.state
		const fixStyle = isFixed ? { position: 'fixed', top: 0, zIndex: 9, boxShadow: 'rgb(75, 75, 75) 0px 1px 4px' } : {}
		const fixStyleBlank = isFixed ? { display: 'block', width: '100vw', height: this.state.topbarHeight, maxWidth: '100vw' } : { display: 'none', maxWidth: '100vw' }
		const menuStyle = (window.innerWidth <= 1000) ? { display: 'block' } : { display: 'none' }
		const chainId = this.state.chainId;
		const logoImg = (chainId == '0x38')?(logoBSC):(((chainId == '0x89')?(logoMatic):(logoETH)))
		let open = false;
		if (this.state.anchorEl) {
			open = Boolean(this.state.anchorEl)
		}
		const handleMenuClick = (event) => {
			this.setState({
				anchorEl: event.currentTarget
			})
		};
		const handleMenuClose = () => {
			this.setState({
				anchorEl: null
			})
		};
		return (
			<div>
				<Dialog id="walletDialog" className={classes.dialog} onClose={this.handleDialogClose} open={this.state.dialogOpen}>
					<DialogTitle className={console.title}>
						<Typography noWrap className={classes.title}>
							Connect Wallet
						</Typography>
					</DialogTitle>
					<DialogContent>
						<Grid container spacing={1} className={classes.btnBox} style={{ justifyContent: 'center' }}>
							<Button size="large" className={classes.btnWallet} id="MetaMask" onClick={this.handleSelectMetaMask}>
								<img className={classes.btnImg} src={metamaskpic}></img>
							</Button>
							<Button
								size="large"
								className={classes.btnWallet}
								onClick={!isMobile ? this.handleSelectMetaMask : this.handleSelectTokenPockect}
							>
								<img className={classes.btnImg} src={TPpic}></img>
							</Button>
							<Button size="large"
								className={classes.btnWallet}
								onClick={!isMobile ? this.handleSelectMetaMask : this.handleSelectMathWallet}
							>
								<img className={classes.btnImg} src={mathwalletpic}></img>
							</Button>
						</Grid>
					</DialogContent>
				</Dialog>
				<Menu
					id="basic-menu"
					anchorEl={this.state.anchorEl}
					open={open}
					onClose={handleMenuClose}
					MenuListProps={{
						'aria-labelledby': 'basic-button',
					}}
				>
					<MenuItem onClick={handleMenuClose}>
						<Button size="medium" style={{ width: '100%' }} className={classes.btnItem} href="/#/">
							{t('index')}
						</Button>
					</MenuItem>
					<MenuItem onClick={handleMenuClose}>
						<Button size="medium" style={{ width: '100%' }} className={classes.btnItem} href="/#/PublishEx">
							{t('publish')}
						</Button>
					</MenuItem>
					<MenuItem onClick={handleMenuClose}>
						<Button size="medium" style={{ width: '100%' }} className={classes.btnItem} href="/#/collections">
							{t('collection')}
						</Button>
					</MenuItem>
					<MenuItem onClick={handleMenuClose}>
						<Button size="medium" style={{ width: '100%' }} className={classes.btnItem} href="https://docs.sparklink.io/">
							Wiki
						</Button>
					</MenuItem>
					<MenuItem onClick={handleMenuClose}>
						<Button size="medium" style={{ width: '100%' }} className={classes.btnItem} href="/#/buy">
							{t('market')}
						</Button>
					</MenuItem>
				</Menu>
				<Toolbar id='topbar' className={classes.noPadding} style={{ minHeight: '0px' }}>
					<div style={fixStyleBlank}></div>
					<Grid style={fixStyle} className={classes.Toolbar + ' ' + classes.PaddingT11 + ' ' + classes.PaddingB11} container direction="row" wrap="nowrap">
						<Grid item className={classes.titleGrid}>
							<a href="/#/" className={classes.logo + ' ' + classes.PaddingL10} />
							<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' ,flex:'1',alignItems:'center'}}>
								<div className={classes.btngroup}>
									<a size="medium" className={classes.btnTopbar+' '+((this.state.nowHash=='home')&&classes.btnTopbarSelect)} href="/#/">
										{t('index')}
									</a>
									<a size="medium" className={classes.btnTopbar+' '+((this.state.nowHash=='publish')&&classes.btnTopbarSelect)} href="/#/PublishEx">
										{t('publish')}
									</a>
									<a size="medium" className={classes.btnTopbar+' '+((this.state.nowHash=='collection')&&classes.btnTopbarSelect)} href="/#/collections">
										{t('collection')}
									</a>
									<a size="medium" className={classes.btnTopbar} href="https://docs.sparklink.io/">
										Wiki
									</a>
									<a size="medium" className={classes.btnTopbar} href="/#/buy">
										{t('market')}
									</a>
								</div>
							</div>
							<Button style={menuStyle} className={classes.btnColor3} aria-controls="basic-menu" aria-haspopup="true" aria-expanded={open ? 'true' : undefined} onClick={handleMenuClick}>
								<b> ...</b>
							</Button>
							<Grid item className={classes.btnGrid}>
								<LanguageBtn />
								<React.Fragment>
									{this.state.isConnected ? (
										<IconButton
											style={{padding:'0'}}
											id='switchNetworkBtn'
											className={classes.MarginR10}
											onClick={this.handleSwitchNetworkClick}
										>
											<img className={classes.chainLogo} src={logoImg}/>
										</IconButton>
									):(
										null
									)
									}
									<Menu id="menu" keepMounted open={this.state.networkMenuDisplay} anchorEl={this.state.networkMenuAnchorEl} onClose={this.handleNetworkMenuClose}>
										<MenuItem key='matic' >
											<Button id="maticBtn" style={{ width: '100%' }} onClick={this.handleSwitchNetwork.bind(this,'maticBtn')} className={classes.btnItem}>matic</Button>
										</MenuItem>
										<MenuItem key='BSC' >
											<Button id="bscBtn" style={{ width: '100%' }} onClick={this.handleSwitchNetwork.bind(this,'bscBtn')} className={classes.btnItem}>BSC</Button>
										</MenuItem>
										<MenuItem key='ETH' >
											<Button id="ethBtn" style={{ width: '100%' }} onClick={this.handleSwitchNetwork.bind(this,'ethBtn')} className={classes.btnItem}>ETH</Button>
										</MenuItem>
									</Menu>
								</React.Fragment>
								
								{this.state.isConnected ? (
									// <Button onClick={this.getAccount}>
									//   <WalletTwoTone className={classes.icon} />
									// </Button>
									<React.Fragment>
										<Button
											id='connectedBtn'
											className={classes.btnTopBarMenu + ' ' + classes.MarginR8}
											onClick={this.handleWalletMenuClick}
										>
											{this.state.userAddress.substring(0, 6)}...
											{this.state.userAddress.substring(this.state.userAddress.length - 5, this.state.userAddress.length)}
										</Button>
										<Menu id="menu" keepMounted open={this.state.walletMenuDisplay} anchorEl={this.state.walletAnchorEl} onClose={this.handleWalletMenuClose}>
											<MenuItem key='Disconnect' onClick={this.disconnect}>
												<Button style={{ width: '100%' }} className={classes.btnItem}>Disconnect</Button>
											</MenuItem>
										</Menu>
									</React.Fragment>

								) : (
									// <Button onClick={this.getAccount}>
									//   <WalletFilled className={classes.icon} />
									// </Button>
									<Button id='unConnectedBtn' className={classes.btnTopBarMenu + ' ' + classes.MarginR8} onClick={this.handleDialogOpen}>
										Connect Wallet
									</Button>
								)}
								
								{/* <Button onClick={this.disconnect}> akdalk</Button> */}
							</Grid>
						</Grid>


					</Grid>
				</Toolbar>
			</div>
		)
	}
}


export default withTranslation()(withStyles(withCommon(styles), { withTheme: true })(TopBar))
/*
todo
目前TP兼容仅作TopBar上的登陆，未处理其他交互的TP支持；
界面未做logout操作，disconnect函数已写完；
connect Wallet界面UI待更改；
*/
