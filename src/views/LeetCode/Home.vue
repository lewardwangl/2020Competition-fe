<template>
  <div class="wrapper">
    <section class="top-img">
      <div class="logo"></div>
      <div class="right-logo"></div>
    </section>
    <section class="progress-wrapper">
      <div class="progress-container">
        <div class="progress-steps">
          <div :class="`progress-step${active === 0 ? ' current' : ''}`">
            <div
              :class="active >= 0 ? 'progress-circle' : 'progress-ring'"
            ></div>
            <div class="progress-tips-wrapper">
              <div class="progress-tips-container">
                <div class="progress-tips-time">09-24</div>
                <div class="progress-tips-txt">大赛开始</div>
              </div>
            </div>
          </div>
          <div
            :class="
              `progress-line${active === 1 ? ' active-line' : ' default-line'}`
            "
          ></div>
          <div :class="`progress-step${active === 1 ? ' current' : ''}`">
            <div
              :class="active >= 1 ? 'progress-circle' : 'progress-ring'"
            ></div>
            <div class="progress-tips-wrapper">
              <div class="progress-tips-container">
                <div class="progress-tips-time">09-24 - 09-26</div>
                <div class="progress-tips-txt">A卷</div>
              </div>
            </div>
          </div>
          <div
            :class="
              `progress-line${active === 2 ? ' active-line' : ' default-line'}`
            "
          ></div>
          <div :class="`progress-step${active === 2 ? ' current' : ''}`">
            <div
              :class="active >= 2 ? 'progress-circle' : 'progress-ring'"
            ></div>
            <div class="progress-tips-wrapper">
              <div class="progress-tips-container">
                <div class="progress-tips-time">09-27 - 09-29</div>
                <div class="progress-tips-txt">B卷</div>
              </div>
            </div>
          </div>
          <div
            :class="
              `progress-line${active === 3 ? ' active-line' : ' default-line'}`
            "
          ></div>
          <div :class="`progress-step${active === 3 ? ' current' : ''}`">
            <div
              :class="active >= 3 ? 'progress-circle' : 'progress-ring'"
            ></div>
            <div class="progress-tips-wrapper">
              <div class="progress-tips-container">
                <div class="progress-tips-time">09-29</div>
                <div class="progress-tips-txt">大赛结束</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="rule-wrapper">
      <div class="rule-container">
        <div class="rule-card">
          <div class="rule-title">
            <div class="rule-title-cube"></div>
            <div class="rule-title-txt">活动简介</div>
            <div class="rule-title-cube"></div>
          </div>
          <div class="rule-content">
            <ol>
              <li>
                分AB两场，任选1场参与（重复参与只算最好成绩），每场20题，每场开放3天
              </li>
              <li>
                答对任一卷中1-6道题可获得对应分值奖金（如题目分值50分，答对可获得50元奖金；只计算最高的6道题得分，即最高可获得300元）
              </li>
              <li>9月24日至9月30日B1展示排名和奖金</li>
              <li>
                含4道SQL题目产品也可参与，编程题支持常见的大部分语言（如C、C++、JAVA、PYTHON、GO、js、c#、scala、PHP等）
              </li>
              <li>
                A卷（开放日期9.24-9.26）： 1-6道题可获得对应分值奖金（6题封顶）
              </li>
              <li>
                B卷（开放日期9.27-9.29）： 1-6道题可获得对应分值奖金（6题封顶）
              </li>
            </ol>
          </div>
        </div>
      </div>
    </section>
    <section class="rank-title">
      <div class="rank-title-cube"></div>
      <div class="rank-title-txt">一站到底，积分赢奖金</div>
      <div class="rank-title-cube"></div>
    </section>
    <Ranks />
  </div>
</template>

<script>
import LeetCodeRanks from "../../components/Ranks";

export default {
  components: {
    Ranks: LeetCodeRanks
  },
  data() {
    return {
      active: -1
    };
  },
  mounted() {
    const now = Date.now();
    const d0924 = new Date("2020-09-24 00:00:00").valueOf();
    const d0926 = new Date("2020-09-26 00:00:00").valueOf();
    const d0927 = new Date("2020-09-27 00:00:00").valueOf();
    const d0929 = new Date("2020-09-29 00:00:00").valueOf();
    if (now >= d0924 && now < d0926) {
      this.active = 0;
    } else if (now >= d0926 && now < d0927) {
      this.active = 1;
    } else if (now >= d0927 && now < d0929) {
      this.active = 2;
    } else if (now >= d0924) {
      this.active = 3;
    }
  }
};
</script>

<style lang="scss">
@keyframes animation-oepokb {
  0% {
    background-position-x: 0px;
  }
  100% {
    background-position-x: 12px;
  }
}

