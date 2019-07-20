<template>
  <div class="registry">
    <div class="dso-panel">
      <div class="dsos-value">
        <form @submit.prevent="setDsoValue">
          <fieldset>
            <legend>Set DSO Power Value</legend>
            <label for="dsos-value">Power:</label>
            <input type="number" min="1" max="100" required id="dsos-value" v-model="dsoInput" />

            <br />

            <label for="owner-id">DSO ID:</label>
            <select v-model="dsoPubkey" id="owner-id">
              <option disabled value>Please select one</option>
              <option v-for="(dso, index) in dsos" :key="index">{{dso}}</option>
            </select>

            <label for="asset-id">Asset ID:</label>
            <select v-model="assetPubkey" id="asset-id">
              <option disabled value>Please select one</option>
              <option v-for="(asset, index) in assetList" :key="index">{{asset}}</option>
            </select>

            <br />
            <button type="submit">Send</button>
          </fieldset>
        </form>
      </div>
      <div class="model wrapper">
        <img src="../assets/img/model.png" alt />
      </div>
    </div>
    <div class="registration-details">
      <div class="wrapper">
        <div class="table-header">
          <h4>Inverter Output Value Events</h4>
        </div>
        <div class="table">
          <div class="table-wrapper" v-if="assets.length > 0">
            <v-table :data="assets">
              <thead slot="head">
                <th>Asset</th>
                <th>Owner</th>
                <th>DSO</th>
                <th>Type</th>
                <th>Install Date</th>
                <th>Location</th>
                <th>Voltage Level</th>
              </thead>

              <tbody slot="body" slot-scope="{displayData}">
                <tr v-for="(row, index) in displayData" :key="index">
                  <td v-tooltip="row.assetPubkey">{{row.assetPubkey}}</td>
                  <td v-tooltip="row.ownerPubkey">{{row.ownerPubkey}}</td>
                  <td v-tooltip="row.dsoPubkey">{{row.dsoPubkey}}</td>
                  <td>{{row.assetType}}</td>
                  <td v-tooltip="row.installDate">{{row.installDate}}</td>
                  <td>{{row.location}}</td>
                  <td>{{row.voltageLevel}}</td>
                </tr>
              </tbody>
            </v-table>
          </div>
          <div v-else>
            <h4 class="not-found">No asset is registered</h4>
          </div>
        </div>
      </div>

      <div class="dso-wallet">
        <div class="dso-list" v-if="dsos.length>0">
          <div class="header">
            <h4>List of Registered DSO</h4>
          </div>
          <div class="list-body">
            <ol>
              <li v-for="(dso, index) in dsos" v-bind:key="index" v-on:click="getDsoWallet">{{dso}}</li>
            </ol>
          </div>
        </div>
        <div v-else>
          <h4 class="not-found">No DSO is registered</h4>
        </div>

        <div class="wrapper wallet">
          <div class="table-header">
            <h4>DSO Wallet</h4>
          </div>
          <div class="table">
            <div class="table-wrapper" v-if="dsoWallet.length > 0">
              <v-table :data="dsoWallet">
                <thead slot="head">
                  <th>Asset</th>
                  <th>Value</th>
                  <th>Time</th>
                </thead>

                <tbody slot="body" slot-scope="{displayData}">
                  <tr v-for="(row, index) in displayData" :key="index">
                    <td v-tooltip="row.asset">{{row.asset}}</td>
                    <td v-tooltip="row.values">{{row.values}}</td>
                    <td v-tooltip="row.time">{{row.time}}</td>
                  </tr>
                </tbody>
              </v-table>
            </div>
            <div v-else>
              <h4 class="not-found">Select a DSO to view details</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const $ = require("jquery");
