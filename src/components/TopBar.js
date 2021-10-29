import React, { Component } from 'react'
import fullLogo from '../imgs/sparkLink.jpg'
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
import { GithubOutlined } from '@ant-design/icons'
import Web3 from 'web3'
import isMobile from '../utils/isMobile'
import LanguageBtn from './LanguageBtn'
import { withTranslation } from 'react-i18next'
import { TOKENPOCKET, METAMASK, LASTCONNECT,  MATHWALLET } from '../global/globalsString'
import web3 from '../utils/web3';


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
		marginBottom: 10
	},
	titleToken: {
		fontSize: 22,
		fontFamily: 'Teko',
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
		fontFamily: 'Teko',
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
		justifyContent: 'flex-end',
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
		fontFamily: 'Teko',
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
		color: '#424949',
		borderColor: '#e3f2fd',
		fontSize: 22,
		[theme.breakpoints.between('xs', 'sm')]: {
			fontSize: 12,
		},
		[theme.breakpoints.between('sm', 'md')]: {
			fontSize: 12,
		}
	},
	logo: {
		objectFit: 'contain',
		content: 'url('+fullLogo+')',
		width: '120px',
		height: '40px',
		[theme.breakpoints.down('sm')]: {
			width: '30px',
			content: 'url('+sLogo+')'
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
	}

	// eslint-disable-next-line react/no-deprecated
	async componentDidMount() {
		//todo 从本地获取登陆状态（登陆记录）
		let lastConnect = localStorage.getItem(LASTCONNECT)
		console.log('lastconnect:  '+ lastConnect)
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
		try {
			//const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
			const accounts = await window.web3.currentProvider.request({
				method: 'eth_requestAccounts',
			})
			const account = accounts[0]
			alert('您已经连接metamask, 当前账户： ' + account)
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
		if (this.state.isConnected) {
			alert('您已经连接tokenpocket, 当前账户： ' + this.state.userAddress)
		} else {
			try {
				//todo 使用TP链接
				let account
				await tp.getWallet({ walletTypes: ['matic'], switch: false }).then((value) => {
					account = value.data.address
				})
				alert('您已经连接tokenpocket, 当前账户： ' + account)
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
		if (this.state.isConnected) {
			alert('您已经连接MathWallet, 当前账户： ' + this.state.userAddress)
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
				alert('您已经连接MathWallet, 当前账户： ' + account)
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

				<Toolbar>
					<Grid container direction="row" justifyContent="space-between" wrap="nowrap">
						<Grid item className={classes.titleGrid}>
							<a href="/#/" className={classes.logo} />
						</Grid>
						<Grid item className={classes.btnGrid}>
							<Button size="medium" className={classes.btn} href="/#/">
								<b>{t('index')}</b>
							</Button>
							<Button size="medium" className={classes.btn} href="/#/introPublish">
								<b>{t('publish')}</b>
							</Button>
							<Button size="medium" className={classes.btn} href="/#/collections">
								<b>{t('collection')}</b>
							</Button>
							<Button size="small" href="https://github.com/SparkNFT" target="_blank">
								<GithubOutlined className={classes.icon} />
							</Button>
							<LanguageBtn />
							{this.state.isConnected ? (
								// <Button onClick={this.getAccount}>
								//   <WalletTwoTone className={classes.icon} />
								// </Button>
								<Button
									size="small"
									variant="contained"
									className={classes.btnUser}
									onClick={this.handleTokenButtonOnClick}
								>
									<Typography component="" color="inherit" noWrap className={classes.titleToken}>
										{this.state.userAddress.substring(0, 6)}...
										{this.state.userAddress.substring(this.state.userAddress.length - 5, this.state.userAddress.length)}
									</Typography>
								</Button>
							) : (
								// <Button onClick={this.getAccount}>
								//   <WalletFilled className={classes.icon} />
								// </Button>
								<Button variant="contained" className={classes.btnUser} onClick={this.handleDialogOpen}>
									<Typography component="" color="inherit" noWrap className={classes.titleToken}>
										<b> Connect Wallet</b>
									</Typography>
								</Button>
							)}
							{/* <Button onClick={this.disconnect}> akdalk</Button> */}
						</Grid>
					</Grid>
				</Toolbar>
			</div>
		)
	}
}


export default withTranslation()(withStyles(styles, { withTheme: true })(TopBar))
/*
todo
目前TP兼容仅作TopBar上的登陆，未处理其他交互的TP支持；
界面未做logout操作，disconnect函数已写完；
connect Wallet界面UI待更改；
*/
