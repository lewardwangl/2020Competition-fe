<template>
  <div class="wrapper-ranks">
    <Ranks :autoplay="true" />
  </div>
</template>

<script>
import LeetCodeRanks from "../../components/Ranks";

export default {
  components: {
    Ranks: LeetCodeRanks
  }
};
</script>

<style lang="scss">
.wrapper-ranks {
  background-image: url(assets/rank-bg.png);
  background-repeat: no-repeat;
  background-size: cover;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 0;
  overflow: hidden;
}
</style>
