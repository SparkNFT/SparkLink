import '../App.css'
import React, { Component } from 'react'
import { createTheme, ThemeProvider, withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import TopBar from '../components/TopBar'

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
		fontFamily: 'Teko',
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

class Buy extends Component {
	render() {
		const { classes } = this.props
		return (
			<div>
				<ThemeProvider theme={theme}>
					<TopBar />
					<Container component="main" className={classes.container}>
						<div className={classes.paper}>
							<Typography color="inherit" noWrap className={classes.shouldKnow}>
								<b>敬请期待</b>
							</Typography>
						</div>
					</Container>
				</ThemeProvider>
			</div>
		)
	}
}

export default withStyles(styles, { withTheme: true })(Buy)
