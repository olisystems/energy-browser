const fs = require("fs");
const path = require("path");

const ENDPOINT = "ws://services.my-oli.com/volta-node";
const MNEMONIC = fs.readFileSync(".secret").toString().trim();
const HDWalletProvider = require("@truffle/hdwallet-provider");

/**
 * run the following command in the terminal
 * then run the migrate command with the
 * network development
 * kubectl -n ws-migration port-forward volta-node-0 8546
 */

module.exports = {
  contracts_build_directory: path.join(
    __dirname,
    "../app/src/assets/js/contracts"
  ),

  networks: {
    development: {
      host: "127.0.0.1",
      port: 8546,
      network_id: "*",
      websockets: true,
    },

    voltaK8S: {
      provider: function () {
        return new HDWalletProvider(MNEMONIC, ENDPOINT);
      },
      network_id: 73799,
    },

    volta: {
      host: "80.158.47.134",
      port: 7546,
      network_id: 73799,
      websockets: true,
    },
  },

  mocha: {
    enableTimeouts: false,
  },

  // Configure your compilers
  compilers: {
    solc: {
      // version: "0.5.1",    // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      // settings: {          // See the solidity docs for advice about optimization and evmVersion
      //  optimizer: {
      //    enabled: false,
      //    runs: 200
      //  },
      //  evmVersion: "byzantium"
      // }
    },
  },
};
// "PV 7", "PV", "0x3D481ee06aFe587dAe5EAFA541c75c3D1F9dCdBc", "0xe2e457aB987BEd9AbdEE9410FC985E46e28a3947", "0x157cb51153D26B3F4491a3e706d005d0ac696376", 400, 800, "Urban", "25-11-2019"
