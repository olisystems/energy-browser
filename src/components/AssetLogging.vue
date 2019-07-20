<template>
  <div id="asset-logging">
    <ValueEvents />
    <Registry />
  </div>
</template>

<script>
import ValueEvents from "./ValueEvents";
import Registry from "./Registry";
export default {
  name: "AssetLogging",
  components: {
    ValueEvents,
    Registry
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
.not-found {
  color: #bbb;
}

.wrapper {
  border: 1px solid #dee2e6;
  background: #ffffff;
  box-shadow: 0 10px 30px rgba(51, 51, 51, 0.1);
  border-radius: 2px;
}

.table-header {
  /* background-color: #cdf1c3; */
  text-align: left;
  border-bottom: 1.5px solid #e1dfe2;
}

.table-header > h4 {
  padding-left: 0.8rem;
}

.table {
  height: 250px;
  overflow-y: auto;
}

.table-wrapper {
  border: #dee2e6 1px solid;
  margin: 0.5rem;
  border-radius: 2px;
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

.table table {
  table-layout: fixed;
  width: 100%;
  padding: 0.5rem;
}

td,
th {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0.5rem;
  font-size: 0.8rem;
}

td {
  border-bottom: 1px solid #cccccc;
}

tbody > tr:last-child > td {
  border-bottom: none;
}
</style>
