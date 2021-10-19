import React, { Component } from 'react'
import './App.css'
import Button from '@material-ui/core/Button'
import { createTheme, ThemeProvider, withStyles } from '@material-ui/core/styles'
import { blue } from '@material-ui/core/colors'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import { message } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import Dragger from 'antd/lib/upload/Dragger'
import { CloudUploadOutlined } from '@ant-design/icons'
// import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import { Input, InputNumber, Select, Spin } from 'antd'
import 'antd/dist/antd.css'
import TopBar from './TopBar'
import axios from 'axios'
import contract from './contract'
import web3 from './web3'
import ReactLoading from 'react-loading'
import Paper from '@material-ui/core/Paper'
import * as tokens from './tokens_list.json'



const {
  pinata_api_key,
  pinata_secret_api_key,
} = require('./project.secret')

const FormData = require('form-data')
const bs58 = require('bs58')
const { Option } = Select
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
  main: {
    [theme.breakpoints.between('xs', 'sm')]: {
      width: '60%'
    },
    [theme.breakpoints.up('sm')]: {
      width: 500
    },
  },
  titleCon: {
    marginTop: 50,
    fontFamily: 'Ubuntu',
    [theme.breakpoints.between('xs', 'sm')]: {
      fontSize: 30
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: 40
    },
  },
  paperImg: {
    backgroundColor: '#EFEBE9',
    width: 330,
    [theme.breakpoints.between('xs', 'sm')]: {
      marginLeft: '5%',
      marginTop: 30,
    },
    [theme.breakpoints.between('sm', 'md')]: {
      marginLeft: '30%',
      marginTop: 30,
    },
    [theme.breakpoints.between('md', 'lg')]: {
      marginLeft: '30%',
      marginTop: 30,
    },
    [theme.breakpoints.between('lg', 'xl')]: {
      marginLeft: '40%',
      marginTop: 30,
    },
    [theme.breakpoints.up('xl')]: {
      marginLeft: '45%',
      marginTop: 30,
    },
  },
  titlePub: {
    marginTop: "3%",
    fontFamily: 'Ubuntu',
    [theme.breakpoints.between('xs', 'sm')]: {
      fontSize: 30
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: 40
    },
  },
  btn: {
    color: '#424949',
    borderWidth: 2,
    borderColor: '#e3f2fd',
    fontSize: 16,
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: blue[500],
    width: 60,
    height: 60
  },
  form: {
    width: '150%',
    marginTop: theme.spacing(7),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  fileBtn: {
    padding: '10px 30px 10px 30px',
    background: '#66C1E4',
    border: 'none',
    color: '#FFF',
    boxShadow: '1px 1px 1px #4C6E91',
  },
  button: {
    margin: theme.spacing(1),
    fontSize: 20,
    borderRadius: 25,
    color: '#FFFFFF',
    backgroundColor: '#2196f3'
  },
  input: {
    height: 40,
    borderRadius: 3,
    width: '100%',
  },
  inputNum: {
    height: 40,
    borderRadius: 3,
    width: '100%',
    fontSize: 20,
  }
})


class Publish extends Component {
  state = {
    name: '',
    bonusFee: 0,
    price: 0,
    buffer: null,
    ipfsHashCover: '',
    ipfsMeta: '',
    fileIpfs: '',
    description: '',
    shareTimes: 0,
    onLoading: false,
    rootNFTId: '',
    usedAcc: '',
    sig: '',
    fileType: '',
    finished: false,
    coverURL: '',
    data: [],
    token_addr: null,
    token_symbol: 'MATIC',
    decimal: 0,
  }

  async componentDidMount() {
    if (!window.ethereum) {
      alert("请先安装metamask")
      window.location.href = '/#/introPublish'
      return
    }
    // const chainId = await window.ethereum.request({ method: 'eth_chainId' })
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
  }

  handleGetPubName = (event) => {
    this.setState({
      name: event.target.value,
    })
  }

