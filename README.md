
# OLI DApps Portal
Decentralized applications built on the top of Volta Ethereum network 

1. [Description](#Description)
2. [Getting Started](#GettingStarted)
	2.1. [Prerequisites](#Prerequisites)
	2.2. [Installing](#Installing)
3. [Features](#Features)
4. [Deployed Contract (Volta)](#DeployedContractVolta)
5. [Built With](#BuiltWith)
6. [Contributing](#Contributing)

##  1. <a name='Description'></a>Description

##  2. <a name='GettingStarted'></a>Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

###  2.1. <a name='Prerequisites'></a>Prerequisites
Please make sure you've already installed Truffle and enabled MetaMask extension in your browser.

```
* Truffle v5.0.41 (core: 5.0.41)
* Solidity v0.5.8 (solc-js)
* Node v10.16.3
* Web3.js v1.2.1
```

###  2.2. <a name='Installing'></a>Installing
Follow the steps below to have development environment running:
1. Clone the repository:
```
git clone https://github.com/olisystems/energy-browser.git
```

2. Change directory to `app` folder and install all requisite npm packages (as listed in `package.json`):
```
cd app
npm install
```
3. Compile the smart contracts:
```
truffle compile
```
This will create the smart contract artifacts in folder `src\assets\js\contracts`.

4. Migrate smart contracts to `volta` chain:
```
truffle migrate --network volta
```

5. Test smart contracts:
```
truffle test
```

6. Compiles and hot-reloads for development, run the following command inside `app` directory:
```
npm run serve
```
Navigate to `localhost:8080` in your browser.

7. Compiles and minifies for production:
```
npm run build
```
##  3. <a name='Features'></a>Features
* Energy Geo Browser
* Oli Chain Explorer
* Oli Tokenization
* Asset Logging
##  4. <a name='DeployedContractVolta'></a>Deployed Contract (Volta)
The contracts are deployed at following addresses on volta:
```
Asset Logging: 0x3816CB8e5189f180cA2E6C59C9752cE1f42Bf6f0
Energy Production: 0x6d434C87e4595E61D7F4A4BA18A8b0E6928Ec401
Energy Consumption: 0x7CA621e2C6407fB5c16FE6FD091516cb5fF604b2
Oli Coin: 0xa4000880b6eb9Eebad52275a3aaDFD9Ec3F536D5
```

##  5. <a name='BuiltWith'></a>Built With
* [Ethereum](https://www.ethereum.org/) - Ethereum is a decentralized platform that runs smart contracts
* [IPFS](https://ipfs.io/) - IPFS is the Distributed Web | A peer-to-peer hypermedia protocol
to make the web faster, safer, and more open.
* [Truffle Framework](http://truffleframework.com/) - Truffle is the most popular development framework for Ethereum with a mission to make your life a whole lot easier.
##  6. <a name='Contributing'></a>Contributing
Pull requests are welcome.

1. Fork the repository.
2. Create your new feature branch: `git checkout -b new-feature-branch`
3. Stage your changes: `git add .`
4. Commit the changes: `git commit -m "add commit message"`
5. `push` to the branch: `git push origin new-feature-branch`
6. Submit a `pull request`.