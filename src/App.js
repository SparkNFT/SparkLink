import bg from './imgs/bg.png'
import bg_mobile from './imgs/bg_mobile.png'
import home2 from './imgs/brain.png'
import home3 from './imgs/wallet.png'
import home4 from './imgs/earth.png'
import Footer from './components/Footer'
import './App.css'
import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { createTheme, ThemeProvider , withStyles} from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import TopBar from './components/TopBar'
import withCommon, { colors } from './styles/common.js'
import { withTranslation } from 'react-i18next'
import  CallMade  from '@material-ui/icons/CallMade'

let styles = (theme) => ({
	title4box: {
		inherit:'PaddingL10,PaddingR10,PaddingB10,PaddingT10',
		letterSpacing: -1,
		textAlign: 'center',
		wordSpacing: 5,
		fontFamily: 'montserrat,source-han-sans-simplified-c, sans-serif',
		marginTop: '1vw',
		color: 'rgb(255,90,39)',
		lineHeight: 1,
	},
	paper: {
		marginTop: theme.spacing(7),
		textAlign: 'center',
	},
	slogan:{
		[theme.breakpoints.between('xs', 'sm')]: {
			marginTop:'25px'
		},	
		fontWeight:900,
		lineHeight:'110%',
		color:'black',
		textShadow:'3px 0px #66BAC1'
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
			width:'153px',
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
		display:'flex',
		justifyContent:'center',
	},
	p2:{


	},
	p21:{
		inherit:'PaddingB1,PaddingT4'
	},
	p22:{
		inherit:'MarginT4,PaddingT5',
		[theme.breakpoints.between('xs', 'sm')]: {
			width:'80%',
			marginLeft:'10vw',
			display:'flex',
			flexDirection:'column-reverse',
		},
	},
	p23:{
	
	},
	p3:{

	},
	p31:{
		
	},
	p32:{

	},
	page:{
		backgroundColor:colors.color3
	},
	img:{
		[theme.breakpoints.between('xs', 'sm')]: {
			width:'60%',
		},
		[theme.breakpoints.up('sm')]: {
			width:'100%',
		},
	},
	img2:{
		[theme.breakpoints.between('xs', 'sm')]: {
			width:'100%',
		},
		[theme.breakpoints.up('sm')]: {
			width:'100%',
		},
	},
	img3:{
		[theme.breakpoints.between('xs', 'sm')]: {
			width:'40%',
			marginBottom:'5vh'
		},
		[theme.breakpoints.up('sm')]: {
			width:'100%',
		},
	},
	imgBox:{
		[theme.breakpoints.between('xs', 'sm')]: {
			display:'flex',
			justifyContent:'center'
		},
	},
	btnImgX:{
		width:'100%',
		height:'100%',
		[theme.breakpoints.between('xs', 'sm')]: {
			width:'50px',
		},
	},
	btnImgRoundX:{
		marginTop:'25px',
		[theme.breakpoints.between('xs', 'sm')]: {
			width:50,
			marginRight: 20
		},
		[theme.breakpoints.between('sm', 'md')]: {
			width:60,
			marginRight: 30
		},
		[theme.breakpoints.between('md', 'lg')]: {
			width:70,
			marginRight: 30
		},
		[theme.breakpoints.between('lg', 'xl')]: {
			width:80,
			marginRight: 35
		},
		[theme.breakpoints.up('xl')]: {
			width:120,
			marginRight: 45
		},
		['@media (min-width:3200px)']:{
			width:240,
			marginRight: 90
		},
	},
	
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
							<Grid className={classes.p1+' '+classes.PaddingB8} container style={{}}>
								<Grid className={classes.MarginT0+' '+classes.MarginB0} item xs={10} sm={7} md={7} lg={7} xl={7} style={{backgroundColor:colors.color1,boxShadow: '0px 5px 6px rgba(0, 0, 0, 0.25)'}}>
									<Grid style={{color:'white'}} className={''}>
										<Grid className={classes.PaddingL5+' '+classes.PaddingT5+' '+classes.PaddingR5} item xs={12} sm={10} xl={9}>
											<p  className={classes.Display6 +' '+classes.slogan+' '+classes.MarginB1} style={{color:'white'}}>{t('index_slogan')}</p>
										</Grid>
										<Grid container item className={classes.PaddingT5+' '+classes.MarginB5} justifyContent="center" xs={12}>
											<Button
												className={classes.btn}
												href="/#/PublishEx"
											>
												{t('go_publish')}
											</Button>
											<Button
												className={classes.btnOutline + ' ' +classes.MarginL3}
												href="/#/buy"
											>
												{t('go_buy')}
											</Button>
										</Grid>
									</Grid>
							    </Grid>
							</Grid>
							<Grid container className={classes.p2} style={{display:'flex',justifyContent:'center'}}>
								<Grid item xs={12} sm={10}>
									<Grid container className={classes.p22}>

										<Grid className={classes.MarginT2+' '+classes.PaddingB5} item xs={12} sm={7}>
											<p className={classes.Display6 +' '+classes.MarginB6} style={{fontWeight:800}}>
												{t('index_message_1')}
											</p>
											<p className={classes.Display8} style={{color:'#303030',fontWeight:300}}>
												{t('index_message_2')}
											</p>
										</Grid>
										<Grid className={classes.imgBox} item xs={12} sm={5}>
											<img className={classes.img} src={home2} />
										</Grid>
									</Grid>
									<Grid container className={classes.p23+' '+classes.MarginT3}>
										<Grid className={classes.imgBox} item xs={12} sm={2}>
											<img  className={classes.img3} src={home3} />
										</Grid>
										<Grid className={classes.PaddingL4} item xs={10} sm={10}>
											<p className={classes.Display6 } style={{fontWeight:800,textAlign:'right',marginBottom:'7px'}}>
												{t('index_message_3')}
											</p>
											<Grid className={' '} item xs={12} sm={12}>
												<p className={classes.Display7 +' '+classes.MarginB7} style={{fontWeight:800,color:'#9F2225',textAlign:'right'}}>
													{t('index_message_4')}
												</p>
											</Grid>
											<Grid container className={' '} item xs={12} sm={12} justifyContent='flex-end'>
												<Grid item xs={12} sm={9}>
													<p className={classes.Display8} style={{color:'#303030',fontWeight:300,textAlign:'right'}}>
														{t('index_message_5')}
													</p>
												</Grid>
											</Grid>

										</Grid>

									</Grid>
							    </Grid>
							</Grid>
							<Grid container className={classes.p3}>
								<Grid className={classes.p31} container style={{justifyContent:'center'}}>
									<Grid item  xs={12} sm={12}>
										<div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
											<div style={{textAlign: 'center',fontWeight:800}} className={classes.Display6+' '+classes.MarginT1}>
												{t('index_message_6')}
											</div>
											<div style={{textAlign: 'center',display:'flex',justifyContent:'center'}} className={classes.Display8+' '+classes.MarginT4}>
												<div>
													<a href='https://docs.sparklink.io/tutorial/fa-bu-zuo-pin' style={{color:'#9F2225',fontWeight:800,textDecorationLine:'underline'}}>{t('index_message_8')}
													</a>
													<CallMade style={{fontSize:'100%',color:'#9F2225'}}/>
												</div>	
											</div>
											<Grid className={classes.imgBox} item xs={false} sm={12}>
												<img className={classes.img2} src={home4} />
											</Grid>
											<div style={{display: 'flex', justifyContent: 'center'}} className={classes.MarginT9}>
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
