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
import { Input, InputNumber, Select, Spin } from 'antd'
import 'antd/dist/antd.css'
import TopBar from './TopBar'
import axios from 'axios'
import contract from './contract'
import web3 from './web3'
import ReactLoading from 'react-loading'
import Paper from '@material-ui/core/Paper'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Link } from "@material-ui/core"
import * as tokens from './tokens_list.json'
import { withTranslation } from 'react-i18next';
const {
  pinata_api_key,
  pinata_secret_api_key,
} = require('./project.secret.js')
const FormData = require('form-data')
const bs58 = require('bs58')
var CryptoJS = require("crypto-js")
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
  btnPub: {
    margin: theme.spacing(1),
    borderRadius: 25,
    color: '#FFFFFF',
    backgroundColor: '#2196f3',
    marginBottom: 20,
    marginTop: 40,
    height: 45,
    minWidth: 200,
    [theme.breakpoints.between('xs', 'sm')]: {
      width: '50%',
    },
    [theme.breakpoints.between('sm', 'md')]: {
      fontSize: 16,
      width: '30%',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: 16,
      width: '30%',
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
    borderRadius: 5,
  },
  inputNum: {
    height: 40,
    borderRadius: 5,
    width: '100%',
    fontSize: 20,
  }
})


class EncryptedPublish extends Component {
  backend = 'https://api.sparklink.io' //http://192.168.0.64:3000
  state = {
    name: '',
    bonusFee: 0,
    price: 0,
    buffer: null,
    file: null,
    ipfsHashCover: '',
    ipfsMeta: '',
    fileType: '',
    fileIpfs: '',
    description: '',
    shareTimes: 0,
    onLoading: false,
    rootNFTId: '',
    issueId: '',
    allowSubmitPDF: false,
    usedAcc: '',
    sig: '',
    finished: false,
    open: false,
    coverURL: '',
    jumped: false,
    data: [],
    token_addr: null,
    token_symbol: 'MATIC',
    decimal: 0,
  }

