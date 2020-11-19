import store from '../store'
import Vue from 'vue'
import CONSTANT from '../data/constant'
import PGET from '../js/public-static-get'

const DialogElementClassName = '.Map-Dialog-modal'
const ShadowViewClassName = '.shadow-view'

const createPopup = function() {
  let modal = document.createElement('div')
  let shadowView = document.createElement('div')
  let view = document.querySelector('#router-view')
  let opt = {
    height    : 300,
    width     : 200,
    animated  : 'animated zoomIn',
    backForce : 0.2
  }

  shadowView.className = ShadowViewClassName.slice(1)

  // 背景层 创建
  Object.assign(shadowView.style, {
    position   : 'absolute',
    background : `rgba(0,0,0,${opt.backForce})`,
    width      : `100%`,
    height     : `100%`,
    left       : `0px`,
    top        : `0px`, 
    zIndex     : '5'
  })

  // 模态框 创建
  Object.assign(modal.style, {
    position  : 'absolute',
    width     : `${opt.height}px`,
    height    : `${opt.width}px`,
    left      : `${(view.offsetWidth - opt.width)/2}px`,
    top       : `${(view.offsetHeight - opt.height)/2}px`,
    zIndex    : '6'
  })

  let info = {
    "modal": modal, 
    "shadowView": shadowView,
    "opt": opt,
    "view": view
  }
  return info
}

function closeModal(callback) {
  // 对话窗口关闭后，恢复移动
  Vue.set(store.state.HeroStore.hero, '$can_move_event', true)

  let modal = document.querySelector(DialogElementClassName),
      shadow = document.querySelector(ShadowViewClassName);

  modal && modal.parentNode.removeChild(modal)
  shadow && shadow.parentNode.removeChild(shadow)
  callback && callback()
}

const itemLevel = CONSTANT.ITEM_LEVEL

const MapDialog = function(event, callback) {
  
  let info = createPopup()
  let modal = info.modal, shadowView = info.shadowView,
      opt = info.opt, view = info.view

  Object.assign(modal, {
    className: [ opt.animated, DialogElementClassName.slice(1) ].join(' '),
    innerHTML: `
      <div class="close" @click="this.close">+</div>
      <div class="msg m-b-4 radius-2">
        {{this.record.msg}}
      </div>
      <div class="change m-b-4 radius-2" v-if="this.record.need && this.record.get">
        <span>要支付</span>
        <template v-for="item in this.record.need">
          <span class="name" :style="getColor(item[0])">{{item[0] | itemKey('name')}}</span>*<span class="num">{{item[1]}}</span>
        </template>
        <span>为代价，来交换</span>
        <template v-for="item in this.record.get">
          <span class="name" :style="getColor(item[0])">{{item[0] | itemKey('name')}}</span>*<span class="num">{{item[1]}}</span>
        </template>
        <span>吗?</span>
      </div>
      <div class="event">
        <button class="action radius-2" v-for="e in this.record.buttons" @click="action(e.action)">
          {{e.title}}
        </button>
        <button v-if="this.isEnd" class="action radius-2" @click="close">结束对话</button>
      </div>
    `
  })

  view.appendChild(modal)
  view.appendChild(shadowView)

  new Vue({
    store,
    created() {
      this.event = event
      this.$i = 0
      this.isEnd = false
      this.next()
    },
    methods: {
      next() {
        if(this.$isEnd) {
          this.close()
          return 
        }
        this.record = transformEventObj(this.event.data[this.$i])
        this.isEnd = (this.$i++ === (this.event.data.length-1))
        this.$forceUpdate()
      },
      action(e) {
        e.call(this)
      },
      close() {
        closeModal(callback)
      },
      getColor(itemID) {
        let itemColor = {
          color: itemLevel[PGET(itemID).grade || 0]
        }
        return itemColor
      }
    }
  }).$mount(DialogElementClassName)

  function transformEventObj(opt) {
    let record = _.cloneDeep(opt)
    if(typeof record === 'string') {
      record = {
        msg: record
      }
    }
    
    let buttons = _.map(record.buttons,function(str) {
      if(typeof str === 'object') return str

      let strc = str
      str = str.match(/\[([^]+)\]\{([^]+)\}/)
      let btn = {}
      btn.title = str[1]
      if(!str[2]) return btn

      if(strc[0] !== '#') {
        btn.action = function() {
          let [i, isEnd] = str[2].split(',')
          this.$i = Number(i)
          this.next()
          if(Number(isEnd)) this.isEnd = true
        }
      }
      
      else {
        let i = str[2].split(',')
        let isEnd = i.unshift()
        btn.action = function() {
          let need = opt.need || []
          let get = opt.get || []
          let unit = this.$store.state.HeroStore.hero
          let enough = unit.isEnoughInPackage(need)
          if(!enough) this.$i = i[0]
          else {
            let left = unit.getItem(get)
            if(left.length) this.$i = i[1]
            else {
              unit.getItem(get, true)
              unit.costItem(need)
              this.$i = i[2]
            }
          }
          this.next()
          if(Number(isEnd)) this.isEnd = true
        }
      }
      return btn
    })
    record.buttons = buttons
    return record
  }
}

