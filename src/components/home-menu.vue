<template>
  <div class="home-menu">
    <div class="link" @click="goToMap()" :style="{'width': '25%'}">
      <div class="title text-center">
        <span>游</span>荡
      </div>
      <div class="e-title">Voyage</div>
      <img :src="require('static/ui/fight.svg')"/>
    </div>
    
    <template v-for="(item, index) in menu">
      <a
        class="link"
        :key="`menu-item-${index}`"
        :href="item[2]"
        target="_blank"
        :style="{'width': '25%'}"
      >
        <div class="title text-center">
          <span>{{item[0][0]}}</span>{{item[0][1]}}
        </div>
        <div class="e-title">
          {{item[1]}}
        </div>
        <img :src="item[3]"/>
      </a>
    </template>
  </div>
</template>

<script>
import MapInit from '../js/map-init'

export default {
  data () {
    return {
      menu : [
        ['咸鱼', 'Github', 'https://github.com/Renovamen', require('static/ui/github.svg')],
        ['博客', 'Blog', 'https://renovamen.ink', require('static/ui/blog.svg')],
        ['邮箱', 'Email', 'mailto:renovamenzxh@gmail.com', require('static/ui/email.svg')],
      ]
    }
  },
  computed: {
    mapList() {
      // 随机生成包裹
      var chestList = []
      for(let i = 1; i <= 10; i++) {
        var level, chestID
        
        // 包裹中物品种类
        let itemID = Math.floor(Math.random()*14) + 1
        // 包裹中物品等级 R:50% SR:30% SSR:15% UR:5%
        let levelID = Math.floor(Math.random()*100) + 1

        if(levelID <= 50) level = 0
        else if(levelID > 50 && levelID <= 80) level = 1
        else if(levelID > 80 && levelID <= 95) level = 2
        else level = 3

        chestID = 5000000 + level * 14 + itemID
        chestList.push(chestID)
      }

      var map_table = [
        {
          id: 8000001,
          name: '世界',
          logo: '',
          mapInitOption: {
            row: 20,
            col: 20,
            lines: 10,  // 分支量
            inflex: 0.5  // 曲折度
          },
          chestList: chestList,
          eventList: [7000001],  // 事件
          rule: {}  // 生成规则
        }
      ]
      this.$store.state.MapStore.mapList = _.cloneDeep(map_table)
      return this.$store.state.MapStore.mapList
    }
  },
  methods: {
    goToMap() {
      let map = this.mapList[0]
      this.$store.state.MapStore.map = new MapInit(map)
      location.href = '#/map'
    }
  }
}
</script>

<style scoped lang="stylus">
.home-menu
  margin-top -16px
  word-spacing:-4px
  display table
  width 100%
  height 220px
  .link
    text-decoration none
    position relative
    vertical-align top
    display inline-block
    color rgb(207, 210, 218)
    padding-right 6px
    overflow hidden
    border 1px solid #535664
    border-radius 5px
    height 100%
    transition 0.2s
    .title
      margin-top 10px
      text-align right
      span:first-child
        font-size 24px
    .e-title
      font-size 10px
      text-align right
    img
      opacity 0
      position absolute
      width 100px
      top 50px
      left 50px
      transition 0.2s
    &:hover
      text-decoration none
      background #377bb5
      color white
      transition 0.3s
      img
        opacity 1
        top 80px
        left 8px
        transition 0.3s
</style>