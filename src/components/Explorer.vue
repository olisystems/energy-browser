<template>
  <div id="explorer">
    <div class="search-container">
      <form class="search-bar" @submit.prevent="getAccounts">
        <input type="text" placeholder="Search for hashes" required v-model="address">
        <input type="submit" value="Search" class="btn">
      </form>

      <div class="date-picker">
        <div>
          <span>Start Date</span>
          <input type="date" v-model="startdate" :max="maxDate" v-on:input="checkStartDate">
        </div>
        <div>
          <span>End Date</span>
          <input type="date" v-model="enddate" disabled>
        </div>
      </div>
    </div>

    <div class="main-body">
      <div class="main">
        <div class="accounts">
          <div class="search-results overflow-text">
            Found {{ accounts.length }} results for the contract
            <em>{{lastAddress}}.</em>
          </div>

          <div class="main-column">
            <div class="col-1 head-box">
              <h2>Account Address</h2>
            </div>

            <div class="column-body account-list">
              <ol>
                <li
                  v-on:click="getAccountHashes"
                  v-for="(account, index) in accounts"
                  v-bind:key="index"
                  class="overflow-text"
                >{{ account }}</li>
              </ol>
              <!-- <h4 v-on:click="getTxObject(hash)">{{ hash.title }}</h4> -->
            </div>
          </div>
        </div>

        <div class="stat">
          <div class="top-stat">
            <div class="total-tx">
              <div class="top-bar-box head-col1">
                <h4>Total Transactions</h4>
              </div>
              <div class="top-bar-box stats-box">
                <h3 class="stats">{{hashes.length}}</h3>
              </div>
            </div>

            <div class="total-energy-production top-bar-col">
              <div class="top-bar-box head-col2">
                <h4>Total Blocks</h4>
              </div>
              <div class="top-bar-box stats-box">
                <h3 class="stats">{{blocksPerDay}}</h3>
              </div>
            </div>

            <div class="total-minted-coins top-bar-col">
              <div class="top-bar-box head-col3">
                <h4>Total Day(s)</h4>
              </div>
              <div class="top-bar-box stats-box">
                <h3 class="stats">{{days}}</h3>
              </div>
            </div>
            <div class="download-btn">
              <button @click="download_csv">Download CSV</button>
            </div>
          </div>
          <div class="graph">
            <div class="explorer-plot column-body" id="explorer-plot" v-if="accounts.length">
              <div class="placeholder">
                <h5>select an account to view the history</h5>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="hashes">
        <div class="tx-hashes" v-if="accounts.length">
          <div class="search-results overflow-text">
            Found {{ accountHashes.length }} results for the account
            <em>{{accountTitle}}.</em>
          </div>
          <div class="main-column">
            <div class="col-2 head-box">
              <h2>Hashes</h2>
            </div>

            <div v-if="accountHashes.length" class="hash-list-div column-body">
              <ol>
                <li
                  v-on:click="getTxObject"
                  class="overflow-text"
                  v-for="(accountHashe, index) in accountHashes"
                  v-bind:key="index"
                >{{accountHashe.hash}}</li>
              </ol>
            </div>
            <div class="no-data" v-else>No account selected.</div>
          </div>

          <div class="hash-stat">
            <p>The selected hash:</p>

            <table class="details-table hash-stat-table">
              <tbody>
                <tr>
                  <th class="hash-stat-name">Function Hash:</th>
                  <td class="hash-stat-value">{{functionHash}}</td>
                </tr>
                <tr>
                  <th class="hash-stat-name">Type:</th>
                  <td class="hash-stat-value">{{functionName}}</td>
                </tr>
                <tr>
                  <th class="hash-stat-name">Value:</th>
                  <td class="hash-stat-value">{{hashValue}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="tx-object" v-if="accountHashes.length">
          <div class="search-results overflow-text">
            Showing results for hash
            <em>{{hashTitle}}.</em>
          </div>
          <div class="main-column">
            <div class="col-3 head-box">
              <h2>Transaction Object</h2>
            </div>

            <div v-if="Object.entries(txObject).length" class="column-body">
              <div class="hash-object-div">
                <table class="details-table">
                  <tbody>
                    <tr>
                      <th class="property-name">Time:</th>
                      <td class="property-value">{{txObject.time}}</td>
                    </tr>
                    <tr>
                      <th class="property-name">Hash:</th>
                      <td class="property-value">{{txObject.hash}}</td>
                    </tr>
                    <tr>
                      <th class="property-name">Block Number:</th>
                      <td class="property-value">{{txObject.blockNumber}}</td>
                    </tr>
                    <tr>
                      <th class="property-name">Chain Id:</th>
                      <td class="property-value">{{txObject.chainId}}</td>
                    </tr>
                    <tr>
                      <th class="property-name">From:</th>
                      <td class="property-value">{{txObject.from}}</td>
                    </tr>
                    <tr>
                      <th class="property-name">Gas:</th>
                      <td class="property-value">{{txObject.gas}}</td>
                    </tr>
                    <tr>
                      <th class="property-name">Gas Price:</th>
                      <td class="property-value">{{txObject.gasPrice}}</td>
                    </tr>
                    <tr>
                      <th class="property-name">Input:</th>
                      <td class="property-value">{{txObject.input}}</td>
                    </tr>
                    <tr>
                      <th class="property-name">Nonce:</th>
                      <td class="property-value">{{txObject.nonce}}</td>
                    </tr>
                    <tr>
                      <th class="property-name">Public Key:</th>
                      <td class="property-value">{{txObject.publicKey}}</td>
                    </tr>
                    <tr>
                      <th class="property-name">R:</th>
                      <td class="property-value">{{txObject.r}}</td>
                    </tr>
                    <tr>
                      <th class="property-name">Raw:</th>
                      <td class="property-value">{{txObject.raw}}</td>
                    </tr>
                    <tr>
                      <th class="property-name">S:</th>
                      <td class="property-value">{{txObject.s}}</td>
                    </tr>
                    <tr>
                      <th class="property-name">StandardV:</th>
                      <td class="property-value">{{txObject.standardV}}</td>
                    </tr>
                    <tr>
                      <th class="property-name">To:</th>
                      <td class="property-value">{{txObject.to}}</td>
                    </tr>
                    <tr>
                      <th class="property-name">Transaction Index:</th>
                      <td class="property-value">{{txObject.transactionIndex}}</td>
                    </tr>
                    <tr>
                      <th class="property-name">V:</th>
                      <td class="property-value">{{txObject.v}}</td>
                    </tr>
                    <tr>
                      <th class="property-name">Value:</th>
                      <td class="property-value">{{txObject.value}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="no-data" v-else>select an hash to see the transaction object</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const $ = require("jquery");
const moment = require("moment");
import Plotly from "plotly.js-dist";
import web3 from "../assets/js/contracts.js";
// setting up the provider
// const Web3 = require("web3");
// //const web3 = new Web3("ws://85.214.224.112:8547");
// const web3 = new Web3("ws://80.158.47.134:7546");

import {
  timeConverter,
  currentTime,
  formatTime
} from "../assets/js/time-format.js";

export default {
  name: "Explorer",
  data() {
    return {
      accounts: [],
      address: "0xFC872C53Cb327310cCC1E625135666a943Ce3111",
      //0xcfeE40704ee75f55886bF883cb37c8353aC31f7f
      lastAddress: "",
      accountTitle: "",
      hashes: [],
      hashTitle: "",
      txObject: {},
      accountHashes: [],
      transactionObjects: [],
      functionHash: "",
      functionName: "",
      hashValue: "",
      days: 1,
      blocksPerDay: 10,
      graphData: [],
      downloadData: [],
      maxDate: new Date().toISOString().split("T")[0],
      startdate: new Date().toISOString().split("T")[0],
      enddate: new Date().toISOString().split("T")[0]
    };
  },
  methods: {
    download_csv() {
      this.downloadData = [];
      let functionHashString;
      let functionHash;
      this.transactionObjects.forEach(hash => {
        functionHash = hash.input.slice(2, 10);
        switch (functionHash) {
          case "f1f1ecb7":
            functionHashString = "Energy Production";
            break;
          case "203aec33":
            functionHashString = "Energy Consumption";
            break;
          default:
            functionHashString = "Unknown";
        }
        this.downloadData.push({
          from: hash.from,
          functionName: functionHashString,
          value: web3.utils.toDecimal(
            "0x" + hash.input.slice(hash.input.length - 6, hash.input.length)
          ),
          time: hash.time,
          blockNumber: hash.blockNumber,
          txHash: hash.hash
        });
      });
      let csv =
        "From, Function Hash, Value, Time, Block Number, Transaction Hash\n";
      //console.log(csv);
      this.downloadData.forEach(row => {
        csv += Object.values(row);
        csv += "\n";
      });
      let downloader = document.createElement("a");
      downloader.href = "data:text/csv;charset=utf-8," + encodeURI(csv);
      downloader.target = "_blank";
      downloader.download = "data.csv";
      downloader.click();
    },
    plot() {
      function toDate(ts) {
        return new Date(ts);
      }
      let time = [];
      let input = [];
      this.graphData.sort(function(a, b) {
        // turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(a.time) - new Date(b.time);
      });

      this.graphData.forEach(data => {
        time.push(data.time);
        input.push(data.input);
      });
      const data = [
        {
          mode: "lines+markers",
          x: time.map(toDate),
          y: input,
          line: {
            shape: "linear",
            color: "#009933"
          },
          type: "scatter"
        }
      ];

      const layout = {
        title: "Energy Production Values",
        font: { size: 12 },
        xaxis: {
          type: "date",
          nticks: 5,
          tickformat: "%H:%M:%S",
          hoverformat: "%H:%M:%S",
          linecolor: "lightgray",
          linewidth: 0.5
        },
        yaxis: {
          tickformat: ",d",
          linecolor: "lightgray",
          linewidth: 0.5,
          titlefont: {
            color: "black"
          },
          exponentformat: "e"
        },
        margin: {
          l: 50,
          r: 30,
          b: 50,
          t: 40,
          pad: 4
        }
      };

      Plotly.newPlot("explorer-plot", data, layout, { responsive: true });
    },
    async searchContract(contractAddress, numberX) {
      let endBlockNumber = await web3.eth.getBlockNumber();
      let startBlockNumber = endBlockNumber - numberX;
      // loop through the blocks to get block transactions
      for (let i = startBlockNumber; i <= endBlockNumber; i++) {
        /*
         * If true, the returned block will contain all transactions as objects
         * if false it will only contains the transaction hashes
         * var block = await web3.eth.getBlock(i, true);
         */
        let block = await web3.eth.getBlock(i, true);
        //console.log(block);
        block.transactions.forEach(tx => {
          // filter out transactions for a specific smart contract

          if (tx.to === contractAddress) {
            this.hashes.push(tx);
            this.transactionObjects.push({
              hash: tx.hash,
              time: timeConverter(block.timestamp),
              blockHash: tx.to,
              blockNumber: tx.blockNumber,
              chainId: tx.chainId,
              // condition: x.condition,
              // creates: x.creates,
              from: tx.from,
              gas: tx.gas,
              gasPrice: tx.gasPrice,
              input: tx.input,
              nonce: tx.nonce,
              publicKey: tx.publicKey,
              r: tx.r,
              raw: tx.raw,
              s: tx.s,
              standardV: tx.standardV,
              to: tx.to,
              transactionIndex: tx.transactionIndex,
              v: tx.v,
              value: tx.value
            });
            // check if address already exists in array
            if (this.accounts.indexOf(tx.from) === -1) {
              this.accounts.push(tx.from);
            }
          }
        });
      }
    },
    getAccounts() {
      this.hashes = [];
      this.accounts = [];
      this.days = 1;
      this.blocksPerDay = 50;
      this.searchContract(this.address, this.blocksPerDay);
      this.lastAddress = this.address;
      /*
       * empty account title and account's transaction array
       * for every new search
       */
      this.accountTitle = "";
      this.accountHashes = [];
      this.txObject = {};
      this.hashTitle = "";
    },
    // get tx hashes for a particlar account
    getAccountHashes() {
      this.accountHashes = [];
      this.txObject = {};
      this.hashTitle = "";
      this.graphData = [];
      this.hashes.forEach(hash => {
        if (hash.from === event.target.innerHTML) {
          // push transaction hashes
          this.accountHashes.push(hash);
          this.accountTitle = event.target.innerHTML;
        }
      });
      // create transaction object for each hash
      this.accountHashes.forEach(accountHash => {
        this.transactionObjects.forEach(txObj => {
          /*
           * from can not be compared because there are two froms
           * for first match it will add both two froms
           * then for 3nd match it will again add 2 froms
           * hash can be matched because it is unique
           */
          if (accountHash.hash === txObj.hash) {
            this.graphData.push({
              // hash: txObj.hash,
              from: txObj.from,
              time: txObj.time,
              input: web3.utils.toDecimal(
                "0x" +
                  txObj.input.slice(txObj.input.length - 6, txObj.input.length)
              )
            });
          }
        });
      });

      // removing the background color for ul-selected items
      document.querySelectorAll(".column-body > ol>li").forEach(account => {
        account.classList.remove("active");
      });
      // add background to selected account
      event.target.classList.add("active");
      $(".placeholder").hide();
      this.plot();
      $(".hash-stat").hide();
    },
    /*
     * display all hashes selected account from the above function
     * get tx object for selected hash
     * modify the getTxObject method: instead of passing parameter, use event.target.innerHTML
     * to compare with the array hashes accountHashes from above function
     */

    async getTxObject() {
      this.transactionObjects.forEach(txObj => {
        //seeg(x.blockNumber);
        if (txObj.hash === event.target.innerHTML) {
          // this.tx = JSON.stringify(selectedItem, null, 2);
          this.txObject = {
            hash: txObj.hash,
            time: txObj.time,
            blockHash: txObj.to,
            blockNumber: txObj.blockNumber,
            chainId: txObj.chainId,
            // condition: x.condition,
            // creates: x.creates,
            from: txObj.from,
            gas: txObj.gas,
            gasPrice: txObj.gasPrice,
            input: txObj.input,
            nonce: txObj.nonce,
            publicKey: txObj.publicKey,
            r: txObj.r,
            raw: txObj.raw,
            s: txObj.s,
            standardV: txObj.standardV,
            to: txObj.to,
            transactionIndex: txObj.transactionIndex,
            v: txObj.v,
            value: txObj.value
          };

          this.hashTitle = event.target.innerHTML;
        }
      });

      // getting function hash
      this.functionHash = this.txObject.input.slice(2, 10);
      // getting value sent
      this.hashValue = web3.utils.hexToNumber(
        "0x" +
          this.txObject.input.slice(
            this.txObject.input.length - 6,
            this.txObject.input.length
          )
      );
      // getting function name
      switch (this.functionHash) {
        case "f1f1ecb7":
          this.functionName = "Energy Production";
          break;
        case "9926188f":
          this.functionName = "Energy Consumption";
          break;
        default:
          this.functionName = "Unknown";
      }
      // slicing the long values
      // Object.keys(this.txObject).map(k => {
      //   if (this.txObject[k].length > 20) {
      //     this.txObject[k] = this.txObject[k].slice(0, 30) + "....";
      //   }
      // });

      // removing the background color for ul-selected items
      document.querySelectorAll(".hash-list-div > ol>li").forEach(account => {
        account.classList.remove("active");
      });
      // add background to selected account
      event.target.classList.add("active");

      $(".hash-stat").show();
    },

    async checkStartDate() {
      let dateA = moment(this.startdate, "YYYY-MM-DD"); // replace format by your one
      let dateB = moment(this.enddate, "YYYY-MM-DD");
      //console.log(this.blocksPerDay);
      if (dateA.diff(dateB) === 0) {
        // do something if A is later than B
        this.days = 1;
        this.blocksPerDay = 10;
        this.blocksPerDay *= this.days;
        this.hashes = [];
        this.transactionObjects = [];
        this.searchContract(this.address, this.blocksPerDay);
        alert("start date is greater");
      } else {
        // do something if B is later that A
        this.days = dateB.diff(dateA, "days") + 1;
        this.blocksPerDay = 10;
        this.blocksPerDay *= this.days;
        this.hashes = [];
        this.transactionObjects = [];
        this.searchContract(this.address, this.blocksPerDay);
        //console.log(this.days);
        //console.log(this.blocksPerDay);
      }
    }
  },
  // default search on page load
  created() {
    this.getAccounts();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h2 {
  font-size: 1.25rem;
  text-transform: uppercase;
}

.search-container {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgb(235, 231, 231);
}

.search-bar {
  display: flex;
  justify-content: center;
  width: 100%;
  border-left: 0;
  border-right: 0;
  margin-bottom: 1rem;
}

.search-bar > input {
  border-radius: 2px;
}

.search-bar > input[type="text"] {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  flex-basis: 50%;
  max-width: 450px;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #e9e9e9;
  border-right: none;
}

.search-bar > input[type="submit"] {
  background-color: #fdd922;
  color: #333333;
  padding: 1rem;
  border: 1px solid #e0bc27;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  font-size: 0.8rem;
  font-weight: bold;
  text-transform: uppercase;
  user-select: none;
}

.date-picker {
  display: flex;
  align-items: center;
}

input[type="date"] {
  font-family: "PT Sans", sans-serif;
  font-size: 1.2rem;
  padding: 0.5rem;
  border: none;
  border: 0.09rem solid #ccc;
  -webkit-border-radius: 5px;
  border-radius: 3px;
  width: 200px;
  margin: 10px;
}

/* Remove increment and decrement icon from input field */
input[type="date"]::-webkit-inner-spin-button,
input[type="date"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
}

.search-results {
  padding-bottom: 1rem;
}

.search-results,
.search-term {
  font-style: italic;
}

.main-body {
  display: flex;
  flex-direction: column;
  padding: 2rem;
}

.main {
  padding: 2rem;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  color: #3e5252;
}

.accounts {
  width: 40%;
}

.col-1 {
  background-color: #c0dbe2;
  margin-bottom: 0;
}

.stat {
  width: 55%;
}

.top-stat {
  display: flex;
  justify-content: space-between;
  text-align: center;
  margin: auto;
  align-items: flex-end;
}

.download-btn {
  display: flex;
}

button {
  padding: 10px;
  border: 1px solid #013646;
  border-radius: 2px;
  background-color: #154360;
  color: white;
  font-size: 0.8rem;
  cursor: pointer;
}

.top-bar-box {
  background: white;
  padding: 2px 20px;
  -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.08);
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.08);
}

.head-col1 {
  background-color: #cdf1c3;
  margin-bottom: 0;
}

.head-col2 {
  background-color: #c0dbe2;
  margin-bottom: 0;
}

.head-col3 {
  background-color: #ccb9da;
  margin-bottom: 0;
}

.stats {
  color: #6b81ad;
  font-weight: bold;
  font-size: 24px;
}
.graph {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
}

.explorer-plot {
  min-height: 300px;
  width: 100%;
  padding: 20px;
  height: 405px;
}

/* disable plotly toolbar */

.modebar {
  display: none !important;
}

.placeholder {
  text-align: center;
  line-height: 300px;
}

h5 {
  color: #bbbbbb;
}

.hashes {
  display: flex;
  justify-content: space-between;
  padding: 2rem;
}

.tx-hashes,
.tx-object {
  display: flex;
  flex-direction: column;
}

.tx-hashes {
  width: 40%;
}

.tx-object {
  width: 55%;
}

.hash-stat {
  display: flex;
  flex-direction: column;
  background: rgb(228, 222, 222);
  border: #bbbab8 1px solid;
  border-radius: 2px;
  padding: 0.5rem;
  margin-top: auto;
  display: none;
}
p {
  text-align: left;
}

.hash-object-div {
  width: 100%;
}

.details-table {
  padding: 0.5rem;
  border: #d8d3d3 1px solid;
  border-radius: 2px;
  width: 100%;
  table-layout: fixed;
}

.property-name {
  padding: 0.3rem;
  background: #f2f0f3;
  font-size: 0.8rem;
  text-align: left;
  width: 20%;
  border: #d8d3d3 1px solid;
  border-radius: 2px;
}

.property-value {
  color: #394f7c;
  padding: 0.5rem;
  font-size: 0.8rem;
  font-weight: bold;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.hash-stat-name {
  width: 40%;
  background: none;
  border: #976c09;
  font-weight: normal;
  text-align: left;
}

.hash-stat > p {
  font-style: italic;
  padding: 0;
}

.hash-stat-value {
  font-size: 1.2rem;
}

.hash-stat-table,
.hash-stat-value {
  border: none;
}

td {
  border-bottom: 1px solid #cccccc;
  text-align: left;
}

tbody > tr:last-child > td {
  border-bottom: none;
}

.head-box {
  padding: 10px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.08);
}

.column-body {
  background: white;
  padding: 20px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.08);
}

.main-column {
  box-sizing: border-box;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.08);
}

