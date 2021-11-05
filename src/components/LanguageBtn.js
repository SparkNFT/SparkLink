import React, { useState } from 'react'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import PropTypes from 'prop-types'
import { reactLocalStorage } from 'reactjs-localstorage'
import i18next from 'i18next'
import { withStyles } from '@material-ui/styles'
import withCommon from '../styles/common'

const tokenId = 'multilanguage_demo'
const options = ['EN', '中文']
const lngOptions = ['en', 'zh']

function LanguageBtn({ classes }) {
	let userProfile = reactLocalStorage.getObject(tokenId) || {}
	const language = userProfile['lng'] || i18next.language
	const indexInit = language === 'zh' || language === 'zh-CN' || language === 'zh-cn' ? 1 : 0
	const [selectedIndex, setSelectedIndex] = useState(indexInit)
	const [anchorEl, setAnchorEl] = React.useState(null)

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget)
	}
	const handleClose = () => {
		setAnchorEl(null)
	}
	const handleCloseProfile = (index) => async () => {
		if (index === selectedIndex) {
			return
		}
		setAnchorEl(null)
		await i18next.changeLanguage(lngOptions[index])
		userProfile['lng'] = lngOptions[index]
		reactLocalStorage.setObject(tokenId, userProfile)
		setSelectedIndex(index)
	}

	return (
		<>
			<Button className={classes.btnColor3} aria-haspopup="true" onClick={handleClick}>
				<span className={classes.h3}>{options[selectedIndex].toUpperCase()}</span>
			</Button>
			<Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
				{options.map((option, index) => (
					<MenuItem style={{ fontSize: 20}} key={option} selected={index === selectedIndex} onClick={handleCloseProfile(index)} value={index}>
						<Button style={{width: '100%'}}  className={classes.btnColor3}>{option}</Button>
					</MenuItem>
				))}
			</Menu>
		</>
	)
}

LanguageBtn.propTypes = {
	classes: PropTypes.object,
}
let style = ()=>{
	return {}
};
export default withStyles(withCommon(style))(LanguageBtn)
