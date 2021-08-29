<template>
  <div :style="bgColor()" @click="autoMove">
    <span :class="blockClass()"></span>
  </div>
</template>

<script lang="ts">
import * as _ from "lodash";
import { defineComponent } from "vue";
import CONSTANT from "../data/constant";

export default defineComponent({
  name: "MapBlock",
  props: ["block", "map"],
  emits: ["autoMove"],
  setup(props, ctx) {
    const autoMove = () => {
      ctx.emit("autoMove");
    };

    const bgColor = () => {
      const roadColor = "#c3944e";
      const stickColor = "#51963d";
      const type = props.block.block_type;
      const bt = CONSTANT.MAP_BLOCK_TYPE;

      let opt = {
        display: "inline-block",
        background: stickColor
      };

      if (type != bt.ROAD || type == bt.HERO || props.block.event) {
        opt.background = roadColor;
      }

      return opt;
    };

    const blockClass = () => {
      const block = props.block;
      const typeList = ["road", "hero", "stick", "end"];
      const stick = CONSTANT.MAP_BLOCK_TYPE.STICK;
      let classList = ["map-block"];

      classList.push(typeList[Number(block.block_type)] || "");

      block.event && classList.push(block.event.event_type);

      // 计算圆角
      // r-1 r-2 r-3 r-4
      const data = props.map.$data.mapData;
      const { x, y, block_type: type } = block;
      const relativePosition = [
        [-1, -1],
        [-1, 1],
        [1, -1],
        [1, 1]
      ];
      for (let i = 0; i < 4; i++) {
        let around = _.map(new Array(3), (v: any, k: any) => {
          let [up_x, up_y] = relativePosition[i];
          let [_x, _y] = [
            [x + up_x, y],
            [x, y + up_y],
            [x + up_x, y + up_y]
          ][k];
          if (data[_x] && data[_x][_y]) return data[_x][_y].block_type;
          else return stick;
        });
        if (type == stick) {
          _.every(around, (i) => i != stick) && classList.push(`r-${i + 1}`);
        } else {
          _.every(around.slice(0, 2), (i) => i == stick) &&
            classList.push(`r-${i + 1}`);
        }
      }

      return classList;
    };

    return {
      autoMove,
      bgColor,
      blockClass
    };
  }
});
</script>

<style scoped lang="stylus">
@require '../styles/palette.styl'

.map-block
  display inline-block
  width 40px
  height 40px
  vertical-align top
.road
  background-color $road-color
  &:hover
    box-shadow $hover-shadow
    cursor pointer
.stick
  background-color $stick-color
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
  background-color $event-color
  &::before
    content url('/map/info.svg')
.map-chest
  background-color $chest-color
  &::before
    content url('/map/chest.svg')
.hero
  background $hero-color
  &::before
    content url('/map/hero.svg')
.r-1
  border-top-left-radius 6px
.r-2
  border-top-right-radius 6px
.r-3
  border-bottom-left-radius 6px
.r-4
  border-bottom-right-radius 6px
</style>