  async componentDidMount() {
	const { t } = this.props;
    if (!window.ethereum) {
      alert(t('please_install_metamask'))
      window.location.href = '/#/introPublish'
      return
    }

    const chainId = await window.ethereum.request({ method: 'eth_chainId' })
    if (chainId !== '0x89') {
      alert(t('please_set_polygon'))
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

  handleGetNFTId = (value) => {
    this.setState({
      rootNFTId: String(value),
    })
  }

  handleClose = (e) => {
    this.setState({
      open: false,
    })
  }

  handleClickOpen = (e) => {
    this.setState({
      open: true,
    })
  }

  handleSearch = async (value) => {
    if (value) {
      value = value.toLowerCase()
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
	const {t} = this.props
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
        message.error(t('error_no_erc20'))
      }

    }
    // console.debug(token_symbol)
    this.setState({
      token_addr: address,
      token_symbol: token_symbol,
      decimal: token_decimal
    })
  }

  jump = async (event) => {
	  const {t} = this.props
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    const account = accounts[0]
    this.setState({
      usedAcc: account
    })

    const owner = await contract.methods.ownerOf(this.state.rootNFTId).call()
    var issueId = await contract.methods.getIssueIdByNFTId(this.state.rootNFTId).call()

    var bonus = await contract.methods.getRoyaltyFeeByIssueId(issueId).call()

    if (account == owner.toLowerCase()) {
      this.setState({
        onLoading: false,
        allowSubmitPDF: true,
        jumped: true,
        bonusFee: bonus
      })
    } else {
      message.warning({
        content: t('no_NFT_owner'),
        className: 'custom-class',
        style: {
          marginTop: '10vh',
        },
      })
    }
  }

  submit = async (event) => {
    /*TODO: call smart contract publish() and wait for publish success event
     * then call backend to get a secret key. Then encrypt the pdf file and upload it to IPFS
     * Finally, form a new metadata json file and send its ipfs hash to backend and publish it
    */
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    const account = accounts[0]
    this.setState({
      usedAcc: account
    })
    let obj = this
    if (this.state.price === 0 || this.state.bonusFee === 0 || this.state.shareTimes === 0 || this.state.token_addr === null) {
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
      var price_with_decimal = this.state.price * (10 ** this.state.decimal)
      price_with_decimal = price_with_decimal.toString()
      var ipfsToContract = '0x0000000000000000000000000000000000000000000000000000000000000000'
      console.debug('price_with_decimal: ', price_with_decimal)
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
          var root_nft_id = String(returned_values.rootNFTId)
          console.debug(typeof root_nft_id)
          var issue_id = returned_values.issue_id
          obj.setState({
            onLoading: false,
            rootNFTId: root_nft_id,
            issueId: issue_id,
            allowSubmitPDF: true
          })
          message.success({
            content: "作品基本信息已提交成功",
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

    }

  }

  checkDetail = async (event) => {
    var new_url = '/#/NFT/' + this.state.rootNFTId
    window.open(new_url, '_self')
  }

  submitWork = async () => {
    if (this.state.ipfsHashCover === '' || this.state.fileIpfs === '') {
      message.error({
        content: "你有信息尚未填写",
        className: 'custom-class',
        style: {
          marginTop: '10vh',
        },
      })
    } else {

      var img_url = 'https://coldcdn.com/api/cdn/v5ynur/ipfs/' + this.state.ipfsHashCover
      this.setState({
        coverURL: img_url
      })
      console.debug("coverURL: ", this.state.coverURL)
      var trimmed_des = this.state.description.replace(/(\r\n\t|\n|\r\t)/gm, " ")
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      const account = accounts[0]
      if (account !== this.state.usedAcc) {
        message.warning({
          content: "账户发生变化，请切换回原账户",
          className: 'custom-class',
          style: {
            marginTop: '10vh',
          },
        })
        return
      }
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
            "value": "TRUE"
          }
        ]
      }
      console.debug(JSONBody)
      const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`
      let obj = this
      this.setState({
        onLoading: true
      })

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
        console.log(bytesToContract)
        console.log(response.data.IpfsHash)
        this.setState({
          ipfsMeta: bytesToContract
        })

        var ipfsToContract = '0x' + bytesToContract

        var gasPrice = await web3.eth.getGasPrice()
        var new_gas_price = Math.floor(parseInt(gasPrice) * 1.5).toString()

        contract.methods.setURI(obj.state.rootNFTId, ipfsToContract).send({
          from: obj.state.usedAcc,
          gasPrice: new_gas_price
        })
          .on('receipt', function (receipt) {
            console.debug(receipt.events.SetURI)
            message.success({
              content: "作品基本信息已提交成功",
              className: 'custom-class',
              style: {
                marginTop: '10vh',
              },
            })
            obj.setState({
              allowSubmitPDF: false,
              finished: true,
              onLoading: false
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

      } catch (error) {
        message.error({
          content: `Error: ${error.message}`,
          className: 'custom-class',
          style: {
            marginTop: '10vh',
          },
        })
      }

    }
  }

  render() {
	const { t } = this.props
    const { classes } = this.props
	console.log(t,classes)
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
      beforeUpload: file => {
        return new Promise(async (resolve, reject) => {
          try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
            const signer = accounts[0]
            var message = {
              account: signer,
              nft_id: obj.state.rootNFTId
            }
            const sig = await web3.eth.personal.sign(JSON.stringify(message), signer)
            console.debug(sig)
            var payload = {
              "nft_id": obj.state.rootNFTId,
              "account": signer,
              "signature": sig
            }
            var payload_str = JSON.stringify(payload)
            console.log(payload_str)
            var req_key_url = this.backend + '/api/v1/key/claim'
            try {
              const res = await axios.post(req_key_url, payload_str, {
                headers: {
                  'Content-Type': 'application/json'
                }
              })
              var secret_key = res.data.key//res.data.key
              console.debug(secret_key)
              // if (file.type === 'text/plain') {
              const reader = new FileReader()
              reader.readAsArrayBuffer(file)
              reader.onload = (e) => {
                var b = e.target.result
                var wordArray = CryptoJS.lib.WordArray.create(b)
                const str = CryptoJS.enc.Hex.stringify(wordArray)
                var cipher_text = CryptoJS.AES.encrypt(str, secret_key).toString()
                var myblob = new Blob([cipher_text])
                resolve(myblob)
              }

            } catch (error) {
              if (error.response.status == 400) {
                if (error.response.data.message.includes("signature invalid")) {
                  message.error({
                    content: "您的签名有误，请查看签名账号是否正确",
                    className: 'custom-class',
                    style: {
                      marginTop: '10vh',
                    },
                  })
                } else if (error.response.data.message.includes("param invalid")) {
                  message.error({
                    content: "参数错误",
                    className: 'custom-class',
                    style: {
                      marginTop: '10vh',
                    },
                  })
                } else if (error.response.data.message.includes("not owned")) {
                  message.error({
                    content: "您并不拥有此nft",
                    className: 'custom-class',
                    style: {
                      marginTop: '10vh',
                    },
                  })
                } else if (error.response.data.message.includes("not found")) {
                  message.error({
                    content: "此nft还未生成",
                    className: 'custom-class',
                    style: {
                      marginTop: '10vh',
                    },
                  })
                }
              } else {
                message.error({
                  content: "请求文件加密密钥失败",
                  className: 'custom-class',
                  style: {
                    marginTop: '10vh',
                  },
                })
              }
            }


          } catch (e) {
            message.error({
              content: "Read file error",
              className: 'custom-class',
              style: {
                marginTop: '10vh',
              },
            })
            reject()
          }
        })
      },
      onChange(info) {
        const { status } = info.file
        if (status === 'done') {
          var file_type = info.file.name.split('\.')
          var file_suffix = file_type[file_type.length - 1]
          obj.setState({
            fileIpfs: info.file.response.IpfsHash,
            fileType: file_suffix
          })
          console.debug("encrypted file hash: ", info.file.response.IpfsHash)
          message.success(`${info.file.name} file uploaded successfully.`)
        }

      },
      onDrop(e) {
        console.log('Dropped files', e.dataTransfer.files)
      },
    }

    if (this.state.allowSubmitPDF) {

      return (
        <Spin spinning={this.state.onLoading} size='large' >
          <Container component="main" maxWidth="xs" className={classes.main}>

            <div className={classes.paper}>
              <Typography className={classes.titlePub}>
                <b>{t('up_file')}</b>
              </Typography>
              <form className={classes.form} noValidate>
                {this.state.jumped ? (
                  <div>
                    <Grid item style={{ width: "100%" }}>
                      <label style={{ fontSize: 18, marginBottom: 10 }}>{t('art_name')} *</label>
                      <Input
                        placeholder={t('art_name')}
                        allowClear
                        id="pubName"
                        onChange={this.handleGetPubName}
                        value={this.state.name}
                        className={classes.input}
                      />
                    </Grid>
                    <Grid item style={{ width: "100%" }}>
                      <label style={{ fontSize: 18, marginTop: 20 }}>{t('art_desc')} *</label>
                      <p style={{ fontSize: 14 }}>{t('art_desc_tip')}</p>
                      <TextArea
                        rows={4}
                        id="Description"
                        onChange={this.handleGetDescription}
                      />
                    </Grid>
                  </div>
                ) : (
                  <div></div>
                )}
                <label style={{ fontSize: 18, marginTop: 50 }}>{t('pic_cover')} *</label>
                <p style={{ fontSize: 12 }}>{t('pic_cover_tip')}</p>
                <Dragger {...prop} style={{ width: '100%', minHeight: 100 }} id="Uploader" accept=".png, .jpg, .jpeg" >
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">{t('upload_file_tip1')}</p>
                  <p className="ant-upload-hint">
                    {t('upload_file_tip2')}
                  </p>
                </Dragger>

                <label style={{ fontSize: 18, marginTop: 50 }}>{t('art_file')} *</label>
                <p style={{ fontSize: 12 }}>{t('art_file_tip')} </p>
                <Dragger {...propFile} style={{ width: '100%', minHeight: 100 }} id="Uploader2">
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">{t('upload_file_tip1')}</p>
                  <p className="ant-upload-hint">
                    {t('upload_file_tip2')}
                  </p>
                </Dragger>
                <div style={{ textAlign: 'center' }}>
                  <Button
                    variant="contained"
                    startIcon={<CloudUploadOutlined />}
                    className={classes.btnPub}
                    onClick={this.submitWork}
                  >
                    发布作品
                  </Button>
                </div>
              </form>
            </div>
          </Container>

        </Spin>
      )

    } else if (this.state.finished) {
      return (
        <Spin spinning={this.state.onLoading} size='large'>

          <ThemeProvider theme={theme}>
            <TopBar />
            <div style={{ textAlign: 'center' }}>
              <Typography className={classes.titleCon}>
                <b> {t('pulish_success')}</b>
              </Typography>

              <Paper className={classes.paperImg}>
                <img style={{ width: 300, marginTop: 20, marginBottom: 50 }} src={this.state.coverURL}></img>
              </Paper>
              <Typography variant="h4" style={{ marginTop: 20, fontFamily: 'Ubuntu' }}>
                <b>{t('you_gain_nft')} #{this.state.rootNFTId}</b>
              </Typography>

              <Button
                variant="contained"
                className={classes.button}
                style={{ marginTop: 50, width: 200, height: 50, marginBottom: 50 }}
                onClick={this.checkDetail}
              >
                {t('show_detail')}
              </Button>
            </div>
          </ThemeProvider>
        </Spin>
      )
    } else {
      return (
        <Spin spinning={this.state.onLoading} size='large' >

          <ThemeProvider theme={theme}>
            <TopBar />
            <Container component="main" maxWidth="xs" className={classes.main}>
              <div className={classes.paper}>
                <Typography className={classes.titlePub}>
                  <b>{t('art_info')}</b>
                </Typography>
                <form className={classes.form} noValidate>
                  <Grid container spacing={2}>
                    <Grid item style={{ width: "100%" }}>
                      <label style={{ fontSize: 18, marginBottom: 10 }}>{t('art_name')} *</label>
                      <Input
                        placeholder={t('art_name')}
                        allowClear
                        id="pubName"
                        onChange={this.handleGetPubName}
                        value={this.state.name}
                        className={classes.input}
                      />
                    </Grid>
                    <Grid item style={{ width: "100%" }}>
                      <label style={{ fontSize: 18, marginTop: 20 }}>{t('fit_rate')} *</label>
                      <p style={{ fontSize: 14 }}>{t('fit_rate_tip')}</p>
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
                      <label style={{ fontSize: 18, marginTop: 20 }}>{t('access_coin')} *</label>
                      <p style={{ fontSize: 14 }}>{t('access_coin_tip')}</p>
                      <Select
                        showSearch
                        value={this.state.token_addr}
                        placeholder={t('please_input_coin')}
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
                      <label style={{ fontSize: 18, marginTop: 20 }}>{t('price')} ({this.state.token_symbol})*</label>
                      <InputNumber
                        id="price"
                        defaultValue={0}
                        min={0}
                        onChange={this.handleGetPrice}
                        className={classes.inputNum}
                      />
                    </Grid>
                    <Grid item style={{ width: "100%" }}>
                      <label style={{ fontSize: 18, marginTop: 20 }}>{t('max_share')} (MAX： 65535)*</label>
                      <p style={{ fontSize: 14 }}>{t('max_share_tip')}</p>
                      <InputNumber
                        id="shareTimes"
                        defaultValue={0}
                        min={0}
                        max={65535}
                        onChange={this.handleGetShareTimes}
                        className={classes.inputNum}
                      />
                    </Grid>
                    <Grid item style={{ width: "100%" }}>
                      <label style={{ fontSize: 18, marginTop: 20 }}>{t('art_desc')}  *</label>
                      <p style={{ fontSize: 14 }}>{t('art_desc_tip')}</p>
                      <TextArea
                        rows={4}
                        id="Description"
                        onChange={this.handleGetDescription}
                      />
                    </Grid>
                  </Grid>
                </form>
                <Grid container alignItems="center" spacing={4} style={{ marginTop: 20, marginBottom: 50 }}>
                  <Grid item xs style={{ textAlign: 'center' }}>
                    <Button
                      variant="contained"
                      className={classes.button}
                      startIcon={<CloudUploadOutlined />}
                      style={{ width: 200, height: 50, marginBottom: 20, marginTop: 20 }}
                      onClick={this.submit}
                    >
                       {t('submit')}
                    </Button>
                  </Grid>
                  <Grid item xs style={{ textAlign: 'center' }}>
                    <Link onClick={this.handleClickOpen} style={{ fontSize: 10, textDecoration: 'underline' }}>
                       {t('have_submit')}
                    </Link>
                  </Grid>
                </Grid>
                <Dialog
                  open={this.state.open}
                  onClose={this.handleClose}
                  aria-labelledby="form-dialog-title"
                >
                  <DialogTitle id="form-dialog-title">{t('inpt_NFT_ID')}</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      {t('inpt_NFT_ID_tip')}
                    </DialogContentText>
                    <label style={{ fontSize: 14, marginBottom: 10 }}>NFT ID *</label>
                    <InputNumber
                      defaultValue={0}
                      min={0}
                      onChange={this.handleGetNFTId}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                       {t('cancel')}
                    </Button>
                    <Button variant="contained" onClick={this.jump} color="primary" >
                       {t('go_upload')}
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
            </Container>
          </ThemeProvider>
        </Spin>
      )
    }


  }
}

export default withTranslation()(withStyles(styles, { withTheme: true })(EncryptedPublish))
//todo 涉及交易