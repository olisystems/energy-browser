/* eslint-disable */
import Web3 from "web3";

 //const VOLTA_NODE = "wss://volta-blockchain.my-oli.com";
const VOLTA_NODE = "ws://80.158.47.134:7546";
//var provider = new Web3.providers.WebsocketProvider(VOLTA_NODE);
// var web3 = new Web3("ws://80.158.47.134:7546");

 var web3 = new Web3(VOLTA_NODE);


export default web3;
