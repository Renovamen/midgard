<template>
  <div class="home">
    <div class="left">
      <HomeInfo />
      <HomeMenu />
    </div>
    <div class="right">
      <Package />
    </div>
  </div>
</template>

<script>
import HomeMenu from '../components/HomeMenu'
import HomeInfo from '../components/HomeInfo'

export default {
  components: {
    HomeMenu,
    HomeInfo
  },
  created() {
    // 获取角色信息
    this.hero = this.$store.state.HeroStore.hero
  },
  watch: {
    '$store.state.UPDATE': function() {
      this.$forceUpdate()
    }
  }
}
</script>

<style scoped lang="stylus">
@require '../styles/palette.styl'
.home
  word-spacing:-4px
  display table
  padding-left 20px
  background $bgColor
  .left
    margin-top 4px
    display inline-block
    width 276px
    overflow hidden
    vertical-align top
  .right
    margin-top 4px
    user-select :none
    display inline-block
    vertical-align top
    width 524px
</style>