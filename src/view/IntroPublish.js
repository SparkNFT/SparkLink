import '../App.css'
import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { createTheme, ThemeProvider, withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import TopBar from '../components/TopBar'
import { withTranslation } from 'react-i18next'
import withCommon from '../styles/common.js'
import Footer from '../components/Footer'

const styles = (theme) => ({
	icon: {
		marginRight: theme.spacing(2),
	},
	titleFont: {
		fontFamily: 'ANC,source-han-sans-simplified-c, sans-serif',
	},
	paper: {
		paddingLeft: '10%',
		paddingRight: '10%',
		marginTop: theme.spacing(7),
		maxWidth: '150%',
	},

	content: {
		fontFamily: 'ANC,source-han-sans-simplified-c, sans-serif',
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
		fontFamily: 'AMC',
		textAlign: 'center',
		//marginTop: 100,
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
							<Typography color="inherit" noWrap className={classes.shouldKnow + ' ' + classes.MarginT3}>
								<b>{t('introPublish')}</b>
							</Typography>
							<br />
							<br />
							<Typography variant="h4" paragraph className={classes.Display13}>
								{t('introPublish1')}
							</Typography>
							<br />
							<Typography color="textSecondary" paragraph className={classes.Display12}>
								<b>1. </b> {t('introPublish2')}
							</Typography>
							<Typography color="textSecondary" paragraph className={classes.Display12}>
								<b>2. </b>{t('introPublish3')}
								<br />
							</Typography>
							<Typography color="textSecondary" paragraph className={classes.Display12}>
								<b>3. </b>{t('introPublish4')}
								<br />
							</Typography>
							<Typography color="textSecondary" paragraph className={classes.Display12}>
								<b>4. </b>{t('introPublish5')}
								<br />
								<br />
							</Typography>
							<Grid container justifyContent="center" style={{ fontFamily: 'ANC,source-han-sans-simplified-c, sans-serif', marginTop: 40 }}>
								<Grid container item style={{ display: 'flex' }} justifyContent="center" xl={12} xs={12} >
									<Button
										className={classes.btn}
										href="/#/encryptedPublish"
									>
										{t('publish_encry')}
									</Button>
								</Grid>
								<Grid container item style={{ display: 'flex', marginTop: 20 }} justifyContent="center" xl={12} xs={12} >
									<Button
										className={classes.btnOutline}
										href="/#/publish"
									>
										{t('publish_open')}
									</Button>
								</Grid>
							</Grid>
							<br />
							<br />
						</div>
					</Container>
					<Footer />
				</ThemeProvider>
			</div>
		)
	}
}

export default withTranslation()(withStyles(withCommon(styles), { withTheme: true })(IntroPublish))
