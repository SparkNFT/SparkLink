import React, { Component } from 'react'
import './App.css'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { createTheme, ThemeProvider, withStyles } from '@material-ui/core/styles'
import TopBar from './TopBar'
import Typography from '@material-ui/core/Typography'
import axios from 'axios'
import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container'
import { DollarCircleOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import { Spin, message } from 'antd'
import contract from './contract'
import web3 from './web3'
import Skeleton from '@material-ui/lab/Skeleton'

const abi = require('erc-20-abi')
const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#FDFEFE',
    },
  },
})

const styles = theme => ({
  container: {
    maxWidth: 1500,
  },
  paper: {
    marginTop: theme.spacing(1),
    textAlign: 'center',
    maxWidth: 1500,
  },
  btnDisable: {
    margin: theme.spacing(1),
    fontSize: 16,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#909497',
    color: '#909497',
    marginLeft: '10%',
    width: 100
  },
  btnSell: {
    margin: theme.spacing(1),
    fontSize: 16,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#2196f3',
    color: '#2196f3',
    marginLeft: '10%',
    width: 100
  },
  content: {
    fontFamily: 'Teko',
    [theme.breakpoints.between('xs', 'sm')]: {
      justifyContent: "flex-start",
      alignItems: "flex-start"
    },
    [theme.breakpoints.between('sm', 'md')]: {
      justifyContent: "flex-start",
      alignItems: "flex-start"
    },
    [theme.breakpoints.between('md', 'lg')]: {
      justifyContent: "flex-start",
      alignItems: "flex-start"
    },
    [theme.breakpoints.between('lg', 'xl')]: {
      justifyContent: "center",
      alignItems: "flex-start"
    },
    [theme.breakpoints.up('xl')]: {
      justifyContent: "center",
      alignItems: "flex-start"
    },
  },
  img: {
    width: 300,
    marginBottom: 50,
    [theme.breakpoints.between('xs', 'sm')]: {
      marginLeft: '20%'
    },
    [theme.breakpoints.between('sm', 'md')]: {
      marginLeft: '20%'
    },
    [theme.breakpoints.between('md', 'lg')]: {
      marginLeft: '20%'
    },
    [theme.breakpoints.between('lg', 'xl')]: {
      marginLeft: '30%'
    },
    [theme.breakpoints.up('xl')]: {
      marginLeft: '40%'
    },
  },
  imgPaper: {
    width: 350,
    marginBottom: 50,
    backgroundColor: '#EFEBE9',
    [theme.breakpoints.between('sm', 'md')]: {
      marginLeft: '20%'
    },
    [theme.breakpoints.between('md', 'lg')]: {
      marginLeft: '20%'
    },
    [theme.breakpoints.between('lg', 'xl')]: {
      marginLeft: '30%'
    },
    [theme.breakpoints.up('xl')]: {
      marginLeft: '35%'
    },
  },
  content2: {
    fontFamily: 'Teko',
    textAlign: 'center',
    [theme.breakpoints.between('xs', 'sm')]: {
      maxWidth: 500
    },
    [theme.breakpoints.between('sm', 'md')]: {
      marginLeft: 90, maxWidth: 500
    },
    [theme.breakpoints.between('md', 'lg')]: {
      marginLeft: 80, maxWidth: 500
    },
    [theme.breakpoints.between('lg', 'xl')]: {
      marginLeft: 50, maxWidth: 500
    },
    [theme.breakpoints.up('xl')]: {
      marginLeft: 60, maxWidth: 500
    },
  },

})


class BuySingle extends Component {
  gateway = 'https://coldcdn.com/api/cdn/v5ynur/ipfs/'
  backend = 'https://api.sparklink.io'
  sparkAddr = '0xb42d4525841008A69E427026DF354067fD6A524f'
  state = {
    name: '',
    bonusFee: 0,
    coverURL: '',
    description: '',
    price: 0,
    priceString: '',
    ipfsHashMeta: '',
    open: false,
    address: '',
    NFTId: '',
    onSale: false,
    owner: '',
    approvedAddr: '',
    currentAcc: '',
    onLoading: false,
    childrenNum: 0,
    loadItem: true,
    encrypted: '未知',
    tokenAddr: null,
    tokenSymbol: '',
    decimal: 0,
    approved: false,
  }

  constructor(props) {
    super(props);
  }

