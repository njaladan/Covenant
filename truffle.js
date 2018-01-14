var HDWalletProvider = require("truffle-hdwallet-provider");

const Web3 = require("web3");
const web3 = new Web3();
//var keystore = require('fs').readFileSync('keystore/eth_keystore.txt').toString();




module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    }
  },

  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  }
};
