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

import Button from '@material-ui/core/Button'
let styles = (theme) => ({
	footer:{
		[theme.breakpoints.between('xs', 'sm')]: {
			
		},
		[theme.breakpoints.up('sm')]: {
			
		},
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
	},
	helpimg:{
		[theme.breakpoints.between('xs', 'sm')]: {height:'100px',width:'205px',marginLeft: '25px',marginTop:'15px'},
		[theme.breakpoints.up('sm')]: {
			height:'150px',width:'305px',marginLeft: '25px',marginTop:'15px'
		},
	},
	
})
class Footer extends Component {
	render() {
		const { t } = this.props
		const { classes } = this.props
		return (
			<div>
				<div style={{height:'15vh'}}></div>
				<Grid className={classes.footer} container style={{backgroundColor: '#E9DDD5' }}>
					<Grid direction='column' container item style={{color: 'white' ,paddingTop: '10vw'}} xs={12} sm={7} md={7} lg={7} xl={7} >
						<div style={{display :'flex', width:'100%'}}>
							<div style={{flex:'1'}} />
							<div style={{display: 'flex' ,flexDirection: 'column'}}>
								<span className={classes.h3Color} style={{paddingLeft: '0px'}}>{t('resources')}</span>
								<a href='https://opensea.io/' className={classes.h4}>Conditions</a>
								<a href='https://opensea.io/' className={classes.h4}>Privacy Policy</a>
								<a href='https://opensea.io/' className={classes.h4}>People</a>
							</div>
							<div style={{flex:'1'}} />
							<div style={{display: 'flex' ,flexDirection: 'column'}}>
								<span className={classes.h3Color} style={{paddingLeft: '0px'}}>{t('market')}</span>
								<a href='https://sparklink.io/#/buy' className={classes.h4}>SparkLink-Market</a>
								<a href='https://opensea.io/' className={classes.h4}>OpenSea</a>
							</div>
							<div style={{flex:'1'}} />
							<div style={{display: 'flex' ,flexDirection: 'column'}}>
								<span className={classes.h3Color} style={{paddingLeft: '0px'}}>{t('social_media')}</span>
								<a href='https://t.me/SparkLink_io' className={classes.h4}>Telegram</a>
								<a href='https://twitter.com/SparkLink_io' className={classes.h4}>Twitter</a>
								<a href='https://t.co/lh0TzLZdEo?amp=1' className={classes.h4}>Discord</a>
								<a href='' className={classes.h4}>Instagram</a>
							</div>
							<div style={{flex:'1'}} />
						</div>
						<div style={{paddingLeft: '20px',paddingTop: '20px',display:'flex'}}>
							<Button className={classes.btnImgRound} href='https://twitter.com/SparkLink_io'><img className={classes.btnImg} src={logoTwi} /></Button>
							<Button className={classes.btnImgRound} href='https://t.co/lh0TzLZdEo?amp=1' ><img className={classes.btnImg} src={logoDis} /></Button>
							<Button className={classes.btnImgRound} href='https://github.com/SparkNFT' ><img className={classes.btnImg} src={logoGit} /></Button>
							<Button className={classes.btnImgRound} href='' ><img className={classes.btnImg} src={logoIns} /></Button>
							<Button className={classes.btnImgRound} href='https://t.me/SparkLink_io' ><img className={classes.btnImg} src={logoTele} /></Button>
						</div>
					</Grid>
					<Grid direction="column" justifyContent='center' container item style={{color: 'white' ,paddingTop: '10vw'}} xs={12} sm={5} md={5} lg={5} xl={5} >
						<div style={{display: 'flex', justifyContent:'center',alignItems:'center'}}>
							<img src={bot} className={classes.botimg} />
							<div><Button style={{marginLeft:'20px' , lineHeight :'200%'}} className={classes.btnColor}>SparkLink Telegram Bot</Button></div>
						</div>
						<span className={classes.h2center} style={{marginTop:'15px',marginLeft:'0px'}}>
							Use The SparkLink bot in Telegram Group <br/>
							Do Whatever you want
						</span>
						<div style={{display: 'flex', justifyContent:'flex-end'}}>
							<Button href='https://docs.sparklink.io/product/chan-pin'><img src={help} className={classes.helpimg} /></Button>
						</div>
						
					</Grid>
				</Grid>               
			</div>
		)
	}
}
export default withTranslation()(withStyles(withCommon(styles))(Footer))