  handleGetBonusFee = (value) => {
    this.setState({
      bonusFee: value,
    })
  }

  handleGetPrice = (value) => {
    this.setState({
      price: value,
    })
  }

  handleGetShareTimes = (value) => {
    this.setState({
      shareTimes: value,
    })
  }

  handleGetDescription = (e) => {
    this.setState({
      description: e.target.value,
    })
  }

  handleSearch = async (value) => {
    if (value) {
      var value = value.toLowerCase()
      var tokens_list = tokens.tokens
      var matched_data = []
      let reg = new RegExp(value)
      for (let token of tokens_list) {
        var symbol_lower_case = token.symbol.toLowerCase()
        var showed_text = `\"${token.symbol}\"` + "   " + token.address
        var info = {
          value: token.address,
          text: showed_text
        }
        if (reg.test(symbol_lower_case) && !matched_data.includes(info)) {
          matched_data.push(info)
        }
      }
      if (value.includes('0x') && value.length == 42) {
        var info = {
          value: value,
          text: value
        }
        matched_data = [info]
      }
      this.setState({
        data: matched_data
      })
    } else {
      this.setState({ data: [] })
    }
  }

  handleSelectChange = async (value) => {
    var tokens_list = tokens.tokens
    let address
    let token_symbol
    let token_decimal
    for (let token of tokens_list) {
      if (value === token.address) {
        address = value
        token_symbol = token.symbol
        token_decimal = token.decimals
      }
    }
    if (token_symbol == undefined) {

      try {
        const token_contract = new web3.eth.Contract(abi, value)
        token_symbol = await token_contract.methods.symbol().call()
        token_decimal = await token_contract.methods.decimals().call()
        address = value
      } catch (error) {
        message.error("你提供的地址不是erc20代币，请重新输入")
      }

    }
    // console.debug(token_symbol)
    this.setState({
      token_addr: address,
      token_symbol: token_symbol,
      decimal: token_decimal
    })

  }

