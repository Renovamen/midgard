<template>
  <div
    v-item-tip="item"
    v-drag-drop="{ type, index }"
    class="relative size-11 bg-item inline-block align-top text-white cursor-pointer rounded-sm overflow-hidden hover:shadow-inbox"
  >
    <template v-if="item">
      <div class="name" :style="{ color: ITEM_LEVELS[item.grade || 0] }">
        {{ item.name }}
      </div>

      <div v-if="item.equipType !== undefined && item.equipType > -1" class="badge">
        {{ EQUIP_NAMES[item.equipType] }}
      </div>
      <div v-else-if="item.num" class="badge">
        {{ item.num }}
      </div>
    </template>

    <template v-else>
      <slot name="item-name">
        <div class="name">
          {{ type === "resumes" ? EQUIP_NAMES[index] : "" }}
        </div>
      </slot>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { EQUIP_NAMES, ITEM_LEVELS } from "~/core/data";
import vItemTip from "~/directive/item-tip";
import vDragDrop from "~/directive/drag-drop";
import type { GameItem, ItemKey } from "~/types";

defineProps<{
  item?: GameItem;
  type: ItemKey;
  index: number;
}>();
</script>

<style scoped>
.name,
.badge {
  @apply scale-75 text-xs text-center;
}

.name {
  @apply h-8 -mt-0.5 tracking-widest;
}

.badge {
  @apply origin-top h-3 border-t border-gray-400 text-emerald-300;
}
</style>
