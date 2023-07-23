<template>
  <div :class="outerColor" @click="$emit('autoMove')">
    <div
      class="map-block text-white text-lg flex-center"
      :class="innerClasses"
      :style="{ width: `${UI.BLOCK_SIZE}px`, height: `${UI.BLOCK_SIZE}px` }"
    >
      <span v-if="innerClasses.includes('hero')" i-ic:baseline-catching-pokemon />
      <span v-else-if="innerClasses.includes(CHEST_TYPE)" i-mdi:treasure-chest-outline />
      <span v-else-if="innerClasses.includes(DIALOG_TYPE)" i-typcn:info-large-outline />
    </div>
  </div>
</template>

<script lang="ts" setup>
import * as _ from "lodash";
import { BLOCK_TYPES, CHEST_TYPE, DIALOG_TYPE, UI } from "~/core/data";
import type { MapBlock } from "~/types";

const props = defineProps<{
  block: MapBlock;
  map: Array<Array<MapBlock>>;
}>();
defineEmits(["autoMove"]);

const STICK = BLOCK_TYPES.STICK;

const blockName = computed(() =>
  Object.keys(BLOCK_TYPES)
    .find((k) => BLOCK_TYPES[k as keyof typeof BLOCK_TYPES] === props.block.type)
    ?.toLowerCase()
);

const outerColor = computed(() => {
  const { event, type } = props.block;
  return type != BLOCK_TYPES.ROAD || event ? "bg-road" : "bg-stick";
});

const innerClasses = computed(() => {
  const { x, y, type, event } = props.block;
  const classes = [blockName.value, event?.type || ""];

  // 计算圆角
  const directions = {
    tl: [-1, -1],
    tr: [-1, 1],
    bl: [1, -1],
    br: [1, 1]
  };

  for (const d in directions) {
    const around = _.map(new Array(3), (_, k: number) => {
      const [dx, dy] = directions[d as keyof typeof directions];
      const [toX, toY] = [
        [x + dx, y],
        [x, y + dy],
        [x + dx, y + dy]
      ][k];

      if (props.map[toX] && props.map[toX][toY]) return props.map[toX][toY].type;
      else return STICK;
    });

    if (type == STICK) around.every((i) => i != STICK) && classes.push(`r-${d}`);
    else around.slice(0, 2).every((i) => i === STICK) && classes.push(`r-${d}`);
  }

  return classes;
});
</script>

<style scoped>
.r-tl {
  @apply rounded-tl;
}

.r-bl {
  @apply rounded-bl;
}

.r-tr {
  @apply rounded-tr;
}

.r-br {
  @apply rounded-br;
}

.road {
  @apply bg-road cursor-pointer hover:shadow-inbox;
}

.stick {
  @apply bg-stick;
}

.dialog,
.chest,
.hero {
  @apply rounded;
}

.dialog {
  @apply bg-event;
}

.chest {
  @apply bg-chest;
}

.hero {
  @apply bg-hero;
}
</style>
