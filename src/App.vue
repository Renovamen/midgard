<template>
  <div class="container">
    <div
      id="router-view"
      class="router-view"
      :style="{
        marginTop: `${margin}px`,
        transform: `scale(${scale}) translateZ(1px)`
      }"
    >
      <router-view v-slot="{ Component }">
        <transition enter-active-class="animate__animated animate__fadeIn">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import createGame from "@/js/create-game";

export default defineComponent({
  name: "App",
  setup() {
    const state = reactive({
      scale: 1,
      margin: 0
    });

    const setPosition = () => {
      const curHeight = window.innerHeight - 10;
      const height = 500;
      state.scale = curHeight / height;
      state.margin = ((state.scale - 1) * height) / 2 + 5;
    };

    window.onresize = () => {
      setPosition();
    };
    setPosition();

    createGame(); // initialize hero state

    return { ...toRefs(state) };
  }
});
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
