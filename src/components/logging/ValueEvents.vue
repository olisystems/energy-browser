<template>
  <div class="top-bar">
    <div class="top-bar-container">
      <div class="inverter-power-wrapper">
        <div class="inverter-power" v-if="inverterPowers.length > 0">
          <div class="event-header power-event-header">
            <span>Power Values</span>
          </div>
          <transition-group name="list" tag="ul" class="event-list">
            <li v-for="(power) in inverterPowers" :key="power.time">
              <div class="values-wrapper">
                <div v-tooltip="power.inverter">
                  <span>PV:</span>
                  <p>{{power.assetOwner}}</p>
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
          </transition-group>
        </div>

        <div v-else>
          <h4 class="not-found">No event for Inverter power values</h4>
        </div>
      </div>

      <div class="inverter-output-wrapper">
        <div class="inverter-output" v-if="inverterOutputs.length > 0">
          <div class="event-header output-event-header">
            <span>Output Levels</span>
          </div>

          <transition-group name="list" tag="ul" class="event-list">
            <li v-for="(output) in inverterOutputs" :key="output.time">
              <div class="values-wrapper">
                <div v-tooltip="output.inverter">
                  <span>PV:</span>
                  <p>{{output.assetOwner}}</p>
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
          </transition-group>
        </div>

        <div v-else>
          <h4 class="not-found">No event for Inverter output values</h4>
        </div>
      </div>

      <div class="dso-wrapper">
        <div class="dso-values" v-if="dsoSetValues.length > 0">
          <div class="event-header dso-event-header">
            <span>DSO Set Values</span>
          </div>
          <transition-group name="list" tag="ul" class="event-list">
            <li v-for="(value) in dsoSetValues" :key="value.time">
              <div class="values-wrapper">
                <div v-tooltip="value.dso">
                  <span>DSO:</span>
                  <p>{{value.dsoName}}</p>
                </div>
                <div v-tooltip="value.asset">
                  <span>Asset:</span>
                  <p>{{value.assetOwner}}</p>
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
          </transition-group>
        </div>

        <div v-else>
          <h4 class="not-found">No event for DSO Power values</h4>
        </div>
      </div>
    </div>

    <div class="value-tables-wrapper">
      <div class="wrapper power-table">
        <div class="table-header">
          <h4>PV Power Value Events</h4>
        </div>
        <div class="table">
          <div class="table-wrapper" v-if="allInverterPowers.length > 0">
            <v-table :data="allInverterPowers">
              <thead slot="head">
                <th>Asset</th>
                <th>Time</th>
                <th>Power [W]</th>
              </thead>

              <transition-group name="test" tag="tbody" slot="body" slot-scope="{displayData}">
                <tr v-for="(row) in displayData" :key="row.time">
                  <td v-tooltip="row.inverter">{{row.assetOwner}}</td>
                  <td v-tooltip="row.time">{{row.time}}</td>
                  <td>{{row.value}}</td>
                </tr>
              </transition-group>
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

              <transition-group name="test" tag="tbody" slot="body" slot-scope="{displayData}">
                <tr v-for="(row) in displayData" :key="row.time">
                  <td v-tooltip="row.dso">{{row.dsoName}}</td>
                  <td v-tooltip="row.asset">{{row.assetOwner}}</td>
                  <td v-tooltip="row.time">{{row.time}}</td>
                  <td>{{row.value}}</td>
                </tr>
              </transition-group>
            </v-table>
          </div>
          <div v-else>
            <h4 class="not-found">No event for Inverter power values</h4>
          </div>
        </div>
      </div>

      <div class="wrapper output-table">
        <div class="table-header">
          <h4>PV Output Value Events</h4>
        </div>
        <div class="table">
          <div class="table-wrapper" v-if="allInverterOutputs.length > 0">
            <v-table :data="allInverterOutputs">
              <thead slot="head">
                <th>Asset</th>
                <th>Time</th>
                <th>Power [W]</th>
              </thead>

              <transition-group name="test" tag="tbody" slot="body" slot-scope="{displayData}">
                <tr v-for="(row) in displayData" :key="row.time">
                  <td v-tooltip="row.inverter">{{row.assetOwner}}</td>
                  <td v-tooltip="row.time">{{row.time}}</td>
                  <td>{{row.value}}</td>
                </tr>
              </transition-group>
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
          //console.log(event.returnValues.response);
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
          dsoValueObj.dsoName = event.returnValues.dsoName;
          dsoValueObj.dso = event.returnValues.dso;
          dsoValueObj.assetOwner = event.returnValues.assetOwner;
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
          powerObject.assetOwner = event.returnValues.assetOwner;
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
          outputObject.assetOwner = event.returnValues.assetOwner;
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
.event-list {
  position: relative;
}
.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active,
.list-leave-active {
  transition: all 1s ease-in-out;
}

.list-leave-active {
  position: absolute;
}
.list-enter /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(30px);
  background-color: rgb(9, 194, 132);
}

.list-leave-to {
  opacity: 0;
  transform: translateX(-30px);
  background-color: rgb(240, 142, 30);
}

.list-move {
  transition: transform 1s;
}

/*
tables transition 
*/

.test-enter-active,
.test-leave-active {
  transition: all 1s ease-in-out;
}

.test-enter /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
  background-color: rgb(9, 194, 132);
}

.test-move {
  transition: transform 1s;
}

.top-bar {
  display: flex;
  flex-direction: column;
}

.dso-values,
.inverter-power,
.inverter-output {
  margin: 0.5rem;
  display: flex;
  justify-content: space-between;
}

.event-list {
  padding: 0;

  display: flex;
  list-style: none;
  justify-content: center;
  max-width: 90%;
  margin: 0 auto;
}

.event-header {
  font-size: 0.7rem;
  padding: 1rem;
  margin: 0.5rem;
  display: flex;
  list-style: none;
  justify-content: center;
  box-sizing: border-box;
  /* box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.08); */

  box-shadow: 0 10px 30px rgba(51, 51, 51, 0.1);
}

.event-header > span {
  align-self: center;
  font-size: 0.8rem;
  font-weight: 400;
}

.power-event-header {
  border: 1px solid #aed8a3;
  border-radius: 2px;
  background: #cdf1c3;
}

.output-event-header {
  border: 1px solid #9ecfdb;
  border-radius: 2px;
  background: #c0dbe2;
}
.dso-event-header {
  border: 1px solid #bb9fcf;
  border-radius: 2px;
  background: #ccb9da;
}

li {
  overflow: hidden;
  margin: 0.5rem;
  background: #fffefe;
  border: #d0d3d4 1px solid;
  border-radius: 2px;
  box-shadow: 0 10px 30px rgba(51, 51, 51, 0.1);
  align-self: center;
}

.values-wrapper {
  padding: 0.5rem;

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
}

.power-table,
.output-table {
  width: 28%;
}
.dso-table {
  width: 40%;
}
</style>