  async componentDidMount () {
    const accounts = await window.ethereum.request({method: 'eth_requestAccounts'})
    const account = accounts[0]
    this.setState({
      currentAcc: account,
      NFTId: this.props.match.params.NFTId
    })
    const issueId = await contract.methods.getIssueIdByNFTId(this.state.NFTId).call()
    const royalty = await contract.methods.getRoyaltyFeeByIssueId(issueId).call()
    const metadata = await contract.methods.tokenURI(this.props.match.params.NFTId).call()
    let hash = metadata.split('/')
    this.setState({
      ipfsHashMeta: hash[hash.length-1]
    })
    var url = this.gateway + this.state.ipfsHashMeta
    try {
      const res = await axios({method: 'get', url: url, timeout: 1000*3})
      let content = res.data
      let bonus = content.attributes[0].value
      let encrypted
      if (content.attributes[3].value.toUpperCase() === 'TRUE'){
        encrypted = '是'
      } else {
        encrypted = '否'
      }

      this.setState({
        loadItem: false,
        name: content.name,
        description: content.description,
        bonusFee: bonus,
        coverURL: content.image,
        encrypted: encrypted
      })
    } catch (error) {
      var name_holder = 'SparkNFT#' + this.props.match.params.NFTId
      this.setState({
        loadItem: false,
        name: name_holder,
        description: '暂时无法获取到该nft的相关描述',
        bonusFee: royalty,
        coverURL: 'https://via.placeholder.com/100x140.png?text=SparkNFT'
      })
    }

    var owner = await contract.methods.ownerOf(this.props.match.params.NFTId).call()
    var approved = await contract.methods.getApproved(this.props.match.params.NFTId).call()
    var price = await contract.methods.getTransferPriceByNFTId(this.props.match.params.NFTId).call()
    var token_addr = await contract.methods.getTokenAddrByNFTId(this.props.match.params.NFTId).call()
    this.setState({
      owner: owner,
      approvedAddr: approved,
      price: price
    })
    if (token_addr == '0x0000000000000000000000000000000000000000') {
      this.setState({
        tokenAddr: token_addr,
        tokenSymbol: "MATIC",
        decimal: 18,
        approved: true
      })
    } else {
      try{
        const token_contract = new web3.eth.Contract(abi, token_addr)
        const token_symbol = await token_contract.methods.symbol().call()
        const decimal = await token_contract.methods.decimals().call()
        const approved_amount = await token_contract.methods.allowance(account, this.sparkAddr).call()
        if(approved_amount >= price){
          this.setState({
            approved: true
          })
        } else {
          this.setState({
            approved: false
          })
        }
        this.setState({
          tokenAddr: token_addr,
          tokenSymbol: token_symbol,
          decimal: decimal
        })
      } catch (error) {
        message.error({
          content: `Error: ${error}`,
          className: 'custom-class',
          style: {
            marginTop: '10vh',
          },
        })
      }
    }

    var price_with_decimal = price / (10 ** this.state.decimal)
    price_with_decimal = price_with_decimal + " " + this.state.tokenSymbol
    this.setState({
      priceString: price_with_decimal
    })

    const child_url = this.backend + '/api/v1/nft/info?nft_id=' + this.state.NFTId
    try{
      const response = await axios.get(child_url)
      var children_num = response.data.children_count
      this.setState({
        childrenNum: children_num
      })
    } catch (error) {
      message.error({
        content: `Error: ${error}`,
        className: 'custom-class',
        style: {
          marginTop: '10vh',
        },
      })
    }
    
  }

  handleBuy = async (e) => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    const account = accounts[0]
    
