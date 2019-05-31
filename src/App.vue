<template>
  <div id="app">
    <Header/>
    <Topbar/>
    <Registration/>
    <RealTimeEnergy/>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Topbar from "./components/Topbar.vue";
import Registration from "./components/Registration.vue";
import RealTimeEnergy from "./components/RealTimeEnergy.vue";

export default {
  name: "app",
  components: {
    Header,
    Topbar,
    Registration,
    RealTimeEnergy
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
.modebar {
  display: none !important;
}
.table-wrapper {
  border: #dee2e6 1.3px solid;
  margin: 0.5rem;
  border-radius: 2px;
}
</style>
