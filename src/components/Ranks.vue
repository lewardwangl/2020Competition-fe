<template>
  <section class="rank">
    <div class="rank-top">
      <div class="rank-top-2">
        <div class="rank-top-2-icon"></div>
        <div class="rank-top-score">{{ top2score }}</div>
        <div class="rank-top-name">{{ top2name }}</div>
      </div>
      <div class="rank-top-1">
        <div class="rank-top-1-icon"></div>
        <div class="rank-top-score">{{ top1score }}</div>
        <div class="rank-top-name">{{ top1name }}</div>
      </div>
      <div class="rank-top-3">
        <div class="rank-top-3-icon"></div>
        <div class="rank-top-score">{{ top3score }}</div>
        <div class="rank-top-name">{{ top3name }}</div>
      </div>
    </div>
    <div class="rank-divider"></div>
    <div class="rank-list">
      <Table :columns="columns" :data="dataSource" class="rank-table"></Table>
      <Page
        :current="currentPage"
        :total="total"
        :page-size="pageSize"
        :show-total="false"
        :show-sizer="false"
        :show-elevator="false"
        class="rank-pager"
        @on-change="changePage"
      ></Page>
    </div>
  </section>
</template>

<script>
const isSmallScreen = window.screen.width < 900;

export default {
  name: "Ranks",
  props: {
    autoplay: {
      type: Boolean,
      required: false
    }
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      total: 0,
      columns: [
        {
          title: "排名",
          key: "rank",
          align: "center",
          width: isSmallScreen ? 60 : 80,
          render: (h, params) => {
            if (params.row.rank >= 1 && params.row.rank <= 3) {
              return h(
                "span",
                {
                  attrs: {
                    class: "rank-top3"
                  }
                },
                params.row.rank
              );
            } else {
              return h("span", params.row.rank);
            }
          }
        },
        {
          title: "姓名",
          key: "name",
          align: "center",
          ellipsis: true,
          render: (h, params) => {
            return h(
              "Tooltip",
              {
                props: { placement: "top", content: params.row.name }
              },
              params.row.name
            );
          }
        },
        !isSmallScreen && {
          title: "邮箱",
          key: "email",
          align: "center",
          ellipsis: true
        },
        {
          title: "总分",
          key: "score",
          width: isSmallScreen ? 60 : 80,
          align: "center"
        },
        {
          title: "场次",
          key: "bout",
          width: isSmallScreen ? 50 : 80,
          align: "center"
        },
        {
          title: "奖金",
          key: "bonus",
          width: isSmallScreen ? 60 : 80,
          align: "center"
        }
      ].filter(Boolean),
      datas: [],
      top1score: 0,
      top2score: 0,
      top3score: 0,
      top1name: "",
      top2name: "",
      top3name: ""
    };
  },
  mounted() {
    this.fetchData();
    if (this.autoplay) {
      this.timer = setInterval(() => {
        const pages = ((this.total / this.pageSize) | 0) + 1;
        this.currentPage = (this.currentPage % pages) + 1;
      }, 10000);
    }
  },
  destroyed() {
    this.timer && clearInterval(this.timer);
  },
  computed: {
    dataSource() {
      return (
        this.datas.slice(
          (this.currentPage - 1) * this.pageSize,
          this.currentPage * this.pageSize
        ) || []
      );
    }
  },
  methods: {
    changePage(current) {
      this.currentPage = current;
    },
    async fetchData() {
      try {
        const r = await fetch(
          `http://${process.env.VUE_APP_API_ORIGIN}/api/leetcode/ranks`
        );
        const data = await r.json();
        if (Array.isArray(data)) {
          this.datas = data
            .map(c => ({ ...c, rank: Number(c.rank) }))
            .sort((a, b) => a.rank - b.rank);
          if (this.datas[0]) {
            this.top1score = this.datas[0].score;
            this.top1name = this.datas[0].name;
          }
          if (this.datas[1]) {
            this.top2score = this.datas[1].score;
            this.top2name = this.datas[1].name;
          }
          if (this.datas[2]) {
            this.top3score = this.datas[2].score;
            this.top3name = this.datas[2].name;
          }
          this.total = data.length;
        }
      } catch (error) {
        this.datas = [];
        this.total = 0;
      }
    }
  }
};
</script>

