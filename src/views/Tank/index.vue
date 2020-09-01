<template>
  <div class="tank-wrapper">
    <router-view />
  </div>
</template>

<script>
export default {
  mounted() {
  }
};
</script>

<style>
@font-face {
  font-family: font-tank;
  src: url("./assets/SIMLI.TTF");
}
@font-face {
  font-family: final-font;
  src: url("./finalAssets/final.TTF");
}
.tank-wrapper {
  font-weight: bold;
  font-family: "final-font", serif;
  overflow-y: auto;
  font-size: 14px;
}
</style>
