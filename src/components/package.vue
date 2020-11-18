<template>
  <div class="package shadow-box">
    <div class="info-list">
      <div class="label-name">背包</div>
      <component-item class="dustbin" position-index="$destory|0">
        <span slot="item-name" class="item-name">
          <i class="fa fa-recycle fa-2x"></i>
        </span>
      </component-item>
      <div class="btn f-r sort" @click="sort">整理</div>
    </div>
    <div class="list">
      <template v-for="(item, index) in hero.$package">
        <component-item
          class="item"
          :key="`package-item-${index}`"
          :item="item"
          :position-index="'$package|' + index"
        ></component-item>
      </template>
    </div>
  </div>
</template>

<script>

export default {
  computed:{
    hero: function(){
      return this.$store.state.HeroStore.hero;
    }
  },
  watch: {
    '$store.state.UPDATE' : function(){
      this.$forceUpdate();
    },
  },
  methods: {
    sort() {
      this.$store.state.HeroStore.hero.itemSort('$package');
    }
  }
}
</script>

<style scoped lang="less">
  .package {
    padding: 5px;
    height: 100%;
    width: 520px;
    .info-list {
      padding: 5px 8px;
      font-size: 10px;
      .label-name {
        height: 40px;
        line-height: 40px;
        width: 60px;
        background: #6d7083;
        color: white;
        text-align: center;
        border-radius: 2px;
        font-size: 16px;
        margin-top: -4px;
        margin-bottom: 4px;
        display: inline-block;
      }
      .sort {
        float: right;
        margin-right: 6px;
        width: 44px;
        height: 30px;
        line-height: 25px;
        margin-top: 6px;
        border-color: #6d7083;
        color: white;
      }
      .sort:hover {
        background-color: #6d7083;
      }
      .item {
        width: 60px;
        margin-right: 8px;
        display: inline-block;
        .title {
          background: #5cb85c;
          border-radius: 2px;
          padding: 2px 4px;
          color: white;
        }
        .num {
          background: #6d7083;
          padding: 2px 4px;
          border-radius: 0px 2px 2px 0px;
          color: beige;
        }
      }
    }

    .list {
      height: 40%;
      overflow: scroll;
      padding-left: 8px;
      .item {
        margin: 0px 6px 4px 0px;
      }
    }
  }

</style>
