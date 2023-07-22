<template>
  <div mt-4 h-55>
    <router-link class="link" to="/map">
      <div class="title"><span>游</span><span>荡</span></div>
      <div class="subtitle">Voyage</div>
      <div class="icon i-lucide:swords" />
    </router-link>

    <a
      v-for="key in Object.keys(ICONS)"
      :key="key"
      class="link"
      :href="PERSONAL.MENU[key as KEY]"
      target="_blank"
    >
      <div class="title">
        <span>{{ ICONS[key as KEY].title[0] }}</span>
        <span>{{ ICONS[key as KEY].title[1] }}</span>
      </div>
      <div class="subtitle">{{ ICONS[key as KEY].subtitle }}</div>
      <div class="icon" :class="ICONS[key as KEY].icon" />
    </a>
  </div>
</template>

<script lang="ts" setup>
import { PERSONAL } from "~/core/data";

const ICONS = {
  opensorce: {
    title: "开源",
    subtitle: "Github",
    icon: "i-iconoir:github-circle"
  },
  blog: {
    title: "博客",
    subtitle: "Blog",
    icon: "i-iconoir:planet-sat"
  },
  email: {
    title: "邮箱",
    subtitle: "Email",
    icon: "i-lucide:mail"
  }
};

type KEY = keyof typeof ICONS;
</script>

<style scoped>
.link {
  @apply inline-block h-full w-1/4 px-1.5 text-right text-white/80 border border-white/10 rounded duration-300 relative overflow-hidden;
}

.link .title {
  @apply mt-2.5;
}

.link .title span:first-child {
  @apply text-2xl;
}

.link .subtitle {
  @apply text-xs;
}

.link .icon {
  @apply absolute opacity-0 text-white/90 w-22 h-22 top-14 -right-22 duration-300;
}

.link:hover {
  @apply bg-active;
}

.link:hover .icon {
  @apply opacity-100 top-23 -right-8;
}
</style>
