import * as React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
let ref;
class MessageExProvider extends React.Component {
	componentDidMount(){
		ref = this;
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
		return (
			<div>
				<Snackbar
					open={this.state.open}
					message={this.state.messageText}
					autoHideDuration={6000}
					key={this.state.vertical + this.state.horizontal}
					action={
						<React.Fragment>
							<IconButton
								aria-label="close"
								color="inherit"
								sx={{ p: 0.5 }}
								onClick={this.handleClose}
							>
								<CloseIcon />
							</IconButton>
						</React.Fragment>
					}>
				</Snackbar>
			</div>
		);
	}
}
export default MessageExProvider;
let MessageEx = new Object();
MessageEx.error = ()=>{
	ref.open();
} 
export {MessageEx};