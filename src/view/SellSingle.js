import React, { Component } from 'react'
import '../styles/App.css'
import { Button, Grid } from '@material-ui/core'
import { createTheme, ThemeProvider, withStyles } from '@material-ui/core/styles'
import TopBar from '../components/TopBar'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from '@material-ui/core'
import { Typography, Paper, Container } from '@material-ui/core'
import axios from 'axios'
import { DollarCircleOutlined, ArrowLeftOutlined, CopyOutlined } from '@ant-design/icons'
import { Spin, message } from 'antd'
import { Input, InputNumber } from 'antd'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import contract from '../utils/contract'
import web3 from '../utils/web3'
import Skeleton from '@material-ui/lab/Skeleton'
import config from '../global/config'
const { gateway, backend } = config
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

const styles = (theme) => ({
  container: {
    maxWidth: 1500,
  },
  paper: {
    marginTop: theme.spacing(1),
    textAlign: 'center',
    maxWidth: 1500,
  },
  btnSell: {
    margin: theme.spacing(1),
    fontSize: 16,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#2196f3',
    color: '#2196f3',
    marginLeft: '10%',
    width: 100,
  },
  content: {
    fontFamily: 'Teko',
    [theme.breakpoints.between('xs', 'sm')]: {
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    },
    [theme.breakpoints.between('sm', 'md')]: {
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    },
    [theme.breakpoints.between('md', 'lg')]: {
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    },
    [theme.breakpoints.between('lg', 'xl')]: {
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
    [theme.breakpoints.up('xl')]: {
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
  },
  img: {
    width: 300,
    marginBottom: 50,
    [theme.breakpoints.between('xs', 'sm')]: {
      marginLeft: '20%',
    },
    [theme.breakpoints.between('sm', 'md')]: {
      marginLeft: '20%',
    },
    [theme.breakpoints.between('md', 'lg')]: {
      marginLeft: '20%',
    },
    [theme.breakpoints.between('lg', 'xl')]: {
      marginLeft: '30%',
    },
    [theme.breakpoints.up('xl')]: {
      marginLeft: '40%',
    },
  },
  content2: {
    fontFamily: 'Teko',
    textAlign: 'center',
    [theme.breakpoints.between('xs', 'sm')]: {
      maxWidth: 500,
    },
    [theme.breakpoints.between('sm', 'md')]: {
      marginLeft: 90,
      maxWidth: 500,
    },
    [theme.breakpoints.between('md', 'lg')]: {
      marginLeft: 80,
      maxWidth: 500,
    },
    [theme.breakpoints.between('lg', 'xl')]: {
      marginLeft: 50,
      maxWidth: 500,
    },
    [theme.breakpoints.up('xl')]: {
      marginLeft: 60,
      maxWidth: 500,
    },
  },
  share: {
    fontFamily: 'Teko',
    marginBottom: '10%',
    [theme.breakpoints.between('xs', 'sm')]: {
      fontSize: 14,
      // width: '5%'
    },
    [theme.breakpoints.between('sm', 'md')]: {
      fontSize: 16,
    },
    [theme.breakpoints.between('md', 'lg')]: {
      fontSize: 18,
    },
    [theme.breakpoints.between('lg', 'xl')]: {
      fontSize: 20,
    },
    [theme.breakpoints.up('xl')]: {
      fontSize: 20,
    },
  },
  imgPaper: {
    width: 350,
    marginBottom: 50,
    backgroundColor: '#EFEBE9',
    [theme.breakpoints.between('sm', 'md')]: {
      marginLeft: '20%',
    },
    [theme.breakpoints.between('md', 'lg')]: {
      marginLeft: '20%',
    },
    [theme.breakpoints.between('lg', 'xl')]: {
      marginLeft: '30%',
    },
    [theme.breakpoints.up('xl')]: {
      marginLeft: '35%',
    },
  },
  inputNum: {
    height: 40,
    borderRadius: 5,
    width: 550,
    fontSize: 20,
  },
  input: {
    height: 40,
    borderRadius: 5,
  },
})
class SellSingle extends Component {
  state = {
    name: '',
    bonusFee: 0,
    coverURL: '',
    description: '',
    price: 0,
    ipfsHashMeta: '',
    open: false,
    toAddress: '',
    NFTId: '',
    onSale: false,
    copied: false,
    onLoading: false,
    owner: '',
    currentAcc: '',
    childrenNum: 0,
    loadItem: true,
    tokenAddr: null,
    tokenSymbol: '',
    decimal: 0,
  }

  async componentDidMount() {
    const chainId = await window.ethereum.request({ method: 'eth_chainId' })
    if (chainId !== '0x89') {
      alert('请切换至Polygon 主网络')
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [
          {
            chainId: '0x89',
          },
        ],
      })
    }

    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    })
    const account = accounts[0]
    let obj = this
    this.setState({
      currentAcc: account,
      NFTId: this.props.match.params.NFTId,
    })
    const issueId = await contract.methods.getIssueIdByNFTId(this.state.NFTId).call()
    const royalty = await contract.methods.getRoyaltyFeeByIssueId(issueId).call()
    const metadata = await contract.methods.tokenURI(this.props.match.params.NFTId).call()
    let hash = metadata.split('/')
    this.setState({ ipfsHashMeta: hash[hash.length - 1] })
    var url = gateway + this.state.ipfsHashMeta
    try {
      const res = await axios({ method: 'get', url: url, timeout: 1000 * 2 })
      let content = res.data
      let bonus = content.attributes[0].value
      // let encrypted = content.attributes[3].value
      this.setState({
        loadItem: false,
        name: content.name,
        description: content.description,
        bonusFee: bonus,
        coverURL: content.image,
      })
    } catch (error) {
      var name_holder = 'SparkNFT#' + this.props.match.params.NFTId
      obj.setState({
        loadItem: false,
        name: name_holder,
        description: '暂时无法获取到该nft的相关描述',
        bonusFee: royalty,
        coverURL: 'https://via.placeholder.com/100x140.png?text=SparkNFT',
      })
      console.debug(error)
    }

    var owner = await contract.methods.ownerOf(this.props.match.params.NFTId).call()
    var price = await contract.methods.getTransferPriceByNFTId(this.props.match.params.NFTId).call()
    var token_addr = await contract.methods.getTokenAddrByNFTId(this.props.match.params.NFTId).call()
    if (price == '0') {
      this.setState({
        owner: owner.toLowerCase(),
        onSale: false,
      })
    } else {
      this.setState({
        owner: owner.toLowerCase(),
        onSale: true,
      })
    }

    if (token_addr == '0x0000000000000000000000000000000000000000') {
      this.setState({
        tokenAddr: token_addr,
        tokenSymbol: 'MATIC',
        decimal: 18,
      })
    } else {
      try {
        const token_contract = new web3.eth.Contract(abi, token_addr)
        const token_symbol = await token_contract.methods.symbol().call()
        const decimal = await token_contract.methods.decimals().call()
        this.setState({
          tokenAddr: token_addr,
          tokenSymbol: token_symbol,
          decimal: decimal,
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

    const child_url = backend + '/api/v1/nft/info?nft_id=' + this.state.NFTId
    try {
      const res = await axios.get(child_url)
      var children_num = res.data.children_count
      this.setState({
        childrenNum: children_num,
      })
    } catch (error) {
      if (error.response === undefined) {
        message.error({
          content: '错误：服务器未响应',
          className: 'custom-class',
          style: {
            marginTop: '10vh',
          },
        })
        return
      }
      if (error.response.status === 400 && error.response.data.message.includes('children not found')) {
        console.debug('no children')
      } else {
        message.error({
          content: `获取nft子节点情况页面失败： ${error}`,
          className: 'custom-class',
          style: {
            marginTop: '10vh',
          },
        })
      }
    }
  }

  handleClickOpen = () => {
    this.setState({
      open: true,
    })
  }

  handleClose = () => {
    this.setState({
      open: false,
    })
  }

  handleGetPrice = (value) => {
    this.setState({
      price: value,
    })
  }

  handleGetAddr = (e) => {
    this.setState({
      toAddress: e.target.value,
    })
  }

  handleClickLink = () => {
    var new_url = '/#/NFT/' + this.state.NFTId
    window.open(new_url, '_self')
  }

  sell = async () => {
    this.setState({
      open: false,
    })
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    })
    const account = accounts[0]

    var price_with_decimal = this.state.price * 10 ** this.state.decimal
    price_with_decimal = price_with_decimal.toString()
    var obj = this
    this.setState({
      onLoading: true,
    })
    var gasPrice = await web3.eth.getGasPrice()
    var new_gas_price = Math.floor(parseInt(gasPrice) * 1.5).toString()
    contract.methods
      .determinePriceAndApprove(this.state.NFTId, price_with_decimal, this.state.toAddress)
      .send({
        from: account,
        gasPrice: new_gas_price,
      })
      .on('receipt', function () {
        obj.setState({
          onSale: true,
          onLoading: false,
        })
        message.success({
          content: '已经成功授权买方',
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
  }

  render() {
    const { classes } = this.props
    const sell_info = () => {
      let host = window.location.host
      let toUrl = 'https://' + host + '/#/buySingle/' + this.state.NFTId
      if (this.state.onSale) {
        return (
          <Grid container>
            <Grid item xs>
              <Typography color="inherit" align="center" noWrap className={classes.share}>
                请将下方链接分享给买方，
                <br /> 买方会进入此链接来购买这个NFT <br />
                {toUrl}
                <CopyToClipboard text={toUrl} onCopy={() => this.setState({ copied: true })}>
                  <IconButton color="primary" aria-label="upload picture" component="span">
                    <CopyOutlined />
                  </IconButton>
                </CopyToClipboard>
              </Typography>
            </Grid>
          </Grid>
        )
      }
    }

    const showSellBtn = () => {
      if (this.state.currentAcc == this.state.owner) {
        return (
          <Button
            variant="outlined"
            color="primary"
            startIcon={<DollarCircleOutlined style={{ fontSize: 22 }} />}
            className={classes.btnSell}
            onClick={this.handleClickOpen}
          >
            售卖
          </Button>
        )
      } else {
        return (
          <Button
            variant="outlined"
            startIcon={<DollarCircleOutlined style={{ fontSize: 22 }} />}
            className={classes.btnSell}
            disabled
          >
            售卖
          </Button>
        )
      }
    }

    return (
      <Spin spinning={this.state.onLoading} size="large">
        <ThemeProvider theme={theme}>
          <TopBar />
          <Container component="main" className={classes.container}>
            <Button
              startIcon={<ArrowLeftOutlined style={{ fontSize: 22 }} />}
              onClick={this.handleClickLink}
              style={{ marginTop: 50, marginBottom: 100, fontSize: 22 }}
            >
              返回
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
                    <Skeleton
                      animation="wave"
                      variant="rect"
                      width={'100%'}
                      height={300}
                      style={{ marginBottom: 50 }}
                    />
                    {showSellBtn()}
                  </Grid>
                </Grid>
              ) : (
                <Grid container className={classes.content} spacing={5}>
                  <Grid item xs={4} style={{ maxWidth: 600 }}>
                    <Paper className={classes.imgPaper}>
                      <img
                        style={{
                          width: 300,
                          marginTop: 20,
                          marginBottom: 50,
                          objectFit: 'contain',
                        }}
                        src={this.state.coverURL}
                      ></img>
                    </Paper>
                  </Grid>

                  <Grid item xs className={classes.content2}>
                    <Typography
                      color="inherit"
                      align="left"
                      // eslint-disable-next-line react/jsx-no-duplicate-props
                      color="textSecondary"
                      noWrap
                      style={{
                        fontFamily: 'Teko',
                        fontSize: 16,
                        marginTop: '2%',
                      }}
                    >
                      #{this.state.NFTId}
                    </Typography>
                    <Typography
                      color="inherit"
                      align="left"
                      noWrap
                      style={{
                        fontFamily: 'Teko',
                        fontSize: 30,
                        marginTop: '2%',
                      }}
                    >
                      <b>{this.state.name}</b>
                    </Typography>
                    <Typography
                      align="justify"
                      color="textSecondary"
                      paragraph
                      style={{
                        marginTop: '2%',
                        maxWidth: '100%',
                        fontSize: 16,
                      }}
                    >
                      {this.state.description}
                    </Typography>
                    <Typography
                      align="left"
                      color="textPrimary"
                      paragraph
                      style={{ marginTop: '6%', maxWidth: '65%', fontSize: 20 }}
                    >
                      创作者分红比例: {this.state.bonusFee} %
                    </Typography>
                    <Typography align="left" color="textPrimary" paragraph style={{ maxWidth: '65%', fontSize: 12 }}>
                      当前拥有的子节点数量: {this.state.childrenNum}
                    </Typography>
                    {showSellBtn()}
                    <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                      <DialogTitle id="form-dialog-title">填写售卖信息</DialogTitle>
                      <DialogContent>
                        <DialogContentText>
                          请在下方区域填写你希望售卖的价格，以及售卖对象的钱包地址。
                        </DialogContentText>
                        <label style={{ fontSize: 14, marginBottom: 10 }}>售卖价格 ({this.state.tokenSymbol})*</label>
                        <InputNumber
                          defaultValue={0}
                          min={0}
                          onChange={this.handleGetPrice}
                          className={classes.inputNum}
                        />
                        <label
                          style={{
                            fontSize: 14,
                            marginBottom: 10,
                            marginTop: 10,
                          }}
                        >
                          买方钱包地址 *
                        </label>
                        <Input
                          placeholder="买方钱包地址"
                          allowClear
                          id="pubName"
                          onChange={this.handleGetAddr}
                          className={classes.input}
                        />
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                          取消
                        </Button>
                        <Button variant="contained" onClick={this.sell} color="primary">
                          卖出
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </Grid>
                </Grid>
              )}
            </div>
            <div style={{ marginTop: 50 }}>{sell_info()}</div>
          </Container>
        </ThemeProvider>
      </Spin>
    )
  }
}

export default withStyles(styles, { withTheme: true })(SellSingle)
//todo 涉及交易
