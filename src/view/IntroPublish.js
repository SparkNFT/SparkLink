import '../App.css'
import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { createTheme, ThemeProvider, withStyles } from '@material-ui/core/styles'
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

	DisplaySeBold6: {
		textAlign: 'center',
	},
	Display11:{
		textIndent:'-1em',
		marginLeft:'1em',
		lineHeight:1.25
	},
	DisplaySeBold10:{
		lineHeight:1.35
	},
	btnBox:{
		alignItems:'center',
		[theme.breakpoints.between('xs', 'sm')]: {
			flexDirection:'column'
		},
		[theme.breakpoints.up('sm')]: {
			flexDirection:'row'
		},
	},
	btnMini:{
		inherit:'MarginT10,MarginL10,MarginR10',
	}
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
							<div color="inherit"  noWrap className={classes.DisplaySeBold6 + ' ' + classes.MarginT3}>
								{t('introPublish')}
							</div>
							<br />
							<br />
							<div className={classes.DisplaySeBold10}>
								{t('introPublish1')}
							</div>
							<br />
							<br />
							<div className={classes.Display11}>
								1. {t('introPublish2')}
								<br />
								<br />
							</div>
							<div  className={classes.Display11}>
								2. {t('introPublish3')}
								<br />
								<br />
							</div>
							<div className={classes.Display11}>
								3. {t('introPublish4')}
								<br />
								<br />
							</div>
							<div className={classes.Display11}>
								4. {t('introPublish5')}
								<br />
								<br />
							</div>
							<Grid container justifyContent="center" style={{ marginTop: 40 }}>
								<Grid container item className={classes.btnBox} style={{ display: 'flex' ,}} justifyContent="center" xs={12} sm={12} md={12} lg={12} >
									<div>
										<Button
											className={classes.btnMini}
											href="/#/encryptedPublish"
										>
											{t('publish_encry')}
										</Button>
									</div>
									<div>
										<Button
											className={classes.btnMini}
											href="/#/publish"
										>
											{t('publish_open')}
										</Button>
									</div>

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
