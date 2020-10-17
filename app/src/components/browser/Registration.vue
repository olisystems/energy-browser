<template>
  <div class="main">
    <div class="container">
      <div class="col-1">
        <div class="wrapper">
          <div class="table-header">
            <h4>Registered Producers</h4>
          </div>
          <div class="table">
            <div class="table-wrapper">
              <v-table :data="producers">
                <thead slot="head">
                  <v-th v-tooltip="'Ethereum Address'" sortKey="returnValues[0]">ETH Address</v-th>
                  <th>Owner</th>
                  <v-th v-tooltip="'Device Type'" sortKey="returnValues[2]">Device Type</v-th>
                  <th v-tooltip="'Peak Power (+) [W]'">Peak Power (+) [W]</th>
                  <th v-tooltip="'Coordinates [Lat-Long]'">Coordinates [Lat-Long]</th>
                  <th v-tooltip="'Voltage Level [v]'">Voltage Level [v]</th>
                  <v-th v-tooltip="'Location'" sortKey="returnValues[8]">Location</v-th>
                  <th>Install Date</th>
                </thead>
                <tbody slot="body" slot-scope="{displayData}">
                  <tr v-for="(row, index) in displayData" :key="index">
                    <td v-tooltip="row.returnValues[0]">{{row.returnValues[0]}}</td>
                    <td>{{row.returnValues[1]}}</td>
                    <td>{{row.returnValues[2]}}</td>
                    <td>{{row.returnValues[3]}}</td>
                    <td>{{row.returnValues[5] /10000}} {{row.returnValues[6] / 10000}}</td>
                    <td>{{row.returnValues[7]}}</td>
                    <td>{{row.returnValues[8]}}</td>
                    <td v-tooltip="row.returnValues[9]">{{row.returnValues[9]}}</td>
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
            <h4>Registered Consumers</h4>
          </div>
          <div class="table">
            <div class="table-wrapper">
              <v-table :data="consumers">
                <thead slot="head">
                  <v-th v-tooltip="'Ethereum Address'" sortKey="returnValues[0]">ETH Address</v-th>
                  <th>Owner</th>
                  <v-th v-tooltip="'Device Type'" sortKey="returnValues[2]">Device Type</v-th>
                  <th v-tooltip="'Peak Power (-) [W]'">Peak Power (+) [W]</th>
                  <th v-tooltip="'Coordinates [Lat-Long]'">Coordinates [Lat-Long]</th>
                  <th v-tooltip="'Voltage Level [v]'">Voltage Level [v]</th>
                  <v-th v-tooltip="'Location'" sortKey="returnValues[8]">Location</v-th>
                  <th>Install Date</th>
                </thead>
                <tbody slot="body" slot-scope="{displayData}">
                  <tr v-for="(row, index) in displayData" :key="index">
                    <td v-tooltip="row.returnValues[0]">{{row.returnValues[0]}}</td>
                    <td>{{row.returnValues[1]}}</td>
                    <td>{{row.returnValues[2]}}</td>
                    <td>{{row.returnValues[3]}}</td>
                    <td>{{row.returnValues[5] /10000}} {{row.returnValues[6] / 10000}}</td>
                    <td>{{row.returnValues[7]}}</td>
                    <td>{{row.returnValues[8]}}</td>
                    <td v-tooltip="row.returnValues[9]">{{row.returnValues[9]}}</td>
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
// import web3 from "../../assets/js/web3";
const $ = require("jquery");
import Contracts from "../../assets/js/contracts";
export default {
  name: "Registration",
  Contracts: null,
  data() {
    return {
      producers: [],
      consumers: []
    };
  },
  methods: {
    async getProRegistration() {
      await this.Contracts.ProductionContract.getPastEvents(
        "ProducerRegs",
        {
          fromBlock: 0,
        },
        (error, result) => {
          if (error) {
            console.log(error);
          } else {
            result.forEach(element => {
              this.producers.push(element);
            });
          }
        }
      );
    },
    async getConsRegistration() {
      await this.Contracts.ConsumptionContract.getPastEvents(
        "ConsumerRegs",
        {
          fromBlock: 0,
        },
        (error, result) => {
          if (error) {
            console.log(error);
          } else {
            result.forEach(element => {
              this.consumers.push(element);
            });
          }
        }
      );
    },
    callFunction() {
      this.getProRegistration();
      this.getConsRegistration();
    }
  },
  async created() {
    this.Contracts = new Contracts();
    await this.Contracts.start();
    this.callFunction();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main {
  background-color: #f3f3f3;
  /* background-color: #f7f7f7; */
  /* background-color: rgba(238, 245, 249, 0.72); */
}

.col-1,
.col-2 {
  width: 50%;
  flex-direction: column;
  padding: 1rem;
}

@media only screen and (max-width: 48em) {
  .col-1,
  .col-2 {
    width: 100%;
  }
  th:nth-child(4),
  td:nth-child(4),
  th:nth-child(6),
  td:nth-child(6) {
    display: none;
  }
}
@media only screen and (max-width: 1100px) {
  th:nth-child(4),
  td:nth-child(4),
  th:nth-child(6),
  td:nth-child(6),
  th:nth-child(8),
  td:nth-child(8) {
    display: none;
  }
}

@media only screen and (max-width: 800px) and (min-width: 800px),
  (max-width: 37.5em) {
  th:nth-child(4),
  td:nth-child(4),
  th:nth-child(6),
  td:nth-child(6),
  th:nth-child(8),
  td:nth-child(8) {
    display: none;
  }
}
</style>
