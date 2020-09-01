import Vue from "vue";
import VueRouter from "vue-router";
import ViewUI from "view-design";
import "view-design/dist/styles/iview.css";

import App from "./App.vue";
// leetcode
import LeetCode from "./views/LeetCode";
import LeetCodeHome from "./views/LeetCode/Home.vue";
import LeetCodeRanks from "./views/LeetCode/Ranks";
// tank
import Tank from "./views/Tank";
import TankWheelWar from "./views/Tank/WheelWar";
import TankFinal from "./views/Tank/Final";

Vue.use(VueRouter);
Vue.use(ViewUI);

const routes = [
  {
    path: "/tank",
    name: "WheelWar",
    component: Tank,
    children: [
      {
        path: "wheel_war",
        name: "WheelWar",
        component: TankWheelWar
      },
      {
        path: "final",
        name: "Final",
        component: TankFinal
      }
    ]
  },
  {
    path: "/",
    name: "LeetCode",
    component: LeetCode,
    children: [
      {
        path: "",
        name: "Home",
        component: LeetCodeHome
      },
      {
        path: "/ranks",
        name: "LeetCodeRanks",
        component: LeetCodeRanks
      }
    ]
  }
];

Vue.config.productionTip = false;
new Vue({
  router: new VueRouter({
    mode: "history",
    routes
  }),
  render: h => h(App)
}).$mount("#app");
