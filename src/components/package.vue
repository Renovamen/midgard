<template>
  <div class="package shadow-box">
    <div class="block-name">
      背包
    </div>
    <div class="info-list">
      <component-item class="dustbin" position-index="$destory|0">
        <span slot="item-name" class="item-name">
          垃圾箱
        </span>
      </component-item>
      <div class="btn f-r" @click="sort">
        整理
      </div>
    </div>
    <div class="list">
      <template v-for="(item, index) in hero.$package">
        <component-item class="item" :item="item" :position-index="'$package|' + index"></component-item>
      </template>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      hero: {},
    }
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
  methods :{
    sort (){
      this.hero.itemSort('$package');
    }
  }
}
</script>

<style scoped lang="less">
  .package{
    padding: 5px;
    height: 100%;
    width: 520px;
    .block-name{
      margin: 2px 8px 0px 8px;
      background: rgba(0,0,0,0.7);
      border-radius: 2px;
      color: white;
      padding-left: 6px;
      line-height: 26px;
    }
    .info-list{
      padding: 5px 8px;
      font-size: 10px;
      .item{
        margin-right: 8px;
        display: inline-block;
        .title{
          background: #5cb85c;
          border-radius: 2px;
          padding: 2px 4px;
          color: white;
        }
        .num{
          background: #337ab7;
          padding: 2px 4px;
          border-radius: 0px 2px 2px 0px;
          color: beige;
        }
      }
    }

    .list{
      height: 40%;
      overflow: scroll;
      padding-left: 8px;
      .item{
        margin: 0px 6px 4px 0px;
      }
    }
  }

</style>
