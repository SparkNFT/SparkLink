import React, { Component } from 'react'
import './App.css'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { createTheme, ThemeProvider, withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import TopBar from "./TopBar"
import { Paper, Container, Link } from '@material-ui/core'
import axios from 'axios'
import contract from './contract'
import web3 from './web3'
import { ArrowLeftOutlined, FireOutlined } from '@ant-design/icons'
import Skeleton from '@material-ui/lab/Skeleton'
import { Progress, message, Spin } from 'antd'

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
    // backgroundColor: '#2196f3'
  },
  btnMain: {
    marginTop: theme.spacing(3),
    color: '#FFFFFF',
    backgroundColor: '#03A9F4',
    borderWidth: 3,
    // borderColor: '#03A9F4',
    fontSize: 16,
    borderRadius: 25,
    width: 150,
    maxWidth: '20rem',
    minWidth: '10rem',
  },
  btnSecond: {
    marginTop: theme.spacing(3),
    color: '#03A9F4',
    borderWidth: 3,
    borderColor: '#03A9F4',
    fontSize: 16,
    borderRadius: 25,
    width: 150,
    maxWidth: '20rem',
    minWidth: '10rem',
  },
  paper: {
    marginTop: theme.spacing(1),
    textAlign: 'center',
    maxWidth: 1400,
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
  imagePaper: {

    [theme.breakpoints.between('xs', 'sm')]: {
      backgroundColor: '#EFEBE9', width: 330, height: 420, marginLeft: 10
    },
    [theme.breakpoints.between('sm', 'md')]: {
      backgroundColor: '#EFEBE9', width: 340, height: 440, marginLeft: 10
    },
    [theme.breakpoints.between('md', 'lg')]: {
      backgroundColor: '#EFEBE9', width: 350, height: 465, marginLeft: 10
    },
    [theme.breakpoints.between('lg', 'xl')]: {
      backgroundColor: '#EFEBE9', width: 350, marginLeft: 10
    },
    [theme.breakpoints.up('xl')]: {
      backgroundColor: '#EFEBE9', width: 350, marginLeft: 10
    },
  },
  imageStyle: {
    objectFit: 'contain',
    [theme.breakpoints.between('xs', 'sm')]: {
      width: 280,
      height: 365,
      marginTop: 20,
      marginBottom: 50
    },
    [theme.breakpoints.between('sm', 'md')]: {
      width: 290,
      height: 385,
      marginTop: 20,
      marginBottom: 50
    },
    [theme.breakpoints.between('md', 'lg')]: {
      width: 300,
      height: 420,
      marginTop: 20,
      marginBottom: 50
    },
    [theme.breakpoints.between('lg', 'xl')]: {
      width: 300,
      marginTop: 20,
      marginBottom: 50
    },
    [theme.breakpoints.up('xl')]: {
      width: 300,
      marginTop: 20,
      marginBottom: 50
    },
  },
  content2: {
    fontFamily: 'Teko',
    [theme.breakpoints.between('xs', 'sm')]: {
      marginLeft: 10, maxWidth: 500
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
  title: {
    fontFamily: 'Teko',
    [theme.breakpoints.between('xs', 'sm')]: {
      fontSize: 48,
    },
    [theme.breakpoints.between('sm', 'md')]: {
      fontSize: 60,
    },
    [theme.breakpoints.between('md', 'lg')]: {
      fontSize: 70,
    },
    [theme.breakpoints.between('lg', 'xl')]: {
      fontSize: 75,
    },
    [theme.breakpoints.up('xl')]: {
      fontSize: 80,
    },
  },

})

class NFTSpark extends Component {
  gateway = 'https://coldcdn.com/api/cdn/v5ynur/ipfs/'
  backend = 'https://api.sparklink.io'
  sparkAddr = '0xb42d4525841008A69E427026DF354067fD6A524f'
  state = {
    Name: '',
    Description: '',
    BonusFee: 0,
    Cover: '',
    price: '',
    priceString: '',
    onLoading: false,
    loadItem: true,
    open: false,
    approved: false,
    tokenAddr: '',
    tokenSymbol: '',
    isEncrypt: true,
    percentage: 0,
    showProgress: false,
    fileType: '',
    remainShillTimes: 0,
    maxShillTimes: 0,
  }

  async componentDidMount (){
    const chainId = await window.ethereum.request({ method: 'eth_chainId' })
    if (chainId !== '0x89') {
      alert("请切换至Polygon 主网络")
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{
          chainId: '0x89'
        }]
      })
    }

    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    const account = accounts[0]

    const meta = await contract.methods.tokenURI(this.props.match.params.id).call()
    let hash = meta.split('/')
    this.setState({ hash: hash[hash.length - 1] })
    let isEncrypt
    try {
      var url = this.gateway + this.state.hash
      const res = await axios.get(url)
      let data = res.data
      let bouns = data.attributes[0].value
      let fileAddr = data.attributes[1].value
      let fileType = data.attributes[2].value
      if (data.attributes[3].value === "FALSE") {
        isEncrypt = false
      } else {
        isEncrypt = true
      }
      this.setState({
        Name: data.name,
        Description: data.description,
        BonusFee: bouns,
        Cover: data.image,
        fileType: fileType,
        dataUrl: fileAddr,
        isEncrypt: isEncrypt
      })
    } catch (error){
      message.error({
        content: `Error: ${error}`,
        className: 'custom-class',
        style: {
          marginTop: '10vh',
        },
      })
    }

    const price = await contract.methods.getShillPriceByNFTId(this.props.match.params.id).call()
    const token_addr = await contract.methods.getTokenAddrByNFTId(this.props.match.params.id).call()

    this.setState({
      price: price,
      tokenAddr: token_addr
    })

    if (token_addr == '0x0000000000000000000000000000000000000000') {
      var price_with_decimal = price / (10 ** 18)
      price_with_decimal = price_with_decimal + " MATIC"
      this.setState({
        priceString: price_with_decimal,
        approved: true
      })
    } else {
      try {
        const token_contract = new web3.eth.Contract(abi, token_addr)
        const decimals = await token_contract.methods.decimals().call()
        const token_symbol = await token_contract.methods.symbol().call()
        var price_with_decimal = price / (10 ** decimals)
        price_with_decimal = price_with_decimal + " " + token_symbol
        this.setState({ priceString: price_with_decimal })
        const approved_amount = await token_contract.methods.allowance(account, this.sparkAddr).call()
        if (approved_amount >= price) {
          this.setState({
            approved: true
          })
        } else {
          this.setState({
            approved: false
          })
        }
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

    const leafUrl = this.backend + '/api/v1/nft/info?nft_id=' + this.props.match.params.id
    try{
      const res = await axios.get(leafUrl)
      var children_num = res.data.children_count
      var remain_shill_times = res.data.max_shill_times - res.data.shill_times
      var max_shill_times = res.data.max_shill_times
      this.setState({
        remainShillTimes: remain_shill_times,
        maxShillTimes: max_shill_times
      })
      if (res.data.suggest_next_nft === this.props.match.params.id) {
        this.setState({
          childrenNum: children_num,
          recommendNFT: res.data.suggest_next_nft,
          showRecommend: false,
        })
      } else if (res.data.suggest_next_nft === '0') {
        this.setState({
          childrenNum: children_num,
          recommendNFT: res.data.suggest_next_nft,
          showRecommend: false
        })
      } else {
        this.setState({
          childrenNum: children_num,
          recommendNFT: res.data.suggest_next_nft,
          showRecommend: true
        })
      }
    } catch (error) {
      if (error.response === undefined) {
        message.error({
          content: "错误：服务器未响应",
          className: 'custom-class',
          style: {
            marginTop: '10vh',
          },
        })
        return
      }
      if (error.response.status === 400 && error.response.data.message.includes("children not found")) {
        console.debug("no children")
      } else {
        message.error({
          content: `获取nft子节点情况页面失败： ${error}`,
          className: 'custom-class',
          style: {
            marginTop: '10vh',
          },
        })
      }
    } finally {
      this.setState({
        loadItem: false
      })
    }

  }

  handleClickLink = (event) => {
    var new_url = '/#/NFT/Spark/' + this.state.recommendNFT
    window.open(new_url)
  }

  downloadIPFS = async (event) => {
    let obj = this
    let dataSplits = this.state.dataUrl.split('/')
    var dataHash = dataSplits[dataSplits.length - 1]
    var dataUrl = this.gateway + dataHash
    this.setState({
      showProgress: true
    })
    var open_config = {
      url: dataUrl, //your url
      method: 'GET',
      responseType: 'blob', // important
      onDownloadProgress(progress) {
        var percentage = Math.round(progress.loaded / progress.total * 100)
        obj.setState({
          percentage: percentage
        })
      }
    }

    try {
      const response = await axios(open_config)
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.style.display = 'none'
      var suffix = '.' + this.state.fileType
      var fileName = this.state.Name + suffix
      link.download = fileName
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (error) {
      message.error({
        content: `Error: ${error}`,
        className: 'custom-class',
        style: {
          marginTop: '10vh',
        },
      })
    } finally {
      this.setState({ showProgress: false })
    }
  }

  approve = async (event) => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    const account = accounts[0]
    this.setState({ onLoading: true })

    let obj = this
    try{
      const price = this.state.price.toString()
      const token_contract = new web3.eth.Contract(abi, this.state.tokenAddr)
      var gasPrice = await web3.eth.getGasPrice()
      var new_gas_price = Math.floor(parseInt(gasPrice) * 1.5).toString()
      token_contract.methods.approve(this.sparkAddr, price).send({
        from: account,
        gasPrice: new_gas_price
      })
        .on('receipt', function (receipt) {
          message.success({
            content: "已经成功授权合约",
            className: 'custom-class',
            style: {
              marginTop: '10vh',
            },
          })
          obj.setState({
            onLoading: false,
            approved: true
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
    } catch (error){
      message.error({
        content: `Error: ${error}`,
        className: 'custom-class',
        style: {
          marginTop: '10vh',
        },
      })
    }
  }

  shill = async (event) => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    const account = accounts[0]
    var gasPrice = await web3.eth.getGasPrice()
    var new_gas_price = Math.floor(parseInt(gasPrice) * 1.5).toString()
    let obj = this

    this.setState({ onLoading: true });
    if (this.state.tokenAddr == '0x0000000000000000000000000000000000000000') {
      contract.methods.acceptShill(this.props.match.params.id).send({
        from: account,
        value: this.state.price,
        gasPrice: new_gas_price
      })
        .on('receipt', function (receipt) {
          message.success({
            content: "交易已经上链",
            className: 'custom-class',
            style: {
              marginTop: '10vh',
            },
          })
          obj.setState({
            onLoading: false,
            onSale: true
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
    } else {
      contract.methods.acceptShill(this.props.match.params.id).send({
        from: account,
        gasPrice: new_gas_price
      })
        .on('receipt', function (receipt) {
          message.success({
            content: "交易已经上链",
            className: 'custom-class',
            style: {
              marginTop: '10vh',
            },
          })
          obj.setState({
            onLoading: false,
            onSale: true
          });
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

  }

  render() {
    const {classes} = this.props
    const showBtn = () => {
      if (this.state.showRecommend) {
        return (
          <div>
            {this.state.isEncrypt ? (
              <Grid container justifyContent="space-around" >
                <Button size="large" style={{ fontSize: '3rem' }} variant="contained" className={classes.btnMain} disabled>
                  <Typography variant="button" component="h2" gutterBottom style={{ color: '#FFFFFF' }}>
                    <font size="4"> 下 载 </font>
                  </Typography>
                </Button>
                <Grid item>
                  <Button size="large" style={{ fontSize: '2rem' }} variant="outlined" color="secondary" target="_blank" className={classes.btnSecond} startIcon={<FireOutlined />} disabled>
                    <Typography variant="button" component="h2" gutterBottom >
                      <font size="4"> 铸造  </font>
                    </Typography>
                  </Button>
                </Grid>
              </Grid>
            ) : (
              <Grid container direction="row" justifyContent="space-around" >
                <Grid item>
                  <Button size="large" style={{ fontSize: '3rem' }} variant="contained" className={classes.btnMain} onClick={this.downloadIPFS}>
                    <Typography variant="button" component="h2" gutterBottom style={{ color: '#FFFFFF' }}>
                      <font size="4"> 下 载 </font>
                    </Typography>
                  </Button>
                </Grid>
                <Grid item>
                  <Button size="large" style={{ fontSize: '2rem' }} variant="outlined" color="secondary" target="_blank" className={classes.btnSecond} startIcon={<FireOutlined />}disabled>
                    <Typography variant="button" component="h2" gutterBottom >
                      <font size="4"> 铸造  </font>
                    </Typography>
                  </Button>
                </Grid>
              </Grid>
            )}
          </div>
        )
      } else if (!this.state.approved) {
        return (
          <div>
            {this.state.isEncrypt ? (
              <Grid container justifyContent="space-around" >
                <Button size="large" style={{ fontSize: '3rem' }} variant="contained" color="primary" className={classes.btnMain} disabled>
                  <Typography variant="button" component="h2" gutterBottom style={{ color: '#FFFFFF' }}>
                    <font size="4"> 下 载 </font>
                  </Typography>
                </Button>
                <Grid item>
                  <Button size="large" style={{ fontSize: '3rem' }} variant="outlined" color="secondary" target="_blank" className={classes.btnSecond} onClick={this.approve}>
                    <Typography variant="button" component="h2" gutterBottom >
                      <font size="4"> 授权合约  </font>
                    </Typography>
                  </Button>
                </Grid>
              </Grid>
            ) : (
              <Grid container direction="row" justifyContent="space-around" >
                <Grid item>
                  <Button size="large" style={{ fontSize: '3rem' }} variant="contained" color="primary" className={classes.btnMain} onClick={this.downloadIPFS}>
                    <Typography variant="button" component="h2" gutterBottom style={{ color: '#FFFFFF' }}>
                      <font size="4"> 下载 </font>
                    </Typography>
                  </Button>
                </Grid>
                <Grid item>
                  <Button size="large" style={{ fontSize: '3rem' }} variant="outlined" color="secondary" target="_blank" className={classes.btnSecond} onClick={this.approve}>
                    <Typography variant="button" component="h2" gutterBottom >
                      <font size="4"> 授权合约  </font>
                    </Typography>
                  </Button>
                </Grid>
              </Grid>
            )}
          </div>
        )
      } else {
        return (
          <div>
            {this.state.isEncrypt ? (
              <Grid container justifyContent="space-around" >
                <Button size="large" style={{ fontSize: '3rem' }} variant="contained" color="primary" className={classes.btnMain} disabled>
                  <Typography variant="button" component="h2" gutterBottom style={{ color: '#FFFFFF' }}>
                    <font size="4"> 下 载 </font>
                  </Typography>
                </Button>
                <Grid item>
                  <Button size="large" style={{ fontSize: '3rem' }} variant="outlined" color="secondary" target="_blank" className={classes.btnSecond} startIcon={<FireOutlined />} onClick={this.shill}>
                    <Typography variant="button" component="h2" gutterBottom >
                      <font size="4"> 铸造  </font>
                    </Typography>
                  </Button>
                </Grid>
              </Grid>
            ) : (
              <Grid container direction="row" justifyContent="space-around" >
                <Grid item>
                  <Button size="large" style={{ fontSize: '3rem' }} variant="contained" color="primary" className={classes.btnMain} onClick={this.downloadIPFS}>
                    <Typography variant="button" component="h2" gutterBottom style={{ color: '#FFFFFF' }}>
                      <font size="4"> 下 载 </font>
                    </Typography>
                  </Button>
                </Grid>
                <Grid item>
                  <Button size="large" style={{ fontSize: '3rem' }} variant="outlined" color="secondary" target="_blank" className={classes.btnSecond} startIcon={<FireOutlined />} onClick={this.shill}>
                    <Typography variant="button" component="h2" gutterBottom >
                      <font size="4"> 铸造  </font>
                    </Typography>
                  </Button>
                </Grid>
              </Grid>
            )}
          </div>
        )
      }
    }

    if(this.state.showProgress){
      return(
        <Spin spinning={this.state.onLoading} size='large'>
          <ThemeProvider theme={theme}>
            <TopBar />
            <div style={{ textAlign: 'center', marginTop: '2%', marginLeft: 40 }}>
              <Typography color="textPrimary" gutterBottom style={{ marginRight: 50, marginTop: 20, fontSize: 24 }}>
                <b>正在下载文件</b>
              </Typography>
            </div>
            <div style={{ textAlign: 'center', marginTop: '10%' }}>
              <Progress type="circle" percent={this.state.percentage} width={200} />
            </div>
          </ThemeProvider>
        </Spin>
      )
    } else {
      return (
        <Spin spinning={this.state.onLoading} size='large'>
          <ThemeProvider theme={theme}>
            <TopBar />
            <Container component="main" className={classes.container}>
              <Button
                startIcon={<ArrowLeftOutlined style={{ fontSize: '2rem' }} />}
                href='/#/collections'
                style={{ marginTop: 20, marginBottom: 10, fontSize: '2rem' }}
              >
                回到我的收藏馆
              </Button>
              <Grid container direction="row" justifyContent="center" alignItems="center" xs={12}>
                <Typography color="inherit" noWrap className={classes.title}>
                  🔥 NFT 🔥
                </Typography>
              </Grid>

              <div className={classes.paper}>
                {this.state.loadItem ? (
                  <Grid container spacing={5} className={classes.content}>
                    <Grid item>
                      <Skeleton variant="rect" width={300} height={500} style={{ width: 370, marginLeft: 50, marginBottom: 50 }} />
                    </Grid>
                    <Grid item style={{ marginLeft: '5%' }}>
                      <Skeleton animation="wave" variant="text" width={200} height={30} />
                      <Skeleton animation="wave" variant="text" width={400} height={70} />
                      <Skeleton animation="wave" variant="rect" width={500} height={300} style={{ marginBottom: 50 }} />
                    </Grid>
                  </Grid>
                ):(
                  <Grid container direction="row" justifyContent="space-between" className={classes.content}>
                    <Grid item style={{ maxWidth: 200 }}>
                      <Paper className={classes.imagePaper}>
                        <img className={classes.imageStyle} src={this.state.Cover}></img>
                      </Paper>
                    </Grid>

                    <Grid xs={2}></Grid>

                    <Grid item xs className={classes.content2} >
                      <Typography color="inherit" align="left" color="textSecondary" noWrap style={{ fontFamily: 'Teko', fontSize: 16, marginTop: '2%' }}>
                        #{this.props.match.params.id}
                      </Typography>
                      <Typography color="inherit" align="left" noWrap style={{ fontFamily: 'Teko', fontSize: 34, marginTop: '2%' }}>
                        <b>{this.state.Name}</b>
                      </Typography>
                      <Typography align="justify" color="textSecondary" paragraph style={{ marginTop: '2%', maxWidth: '100%', fontSize: 16 }}>
                        {this.state.Description}
                      </Typography>
                      <Typography align="left" color="textPrimary" paragraph style={{ marginTop: '6%', maxWidth: '100%', fontSize: 24 }}>
                        点火价格: {this.state.priceString}
                      </Typography>
                      <Typography align="left" color="textPrimary" paragraph style={{ maxWidth: '100%', fontSize: 18 }}>
                        最大分享次数: {this.state.maxShillTimes} 次
                      </Typography>
                      <Typography align="left" color="textPrimary" paragraph style={{ maxWidth: '100%', fontSize: 18 }}>
                        剩余分享次数: {this.state.remainShillTimes} 次
                      </Typography>
                      {this.state.isEncrypt ?
                        (
                          <Typography align="left" color="textPrimary" paragraph style={{ maxWidth: '100%', fontSize: 16 }}>
                            加密作品
                          </Typography>
                        ) : (
                          <Typography align="left" color="textPrimary" paragraph style={{ maxWidth: '100%', fontSize: 16 }}>
                            开源作品
                          </Typography>
                        )}
                      {showBtn()}
                    </Grid>
                  </Grid>
                  
                )}

                {this.state.showRecommend ? (
                  <Grid style={{marginTop: 50}}>
                    <Typography variant="h4" gutterBottom >
                      此NFT的子节点已经售完，我们给您推荐了其他还能购买的节点：
                    </Typography>
                    <Link onClick={this.handleClickLink} style={{ fontSize: 20, textDecoration: 'underline' }}>
                      {window.location.host + '/#/NFT/Spark/' + this.state.recommendNFT}
                    </Link>
                  </Grid>
                ) : (
                  <div></div>
                )}
              </div>
            </Container>
          </ThemeProvider>
        </Spin>
      )
    }
  }
}

export default withStyles(styles, {withTheme: true})(NFTSpark)