<template>
  <div class="package shadow-box">
    <div class="info-list">
      <div class="label-name">背包</div>
      <PackageItem class="dustbin" position-index="$destory|0">
        <span slot="item-name" class="item-name"></span>
      </PackageItem>
      <div class="btn f-r sort" @click="sort">整理</div>
    </div>
    <div class="list">
      <template v-for="(item, index) in hero.$package">
        <PackageItem
          class="item"
          :key="`package-item-${index}`"
          :item="item"
          :position-index="'$package|' + index"
        />
      </template>
    </div>
  </div>
</template>

<script>

export default {
  computed: {
    hero() {
      return this.$store.state.HeroStore.hero
    }
  },
  watch: {
    '$store.state.UPDATE': function() {
      this.$forceUpdate()
    },
  },
  methods: {
    sort() {
      this.$store.state.HeroStore.hero.itemSort('$package')
    }
  }
}
</script>

<style scoped lang="stylus">
@require '../styles/palette.styl'
.package
  padding 5px
  height 100%
  width 520px
  .info-list
    padding 5px 8px
    font-size 10px
    .label-name
      height 40px
      line-height 40px
      width 60px
      background $bgLabelColor
      color white
      text-align center
      border-radius 2px
      font-size 16px
      margin-top -4px
      margin-bottom 4px
      display inline-block
    .sort
      float right
      margin-right 6px
      width 44px
      height 30px
      line-height 25px
      margin-top 6px
      border-color $bgLabelColor
      color white
      &:hover
        background-color $bgLabelColor
    .dustbin
      height 30px
      margin-top 6px
      float right
      background-color $delColor
      .blank
        line-height 36px
      span
        content url('../assets/ui/recycle.svg')
        position absolute
        width 20px
        height 20px
        top 50%
        left 50%
        margin-top -9px
        margin-left -10px
  .list
    height 40%
    overflow scroll
    padding-left 8px
    .item
      margin 0px 6px 4px 0px
</style>