<style lang="scss">
.rank {
  max-width: 840px;
  width: 100%;
  margin: 0 auto;
  padding: 17px;

  box-shadow: 0 3px 8px rgba(var(--light-grey-9-rgb), 0.3);
  position: relative;
  text-align: center;
  overflow: hidden;
  border-radius: 16px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;

  &-title {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    margin: 80px auto 40px;

    &-cube {
      width: 24px;
      height: 24px;
      background: url(../views/LeetCode/assets/smalldot.png) 0% 0% / cover;
    }
    &-txt {
      font-size: 1.4rem;
      line-height: 40px;
      font-weight: 500;
      color: rgba(255, 161, 22, 1);
      margin: 0px 20px;
    }
  }
  &-top {
    padding-top: 35px;
    padding-bottom: 10px;
    display: flex;
    justify-content: space-evenly;
    align-items: flex-end;
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    background: linear-gradient(
      to bottom,
      rgba(var(--primary-1-rgb), 0.1),
      rgba(var(--primary-1-rgb), 0.1) 25%,
      rgba(var(--primary-5-rgb), 0.3) 70%,
      rgba(var(--primary-5-rgb), 0.5)
    );
    &-1,
    &-2,
    &-3 {
      position: relative;
      width: 194px;
      height: 200px;
      border-top-left-radius: 12px;
      border-top-right-radius: 12px;
      background-repeat: no-repeat;
      background-size: contain;
      &::before {
        content: "";
        display: block;
        position: absolute;
        width: 50px;
        height: 50px;
        top: -32px;
        left: 50%;
        transform: translateX(-50%);
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;
      }
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      align-items: center;
      & > .rank-top-name {
        overflow: hidden;
        text-overflow: ellipsis;
        height: 50px;
        width: 130px;
        font-size: 20px;
        line-height: 50px;
        margin-bottom: 18px;
        font-weight: bold;
        color: #cccc99;
      }
      & > .rank-top-score {
        height: 66px;
        padding-top: 8px;
        font-weight: bold;
        font-size: 30px;
        color: #7a5820;
        display: flex;
        align-items: center;
      }
    }
    &-1 {
      height: 218px;
      background-image: url(../views/LeetCode/assets/top-1-big.png);
      &::before {
        background-image: url("../views/LeetCode/assets/crown1.png");
      }
      & > .rank-top-name {
        height: 68px;
      }
    }
    &-2 {
      background-image: url(../views/LeetCode/assets/top-2-big.png);
    }
    &-3 {
      background-image: url(../views/LeetCode/assets/top-3-big.png);
    }
    &-2::before {
      background-image: url("../views/LeetCode/assets/crown2.png");
    }
    &-3::before {
      background-image: url("../views/LeetCode/assets/crown3.png");
    }
  }
  &-divider {
    width: 100%;
    height: 4px;
    background: rgba(var(--brand-orange-rgb), 1);
  }
  &-list {
    padding-bottom: 20px;
    // background: rgb(54, 54, 55);
    background: rgba(47, 47, 48, 0.6);
  }
  &-table {
    font-size: 14px;
    line-height: 20px;
    color: rgba(var(--light-grey-0-rgb), 0.7);
    //padding: 0px 40px;
    .ivu-table-overflowX {
      overflow: visible;
    }
    .ivu-tooltip {
      width: 100%;
    }
    .ivu-tooltip-rel {
      width: 100%;
      word-break: keep-all;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      vertical-align: middle;
    }
    .ivu-tooltip-inner {
      background-color: rgba(0, 0, 0, 0.8);
      white-space: initial;
      word-break: initial;
    }
    .ivu-tooltip-popper[x-placement^="top"] .ivu-tooltip-arrow {
      border-top-color: rgba(0, 0, 0, 0.8);
    }
    .ivu-tooltip-popper[x-placement^="bottom"] .ivu-tooltip-arrow {
      border-top-color: rgba(0, 0, 0, 0.8);
    }
    .ivu-tooltip-arrow {
      border-top-color: rgba(0, 0, 0, 0.8);
    }
  }
  &-top3 {
    font-family: TypoRound;
    font-size: 26px;
    font-style: italic;
    vertical-align: bottom;
    color: rgba(var(--brand-orange-rgb), 1);
  }
  &-members {
    display: inline-flex;
    align-items: center;
    margin-left: 8px;
    flex-direction: row-reverse;

    &-item {
      display: inline-block;
      position: relative;
      margin-left: -8px;
      padding: 2px;
      text-decoration: none;
    }
    &-img {
      height: 24px;
      width: 24px;
      object-fit: cover;
      display: inline-block;
      border-radius: 50%;
    }
  }
  &-pager {
    float: none;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 24px auto 0;
  }
  .ivu-table {
    background: transparent;
    color: rgba(var(--light-grey-0-rgb), 0.7);
    font-weight: 600;
  }
  .ivu-table:before {
    background-color: transparent;
  }
  .ivu-table td {
    background: transparent;
    border-bottom: 1px solid #555;
  }
  .ivu-table th {
    background: transparent;
    font-weight: bold;
    border-bottom: none;
  }
  .ivu-table td,
  .ivu-table th {
    height: 48px;
  }
  .ivu-table-cell {
    padding: 8px 4px;
    overflow: visible;
  }
  .ivu-page-prev,
  .ivu-page-item,
  .ivu-page-next {
    min-width: 24px;
    width: 24px;
    max-width: 24px;
    height: 24px;
    color: rgba(var(--light-grey-0-rgb), 0.7);
    font-size: 12px;
    line-height: 24px;
    background: transparent;
    border-radius: 3px;
    border: 1px solid #555; // rgba(38,50,56,0.2);
    a {
      display: block;
      height: 100%;
      color: rgba(var(--light-grey-0-rgb), 0.7);
    }
    .ivu-icon {
      vertical-align: baseline;
    }
  }
  .ivu-page-item-active {
    border-color: #555; // rgba(38,50,56,0.2);
    background: #555;
  }
  .ivu-page-item-active a {
    color: rgba(var(--light-grey-0-rgb), 0.7);
  }
}
@media screen and (max-width: 900px) {
  .rank-top {
    padding-top: 25px;
    padding-bottom: 5px;
  }
  .rank-top-2,
  .rank-top-3 {
    height: 100px;
    width: 97px;
  }
  .rank-top-1 {
    height: 110px;
    width: 97px;
    background-image: url(../views/LeetCode/assets/top-1.png);
  }
  .rank-top-2 {
    background-image: url(../views/LeetCode/assets/top-2.png);
  }
  .rank-top-3 {
    background-image: url(../views/LeetCode/assets/top-3.png);
  }
  .rank-top-1,
  .rank-top-2,
  .rank-top-3 {
    &::before {
      width: 25px;
      height: 25px;
      top: -17px;
    }
    & > .rank-top-name {
      padding-left: 2px;

      overflow: hidden;
      text-overflow: ellipsis;
      height: 26px;
      width: 64px;
      font-size: 0.8rem;
      line-height: 26px;
      margin-bottom: 8px;
      font-weight: bold;
    }
    & > .rank-top-score {
      // line-height: 30px;
      font-weight: bold;
      font-size: 1rem;
      height: 34px;
    }
  }
  .rank-top-1 > .rank-top-name {
    height: 30px;
  }
}
</style>
