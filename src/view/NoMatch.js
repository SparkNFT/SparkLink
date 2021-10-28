/*
 * @Author: Chan
 * @Date: 2021-10-28 10:51:04
 * @LastEditTime: 2021-10-28 15:26:59
 * @LastEditors: Chan
 * @Description: 404
 */
import React from 'react'
import fullLogo from '../imgs/sparkLink.jpg'
import Typography from '@material-ui/core/Typography'
import '../styles/noMatch.css'
import { useTranslation } from 'react-i18next'
const NoMatch = () => {
  const { t } = useTranslation()
  return (
    <div className="nomatchContainer">
      <div className="sub">
        <a
          href="/#/"
          className="logo"
          style={{
            objectFit: 'contain',
            content: 'url(' + fullLogo + ')',
          }}
        />
        <Typography className="title" component="" color="inherit" noWrap>
          <b>404</b>
        </Typography>
        <Typography component="div" className="subtitle" color="textSecondary" paragraph>
          {t('no_match_title')}
        </Typography>
      </div>
    </div>
  )
}
export default NoMatch
