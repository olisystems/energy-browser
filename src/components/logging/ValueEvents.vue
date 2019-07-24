<template>
  <div class="top-bar">
    <div class="top-bar-container">
      <div class="inverter-power-wrapper">
        <div class="inverter-power" v-if="inverterPowers.length > 0">
          <ul class="event-list">
            <li v-for="(power, index) in inverterPowers" :key="index">
              <div class="values-wrapper">
                <div v-tooltip="power.inverter">
                  <span>Inverter:</span>
                  <p>{{power.inverter}}</p>
                </div>
                <div>
                  <span>Power:</span>
                  <p>{{power.value}}</p>
                </div>
                <div v-tooltip="power.time">
                  <span>Timestamp:</span>
                  <p>{{power.time}}</p>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div v-else>
          <h4 class="not-found">No event for Inverter power values</h4>
        </div>
      </div>

      <div class="inverter-output-wrapper">
        <div class="inverter-output" v-if="inverterOutputs.length > 0">
          <ul class="event-list">
            <li v-for="(output, index) in inverterOutputs" :key="index">
              <div class="values-wrapper">
                <div v-tooltip="output.inverter">
                  <span>Inverter:</span>
                  <p>{{output.inverter}}</p>
                </div>
                <div>
                  <span>Output:</span>
                  <p>{{output.value}}</p>
                </div>
                <div v-tooltip="output.time">
                  <span>Timestamp:</span>
                  <p>{{output.time}}</p>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div v-else>
          <h4 class="not-found">No event for Inverter output values</h4>
        </div>
      </div>

      <div class="dso-wrapper">
        <div class="dso-values" v-if="dsoSetValues.length > 0">
          <ul class="event-list">
            <li v-for="(value, index) in dsoSetValues" :key="index">
              <div class="values-wrapper">
                <div v-tooltip="value.dso">
                  <span>DSO:</span>
                  <p>{{value.dso}}</p>
                </div>
                <div v-tooltip="value.asset">
                  <span>Asset:</span>
                  <p>{{value.asset}}</p>
                </div>
                <div>
                  <span>Power:</span>
                  <p>{{value.value}}</p>
                </div>
                <div v-tooltip="value.time">
                  <span>Timestamp:</span>
                  <p>{{value.time}}</p>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div v-else>
          <h4 class="not-found">No event for DSO Power values</h4>
        </div>
      </div>
    </div>

    <div class="value-tables-wrapper">
      <div class="wrapper power-table">
        <div class="table-header">
          <h4>Inverter Power Value Events</h4>
        </div>
        <div class="table">
          <div class="table-wrapper" v-if="allInverterPowers.length > 0">
            <v-table :data="allInverterPowers">
              <thead slot="head">
                <th>Inverter</th>
                <th>Time</th>
                <th>Power [W]</th>
              </thead>

              <tbody slot="body" slot-scope="{displayData}">
                <tr v-for="(row, index) in displayData" :key="index">
                  <td v-tooltip="row.inverter">{{row.inverter}}</td>
                  <td v-tooltip="row.time">{{row.time}}</td>
                  <td>{{row.value}}</td>
                </tr>
              </tbody>
            </v-table>
          </div>
          <div v-else>
            <h4 class="not-found">No event for Inverter power values</h4>
          </div>
        </div>
      </div>

      <div class="wrapper dso-table">
        <div class="table-header">
          <h4>DSO Power Value Events</h4>
        </div>
        <div class="table">
          <div class="table-wrapper" v-if="allDsoValues.length > 0">
            <v-table :data="allDsoValues">
              <thead slot="head">
                <th>DSO</th>
                <th>Asset</th>
                <th>Time</th>
                <th>Power [W]</th>
              </thead>

              <tbody slot="body" slot-scope="{displayData}">
                <tr v-for="(row, index) in displayData" :key="index">
                  <td v-tooltip="row.dso">{{row.dso}}</td>
                  <td v-tooltip="row.asset">{{row.asset}}</td>
                  <td v-tooltip="row.time">{{row.time}}</td>
                  <td>{{row.value}}</td>
                </tr>
              </tbody>
            </v-table>
          </div>
          <div v-else>
            <h4 class="not-found">No event for Inverter power values</h4>
          </div>
        </div>
      </div>

      <div class="wrapper output-table">
        <div class="table-header">
          <h4>Inverter Output Value Events</h4>
        </div>
        <div class="table">
          <div class="table-wrapper" v-if="allInverterOutputs.length > 0">
            <v-table :data="allInverterOutputs">
              <thead slot="head">
                <th>Inverter</th>
                <th>Time</th>
                <th>Power [W]</th>
              </thead>

              <tbody slot="body" slot-scope="{displayData}">
                <tr v-for="(row, index) in displayData" :key="index">
                  <td v-tooltip="row.inverter">{{row.inverter}}</td>
                  <td v-tooltip="row.time">{{row.time}}</td>
                  <td>{{row.value}}</td>
                </tr>
              </tbody>
            </v-table>
          </div>
          <div v-else>
            <h4 class="not-found">No event for Inverter power values</h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const $ = require("jquery");
