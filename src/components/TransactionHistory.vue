<template>
  <div class="live-transactions">
    <div class="live-tx-body">
      <div class="real-time-production">
        <div class="production">
          <div class="wrapper">
            <div class="header">
              <h4>Real Time Energy Production</h4>
            </div>
            <div class="table">
              <div class="table-wrapper">
                <v-table :data="production">
                  <thead slot="head">
                    <th>ETH Address</th>
                    <th>Time</th>
                    <th>Power [W]</th>
                  </thead>
                  <tbody slot="body" slot-scope="{displayData}">
                    <tr v-for="(row, index) in displayData" :key="index">
                      <td>{{row.address}}</td>
                      <td>{{row.time}}</td>
                      <td>{{row.power}}</td>
                    </tr>
                  </tbody>
                </v-table>
              </div>

              <div class="loader">
                <h5>Loading data from latest block...</h5>
                <img src="../assets/img/loader.svg" alt="spinner by loading.io">
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="graph">
        <div class="wrapper">
          <div class="header">
            <h4>Energy Production & Consumption per Block</h4>
          </div>
          <div class="plot-wrapper">
            <div id="plot"></div>
          </div>
        </div>
      </div>

      <div class="real-time-consumption">
        <div class="consumption">
          <div class="wrapper">
            <div class="header">
              <h4>Real Time Energy Consumption</h4>
            </div>
            <div class="table">
              <div class="table-wrapper">
                <v-table :data="consumption">
                  <thead slot="head">
                    <th>ETH Address</th>
                    <th>Time</th>
                    <th>Power [W]</th>
                  </thead>

                  <tbody slot="body" slot-scope="{displayData}">
                    <tr v-for="(row, index) in displayData" :key="index">
                      <td>{{row.address}}</td>
                      <td>{{row.time}}</td>
                      <td>{{row.power}}</td>
                    </tr>
                  </tbody>
                </v-table>
              </div>
              <div class="loader">
                <h5>Loading data from latest block...</h5>
                <img src="../assets/img/loader.svg" alt="spinner by loading.io">
              </div>
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
import { timeConverter } from "../assets/js/format-time.js";
import Plotly from "plotly.js-dist";
import { timeout } from "q";

