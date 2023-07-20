<template>
  <div
    id="router-view"
    class="m-auto"
    :style="{
      height: `${UI.HEIGHT}px`,
      width: `${UI.WIDTH}px`,
      marginTop: `${ui.margin}px`,
      transform: `scale(${ui.scale}) translateZ(1px)`
    }"
  >
    <router-view v-slot="{ Component }">
      <transition enter-active-class="animate__animated animate__fadeIn">
        <component :is="Component" />
      </transition>
    </router-view>

    <GameOverEvent />
  </div>
</template>

<script lang="ts" setup>
import { createGame } from "~/core";
import { UI } from "~/core/data";

// resize view
const ui = reactive({
  scale: 1,
  margin: 0
});

const setScale = () => {
  const curHeight = window.innerHeight - 10;

  ui.scale = curHeight / UI.HEIGHT;
  ui.margin = ((ui.scale - 1) * UI.HEIGHT) / 2 + 5;
};

window.onresize = setScale;
setScale();

// initialize hero state
createGame();
</script>
