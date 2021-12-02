import React, { useState } from 'react'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import { Button } from '@material-ui/core'
import PropTypes from 'prop-types'
import { reactLocalStorage } from 'reactjs-localstorage'
import i18next from 'i18next'
import { withStyles } from '@material-ui/styles'
import withCommon from '../styles/common'
import LanguageIcon from '@material-ui/icons/Language';
import IconButton from '@material-ui/core/IconButton';
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
			<IconButton className={classes.btnLan+' '+classes.MarginR10} aria-haspopup="true"  onClick={handleClick}>
				<LanguageIcon style={{fontSize:'inherit'}} />
			</IconButton>
			<Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
				{options.map((option, index) => (
					<MenuItem key={option} selected={index === selectedIndex} onClick={handleCloseProfile(index)} value={index}>
						<Button style={{width: '100%'}}  className={classes.btnItem}>{option}</Button>
					</MenuItem>
				))}
			</Menu>
			
		</>
	)
}

LanguageBtn.propTypes = {
	classes: PropTypes.object,
}
let style = (theme)=>({
	btnLan:{
		padding:'0',
		color:'white',
		[theme.breakpoints.between('xs', 'sm')]: {
			fontSize: 26,
		},
		[theme.breakpoints.between('sm', 'md')]: {
			fontSize: 26,
		},
		[theme.breakpoints.between('md', 'xl')]: {
			fontSize: 28,
		},
		[theme.breakpoints.up('xl')]: {
			fontSize: 36,
		},
		['@media (min-width:3200px)']: {
			fontSize: 72,
		},
	}
});
export default withStyles(withCommon(style))(LanguageBtn)
