import Web3 from 'web3';
var web3;
try {
  web3 = new Web3(window.ethereum);

//   if (GetUrlRelativePath) {
//    web3 = new Web3(new Web3.providers.HttpProvider('https://matic-mainnet--jsonrpc.datahub.figment.io/apikey/e84b63fff0e37deb30837101f20eb793/'))
//   }
//   else {
//web3 = new Web3(window.web3.currentProvider);
    
//  }
  // if (window.ethereum.isMathWallet) 
  //   web3 = new Web3(window.ethereum);
  //web3 = new Web3(new Web3.providers.HttpProvider('https://matic-mainnet--jsonrpc.datahub.figment.io/apikey/e84b63fff0e37deb30837101f20eb793/'))

  //web3 = new Web3(window.ethereum);
  //web3 = new Web3(new Web3.providers.HttpProvider('https://matic-mainnet--jsonrpc.datahub.figment.io/apikey/e84b63fff0e37deb30837101f20eb793/'))
} catch (error) {
  web3 = new Web3('ws://localhost:8546');
}

// function GetUrlRelativePath() {
//   let url = document.location.toString();
//   let arrUrl = url.split("//");
//   let start = arrUrl[1].indexOf("/");
//   let relUrl = arrUrl[1].substring(start);//stop省略，截取从start开始到结尾的所有字符
//   if (relUrl.indexOf("?") != -1) {
//     relUrl = relUrl.split("?")[0];
//   }
//   console.log(relUrl)
//   return relUrl === '/#/collections';
// }
export default web3;