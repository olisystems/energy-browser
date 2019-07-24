// setting up the provider
const Web3 = require('web3');
//const web3 = new Web3("ws://85.214.224.112:8547");
const web3 = new Web3("ws://80.158.47.134:7546");

// instance of energy production contract
const productionContract = new web3.eth.Contract([{ "constant": false, "inputs": [{ "name": "_enerValue", "type": "uint32" }], "name": "setEnerProduction", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_owner", "type": "string" }, { "name": "_deviceType", "type": "string" }, { "name": "_peakPowerPos", "type": "uint32" }, { "name": "_peakPowerNeg", "type": "uint32" }, { "name": "_latitude", "type": "uint32" }, { "name": "_longitude", "type": "uint32" }, { "name": "_voltageLevel", "type": "uint32" }, { "name": "_location", "type": "string" }, { "name": "_installDate", "type": "string" }], "name": "setProducer", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "pvAddr", "type": "address" }, { "indexed": false, "name": "owner", "type": "string" }, { "indexed": false, "name": "deviceType", "type": "string" }, { "indexed": false, "name": "peakPowerPos", "type": "uint32" }, { "indexed": false, "name": "peakPowerNeg", "type": "uint32" }, { "indexed": false, "name": "latitude", "type": "uint32" }, { "indexed": false, "name": "longitude", "type": "uint32" }, { "indexed": false, "name": "voltageLevel", "type": "uint32" }, { "indexed": false, "name": "location", "type": "string" }, { "indexed": false, "name": "installDate", "type": "string" }], "name": "ProducerRegs", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "oliAddr", "type": "address" }, { "indexed": false, "name": "eTime", "type": "uint256" }, { "indexed": false, "name": "enerAmount", "type": "uint32" }], "name": "EnerProductionEvent", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "oliAddr", "type": "address" }, { "indexed": false, "name": "eTime", "type": "uint256" }, { "indexed": false, "name": "enerAmount", "type": "uint32" }, { "indexed": false, "name": "txTime", "type": "uint256[]" }, { "indexed": false, "name": "txValue", "type": "uint32[]" }, { "indexed": false, "name": "blockNumber", "type": "uint256[]" }, { "indexed": false, "name": "blockHash", "type": "bytes32[]" }, { "indexed": false, "name": "txGasPrice", "type": "uint256[]" }], "name": "TestEvent", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "oliAddr", "type": "address" }, { "indexed": false, "name": "eTime", "type": "uint256" }, { "indexed": false, "name": "enerAmount", "type": "uint32" }, { "indexed": false, "name": "blockNumber", "type": "uint256" }, { "indexed": false, "name": "blockHash", "type": "bytes32" }, { "indexed": false, "name": "txGasPrice", "type": "uint256" }], "name": "ProTransactionEvent", "type": "event" }, { "constant": true, "inputs": [], "name": "countProducers", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "addr", "type": "address" }], "name": "getDeviceTypeForCoin", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getEnerProduction", "outputs": [{ "name": "", "type": "address" }, { "name": "", "type": "uint256" }, { "name": "", "type": "uint32" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "addr", "type": "address" }], "name": "getEnerProductionForCoin", "outputs": [{ "name": "", "type": "uint32[]" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "addr", "type": "address" }], "name": "getLocationForCoin", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "_proAccntAddr", "type": "address" }], "name": "getProAccntDetails", "outputs": [{ "name": "", "type": "string" }, { "name": "", "type": "string" }, { "name": "", "type": "uint32" }, { "name": "", "type": "string" }, { "name": "", "type": "uint32" }, { "name": "", "type": "uint32" }, { "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getProAccntsList", "outputs": [{ "name": "", "type": "address[]" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "_proAccntAddr", "type": "address" }], "name": "getProBalance", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getProducer", "outputs": [{ "name": "", "type": "address" }, { "name": "", "type": "string" }, { "name": "", "type": "string" }, { "name": "", "type": "uint32" }, { "name": "", "type": "uint32" }, { "name": "", "type": "uint32" }, { "name": "", "type": "uint32" }, { "name": "", "type": "uint32" }, { "name": "", "type": "string" }, { "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "_proAccntAddr", "type": "address" }], "name": "getProEnerProduction", "outputs": [{ "name": "", "type": "address" }, { "name": "", "type": "uint256[]" }, { "name": "", "type": "uint32[]" }, { "name": "", "type": "uint256[]" }, { "name": "", "type": "bytes32[]" }, { "name": "", "type": "uint256[]" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "uint256" }], "name": "proAccntList", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "producerAddr", "type": "address" }], "name": "proAccntsArr", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }], '0xb73e0567a514a60e7708acaa854dad490ae71d2c');

