import CONSTANT from '../data/constant'
import { MapDialog, MapGetItem } from '../js/event-class'
import store from '../store'
import Vue from 'vue'

const HeroMoveEvent = function(map, $VueScope) {
  let key_up    = 38,
      key_down  = 40,
      key_left  = 37,
      key_right = 39,
      move_delay = 280,
      can_move_delay = true,
      block_type = CONSTANT.MAP_BLOCK_TYPE

  this.start = function() {
    this.keyUpFunc = event => {
      if(!event.keyCode) return 
      this.autoMoveTimer && clearInterval(this.autoMoveTimer)
      this.move(event.keyCode)
    }
    document.addEventListener('keyup', this.keyUpFunc)
  }

  this.stop = function() {
    document.removeEventListener('keyup', this.keyUpFunc)
    clearInterval(this.autoMoveTimer)
  }

  this.move = function(direction){
    if(!can_move_delay) return

    can_move_delay = false

    setTimeout(() => {
      can_move_delay = true
    }, move_delay)
    
    let next_block, x = map.hero.x, y = map.hero.y

    if(store.state.HeroStore.hero.$can_move_event) {
      switch(direction){
        case key_up:
          x--
          break
        case key_down:
          x++
          break
        case key_left:
          y--
          break
        case key_right:
          y++
          break
      }
    }

    try {
      next_block = map.$data.mapData[x][y]
    }
    catch(e) {
      /*Pass*/
    }

    if(!next_block || next_block.block_type != block_type['ROAD']) {
      return false
    }

    // 将当前格子设置为 Road
    map.hero.block_type = block_type['ROAD']
    // 将目标格子标识为 Hero
    next_block.block_type = block_type['HERO']

    // 更新视图
    $VueScope.$forceUpdate()

    let {event_type, event} = next_block.event || {}

    // 事件不会保留
    if(event_type === 'Chest' || event_type === 'MapDialog') {
      delete next_block.event
    }
    
    // 设置新的英雄位置
    map.hero = next_block

    // 执行事件
    switch(event_type) {
      case 'Chest':
        // 遇到事件时，在关闭对话框前不能移动
        this.autoMove([])
        Vue.set(store.state.HeroStore.hero, '$can_move_event', false)
        MapGetItem(event, () => this.start())
        break
      case 'MapDialog':
        // 遇到事件时，在关闭对话框前不能移动
        this.autoMove([])
        Vue.set(store.state.HeroStore.hero, '$can_move_event', false)
        MapDialog(event, () => this.start())
        break
    }
  }

  this.autoMoveTimer = null

  this.autoMove = function(path) {
    this.autoMoveTimer && clearInterval(this.autoMoveTimer)
    let _path = _.cloneDeep(path)
    this.autoMoveTimer = setInterval(() => {
      let next = _path.splice(0,1)[0], x = map.hero.x, y = map.hero.y, direction
      if(!next) {
        this.autoMoveTimer && clearInterval(this.autoMoveTimer)
        return 
      }

      switch(true) {
        case next.x < x:
          direction = key_up
          break
        case next.x > x:
          direction = key_down
          break
        case next.y < y:
          direction = key_left
          break
        case next.y > y:
          direction = key_right
          break
      }
      
      this.move(direction)
      
      if(_path.length < 1) clearInterval(this.autoMoveTimer)
    }, move_delay + 100)
  }
  this.start()
  return this
}

export default HeroMoveEvent