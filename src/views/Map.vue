<template>
  <div class="map">map</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Map"
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
