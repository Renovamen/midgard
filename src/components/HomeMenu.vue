<template>
  <div class="home-menu">
    <div class="link" @click="goToMap()">
      <div class="title text-center"><span>游</span>荡</div>
      <div class="e-title">Voyage</div>
      <img src="/ui/fight.svg" />
    </div>

    <template v-for="(item, index) in menu" :key="`menu-item-${index}`">
      <a class="link" :href="item[2]" target="_blank">
        <div class="title text-center">
          <span>{{ item[0][0] }}</span
          >{{ item[0][1] }}
        </div>
        <div class="e-title">
          {{ item[1] }}
        </div>
        <img :src="item[3]" />
      </a>
    </template>
  </div>
</template>

<script lang="ts" setup>
import * as _ from "lodash";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { setStoreState } from "@/store/utils";
import InitMap from "@/js/init-map";
import { MapType } from "@/types";

const store = useStore();
const router = useRouter();

const menu = [
  ["咸鱼", "Github", "https://github.com/Renovamen", "/ui/github.svg"],
  ["博客", "Blog", "https://zxh.io", "/ui/blog.svg"],
  ["邮箱", "Email", "mailto:renovamenzxh@gmail.com", "/ui/email.svg"]
];

const mapList = () => {
  // --------- 随机生成包裹 ---------
  const chestList = [];

  for (let i = 1; i <= 10; i++) {
    // 包裹中物品种类
    const itemID = Math.ceil(Math.random() * 14);
    // 包裹中物品等级 R: 50%, SR: 30%, SSR:15%, UR: 5%
    const levelID = Math.ceil(Math.random() * 100);

    let level = 0;

    if (levelID <= 50) level = 0;
    else if (levelID > 50 && levelID <= 80) level = 1;
    else if (levelID > 80 && levelID <= 95) level = 2;
    else level = 3;

    const chestID = 5000000 + level * 14 + itemID;
    chestList.push(chestID);
  }

  // --------- 随机生成事件 ---------
  const eventList = [];

  for (let i = 1; i <= 3; i++)
    eventList.push(7000000 + Math.ceil(Math.random() * 10));

  // --------- 地图数据 ---------
  const mapTable: MapType[] = [
    {
      id: 8000001,
      name: "世界",
      mapInitOption: {
        row: 20,
        col: 20,
        lines: 10, // 分支量
        inflex: 0.5 // 曲折度
      },
      chestList: chestList,
      eventList: eventList, // 事件
      rule: {} // 生成规则
    }
  ];

  setStoreState("map", "list", _.cloneDeep(mapTable));
  return store.state.map.list;
};

const goToMap = () => {
  const map = mapList()[0];
  setStoreState("map", "map", new InitMap(map));
  router.push("/map");
};
</script>

<style scoped lang="stylus">
@require '../styles/palette.styl'

.home-menu
  margin-top -16px
  word-spacing:-4px
  display table
  width 100%
  height 220px
  .link
    text-decoration none
    position relative
    vertical-align top
    display inline-block
    color rgb(207, 210, 218)
    padding-right 6px
    overflow hidden
    border 1px solid #535664
    border-radius 5px
    height 100%
    width 25%
    transition 0.2s
    .title
      margin-top 10px
      text-align right
      span:first-child
        font-size 24px
    .e-title
      font-size 10px
      text-align right
    img
      opacity 0
      position absolute
      width 100px
      top 50px
      left 50px
      transition 0.2s
    &:hover
      text-decoration none
      background $primary-color
      color white
      transition 0.3s
      img
        opacity 1
        top 80px
        left 8px
        transition 0.3s
</style>
