import '../App.css'
import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { createTheme, ThemeProvider, withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import TopBar from '../components/TopBar'
import { withTranslation } from 'react-i18next'

const styles = (theme) => ({
	icon: {
		marginRight: theme.spacing(2),
	},
	titleFont: {
		fontFamily: 'Teko',
	},
	btn: {
		color: '#424949',
		borderWidth: 2,
		borderColor: '#e3f2fd',
		fontSize: 16,
	},
	btnMain: {
		color: '#FFFFFF',
		borderColor: '#e3f2fd',
		borderWidth: 2,
		borderRadius: 25,
		'&:hover': {
			color: '#FFFFFF',
		},
		[theme.breakpoints.between('xs', 'sm')]: {
			fontSize: 15,
			paddingLeft: 20,
			paddingRight: 20,
		},
		[theme.breakpoints.between('sm', 'md')]: {
			fontSize: 20,
		},
		[theme.breakpoints.between('md', 'lg')]: {
			fontSize: 26,
		},
		[theme.breakpoints.between('lg', 'xl')]: {
			fontSize: 26,
			paddingLeft: 30,
			paddingRight: 30,
		},
		[theme.breakpoints.up('xl')]: {
			fontSize: 30,
			height: 70,
			paddingLeft: 30,
			paddingRight: 30,
		},
	},
	btnSecond: {
		// marginTop: theme.spacing(3),
		color: '#FFFFFF',
		borderColor: '#e3f2fd',
		borderWidth: 2,
		borderRadius: 25,
		'&:hover': {
			color: '#FFFFFF',
		},
		[theme.breakpoints.between('xs', 'sm')]: {
			fontSize: 15,
			paddingLeft: 20,
			paddingRight: 20,
		},
		[theme.breakpoints.between('sm', 'md')]: {
			fontSize: 20,
		},
		[theme.breakpoints.between('md', 'lg')]: {
			fontSize: 26,
		},
		[theme.breakpoints.between('lg', 'xl')]: {
			fontSize: 26,
			paddingLeft: 30,
			paddingRight: 30,
		},
		[theme.breakpoints.up('xl')]: {
			fontSize: 30,
			height: 70,
			paddingLeft: 30,
			paddingRight: 30,
		},
	},
	paper: {
		marginTop: theme.spacing(7),
		maxWidth: '150%',
	},

	content: {
		fontFamily: 'Teko',
		marginTop: 20,
		lineHeight: 1.5,
		[theme.breakpoints.between('xs', 'sm')]: {
			fontSize: 16
		},
		[theme.breakpoints.between('sm', 'md')]: {
			fontSize: 20,
		},
		[theme.breakpoints.between('md', 'lg')]: {
			fontSize: 20,
		},
		[theme.breakpoints.between('lg', 'xl')]: {
			fontSize: 20,
		},
		[theme.breakpoints.up('xl')]: {
			fontSize: 30,
		},
	},

	shouldKnow: {
		fontFamily: 'Teko',
		textAlign: 'center',
		[theme.breakpoints.between('xs', 'sm')]: {
			fontSize: 16,
		},
		[theme.breakpoints.between('sm', 'md')]: {
			fontSize: 20,
		},
		[theme.breakpoints.between('md', 'lg')]: {
			fontSize: 40,
		},
		[theme.breakpoints.between('lg', 'xl')]: {
			fontSize: 40,
		},
		[theme.breakpoints.up('xl')]: {
			fontSize: 60,
		},
	},
})

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

class IntroPublish extends Component {
	render() {
		const { t, classes } = this.props
		return (
			<div>
				<ThemeProvider theme={theme}>
					<TopBar />
					<Container component="main" className={classes.container}>
						<div className={classes.paper}>
							<Typography color="inherit" noWrap className={classes.shouldKnow}>
								<b>发布须知</b>
							</Typography>
							<Typography variant="h4" paragraph className={classes.content}>
								在去发布您的作品之前，您需要了解以下信息，它们将有助于您了解完整的发布流程：
							</Typography>
							<Typography color="textSecondary" paragraph className={classes.content}>
								<b>1.</b> 您的作品将被存储在IPFS（InterPlanetary File
								System）中，而存储地址将被记录在以太坊上，与您的NFT绑定在一起
							</Typography>
							<Typography color="textSecondary" paragraph className={classes.content}>
								<b>2.</b>{' '}
								您可以选择是将您的作品开源得保存在IPFS上，或者加密保存在IPFS上。针对加密的作品，只有持有您发行的NFT的读者才能访问。{' '}
								<br />
							</Typography>
							<Typography color="textSecondary" paragraph className={classes.content}>
								<b>3.</b>{' '}
								如果您选择加密保存在IPFS上，您需要在将作品基本信息上传到链上后，再设置作品的地址。这个过程我们会引导您完成，请勿担心。{' '}
								<br />
							</Typography>
							<Typography color="textSecondary" paragraph className={classes.content}>
								<b>4.</b>{' '}
								当您将作品发布在我们平台时，我们默认您会支持二次创作，处于您宣传网络中的读者有权将他们持有的NFT对应的地址替换为他们自己的二次创作作品。{' '}
								<br />
							</Typography>
							<Grid container justifyContent="center" style={{ fontFamily: 'Teko', marginTop: 70 }}>
								<Grid item style={{display: 'flex'}} justifyContent="center" xl={6} xs={12} >
									<Button
										size="large"
										variant="contained"
										color="secondary"
										className={classes.btnMain}
										href="/#/encryptedPublish"
									>
                  	<b>{t('publish_encry')}</b>
									</Button>
								</Grid>
								<Grid item  style={{display: 'flex' ,marginTop: 20}} justifyContent="center" xl={6} xs={12} >
									<Button
										size="large"
										variant="contained"
										color="secondary"
										className={classes.btnSecond}
										href="/#/publish"
									>
										<b>{t('publish_open')}</b>
									</Button>
								</Grid>
							</Grid>
						</div>
					</Container>
				</ThemeProvider>
			</div>
		)
	}
}

export default withTranslation()(withStyles(styles, { withTheme: true })(IntroPublish))
