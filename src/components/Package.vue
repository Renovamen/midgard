<template>
  <div flex flex-col space-y-2>
    <div class="w-full flex items-end justify-between pr-1.5">
      <div class="bg-label h-11 w-15 leading-11 rounded-sm" text="white center">背包</div>
      <div hstack space-x-1.5>
        <button
          class="btn w-11 h-7.5 border-label hover:bg-label text-xs"
          @click="sortItemsInPackage"
        >
          整理
        </button>
        <PackageItem
          class="!h-7.5 !bg-trash text-center text-sm/7.5"
          type="destory"
          :index="-1"
        >
          <template #item-name>
            <div i-mdi:recycle />
          </template>
        </PackageItem>
      </div>
    </div>

    <div overflow-scroll grid="~ cols-10 gap-y-1">
      <PackageItem
        v-for="(item, index) in hero.package"
        :key="index"
        :item="item"
        :index="index"
        type="package"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { hero, sortItemsInPackage } = useHeroStore();
</script>
