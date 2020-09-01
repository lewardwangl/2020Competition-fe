<template>
  <div id="leetcode">
    <router-view />
  </div>
</template>

<style lang="scss">
:root {
  --light-grey-0-rgb: 255, 255, 255;
  --light-grey-9-rgb: 0, 0, 0;
  --brand-orange-rgb: 255, 161, 22;
  --primary-0-rgb: 255, 250.3, 243.35;
  --primary-1-rgb: 255, 236.2, 208.4;
  --primary-4-rgb: 255, 179.8, 68.6;
  --primary-5-rgb: 255, 161, 22;
  --primary-6-rgb: 204, 128.356, 16.5;
  --light-primary-5-rgb: rgb(255, 161, 22);
}
@font-face {
  font-family: FetteMittelschrift;
  src: url("assets/FetteMittelschrift_Regular.ttf");
}
@font-face {
  font-family: TypoRound;
  src: url("assets/Typo_Round_Italic.otf");
}
html,
body {
  height: 100%;
  overflow: auto;
}
::-webkit-scrollbar {
  display: none;
}
body {
  width: 100%;
  font-size: 14px;
  line-height: 1.42857;
  color: rgba(38, 38, 38, 1);
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}
#leetcode {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
