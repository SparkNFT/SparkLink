import withCommon from '../styles/common'
import fullLogo from '../imgs/logowhite.png'
import { withStyles } from '@material-ui/styles'
import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import { withTranslation } from 'react-i18next'
import bot from '../imgs/bot.png'
import help from '../imgs/help.png'
import logoTwi from '../imgs/logoTwi.png'
import logoDis from '../imgs/logoRed.png'
import logoTele from '../imgs/logoTele.png'
import logoGit from '../imgs/logoGit.png'
import logoIns from '../imgs/logoIns.png'
import { Container, Divider } from '@material-ui/core'
import Button from '@material-ui/core/Button'
let styles = (theme) => ({
	logo: {
		marginRight: 24,
		height: 'auto',
		[theme.breakpoints.between('xs', 'sm')]: {
			height:'25px',
		},
		[theme.breakpoints.between('sm', 'md')]: {
			height:'25px',
		},
		[theme.breakpoints.between('md', 'lg')]: {
			height:'30px',
		},
		[theme.breakpoints.between('lg', 'xl')]: {
			height:'40px',
		},
		[theme.breakpoints.up('xl')]: {
			height:'60px',
		},
		['@media (min-width:3200px)']:{
			height:'80px',
		},
	},
	footer:{
		[theme.breakpoints.between('xs', 'sm')]: {
			
		},
		[theme.breakpoints.up('sm')]: {
			
		},
	},
	btnImg:{
		filter: 'grayscale(50%)',
		'&:hover':{
			filter: 'grayscale(0%)',
		}
	},
	botimg:{
		[theme.breakpoints.between('xs', 'sm')]: {
			width: '5vh'
		},
		[theme.breakpoints.up('sm')]: {
			width: '12vh'
		},
		[theme.breakpoints.up('xl')]: {
			width: '10vh'
		},
		marginRight:'0.5vw',
	},
	helpimga:{
		[theme.breakpoints.between('xs', 'sm')]: {
			width:'100%'
		},
	},
	helpimg:{
		[theme.breakpoints.between('xs', 'sm')]: {
			width: '150px'
		},
		[theme.breakpoints.up('sm')]: {
			width: '170px'
		},
		[theme.breakpoints.up('xl')]: {
			width: '200px'
		},
	},
	Display9:{
		color:'white',
		'&:hover':{
			color:'rgb(255,112,67)'
		}
	},
	Display8:{
		color:'rgb(255,112,67)',

	}
	
})
class Footer extends Component {
	render() {
		const { t } = this.props
		const { classes } = this.props
		return (
			<div  style={{backgroundColor: '#878787' ,marginTop:'15vh'}}>
				
				<Container justifyContent='center'>
					<Grid xs={12} item className={classes.footer + ' ' + classes.PaddingB2} container style={{backgroundColor: '#878787' }}>
						<Grid direction='column' container item style={{color: 'white' ,paddingTop: '5vw'}} xs={12} sm={7} md={7} lg={7} xl={7} >
							<div style={{display :'flex', width:'100%'}}>
								<div className={classes.MarginL6} style={{display: 'flex' ,flexDirection: 'column'}}>
									<span className={classes.Display8} style={{paddingLeft: '0px'}}>{t('resources')}</span>
									<a href='' className={classes.Display9}>Conditions</a>
									<a href='' className={classes.Display9}>Privacy Policy</a>
									<a href='' className={classes.Display9}>People</a>
								</div>
								<div style={{flex:'1'}} />
								<div style={{display: 'flex' ,flexDirection: 'column'}}>
									<span className={classes.Display8} style={{paddingLeft: '0px'}}>{t('market')}</span>
									<a href='https://sparklink.io/#/buy' className={classes.Display9}>SparkLink-Market</a>
									<a href='https://opensea.io/' className={classes.Display9}>OpenSea</a>
								</div>
								<div style={{flex:'1'}} />
								<div style={{flex:'1'}} />
							</div>
						</Grid>
						<Grid direction="column" container item style={{color: 'white' ,paddingTop: '5vw'}} xs={12} sm={5} md={5} lg={5} xl={5} >
							<div style={{display: 'flex', justifyContent:'center',alignItems:'center'}}>
								
								<div>
									<Button style={{marginLeft:'20px' , lineHeight :'200%'}} className={classes.btn}>
										<img src={bot} className={classes.botimg} />
										<span style={{textTransform:'normal'}}>SparkLink Telegram Bot</span>
									</Button>
								</div>
							</div>

							
						</Grid>
					</Grid>
					<Divider />
					<Grid container style={{backgroundColor:'#878787',flexDirection:'row'}}  className={classes.MarginT6+' '+classes.MarginB6} >
				 		<Grid item xs={12} sm={9}>
							<Button style={{marginLeft:0}} className={classes.btnImgRound} href='https://twitter.com/SparkLink_io'><img className={classes.btnImg} src={logoTwi} /></Button>
							<Button className={classes.btnImgRound} href='https://t.co/lh0TzLZdEo?amp=1' ><img className={classes.btnImg} src={logoDis} /></Button>
							<Button className={classes.btnImgRound} href='https://github.com/SparkNFT' ><img className={classes.btnImg} src={logoGit} /></Button>
							<Button className={classes.btnImgRound} href='' ><img className={classes.btnImg} src={logoIns} /></Button>
							<Button className={classes.btnImgRound} href='https://t.me/SparkLink_io' ><img className={classes.btnImg} src={logoTele} /></Button>
						</Grid>
						<Grid className={classes.PaddingT5} item xs={12} sm={3}>
							<a  style={{display:'flex',justifyContent:'flex-end'}} className={classes.helpimga} href='https://docs.sparklink.io/product/chan-pin'>
								<img src={help} className={classes.helpimg} />
							</a>
						</Grid>
					</Grid>
					<Divider />      
					<Grid container style={{backgroundColor:'#878787',flexDirection:'row'}}  >
						<img src={fullLogo} className={classes.logo+' '+classes.MarginT6+' '+classes.MarginB6+' '+classes.MarginL6}></img>
					</Grid>
				</Container>         
			</div>
		)
	}
}
export default withTranslation()(withStyles(withCommon(styles))(Footer))