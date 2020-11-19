import Vue from 'vue'
import CONSTANT from '../data/constant'
import '../styles/item-tool-tip.stylus'

export default function(el, binding) {
  let keyName = CONSTANT.UNIT_ATTR_NAME,
      itemLevel = CONSTANT.ITEM_LEVEL,
      tipClassName = '.item-tool-tip-pover',
      item = binding.value
      
  let event = {
    click: function() {
      if(item.link) {
        window.open(item.link)
      }
    },
    mouseenter: function(e) {
      event.mouseleave()

      let tip = document.createElement('div')
      let {right, top} = e.target.getBoundingClientRect()

      Object.assign(tip.style, {
        position : 'absolute',
        left : `${right}px`,
        top : `${top}px`
      })

      Object.assign(tip, {
        className : tipClassName.slice(1),
        innerHTML : `
          <div class="name m-b-10 font-min" :style="itemColor">
            {{this.item.name}}
          </div>
          <div class="equip m-b-10">
            <span class="attr-name">{{this.hpName}}</span>
            <span class="attr-data">{{this.changeHp}}</span>
          </div>
          <div class="dsc" v-for="dsc in item.dsc">{{dsc}}</div>
          <div class="image" v-for="img in item.img">
            <img :src='img' style="width: 200px"/>
          </div>
          <div class="btn" v-if="item.linkInfo">{{item.linkInfo}}</div>
        `
      })

      document.body.appendChild(tip)

      new Vue({
        created(){
          this.item = item
          this.itemColor = {
            color: itemLevel[this.item.grade || 0]
          }

          if(this.item.equip) {
            this.changeHp = this.item.equip.$changeHp
            this.hpName = '梦想'
          }
          else {
            this.changeHp = null
            this.hpName = null
          }
          if(this.changeHp > 0) this.changeHp = '+' + this.changeHp
        }
      }).$mount(tipClassName)
    },
    mouseleave: function() {
      let old = document.querySelector(tipClassName)
      // 移除已经存在的 tip
      if(old){
        old.parentNode.removeChild(old)
      }
    }
  }

  for(let key in event) {
    let value = event[key],
        keyNameInElement = `${key}_EVENT_FUNCTION_ITEM_TOOL_TIP`

    el.removeEventListener(key, el[keyNameInElement])

    if(item) {
      el.addEventListener(key, value)
      el[keyNameInElement] = value
    }
  }
}