.col-2 {
  background-color: #cdf1c3;
}

.hash-list-div,
.account-list {
  max-height: 458px;
  overflow-y: auto;
  text-align: left;
}

/* ::-webkit-scrollbar {
  display: none;
} */

.overflow-text {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.col-3 {
  background-color: #ccb9da;
}

.no-data {
  margin-top: 2em;
  padding: 0.5rem;
}

.last {
  padding-bottom: 1rem;
}

span {
  font-weight: normal;
}

button:focus {
  outline: none;
}

ol {
  margin: 0 0 0;
  padding: 0;
  counter-reset: item;
  cursor: pointer;
}

ol > li {
  padding: 1em;
  list-style-type: none;
  counter-increment: item;
  transition: background-color 0.3s ease;
  text-indent: -1em;
  border-bottom: 1px solid #ccc;
}

li:last-child {
  border: none;
}

ol > li:hover {
  background: #f6f6f6;
}

ol > li:before {
  display: inline-block;
  width: 1.5em;
  padding-right: 0.5em;
  content: counter(item) ".";
  text-align: right;
  font-weight: bold;
}

.active {
  background-color: #e4e3e3;
  padding: 1em;
}

@media (max-width: 950px) {
  h2 {
    text-align: center;
    font-size: 14px;
  }
  .main-column {
    font-size: 12px;
  }
}
@media (max-width: 700px) {
  .date-picker {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}

@media (max-width: 700px) {
  .main {
    padding: 2rem;
    flex-direction: column;
  }

  .accounts,
  .tx-hashes,
  .tx-object {
    padding: 1rem;
    width: 90%;
    display: flex;
    flex-direction: column;
    margin: auto;
    text-align: center;
  }

  .main-column {
    font-size: 14px;
  }

  .tx-object {
    text-align: left;
  }

  .title {
    padding-bottom: 2rem;
  }

  .title > h1 {
    font-size: 2rem;
    margin: -7px 0 0 4px;
  }

  .search-bar > input[type="text"] {
    flex-basis: 100%;
  }

  .search-results {
    padding-bottom: 2rem;
  }

  h2 {
    text-align: center;
  }
}
</style>
