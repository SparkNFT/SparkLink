require("@nomiclabs/hardhat-web3");

module.exports = {
	defaultNetwork: "dummy",
	networks: {
		dummy: {
			url: "http://localhost:8545",
			chainId: 31337,
		},
	},
};