  submit = async (event) => {
    /*TODO: call smart contract publish() and wait for publish success event
     * then call backend to get a secret key. Then encrypt the pdf file and upload it to IPFS
     * Finally, form a new metadata json file and send its ipfs hash to backend and publish it
    */
    let obj = this
    if (this.state.price === 0 || this.state.bonusFee === 0 || this.state.shareTimes === 0 || this.state.ipfsHashCover === '' || this.state.fileIpfs === '' || this.state.token_addr === null) {
      message.error({
        content: "你有信息尚未填写",
        className: 'custom-class',
        style: {
          marginTop: '10vh',
        },
      })
    } else {

      this.setState({
        onLoading: true
      })
      var img_url = 'https://coldcdn.com/api/cdn/v5ynur/ipfs/' + this.state.ipfsHashCover
      this.setState({
        coverURL: img_url
      })
      console.debug("coverURL: ", this.state.coverURL)
      var trimmed_des = this.state.description.replace(/(\r\n\t|\n|\r\t)/gm, " ")
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      const account = accounts[0]
      this.setState({
        usedAcc: account
      })
      var file_url = 'https://coldcdn.com/api/cdn/v5ynur/ipfs/' + this.state.fileIpfs
      var JSONBody = {
        "name": this.state.name,
        "description": trimmed_des,
        "image": this.state.coverURL,
        "attributes": [
          {
            "display_type": "boost_percentage",
            "trait_type": "Bonuse Percentage",
            "value": this.state.bonusFee
          },
          {
            "trait_type": "File Address",
            "value": file_url
          },
          {
            "value": this.state.fileType
          },
          {
            "trait_type": "Encrypted",
            "value": "FALSE"
          }
        ]
      }

      const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`

      try {
        const response = await axios.post(url, JSONBody, {
          headers: {
            pinata_api_key: pinata_api_key,
            pinata_secret_api_key: pinata_secret_api_key
          },
        })
        console.debug("metadata: ", response.data.IpfsHash)
        const bytes = bs58.decode(response.data.IpfsHash)
        const bytesToContract = bytes.toString('hex').substring(4,)
        this.setState({
          ipfsMeta: bytesToContract
        })

        var price_with_decimal = this.state.price * (10 ** this.state.decimal)
        price_with_decimal = price_with_decimal.toString()
        console.debug("price_with_decimal: ", price_with_decimal)
        var ipfsToContract = '0x' + bytesToContract

        var gasPrice = await web3.eth.getGasPrice()
        var new_gas_price = Math.floor(parseInt(gasPrice) * 1.5).toString()
        contract.methods.publish(price_with_decimal, this.state.bonusFee, this.state.shareTimes, ipfsToContract, this.state.token_addr).send({
          from: this.state.usedAcc,
          gasPrice: new_gas_price
        })
          .on('receipt', function (receipt) {
            console.log(receipt)
            var publish_event = receipt.events.Publish
            var returned_values = publish_event.returnValues
            var root_nft_id = returned_values.rootNFTId
            var issue_id = returned_values.issue_id
            obj.setState({
              onLoading: false,
              rootNFTId: root_nft_id,
              issueId: issue_id,
              finished: true
            })
            message.success({
              content: "已经成功发布作品",
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
            if (error.message.includes('not mined')) {
              message.warning({
                content: "交易已提交，当前网络较拥堵，请稍等后去我的收藏中查看",
                className: 'custom-class',
                style: {
                  marginTop: '10vh',
                },
              })
            } else {
              console.debug(error.message)
              message.error({
                content: `Error: ${error.message}`,
                className: 'custom-class',
                style: {
                  marginTop: '10vh',
                },
              })
            }
          })


      } catch (error) {
        console.debug(error)
        message.error({
          content: `似乎遇到了些小问题： ${error}`,
          className: 'custom-class',
          style: {
            marginTop: '10vh',
          },
        })
      }

    }

  }

  checkDetail = async (event) => {
    var new_url = '/#/NFT/' + this.state.rootNFTId
    window.open(new_url, '_self')
  }

  render() {
    const { classes } = this.props
    let obj = this
    const { TextArea } = Input
    const options = this.state.data.map(d => <Option key={d.value}>{d.text}</Option>)
    const prop = {
      name: 'file',
      action: `https://api.pinata.cloud/pinning/pinFileToIPFS`,
      headers: {
        pinata_api_key: pinata_api_key,
        pinata_secret_api_key: pinata_secret_api_key
      },
      data: this.state.buffer,
      beforeUpload: file => {
        return new Promise((resolve, reject) => {
          try {
            const reader = new FileReader()
            reader.readAsArrayBuffer(file)
            reader.onload = (e) => {
              var b = e.target.result
              let params = new FormData()
              params.append('file', b)
              this.setState({
                buffer: params
              })
            }
            resolve()
          } catch (e) {
            message.error('Read file error')
            reject()
          }
        })
      },
      async onChange(info) {
        const { status } = info.file
        // text/plain image/jpeg application/pdf
        if (status === 'done') {
          message.success(`${info.file.name} file uploaded successfully.`)
          obj.setState({
            ipfsHashCover: info.file.response.IpfsHash
          })

        } else if (status === 'error') {
          message.error(`${info.file.name} file upload failed.`)
        }
      },
      onDrop(e) {
        message.error(`Only image file supported`)
        console.log('Dropped files', e.dataTransfer.files)
      },
    }

    const propFile = {
      name: 'file',
      action: `https://api.pinata.cloud/pinning/pinFileToIPFS`,
      headers: {
        pinata_api_key: pinata_api_key,
        pinata_secret_api_key: pinata_secret_api_key
      },
      data: this.state.buffer,
      beforeUpload: file => {
        return new Promise((resolve, reject) => {
          try {
            const reader = new FileReader()
            reader.readAsArrayBuffer(file)
            reader.onload = (e) => {
              var b = e.target.result
              let params = new FormData()
              params.append('file', b)
              this.setState({
                buffer: params
              })
            }
            resolve()
          } catch (e) {
            message.error('Read file error')
            reject()
          }
        })
      },
      async onChange(info) {
        const { status } = info.file
        // console.debug(typeof info.file.type)
        // text/plain image/jpeg application/pdf
        if (status === 'done') {
          message.success(`${info.file.name} file uploaded successfully.`)
          var file_type = info.file.name.split('\.')
          var file_suffix = file_type[file_type.length - 1]
          console.debug(file_suffix)
          console.debug("file ipfs hash: ", info.file.response.IpfsHash)
          obj.setState({
            fileIpfs: info.file.response.IpfsHash,
            fileType: file_suffix
          })


        } else if (status === 'error') {
          message.error(`${info.file.name} file upload failed.`)
        }
      },
      onDrop(e) {
        message.error(`Only image file supported`)
        console.log('Dropped files', e.dataTransfer.files)
      },
    }


    // if (this.state.onLoading) {
    //   return (
    //     <div>
    //       <ThemeProvider theme={theme}>
    //         <TopBar />
    //         <div style={{ marginLeft: '35%', marginTop: '10%' }}>
    //           <ReactLoading type={'bars'} color={'#2196f3'} width={'40%'} />
    //         </div>
    //       </ThemeProvider>
    //     </div>
    //   )
    // } else 
    if (this.state.finished) {
      return (
        <Spin spinning={this.state.onLoading} size='large'>
          <ThemeProvider theme={theme}>
            <TopBar />
            <div style={{ textAlign: 'center' }}>
              <Typography className={classes.titleCon}>
                <b> 🎉 恭喜您发布成功</b>
              </Typography>

              <Paper className={classes.paperImg}>
                <img style={{ width: 300, marginTop: 20, marginBottom: 50 }} src={this.state.coverURL}></img>
              </Paper>
              <Typography variant="h4" style={{ marginTop: 20, fontFamily: 'Ubuntu' }}>
                <b>您获得的NFT是： #{this.state.rootNFTId}</b>
              </Typography>

              <Button
                variant="contained"
                className={classes.button}
                style={{ marginTop: 50, width: 200, height: 50, marginBottom: 50 }}
                onClick={this.checkDetail}
              >
                查看详情
              </Button>
            </div>
          </ThemeProvider>
        </Spin>
      )
    } else {
      return (
        <Spin spinning={this.state.onLoading} size='large' style={{marginTop: 1000}}>

          <ThemeProvider theme={theme}>
            <TopBar />
            <Container component="main" maxWidth="xs" className={classes.main}>
              <div className={classes.paper}>
                {/* {showLoading()} */}
                <Typography className={classes.titlePub}>
                  <b>发布作品信息</b>
                </Typography>
                <form className={classes.form} noValidate>
                  <Grid container spacing={2}>
                    <Grid item style={{ width: "100%" }}>
                      <label style={{ fontSize: 18, marginBottom: 10 }}>作品名字 <span style={{ color: "red"}}>*</span></label>
                      <Input
                        placeholder="作品名称"
                        allowClear
                        id="pubName"
                        onChange={this.handleGetPubName}
                        value={this.state.name}
                        className={classes.input}
                      />
                    </Grid>
                    <Grid item style={{ width: "100%" }}>
                      <label style={{ fontSize: 18, marginTop: 20 }}>收益比例 <span style={{ color: "red"}}>*</span></label>
                      <p style={{ fontSize: 14 }}>当您的作品被他人分享并获利时，您希望从他的分享利润中获得多少比例的收益</p>
                      <InputNumber
                        id="bonusFee"
                        defaultValue={0}
                        min={0}
                        max={100}
                        formatter={value => `${value}%`}
                        parser={value => value.replace('%', '')}
                        onChange={this.handleGetBonusFee}
                        className={classes.inputNum}
                      />
                    </Grid>
                    <Grid item style={{ width: "100%" }}>
                      <label style={{ fontSize: 18, marginTop: 20 }}>通行代币 <span style={{ color: "red"}}>*</span></label>
                      <p style={{ fontSize: 14 }}>请选择您支持的支付货币 (输入代币符号或地址)</p>
                      <Select
                        showSearch
                        value={this.state.token_addr}
                        placeholder={"请输入代币符号或地址"}
                        // className={classes.input}
                        style={{ width: "100%" }}
                        size="large"
                        defaultActiveFirstOption={false}
                        showArrow={false}
                        filterOption={false}
                        onSearch={this.handleSearch}
                        onChange={this.handleSelectChange}
                        notFoundContent={null}
                      >
                        {options}
                      </Select>
                    </Grid>
                    <Grid item style={{ width: "100%" }}>
                      <label style={{ fontSize: 18, marginTop: 20 }}>售卖价格 ({this.state.token_symbol})<span style={{ color: "red"}}>*</span></label>
                      <InputNumber
                        id="price"
                        defaultValue={0}
                        min={0}
                        onChange={this.handleGetPrice}
                        className={classes.inputNum}
                      />
                    </Grid>
                    <Grid item style={{ width: "100%" }}>
                      <label style={{ fontSize: 18, marginTop: 20 }}>最高分享次数 (MAX： 65535)<span style={{ color: "red"}}>*</span></label>
                      <p style={{ fontSize: 14 }}>您希望每一个帮助您传播的用户最多能够分享多少次？</p>
                      <InputNumber
                        id="shareTimes"
                        defaultValue={0}
                        min={0}
                        max={65535}
                        onChange={this.handleGetShareTimes}
                        className={classes.inputNum}
                      />
                    </Grid>
                    <Grid item style={{ width: "100%" }} >
                      <label style={{ fontSize: 18, marginTop: 20 }}>作品描述 <span style={{ color: "red"}}>*</span></label>
                      <p style={{ fontSize: 14 }}>请用简单的话语对您的作品进行描述，精准有效的描述能帮助其他用户更准确得了解您的作品</p>
                      <TextArea
                        rows={6}
                        id="Description"
                        onChange={this.handleGetDescription}
                      />
                    </Grid>
                  </Grid>
                  <label style={{ fontSize: 18, marginTop: 50 }}>封面图片 <span style={{ color: "red"}}>*</span></label>
                  <p style={{ fontSize: 14 }}>请在下方区域上传您的封面图片 <br />
                    封面文件支持这些格式：JPEG/JPG/PNG</p>
                  <Dragger {...prop} style={{ width: '100%', minHeight: 200 }} id="Uploader" accept=".png, .jpg, .jpeg" >
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">上传文件请点击或者拖拽文件到此处</p>
                    <p className="ant-upload-hint">
                      支持单个文件的上传，支持多种类型文件的上传
                    </p>
                  </Dragger>

                  <label style={{ fontSize: 18, marginTop: 50 }}>作品文件 <span style={{ color: "red"}}>*</span></label>
                  <p style={{ fontSize: 14 }}>请在下方区域上传您的作品文件 </p>
                  <Dragger {...propFile} style={{ width: '100%', minHeight: 200 }} id="Uploader2" >
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">上传文件请点击或者拖拽文件到此处</p>
                    <p className="ant-upload-hint">
                      仅支持单个文件的上传，支持多种类型文件的上传
                    </p>
                  </Dragger>
                </form>
                <Button
                  variant="contained"
                  className={classes.button}
                  startIcon={<CloudUploadOutlined />}
                  style={{ marginTop: 50, width: 200, height: 50, marginBottom: 50 }}
                  onClick={this.submit}
                >
                  提交信息
                </Button>
              </div>
            </Container>
          </ThemeProvider>
        </Spin>
      )
    }


  }
}

export default withStyles(styles, { withTheme: true })(Publish)