import Web3 from 'web3';
var web3;
try {
  web3 = new Web3(window.ethereum);
  // web3 = new Web3(new Web3.providers.HttpProvider('https://matic-mainnet--jsonrpc.datahub.figment.io/apikey/e84b63fff0e37deb30837101f20eb793/'))
} catch (error) {
  // web3 = new Web3(new Web3.providers.HttpProvider('https://polygon-mainnet.infura.io/v3/0fa18faacfb1453c9ced01f9eef62915'))
  web3 = new Web3('ws://localhost:8546');
}
export default web3;