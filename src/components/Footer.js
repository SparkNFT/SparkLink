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
		[theme.breakpoints.between('xs', 'sm')]: {width:'50%'},
		[theme.breakpoints.up('sm')]: {
			width:'30%'
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
			<div>
				<div style={{height:'15vh'}}></div>
				<Grid className={classes.footer + ' ' + classes.PaddingB2} container style={{backgroundColor: '#E9DDD5' }}>
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
						<div className={classes.MarginL6 +' '+classes.MarginT6} style={{display:'flex'}}>
							<Button style={{marginLeft:0}} className={classes.btnImgRound} href='https://twitter.com/SparkLink_io'><img className={classes.btnImg} src={logoTwi} /></Button>
							<Button className={classes.btnImgRound} href='https://t.co/lh0TzLZdEo?amp=1' ><img className={classes.btnImg} src={logoDis} /></Button>
							<Button className={classes.btnImgRound} href='https://github.com/SparkNFT' ><img className={classes.btnImg} src={logoGit} /></Button>
							<Button className={classes.btnImgRound} href='' ><img className={classes.btnImg} src={logoIns} /></Button>
							<Button className={classes.btnImgRound} href='https://t.me/SparkLink_io' ><img className={classes.btnImg} src={logoTele} /></Button>
						</div>
					</Grid>
					<Grid direction="column" container item style={{color: 'white' ,paddingTop: '5vw'}} xs={12} sm={5} md={5} lg={5} xl={5} >
						<div style={{display: 'flex', justifyContent:'center',alignItems:'center'}}>
							<img src={bot} className={classes.botimg} />
							<div>
								<Button style={{marginLeft:'20px' , lineHeight :'200%'}} className={classes.btnColor}>
									<span style={{textTransform:'normal'}}>SparkLink Telegram Bot</span>
								</Button>
							</div>
						</div>
						<div className={classes.MarginT7} style={{display: 'flex', justifyContent:'flex-end'}}>
							<a className={classes.PaddingR8} style={{display:'flex',justifyContent:'flex-end'}} href='https://docs.sparklink.io/product/chan-pin'>
								<img src={help} className={classes.helpimg} />
							</a>
						</div>
						
					</Grid>
				</Grid>               
			</div>
		)
	}
}
export default withTranslation()(withStyles(withCommon(styles))(Footer))