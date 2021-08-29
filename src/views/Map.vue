<template>
  <div class="map">
    <router-link class="btn backhome" to="/">回城</router-link>

    <transition
      enter-active-class="animate__animated animate__faster animate__slideInUp"
      leave-active-class="animate__animated animate__faster animate__slideOutDown"
    >
      <Package v-show="opt.info" class="v-package" />
    </transition>

    <transition
      enter-active-class="animate__animated animate__faster animate__slideInDown"
      leave-active-class="animate__animated animate__faster animate__slideOutUp"
    >
      <HomeInfo v-show="opt.info" class="right-info" transition="bounce" />
    </transition>

    <div
      :class="['show-btn', opt.info ? 'opened' : 'closed']"
      @click="togglePackage"
    >
      <span v-if="opt.info" class="arrow-left"></span>
      <span v-else class="arrow-right"></span>
    </div>

    <transition
      enter-active-class="animate__animated animate__slideInRight"
      leave-active-class="animate__animated animate__slideOutRight"
    >
      <div v-if="opt.tip" class="tip">
        <div class="map-name">{{ map.$opt.name }}</div>
        <div class="tip-blocklist">
          <span class="tip-block map-chest">包裹</span>
          <span class="tip-block map-dialog">事件</span>
          <span class="tip-block hero">你</span>
        </div>
      </div>
    </transition>

    <div class="map-data">
      <div class="map">
        <div v-for="(line, x) in map.$data.mapData" :key="`line-${String(x)}`">
          <MapBlock
            v-for="(block, y) in line"
            :key="`block-${String(y)}`"
            :block="block"
            :map="map"
            @autoMove="autoMove(block)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  watch,
  toRefs,
  onMounted,
  onUpdated,
  onUnmounted,
  getCurrentInstance
} from "vue";
import { useStore } from "vuex";
import MapBlock from "@/components/MapBlock.vue";
import HomeInfo from "@/components/HomeInfo.vue";
import Package from "@/components/Package.vue";
import Astar from "@/js/astar";
import HeroMoveEvent from "@/js/hero-move";
import InitMap from "@/js/init-map";

export default defineComponent({
  name: "Map",
  components: {
    MapBlock,
    HomeInfo,
    Package
  },
  setup() {
    const store = useStore();
    const instance = getCurrentInstance();

    const state = reactive({
      opt: {
        info: false,  // 信息栏, 装备栏
        tip: true  // 地图左上提示框
      },
      map: new InitMap(store.state.map.list[0])  // 地图数据对象
    });

    const moveEvent = new HeroMoveEvent(state.map);

    watch(
      () => store.state.map.UPDATE,
      () => {
        instance?.proxy?.$forceUpdate();
      }
    );

    const autoPosition = () => {
      const $m = document.querySelector(".map") as HTMLElement;
      const $b = document.querySelector(".map-block") as HTMLElement;
      const blockX = $b.offsetWidth;
      const blockY = $b.offsetHeight;
      const hero = state.map.hero;

      const { row, col } = state.map.$data;
      const sty = (document.querySelector(".map-data .map") as HTMLElement)
        .style;
      sty.left =
        ($m.offsetWidth - blockX * row) / 2 -
        (hero.y - (col - 1) / 2) * blockX +
        "px";
      sty.top =
        ($m.offsetHeight - blockY * col) / 2 -
        (hero.x - (row - 1) / 2) * blockY +
        "px";
    };

    const togglePackage = () => {
      state.opt.info = !state.opt.info;
    };

    const autoMove = (end: any) => {
      const _path = new Astar(state.map.$data, state.map.hero, end).init();
      moveEvent.autoMove(_path);
    };

    onMounted(() => {
      autoPosition();
    });

    onUpdated(() => {
      autoPosition();
    });

    onUnmounted(() => {
      moveEvent && moveEvent.stop();
    });

    setTimeout(() => {
      state.opt.tip = false;
    }, 5000);

    return {
      ...toRefs(state),
      togglePackage,
      autoMove
    };
  }
});
</script>

<style scoped lang="stylus">
@require '../styles/palette.styl'

.map
  position relative
  overflow hidden
  .backhome
    position absolute
    z-index 9
    left 746px
    top 446px
    border-radius 5px
    width 60px
    height 35px
    line-height 28px
    font-size 16px
    font-weight bold
    border-width 1px
    border-color white
    color white
    &:hover
      background-color white
      color $bg-color
  .home-info
    position absolute
    background $bg-color
    border-radius 0px 0px 8px 0px
    z-index 2
  .package
    position absolute
    z-index 2
    background $bg-color
    border-radius 0px 8px 0px 0px
    top 230px
  .show-btn
    background #9c9eaa
    position absolute
    z-index 2
    width 20px
    height 38px
    line-height 38px
    text-align right
    top 196px
    border-radius 0px 5px 5px 0px
    padding-right 4px
    transition width 0.6s
    cursor pointer
    color white
    &.opened
      width 40px
      transition 0.4s
      border-radius 0px 5px 5px 0px
    .arrow-left, .arrow-right
      position absolute
      width 16px
      height 16px
      right 0
      margin-right -1px
      top 50%
      margin-top -8px
    .arrow-left
      content url('/ui/left.svg')
    .arrow-right
      content url('/ui/right.svg')
  .tip
    display inline-block
    color white
    position absolute
    top 0px
    right 0px
    z-index 10
    width 150px
    height 70px
    padding 6px
    border-bottom-left-radius 4px
    background rgba(0, 0, 0, 0.4)
    .map-name
      float right
      margin-right 0px
      width 30%
    .tip-blocklist
      float right
      margin-right 0px
      width 78%
      .tip-block
        display inline-block
        width 30px
        height 30px
        font-size 12px
        text-align center
        line-height 30px
        margin-top 6px
        border-radius 4px
      .map-chest
        background $chest-color
      .hero
        background $hero-color
      .map-dialog
        background $event-color
  .map-data
    position relative
    height 500px
    overflow hidden
    background-color $stick-color
    .map
      line-height 0
      z-index 1
      position absolute
      width 800px
      height 800px
      transition 0.2s
      background-color $road-color
</style>
