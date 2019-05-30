<template>
  <div id="app">
    <Header/>
    <Topbar/>
    <Registration/>
    <TransactionHistory/>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Topbar from "./components/Topbar.vue";
import Registration from "./components/Registration.vue";
import TransactionHistory from "./components/TransactionHistory.vue";

export default {
  name: "app",
  components: {
    Header,
    Topbar,
    Registration,
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
</style>