// instance of energy consumption contract
const consumptionContract = new web3.eth.Contract([{ "constant": false, "inputs": [{ "name": "_owner", "type": "string" }, { "name": "_deviceType", "type": "string" }, { "name": "_peakPowerPos", "type": "uint32" }, { "name": "_peakPowerNeg", "type": "uint32" }, { "name": "_latitude", "type": "uint32" }, { "name": "_longitude", "type": "uint32" }, { "name": "_voltageLevel", "type": "uint32" }, { "name": "_location", "type": "string" }, { "name": "_installDate", "type": "string" }], "name": "setConsumer", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_enerValue", "type": "uint32" }], "name": "setEnerConsumption", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "pvAddr", "type": "address" }, { "indexed": false, "name": "owner", "type": "string" }, { "indexed": false, "name": "deviceType", "type": "string" }, { "indexed": false, "name": "peakPowerPos", "type": "uint32" }, { "indexed": false, "name": "peakPowerNeg", "type": "uint32" }, { "indexed": false, "name": "latitude", "type": "uint32" }, { "indexed": false, "name": "longitude", "type": "uint32" }, { "indexed": false, "name": "voltageLevel", "type": "uint32" }, { "indexed": false, "name": "location", "type": "string" }, { "indexed": false, "name": "installDate", "type": "string" }], "name": "ConsumerRegs", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "oliAddr", "type": "address" }, { "indexed": false, "name": "eTime", "type": "uint256" }, { "indexed": false, "name": "enerAmount", "type": "uint32" }], "name": "EnerConsumptionEvent", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "oliAddr", "type": "address" }, { "indexed": false, "name": "txTime", "type": "uint256[]" }, { "indexed": false, "name": "txValue", "type": "uint32[]" }, { "indexed": false, "name": "blockNumber", "type": "uint256[]" }, { "indexed": false, "name": "blockHash", "type": "bytes32[]" }, { "indexed": false, "name": "txGasPrice", "type": "uint256[]" }], "name": "TestEvent", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "oliAddr", "type": "address" }, { "indexed": false, "name": "eTime", "type": "uint256" }, { "indexed": false, "name": "enerAmount", "type": "uint32" }, { "indexed": false, "name": "blockNumber", "type": "uint256" }, { "indexed": false, "name": "blockHash", "type": "bytes32" }, { "indexed": false, "name": "txGasPrice", "type": "uint256" }], "name": "ConsTransactionEvent", "type": "event" }, { "constant": true, "inputs": [{ "name": "", "type": "uint256" }], "name": "consAccntList", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "consumerAddr", "type": "address" }], "name": "consAccntsArr", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "countConsumers", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "_consAccntAddr", "type": "address" }], "name": "getConsAccntDetails", "outputs": [{ "name": "", "type": "string" }, { "name": "", "type": "string" }, { "name": "", "type": "uint32" }, { "name": "", "type": "string" }, { "name": "", "type": "uint32" }, { "name": "", "type": "uint32" }, { "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getConsAccntsList", "outputs": [{ "name": "", "type": "address[]" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "_consAccntAddr", "type": "address" }], "name": "getConsBalance", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "_consAccntAddr", "type": "address" }], "name": "getConsEnerConsumption", "outputs": [{ "name": "", "type": "address" }, { "name": "", "type": "uint256[]" }, { "name": "", "type": "uint32[]" }, { "name": "", "type": "uint256[]" }, { "name": "", "type": "bytes32[]" }, { "name": "", "type": "uint256[]" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getConsumer", "outputs": [{ "name": "", "type": "address" }, { "name": "", "type": "string" }, { "name": "", "type": "string" }, { "name": "", "type": "uint32" }, { "name": "", "type": "uint32" }, { "name": "", "type": "uint32" }, { "name": "", "type": "uint32" }, { "name": "", "type": "uint32" }, { "name": "", "type": "string" }, { "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getEnerConsumption", "outputs": [{ "name": "", "type": "address" }, { "name": "", "type": "uint256" }, { "name": "", "type": "uint32" }], "payable": false, "stateMutability": "view", "type": "function" }], '0x5f4525afec913b3b4c503b9e4bba93542d0cc3df');

// instance of oli coin contract
const oliCoinContract = new web3.eth.Contract([{ "constant": true, "inputs": [], "name": "totalEnergyProduced", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "name", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_spender", "type": "address" }, { "name": "_tokens", "type": "uint256" }], "name": "approve", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "_producerAddress", "type": "address" }], "name": "checkProducerRegistration", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "_proAccntAddr", "type": "address" }], "name": "getProducerEnergyBalance", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "totalTokenSupply", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_from", "type": "address" }, { "name": "_to", "type": "address" }, { "name": "_tokens", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "name": "", "type": "uint8" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getProducerAccountsList", "outputs": [{ "name": "", "type": "address[]" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "totalMintedCoins", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "_tokenOwner", "type": "address" }], "name": "balanceOf", "outputs": [{ "name": "_tokens", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "_producerAddress", "type": "address" }], "name": "getProducerAccountDetails", "outputs": [{ "name": "", "type": "string" }, { "name": "", "type": "string" }, { "name": "", "type": "uint32" }, { "name": "", "type": "string" }, { "name": "", "type": "uint32" }, { "name": "", "type": "uint32" }, { "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_to", "type": "address" }, { "name": "_tokens", "type": "uint256" }], "name": "transfer", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_energyValue", "type": "uint32" }], "name": "mintToken", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "uint256" }], "name": "producerAccountsList", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "_tokenOwner", "type": "address" }, { "name": "_spender", "type": "address" }], "name": "allowance", "outputs": [{ "name": "remaining", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_owner", "type": "string" }, { "name": "_deviceType", "type": "string" }, { "name": "_peakPowerPos", "type": "uint32" }, { "name": "_peakPowerNeg", "type": "uint32" }, { "name": "_latitude", "type": "uint32" }, { "name": "_longitude", "type": "uint32" }, { "name": "_voltageLevel", "type": "uint32" }, { "name": "_location", "type": "string" }, { "name": "_installDate", "type": "string" }], "name": "setProducer", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_energyValue", "type": "uint32" }], "name": "setEnergyProduction", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "pvAddr", "type": "address" }, { "indexed": false, "name": "owner", "type": "string" }, { "indexed": false, "name": "deviceType", "type": "string" }, { "indexed": false, "name": "peakPowerPos", "type": "uint32" }, { "indexed": false, "name": "peakPowerNeg", "type": "uint32" }, { "indexed": false, "name": "latitude", "type": "uint32" }, { "indexed": false, "name": "longitude", "type": "uint32" }, { "indexed": false, "name": "voltageLevel", "type": "uint32" }, { "indexed": false, "name": "location", "type": "string" }, { "indexed": false, "name": "installDate", "type": "string" }], "name": "ProducerRegistrationEvent", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "oliAddr", "type": "address" }, { "indexed": false, "name": "eTime", "type": "uint256" }, { "indexed": false, "name": "enerAmount", "type": "uint32" }], "name": "EnergyProductionEvent", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "totalMintedTokens", "type": "uint256" }], "name": "TotalMintedTokens", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "totalEnergy", "type": "uint256" }], "name": "TotalEnergyEvent", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "_from", "type": "address" }, { "indexed": true, "name": "_to", "type": "address" }, { "indexed": false, "name": "_tokens", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "_tokenOwner", "type": "address" }, { "indexed": true, "name": "_spender", "type": "address" }, { "indexed": false, "name": "_tokens", "type": "uint256" }], "name": "Approval", "type": "event" }], '0x806d095d8dc5fa6d7759f153e129c161f208af00');

// instance of asset logging contract
// require metadata
const metadata = require('./metadata.js');
const AssetLoggingContract = new web3.eth.Contract(metadata.assetLoggingABI, metadata.assetLogging);

export { productionContract, consumptionContract, oliCoinContract, AssetLoggingContract };
export default web3;
