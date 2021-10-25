import React, { Component } from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { createTheme, ThemeProvider, withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import contract from './contract';
import TopBar from "./TopBar";
import Skeleton from '@material-ui/lab/Skeleton';
import { Empty } from 'antd';
import axios from 'axios';
import web3 from './web3';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FDFEFE',
    },
    secondary: {
      main: '#2196f3',
    }
  },
});

const styles = theme => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  titleFont: {
    fontFamily: 'Teko',
  },
  btn: {
    color: '#424949',
    borderWidth: 8,
    borderColor: '#e3f2fd',
    fontSize: 16,
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(36, 0, 6),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    // paddingTop: '56.25%', // 16:9
    objectFit: 'contain',
    paddingTop: '100%', // 16:9
  },
  cardContent: {
    flexGrow: 2,
  },
  paper: {
    marginTop: theme.spacing(7),
    textAlign: 'center'
  },
  container: {
    maxWidth: '100%'
  },
  btnMain: {
    marginTop: theme.spacing(3),
    color: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#e3f2fd',
    fontSize: 16,
    borderRadius: 25,
    width: 150
  },
  btnSecond: {
    marginTop: theme.spacing(3),
    color: '#03A9F4',
    borderWidth: 3,
    borderColor: '#03A9F4',
    fontSize: 16,
    borderRadius: 25,
    width: 150
  },
  title: {
    fontFamily: 'Teko',
    marginTop: '5%',
    [theme.breakpoints.between('xs', 'sm')]: {
      fontSize: 35,
    },
    [theme.breakpoints.between('sm', 'md')]: {
      fontSize: 40,
    },
    [theme.breakpoints.between('md', 'lg')]: {
      fontSize: 55,
    },
    [theme.breakpoints.between('lg', 'xl')]: {
      fontSize: 90,
    },
    [theme.breakpoints.up('xl')]: {
      fontSize: 110,
    },
  },
  title2: {
    fontFamily: 'Teko',
    [theme.breakpoints.between('xs', 'sm')]: {
      fontSize: 16,
    },
    [theme.breakpoints.between('sm', 'md')]: {
      fontSize: 25,
    },
    [theme.breakpoints.between('md', 'lg')]: {
      fontSize: 35,
    },
    [theme.breakpoints.between('lg', 'xl')]: {
      fontSize: 45,
    },
    [theme.breakpoints.up('xl')]: {
      fontSize: 55,
    },
  },
});

class Collections extends Component {
  gateway = 'https://coldcdn.com/api/cdn/v5ynur/ipfs/';
  backend = 'https://api.sparklink.io'
  web3;
  cards = [];
  state = {
    isLogin: false,
    user_address: null,
    name: '',
    viewable: false,
    cards: [],
    onloading: false,
    SkeletoNumber: 0,
    noNFT: true,
  };

