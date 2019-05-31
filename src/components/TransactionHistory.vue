<template>
  <div class="main">
    <div class="container">
      <div class="col-1">
        <div class="wrapper">
          <div class="table-header">
            <h4>Producer's Transaction History</h4>
          </div>
          <div class="account-header">
            <h4>Account Address</h4>
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
            <h4>Producer's Transaction History</h4>
          </div>

          <div class="account-header">
            <h4>Account Address</h4>
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
      producer: [],
      consumer: [],
      account: "0x062c52E81f8ce863BE079CB88cbbe877799f694A"
    };
  },
  methods: {
    getProducerHistory() {
      productionContract
        .getPastEvents("ProTransactionEvent", {
          fromBlock: 24959
        })
        .then(events => {
          events.forEach(event => {
            if (event.returnValues[0] === this.account) {
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
    },
    getConsumerHistory() {
      consumptionContract
        .getPastEvents("ConsTransactionEvent", {
          fromBlock: 24959
        })
        .then(events => {
          events.forEach(event => {
            if (event.returnValues[0] === this.account) {
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
    }
  },
  created() {
    this.getProducerHistory();
    this.getConsumerHistory();
  }
};
</script>
<style scoped>
.col-1,
.col-2 {
  width: 50%;
  flex-direction: column;
  padding: 1rem;
}

@media only screen and (max-width: 1000px) {
  .col-1,
  .col-2 {
    width: 100%;
  }
}
</style>