import web3 from "../assets/js/contracts.js";
import { timeConverter } from "../assets/js/time-format.js";
import { AssetLoggingContract } from "../assets/js/contracts.js";
import { log } from "util";
export default {
  name: "Registry",
  data() {
    return {
      dsos: [],
      assets: [],
      assetList: [],
      dsoInput: "",
      dsoPubkey: "",
      assetPubkey: "",
      dsoWallet: [],
      dsoAddress: ""
    };
  },
  methods: {
    // new admin registration event
    watchNewAdmin() {
      AssetLoggingContract.events
        .NewAdmin({
          fromBlock: 0
        })
        .on("data", event => {
          if (event.returnValues.adminType === 2) {
            this.dsos.push(event.returnValues.pubkey);
          }
        })
        .on("error", console.error);
    },

    // new asset registration event
    watchNewAsset() {
      AssetLoggingContract.events
        .NewAsset({
          fromBlock: 0
        })
        .on("data", event => {
          let assetObject = {};
          assetObject.assetPubkey = event.returnValues.assetPubkey;
          assetObject.assetType = event.returnValues.assetType;
          assetObject.dsoPubkey = event.returnValues.dsoPubkey;
          assetObject.installDate = event.returnValues.installDate;
          assetObject.location = event.returnValues.location;
          assetObject.ownerPubkey = event.returnValues.ownerPubkey;
          assetObject.registrationTime = timeConverter(
            event.returnValues.registrationTime.toNumber()
          );
          assetObject.voltageLevel = event.returnValues.voltageLevel;
          this.assets.push(assetObject);

          // push asset to list
          this.assetList.push(event.returnValues.assetPubkey);
        })
        .on("error", console.error);
    },

    // set dso value method
    setDsoValue() {
      AssetLoggingContract.methods
        .setDsoValue(this.assetPubkey, this.dsoInput)
        .send({ from: this.dsoPubkey, gasPrice: "1" })
        .then(receipt => {
          //console.log(receipt);
        });

      this.dsoInput = "";
      this.dsoPubkey = "";
      this.assetPubkey = "";
    },
    getDsoWallet() {
      this.dsoWallet = [];
      this.dsoAddress = event.target.innerHTML;
      AssetLoggingContract.getPastEvents("NewDsoValue", { fromBlock: 0 }).then(
        events => {
          events.forEach(event => {
            if (this.dsoAddress === event.returnValues[0]) {
              this.dsoWallet.push({
                asset: event.returnValues[1],
                values: event.returnValues[2].toNumber(),
                time: timeConverter(event.returnValues[3])
              });
            }
          });
        }
      );
      // removing the background color for ul-selected items
      document.querySelectorAll("ol>li").forEach(list => {
        list.classList.remove("active-dso");
      });
      // add background to selected account
      event.target.classList.add("active-dso");
    }
  },
  created() {
    this.watchNewAdmin();
    this.watchNewAsset();
  }
};
</script>


<style scoped>
.registry {
  display: flex;
  justify-content: space-between;
  background: #f0f1f1;
}

.dso-panel {
  width: 35%;
  margin: 1rem;
}

.registration-details {
  display: flex;
  flex-direction: column;
  width: 60%;
  margin: 1rem;
}
.dsos-value {
  text-align: left;
  background: #fff;
  padding: 1rem;
  border: 1px solid #dee2e6;
  border-radius: 2px;
  margin-bottom: 2rem;
}

fieldset {
  padding: 1.5rem;
  border: 1px solid #c3c6c7;
}

legend {
  font-size: 1rem;
  color: #fff;
  padding: 1rem;
  background-color: #013646;
}

input,
select {
  width: 100%;
  margin: 1rem;
  padding: 0.5rem;
  box-sizing: border-box;
  border: 1px solid #abaeaf;
  border-radius: 1px;
  margin: 1rem auto;
}

button {
  padding: 0.8rem;
  border: 1px solid #013646;
  border-radius: 2px;
  color: #fff;
  font-size: 0.8rem;
  cursor: pointer;
  float: right;
  background-color: #154360;
  transition-duration: 0.4s;
}

button:hover {
  background-color: #4caf50;
  border: 1px solid #40a043;
}

.model {
  padding: 1rem;
}

img {
  width: 100%;
}

.dso-wallet {
  display: flex;
  justify-content: space-between;
}

.dso-list {
  margin-top: 2rem;
  width: 35%;
  background: #ffffff;
}

.wallet {
  width: 60%;
  margin-top: 2rem;
}

.header,
.list-body {
  text-align: left;
  border-bottom: 1.5px solid #68437a;
  border: 1px solid #dee2e6;
  background: #ffffff;
  box-shadow: 0 10px 30px rgba(51, 51, 51, 0.1);
  border-radius: 2px;
}

h4 {
  padding-left: 0.8rem;
}

.list-body {
  height: 250px;
  overflow-y: auto;
}

ol > li {
  width: 90%;
  list-style-position: inside;
  font-size: 0.8rem;
  padding: 1rem;
  font-weight: bold;
  cursor: pointer;
  margin-left: -25px;
  transition: font-size 0.3s ease, background-color 0.3s ease;
}

ol > li:after {
  content: "";
  display: block;
  width: 90%;
  padding-top: 0.5em;
  border-bottom: 1px solid rgb(206, 204, 204);
}

ol > li:last-child:after {
  border-bottom: none;
}

ol > li:hover {
  background: #bbbbbb;
}

li {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.active-dso {
  background-color: #9be99b;
}
</style>

