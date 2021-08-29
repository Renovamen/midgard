<template>
  <div class="home">
    <div class="left">
      <HomeInfo />
      <HomeMenu />
    </div>
    <div class="right">
      <Package />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HomeInfo from "@/components/HomeInfo.vue";
import HomeMenu from "@/components/HomeMenu.vue";
import Package from "@/components/Package.vue";

export default defineComponent({
  name: "Home",
  components: {
    HomeInfo,
    HomeMenu,
    Package
  }
});
</script>

<style scoped lang="stylus">
@require "../styles/palette.styl"

.home
  word-spacing:-4px
  display table
  padding-left 20px
  background $bg-color
  .left
    margin-top 4px
    display inline-block
    width 276px
    overflow hidden
    vertical-align top
  .right
    margin-top 4px
    user-select :none
    display inline-block
    vertical-align top
    width 524px
</style>
