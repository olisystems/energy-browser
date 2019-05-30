<template>
  <div class="registration">
    <div class="registration-body">
      <div class="pro-registration">
        <div class="wrapper">
          <div class="producer-heading">
            <h4>Registered Producers</h4>
          </div>
          <div class="table">
            <div class="table-wrapper">
              <v-table :data="producers">
                <thead slot="head">
                  <v-th sortKey="returnValues[0]">ETH Address</v-th>
                  <th>Owner</th>
                  <v-th sortKey="returnValues[2]">Device Type</v-th>
                  <th>Peak Power (+) [W]</th>
                  <th>Coordinates [Lat-Long]</th>
                  <th>Voltage Level [v]</th>
                  <v-th sortKey="returnValues[8]">Location</v-th>
                  <th>Install Date</th>
                </thead>
                <tbody slot="body" slot-scope="{displayData}">
                  <tr v-for="row in displayData" :key="row.returnValues[0]">
                    <td>{{row.returnValues[0]}}</td>
                    <td>{{row.returnValues[1]}}</td>
                    <td>{{row.returnValues[2]}}</td>
                    <td>{{row.returnValues[3]}}</td>
                    <td>{{row.returnValues[5] /10000}} {{row.returnValues[6] / 10000}}</td>
                    <td>{{row.returnValues[7]}}</td>
                    <td>{{row.returnValues[8]}}</td>
                    <td>{{row.returnValues[9]}}</td>
                  </tr>
                </tbody>
              </v-table>
            </div>
          </div>
        </div>
      </div>

      <div class="cons-registration">
        <div class="wrapper">
          <div class="consumer-heading">
            <h4>Registered Consumers</h4>
          </div>
          <div class="table">
            <div class="table-wrapper">
              <v-table :data="consumers">
                <thead slot="head">
                  <v-th sortKey="returnValues[0]">ETH Address</v-th>
                  <th>Owner</th>
                  <v-th sortKey="returnValues[2]">Device Type</v-th>
                  <th>Peak Power (-) [W]</th>
                  <th>Coordinates [Lat-Long]</th>
                  <th>Voltage Level [v]</th>
                  <v-th sortKey="returnValues[8]">Location</v-th>
                  <th>Install Date</th>
                </thead>
                <tbody slot="body" slot-scope="{displayData}">
                  <tr v-for="row in displayData" :key="row.returnValues[0]">
                    <td>{{row.returnValues[0]}}</td>
                    <td>{{row.returnValues[1]}}</td>
                    <td>{{row.returnValues[2]}}</td>
                    <td>{{row.returnValues[3]}}</td>
                    <td>{{row.returnValues[5] /10000}} {{row.returnValues[6] / 10000}}</td>
                    <td>{{row.returnValues[7]}}</td>
                    <td>{{row.returnValues[8]}}</td>
                    <td>{{row.returnValues[9]}}</td>
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
export default {
  name: "Registration",
  data() {
    return {
      producers: [],
      consumers: []
    };
  },
  methods: {
    async getProRegistration() {
      await productionContract.getPastEvents(
        "ProducerRegs",
        {
          fromBlock: 0,
          toBlock: "latest"
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
      await consumptionContract.getPastEvents(
        "ConsumerRegs",
        {
          fromBlock: 0,
          toBlock: "latest"
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
  created() {
    this.callFunction();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.registration {
  background-color: #f3f3f3;
  /* background-color: #f7f7f7; */
  /* background-color: rgba(238, 245, 249, 0.72); */
}

.registration-body {
  display: flex;
  justify-content: space-between;
  margin: 0.5rem 2.5rem;
}

.pro-registration,
.cons-registration {
  width: 47%;
  flex-direction: column;
  padding: 1.5rem;
}

.wrapper {
  border: 1px solid #dee2e6;
  background: rgb(255, 255, 255);
  /* box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.08); */
  border-radius: 2px;
}

.producer-heading {
  /* background-color: #cdf1c3; */
  text-align: left;
  border-bottom: 1.5px solid #e1dfe2;
}

.consumer-heading {
  /* background-color: #ccb9da; */
  text-align: left;
  border-bottom: 1.5px solid #e1dfe2;
}

h4 {
  margin-left: 1.5rem;
}

.table table {
  table-layout: fixed;
  width: 100%;
  padding: 0.5rem;
}

tbody {
  text-align: center;
}

th {
  background-color: #e1dfe2;
  padding: 0.2rem;
  font-size: 0.8rem;
}

td,
th {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0.5rem;
  font-size: 0.8rem;
}

/* th:hover,
td:hover {
  overflow-x: visible;
  height: auto;
  white-space: normal;
} */

td {
  border-bottom: 1px solid #cccccc;
}

tbody > tr:last-child > td {
  border-bottom: none;
}

@media only screen and (max-width: 48em) {
  .registration-body {
    flex-direction: column;
    align-items: center;
  }

  .pro-registration,
  .cons-registration {
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
