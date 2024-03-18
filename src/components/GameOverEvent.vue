<template>
  <div v-show="isShow" class="mask">
    <transition enter-active-class="animate__animated animate__faster animate__zoomIn">
      <div v-if="isShow" class="w-70 p-3 rounded bg-slate-100" shadow="md black/30">
        <p>你失去了梦想，已经是一条咸鱼了。</p>
        <button class="action bg-slate-300 float-right mt-5" @click="restart">
          重新开始
        </button>
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
const isShow = ref(false);

// game over if hp <= 0
const heroStore = useHeroStore();

watch(
  () => heroStore.hp,
  () => heroStore.hp <= 0 && (isShow.value = true)
);

const restart = () => {
  isShow.value = false;
  location.reload();
};
</script>
