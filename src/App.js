import bg from './imgs/bg.png'
import bg2 from './imgs/bg2.png'
import bg3 from './imgs/bg3.png'
import index1 from './imgs/index1.png'
import home1 from './imgs/home1.png'
import home2 from './imgs/home2.png'
import home3 from './imgs/home3.png'
import bigLogo from './imgs/bigLogo.png'
import logoTele from './imgs/logoTele.png'
import logoTwi from './imgs/logoTwi.png'
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
		letterSpacing: -2,
		textAlign: 'center',
		wordSpacing: 5,
		boxShadow: '0px 2px 2px #ff7d57',
		borderRadius: '100vw',
		backgroundColor: '#FFFFFF',
		paddingLeft: 50,
		paddingRight: 50,
		paddingTop: 10,
		paddingBottom: 5,
		fontFamily: 'ANC',
		marginTop: '1vw',
		color: 'red',
		lineHeight: 1,
		[theme.breakpoints.between('xs', 'sm')]: {
			marginTop: 'calc(2vh + 10px)',
			fontSize: 18,
			letterSpacing: -1,
		},
		[theme.breakpoints.between('sm', 'md')]: {
			fontSize: 20,
		},
		[theme.breakpoints.between('md', 'lg')]: {
			fontSize: 25,
		},
		[theme.breakpoints.between('lg', 'xl')]: {
			fontSize: 32,
		},
		[theme.breakpoints.up('xl')]: {
			fontSize: 45,
		},
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
		[theme.breakpoints.between('xs', 'sm')]: {
			height: 'calc(50vh + 100px)',
			width: 'auto',
			clip:'rect(0px,100vw,calc(50vh + 100px),0px)'
		},
		[theme.breakpoints.up('sm')]: {
			width: '100%',
			height: 'auto'
		},
		['@media (min-height:600px) and (max-height:1279.95px) and (min-width:768px) and (max-width:1024px)']:{
			height: '50vh',
		},
		objectFit: 'cover'
	},
	bg2: {
		position: 'absolute',
		zIndex: '-2',
		[theme.breakpoints.between('xs', 'sm')]: {
			height: '150vh',
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
		maxWidth: '70%'
	},
	miniBox:{
		width: '100%',
		minHeight: 100,
		backgroundColor: 'white',
		borderRadius: '2vw'
	},
	miniBoxLogo:{
		width: '50%',
		marginLeft: '25%'
	},
	p1:{
		[theme.breakpoints.between('xs', 'sm')]: {
			height: 'calc(52vh)'
		},
		[theme.breakpoints.up('sm')]: {
			height: 'calc(48.9vw - 100px)'
		},
		['@media (min-height:600px) and (max-height:1279.95px) and (min-width:768px) and (max-width:1024px)']:{
			height: '50vw'
		}
	},
	p2:{
		[theme.breakpoints.between('xs', 'sm')]: {
			height: '150vh'
		},
		[theme.breakpoints.up('sm')]: {
			height: '150vw'
		},
	},
	p21:{
		[theme.breakpoints.between('xs', 'sm')]: {
			height: '60vh'
		},
		[theme.breakpoints.up('sm')]: {
			height: '60.9vw'
		},
	},
	p22:{
		[theme.breakpoints.between('xs', 'sm')]: {
			height: '40vh'
		},
		[theme.breakpoints.up('sm')]: {
			height: '50vw'
		},
		['@media (min-height:600px) and (max-height:1279.95px) and (min-width:768px) and (max-width:1024px)']:{
			height: '50vw',
			marginBottom:'10vw'
		}
	},
	p23:{
		[theme.breakpoints.between('xs', 'sm')]: {
			height: '50vh'
		},
		[theme.breakpoints.up('sm')]: {
			height: '39vw'
		},
	},
	p3:{
		[theme.breakpoints.between('xs', 'sm')]: {
			height: '60.9vh'
		},
		[theme.breakpoints.up('sm')]: {
			height: '75.6vw'
		},
	},
	p31:{
		[theme.breakpoints.between('xs', 'sm')]: {
			height: '40.6vh'
		},
		[theme.breakpoints.up('sm')]: {
			height: '40.6vw'
		},
		['@media (min-height:600px) and (max-height:1279.95px) and (min-width:768px) and (max-width:1024px)']:{
			height: '46vw'
		}
	},
	p32:{
		[theme.breakpoints.between('xs', 'sm')]: {
			height: '35vh'
		},
		[theme.breakpoints.up('sm')]: {
			height: '35vw'
		},
	},
	img:{
		[theme.breakpoints.between('xs', 'sm')]: {
			display:'none'
		},
		[theme.breakpoints.up('sm')]: {
			width:'80%'
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
		console.log(ref)
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
							<Grid className={classes.p1} container style={{}}>
								<img src={bg} className={classes.bg} />
								<Grid item style={{paddingLeft:'8%',color: 'white',paddingRight:'8%'}} xs={12} sm={8} md={6} lg={6} xl={6}>
									<img src={bigLogo} className={classes.bigLogo}/>
									<div style={{paddingLeft: '20px'}}>
										<Typography color="inherit" className={classes.h2}>
											<b>{t('index_slogan')}<br />{t('index_slogan2')}</b>
										</Typography>
										<Typography color="inherit" className={classes.h4}>
											{t('index_slogan_bottom')}
										</Typography>
										<Grid container style={{marginTop: '20px'}} justifyContent="flex-start" spacing={2}>
											<Grid item>
												<Button
													size="large"
													variant="contained"
													color="secondary"
													className={classes.btn}
													href="/#/introPublish"
												>
													{t('go_publish')}
												</Button>
											</Grid>
											<Grid item>
												<Button
													size="large"
													variant="outlined"
													color="secondary"
													className={classes.btnOutline}
													href="/#/buy"
												>
													{t('go_buy')}
												</Button>
											</Grid>
										</Grid>
									</div>
							    </Grid>
								<Grid item  sm={6} md={6} lg={6} xl={6}>
									<img style={{marginTop: '10%'}} className={classes.img} src={home1} />
								</Grid>
							</Grid>
							<Grid container className={classes.p2} style={{}}>
								<img src={bg2} className={classes.bg2} />
								<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
									<Grid container className={classes.p21} style={{}} justifyContent="center" direction="column">
										<div style={{display: 'flex', justifyContent: 'center'}}>
											<div className={classes.title4box}>
												{t('index_slogan3')}
											</div>
										</div>
										<div style={{display: 'flex', justifyContent: 'center'}}>
											<div className={classes.h2center}>
												{t('index_slogan4')}
											</div>
										</div>
										<Grid container justifyContent="center" style={{width: '100%'}}>
											<div style={{flex: '1'}}></div>
											<Grid item xs={3} sm={3} md={2} lg={2} xl={2}>
												<div className={classes.miniBox}>
													<img src={miniBoxLogo1} className={classes.miniBoxLogo}/>
													<Typography color="inherit" className={classes.h3Color}>
														{t('index_miniBox_1')}
													</Typography>
												</div>
											</Grid>
											<div style={{flex: '1'}}></div>
											<Grid item xs={3} sm={3} md={2} lg={2} xl={2}>
												<div className={classes.miniBox}>
													<img src={miniBoxLogo2} className={classes.miniBoxLogo}/>
													<Typography color="inherit" className={classes.h3Color}>
														{t('index_miniBox_2')}
													</Typography>
												</div>
											</Grid>
											<div style={{flex: '1'}}></div>
											<Grid item xs={3} sm={3} md={2} lg={2} xl={2}>
												<div className={classes.miniBox}>
													<img src={miniBoxLogo3} className={classes.miniBoxLogo}/>
													<Typography color="inherit" className={classes.h3Color}>
														{t('index_miniBox_3')}
													</Typography>
												</div>
											</Grid>
											<div style={{flex: '1'}}></div>
										</Grid>
									</Grid>
									<Grid container className={classes.p22} justifyContent="center">
										<Grid item xs={false} sm={5} md={5} lg={5} xl={5}>
											<img style={{marginTop: '10%' ,}} className={classes.img} src={home2} />
										</Grid>
										<Grid item xs={10} sm={10} md={4} lg={4} xl={4}>
											<Typography style={{color: '#F08080'}} className={classes.h1}>
												{t('index_message_1')}
											</Typography>
											<Typography style={{color: '#000000', marginBottom: '1vw'}} className={classes.h4}>
												{t('index_message_2')}
											</Typography>
											<Button
												size="large"
												variant="outlined"
												color="secondary"
												style={{fontSize: '22px'}}
												className={classes.btnColor}
												href="https://docs.sparklink.io/tutorial/chuang-jian-qian-bao"
											>
												{t('learn')}
											</Button>
										</Grid>
									</Grid>
									<Grid container className={classes.p23} justifyContent="center">
										<Grid item xs={10} sm={10} md={5} lg={5} xl={5}>
											<Typography style={{color: '#FFFFFF' ,marginTop: '5vw', marginBottom: '2vw'}} className={classes.h1x}>
												{t('index_message_3')}<span style={{color: 'red'}}>{t('index_message_4')}</span>{t('index_message_5')}
											</Typography>
											<Button
												size="large"
												variant="outlined"
												color="secondary"
												style={{marginLeft: '0.5vw',fontSize: '22px'}}
												className={classes.btnColor2}
												href="/#/introPublish"
											>
												{t('share')}
											</Button>
										</Grid>
										<Grid item xs={false} sm={4} md={4} lg={4} xl={4}>
											<img style={{marginTop: '10%' ,}} className={classes.img} src={home3} />
										</Grid>
									</Grid>
							    </Grid>
							</Grid>
							<Grid container className={classes.p3}>
								<img src={bg3} className={classes.bg3} />
								<Grid className={classes.p31} container style={{justifyContent:'center'}}>
									<Grid item style={{color: 'white'}} xs={10} sm={10} md={6} lg={6} xl={6}>
										<div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
											<div style={{marginTop: '5vw', textAlign: 'center'}} className={classes.h1}>
												{t('index_message_6')}
											</div>
											<div style={{marginTop: '1vw', textAlign: 'center'}} className={classes.h2}>
												{t('index_message_7')}
											</div>
											<div style={{marginTop: '2vw',marginBottom: '2vw', textAlign: 'center',display:'flex',justifyContent:'center'}} className={classes.h1}>
												<div>
													<a href='https://docs.sparklink.io/tutorial/fa-bu-zuo-pin' style={{color:'white'}}>{t('index_message_8')}
														<div style={{backgroundColor:'white',height:'5px',width:'100%',borderRadius:'2px'}}></div>
													</a>
												</div>	
											</div>
											<div style={{display: 'flex', justifyContent: 'center'}}>
												<Button
													size="large"
													variant="outlined"
													color="secondary"
													onClick={this.onConnetWallet}
													style={{fontSize: '24px'}}
													className={classes.btnColor}
												>
													{t('connect_wallet')}
												</Button>
											</div>
										</div>
									</Grid>	
								</Grid>
								<Grid className={classes.p32} container style={{justifyContent:'center'}}>
									<Grid item xs={false} sm={5} md={5} lg={5} xl={5}>
										<img className={classes.img} style={{width: '100%'}} src={index1} />
									</Grid>
									<Grid item xs={10} sm={10} md={6} lg={6} xl={6}>
										<Typography style={{color: '#F08080', marginTop:'10vw'}} className={classes.h1x}>
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
