<template>
  <div class="container">
    <div
      class="router-view" id="router-view"
      :style="{
        'margin-top':`${margin}px`,
        'transform': `scale(${scale}) translateZ(1px)`
      }">
      <transition enter-active-class="animate__animated animate__fadeIn">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import CreateGame from "./js/create-game.js"

export default {
  data() {
    return {
      scale: 1,
      margin: 0,
    }
  },
  created() {
    window.onresize = () => {
      this.setPosition()
    }
    this.setPosition()
    CreateGame(false)
  },
  methods: {
    setPosition() {
      let height = window.innerHeight - 10
      let height_original = 500
      this.scale = height / height_original
      this.margin = (this.scale - 1) * height_original / 2 + 5
    }
  }
}
</script>

<style lang="stylus">
.container
  border-radius 2px
  transform-style preserve-3d
.router-view
  position relative
  height 500px
  width 830px
  margin auto
  background #252830
  border-radius 2px
  & > div
    position absolute
    height 100%
    width 100%
.item-tip-pover
  transform translateZ(99px)
</style>