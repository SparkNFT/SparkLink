import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import * as serviceWorker from './utils/serviceWorker'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap-theme.css'
import Router from './router/Router'
import './utils/i18n'

// const cors = require('cors');
// const corsOptions ={
// 	origin:'http://localhost:3000', 
// 	credentials:true,            //access-control-allow-credentials:true
// 	optionSuccessStatus:200
// }
// app.use(cors(corsOptions));

ReactDOM.render(<Router />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