.wrapper {
  background-image: url(assets/wholebg2.png);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 0;
  overflow: hidden;
  padding-top: 90px;
}
.top-img {
  padding: 0;
  width: 100%;
  height: 600px;
  display: flex;
  .logo {
    background-image: url(assets/logo.png);
    background-size: contain;
    background-repeat: no-repeat;
    background-position-x: 100%;
    background-position-y: 100%;
    width: 50vw;
  }
  .right-logo {
    background-image: url(assets/pic.png);
    background-size: contain;
    background-repeat: no-repeat;
    background-position-x: 0;
    background-position-y: 100%;
    width: 50vw;
  }
}
.progress {
  &-wrapper {
    width: 100%;
    flex: 1 1 auto;
  }
  &-container {
    width: 100%;
    height: 96px;
    overflow-x: auto;
    overflow-y: hidden;
    transform: translate3d(0px, 0px, 0px);
    margin: 26px 0px 40px;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  &-steps {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    width: 994px;
    flex-wrap: nowrap;
    padding: 0px 40px;
    margin: 0px auto;
  }
  &-step {
    position: relative;
  }
  &-circle {
    width: 24px;
    height: 24px;
    border-radius: 100%;
    background: var(--light-primary-5-rgb);
  }
  &-ring {
    width: 24px;
    height: 24px;
    position: relative;
    border-radius: 100%;
    background: rgb(176, 158, 139);
    &::after {
      content: "";
      display: block;
      width: 12px;
      height: 12px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 100%;
      background: rgb(32, 32, 34);
    }
  }
  &-line {
    height: 2px;
    flex: 1 1 auto;
    animation: 1s linear 0s infinite normal none running animation-oepokb;
    background: repeating-linear-gradient(
      to right,
      transparent,
      transparent 4px,
      var(--light-primary-5-rgb) 4px,
      var(--light-primary-5-rgb) 12px
    );
  }
  &-tips {
    &-wrapper {
      position: absolute;
      left: 50%;
      bottom: 0px;
      transform: translate(-50%, 100%);
    }
    &-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 10px;
    }
    &-time {
      opacity: 0.5;
      color: rgba(var(--light-grey-0-rgb), 1);
      font-size: 22px;
      white-space: nowrap;
      font-family: FetteMittelschrift, sans-serif;
      margin: 1px;
    }
    &-txt {
      opacity: 0.5;
      color: rgba(var(--light-grey-0-rgb), 1);
      font-size: 16px;
      white-space: nowrap;
      margin: 1px;
      font-weight: bold;
    }
  }
}
.current {
  .progress {
    &-ring {
      background: var(--light-primary-5-rgb);
    }
    &-tips {
      &-time {
        opacity: 0.94;
        color: rgba(var(--light-grey-0-rgb), 1);
        font-size: 22px;
        white-space: nowrap;
        font-family: FetteMittelschrift, sans-serif;
        margin: 1px;
      }
      &-txt {
        opacity: 0.94;
        color: rgba(var(--light-grey-0-rgb), 1);
        font-size: 16px;
        white-space: nowrap;
        margin: 1px;
      }
    }
  }
}
.default-line {
  background: repeating-linear-gradient(
    to right,
    transparent,
    transparent 4px,
    rgb(176, 158, 139) 4px,
    rgb(176, 158, 139) 12px
  );
}
.rule {
  &-wrapper {
    max-width: 840px;
    width: 100%;
    position: relative;
    z-index: 0;
    margin: 0px auto;
    padding: 17px;
  }
  &-container {
    position: relative;
    z-index: 0;
    transform: translate3d(0px, 0px, 0px);
  }
  &-card {
    padding: 40px 20px 40px;
    background: rgba(47, 47, 48, 0.6);
    border-radius: 21px;
  }
  &-title {
    display: flex;
    align-items: center;
    justify-content: center;

    &-cube {
      width: 24px;
      height: 24px;
      background: url(assets/smalldot.png) 0% 0% / cover;
    }
    &-txt {
      font-size: 1.4rem;
      font-weight: bold;
      line-height: 30px;
      color: rgba(255, 161, 22, 1);
      margin: 0px 20px;
      padding: 0;
    }
  }
  &-content {
    font-size: 14px;
    line-height: 24px;
    color: rgba(var(--light-grey-0-rgb), 0.85);
    margin: 24px auto 0px;

    ol {
      list-style-position: inside;
      margin: 0px;
      padding: 0px;
      text-align: left;
    }
    li {
      display: list-item;
      text-align: -webkit-match-parent;
      font-weight: bold;
    }
  }
}
@media screen and (max-width: 900px) {
  .wrapper {
    padding-top: 40px;
  }
  .top-img {
    height: 200px;
  }
  .progress-steps {
    width: 700px;
  }
}
</style>
