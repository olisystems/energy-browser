<template>
  <div id="browser">
    <Topbar/>
    <Registration/>
    <RealTimeEnergy/>
    <TransactionHistory/>
  </div>
</template>
<script>
import Topbar from "./Topbar";
import Registration from "./Registration";
import RealTimeEnergy from "./RealTimeEnergy";
import TransactionHistory from "./TransactionHistory";
export default {
  name: "Main",
  components: {
    Topbar,
    Registration,
    RealTimeEnergy,
    TransactionHistory
  }
};
</script>
<style>
#browser {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
}

body {
  margin: 0;
}

h4 {
  margin-left: 1.5rem;
}

h5 {
  color: #bbbbbb;
}

.container {
  display: flex;
  justify-content: space-between;
  margin: 0.5rem 2rem;
}

/* hide plotly toolbar */
.modebar {
  display: none !important;
}

/* wrapper for div main contents */
.wrapper {
  border: 1px solid #dee2e6;
  background: rgb(255, 255, 255);
  /* box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.08); */
  border-radius: 2px;
}

.table-header {
  /* background-color: #cdf1c3; */
  text-align: left;
  border-bottom: 1.5px solid #e1dfe2;
}

.table-wrapper {
  border: #dee2e6 1px solid;
  margin: 0.5rem;
  border-radius: 2px;
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
  padding: 0.2rem;
  font-size: 0.8rem;
  background: #f2f0f3;
  border: #d8d3d3 1px solid;
  border-radius: 2px;
}

td,
th {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0.5rem;
  font-size: 0.8rem;
}

th:hover,
td:hover {
  overflow: visible;
  white-space: normal;
  word-wrap: break-word;
}

td {
  border-bottom: 1px solid #cccccc;
}

tbody > tr:last-child > td {
  border-bottom: none;
}

/*current producer popop style*/
.currentPro-popup .leaflet-popup-content-wrapper {
  background: #00b33c;
  color: white;
  font-size: 12px;
  line-height: 24px;
  border-radius: 0px;
}

.currentPro-popup .leaflet-popup-tip-container {
  width: 50px;
  height: 15px;
}

.currentPro-popup .leaflet-popup-tip {
  background: #00b33c;
  border: white;
  box-shadow: none;
}

.my-div-icon,
.leaflet-div-icon {
  color: #00b33c;
  background: #00b33c;
}

/*current consumer popop style*/
.currentCons-popup .leaflet-popup-content-wrapper {
  background: #e68a00;
  color: white;
  font-size: 12px;
  line-height: 24px;
  border-radius: 0px;
}

.currentCons-popup .leaflet-popup-tip-container {
  width: 50px;
  height: 15px;
}

.currentCons-popup .leaflet-popup-tip {
  background: #e68a00;
  border: white;
  box-shadow: none;
}

@media only screen and (max-width: 48em) {
  .container {
    flex-direction: column;
    align-items: center;
  }
}
</style>
