<template>
  <div @click="autoMove" :style="bgColor()">
    <span :class="blockClass()"></span>
  </div>
</template>

<script>
import CONSTANT from '../data/constant'
export default {
  props: [
    'block',
    'map'
  ],
  methods: {
    autoMove() {
      this.$emit('autoMove')
    },
    bgColor() {
      let roadColor = "#c3944e", stickColor = "#51963d"
      let type = this.block.block_type, bt = CONSTANT.MAP_BLOCK_TYPE
      let opt = { 
        display: 'inline-block',
        background: stickColor
      }
      if(type != bt.ROAD || type == bt.HERO || this.block.event) {
        opt.background = roadColor
      }
      return opt
    },
    blockClass() {
      let block = this.block
      let typeList = ['road', 'hero', 'stick', 'end']
      let classList = ['map-block']
      let stick = CONSTANT.MAP_BLOCK_TYPE.STICK

      classList.push(typeList[Number(block.block_type)] || '')

      block.event && classList.push(block.event.event_type)

      // 计算圆角
      // r-1 r-2 r-3 r-4
      let data = this.map.$data.mapData
      let {x, y, block_type:type } = block
      let relativePosition = [[-1, -1], [-1, 1], [1, -1], [1, 1]]
      for(let i = 0; i < 4; i++) {
        let around = _.map(new Array(3), (v,k) => {
          let [up_x,up_y] = relativePosition[i]
          let [_x, _y] = [ [x + up_x, y], [x, y + up_y], [x + up_x, y + up_y] ][k]
          if(data[_x] && data[_x][_y]) return data[_x][_y].block_type
          else return stick
        })
        if(type == stick) {
          _.every(around, i => i != stick) && classList.push(`r-${i+1}`)
        }
        else {
          _.every(around.slice(0,2), i => i == stick) && classList.push(`r-${i+1}`)
        }
      }
      return classList
    }
  }
}
</script>

<style scoped lang="stylus">
@require '../styles/palette.styl'
.map-block
  display inline-block
  width 40px
  height 40px
  vertical-align top
.road
  background-color $roadColor
  &:hover
    box-shadow $hoverShadow
    cursor pointer
.stick
  background-color $stickColor
.map-dialog, .map-chest, .hero
  border-radius 4px
  position relative
  &::before
    color #fff
    position absolute
    width 26px
    height 26px
    top 50%
    left 50%
    margin-top -13px
    margin-left -13px
.map-dialog
  background-color $eventColor
  &::before
    content url('../assets/world/info.svg')
.map-chest
  background-color $chestColor
  &::before
    content url('../assets/world/chest.svg')
.hero
  background $heroColor
  &::before
    content url('../assets/world/hero.svg')
.r-1
  border-top-left-radius 6px
.r-2
  border-top-right-radius 6px
.r-3
  border-bottom-left-radius 6px
.r-4
  border-bottom-right-radius 6px
</style>