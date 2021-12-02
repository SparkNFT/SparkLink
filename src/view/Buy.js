import '../App.css'
import React, { Component } from 'react'
import { createTheme, ThemeProvider, withStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import TopBar from '../components/TopBar'
import { withTranslation } from 'react-i18next'
import { Grid } from '@material-ui/core'
import comingsoon from '../imgs/comingsoon.png'
import Footer from '../components/Footer'
import withCommon from '../styles/common'
const styles = (theme) => ({
	icon: {
		marginRight: theme.spacing(2),
	},
	titleFont: {
		fontFamily: 'montserrat,source-han-sans-simplified-c, sans-serif',
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
		[theme.breakpoints.between('xs', 'sm')]: {
			fontSize: 5,
		},
		[theme.breakpoints.between('sm', 'md')]: {
			fontSize: 10,
		},
		[theme.breakpoints.between('md', 'lg')]: {
			fontSize: 16,
		},
		[theme.breakpoints.between('lg', 'xl')]: {
			fontSize: 16,
			width: 150,
		},
		[theme.breakpoints.up('xl')]: {
			fontSize: 30,
			width: 300,
			height: 70,
		},
	},
	btnSecond: {
		// marginTop: theme.spacing(3),
		color: '#03A9F4',
		borderColor: '#03A9F4',
		borderWidth: 2,
		borderRadius: 25,
		[theme.breakpoints.between('xs', 'sm')]: {
			fontSize: 5,
			width: 95,
		},
		[theme.breakpoints.between('sm', 'md')]: {
			fontSize: 10,
		},
		[theme.breakpoints.between('md', 'lg')]: {
			fontSize: 16,
		},
		[theme.breakpoints.between('lg', 'xl')]: {
			fontSize: 16,
			width: 150,
		},
		[theme.breakpoints.up('xl')]: {
			fontSize: 30,
			width: 300,
			height: 70,
		},
	},
	paper: {
		marginTop: theme.spacing(7),
		maxWidth: '150%',
	},

	content: {
		fontFamily: 'montserrat,source-han-sans-simplified-c, sans-serif',
		marginTop: 20,
		lineHeight: 1.5,
		[theme.breakpoints.between('xs', 'sm')]: {
			fontSize: 16,
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
		fontFamily: 'montserrat,source-han-sans-simplified-c, sans-serif',
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

class Buy extends Component {
	render() {
		const { classes } = this.props
		return (
			<div style={{minHeight:'100vh',display:'flex',flexDirection:'column'}}>
				<ThemeProvider theme={theme}>
					<TopBar />
					<div style={{flex:'1'}}></div>
					<Container component="main" className={classes.container}>
						<Grid container item xs={12} justifyContent='center'>
							<Grid className={classes.PaddingT2+' '+classes.PaddingB2} xs={8} xl={6}>
								<img src={comingsoon} style={{width:'100%'}} />
							</Grid>
						</Grid>
					</Container>
					<div style={{flex:'1'}}></div>
					<Footer />
				</ThemeProvider>
			</div>
		)
	}
}

export default withTranslation()(withStyles(withCommon(styles), { withTheme: true })(Buy))