    var gasPrice = await web3.eth.getGasPrice()
    var new_gas_price = Math.floor(parseInt(gasPrice) * 1.5).toString()
    let obj = this
    if (this.state.tokenAddr == '0x0000000000000000000000000000000000000000') {
      this.setState({
        onLoading: true
      })
      contract.methods.safeTransferFrom(this.state.owner, account, this.state.NFTId).send({
        from: account,
        value: this.state.price,
        gasPrice: new_gas_price
      })
        .on('receipt', function (receipt) {
          obj.setState({
            onLoading: false
          })
          message.success({
            content: "交易已经上链",
            className: 'custom-class',
            style: {
              marginTop: '10vh',
            },
          })
        })
        .on('error', function (error) {
          obj.setState({
            onLoading: false
          })
          message.error({
            content: `Error: ${error.message}`,
            className: 'custom-class',
            style: {
              marginTop: '10vh',
            },
          })
        })
    } else {
      this.setState({
        onLoading: true
      })
      contract.methods.safeTransferFrom(this.state.owner, account, this.state.NFTId).send({
        from: account,
        gasPrice: new_gas_price
      })
        .on('receipt', function (receipt) {
          obj.setState({
            onLoading: false
          })
          message.success({
            content: "交易已经上链",
            className: 'custom-class',
            style: {
              marginTop: '10vh',
            },
          })
        })
        .on('error', function (error) {
          obj.setState({
            onLoading: false
          })
          message.error({
            content: `Error: ${error.message}`,
            className: 'custom-class',
            style: {
              marginTop: '10vh',
            },
          })
        })
    }
  }

  handleApprove = async (e) => {
    const accounts = await window.ethereum.request({method: 'eth_requestAccounts'})
    const account = accounts[0]

    this.setState({
      onLoading: true
    })
    let obj = this
    try{
      const token_contract = new web3.eth.Contract(abi, this.state.tokenAddr)
      var gasPrice = await web3.eth.getGasPrice()
      var new_gas_price = Math.floor(parseInt(gasPrice) * 1.5).toString()
      var price = this.state.price.toString()

      token_contract.methods.approve(this.sparkAddr, price).send({
        from: account,
        gasPrice: new_gas_price
      })
        .on('receipt', function (receipt) {
          obj.setState({
            onLoading: false,
            approved: true
          })
          message.success({
            content: "已经成功授权合约",
            className: 'custom-class',
            style: {
              marginTop: '10vh',
            },
          })
        })
        .on('error', function (error) {
          obj.setState({
            onLoading: false,
          })
          message.error({
            content: `Error: ${error.message}`,
            className: 'custom-class',
            style: {
              marginTop: '10vh',
            },
          })
        })
    } catch (error) {
      message.error({
        content: `Error: ${error}`,
        className: 'custom-class',
        style: {
          marginTop: '10vh',
        },
      })
    }
  }

  handleGetPrice = (value) => {
    this.setState({
      price: value,
    })
  }

  handleGetAddr = (e) => {
    this.setState({
      address: e.target.value,
    })
  }

  render () {
    const {classes} = this.props
    
    const buyButton = ()=> {
      if(this.state.approvedAddr.toLowerCase() !== this.state.currentAcc.toLowerCase()){
        return (
          <Button
            variant = 'outlined'
            startIcon={<DollarCircleOutlined style={{ fontSize: 22 }}/>}
            className={classes.btnDisable}
            disabled
          >
            购买
          </Button>
        )
      } else if (! this.state.approved) {
        return(
          <Button
            variant = 'outlined'
            color = 'primary'
            className = { classes.btnSell }
            onClick={this.handleApprove}
          >
            授权合约
          </Button>
        )
      } else {
        return(
          <Button
            variant='outlined'
            startIcon={<DollarCircleOutlined style={{ fontSize: 22 }} />}
            className={classes.btnSell}
            onClick={this.handleBuy}
          >
            购买
          </Button>
        )
      }
    }

    return(
      <Spin spinning={this.state.onLoading} size='large'>
        <ThemeProvider theme={theme}>
          <TopBar />
          <Container component="main" className={classes.container}>
            <Button
              startIcon={<ArrowLeftOutlined style={{ fontSize: '2rem' }} />}
              href='/'
              style={{ marginTop: 20, marginBottom: 10, fontSize: '2rem' }}
            >
              回到首页
            </Button>
            <div className={classes.paper}>
              {this.state.loadItem ? (
                <Grid container spacing={5} className={classes.content}>
                  <Grid item xs={4}>
                    <Skeleton variant="rect" width={300} height={500} className={classes.img} />
                  </Grid>

                  <Grid item xs style={{ marginLeft: '5%', maxWidth: 500, minWidth: 350 }}>
                    <Skeleton animation="wave" variant="text" width={'70%'} height={30} />
                    <Skeleton animation="wave" variant="text" width={'100%'} height={70} />
                    <Skeleton animation="wave" variant="rect" width={'100%'} height={300} style={{ marginBottom: 50 }} />
                    {buyButton()}
                  </Grid>
                </Grid>
              ):(
                <Grid container className={classes.content} spacing={5}>
                  <Grid item xs={4} style={{ maxWidth: 600 }}>
                    <Paper className={classes.imgPaper}>
                      <img style={{ width: 300, marginTop: 20, marginBottom: 50, objectFit: 'contain' }} src={this.state.coverURL}></img>
                    </Paper>
                  </Grid>

                  <Grid item xs className={classes.content2}>
                    <Typography color="inherit" align="left" color="textSecondary" noWrap style={{ fontFamily: 'Teko', fontSize: 16, marginTop: '2%' }}>
                      #{this.state.NFTId}
                    </Typography>
                    <Typography color="inherit" align="left" noWrap style={{ fontFamily: 'Teko', fontSize: 34 }}>
                      <b>{this.state.name}</b>
                    </Typography>
                    <Typography align="justify" color="textSecondary" paragraph style={{ marginTop: '2%', maxWidth: '100%', fontSize: 16 }}>
                      {this.state.description}
                    </Typography>
                    <Typography align="left" color="textPrimary" paragraph style={{ marginTop: '2%', maxWidth: '65%', fontSize: 20 }}>
                      创作者分红比例: {this.state.bonusFee} %
                    </Typography>
                    <Typography align="left" color="textPrimary" paragraph style={{ marginTop: '2%', maxWidth: '100%', fontSize: 18 }}>
                      售价: {this.state.priceString}
                    </Typography>
                    <Typography align="left" color="textPrimary" paragraph style={{ marginTop: '1%', maxWidth: '65%', fontSize: 12 }}>
                      当前拥有者: {this.state.owner}
                    </Typography>
                    <Typography align="left" color="textPrimary" paragraph style={{ maxWidth: '65%', fontSize: 12 }}>
                      当前拥有的子节点数量: {this.state.childrenNum}
                    </Typography>
                    <Typography align="left" color="textPrimary" paragraph style={{ maxWidth: '65%', fontSize: 12 }}>
                      NFT作品是否加密: {this.state.encrypted}
                    </Typography>
                    {buyButton()}
                  </Grid>
                </Grid>
              )}
            </div>
          </Container>
        </ThemeProvider>
      </Spin>
    )
  }
}

export default withStyles(styles, { withTheme: true})(BuySingle)