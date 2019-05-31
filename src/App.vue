<template>
  <div id="app">
    <Header/>
    <Topbar/>
    <Registration/>
    <RealTimeEnergy/>
    <TransactionHistory/>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Topbar from "./components/Topbar.vue";
import Registration from "./components/Registration.vue";
import RealTimeEnergy from "./components/RealTimeEnergy.vue";
import TransactionHistory from "./components/TransactionHistory.vue";

export default {
  name: "app",
  components: {
    Header,
    Topbar,
    Registration,
    RealTimeEnergy,
    TransactionHistory
  }
};
</script>

<style>
#app {
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
  border: #dee2e6 1.3px solid;
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
</style>
