<template>
  <div class="main">
    <div class="container">
      <div class="col-1">
        <div class="wrapper">
          <div class="table-header">
            <h4>Producer's Transaction History</h4>
          </div>
          <div class="account-header">
            <h4>
              Account Address:
              <span class="producer-address">{{ producerAddress }}</span>
            </h4>
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
                <tbody slot="body" slot-scope="{ displayData }">
                  <tr v-for="(row, index) in displayData" :key="index">
                    <td v-tooltip="row.time">{{ row.time }}</td>
                    <td>{{ row.power }}</td>
                    <td>{{ row.blockNumber }}</td>
                    <td v-tooltip="row.blockHash">{{ row.blockHash }}</td>
                    <!-- <td>{{row.gasPrice}}</td> -->
                  </tr>
                </tbody>
              </v-table>
            </div>
            <div class="pro-placeholder">
              <h5>select an account to view the history</h5>
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
            <h4>
              Account Address:
              <span class="consumer-address">{{ consumerAddress }}</span>
            </h4>
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
                <tbody slot="body" slot-scope="{ displayData }">
                  <tr v-for="(row, index) in displayData" :key="index">
                    <td v-tooltip="row.time">{{ row.time }}</td>
                    <td>{{ row.power }}</td>
                    <td>{{ row.blockNumber }}</td>
                    <td v-tooltip="row.blockHash">{{ row.blockHash }}</td>
                    <!-- <td>{{row.gasPrice}}</td> -->
                  </tr>
                </tbody>
              </v-table>
            </div>
            <div class="cons-placeholder">
              <h5>select an account to view the history</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- list of producers and consumers -->
    <div class="container container-center">
      <div class="col-1 pro-list">
        <div class="wrapper">
          <div class="table-header">
            <h4>List of Registered Producers</h4>
          </div>

          <div class="producer-list">
            <ol>
              <li
                v-tooltip="item"
                v-on:click="getCurrentPro"
                v-for="(item, index) in producers"
                v-bind:key="index"
              >
                {{ item }}
              </li>
            </ol>
          </div>
        </div>
      </div>

      <div class="col-3">
        <div id="map"></div>
      </div>

      <div class="col-2 cons-list">
        <div class="wrapper">
          <div class="table-header">
            <h4>List of Registered Consumers</h4>
          </div>
          <div class="consumer-list">
            <ol>
              <li
                v-tooltip="item"
                v-on:click="getCurrentCons"
                v-for="(item, index) in consumers"
                v-bind:key="index"
              >
                {{ item }}
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="col-1">
        <div class="wrapper">
          <div class="table-header">
            <h4>Producer's Registration Details</h4>
          </div>
          <div class="details-wrapper">
            <div class="account-header pro-account">
              <h4 class="total-header">
                Total Production [kWh]:
                <span class="producer-balance">{{ producerBalance }}</span>
              </h4>
            </div>
            <div class="details">
              <div class="placeholder pro-details-placeholder">
                <h5>select an account to see the details</h5>
              </div>
              <table class="details-table pro-details-table">
                <tbody>
                  <tr>
                    <th class="property-name">Owner:</th>
                    <td class="property-value">{{ producerDetails.owner }}</td>
                  </tr>
                  <tr>
                    <th class="property-name">Device Type:</th>
                    <td class="property-value">{{ producerDetails.device }}</td>
                  </tr>
                  <tr>
                    <th class="property-name">Peak Power (+) [W]:</th>
                    <td class="property-value">
                      {{ producerDetails.peakPower }}
                    </td>
                  </tr>
                  <tr>
                    <th class="property-name">Location Type:</th>
                    <td class="property-value">
                      {{ producerDetails.location }}
                    </td>
                  </tr>
                  <tr>
                    <th class="property-name">Latitude:</th>
                    <td class="property-value">
                      {{ producerDetails.latitude }}
                    </td>
                  </tr>
                  <tr>
                    <th class="property-name">Longitude:</th>
                    <td class="property-value">
                      {{ producerDetails.longitude }}
                    </td>
                  </tr>
                  <tr>
                    <th class="property-name">Install Date:</th>
                    <td class="property-value">{{ producerDetails.date }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="col-2">
        <div class="wrapper">
          <div class="table-header">
            <h4>Consumer's Registration Details</h4>
          </div>
          <div class="details-wrapper">
            <div class="account-header cons-account">
              <h4 class="total-header">
                Total Consumption [kWh]:
                <span class="consumer-balance">{{ consumerBalance }}</span>
              </h4>
            </div>
            <div class="details">
              <div class="placeholder cons-details-placeholder">
                <h5>select an account to view the history</h5>
              </div>
              <table class="details-table cons-details-table">
                <tbody>
                  <tr>
                    <th class="property-name">Owner:</th>
                    <td class="property-value">{{ consumerDetails.owner }}</td>
                  </tr>
                  <tr>
                    <th class="property-name">Device Type:</th>
                    <td class="property-value">{{ consumerDetails.device }}</td>
                  </tr>
                  <tr>
                    <th class="property-name">Peak Power (+) [W]:</th>
                    <td class="property-value">
                      {{ consumerDetails.peakPower }}
                    </td>
                  </tr>
                  <tr>
                    <th class="property-name">Location Type:</th>
                    <td class="property-value">
                      {{ consumerDetails.location }}
                    </td>
                  </tr>
                  <tr>
                    <th class="property-name">Latitude:</th>
                    <td class="property-value">
                      {{ consumerDetails.latitude }}
                    </td>
                  </tr>
                  <tr>
                    <th class="property-name">Longitude:</th>
                    <td class="property-value">
                      {{ consumerDetails.longitude }}
                    </td>
                  </tr>
                  <tr>
                    <th class="property-name">Install Date:</th>
                    <td class="property-value">{{ consumerDetails.date }}</td>
                  </tr>
                </tbody>
              </table>
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
import { log } from "util";
import { timeConverter } from "../../assets/js/time-format";
import L from "leaflet";

export default {
  name: "TransactionHistory",
  Contracts: null,
  data() {
    return {
      producers: [],
      consumers: [],
      producer: [],
      consumer: [],
      map: null,
      producerAddress: "",
      consumerAddress: "",
      proEthAddress: [],
      consEthAddress: [],
      proLoc: [],
      consLoc: [],
      proLocObject: {},
      consLocObject: {},
      proLocEntries: [],
      consLocEntries: [],
      currentProCord: [],
      currentConsCord: [],
      proPopup: "",
      consPopup: "",
      currentProPopup: [],
      currentConsPopup: [],
      currentProMarker: {},
      currentConsMarker: {},
      currentProAddress: "",
      currentConsAddress: "",
      producerBalance: "",
      consumerBalance: "",
      producerDetails: {},
      consumerDetails: {},
    };
  },
  methods: {
    getProducerHistory() {
      this.producer = [];
      this.producerAddress = event.target.innerHTML.trim();
      let currentBlock = "";
      web3.eth.getBlockNumber().then((blockNumber) => {
        currentBlock = blockNumber;
        this.Contracts.ProductionContract.getPastEvents("ProTransactionEvent", {
          fromBlock: currentBlock - 50,
        }).then((events) => {
          events.forEach((event) => {
            if (this.producerAddress === event.returnValues[0]) {
              this.producer.push({
                time: timeConverter(event.returnValues[1]),
                power: event.returnValues[2],
                blockNumber: event.returnValues[3],
                blockHash: event.returnValues[4],
                gasPrice: event.returnValues[5],
              });
              $(".pro-placeholder").hide();
            }
          });
        });
      });
      // removing the background color for ul-selected items
      document.querySelectorAll(".producer-list > ol>li").forEach((list) => {
        list.classList.remove("active-producer");
      });
      // add background to selected account
      event.target.classList.add("active-producer");
    },
    getConsumerHistory() {
      this.consumer = [];
      this.consumerAddress = event.target.innerHTML.trim();
      let currentBlock = "";
      web3.eth.getBlockNumber().then((blockNumber) => {
        currentBlock = blockNumber;
        this.Contracts.ConsumptionContract.getPastEvents(
          "ConsTransactionEvent",
          {
            fromBlock: currentBlock - 50,
          }
        ).then((events) => {
          events.forEach((event) => {
            if (this.consumerAddress === event.returnValues[0]) {
              this.consumer.push({
                time: timeConverter(event.returnValues[1]),
                power: event.returnValues[2],
                blockNumber: event.returnValues[3],
                blockHash: event.returnValues[4],
                gasPrice: event.returnValues[5],
              });
              $(".cons-placeholder").hide();
            }
          });
        });
      });
      // removing the background color for ul-selected items
      document.querySelectorAll(".consumer-list > ol > li").forEach((list) => {
        list.classList.remove("active-consumer");
      });
      // add background to selected account
      event.target.classList.add("active-consumer");
    },
    // producer accounts list
    getProducerList() {
      this.Contracts.ProductionContract.methods
        .getProAccntsList()
        .call()
        .then((list) => {
          // push each item to array
          list.forEach((item) => {
            this.producers.push(item);
          });
          // remove first 0x00 account
          this.producers.shift();
        });
    },
    // producer accounts list
    getConsumerList() {
      const popupOptions = {
        maxWidth: "500",
        className: "currentPro-popup", // classname for another popup
      };
      this.Contracts.ConsumptionContract.methods
        .getConsAccntsList()
        .call()
        .then((list) => {
          // push each item to array
          list.forEach((item) => {
            this.consumers.push(item);
          });
          // remove first 0x00 account
          this.consumers.shift();
        });
    },
    // spatial distribution map
    getCurrentProMarker() {
      this.currentProAddress = event.target.innerHTML.trim();
      let popupOptions = {
        maxWidth: "500",
        className: "currentPro-popup", // classname for another popup
      };

      this.Contracts.ProductionContract.getPastEvents("ProducerRegs", {
        fromBlock: 0,
        toBlock: "latest",
      }).then((results) => {
        results.forEach((result) => {
          this.proLoc.push(
            result.returnValues.latitude / 10000 +
              ", " +
              result.returnValues.longitude / 10000 +
              ", " +
              result.returnValues.owner
          );

          // push addresses
          this.proEthAddress.push(result.returnValues.pvAddr);

          // bind key values
          this.proEthAddress.forEach(
            (key, i) => (this.proLocObject[key] = this.proLoc[i])
          );
        });

        // storing entries of single object into list of items
        for (let i = 0; i < Object.keys(this.proLocObject).length; i++) {
          this.proLocEntries.push(Object.entries(this.proLocObject)[i]);
        }

        for (let i = 0; i < this.proLocEntries.length; i++) {
          if (this.currentProAddress === this.proLocEntries[i][0]) {
            this.currentProCord = this.proLocObject[this.currentProAddress];
            this.currentProCord = this.currentProCord.split(",");
            let currentProLat = this.currentProCord[0].trim();
            let currentProLon = this.currentProCord[1].trim();

            this.currentProPopup =
              "Eth address: " +
              this.currentProAddress.slice(0, 7) +
              "..." +
              "<br>" +
              "Producer: " +
              this.currentProCord[2] +
              "<br>" +
              "Location: " +
              this.currentProCord[0] +
              ", " +
              this.currentProCord[1];

            let currentProIcon = L.icon({
              iconUrl: "img/producer.png",
              iconSize: [30, 40],
            });

            if (this.currentProMarker != undefined) {
              this.map.removeLayer(this.currentProMarker);
            }

            this.currentProMarker = L.marker([currentProLat, currentProLon], {
              icon: currentProIcon,
            }).addTo(this.map);
            this.currentProMarker
              .bindPopup(this.currentProPopup, popupOptions)
              .openPopup();
          }
        }
      });
    },
    getCurrentConsMarker() {
      this.currentConsAddress = event.target.innerHTML.trim();
      let popupOptions = {
        maxWidth: "500",
        className: "currentCons-popup", // classname for another popup
      };

      this.Contracts.ConsumptionContract.getPastEvents("ConsumerRegs", {
        fromBlock: 0,
      }).then((results) => {
        results.forEach((result) => {
          this.consLoc.push(
            result.returnValues.latitude / 10000 +
              ", " +
              result.returnValues.longitude / 10000 +
              ", " +
              result.returnValues.owner
          );

          // push addresses
          this.consEthAddress.push(result.returnValues.pvAddr);

          // bind key values
          this.consEthAddress.forEach(
            (key, i) => (this.consLocObject[key] = this.consLoc[i])
          );
        });

        // storing entries of single object into list of items
        for (let i = 0; i < Object.keys(this.consLocObject).length; i++) {
          this.consLocEntries.push(Object.entries(this.consLocObject)[i]);
        }

        for (let i = 0; i < this.consLocEntries.length; i++) {
          if (this.currentConsAddress === this.consLocEntries[i][0]) {
            this.currentConsCord = this.consLocObject[this.currentConsAddress];
            this.currentConsCord = this.currentConsCord.split(",");
            let currentConsLat = this.currentConsCord[0].trim();
            let currentConsLon = this.currentConsCord[1].trim();

            this.currentConsPopup =
              "Eth address: " +
              this.currentConsAddress.slice(0, 7) +
              "..." +
              "<br>" +
              "Producer: " +
              this.currentConsCord[2] +
              "<br>" +
              "Location: " +
              this.currentConsCord[0] +
              ", " +
              this.currentConsCord[1];

            let currentConsIcon = L.icon({
              iconUrl: "img/consumer.png",
              iconSize: [30, 40],
            });

            if (this.currentConsMarker != undefined) {
              this.map.removeLayer(this.currentConsMarker);
            }

            this.currentConsMarker = L.marker(
              [currentConsLat, currentConsLon],
              { icon: currentConsIcon }
            ).addTo(this.map);
            this.currentConsMarker
              .bindPopup(this.currentConsPopup, popupOptions)
              .openPopup();
          }
        }
      });
    },
    addProMarkers() {
      // define popup options
      const popupOptions = {
        maxWidth: "500",
        className: "currentPro-popup",
      };
      // producer icon
      const producerIcon = L.icon({
        iconUrl: "img/producer.png",
        iconSize: [50, 60],
      });
      // get event data
      this.Contracts.ProductionContract.getPastEvents("ProducerRegs", {
        fromBlock: 0,
      }).then((results) => {
        results.forEach((result) => {
          const markers = L.marker(
            [
              result.returnValues.latitude / 10000,
              result.returnValues.longitude / 10000,
            ],
            { icon: producerIcon }
          ).addTo(this.map);

          // define popup contents
          this.proPopup =
            "Eth address: " +
            result.returnValues.pvAddr.slice(0, 7) +
            "..." +
            "<br>" +
            "Producer: " +
            result.returnValues.owner +
            "<br>" +
            "Location: " +
            result.returnValues.latitude / 10000 +
            ", " +
            result.returnValues.longitude / 10000;
          // bind popup
          markers.bindPopup(this.proPopup, popupOptions);
          markers.on("mouseover", function () {
            this.openPopup();
          });
          markers.on("mouseout", function () {
            this.closePopup();
          });
        });
      });
    },
    addConsMarkers() {
      // define popup options
      const popupOptions = {
        maxWidth: "500",
        className: "currentCons-popup",
      };
      // consumer icon
      const consumerIcon = L.icon({
        iconUrl: "img/consumer.png",
        iconSize: [50, 60],
      });
      // get event data
      this.Contracts.ConsumptionContract.getPastEvents("ConsumerRegs", {
        fromBlock: 0,
      }).then((results) => {
        results.forEach((result) => {
          const markers = L.marker(
            [
              result.returnValues.latitude / 10000,
              result.returnValues.longitude / 10000,
            ],
            { icon: consumerIcon }
          ).addTo(this.map);

          // define popup contents
          this.consPopup =
            "Eth address: " +
            result.returnValues.pvAddr.slice(0, 7) +
            "..." +
            "<br>" +
            "Producer: " +
            result.returnValues.owner +
            "<br>" +
            "Location: " +
            result.returnValues.latitude / 10000 +
            ", " +
            result.returnValues.longitude / 10000;
          // bind popup
          markers.bindPopup(this.consPopup, popupOptions);
          markers.on("mouseover", function () {
            this.openPopup();
          });
          markers.on("mouseout", function () {
            this.closePopup();
          });
        });
      });
    },

    initMap() {
      // home marker icon
      var home = L.icon({
        iconUrl: "img/home.png",
        iconSize: [30, 40],
      });

      // create tile layers
      const openStreet = L.tileLayer(
          "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
          {
            attribution:
              "&copy; " +
              '<a href="http://openstreetmap.org">OpenStreetMap</a>' +
              " Contributors",
            maxZoom: 10,
          }
        ),
        OpenStreetMap_BlackAndWhite = L.tileLayer(
          "http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png",
          {
            maxZoom: 18,
            attribution:
              '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          }
        ),
        OpenStreetMap_DE = L.tileLayer(
          "https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png",
          {
            maxZoom: 18,
            attribution:
              '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          }
        ),
        OpenTopoMap = L.tileLayer(
          "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
          {
            maxZoom: 17,
            attribution:
              'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
          }
        ),
        Esri_WorldImagery = L.tileLayer(
          "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
          {
            attribution:
              "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
          }
        ),
        CartoDB_DarkMatter = L.tileLayer(
          "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png",
          {
            attribution:
              '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
            subdomains: "abcd",
            maxZoom: 19,
          }
        );

      // create base layer object
      const baseMaps = {
        "<span style='color: gray'>Open Street</span>": openStreet,
        Grayscale: OpenStreetMap_BlackAndWhite,
        "Open Street DE": OpenStreetMap_DE,
        "Open Topo": OpenTopoMap,
        "ESRI Imagery": Esri_WorldImagery,
        "CartoDB Dark": CartoDB_DarkMatter,
      };

      this.map = L.map("map", {
        center: [48.6, 9.9],
        zoom: 9,
        layers: openStreet,
      });
      // add layers control
      L.control.layers(baseMaps).addTo(this.map);
      // add home marker
      const homeMarker = L.marker([48.77538056, 9.16277778], {
        icon: home,
      }).addTo(this.map);
      // bind popup to home marker
      homeMarker.bindPopup("OLI Systems GmbH");
      homeMarker.on("mouseover", function () {
        this.openPopup();
      });
      homeMarker.on("mouseout", function () {
        this.closePopup();
      });
    },

    getProducerBalance() {
      // total amount of energy produced by individual producer
      this.Contracts.ProductionContract.methods
        .getProBalance(this.producerAddress)
        .call()
        .then((balance) => {
          this.producerBalance = balance;
        });
    },

    getConsumerBalance() {
      // total amount of energy produced by individual producer
      this.Contracts.ConsumptionContract.methods
        .getConsBalance(this.consumerAddress)
        .call()
        .then((balance) => {
          this.consumerBalance = balance;
        });
    },

    getProducerDetails() {
      $(".pro-account").show();
      $(".pro-details-table").show("slow");
      this.Contracts.ProductionContract.methods
        .getProAccntDetails(this.producerAddress)
        .call()
        .then((details) => {
          this.producerDetails = {
            owner: details[0],
            device: details[1],
            peakPower: details[2],
            location: details[3],
            latitude: details[4] / 1000,
            longitude: details[5] / 1000,
            date: details[6],
          };
        });
      $(".pro-details-placeholder").hide();
    },

    getConsumerDetails() {
      $(".cons-account").show();
      $(".cons-details-table").show("slow");
      this.Contracts.ConsumptionContract.methods
        .getConsAccntDetails(this.consumerAddress)
        .call()
        .then((details) => {
          this.consumerDetails = {
            owner: details[0],
            device: details[1],
            peakPower: details[2],
            location: details[3],
            latitude: details[4] / 1000,
            longitude: details[5] / 1000,
            date: details[6],
          };
        });
      $(".cons-details-placeholder").hide();
    },
    getCurrentPro() {
      this.getCurrentProMarker();
      this.getProducerHistory();
      this.getProducerBalance();
      this.getProducerDetails();
    },
    getCurrentCons() {
      this.getCurrentConsMarker();
      this.getConsumerHistory();
      this.getConsumerBalance();
      this.getConsumerDetails();
    },
  },

  async created() {
    this.Contracts = new Contracts();
    await this.Contracts.start();
    this.getProducerList();
    this.getConsumerList();
    this.addProMarkers();
    this.addConsMarkers();
  },
  mounted() {
    this.initMap();

    // ************************************
  },
};
</script>
<style scoped>
.main {
  background-color: #f3f3f3;
}

.col-1,
.col-2,
.col-3 {
  width: 50%;
  flex-direction: column;
  padding: 1rem;
}

.pro-list,
.cons-list {
  width: 25%;
}

.col-3 {
  width: 100%;
}

#map {
  position: center;
  width: 100% !important;
  height: 100%;
  margin: auto;
  border: 1px solid #ff9800;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.08);
}

.producer-list,
.consumer-list {
  height: 300px;
  overflow-y: auto;
  font-size: 0.8rem;
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
  background: #f2f0f3;
  border: #d8d3d3 1px solid;
  border-radius: 2px;
  font-size: 0.8rem;
  position: sticky;
  z-index: 5;
  top: 0;
}

.overflow-text {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.active-producer {
  background-color: #9be99b;
}

.active-consumer {
  background-color: #ecbe78;
}

.cons-placeholder,
.pro-placeholder {
  margin-top: 3rem;
}

.producer-address,
.producer-balance {
  color: #00b33c;
}

.consumer-address,
.consumer-balance {
  color: #e68a00;
}

.details-wrapper {
  height: 335px;
}

.details {
  padding: 1rem;
  height: 275px;
}

.placeholder {
  margin-top: 6rem;
}
table {
  margin: auto;
  padding: 0.5rem;
}

.details-table {
  border: #d8d3d3 1px solid;
  border-radius: 2px;
  display: none;
}

.property-name {
  background: #f2f0f3;
  font-size: 0.8rem;
  text-align: left;
  width: 20%;
  position: relative;
  border: #d8d3d3 1px solid;
  border-radius: 2px;
}

.property-value {
  color: #394f7c;
  font-size: 1rem;
  font-weight: bold;
}

.pro-account,
.cons-account {
  display: none;
  height: 25px;
}

.total-header {
  margin-bottom: 0;
}

.producer-balance,
.consumer-balance {
  font-size: 1.2rem;
}

@media only screen and (max-width: 1000px) {
  .container-center {
    flex-direction: column;
    align-items: center;
  }
  .col-1,
  .col-2,
  .col-3 {
    width: 100%;
  }

  #map {
    height: 370px;
  }
}
</style>
