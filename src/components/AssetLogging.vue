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
</style>