import web3 from "../../assets/js/contracts.js";
import { timeConverter } from "../../assets/js/time-format.js";
import { AssetLoggingContract } from "../../assets/js/contracts.js";
export default {
  name: "ValueEvents",
  data() {
    return {
      dsoSetValues: [],
      allDsoValues: [],
      inverterPowers: [],
      allInverterPowers: [],
      inverterOutputs: [],
      allInverterOutputs: []
    };
  },
  methods: {
    watchRejectValue() {
      AssetLoggingContract.events
        .RejectSetValue({
          fromBlock: 0
        })
        .on("data", event => {
          console.log(event.returnValues.response);
        })
        .on("error", console.error);
    },
    watchDsoSetValue() {
      AssetLoggingContract.events
        .NewDsoValue({
          fromBlock: 0
        })
        .on("data", event => {
          let dsoValueObj = {};
          dsoValueObj.dso = event.returnValues.dso;
          dsoValueObj.asset = event.returnValues.asset;
          dsoValueObj.value = event.returnValues.value.toNumber();
          dsoValueObj.time = timeConverter(event.returnValues.time.toNumber());
          this.dsoSetValues.push(dsoValueObj);
          this.allDsoValues.unshift(dsoValueObj);
          if (this.dsoSetValues.length > 5) {
            this.dsoSetValues.shift();
          }
        })
        .on("error", console.error);
    },
    watchInverterPower() {
      AssetLoggingContract.events
        .NewInverterPower({
          fromBlock: 0
        })
        .on("data", event => {
          let powerObject = {};
          powerObject.inverter = event.returnValues.inverter;
          powerObject.value = event.returnValues.currentPower.toNumber();
          powerObject.time = timeConverter(event.returnValues.time.toNumber());
          this.inverterPowers.push(powerObject);
          this.allInverterPowers.unshift(powerObject);
          if (this.inverterPowers.length > 5) {
            this.inverterPowers.shift();
          }
        })
        .on("error", console.error);
    },
    watchInverterOutput() {
      AssetLoggingContract.events
        .NewInverterOutput({
          fromBlock: 0
        })
        .on("data", event => {
          let outputObject = {};
          outputObject.inverter = event.returnValues.inverter;
          outputObject.value = event.returnValues.outputLevel.toNumber();
          outputObject.time = timeConverter(event.returnValues.time.toNumber());
          this.inverterOutputs.push(outputObject);
          this.allInverterOutputs.unshift(outputObject);
          if (this.inverterOutputs.length > 5) {
            this.inverterOutputs.shift();
          }
        })
        .on("error", console.error);
    }
  },
  created() {
    this.watchRejectValue();
    this.watchDsoSetValue();
    this.watchInverterPower();
    this.watchInverterOutput();
  }
};
</script>

<style scoped>
.top-bar {
  display: flex;
  flex-direction: column;
}

.top-bar-container {
  background: rgb(250, 251, 251);
}
.dso-values,
.inverter-power,
.inverter-output {
  margin: 0.5rem;
}

.event-list {
  padding: 0;
  margin: 0;
  display: flex;
  list-style: none;
  justify-content: center;
}

li {
  overflow: hidden;
  margin: 0.5rem;
  box-shadow: 0 10px 30px rgba(51, 51, 51, 0.1);
}

.values-wrapper {
  padding: 0.5rem;
  background: #fffefe;
  border: #d0d3d4 1px solid;
  border-radius: 2px;
  text-align: left;
  align-items: center;
}

li > div {
  font-size: 0.8rem;
}

li > div > div {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* li > div > div:hover {
  overflow: visible;
  white-space: normal;
  word-wrap: break-word;
} */

span {
  color: #394f7c;
  font-weight: 600;
}

p {
  display: inline;
  margin-left: 2px;
}

.value-tables-wrapper {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  background-color: #f8f9fa !important;
}

.power-table,
.output-table {
  width: 28%;
}
.dso-table {
  width: 40%;
}
</style>
