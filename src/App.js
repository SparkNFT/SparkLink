import bg from './imgs/bg.png'
import bg_mobile from './imgs/bg_mobile.png'
import bg21 from './imgs/bg21.png'
import bg22 from './imgs/bg22.png'
import bg3 from './imgs/bg3.png'
import index1 from './imgs/index1.png'
import home1 from './imgs/home1.png'
import home2 from './imgs/home2.png'
import home3 from './imgs/home3.png'
import bigLogo from './imgs/bigLogo.png'
import logoTele from './imgs/logoTele_color.png'
import logoTwi from './imgs/logoTwi_color.png'
import miniBoxLogo1 from './imgs/miniBoxLogo1.png'
import miniBoxLogo2 from './imgs/miniBoxLogo2.png'
import miniBoxLogo3 from './imgs/miniBoxLogo3.png'
import Footer from './components/Footer'
import './App.css'
import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { createTheme, ThemeProvider , withStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import TopBar from './components/TopBar'
import withCommon from './styles/common.js'
import { withTranslation } from 'react-i18next'
let styles = (theme) => ({
	title4box: {
		inherit:'PaddingL10,PaddingR10,PaddingB10,PaddingT10',
		letterSpacing: -1,
		textAlign: 'center',
		wordSpacing: 5,
		fontFamily: 'ANC,source-han-sans-simplified-c, sans-serif',
		marginTop: '1vw',
		color: 'rgb(255,90,39)',
		lineHeight: 1,
	},
	paper: {
		marginTop: theme.spacing(7),
		textAlign: 'center',
	},
	container: {
		maxWidth: '100%',
		paddingLeft: '0px',
		paddingRight: '0px',
		whiteSpace: 'pre-line'
	},
	books: {
		width: '90%',
		height: 'auto',
	},
	bg: {
		
		position: 'absolute',
		zIndex: '-1',
		left: '0px',
		top: '0px',
		width:'100%',
		height:'100%',
		objectFit: 'cover'
	},
	bg2: {
		position: 'absolute',
		zIndex: '-2',
		[theme.breakpoints.between('xs', 'sm')]: {
			height: '150vh',
			width:'100vw',
			clip:'rect(0px,100vw,150vh,0px)'
		},
		[theme.breakpoints.up('sm')]: {
			width: '100%',
		},
		['@media (min-height:600px) and (max-height:1279.95px) and (min-width:768px) and (max-width:1024px)']:{
			height: '175vw',
			clip:'rect(0px,100vw,150vh,0px)'
		},
		objectFit: 'cover'
	},
	bg3: {
		position: 'absolute',
		zIndex: '-2',
		[theme.breakpoints.between('xs', 'md')]: {
			clip:'rect(0px,100vw,60.5vh,0px)',
			height: '60.5vh',
			width: '100vw'
		},
		[theme.breakpoints.up('sm')]: {
			width: '100%',
		},
		objectFit: 'cover'
	},
	bigLogo: {
		[theme.breakpoints.between('xs', 'sm')]: {
			width:'133px',
		},
		[theme.breakpoints.between('sm', 'md')]: {
			width:'199px',
		},
		[theme.breakpoints.between('md', 'lg')]: {
			width:'266px',
		},
		[theme.breakpoints.between('lg', 'xl')]: {
			width:'399px',
		},
		[theme.breakpoints.up('xl')]: {
			width:'699px',
		},
		['@media (min-width:3200px)']:{
			width:'999px'
		},
		['@media (min-height:600px) and (max-height:1279.95px) and (min-width:768px) and (max-width:1024px)']:{
			maxWidth: '50%',
		},
	},
	miniBox:{
		inherit:'PaddingL10,PaddingR10,PaddingB10',
		width: '100%',
		minHeight: 100,
		backgroundColor: 'white',
		borderRadius: '2vw',
		color: 'rgb(255,112,67)',
		textTransform:'uppercase'
	},
	miniBoxLogo:{
		textAlign:'center',
		width: '70%',
		marginLeft: '15%'
	},
	p1:{
		backgroundImage: 'url('+bg+')',
		backgroundSize:'100% 100%',
		[theme.breakpoints.between('xs', 'sm')]: {
			backgroundImage: 'url('+bg_mobile+')',
		},
	},
	p2:{

	},
	p21:{
		backgroundImage: 'url('+bg21+')',
		backgroundSize:'100% 100%',
		inherit:'PaddingB1,PaddingT4'
	},
	p22:{
		inherit:'PaddingB5,PaddingT5'
	},
	p23:{
		backgroundImage: 'url('+bg22+')',
		backgroundSize:'100% 100%',
		inherit:'PaddingB4,PaddingT5',

	},
	p3:{

	},
	p31:{
		backgroundImage: 'url('+bg3+')',
		backgroundSize:'100% 100%',
		inherit:'PaddingB4',
	},
	p32:{

	},
	img:{
		[theme.breakpoints.between('xs', 'sm')]: {
			display:'none'
		},
		[theme.breakpoints.up('sm')]: {
			width:'80%',
			marginLeft:'10%',
			marginTop:'10%'
		},
	},
	btnImg:{
		width:'100%',
		height:'100%',
		[theme.breakpoints.between('xs', 'sm')]: {
			width:'50px',
		},
	},
	btnImgRound:{
		marginTop:'25px',
		width:'80px',
		marginRight:'25px',
		[theme.breakpoints.between('xs', 'sm')]: {
			width:'50px',
			marginLeft:'2px',
		},
	}
	
})

const theme = createTheme({
	palette: {
		primary: {
			main: '#FDFEFE',
		},
		secondary: {
			main: '#FFFFFF',
			light: '#0066ff',
		},

	},
})

class App extends Component {
	onRef = (ref) => {
		this.topbar = ref;
	}
	onConnetWallet = () => {
		this.topbar.handleDialogOpen();
	}
	render() {
		const { t } = this.props
		const { classes } = this.props
		return (
			<div>
				<ThemeProvider theme={theme}>
					<div className={classes.page}>
						<TopBar onRef={this.onRef} />
						<Container component="main" className={classes.container}>
							<Grid className={classes.p1+' '+classes.PaddingB1} container style={{}}>
								<Grid item xs={10} sm={5} md={5} lg={5} xl={5}>
									<Grid style={{color:'white'}} className={classes.MarginL1 +' ' + classes.PaddingT1+' ' +classes.PaddingB1}>
										<img src={bigLogo} className={classes.bigLogo}/>
										<div className={classes.PaddingL10}>
											<Typography color="inherit" className={classes.Display9} style={{lineHeight:'1.25'}}>
												<b>{t('index_slogan')}</b>
											</Typography>
											<Typography color="inherit" className={classes.Display10 + ' ' +classes.MarginT8} style={{color:'rgb(255,112,67)'}}>
												{t('index_slogan_bottom')}
											</Typography>
											<Grid container className={classes.MarginT5} justifyContent="flex-start" spacing={2}>
												<Grid item>
													<Button
														className={classes.btn}
														href="/#/introPublish"
													>
														{t('go_publish')}
													</Button>
												</Grid>
												<Grid item>
													<Button
														className={classes.btnOutline}
														href="/#/buy"
													>
														{t('go_buy')}
													</Button>
												</Grid>
											</Grid>
										</div>
									</Grid>
							    </Grid>
								<Grid item  sm={7} md={7} lg={7} xl={7}>
									<img className={classes.img} src={home1} />
								</Grid>
							</Grid>
							<Grid container className={classes.p2} style={{}}>
								<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
									<Grid container className={classes.p21} style={{}} justifyContent="center" direction="column">
										<div style={{display: 'flex', justifyContent: 'center'}}>
											<div className={classes.title4box +' '+classes.Display7}>
												{t('index_slogan3')}
											</div>
										</div>
										<div style={{display: 'flex', justifyContent: 'center'}}>
											<div className={classes.Display9+' '+classes.MarginT8+' '+classes.MarginB8} style={{textAlign:'center',color:'white'}}>
												{t('index_slogan4')}
											</div>
										</div>
										<Grid container justifyContent="center" style={{width: '100%'}}>
											<div style={{flex: '1'}}></div>
											<Grid item xs={3} sm={3} md={2} lg={2} xl={2}>
												<div className={classes.miniBox}>
													<img src={miniBoxLogo1} className={classes.miniBoxLogo}/>
													<Typography className={classes.Display10} style={{textAlign:'center'}}>
														{t('index_miniBox_1')}
													</Typography>
												</div>
											</Grid>
											<div style={{flex: '1'}}></div>
											<Grid item xs={3} sm={3} md={2} lg={2} xl={2}>
												<div className={classes.miniBox}>
													<img src={miniBoxLogo2} className={classes.miniBoxLogo}/>
													<Typography className={classes.Display10} style={{textAlign:'center'}}>
														{t('index_miniBox_2')}
													</Typography>
												</div>
											</Grid>
											<div style={{flex: '1'}}></div>
											<Grid item xs={3} sm={3} md={2} lg={2} xl={2}>
												<div className={classes.miniBox}>
													<img src={miniBoxLogo3} className={classes.miniBoxLogo}/>
													<Typography className={classes.Display10} style={{textAlign:'center'}}>
														{t('index_miniBox_3')}
													</Typography>
												</div>
											</Grid>
											<div style={{flex: '1'}}></div>
										</Grid>
									</Grid>
									<Grid container className={classes.p22} justifyContent="center">
										<Grid item xs={false} sm={5} md={5} lg={5} xl={5}>
											<img style={{marginTop: '10%' ,marginLeft:'0%',marginRight:'10%'}} className={classes.img} src={home2} />
										</Grid>
										<Grid className={classes.PaddingT5+' '+classes.PaddingB5} item xs={10} sm={10} md={4} lg={4} xl={4}>
											<Typography className={classes.MarginT5 + ' ' +classes.Display7 +' '+classes.MarginB5} style={{color: '#FF7744'}}>
												{t('index_message_1')}
											</Typography>
											<Typography style={{color: '#000000', marginBottom: '1vw'}} className={classes.Display8}>
												{t('index_message_2')}
											</Typography>
											<Button
												className={classes.btnBig}
												href="https://docs.sparklink.io/tutorial/chuang-jian-qian-bao"
											>
												{t('learn')}
											</Button>
										</Grid>
									</Grid>
									<Grid container className={classes.p23} justifyContent="center">
										<Grid xs={10} sm={1} md={1} lg={1} xl={1}></Grid>
										<Grid className={classes.PaddingT0 +' ' +classes.PaddingB1} item xs={10} sm={6} md={6} lg={6} xl={6}>
											<Button
												className={classes.btnBig+' ' +classes.MarginT5}
												style={{ marginBottom: '2vw',marginTop: '2vw'}}
												href="/#/introPublish"
											>
												{t('share')}
											</Button>
											<Typography style={{color: '#FFFFFF'}} className={classes.Display7 +' ' +classes.MarginT5}>
												{t('index_message_3')}<span style={{color: 'red'}}>{t('index_message_4')}</span>{t('index_message_5')}
											</Typography>
										</Grid>
										<Grid item xs={false} sm={5} md={5} lg={5} xl={5}>
											<img style={{marginTop: '10%' ,}} className={classes.img} src={home3} />
										</Grid>
									</Grid>
							    </Grid>
							</Grid>
							<Grid container className={classes.p3}>
								<Grid className={classes.p31} container style={{justifyContent:'center'}}>
									<Grid item style={{color: 'white'}} xs={10} sm={10} md={6} lg={6} xl={6}>
										<div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
											<div style={{marginTop: '5vw', textAlign: 'center'}} className={classes.Display7}>
												{t('index_message_6')}
											</div>
											<div style={{marginTop: '1vw', textAlign: 'center'}} className={classes.Display8}>
												{t('index_message_7')}
											</div>
											<div style={{marginTop: '2vw',marginBottom: '2vw', textAlign: 'center',display:'flex',justifyContent:'center'}} className={classes.Display7}>
												<div>
													<a href='https://docs.sparklink.io/tutorial/fa-bu-zuo-pin' style={{color:'white'}}>{t('index_message_8')}
														<div style={{backgroundColor:'white',height:'5px',width:'100%',borderRadius:'2px'}}></div>
													</a>
												</div>	
											</div>
											<div style={{display: 'flex', justifyContent: 'center'}}>
												<Button
													onClick={this.onConnetWallet}
													className={classes.btnBig}
												>
													{t('connect_wallet')}
												</Button>
											</div>
										</div>
									</Grid>	
								</Grid>
								<Grid className={classes.MarginT9} container style={{justifyContent:'center',alignItems:'center'}}>
									<Grid item xs={false} sm={5} md={5} lg={5} xl={5}>
										<img className={classes.img} style={{marginTop: '10%' ,marginLeft:'0%',marginRight:'10%'}} src={index1} />
									</Grid>
									<Grid  item xs={10} sm={10} md={6} lg={6} xl={6}>
										<Typography style={{color: '#FF774A'}} className={classes.Display8 + ' ' +classes.MarginT3}>
											{t('index_message_9')}
										</Typography>
										<Button className={classes.btnImgRound} href='https://t.me/SparkLink_io' ><img className={classes.btnImg} src={logoTele} /></Button>
										<Button className={classes.btnImgRound} href='https://twitter.com/SparkLink_io'><img className={classes.btnImg} src={logoTwi} /></Button>
									</Grid>
								</Grid>

							</Grid>
							<Footer />
						</Container>
					</div>
				</ThemeProvider>
			</div>
		)
	}
}


export default withTranslation()(withStyles(withCommon(styles), { withTheme: true }, theme)(App))