const MapGetItem = function(event, callback) {

  let info = createPopup()
  let modal = info.modal, shadowView = info.shadowView,
      opt = info.opt, view = info.view
      
  Object.assign(modal, {
    className : [ opt.animated, DialogElementClassName.slice(1) ].join(' '),
    innerHTML : `
      <div class="close" @click="this.close">+</div>
      <div class="msg m-b-4 radius-2">
        {{this.record.msg}}
      </div>
      <div class="change m-b-4 radius-2" v-if="this.record.get">
        <span>包裹中有</span>
        <template v-for="item in this.record.get">
          <span class="name" :style="getColor(item[0])">{{item[0] | itemKey('name')}}</span>*<span class="num">{{item[1]}}</span>
        </template>
        <span>，要拾取吗?</span>
      </div>
      <div class="event">
        <button class="action radius-2" v-for="e in this.record.buttons" @click="action(e.action)">
          {{e.title}}
        </button>
        <button v-if="this.isEnd" class="action radius-2" @click="close">结束</button>
      </div>
    `
  })

  view.appendChild(modal)
  view.appendChild(shadowView)

  new Vue({
    store,
    created() {
      this.chest = event
      this.$i = 0
      this.isEnd = false
      this.next()
    },
    methods: {
      next() {
        if(this.$isEnd) {
          this.close()
          return 
        }
        this.record = getItemObj(this.chest.data[this.$i])
        this.isEnd = (this.$i++ === (this.chest.data.length-1))
        this.$forceUpdate()
      },
      action(e) {
        e.call(this)
      },
      close() {
        closeModal(callback)
      },
      getColor(itemID) {
        let itemColor = {
          color : itemLevel[PGET(itemID).grade || 0]
        }
        return itemColor
      }
    }
  }).$mount(DialogElementClassName)


  function getItemObj(opt) {
    let record = _.cloneDeep(opt)
    if(typeof record === 'string') {
      record = {
        msg: record
      }
    }

    let buttons = _.map(record.buttons,function(str) {
      if(typeof str === 'object') return str

      let strc = str
      str = str.match(/\[([^]+)\]\{([^]+)\}/)
      let btn = {}
      btn.title = str[1]
      if(!str[2]) return btn
    
      if(strc[0] !== '#') {
        btn.action = function() {
          let [i, isEnd] = str[2].split(',')
          this.$i = Number(i)
          // console.log("this.i: ", Number(i))
          this.next()
          if(Number(isEnd)) this.isEnd = true
        }
      }

      else {
        let i = str[2].split(',')
        let isEnd = i.unshift()
        // console.log("i: ", i, isEnd)
        btn.action = function() {
          let get = opt.get || []
          let unit = this.$store.state.HeroStore.hero
          let left = unit.getItem(get)
          if(left.length) this.$i = i[0]
          else {
            unit.getItem(get, true)
            this.$i = i[1]
          }
          this.next()
          if(Number(isEnd)) this.isEnd = true
        }
      }
      return btn
    })
    record.buttons = buttons
    return record
  }
}

export {
  MapDialog,
  MapGetItem
}