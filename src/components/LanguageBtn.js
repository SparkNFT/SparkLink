import React, { useState } from 'react'
import TranslateIcon from '@material-ui/icons/Translate'
import DownIcon from '@material-ui/icons/KeyboardArrowDown'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import PropTypes from 'prop-types'
import { reactLocalStorage } from 'reactjs-localstorage'
import i18next from 'i18next'

const tokenId = 'multilanguage_demo'
const options = ['English', '中文']
const lngOptions = ['en', 'zh']

function LanguageBtn({ fontColor }) {
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
			<Button aria-haspopup="true" onClick={handleClick}>
				<TranslateIcon style={{ color: fontColor }} />
				<p style={{ color: fontColor }}>{options[selectedIndex].toUpperCase()}</p>
				<DownIcon style={{ color: fontColor }} />
			</Button>
			<Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
				{options.map((option, index) => (
					<MenuItem key={option} selected={index === selectedIndex} onClick={handleCloseProfile(index)} value={index}>
						{option}
					</MenuItem>
				))}
			</Menu>
		</>
	)
}

LanguageBtn.propTypes = {
	classes: PropTypes.object,
}

export default LanguageBtn
