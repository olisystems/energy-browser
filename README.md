
# OLI DApps Portal
Decentralized applications built on the top of Volta Ethereum network 

[Demo](oli-chain.com)

**Table of Contents**
- [OLI DApps Portal](#oli-dapps-portal)
	- [Getting Started](#getting-started)
		- [Prerequisites](#prerequisites)
		- [Installing](#installing)
	- [Features](#features)
	- [Deployed Contract (Volta)](#deployed-contract-volta)
	- [Built With](#built-with)
	- [Contributing](#contributing)

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

### Prerequisites
Please make sure you've already installed Truffle and enabled MetaMask extension in your browser.

```
* Truffle v5.0.41 (core: 5.0.41)
* Solidity v0.5.8 (solc-js)
* Node v12
* Web3.js v1.3.0
```

### Installing
Follow the steps below to have development environment running:
1. Clone the repository:
```
$ git clone https://github.com/olisystems/energy-browser.git
```

2. Change directory to `app` folder and install all requisite npm packages (as listed in `package.json`):
```
$ cd app
$ npm install
```
3. Compile the smart contracts:
```
$ cd truffle
$ npm install
$ truffle compile
```
This will create the smart contract artifacts in folder `src\assets\js\contracts`.

4. Migrate smart contracts to `volta` chain:
```
$ npm run migrate
```

5. Test smart contracts:
```
$ truffle test
```

6. Compiles and hot-reloads for development, run the following command inside `app` directory:
```
$ npm run serve
```
Navigate to `localhost:8080` in your browser.

7. Compiles and minifies for production:
```
$ npm run build
```
## Features
* [Energy Geo Browser](./app/src/components/browser/Browser.md)
* [Oli Chain Explorer](./app/src/components/explorer/Explorer.md)
* [Oli Tokenization](./app/src/components/tokenization/Tokenization.md)
* [Asset Logging](./app/src/components/logging/AssetLogging.md)
* [Charging Origin](./app/src/components/logging/ChargingOrigin.md)
  
## Deployed Contract (Volta)
The contracts are deployed at following addresses on volta:

Asset Logging: `0xb7c1b94bD89D2Dafb6E1AdDEd0Cf2EA69EE0A93F`

Energy Production: `0x963c70bE105c648517490EDd03DF1508820Fa52B`

Energy Consumption: `0xB9Aa95c780C520158b1F460CE00408ff66623355`

Oli Coin: `0xA6AC74D3c11fD4F217A15ec46Ac7318831664051`

Charging Origin: `0x15d1CB843dafCa2dB0971B883b734FF839ae9fE6`


## Built With
* [Ethereum](https://www.ethereum.org/) - Ethereum is a decentralized platform that runs smart contracts
* [Web3.js](https://web3js.readthedocs.io/en/v1.2.7/#web3-js-ethereum-javascript-api) - A collection of libraries which allow interacting with a local or remote ethereum node, using an HTTP or IPC connection.
* [Vue.js](https://vuejs.org/) - The JavaScript framework for the frontend and handling all the view-related stuff
* [Truffle Framework](http://truffleframework.com/) - Truffle is the most popular development framework for Ethereum with a mission to make your life a whole lot easier.
  
## Contributing
Pull requests are welcome.

1. Fork the repository.
2. Create your new feature branch: `git checkout -b new-feature-branch`
3. Stage your changes: `git add .`
4. Commit the changes: `git commit -m "add commit message"`
5. `push` to the branch: `git push origin new-feature-branch`
6. Submit a `pull request`.