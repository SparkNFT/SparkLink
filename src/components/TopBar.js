import React, { Component } from 'react'
import fullLogo from '../imgs/bigLogo.png'
import sLogo from '../imgs/sparkLink.png'
import bg from '../imgs/bg.png'
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
import withCommon from '../styles/common.js'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
//TP钱包支持
const tp = require('tp-js-sdk')
//麦子钱包支持
const mathwallet = require('math-js-sdk');

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
	btngroup:{
		display: 'flex',
		[theme.breakpoints.down('sm')]: {
			display: 'none'
		},
		['@media (min-width:600px) and (max-width:1279.95px) and (min-height:768px) and (max-height:1024px)']:{
			display: 'none'
		}

	},
	noPadding:{
		paddingLeft: 0,
		paddingRight: 0

	},
	Toolbar: {
		backgroundImage: 'url(' + bg + ')',
		backgroundSize: 'cover',
		[theme.breakpoints.down('sm')]: {
			backgroundRepeat: 'repeat-y',
			backgroundSize: 'auto',
		}
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
		marginTop: 25,
		marginBottom: 10,
		display: 'flex',
		alignItems: 'center'
	},
	titleToken: {
		fontSize: 22,
		fontFamily: 'ANC',
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
		fontFamily: 'ANC',
		[theme.breakpoints.between('xs', 'sm')]: {
			fontSize: 25,
		},
		[theme.breakpoints.between('sm', 'md')]: {
			fontSize: 25,
		},
		[theme.breakpoints.between('md', 'lg')]: {
			fontSize: 35,
		},
		[theme.breakpoints.between('lg', 'xl')]: {
			fontSize: 35,
		},
		[theme.breakpoints.up('xl')]: {
			fontSize: 45,
		},
	},
	btnGrid: {
		// marginTop: 25,
		marginBottom: 10,
		minWidth: 430,
		marginTop: 30,
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
			width: 150,
		},
		[theme.breakpoints.between('md', 'lg')]: {
			width: 150,
		},
		[theme.breakpoints.up('xl')]: {
			width: 150,
		},
	},
	btnWallet: {
		color: '#424949',
		borderColor: '#e3f2fd',
		textAlign: 'center',
		fontSize: 15,
		[theme.breakpoints.between('xs', 'sm')]: {
			fontSize: 20,
			width: 100,
			height: 100,
		},
		[theme.breakpoints.between('sm', 'md')]: {
			fontSize: 22,
			width: 155,
			height: 155,
		},
		[theme.breakpoints.between('md', 'lg')]: {
			fontSize: 22,
			width: 155,
			height: 155,
		},
		[theme.breakpoints.up('xl')]: {
			fontSize: 28,
			width: 155,
			height: 155,
		},
	},
	btnUser: {
		color: '#424949',
		borderColor: '#e3f2fd',
		fontSize: 15,
		fontFamily: 'ANC',
		[theme.breakpoints.between('xs', 'sm')]: {
			fontSize: 15,
			width: 80,
			height: 40,
		},
		[theme.breakpoints.between('sm', 'md')]: {
			fontSize: 15,
			width: 100,
		},
		[theme.breakpoints.between('md', 'lg')]: {
			fontSize: 15,
			width: 200,
		},
		[theme.breakpoints.up('xl')]: {
			fontSize: 22,
		},
	},
	btn: {
		fontFamily: 'ANC',
		color: '#fafafa',
		borderColor: '#e3f2fd',
		fontWeight: 'normal',
		fontSize: 16,
		marginTop: 7,
		[theme.breakpoints.between('xs', 'sm')]: {
			fontSize: 12,
		},
		[theme.breakpoints.between('sm', 'md')]: {
			fontSize: 12,
		}
	},
	logo: {
		marginLeft: 12,
		marginRight: 24,
		objectFit: 'contain',
		content: 'url(' + fullLogo + ')',
		width: '120px',
		height: '40px',
		[theme.breakpoints.down('sm')]: {
			width: '30px',
			transform: 'scale(2.0,2.0)',
			content: 'url(' + sLogo + ')'
		}
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
		anchorEl: null
	}
	onScroll() {
		if(this.state.topbarHeight == 0){
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
			if ((scrollTop > fixedTop)&&(!this.state.isFixed)) {
				this.setState({ isFixed: true });
			} else if ((scrollTop <= fixedTop)&&(this.state.isFixed)) {
				this.setState({ isFixed: false });
			}
		};
		window.addEventListener('scroll', () => {
			let scrollTop = Math.max(
				document.body.scrollTop,
				document.documentElement.scrollTop,
				window.pageYOffset
			);
			if ((scrollTop > fixedTop)&&(!this.state.isFixed)) {
				this.setState({
					isFixed: true,
					isPCFixed: true
				});
			} else if ((scrollTop <= fixedTop)&&(this.state.isFixed)) {
				this.setState({
					isFixed: false,
					isPCFixed: false
				});
			}
		});
	}
	constructor() {
		super()
		this.onScroll = this.onScroll.bind(this)
	}
	scrollEvent() {
		window.addEventListener('scroll', this.onScroll);
	}
	componentWillUnmount(){
		window.removeEventListener('scroll', this.onScroll);
		clearTimeout(this.onScroll);
		clearTimeout(this.scrollEvent);
	}
	// eslint-disable-next-line react/no-deprecated
	async componentDidMount() {
		this.scrollEvent()
		if (this.props.onRef) {
			this.props.onRef(this)
		}

		

		//todo 从本地获取登陆状态（登陆记录）
		let lastConnect = localStorage.getItem(LASTCONNECT)
		console.log('lastconnect:  ' + lastConnect)
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


	//check小狐狸账户
	checkMetaMask = async () => {
		if (Web3.givenProvider) {
			//console.log(Web3.givenProvider)
			//let web3 = new Web3(window.ethereum);
			//let web3 = new Web3(window.web3.currentProvider)
			const accounts = await web3.eth.getAccounts()
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
				localStorage.setItem(LASTCONNECT, METAMASK)
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
		})
	}

	//点击使用MetaMask
	handleSelectMetaMask = () => {
		this.getMetaMaskAccount()
		this.setState({
			dialogOpen: false,
		})
	}

	//点击使用MathWallet
	handleSelectMathWallet = () => {
		this.getMathWalletAccount();
		this.setState({
			dialogOpen: false,
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
			alert(t('您已经连接metamask, 当前账户： ') + account)
			this.setState({ isConnected: true })
			this.setState({ userAddress: account })
			//localStorage.setItem(USERADDRESS, account);
			localStorage.setItem(LASTCONNECT, METAMASK)
		} catch (error) {
			console.debug(error)
			this.setState({ isConnected: false })
		}
	}

	//获取TokenPocket用户地址
	getTokenPocketAccount = async () => {
		const { t } = this.props
		if (this.state.isConnected) {
			alert(t('您已经连接tokenpocket, 当前账户： ') + this.state.userAddress)
		} else {
			try {
				//todo 使用TP链接
				let account
				await tp.getWallet({ walletTypes: ['matic'], switch: false }).then((value) => {
					account = value.data.address
				})
				alert(t('您已经连接tokenpocket, 当前账户： ') + account)
				this.setState({ isConnected: true })
				this.setState({ userAddress: account })
				//localStorage.setItem(USERADDRESS, account); //储存用户address
				localStorage.setItem(LASTCONNECT, TOKENPOCKET) //储存上次登陆的信息
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
			alert(t('您已经连接MathWallet, 当前账户： ') + this.state.userAddress)
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
				alert(t('您已经连接MathWallet, 当前账户： ') + account)
				this.setState({ isConnected: true, });
				this.setState({ userAddress: account });
				//localStorage.setItem(USERADDRESS, account); //储存用户address
				localStorage.setItem(LASTCONNECT, MATHWALLET); //储存上次登陆的信息
			} catch (error) {
				console.debug(error);
				this.setState({ isConnected: false });
			}
		}
	}

	//登陆后点击token按钮
	handleTokenButtonOnClick = () => {
		switch (localStorage.getItem(LASTCONNECT)) {
		case METAMASK:
			this.getMetaMaskAccount();
			break;
		case TOKENPOCKET:
			this.getTokenPocketAccount()
			break;
		case MATHWALLET:
			this.getMathWalletAccount();
			break;
		default:
			break;
		}
	}

	//logout
	//todo 未做登出
	disconnect = () => {
		this.setState({ isConnected: false })
		//localStorage.removeItem(USERADDRESS);
		localStorage.removeItem(LASTCONNECT)
	}

	render() {
		const { classes } = this.props
		const { t } = this.props
		const { isFixed } = this.state
		const fixStyle = isFixed ? { position: 'fixed', top: 0, zIndex: 9 ,boxShadow: 'rgb(255, 189, 164) 0px 1px 4px'} : {}
		const fixStyleBlank = isFixed ? { display:'block',width:'100vw',height:this.state.topbarHeight,maxWidth: '100vw'} : {display:'none'}
		const menuStyle = isMobile ? {display:'block'} : {display:'none'}
		let open = false;
		if(this.state.anchorEl){
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
				<Dialog className={classes.dialog} onClose={this.handleDialogClose} open={this.state.dialogOpen}>
					<DialogTitle className={console.title}>
						<Typography component="h1" color="inherit" noWrap className={classes.title}>
							Connect Wallet
						</Typography>
					</DialogTitle>
					<DialogContent>
						<Grid container spacing={1}>
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
						<Grid>
							<Typography
								component="h1"
								color="inherit"
								style={{ textAlign: 'center' }}
								noWrap
								className={classes.title}
							>
								. . .
							</Typography>
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
						<Button size="medium" style={{width: '100%'}} className={classes.btnColor3} href="/#/">
							{t('index')}
						</Button>						
					</MenuItem>
					<MenuItem onClick={handleMenuClose}>
						<Button size="medium" style={{width: '100%'}}  className={classes.btnColor3} href="/#/introPublish">
							{t('publish')}
						</Button>
					</MenuItem>
					<MenuItem onClick={handleMenuClose}>
						<Button size="medium" style={{width: '100%'}}  className={classes.btnColor3} href="/#/collections">
							{t('collection')}
						</Button>
					</MenuItem>
					<MenuItem onClick={handleMenuClose}>
						<Button size="medium" style={{width: '100%'}}  className={classes.btnColor3} href="https://docs.sparklink.io/">
							Wiki
						</Button>
					</MenuItem>
					<MenuItem onClick={handleMenuClose}>
						<Button size="medium" style={{width: '100%'}}  className={classes.btnColor3} href="/#/buy">
							{t('market')}
						</Button>
					</MenuItem>
				</Menu>				
				<Toolbar className={classes.noPadding}>
					<div style={fixStyleBlank}></div>
					<Grid style={fixStyle} id='topbar' className={classes.Toolbar} container direction="row"  wrap="nowrap">
						<Grid item className={classes.titleGrid}>
							<a href="/#/" className={classes.logo} />
							<div className={classes.btngroup}>
								<Button size="medium" className={classes.btn} href="/#/">
									{t('index')}
								</Button>
								<Button size="medium" className={classes.btn} href="/#/introPublish">
									{t('publish')}
								</Button>
								<Button size="medium" className={classes.btn} href="/#/collections">
									{t('collection')}
								</Button>
								<Button size="medium" className={classes.btn} href="https://docs.sparklink.io/">
									Wiki
								</Button>
								<Button size="medium" className={classes.btn} href="/#/buy">
									{t('market')}
								</Button>
							</div>
						</Grid>
						<div style={{flex: '1'}}></div>
						<Grid item className={classes.btnGrid}>
							<Button style={menuStyle} className={classes.btnColor3} aria-controls="basic-menu" aria-haspopup="true" aria-expanded={open ? 'true' : undefined} onClick={handleMenuClick}>
								<Typography component="" color="inherit" noWrap className={classes.h3}>
									<b> ...</b>
								</Typography>
							</Button>



							{this.state.isConnected ? (
								// <Button onClick={this.getAccount}>
								//   <WalletTwoTone className={classes.icon} />
								// </Button>
								<Button
									size="small"
									variant="contained"
									className={classes.btnColor3}
									onClick={this.handleTokenButtonOnClick}
								>
									<Typography component="" color="inherit" noWrap className={classes.h3}>
										{this.state.userAddress.substring(0, 6)}...
										{this.state.userAddress.substring(this.state.userAddress.length - 5, this.state.userAddress.length)}
									</Typography>
								</Button>
							) : (
								// <Button onClick={this.getAccount}>
								//   <WalletFilled className={classes.icon} />
								// </Button>
								<Button variant="contained" className={classes.btnColor3} onClick={this.handleDialogOpen}>
									<Typography component="" color="inherit" noWrap className={classes.h3}>
										<b> Connect Wallet</b>
									</Typography>
								</Button>
							)}

							<LanguageBtn />
							{/* <Button onClick={this.disconnect}> akdalk</Button> */}
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
