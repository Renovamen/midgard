<template>
  <div class="home">
    <div class="left">
      <home-info></home-info>
      <home-menu></home-menu>
    </div>
    <div class="right">
      <package></package>
    </div>
  </div>
</template>

<script>
import Menu from './home-menu.vue'
import Info from './home-info.vue'
export default {
  components :{
    'home-menu' : Menu,
    'home-info' : Info
  },
  created() {
    // 实例创建完毕, 获取战斗信息;
    this.hero = this.$store.state.HeroStore.hero;
  },
  watch: {
     '$store.state.UPDATE' : function(){
       this.$forceUpdate();
     }
  },
}

</script>

<style scoped lang="less">
  .home {
    word-spacing:-4px;
    display: table;
    padding-left: 20px;
    background:#47485c;
    .left {
      margin-top: 4px;
      display: inline-block;
      width: 276px;
      overflow: hidden;
      vertical-align: top;
    }
    .right {
      margin-top: 4px;
      user-select :none;
      display: inline-block;
      vertical-align: top;
      width: 524px;
    }
  }
</style>
