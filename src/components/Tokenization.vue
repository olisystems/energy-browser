<template>
  <div class="tokenization">
    <div class="top-bar">
      <div class="total-producer top-bar-col">
        <div class="top-bar-box head-col1">
          <h4>Total Producers</h4>
        </div>
        <div class="top-bar-box stats-box">
          <h3 class="stats">{{totalProducers}}</h3>
        </div>
      </div>

      <div class="total-energy-production top-bar-col">
        <div class="top-bar-box head-col2">
          <h4>Total Energy Production</h4>
        </div>
        <div class="top-bar-box stats-box">
          <h3 class="stats">{{totalEnergy}}</h3>
          <span>Wh</span>
        </div>
      </div>

      <div class="total-minted-coins top-bar-col">
        <div class="top-bar-box head-col3">
          <h4>Total Minted Coins</h4>
        </div>
        <div class="top-bar-box stats-box">
          <h3 class="stats">{{totalMintedCoins}}</h3>
          <span>OLC</span>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="producers">
        <div class="producer-list-heading box heading">
          <h3>List of Producers</h3>
        </div>
        <div class="producer-list box">
          <ol>
            <li
              class="overflow-text"
              v-for="(producer, index) in producers"
              v-bind:key="index"
              @click="getProducerDetails"
            >{{producer}}</li>
          </ol>
        </div>
      </div>

      <div class="main-details">
        <div class="inforgraphics">
          <div class="production-details">
            <div class="heading box">
              <h4>Total Production</h4>
            </div>
            <div class="production-value box">
              <h3 class="stats">{{producerEnergyBalance}}</h3>
              <span>Wh</span>
            </div>
          </div>

          <div class="coin-details">
            <div class="heading box">
              <h4>Total Coins</h4>
            </div>
            <div class="coin-value box">
              <h3 class="stats">{{producerTokenBalance}}</h3>
              <span>OLC</span>
            </div>
          </div>
        </div>
        <div class="producer-details">
          <div class="heading box">
            <h3>Producer Details</h3>
          </div>
          <div class="details box">
            <div class="placeholder">
              <h5>select an account to see the details</h5>
            </div>
            <table class="details-table">
              <tbody>
                <tr>
                  <th class="property-name">Name:</th>
                  <td class="property-value">{{producer[0]}}</td>
                </tr>
                <tr>
                  <th class="property-name">Device Type:</th>
                  <td class="property-value">{{producer[1]}}</td>
                </tr>
                <tr>
                  <th class="property-name">Peak Power (+) [W]:</th>
                  <td class="property-value">{{producer[2]}}</td>
                </tr>
                <tr>
                  <th class="property-name">Latitude:</th>
                  <td class="property-value">{{producer[3]}}</td>
                </tr>
                <tr>
                  <th class="property-name">Longitude:</th>
                  <td class="property-value">{{producer[4]}}</td>
                </tr>
                <tr>
                  <th class="property-name">Install Date:</th>
                  <td class="property-value">{{producer[5]}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import web3 from "../assets/js/contracts.js";
import { oliCoinContract } from "../assets/js/contracts.js";
const $ = require("jquery");
import { log } from "util";
export default {
  name: "Tokenization",
  data() {
    return {
      ethAccounts: [],
      producers: [],
      totalProducers: "",
      totalEnergy: "",
      totalMintedCoins: "",
      producerEnergyBalance: "",
      producerTokenBalance: "",
      producer: [],
      selected: "",
      toAddress: "",
      amount: null,
      tokenTransferTx: [],
      filters: {
        name: { value: "", keys: ["_from"] }
      },
      currentPage: 1,
      totalPages: 0
    };
  },
  methods: {
    getEthAccounts() {
      web3.eth.getAccounts().then(accounts => {
        accounts.forEach(account => {
          this.ethAccounts.push(account);
        });
      });
    },
    getProducers() {
      this.totalProducers = "";
      this.totalEnergy = "";
      this.totalMintedCoins = "";
      this.producers = [];
      oliCoinContract.methods
        .getProducerAccountsList()
        .call({ from: this.ethAccounts[0] }, (error, result) => {
          if (!error) {
            result.shift();
            result.forEach(producer => {
              this.producers.push(producer);
            });
            this.totalProducers = result.length;
            this.getTotalEnergy();
            this.getTotalMintedCoins();
          } else {
            console.log(error);
          }
        });
    },
    getTotalEnergy() {
      oliCoinContract.events.TotalEnergyEvent(
        {
          fromBlock: "latest",
          toBlock: "latest"
        },
        (error, result) => {
          if (!error) {
            this.totalEnergy = result.returnValues[0];
          } else {
            console.log(error);
          }
        }
      );
    },
    getTotalMintedCoins() {
      oliCoinContract.events.TotalMintedTokens(
        {
          fromBlock: "latest",
          toBlock: "latest"
        },
        (error, result) => {
          if (!error) {
            this.totalMintedCoins = result.returnValues[0] / 1000;
          } else {
            console.log(error);
          }
        }
      );
    },
    getProducerDetails() {
      this.getProducerEnergyBalance();
      this.getProducerTokenBalance();
      this.getProducerInfo();
      $(".placeholder").hide();
      $(".details-table").show();
    },
    getProducerEnergyBalance() {
      this.producerEnergyBalance = "";
      oliCoinContract.methods
        .getProducerEnergyBalance(event.target.innerHTML)
        .call({ from: this.ethAccounts[0] }, (error, result) => {
          if (!error) {
            this.producerEnergyBalance = result;
          } else {
            console.log(error);
          }
        });
    },
    getProducerTokenBalance() {
      this.producerTokenBalance = "";
      oliCoinContract.methods
        .balanceOf(event.target.innerHTML)
        .call({ from: this.ethAccounts[0] }, (error, result) => {
          if (!error) {
            this.producerTokenBalance = result / 1000;
          } else {
            console.log(error);
          }
        });
    },
    getProducerInfo() {
      this.producer = [];
      oliCoinContract.methods
        .getProducerAccountDetails(event.target.innerHTML)
        .call({ from: this.ethAccounts[0] }, (error, result) => {
          if (!error) {
            this.producer = result;
          } else {
            console.log(error);
          }
        });

      // removing the background color for ul-selected items
      document.querySelectorAll(".producer-list > ol>li").forEach(list => {
        list.classList.remove("active");
      });
      // add background to selected account
      event.target.classList.add("active");
    }
  },

  // set default function on page load
  created() {
    this.getEthAccounts();
    this.getProducers();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  margin-bottom: 4px;
  color: #666769;
}
.tokenization {
  display: flex;
  flex-direction: column;
  margin-top: 30px;
}

.top-bar {
  display: flex;
  text-align: center;
  justify-content: space-between;
  width: 90%;
  padding: 20px;
  margin: auto;
}

.top-bar-col {
  display: flex;
  flex-direction: column;
  width: 28%;
}

.top-bar-box.head-col1 {
  background-color: #c0dbe2;
  margin-bottom: 0;
}
.top-bar-box.head-col2 {
  background-color: #cdf1c3;
  margin-bottom: 0;
}
.top-bar-box.head-col3 {
  background-color: #ccb9da;
  margin-bottom: 0;
}

.head-col1,
.head-col2,
.head-col3 {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.top-bar-box {
  background: white;
  padding: 10px;
  padding-top: 1px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.08);
}

.stats-box {
  flex: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.container {
  display: flex;
  width: 90%;
  padding: 20px;
  margin: auto;
  align-items: flex-start;
  justify-content: space-between;
}

.producers,
.main-details {
  width: 45%;
  display: flex;
  flex-direction: column;
}

.box {
  background: white;
  padding: 20px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.08);
  padding-top: 2px;
}
h1,
h2,
h3,
h4 {
  text-transform: uppercase;
}

h5 {
  color: #bbbbbb;
}

.inforgraphics {
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin: auto;
  text-align: center;
}

.heading {
  background: #ebe3e3;
}

.producer-list {
  text-align: left;
}

.production-details,
.coin-details {
  width: 49%;
  display: flex;
  flex-direction: column;
}

ol > li {
  list-style-position: inside;
  padding: 10px;
  font-weight: bold;
  cursor: pointer;
  margin-left: -25px;
  transition: font-size 0.3s ease, background-color 0.3s ease;
}

ol > li:hover {
  background: #bbbbbb;
}

li.highlight {
  background-color: #cccc;
  /* background-color: #8cd98c; */
}

.overflow-text {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.details {
  display: flex;
  margin: auto;
  justify-content: space-between;
  height: 268px;
}
.details-headings,
.details-values {
  width: 60%;
  margin: auto;
  justify-content: space-between;
  padding: 5px;
}
.stats {
  color: #6b81ad;
  font-weight: bold;
  font-size: 24px;
}

div.details-values > h5 {
  color: #6b81ad;
  font-weight: bold;
}
span {
  font-weight: bold;
}
.send-tokens {
  display: flex;
  width: 90%;
  margin: auto;
  justify-content: space-between;
  padding: 20px;
}
.transfer {
  display: flex;
  flex-direction: column;
  width: 45%;
}
.track-tokens {
  width: 45%;
}

.transfer-head {
  background-color: #c0dbe2;
  margin-bottom: 0;
}

.transfer-body {
  padding: 20px;
  /* background-color: #ccb9da;
  margin-bottom: 0; */
  text-align: center;
}
form {
  padding: 20px;
  text-align: center;
}
input,
select {
  max-width: 100%;
  border-bottom-color: #666769;
  border-radius: 2px;
  padding: 1rem;
  font-size: 1rem;
  /* border: 1px solid #cccccc; */
  border: none;
  border-bottom: 1px solid #cccccc;
  outline: none;
}
input {
  width: 50%;
}
select:hover {
  background-color: rgba(147, 128, 108, 0.1);
}

.btn {
  padding: 10px;
  float: right;
  margin-top: 2rem;
  margin-right: 1.5rem;
  border: 1px solid #c0dbe2;
  border-radius: 4px;
  background-color: #c0dbe2;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  opacity: 1;
}

.btn:hover {
  background-color: #88daee;
}

.btn:active {
  opacity: 0.8;
}
.transactions {
  display: flex;
  flex-direction: column;
}

.track-head {
  background-color: #c0dbe2;
  margin-bottom: 0;
}

.transaction-table {
  display: flex;
  flex-direction: column;
}

.filter,
.table {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.filter-input {
  margin: 10px;
  /* background-color: rgba(147, 128, 108, 0.1); */
  width: 90%;
  border-radius: 4px;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #cccccc;
  border-bottom: 1px solid #cccccc;
  outline: none;
}

.table table {
  table-layout: fixed;
  width: 100%;
}
tbody {
  text-align: center;
}
th {
  background-color: #ccb9da;
  padding: 5px;
}
td {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 10px;
}

th,
td {
  border-bottom: 1px solid #cccccc;
}
th:last-child,
td:last-child {
  width: 80px;
}

.active {
  background-color: #9be99b;
}

.placeholder {
  margin-top: 6rem;
  text-align: center;
}

h5 {
  text-align: center;
}

.details-table {
  padding: 1rem;
  margin-top: 0.8rem;
  width: 100%;
  padding: 0.5rem;
  display: none;
}

.details-table {
  border: #d8d3d3 1px solid;
  border-radius: 2px;
}

.property-name {
  background: #f2f0f3;
  font-size: 0.8rem;
  text-align: left;
  width: 40%;
  position: relative;
  border: #d8d3d3 1px solid;
  border-radius: 2px;
}

.property-value {
  color: #394f7c;
  font-size: 1rem;
  font-weight: bold;
  width: 40%;
}
</style>
