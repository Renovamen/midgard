<template>
  <div class="container" :style="{'margin-top':`${margin}px`,'transform': `scale(${scale})`}">
    <div class="main">
      <div class="router-view" id="router-view">
        <transition enter-active-class="animated slow fadeIn">
          <router-view></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import {CreateGame} from "../js/create-game.js"

export default {
  data(){
    return {
      scale: 1,
      margin: 0,
    }
  },
  created(){
    window.onresize = ()=>{
      this.setPosition();
    }
    this.setPosition();
    CreateGame(false);
  },
  methods:{
    setPosition : function(){
      let height = window.innerHeight - 10;
      let height_original = 500;
      this.scale = height / height_original; 
      this.margin = (this.scale - 1) * height_original / 2 + 5
    }
  }
}
</script>

<style>
  body{
    /* background-image: url('../assets/hero-1.png'); */
    background: #47485c;
  }
</style>

<style scoped lang="less">
  .container{
    margin: auto;
    width: 830px;
    border-radius: 2px;
    height: 500px;
  }
  .main{
    display: inline-block;
    width: 100%;
    height: 100%;
  }
  .router-view{
    position: relative;
    height: 500px;
    background: #252830;
    border-radius: 2px;
  }
  .router-view > div{
    position: absolute;
    height: 100%;
    width: 100%;
  }
</style>
