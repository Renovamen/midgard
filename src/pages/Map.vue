<template>
  <div class="map">
    <router-link class="btn backhome" to="/">回城</router-link>

    <transition
      enter-active-class="animate__animated animate__faster animate__slideInUp"
      leave-active-class="animate__animated animate__faster animate__slideOutDown"
    >
      <Package class="v-package" v-show="opt.info" />
    </transition>

    <transition
      enter-active-class="animate__animated animate__faster animate__slideInDown"
      leave-active-class="animate__animated animate__faster animate__slideOutUp"
    >
      <HomeInfo class="right-info" v-show="opt.info" transition="bounce" />
    </transition>

    <div :class="['show-btn', opt.info ? 'opened' : 'closed']" @click="showInfo">
      <span class="arrow-left" v-if="opt.info"></span>
      <span class="arrow-right" v-else></span>
    </div>

    <transition
      enter-active-class="animate__animated animate__slideInRight"
      leave-active-class="animate__animated animate__slideOutRight"
    >
      <div class="tip" v-if="opt.tip">
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
        <div v-for="(line, x) in map.$data.mapData" :key="`line-${x}`">
          <MapBlock
            v-for="(block, y) in line"
            :key="`block-${y}`"
            :block="block"
            :map="map" 
            @autoMove="autoMove(block)" />
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import Astar from '../js/astar'
import HeroMoveEvent from '../js/map-hero-move'
import MapInit from '../js/map-init'
import MapBlock from '../components/MapBlock'
import HomeInfo from '../components/HomeInfo'

export default {
  components: {
    MapBlock,
    HomeInfo
  },
  data() {
    return {
      opt: {
        info: false,  // 信息栏, 装备栏
        tip: true  // 地图左上提示框
      },
      map: null,  // 地图数据对象
      moveEvent: null  // 单位移动事件监听,触发
    }
  },
  created() {
    this.map = new MapInit(this.$store.state.MapStore.mapList[0])
    // this.map = this.$store.state.MapStore.map
    this.moveEvent = new HeroMoveEvent(this.map, this)
    setTimeout(() => {
      this.$delete(this.opt, 'tip')
    }, 5000)
  },
  mounted() {
    this.autoPisition()
  },
  methods: {
    showInfo() {
      this.$set(this.opt, 'info', !this.opt.info)
    },
    autoPisition() {
      let $m = document.querySelector('.map'),
          $b = document.querySelector('.map-block'),
          Bx = $b.offsetWidth,
          By = $b.offsetHeight,
          hero = this.map.hero
      let { row, col } = this.map.$data
      let sty = document.querySelector('.map-data .map').style
      sty.left = ((($m.offsetWidth - Bx * row)/2) - (hero.y - (col - 1)/2) * Bx) + 'px'
      sty.top = ((($m.offsetHeight - By * col)/2) - (hero.x - (row - 1)/2) * By) + 'px'
    },
    autoMove(end) {
      this.moveEvent.autoMove(
        new Astar(this.map.$data, this.map.hero, end)
      )
    }
  },
  updated() {
    this.autoPisition()
  },
  destroyed() {
    this.moveEvent && this.moveEvent.stop()
  }
}

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
      color $bgColor
  .home-info
    position absolute
    background $bgColor
    border-radius 0px 0px 8px 0px
    z-index 2
  .package
    position absolute
    z-index 2
    background $bgColor
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
      content url('../assets/ui/left.svg')
    .arrow-right
      content url('../assets/ui/right.svg')
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
        background $chestColor
      .hero
        background $heroColor
      .map-dialog
        background $eventColor
  .map-data
    position relative
    height 500px
    overflow hidden
    background-color $stickColor
    .map
      line-height 0
      z-index 1
      position absolute
      width 800px
      height 800px
      transition 0.2s
      background-color $roadColor
</style>