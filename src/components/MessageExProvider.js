import * as React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert'
import {  createTheme, ThemeProvider , withStyles } from '@material-ui/core/styles';
import withCommon from '../styles/common';
import { withTranslation } from 'react-i18next';


let ref;
class MessageExProvider extends React.Component {
	componentDidMount(){
		ref = this;
		console.log(ref)
	}
	state = {
		messageText: '2233!',
		type: '',
		open: false,
		vertical: 'top',
		horizontal: 'center',
	}
	handleClose = () => {
		this.setState({ open: false })
	};
	open() {
		this.setState({ open: true })
	}
	render() {
		const {classes} = this.props;
		return (
			<div>
				<ThemeProvider>
					<Snackbar
						open={this.state.open}
						message={this.state.messageText}
						autoHideDuration={3000}
						key={this.state.vertical + this.state.horizontal}>
						<Alert variant="filled" onClose={this.handleClose} className={classes.Display10} severity="error" sx={{ width: '100%' }}>
							This is a success message!
						</Alert>
					</Snackbar>
				</ThemeProvider>
			</div>
		);
	}
}
let styles=(theme)=>{
	console.log(theme)
	return {

	}
}
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

export default withTranslation()(withStyles(withCommon(styles), { withTheme: true },theme)(MessageExProvider));
export class MessageEx{
	error(){
		if(ref){
			ref.open();
		}
	}
}
export let Message = new MessageEx();