<template>
  <div class="home-info">
    <div class="right-info-left">
      <div class="main">
        <div class="avatar">
          <img :src="require('static/hero.png')"/>
          <div class="level">0</div>
        </div>
        <div class="name">去找简历吧勇士</div>
      </div>
      <div class="equip">
        <div class="left">
          <div class="label-name">收集</div>
          <component-item class="weapon1" :item="hero.$equipments[0]" :position-index="'$equipments|0'"></component-item>
          <component-item class="weapon2" :item="hero.$equipments[1]" :position-index="'$equipments|1'"></component-item>
        </div>
        <div class="right">
          <template v-for="(item, index) in hero.$equipments">
            <component-item class="item" v-if="index > 1" :item="item" :position-index="'$equipments|' + index"></component-item>
          </template>
        </div>
      </div>
    </div>
    <div class="info">
      <div class="left">
        <div class="label-name">生命</div>
      </div>
      <div class="right">
        <div :class="['attr', i > 5 ? 'last' : '']" v-for="(key,i) in this.infoKeyList">
          <!-- <span class="name">{{key | heroAttrKey}}</span> -->
          <span class="value">{{hero.$r[key].toFixed(1)}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  data () {
    return {
      infoKeyList : [ '$maxHp']
    }
  },
  computed:{
    hero: function(){
      return this.$store.state.HeroStore.hero;
    }
  },
  watch:{
    '$store.state.UPDATE' : function(item){
      this.$forceUpdate();
    },
  },
  methods : {
    open(){

    }
  }
}
</script>

<style scoped lang="less">
  .home-info{
    color: rgb(207, 210, 218);
    word-spacing:-4px;
    display: table;
    width: 276px;
    height: 280px;
    padding: 6px;
    .left{
      display: inline-block;
      vertical-align: top;
      width: 60px;
    }
    .right{
      display: inline-block;
      vertical-align: top;
      width: 192px;
    }
    .label-name{
      height: 40px;
      line-height: 40px;
      width: 60px;
      background: #3a3732;
      color: white;
      text-align: center;
      border-radius: 2px;
    }
    .main{
      margin-bottom: 4px;
      .avatar{
        display: inline-block;
        width: 40px;
        height: 40px;
        background-color: #3a3732;
        border-radius: 2px;
        vertical-align: top;
        position: relative;
        img{
          display: inline-block;
          width: 40px;
          height: 40px;
        }
        .level{
          position: absolute;
          width: 18px;
          height: 18px;
          line-height: 18px;
          border-radius: 50%;
          text-align: center;
          background: #3a3732;
          color: white;
          font-size: 10px;
          top: 24px;
          left: 24px;
        }
      }
      .name{
        background-color: #3a3732;
        border-radius: 2px;
        color: white;
        display: inline-block;
        width: 194px;
        height: 40px;
        line-height: 40px;
        margin-left: 10px;
        padding: 0px 20px;
        font-size: 22px;
        text-align: center;
        max-width: 202px;
        text-overflow: ellipsis;
      }
    }

    .equip{
      .right{
        padding: 5px;
      }
      .left{
        padding-top: 5px;
      }
      .weapon1{
        margin-top: 8px;
        margin-left: 16px;
      }
      .weapon2{
        margin-top: 4px;
        margin-left: 16px;
      }
      .item{
        margin: 0px 1px 4px 0px;
      }
    }

    .info{
      .right{
        padding-left: 3px;
        .attr{
          font-size: 10px;
          display: inline-block;
          width: 63px;
          // border-left: 2px solid green;
          padding: 6px 2px;
          margin-bottom: 4px;
          // .name{
          //   padding-left: 4px;
          //   font-weight: 800;
          // }
          .value{
            font-size: 18px;
            display: block;
            margin-left: 4px;
            margin-top: -2px;
            color: #f16565;
          }
        }
        .attr.last{
          margin-bottom: 0px;
        }
      }
    }
  }

  .home-info.right-info{
    height: 168px;
    width: 520px;
    .right-info-left,.info{
      display: inline-block;
    }
    .info{
      vertical-align:top;
      .attr{
        padding: 12px 2px;
      }
    }
  }
</style>
