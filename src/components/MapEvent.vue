<template>
  <div v-show="isShow" class="mask">
    <transition enter-active-class="animate__animated animate__faster animate__zoomIn">
      <div
        v-if="isShow"
        class="relative flex flex-col h-50 w-75 bg-slate-100 rounded shadow-md p-2.5"
      >
        <button
          class="i-ic:round-close absolute top-4.5 right-4 text-sm bg-gray-600 duration-200 cursor-pointer hover:(bg-gray-800 rotate-90)"
          @click="close"
        />

        <div v-if="dialog" class="bg-amber-200/60 rounded mb-1" p="l-1.5 r-6 y-1">
          {{ dialog }}
        </div>

        <div
          v-if="!isEnd"
          class="bg-gray-300/80 rounded px-1.5 py-1 mb-1"
          v-html="itemDataHTML"
        />

        <div class="flex-1 flex items-end justify-end">
          <div v-if="!isEnd" space-x-1>
            <button class="action bg-blue-400/50" @click="agree">同意</button>
            <button class="action bg-rose-200" @click="reject">拒绝</button>
          </div>
          <button v-else class="action bg-gray-300/80" @click="close">结束</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { ITEM_LEVELS, getDataById } from "~/core/data";
import type { MapEventStateItem, MapEvent, GameItem, GameItemOperation } from "~/types";

const props = defineProps<{
  eventItem: MapEventStateItem | false;
}>();
const event = computed(() => (props.eventItem ? props.eventItem.event : undefined));
const callback = computed(() => (props.eventItem ? props.eventItem.callback : undefined));

const dialogId = ref<keyof MapEvent["text"]>("init");
const dialog = computed(() => event.value?.text[dialogId.value]);

const isShow = ref(false);
const isEnd = ref(false); // 对话是否已结束

// 物品显示
const itemLevelColor = (itemId: number) => {
  const item = getDataById(itemId) as GameItem;
  return ITEM_LEVELS[item.grade || 0];
};

const itemName = (itemId: number) => {
  const item = getDataById(itemId) as GameItem;
  return item.name;
};

const itemDataHTML = computed(() => {
  const transform = (data: Array<GameItemOperation>) =>
    data
      .map(
        (i) =>
          `<span style="color: ${itemLevelColor(i.itemId)}">
            ${itemName(i.itemId)}
          </span>
          *
          <span>${i.num}</span>`
      )
      .join("");

  let html = event.value?.text.data || "";

  if (event.value?.need) html = html.replace(/{need}/g, transform(event.value.need));
  if (event.value?.get) html = html.replace(/{get}/g, transform(event.value.get));

  return html;
});

// 监听事件是否触发
watch(props, () => {
  if (!props.eventItem) return;

  dialogId.value = "init";
  isShow.value = true;
  isEnd.value = false;
});

// 玩家操作及判定
const { getItems, costItems, hasEnoughItems } = useHeroStore();

const agree = () => {
  if (event.value?.need) {
    if (hasEnoughItems(event.value.need)) costItems(event.value?.need);
    else dialogId.value = "noEnoughForExchange";
  }

  if (dialogId.value !== "noEnoughForExchange" && event.value?.get) {
    if (getItems(event.value.get).length) dialogId.value = "noEnoughRoom";
    else dialogId.value = "success";
  }

  isEnd.value = true;
};

const reject = () => {
  dialogId.value = "reject";
  isEnd.value = true;
};

// 关闭对话窗口
const { setEvent } = useEventStore();

const close = () => {
  if (callback.value) callback.value();

  isShow.value = false;
  setEvent(event.value!.type, false);
};
</script>