  async componentDidMount() {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    if (accounts.length === 0) {
      alert("请先连接Metamask")
    }
    const account = accounts[0];
    const chainId = await window.ethereum.request({ method: 'eth_chainId' });
    if (chainId !== '0x89') {
      alert("请切换至Polygon 主网络");
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{
          chainId: '0x89'
        }]
      })
    }

    let cards = [];

    const nft_number = await contract.methods.balanceOf(account).call()
    console.log('nft_number: ', nft_number)
    if (nft_number === 0) {
      return;
    }

    let ids = await this.getNft(contract, account);
    if (ids.length === 0) {
      return;
    }

    this.setState({
      noNFT: false
    })
    let data = await this.getMetadata(contract, ids);
    for (let i = 0; i < ids.length; i++) {
      let element = {
        id: ids[i],
        title: data[i].name,
        description: data[i].description,
        bonusFee: data[i].attributes.value,
        image: data[i].image,
      }
      cards.push(element);
    }
    var reversed_cards = cards.reverse()
    this.setState({ viewable: true, });
    this.setState({ cards: reversed_cards, });
    this.setState({
      onloading: false,
      SkeletoNumber: 0
    })

  }

  getMetadata = async (nft, id) => {
    let metaDatas = [];
    for (let i = 0; i < id.length; i++) {
      let ipfs_link = await nft.methods.tokenURI(id[i]).call();
      var ipfs_hash_arr = ipfs_link.split('/')
      var ipfs_hash = ipfs_hash_arr[ipfs_hash_arr.length - 1]
      var meta = "https://coldcdn.com/api/cdn/v5ynur/ipfs/" + ipfs_hash
      // console.debug("meta: " + id[i] + " " + meta)
      await axios({
        method: 'get',
        url: meta,
        timeout: 1000 * 2,
      }).then(res => {
        // console.log("meta: ", res.data)
        metaDatas.push(res.data)
      }).catch(error => {
        var name_holder = 'SparkNFT#' + id[i]
        var placeholder = {
          "name": name_holder,
          "description": '暂时无法获取到该nft的相关描述',
          "image": 'https://testnets.opensea.io/static/images/placeholder.png',
          "attributes": [
            {
              "display_type": "boost_percentage",
              "trait_type": "Bonuse Percentage",
              "value": 0
            },
            {
              "trait_type": "File Address",
              "value": 'file_url'
            }
          ]
        }
        metaDatas.push(placeholder);
      })
    }
    return metaDatas;
  }

  getNft = async (nft, account) => {
    let balanceId = [];
    //0x9452644E9fdd59bD46A4d9eC24462995ADfD8d01
    var checksum_address = web3.utils.toChecksumAddress(account);
    var url = this.backend + '/api/v1/nft/list?owner=' + checksum_address
    console.debug('owner: ', checksum_address)
    try {
      var res = await axios.get(url)
      balanceId = res.data.nft
      this.setState({
        onloading: true,
        SkeletoNumber: balanceId.length
      })
      return balanceId;
    } catch (error) {
      // alert('无法获取您当前拥有的nft')
      return [];
    }
  };


  renderDescription = (description) => {
    if (description.length <= 150) {

      return (description);
    } else {
      let newDescription = description.substring(0, 150) + "..........";
      return (newDescription);
    }
  }



  render() {
    const { classes } = this.props
    let obj = this;
    window.ethereum.on('chainChanged', handleChainChanged);

    function handleChainChanged(_chainId) {
      window.location.reload();
    }

    function showCard(card, index) {
      let res = (
        <Grid item key={index} xs={12} sm={6} md={4}>
          {
            card ? (<Card className={classes.card}>
              <CardMedia
                className={classes.cardMedia}
                image={card.image}
                title="Image title"
              />
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                  <b>{card.title}</b>
                </Typography>
                <Typography>
                  {obj.renderDescription(card.description)}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" variant="contained" color="primary" href={'/#/NFT/' + card.id} >
                  <b>查看 </b>
                </Button>
                <Typography variant="body2" gutterBottom>
                  <b>NFT id: {card.id} </b>
                </Typography>
              </CardActions>
            </Card>) : (
              <Card className={classes.card}>
                <Skeleton variant="rect" style={{ marginLeft: 70, }} width={260} height={288} />
                <Skeleton width="60%" style={{ marginTop: 40, }} height={33} />
                <Skeleton height={33} />
                <Skeleton height={33} />
                <Skeleton height={33} />
              </Card>
            )
          }
        </Grid>
      );

      return res;

    }
    return (
      <div>
        <ThemeProvider theme={theme}>
          <TopBar />
          <Container component="main" className={classes.container}>
            <div className={classes.paper}>
              <Grid container justifyContent="center">
                <Grid item xs={10}>
                  <Typography color="inherit" noWrap className={classes.title}>
                    <b>我的收藏馆</b>
                  </Typography>
                  <Typography color="inherit" noWrap className={classes.title2}>
                    <b>An ERC721 Token Trying to Solve Existing Publishing Dilemma</b>
                  </Typography>
                </Grid>
              </Grid>
            </div>
          </Container>
        </ThemeProvider>
        {this.state.noNFT ? (
          <Empty 
            description={
              <span style={{ fontFamily: 'Teko' }}>
                <b>暂无可展示NFT</b>
              </span>
            }
            style={{marginTop: 100}}
            />
        ):(
          <main>
            { <Container className = {classes.cardGrid} maxWidth="md">
              <Grid container spacing={4}>
                {
                  (this.state.onloading ? Array.from(new Array(this.state.SkeletoNumber)) : this.state.cards).map((card, index) => {
                    return showCard(card, index);
                  })
                }
              </Grid>
            </Container>}
          </main>
        )}
        
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Collections);
//todo 涉及交易