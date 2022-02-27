<template>
  <div v-item-tip="item" v-drop-item="dropData" class="package-item">
    <div v-if="item" :style="{ color: gradeColor[item.grade || 0] }">
      <slot name="item-name">
        <span v-if="item.name" class="item-name">{{ item.name }}</span>
      </slot>
      <slot name="badges">
        <span v-if="item.num" class="badges">
          {{ item.num }}
        </span>
        <span v-if="item.equipType > -1" class="badges equip">
          {{ equipName[item.equipType] }}
        </span>
      </slot>
    </div>
    <div v-else class="blank">
      <slot name="item-name">
        <span class="item-name">
          {{ positionType === "$resumes" ? equipName[index] : "" }}
        </span>
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import { useStore } from "vuex";
import CONSTANT from "@/data/constant";
import vItemTip from "@/directive/item-tip";
import vDropItem from "@/directive/drop-item";

const props = defineProps(["item", "positionType", "positionIndex"]);

const store = useStore();

const index = ref(Number(props.positionIndex));
const dropData = reactive({
  hero: store.state.hero,
  posType: props.positionType,
  posIndex: props.positionIndex
});

const equipName = CONSTANT.EQUIP_ID;
const gradeColor = CONSTANT.ITEM_LEVEL;
</script>

<style lang="stylus">
@require "../styles/palette.styl"

.package-item
  position relative
  background $bg-item-color
  display inline-block
  vertical-align top
  width 44px
  height 44px
  color white
  border-radius 2px
  overflow hidden
  cursor pointer
  &:hover
    box-shadow $hover-shadow
  .badges
    position absolute
    width 38px
    margin 0px 3px
    border-top 1px solid rgba(255, 255, 255, 0.5)
    height 16px
    line-height 16px
    text-align center
    left -1px
    top 27px
    padding 0px 2px
    font-size 12px
    transform scale(0.75)
    color aquamarine
  .item-name
    display inline-block
    transform scale(0.75)
    letter-spacing 2px
    font-size 10px
    cursor pointer
    text-align center
    width 100%
</style>