export default {
  name: "TransactionHistory",
  data() {
    return {
      production: [],
      consumption: [],
      productionLiveData: [],
      consumptionLiveData: []
    };
  },
  methods: {
    watchRealTimeProduction() {
      productionContract.events
        .ProTransactionEvent({
          fromBlock: "latest"
        })
        .on("data", event => {
          $(".loader").hide();
          this.production.push({
            address: event.returnValues[0],
            time: timeConverter(event.returnValues[1]),
            power: event.returnValues[2]
          });
        })
        .on("error", console.error);
    },
    watchRealTimeConsumption() {
      consumptionContract.events
        .ConsTransactionEvent({
          fromBlock: "latest"
        })
        .on("data", event => {
          $(".loader").hide();
          this.consumption.push({
            address: event.returnValues[0],
            time: timeConverter(event.returnValues[1]),
            power: event.returnValues[2]
          });
        })
        .on("error", console.error);
    },
    getRealTimeEnergy() {
      setInterval(async () => {
        const block = await web3.eth.getBlock("latest", true);
        console.log(block.timestamp);
        let production = 0;
        let consumption = 0;

        block.transactions.forEach(transaction => {
          let functionHash = transaction.input.slice(2, 10);
          // get energy production
          if (functionHash === "f1f1ecb7") {
            production += web3.utils.toDecimal(
              "0x" +
                transaction.input.slice(
                  transaction.input.length - 6,
                  transaction.input.length
                )
            );
            // get energy consumption
          } else if (functionHash === "9926188f") {
            consumption += web3.utils.toDecimal(
              "0x" +
                transaction.input.slice(
                  transaction.input.length - 6,
                  transaction.input.length
                )
            );
          }
        });
        // push energy production values
        this.productionLiveData.push({
          production: production,
          time: block.timestamp
        });
        // push energy consumption values
        this.consumptionLiveData.push({
          consumption: consumption,
          time: block.timestamp
        });
        console.log(this.productionLiveData);
        this.plotLiveData();
      }, 60000);
    },
    plotLiveData() {
      if (this.productionLiveData.length > 10) {
        this.productionLiveData = this.productionLiveData.slice(-10);
        this.consumptionLiveData = this.consumptionLiveData.slice(-10);
      }
      // temp arrays to hold time and energy values
      let productionTime = [];
      let productionValue = [];
      let consumptionTime = [];
      let consumptionValue = [];
      this.productionLiveData.forEach(obj => {
        productionTime.push(timeConverter(obj.time));
      });

      this.productionLiveData.forEach(obj => {
        productionValue.push(obj.production);
      });

      this.consumptionLiveData.forEach(obj => {
        consumptionTime.push(timeConverter(obj.time));
      });

      this.consumptionLiveData.forEach(obj => {
        consumptionValue.push(obj.consumption);
      });

      let proData = {
        type: "scatter",
        mode: "lines+markers",
        name: "Production",

        x: productionTime,
        y: productionValue,
        line: {
          color: "#009933"
        }
      };
      let consData = {
        type: "scatter",
        mode: "lines+markers",
        name: "Consumption",
        x: consumptionTime,
        y: consumptionValue,
        line: {
          color: "#cc6600"
        }
      };

      let data = [proData, consData];
      let layout = {
        xaxis: {
          title: "Time",
          type: "date",
          nticks: 5,
          tickformat: "%H:%M:%S",
          hoverformat: "%H:%M:%S",
          linecolor: "lightgray",
          linewidth: 0.5,
          titlefont: {
            color: "black"
          }
        },
        yaxis: {
          title: "Energy [kWh] per Block",
          tickformat: ",d",
          linecolor: "lightgray",
          linewidth: 0.5,
          tick0: 0,
          titlefont: {
            color: "black"
          },
          exponentformat: "e"
        },
        legend: {
          orientation: "h",
          xanchor: "center",
          y: 1.2,
          x: 0.5
        },
        margin: {
          r: 50,
          l: 90,
          b: 50,
          t: 20,
          pad: 10
        }
      };

      Plotly.newPlot("plot", data, layout, { responsive: true });
    },
    callFunction() {
      this.watchRealTimeProduction();
      this.watchRealTimeConsumption();
      this.getRealTimeEnergy();
      //this.plotLiveData();
    }
  },
  created() {
    this.callFunction();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.live-transactions {
  background-color: #f7f7f7;
}
.live-tx-body {
  display: flex;
  justify-content: space-between;
  margin: 0.5rem 2.5rem;
}

.real-time-production,
.real-time-consumption,
.graph {
  width: 33%;
  padding: 1.5rem;
}

.wrapper {
  border: 1px solid #dee2e6;
  background: rgb(255, 255, 255);
  /* box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.08); */
  border-radius: 2px;
}

.header {
  margin-bottom: 0.5rem;
  text-align: left;
  border-bottom: 2px solid #e1dfe2;
}

h4 {
  margin-left: 1.5rem;
}

.table table {
  table-layout: fixed;
  width: 100%;
  padding: 1rem;
}

.table {
  height: 400px;
  overflow-y: auto;
}

tbody {
  text-align: center;
  height: 100px;
}

th {
  background-color: #e1dfe2;
  padding: 0.2rem;
  font-size: 0.8rem;
  position: sticky;
  z-index: 5;
  top: 0;
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

h5 {
  color: #b6b2b2;
}

.loader {
  margin-top: 6rem;
}

img {
  width: 2.5rem;
  height: 2.5rem;
}

.plot-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  min-height: 385px;
}

#plot {
  width: 100%;
  padding: 0.5rem;
  min-height: 350px;
}

@media only screen and (max-width: 1000px) {
  .live-tx-body {
    flex-direction: column;
    align-items: center;
  }

  .real-time-production,
  .real-time-consumption,
  .graph {
    width: 100%;
  }
}
</style>
