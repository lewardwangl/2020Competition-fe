<template>
  <div :class="$style.wrapper">
    <div :class="$style.ranks">
      <div :class="$style.ranks_left"></div>
      <div :class="$style.ranks_center">
        <div :class="$style.ranks_center_top"></div>
        <div :class="$style.ranks_center_content">
          <div :class="$style.ranks_center_content_header">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div :class="$style.ranks_center_content_body" ref="body">
            <div v-for="item in data" :key="item.rank">
              <span><i></i></span>
              <span>{{ item.player }}</span>
              <span>{{ item.count }}</span>
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
// 颜色设定
// 第一名的线条颜色值
$firstLineColor: rgb(4, 217, 227);
// 第一名的框体排行背景颜色
$firstBarBgColor: linear-gradient(to bottom, rgb(27, 67, 67), rgb(15, 55, 55));
// 第一名的框体队伍ID背景色
$firstBarBgColorForTeam: linear-gradient(
  to bottom,
  rgb(47, 89, 89),
  rgb(9, 50, 50)
);
// 第一名的框体框左侧的渐变
$firstBarBgColorForTeamLeft: linear-gradient(
  135deg,
  rgb(47, 89, 89) 4%,
  rgb(9, 50, 50) 50%
);
// 第一名的框体框右侧的渐变
$firstBarBgColorForTeamRight: linear-gradient(
  139deg,
  rgb(47, 89, 89) 50%,
  rgb(9, 50, 50) 95%
);
// 其余正常线条颜色值
$lineColor: rgb(72, 229, 255);
// 其余正常的排行背景色：
$barBgRankColor: linear-gradient(to bottom, rgb(36, 36, 36), rgb(18, 17, 18));
// 其余正常的队伍ID框的背景色
$barBgColorForTeam: linear-gradient(to bottom, rgb(5, 5, 5), rgb(20, 67, 67));
// 正常队伍框左侧的渐变
$barBgColorForTeamLeft: linear-gradient(
  135deg,
  rgb(5, 5, 5) 1%,
  rgb(20, 67, 67) 50%
);
// 正常队伍框右侧的渐变
$barBgColorForTeamRight: linear-gradient(
  139deg,
  rgb(5, 5, 5) 50%,
  rgb(20, 67, 67) 95%
);
// 胜场背景色
$BarBgColorForScore: rgb(35, 35, 35);
// 队伍颜色值
$team1Color: rgb(253, 161, 40);
$team23Color: rgb(220, 220, 220);
$team456Color: rgb(252, 231, 121);
$team78Color: rgb(216, 247, 254);
// 胜场颜色值
$win1Color: rgb(253, 161, 40);
$win23Color: rgb(220, 220, 220);
$win456Color: rgb(252, 231, 121);
$win78Color: rgb(216, 247, 254);

// 线条粗细
$lineWidth: 1px;
// 框的高度
$barHeight: 62px;
// 框的padding
$barPadding: 8px 16px;
// 框之间的间距
$barMargin: 4px 0;
// 排行的宽度
$barRankWidth: 200px;
// 胜场的宽度
$barWinWidth: 260px;

