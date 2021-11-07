import React from 'react'

const MaskLayer = (props) => {
	const styles = {
		modal: {
			position: 'fixed',
			zIndex: 1000,
			left: 0,
			top: 0,
			width: '100%',
			height: '100%',
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'center',
			backgroundColor: 'rgba(0,0,0,0.3)',
			userSelect: 'none'
		},
		cross: {
			width: 500,
			height: 50,
			weight: 'bold',
			display: 'flex',
			justifyContent: 'flex-end'
		},
		border: {
			width: '28px',
			height: '28px',
			border: '1px solid',
			lineHeight: '20px',
			fontSize: '20px',
			borderRadius: '50%',
			textAlign: 'center'
		}
	}
	return (
		<div
			onClick={(e) => {
				console.log('click')
				if (e.target.className === 'MaskLayer') {
					props.onClose()
				}
			}}
			className="MaskLayer"
			style={styles.modal}
		>
			<div style={styles.cross} onClick={props.onClose}>
				<div style={styles.border}>╳</div>
			</div>
			{props.children}
		</div>
	)
}

export default MaskLayer
