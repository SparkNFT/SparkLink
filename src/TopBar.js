import React, { Component } from 'react';
import logo from './imgs/sparkLink.jpg';
import './App.css';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { createTheme, withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { GithubOutlined, WalletOutlined, WalletTwoTone, WalletFilled} from '@ant-design/icons';
import Web3 from 'web3';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#FDFEFE',
    },
  },
});

const styles = theme => ({
  icon: {
    [theme.breakpoints.down('xl')]: {
      fontSize: 19,
    },
    [theme.breakpoints.up('xl')]: {
      fontSize: 27,
    },
  },
  titleGrid: {
    marginTop: 25,
    marginBottom: 10,
    textAlign: 'center',
  },
  title: {
    minWidth: 100,
    fontSize: 25,
    fontFamily: 'Teko',
    [theme.breakpoints.between('xs', 'sm')]: {
      fontSize: 25,
    },
    [theme.breakpoints.between('sm', 'md')]: {
      fontSize: 25,
    },
    [theme.breakpoints.between('md', 'lg')]: {
      fontSize: 35,
    },
    [theme.breakpoints.between('lg', 'xl')]: {
      fontSize: 35,
    },
    [theme.breakpoints.up('xl')]: {
      fontSize: 45,
    },

  },
  btnGrid: {
    // marginTop: 25,
    marginBottom: 10,
    minWidth: 370,
    marginTop: 30,
    // backgroundColor: '#e3f2fd',
    [theme.breakpoints.between('sm', 'md')]: {
      marginLeft: '12vw'
    },
    [theme.breakpoints.between('md', 'lg')]: {
      marginLeft: '33vw'
    },
    [theme.breakpoints.between('lg', 'xl')]: {
      marginLeft: '40vw'
    },
    [theme.breakpoints.up('xl')]: {
      marginTop: 40,
      marginLeft: '60vw',
    },
  },
  btn: {
    color: '#424949',
    borderColor: '#e3f2fd',
    fontSize: 15,
    [theme.breakpoints.between('xs', 'sm')]: {
      fontSize: 15,
    },
    [theme.breakpoints.between('sm', 'md')]: {
      fontSize: 18,
      width: 100
    },
    [theme.breakpoints.between('md', 'lg')]: {
      fontSize: 18,
      width: 100
    },
    [theme.breakpoints.up('xl')]: {
      fontSize: 25,
    },
  },
  logo: {
    objectFit: 'contain',
    position: 'fixed',
    [theme.breakpoints.between('xs', 'sm')]: {
      width: '30%'
    },
    [theme.breakpoints.between('sm', 'lg')]: {
      width: 200, 
      left: 60,
      top: 0
    },
    [theme.breakpoints.between('lg', 'xl')]: {
      width: 200,
      left: 150,
      top: 0
    },
    [theme.breakpoints.up('xl')]: {
      width: 350,
      left: 160, 
      top: -15
    },
  }

});

class TopBar extends Component {

  state = {
    isConnected: false,
    userAddress: '',
    accountInfo: ''
  };

  async componentWillMount() {
    let w3 = new Web3(window.ethereum);
    const accounts = await w3.eth.getAccounts();
    if (accounts.length == 0) {
      this.setState({
        isConnected: false
      });
    } else {
      var account = accounts[0]
      this.setState({ accountInfo: account.substring(0, 5), });
      this.setState({
        isConnected: true
      });
    }

  }

  sleep = async (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  getAccount = async () => {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      const account = accounts[0];
      alert('您已经连接metamask, 当前账户： ' + account)
      this.setState({ isConnected: true, });
      this.setState({ userAddress: account, });
    } catch (error) {
      console.debug(error)
      this.setState({ isConnected: false, });
    }
  }

  render() {
    const { classes } = this.props

    return (
      <div>
        <Toolbar>
          <Grid container direction="row" justifyContent="flex-start" >
            <Grid item className={classes.titleGrid } xs ={2}>
              <Typography component="h1" color="inherit" noWrap className={classes.title}>
                <img alt="logo" src={logo} className={classes.logo} />
              </Typography>
            </Grid>
            <Grid item className={classes.btnGrid}>
              <Button size="large" className={classes.btn} href='/#/' >
                <b>首页</b>
              </Button>
              <Button size="large" className={classes.btn} href='/#/introPublish'>
                <b>发布</b>
              </Button>


              <Button size="large" className={classes.btn} href='/#/collections'>
                <b>我的收藏</b>
              </Button>

              <Button size="large" href='https://github.com/SparkNFT' target="_blank">
                <GithubOutlined className={classes.icon} />
              </Button>
              {this.state.isConnected ? (
                <Button onClick={this.getAccount}>
                  <WalletTwoTone className={classes.icon} />
                </Button>
              ) : (
                <Button onClick={this.getAccount}>
                  <WalletFilled className={classes.icon} />
                </Button>
              )}
            </Grid>
          </Grid>
        </Toolbar>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(TopBar);