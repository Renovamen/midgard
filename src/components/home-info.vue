<template>
  <div class="home-info">
    <div class="hero-info">
      <div class="basic-info">
        <div class="avatar" @click="cheat()">
          <img :src="require('static/hero.png')"/>
          <div class="level">0</div>
        </div>
        <div class="name">
          <input class="cheatInput" v-show="isCheat" v-model="cheatCode" @keyup.enter="checkCheatCode()"/>
          去找简历吧勇士
        </div>
      </div>
      <div class="resume">
        <div class="left">
          <div class="label-name" :class="{collect: isCollected}" @click="exchange()">{{this.collectTip}}</div>
          <component-item class="resume1" :item="hero.$resumes[0]" :position-index="'$resumes|0'"></component-item>
          <component-item class="resume2" :item="hero.$resumes[1]" :position-index="'$resumes|1'"></component-item>
        </div>
        <div class="right">
          <template v-for="(item, index) in hero.$resumes">
            <component-item class="item" v-if="index > 1" :item="item" :position-index="'$resumes|' + index"></component-item>
          </template>
        </div>
      </div>
    </div>
    <div class="attr-info">
      <div class="left">
        <div class="label-name">梦想</div>
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
import {CreateGame} from "../js/create-game.js"

export default {
  data () {
    return {
      infoKeyList : [ '$maxHp'],
      isCollected : false,
      collectTip: "收集",
      isCheat: false,
      cheatCode: '',
    }
  },
  created(){
    this.checkCollect();
  },
  computed:{
    hero: function(){
      return this.$store.state.HeroStore.hero;
    }
  },
  watch:{
    '$store.state.UPDATE' : function(item){
      this.$forceUpdate();
      this.checkCollect();
    },
  },
  methods : {
    checkCollect(){
      // 集齐了所有简历碎片（且 hp > 0），则可以兑换完整版简历
      let resumes = this.$store.state.HeroStore.hero.$resumes, flag = 0;
      for(let resume of resumes) {
        if(resume == 0 || resume == null) flag = 1;
      }
      if(flag == 0) {
        this.isCollected = true;
        this.collectTip = "兑换";
      }
      else {
        this.isCollected = false;
        this.collectTip = "收集";
      }
    },
    exchange(){
      // 兑换完整版简历
      if(this.isCollected == true) {
        window.open("https://renovamen.ink/files/cv.pdf");
      }
    },
    // 作弊码弹窗
    cheat() {
      if(this.isCheat) {
        this.isCheat = false;
        this.cheatCode = '';
      }
      else this.isCheat = true;
    },
    checkCheatCode() {
      if(this.cheatCode == 'zouxiaohanissocool') CreateGame(true);
      else this.cheatCode = '作弊码错误！';
    }
  }
}
</script>

<style scoped lang="less">
  .home-info {
    word-spacing: -4px;
    display: table;
    width: 276px;
    height: 280px;
    padding: 6px;
    // background: #c46272;
    .left {
      display: inline-block;
      vertical-align: top;
      width: 60px;
    }
    .right {
      display: inline-block;
      vertical-align: top;
      width: 192px;
    }
    .label-name {
      height: 40px;
      line-height: 40px;
      width: 60px;
      background: #6d7083;
      color: white;
      text-align: center;
      border-radius: 2px;
    }
    .collect {
      background: #c46272;
    }
    .collect:hover {
      box-shadow: 0px 0px 4px #eee inset;
    }
    .basic-info {
      margin-bottom: 4px;
      .avatar {
        display: inline-block;
        width: 40px;
        height: 40px;
        background-color: #6d7083;
        border-radius: 2px;
        vertical-align: top;
        position: relative;
        img {
          display: inline-block;
          width: 40px;
          height: 40px;
        }
        .level {
          position: absolute;
          width: 18px;
          height: 18px;
          line-height: 18px;
          border-radius: 50%;
          text-align: center;
          background: #6d7083;
          color: white;
          font-size: 10px;
          top: 24px;
          left: 24px;
        }
      }
      .avatar:hover {
        box-shadow: 0px 0px 2px #eee inset;
      }
      .name {
        background-color: #6d7083;
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
      .cheatInput {
        position: absolute;
        width: 180px;
        height: 30px;
        margin-left: -13px;
        margin-top: 5px;
        background-color: #6d7083;
        color: white;
        outline: none;
        border: 1px solid white;
        border-radius: 5px;
        padding-left: 4px;
      }
    }

    .resume {
      .right {
        padding: 5px;
      }
      .left {
        padding-top: 5px;
      }
      .resume1 {
        margin-top: 8px;
        margin-left: 16px;
      }
      .resume2 {
        margin-top: 4px;
        margin-left: 16px;
      }
      .item {
        margin: 0px 1px 4px 0px;
      }
    }

    .attr-info {
      .right {
        padding-left: 3px;
        .attr {
          font-size: 10px;
          display: inline-block;
          width: 63px;
          padding: 6px 2px;
          margin-bottom: 4px;
          .value {
            font-size: 18px;
            display: block;
            margin-left: 4px;
            margin-top: -2px;
            color: #f16565;
          }
        }
        .attr.last {
          margin-bottom: 0px;
        }
      }
    }
  }

  .home-info.right-info {
    height: 168px;
    width: 520px;
    .hero-info, .attr-info {
      width: 280px;
      display: inline-block;
      margin-left: 7px;
    }
    .attr-info {
      vertical-align: top;
      width: 150px;
      .attr {
        padding: 12px 2px;
      }
    }
  }
</style>
