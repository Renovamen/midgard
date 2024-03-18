<template>
  <div class="h-full relative overflow-hidden bg-stick">
    <router-link
      class="btn z-10 w-15 py-1 hover:(bg-white text-slate-700)"
      pos="absolute bottom-4 right-4"
      border="white rounded"
      to="/"
    >
      回城
    </router-link>

    <transition
      enter-active-class="animate__animated animate__faster animate__slideInUp"
      leave-active-class="animate__animated animate__faster animate__slideOutDown"
    >
      <Package
        v-show="isPackageOpen"
        class="hero-info bottom-0 h-[270px] pt-2 pb-1 rounded-tr"
      />
    </transition>

    <transition
      enter-active-class="animate__animated animate__faster animate__slideInDown"
      leave-active-class="animate__animated animate__faster animate__slideOutUp"
    >
      <HomeInfo
        v-show="isPackageOpen"
        transition="bounce"
        class="hero-info flex items-start space-x-6 pt-1 rounded-br"
      />
    </transition>

    <div
      class="z-20 w-10 py-1 bg-gray-400 duration-500 cursor-pointer"
      text="white right"
      border="y r gray-300/50 rounded-r"
      pos="absolute top-[199px]"
      :class="[isPackageOpen ? 'left-0' : '-left-5']"
      @click="isPackageOpen = !isPackageOpen"
    >
      <span v-if="isPackageOpen" i-ic:round-arrow-left />
      <span v-else i-ic:round-arrow-right />
    </div>

    <transition
      enter-active-class="animate__animated animate__slideInRight"
      leave-active-class="animate__animated animate__slideOutRight"
    >
      <div
        v-if="isTipShow"
        class="z-10 w-38 p-2 bg-black/40 rounded-bl"
        pos="absolute top-0 right-0"
        text="white right"
      >
        <div>{{ dungeon.name }}</div>
        <div class="hstack justify-end space-x-1 mt-1">
          <div class="tip-block bg-chest">包裹</div>
          <div class="tip-block bg-event">事件</div>
          <div class="tip-block bg-hero">你</div>
        </div>
      </div>
    </transition>

    <div ref="map" class="absolute duration-200 h-[800px] w-[800px]">
      <div
        v-for="(line, x) in dungeon.map.data"
        :key="`line-${x}`"
        class="flex leading-0"
      >
        <MapBlock
          v-for="(block, y) in line"
          :key="`block-${y}`"
          :block="block"
          :map="dungeon.map.data"
          @auto-move="autoMove(block)"
        />
      </div>
    </div>

    <MapEvent :event-item="eventStore.chest" />
    <MapEvent :event-item="eventStore.dialog" />
  </div>
</template>

<script lang="ts" setup>
import { Astar, HeroMove, Dungeon, GameMap } from "~/core";
import { UI } from "~/core/data";
import type { MapBlock as MapBlockType } from "~/types";

const isPackageOpen = ref(false); // 装备栏
const isTipShow = ref(true); // 地图左上提示框

setTimeout(() => (isTipShow.value = false), 5000);

// event store
const { event: eventStore } = useEventStore();

// generate dungeon data

const dungeon = ref(
  new Dungeon({
    id: 8000001,
    name: "世界"
  })
);

// update map view

const instance = getCurrentInstance();

watch(
  () => eventStore.mapUpdate,
  () => instance?.proxy?.$forceUpdate()
);

// center the view when entering the map

const map = ref<HTMLDivElement>();

const centerView = () => {
  if (!map.value) return;

  const { x, y } = dungeon.value.hero;
  const { row, col } = dungeon.value.map;

  map.value.style.left =
    (UI.WIDTH - UI.BLOCK_SIZE * row) / 2 - (y - (col - 1) / 2) * UI.BLOCK_SIZE + "px";
  map.value.style.top =
    (UI.HEIGHT - UI.BLOCK_SIZE * col) / 2 - (x - (row - 1) / 2) * UI.BLOCK_SIZE + "px";
};

onMounted(centerView);
onUpdated(centerView);

// hero movement

const heroMove = new HeroMove(dungeon.value as Dungeon);

const autoMove = (end: MapBlockType) => {
  const path = new Astar(dungeon.value.map as GameMap, dungeon.value.hero, end).find();
  heroMove.autoMove(path);
};

onUnmounted(heroMove.stop);
</script>

<style scoped>
.hero-info {
  @apply absolute z-10 w-[502px] pr-[2px] bg-background;
}

.tip-block {
  @apply h-8 w-8 flex-center border border-white/20 rounded text-xs;
}
</style>
