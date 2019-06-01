<template>
  <div class="main">
    <div class="container">
      <div class="col-1">
        <div class="wrapper">
          <div class="table-header">
            <h4>Producer's Transaction History</h4>
          </div>
          <div class="account-header">
            <h4>Account Address: {{producerAddress}}</h4>
          </div>
          <div class="table">
            <div class="table-wrapper">
              <v-table :data="producer">
                <thead slot="head">
                  <th>Time</th>
                  <th>Power [W]</th>
                  <th>Block Number</th>
                  <th>BlockHash</th>
                  <!-- <th>GasPrice [wei]</th> -->
                </thead>
                <tbody slot="body" slot-scope="{displayData}">
                  <tr v-for="(row, index) in displayData" :key="index">
                    <td>{{row.time}}</td>
                    <td>{{row.power}}</td>
                    <td>{{row.blockNumber}}</td>
                    <td>{{row.blockHash}}</td>
                    <!-- <td>{{row.gasPrice}}</td> -->
                  </tr>
                </tbody>
              </v-table>
            </div>
          </div>
        </div>
      </div>
      <div class="col-2">
        <div class="wrapper">
          <div class="table-header">
            <h4>Consumer's Transaction History</h4>
          </div>

          <div class="account-header">
            <h4>Account Address: {{consumerAddress}}</h4>
          </div>
          <div class="table">
            <div class="table-wrapper">
              <v-table :data="consumer">
                <thead slot="head">
                  <th>Time</th>
                  <th>Power [W]</th>
                  <th>Block Number</th>
                  <th>BlockHash</th>
                  <!-- <th>Gas Price [wei]</th> -->
                </thead>
                <tbody slot="body" slot-scope="{displayData}">
                  <tr v-for="(row, index) in displayData" :key="index">
                    <td>{{row.time}}</td>
                    <td>{{row.power}}</td>
                    <td>{{row.blockNumber}}</td>
                    <td>{{row.blockHash}}</td>
                    <!-- <td>{{row.gasPrice}}</td> -->
                  </tr>
                </tbody>
              </v-table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- list of producers and consumers -->
    <div class="container">
      <div class="col-1">
        <div class="wrapper">
          <div class="table-header">
            <h4>List of Registered Producers</h4>
          </div>

          <div class="producer-list">
            <ol>
              <li
                v-on:click="getProducerHistory"
                v-for="(item, index) in producers"
                v-bind:key="index"
              >{{item}}</li>
            </ol>
          </div>
        </div>
      </div>

      <div class="col-3">map</div>

      <div class="col-2">
        <div class="wrapper">
          <div class="table-header">
            <h4>List of Registered Consumers</h4>
          </div>
          <div class="consumer-list">
            <ol>
              <li
                v-on:click="getConsumerHistory"
                v-for="(item, index) in consumers"
                v-bind:key="index"
              >{{item}}</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
    <div class="container"></div>
  </div>
</template>
<script>
const $ = require("jquery");
import { productionContract } from "../assets/js/contracts.js";
import { consumptionContract } from "../assets/js/contracts.js";
import web3 from "../assets/js/contracts.js";
import { log } from "util";
import { timeConverter } from "../assets/js/format-time";
export default {
  name: "TransactionHistory",
  data() {
    return {
      producers: [],
      consumers: [],
      producer: [],
      consumer: [],
      producerAddress: "",
      consumerAddress: ""
    };
  },
  methods: {
    getProducerHistory() {
      this.producer = [];
      this.producerAddress = event.target.innerHTML;
      productionContract
        .getPastEvents("ProTransactionEvent", {
          fromBlock: 0
        })
        .then(events => {
          events.forEach(event => {
            if ((event.oliAddr = this.producerAddress)) {
              this.producer.push({
                time: timeConverter(event.returnValues[1]),
                power: event.returnValues[2],
                blockNumber: event.returnValues[3],
                blockHash: event.returnValues[4],
                gasPrice: event.returnValues[5]
              });
            }
          });
        });
      // removing the background color for ul-selected items
      document.querySelectorAll(".producer-list > ol>li").forEach(list => {
        list.classList.remove("active");
      });
      // add background to selected account
      event.target.classList.add("active");
    },
    getConsumerHistory() {
      this.consumer = [];
      this.consumerAddress = event.target.innerHTML;
      consumptionContract
        .getPastEvents("ConsTransactionEvent", {
          fromBlock: "latest"
        })
        .then(events => {
          events.forEach(event => {
            if ((event.oliAddr = this.consumerAddress)) {
              this.consumer.push({
                time: timeConverter(event.returnValues[1]),
                power: event.returnValues[2],
                blockNumber: event.returnValues[3],
                blockHash: event.returnValues[4],
                gasPrice: event.returnValues[5]
              });
            }
          });
        });
      // removing the background color for ul-selected items
      document.querySelectorAll(".consumer-list > ol>li").forEach(list => {
        list.classList.remove("active");
      });
      // add background to selected account
      event.target.classList.add("active");
    },
    // producer accounts list
    getProducerList() {
      productionContract.methods
        .getProAccntsList()
        .call()
        .then(list => {
          // remove first 0x00 account
          list.shift();
          // push each item to array
          list.forEach(item => {
            this.producers.push(item);
          });
        });
    },
    // producer accounts list
    getConsumerList() {
      consumptionContract.methods
        .getConsAccntsList()
        .call()
        .then(list => {
          // remove first 0x00 account
          list.shift();
          // push each item to array
          list.forEach(item => {
            this.consumers.push(item);
          });
        });
    }
  },
  created() {
    this.getProducerList();
    this.getConsumerList();
  }
};
</script>
<style scoped>
.main {
  background-color: #f7f7f7;
}

.col-1,
.col-2 {
  width: 50%;
  flex-direction: column;
  padding: 1rem;
}

h4 {
  text-align: left;
}

.table-header {
  margin-bottom: 0.5rem;
}

.table {
  height: 250px;
  overflow-y: auto;
}

tbody {
  text-align: center;
  height: 100px;
}

th {
  background-color: #e1dfe2;
  font-size: 0.8rem;
  position: sticky;
  z-index: 5;
  top: 0;
}

/* list style */

ol > li {
  list-style-position: inside;
  padding: 1em;
  font-weight: bold;
  cursor: pointer;
  margin-left: -25px;
  margin-right: 15px;
  text-align: left;
}

ol > li:after {
  content: "";
  display: block;
  width: 85%;
  padding-top: 0.5em;
  border-bottom: 1px solid rgb(206, 204, 204);
}

ol > li:last-child:after {
  border-bottom: none;
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

.active {
  background-color: #278b19;
}

@media only screen and (max-width: 1000px) {
  .col-1,
  .col-2 {
    width: 100%;
  }
}
</style>
