/* eslint-disable no-mixed-spaces-and-tabs */
import React, { Component } from 'react'
import '../App.css'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { createTheme, ThemeProvider, withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import contract from '../utils/contract'
import TopBar from '../components/TopBar'
import Skeleton from '@material-ui/lab/Skeleton'
import { Empty } from 'antd'
import axios from 'axios'
import web3 from '../utils/web3'
import config from '../global/config'
import Web3 from 'web3';
import { TOKENPOCKET, METAMASK, LASTCONNECT, MATHWALLET } from '../global/globalsString'
import { withTranslation } from 'react-i18next'
import withCommon from '../styles/common'
import Footer from '../components/Footer'
import { getChainName } from '../utils/getWalletAccountandChainID'
//TP钱包支持
const tp = require('tp-js-sdk');
//麦子钱包支持
const mathwallet = require('math-js-sdk');
// eslint-disable-next-line no-unused-vars
const { backend } = config
const theme = createTheme({
	palette: {
		primary: {
			main: '#FDFEFE',
		},
		secondary: {
			main: '#2196f3',
		},
	},
})

const styles = (theme) => ({
	icon: {
		marginRight: theme.spacing(2),
	},
	titleFont: {
		fontFamily: 'ANC,source-han-sans-simplified-c, sans-serif',
	},
	heroContent: {
		backgroundColor: theme.palette.background.paper,
		padding: theme.spacing(36, 0, 6),
	},
	cardGrid: {
		paddingTop: theme.spacing(8),
		paddingBottom: theme.spacing(8),
	},
	card: {
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		[theme.breakpoints.between('xs', 'sm')]: {

		},
		[theme.breakpoints.between('sm', 'md')]: {
			height: '560px',
		},
		[theme.breakpoints.between('md', 'lg')]: {
			height: '560px',
		},
		[theme.breakpoints.between('lg', 'xl')]: {
			height: '560px',
		},
		[theme.breakpoints.up('xl')]: {
			height: '620px',
		},
		['@media (min-width:3200px)']: {
			height: '1060px',
		},
	},
	cardMedia: {
		// paddingTop: '56.25%', // 16:9
		objectFit: 'contain',
		paddingTop: '100%', // 16:9
	},
	cardContent: {
		flexGrow: 2,
	},
	paper: {
		marginTop: theme.spacing(7),
		textAlign: 'center',
	},
	container: {
		maxWidth: '100%',
	},
	btnMain: {
		marginTop: theme.spacing(3),
		color: '#FFFFFF',
		borderWidth: 2,
		borderColor: '#e3f2fd',
		fontSize: 16,
		borderRadius: 25,
		width: 150,
	},
	btnSecond: {
		marginTop: theme.spacing(3),
		color: '#03A9F4',
		borderWidth: 3,
		borderColor: '#03A9F4',
		fontSize: 16,
		borderRadius: 25,
		width: 150,
	},
	title: {
		fontFamily: 'ANC,source-han-sans-simplified-c, sans-serif',
		marginTop: '5%',
		[theme.breakpoints.between('xs', 'sm')]: {
			fontSize: 35,
		},
		[theme.breakpoints.between('sm', 'md')]: {
			fontSize: 40,
		},
		[theme.breakpoints.between('md', 'lg')]: {
			fontSize: 55,
		},
		[theme.breakpoints.between('lg', 'xl')]: {
			fontSize: 90,
		},
		[theme.breakpoints.up('xl')]: {
			fontSize: 110,
		},
	},
	title2: {
		fontFamily: 'ANC,source-han-sans-simplified-c, sans-serif',
		[theme.breakpoints.between('xs', 'sm')]: {
			fontSize: 16,
		},
		[theme.breakpoints.between('sm', 'md')]: {
			fontSize: 25,
		},
		[theme.breakpoints.between('md', 'lg')]: {
			fontSize: 35,
		},
		[theme.breakpoints.between('lg', 'xl')]: {
			fontSize: 45,
		},
		[theme.breakpoints.up('xl')]: {
			fontSize: 55,
		},
	},
	gridBox:{
		inherit:'PaddingL5,PaddingR5,MarginT4',
		display:'grid',
		gridGap:'45px',
		gridTemplateColumns:'repeat(auto-fill, minmax(270px, 1fr))',
		[theme.breakpoints.up('xl')]: {
			gridTemplateColumns:'repeat(auto-fill, minmax(320px, 1fr))',
			gridGap:'65px',
		},
		['@media (min-width:3200px)']: {
			gridTemplateColumns:'repeat(auto-fill, minmax(520px, 1fr))',
			gridGap:'105px',
		},
		listStyle:'none'
	},
	cardTitle:{
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		WebkitLineClamp: 2,
		lineClamp: 2,	
	}
})
class Collections extends Component {
	constructor(props) {
		super(props)
		this.state = {
			isLogin: false,
			user_address: null,
			name: '',
			viewable: false,
			cards: [],
			onloading: false,
			SkeletoNumber: 0,
			noNFT: true,
		}
	}
	async componentDidMount () {
		const { t } = this.props;
		// const accounts = await window.ethereum.request({
		// 	method: 'eth_requestAccounts',
		// })
		// if (accounts.length === 0) {
		// 	alert('请先连接Metamask')
		// }
		const chainName = await getChainName();
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
		// web3.setProvider(new Web3.providers.HttpProvider('https://polygon-mainnet.infura.io/v3/0232394ba4b34544a778575aefa2ee8c'))
		//web3.setProvider(new Web3.providers.HttpProvider('https://matic-mainnet--jsonrpc.datahub.figment.io/apikey/e84b63fff0e37deb30837101f20eb793/'))
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
			alert(t('请先连接钱包'))
			window.location.href = '/#/';
			return;
		}

		//const account = accounts[0]
		// const chainId = await window.ethereum.request({ method: 'eth_chainId' })
		// if (chainId !== '0x89') {
		// 	alert(t('请切换至Polygon 主网络'))
		// 	await window.ethereum.request({
		// 		method: 'wallet_switchEthereumChain',
		// 		params: [
		// 			{
		// 				chainId: '0x89',
		// 			},
		// 		],
		// 	})
		// }

		let cards = []
		

		const nft_number = await contract.methods.balanceOf(account).call()
		console.log('nft_number: ', nft_number)
		if (nft_number === 0) {
			return
		}

		let ids = await this.getNft(contract, account)
		if (ids.length === 0) {
			return
		}
		console.log(ids)
		this.setState({
			noNFT: false,
		})
		let metadatas = await this.getMetadata(contract, ids)
		for (let i = 0; i < ids.length; i++) {
			let element = {
				id: ids[i],
				title: metadatas[i].name,
				description: metadatas[i].description,
				bonusFee: metadatas[i].attributes.value,
				image: metadatas[i].image,
			}
			cards.push(element)
		}
		let reversed_cards = cards.reverse()
		this.setState({ viewable: true })
		this.setState({ cards: reversed_cards })
		this.setState({
			onloading: false,
			SkeletoNumber: 0,
		})
	}
	componentWillUnmount () {
		web3.setProvider(window.ethereum);
	}
	getMetadata = async (contract, ids) => {
		return Promise.all(ids.map(async (id) => {
			let ipfs_link = await contract.methods.tokenURI(id).call();
			var ipfs_hash_arr = ipfs_link.split('/');
			var ipfs_hash = ipfs_hash_arr[ipfs_hash_arr.length - 1];
			var meta = 'https://sparklink.mypinata.cloud/ipfs/' + ipfs_hash;
			// console.debug("meta: " + ids[i] + " " + meta)
			var error_count = 0;
			let ret;
			while (error_count <= 2) {
				
				try {
					ret = (await axios({
						method: 'get',
						url: meta,
						timeout: 1000 * 2,
					})).data
					
					return ret
				} catch (err) {
					if(ipfs_hash === 'QmNLei78zWmzUdbeRB3CiUfAizWUrbeeZh5K1rhAQKCh51'){
						return  {
							'name': '未上传文件',
							'description': '请到加密发布处上传文件',
							'image': 'https://testnets.opensea.io/static/images/placeholder.png',
							'attributes': [
								{
									'display_type': 'boost_percentage',
									'trait_type': 'Bonuse Percentage',
									'value': 0
								},
								{
									'trait_type': 'File Address',
									'value': 'file_url'
								}
							]
						};
					}
					error_count = error_count + 1;
					
				}
			}
			var name_holder = 'SparkNFT#' + id;
			return  {
				'name': name_holder,
				'description': '暂时无法获取到该nft的相关描述',
				'image': 'https://testnets.opensea.io/static/images/placeholder.png',
				'attributes': [
					{
						'display_type': 'boost_percentage',
						'trait_type': 'Bonuse Percentage',
						'value': 0
					},
					{
						'trait_type': 'File Address',
						'value': 'file_url'
					}
				]
			};

		}));
	}

  getNft = async (nft, account) => {
  	// let balanceId = [];
  	//0x9452644E9fdd59bD46A4d9eC24462995ADfD8d01


  	const checksum_address = web3.utils.toChecksumAddress(account);
	  const chainName = await getChainName();
  	const url =  `${backend}/api/v1/nft/list?owner=${checksum_address}&chain=${chainName}`;

  	//多链
  	// const checksum_address = web3.utils.toChecksumAddress(account);
  	// const chainName = await getChainName();
  	// const url = backend + '/api/v1/nft/list?owner=' + checksum_address+'&chain=' + chainName;

  	console.debug('owner: ', checksum_address)
  	try {
  		var res = await axios.get(url)
  		// balanceId = res.data.nft
  		this.setState({
  			onloading: true,
  			SkeletoNumber: res.data.nft.length
  		})
  		// return balanceId;
  		return res.data.nft
  	} catch (error) {
  		// alert('无法获取您当前拥有的nft')
  		return [];
  	}
  };


  renderDescription = (description) => {
  	if (description.length <= 150) {
  		return description
  	} else {
  		let newDescription = description.substring(0, 150) + '..........'
  		return newDescription
  	}
  }

  render () {
  	const { classes, t} = this.props
  	let obj = this
  	// window.ethereum.on('chainChanged', handleChainChanged)

  	// function handleChainChanged (_chainId) {
  	// 	console.log(_chainId)
  	// 	window.location.reload()
  	// }

  	function showCard (card, index, t,classes) {
  		let res = (
  			<Grid item key={index}>
  				{card ? (
					  <li>
  					<Card className={classes.card}>
  						<CardMedia className={classes.cardMedia} image={card.image} title="Image title" />
  						<CardContent className={classes.cardContent}>
  							<Typography gutterBottom className={classes.Display9+ ' ' + classes.cardTitle}>
  								{card.title}
  							</Typography>
  							<Typography className={classes.Display10+' '+classes.cardTitle} style={{color:'black'}}  >{obj.renderDescription(card.description)}</Typography>
  						</CardContent>
						  <div style={{flex:1}}></div>
  						<CardActions>
  							<Button className={classes.btnColor3Mini} href={'/#/NFT/' + card.id}>
  								{t('查看')}
  							</Button>
  							<Typography variant="body2" style={{color:'black'}} gutterBottom className={classes.Display11}>
  								<b>NFT id: {card.id} </b>
  							</Typography>
  						</CardActions>
  					</Card>
					  </li>
  				) : (
					  <li>
  					<Card className={classes.card}>
  						<Skeleton variant="rect" style={{ marginLeft: 10 }} width={290} height={288} />
  						<Skeleton width="60%" style={{ marginTop: 40 }} height={33} />
  						<Skeleton height={33} />
  						<Skeleton height={33} />
  						<Skeleton height={33} />
  					</Card>
					  </li>
  				)}
  			</Grid>
  		)

  		return res
  	}
  	return (
  		<div>
			  
  			<ThemeProvider theme={theme}>
  				<TopBar />
  				<Container component="main" className={classes.container}>
  					<div className={classes.paper}>
  						<Grid container justifyContent="center">
  							<Grid item xs={12}>
  								<Typography color="inherit" noWrap className={classes.Display7}>
  									{t('collection')}
  								</Typography>
  							</Grid>
  						</Grid>
  					</div>
  				</Container>
				  {this.state.noNFT ? (
  				<Empty
  					description={
						  <div style={{justifyContent:'center',display:'flex',flexDirection:'column'}}>
  						<span style={{ color:'black'}} className={classes.Display7}>
  						{t('暂无可展示NFT')}
  						</span>
						  <div style={{display:'flex',justifyContent:'center'}}>
						  <Button className={classes.btn+' '+classes.MarginT9} href={'/#/introPublish' }>
  								{t('去发布')}
  							</Button>
						  </div>
						  </div>
						  
  					}
  					style={{ marginTop: 100 }}
  				/>
  			) : (
  				<main>
  					{
						  <Container style={{justifyContent:'center',width:'100%',maxWidth:'100vw'}}>
							  <Grid item xs={12} md={12}>
  						<ol className={classes.gridBox}>
  							{(this.state.onloading ? Array.from(new Array(this.state.SkeletoNumber)) : this.state.cards).map(
  								(card, index) => {
  									return showCard(card, index , t ,classes)
  								}
  							)}
  						</ol>
						  </Grid>
						  </Container>
  					}
  				</main>
  			)}
			  <Footer />
  			</ThemeProvider>
			

			  
  		</div>
		
  	)
  }
}

export default withTranslation()(withStyles(withCommon(styles), { withTheme: true })(Collections))
//todo 涉及交易
