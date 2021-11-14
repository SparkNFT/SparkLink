import withCommon from '../styles/common'
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
		transition:'margin-bottom 1s',
		'&:hover':{
			
			marginBottom: 10
		}
	},
	botimg:{
		[theme.breakpoints.between('xs', 'sm')]: {
			width: '50px'
		},
		[theme.breakpoints.up('sm')]: {
			width: '66px'
		},
		[theme.breakpoints.up('xl')]: {
			width: '80px'
		},
		['@media (min-width:3200px)']:{
			width: '160px'
		},
		marginRight:'0.5vw',
	},
	helpimga:{
		[theme.breakpoints.between('xs', 'sm')]: {
			width:'100%'
		},
	},
	helpimg:{
		inherit:'MarginL10',
		width:'9vw',
		[theme.breakpoints.between('xs', 'sm')]: {
			width: '40%'
		},
	},
	DisplayLight12s:{
		whiteSpace:'nowrap',
		color:'rgba(255,255,255,1.0)',
		'&:hover':{
			color:'rgb(255,112,67)'
		},
		inherit:'MarginT10',
		
	},
	Display8:{
		color:'rgb(255,112,67)',

	},
	btnImgRound:{
		flex:'1'
	},
	DisplaySeBold10:{
		color:'rgba(255,255,255,1.0)',
		'&:hover':{
			color:'rgb(255,112,67)'
		},
		whiteSpace:'nowrap'
	},
	DisplaySeBold11s:{
		color:'rgba(255,255,255,1.0)',
		'&:hover':{
			color:'rgb(255,112,67)'
		},
		whiteSpace:'nowrap'
	},
	DisplaySeBold8:{
		color:'rgba(255,255,255,1.0)',
		'&:hover':{
			color:'rgb(255,112,67)'
		},
		whiteSpace:'nowrap'
	},
	btnRoundGroup:{
		[theme.breakpoints.between('xs', 'sm')]: {
			marginTop:'20px'
		},
	},
	driver:{
		[theme.breakpoints.between('xs', 'sm')]: {
			display:'none'
		},
	}
	
})
class Footer extends Component {
	render() {
		const { t } = this.props
		const { classes } = this.props
		return (
			<div  style={{backgroundColor: '#EF8F71' ,marginTop:'15vh'}}>
				
				<Container style={{maxWidth:'100vw',paddingLeft:'0px',paddingRight:'0px'}}>
					<Grid xs={12} item className={classes.footer + ' ' + classes.PaddingB3+' '+classes.PaddingL6+' '+classes.PaddingR6} container>
						<Grid className={classes.MarginT3} container item style={{color: 'white',flexGrow:'0'}} xs={12} sm={true} >
							<Grid item xs={12} style={{display: 'flex', justifyContent:'center',alignItems:'center'}}>
								<div style={{display: 'flex',alignItems:'center'}}>
									<img src={bot} className={classes.botimg} />
									<a className={classes.DisplaySeBold11s}  style={{textTransform:'normal',whiteSpace:'nowrap'}}>SparkLink Telegram Bot</a>
								</div>
							</Grid>
							<Grid item xs={12} className={classes.btnRoundGroup}  style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
								<a className={classes.btnImgRound} href='https://twitter.com/SparkLink_io'><img className={classes.btnImg} src={logoTwi} /></a>
								<a className={classes.btnImgRound} href='https://t.co/lh0TzLZdEo?amp=1' ><img className={classes.btnImg} src={logoDis} /></a>
								<a className={classes.btnImgRound} href='https://github.com/SparkNFT' ><img className={classes.btnImg} src={logoGit} /></a>
								<a className={classes.btnImgRound} href='' ><img className={classes.btnImg} src={logoIns} /></a>
								<a className={classes.btnImgRound} href='https://t.me/SparkLink_io' ><img className={classes.btnImg} src={logoTele} /></a>
							</Grid>
						</Grid>
						<Divider className={classes.MarginL6+' '+classes.MarginT3+' '+classes.driver}  orientation="vertical" variant="middle" flexItem style={{backgroundColor:'rgba(254, 248, 248, 0.42)'}} />
						<Grid item className={classes.MarginT3} direction='column' container style={{color: 'white' }} xs={12} sm={true} >
							<div style={{display :'flex'}}>
								<div className={classes.MarginL7+' '+classes.MarginR3} style={{display: 'flex' ,flexDirection: 'column'}}>
									<span className={classes.DisplaySeBold11} style={{paddingLeft: '0px'}}>{t('resources')}</span>
									<a href='' className={classes.DisplayLight12s}>Conditions</a>
									<a href='' className={classes.DisplayLight12s}>Privacy Policy</a>
									<a href='' className={classes.DisplayLight12s}>People</a>
								</div>
								<div style={{display: 'flex' ,flexDirection: 'column'}}>
									<span className={classes.DisplaySeBold11} style={{paddingLeft: '0px'}}>{t('market')}</span>
									<a href='https://sparklink.io/#/buy' className={classes.DisplayLight12s}>SparkLink-Market</a>
									<a href='https://opensea.io/' className={classes.DisplayLight12s}>OpenSea</a>
								</div>
							</div>
						</Grid>
						<div style={{flex:'1'}}></div>
						<Grid item xs={12} className={classes.MarginT3} sm={true} style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
							<a className={classes.DisplaySeBold8}> Need Help? </a><img src={help} className={classes.helpimg} />
						</Grid>
						
					</Grid>
					
				</Container>         
			</div>
		)
	}
}
export default withTranslation()(withStyles(withCommon(styles))(Footer))