.wrapper {
  color: #fff;
  font-size: 14px;
  font-family: "final-font", serif;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-image: url("./finalAssets/决赛背景.png");
  display: flex;
  justify-content: center;
  align-items: center;
  .ranks {
    transform: scale(0.6);
    display: flex;
    &_left {
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      background-image: url("./finalAssets/框左700110.png");
      width: 110px;
      height: 700px;
      flex-grow: 0;
      position: relative;
    }
    &_center {
      height: 700px;
      display: flex;
      flex-direction: column;
      flex: 1;
      position: relative;
      &::before {
        z-index: 11;
        position: absolute;
        top: 0;
        left: 0;
        transform: translate3d(-40%, -100%, 0);
        content: url("./finalAssets/左上logo.png");
      }
      &::after {
        z-index: 11;
        position: absolute;
        top: 0;
        right: 0;
        transform: translate3d(60%, -100%, 0);
        content: url("./finalAssets/右上logo.png");
      }
      &_top {
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        background-image: url("./finalAssets/框上110060.png");
        width: 1100px;
        height: 60px;
        position: relative;
        &::before {
          content: url("./finalAssets/标题.png");
          position: absolute;
          top: 0;
          left: 50%;
          transform: translate3d(-50%, -50%, 0);
        }
      }
      &_content {
        height: calc(700px - 60px - 20px);
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
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
            height: $barHeight;
            display: block;
            padding: $barPadding;
            position: relative;
            overflow: hidden;
          }
          //排行
          span:nth-child(1) {
            width: $barRankWidth;
          }
          //队伍ID
          span:nth-child(2) {
            flex: 1;
          }
          // 胜场
          span:nth-child(3) {
            width: $barWinWidth;
          }
        }
        &_header {
          padding: ($barHeight - 40px) /2 0;
          span {
            height: 40px;
          }
          span:nth-child(1) {
            background-image: url("./finalAssets/排行.png");
          }
          span:nth-child(2) {
            background-image: url("./finalAssets/队伍ID.png");
          }
          span:nth-child(3) {
            background-image: url("./finalAssets/胜场.png");
            //background-position-x: 75%;
          }
        }

        &_body > div {
          span {
            margin: $barMargin;
          }
          //排行
          span:nth-child(1) {
            background: $barBgRankColor;
            i {
              margin-top: 4px;
              display: inline-block;
              width: 100%;
              height: 100%;
              background-position: center;
              background-repeat: no-repeat;
              background-size: 16%;
            }
            &::before {
              content: "";
              position: absolute;
              background-size: contain;
              background-repeat: no-repeat;
              background-position: center;
              display: block;
              width: 50px;
              height: 50px;
              left: 50%;
              transform: translate3d(-50%, 0, 0);
            }
            &::after {
              position: absolute;
              content: "";
              width: 100px;
              height: 100px;
              right: 0;
              background: $barBgColorForTeamLeft;
              transform: translate3d(64px, 4px, 0) rotate(40deg);
            }
          }
          span:nth-child(2) {
            background: $barBgColorForTeam;
          }
          // 胜场
          span:nth-child(3) {
            background-color: $BarBgColorForScore;
            box-shadow: inset 0 0 0 $lineWidth $lineColor;
            &:before {
              z-index: 1;
              position: absolute;
              content: "";
              display: block;
              width: 100px;
              height: 100px;
              left: -50px;
              top: -50px;
              transform: rotate(40deg);
              border-right: $lineWidth solid $lineColor;
              background: $barBgColorForTeamRight;
            }
          }
        }
        //// 排行图片
        //&_body > div:nth-child(1) > span:nth-child(1) > i {
        //  background-image: url("./finalAssets/1.png");
        //}
        //&_body > div:nth-child(2) > span:nth-child(1) > i {
        //  background-image: url("./finalAssets/2.png");
        //}
        //&_body > div:nth-child(3) > span:nth-child(1) > i {
        //  background-image: url("./finalAssets/3.png");
        //}
        //&_body > div:nth-child(4) > span:nth-child(1) > i {
        //  background-image: url("./finalAssets/4.png");
        //}
        //&_body > div:nth-child(5) > span:nth-child(1) > i {
        //  background-image: url("./finalAssets/5.png");
        //}
        //&_body > div:nth-child(6) > span:nth-child(1) > i {
        //  background-image: url("./finalAssets/6.png");
        //}
        //&_body > div:nth-child(7) > span:nth-child(1) > i {
        //  background-image: url("./finalAssets/7.png");
        //}
        //&_body > div:nth-child(8) > span:nth-child(1) > i {
        //  background-image: url("./finalAssets/8.png");
        //}
        // 冠军
        &_body > div:nth-child(1) {
          box-shadow: inset 0 0 0 $lineWidth $firstLineColor;
          span:nth-child(1) {
            background: $firstBarBgColor;
            &:before {
              background-image: url("./finalAssets/金.png");
            }
            &:after {
              background: $firstBarBgColorForTeamLeft;
            }
          }
          span:nth-child(2) {
            color: $team1Color;
            background: $firstBarBgColorForTeam;
          }
          // 胜场
          span:nth-child(3) {
            color: $win1Color;
            border-right: $lineWidth solid $firstLineColor;
            box-shadow: none;
            position: relative;
            &:before {
              background: $firstBarBgColorForTeamRight;
              border-right: 2 * $lineWidth solid $firstLineColor;
            }
            &::after {
              position: absolute;
              content: url("./finalAssets/小东西.png");
              bottom: 0;
              width: 44px;
              height: 35px;
              left: 40px;
            }
          }
        }
        // 2-3
        &_body > div:nth-child(n + 2) {
          span:nth-child(1) {
            &:before {
              background-image: url("./finalAssets/银.png");
            }
          }
          span:nth-child(2) {
            color: $team23Color;
          }
          span:nth-child(3) {
            color: $win23Color;
          }
        }
        //456
        &_body > div:nth-child(n + 4) {
          span:nth-child(1) {
            &:before {
              background-image: url("./finalAssets/桐.png");
            }
          }
          span:nth-child(2) {
            color: $team456Color;
          }
          span:nth-child(3) {
            color: $win456Color;
          }
        }
        //78
        &_body > div:nth-child(n + 7) {
          span:nth-child(1) {
            &:before {
              background: none;
            }
          }
          span:nth-child(2) {
            color: $team78Color;
          }
          span:nth-child(3) {
            color: $win78Color;
          }
        }
      }
      &_bottom {
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        background-image: url("./finalAssets/框下110020.png");
        height: 20px;
        width: 1100px;
      }
    }
    &_right {
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      background-image: url("./finalAssets/框右700110.png");
      width: 110px;
      height: 700px;
      flex-grow: 0;
    }
  }
}
</style>

<script>
export default {
  data() {
    return {
      data: Array(8).fill({
        player: "",
        count: ""
      })
    };
  },
  methods: {
    async fetchRanks() {
      try {
        const r = await fetch(
          `http://${process.env.VUE_APP_API_ORIGIN}/api/tank/ranks/final`
        ).then(r => r.json());
        if (Array.isArray(r)) {
          this.data = r.slice(0, 8);
        }
      } catch (e) {
        console.error("error");
      }
    },
    ws() {
      const w = new WebSocket(
        `ws://${process.env.VUE_APP_API_ORIGIN}/api/tank/ws?mode=final`
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
  }
};
</script>
