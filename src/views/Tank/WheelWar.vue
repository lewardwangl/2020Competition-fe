<template>
  <div :class="$style.wrapper">
    <div :class="$style.ranks">
      <div :class="$style.ranks_left"></div>
      <div :class="$style.ranks_center">
        <div :class="$style.ranks_center_top"></div>
        <div :class="$style.ranks_center_content">
          <div :class="$style.ranks_center_content_header">
            <span>名次</span>
            <span>队伍名称</span>
            <span>胜场</span>
            <span>积分</span>
          </div>
          <div :class="$style.ranks_center_content_body" ref="body">
            <div v-for="item in data" :key="item.rank">
              <span>{{ item.rank }}</span>
              <span>{{ item.player }}</span>
              <span>{{ item.num }}</span>
              <span>{{ item.score }}</span>
            </div>
          </div>
        </div>
        <div :class="$style.ranks_center_bottom"></div>
      </div>
      <div :class="$style.ranks_right"></div>
    </div>
  </div>
</template>

<style lang="scss" module>
@mixin background_style {
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
@mixin rank_item {
  height: 65px;
  display: block;
  padding: 8px 16px;
  border-bottom: 1px solid #eee;
}
.wrapper {
  color: #fff;
  font-size: 14px;
  @include background_style;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-image: url("./assets/背景.png");
  display: flex;
  justify-content: center;
  align-items: center;
  .ranks {
    transform: scale(0.6);
    display: flex;
    &_left {
      @include background_style;
      background-image: url("./assets/左.png");
      width: 119px;
      height: 665px;
      flex-grow: 0;
      position: relative;
      &::before {
        content: url("./assets/车轮战积分榜.png");
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: 10px;
        transform: translate3d(-50%, -50%, 0);
      }
    }
    &_center {
      height: 665px;
      display: flex;
      flex-direction: column;
      flex: 1;
      &_top {
        @include background_style;
        background-image: url("./assets/上.png");
        width: 1080px;
        height: 55px;
        position: relative;
        &::before {
          content: url("./assets/wars of tanks.png");
          position: absolute;
          top: 0;
          left: 50%;
          transform: translate3d(-50%, -50%, 0);
        }
      }
      &_content {
        height: calc(665px - 55px - 18px);
        font-size: 2em;
        text-align: center;
        flex-grow: 1;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        flex-direction: column;
        &_header,
        &_body > div {
          display: flex;
          span {
            @include rank_item;
          }
          span:nth-child(1) {
            width: 15%;
          }
          span:nth-child(2) {
            width: 55%;
            overflow: hidden;
          }
          span:nth-child(3) {
            width: 15%;
          }
          span:nth-child(4) {
            width: 15%;
          }
        }
        &_body {
          flex-grow: 1;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
          & > div:nth-child(1) {
            span:nth-child(1) {
              @include background_style;
              background-size: contain;
              background-image: url("./assets/1.png");
              min-width: 53px;
              color: transparent;
            }
          }
          & > div:nth-child(2) {
            span:nth-child(1) {
              @include background_style;
              background-size: contain;
              background-image: url("./assets/2.png");
              min-width: 53px;
              color: transparent;
            }
          }
          & > div:nth-child(3) {
            span:nth-child(1) {
              @include background_style;
              background-size: contain;
              background-image: url("./assets/3.png");
              min-width: 53px;
              color: transparent;
            }
          }
        }
      }
      &_bottom {
        @include background_style;
        background-image: url("./assets/下.png");
        height: 18px;
        width: 1080px;
      }
    }
    &_right {
      @include background_style;
      background-image: url("./assets/右.png");
      width: 110px;
      height: 665px;
      flex-grow: 0;
    }
  }
}
</style>

<script>
export default {
  data() {
    return {
      data: [],
      current: 1
    };
  },
  methods: {
    async fetchRanks() {
      try {
        const r = await fetch(
          `http://${process.env.VUE_APP_API_ORIGIN}/api/tank/ranks`
        ).then(r => r.json());
        if (Array.isArray(r)) {
          this.data = r;
        }
      } catch (e) {
        console.error("error");
      }
    },
    ws() {
      const w = new WebSocket(
        `ws://${process.env.VUE_APP_API_ORIGIN}/api/tank/ws?mode=wheel_war`
      );
      w.onerror = () => {
        console.error("ws error");
      };
      w.onclose = () => {
        console.error("ws was closed");
        setTimeout(() => this.ws(), 3000);
      };
      w.onmessage = () => {
        this.fetchRanks();
      };
    }
  },
  mounted() {
    this.fetchRanks();
    this.ws();
    this.timer = setInterval(() => {
      let top = 66 * 4 * this.current;
      if (top > this.data.length * 66 - 4 * 66) {
        this.current = 0;
        top = 0;
      }
      this.$refs.body.scrollTo({
        behavior: "smooth",
        top
      });
      this.current++;
    }, 10000);
  },
  destroyed() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
};
</script>
