import store from '../store'
import CreateHero from './create-hero'
import { GetRange, GetRandom } from './public-random-range'
import PGET from '../js/public-static-get'
import Vue from 'vue'

// prototype
import updateHp from './update-hp'

function Unit(obj = {}) {
  this.$can_move_event = true  // 人物在地图上遇到事件时，在关闭对话框前不能移动
  this.$hp = 600  // current hp
  this.$maxHp = 600  // max hp

  CreateHero.call(this, obj)
  this.updateHp() 
}

Unit.prototype = {
  updateHp,
  getList,
  itemSort,
  getItem,
  equip,
  demount,
  isEnoughInPackage,
  costItem
}

function getList(key, opt, isIndex) {
  let list = this[key]

  if(!list) return false

  let condition

  if(typeof opt === 'number') condition = i => i && (i.id === opt)
  if(typeof opt === 'object') condition = i => i && (i.id === opt.id)
  if(typeof opt === 'function') condition = opt
  if(!condition) return false

  return isIndex ? list.findIndex(condition) : list.find(condition)
}

function itemSort(type) {
  let list = this[type]

  if(!list || !list.length) return false

  list.sort(
    (a, b) => ((a.id || Infinity) - (b.id || Infinity))
  )

  store.commit('UPDATE')

  return true
}

function getItem(data, force, type = '$package') {

  let container = force ? this[type] : _.cloneDeep(this[type]), surplus = []
  
  if(!container || !data || !data.length) {
    console.warn('[unit.getItem Error]:', data, force, t, this)
    return surplus
  }

  data.forEach(i => {
    let item, num = i[1]

    if(typeof i[0] === 'object') item = i[0]
    else item = PGET(i[0])

    let itemInPackage = this.getList(type, { id: item.id }),
        nextBlankPlace = container.findIndex(item => !item)

    item.pile && (item.num = num)

    // 可堆叠且包里存在该物品
    if(itemInPackage && item.pile)
      itemInPackage.num = (itemInPackage.num || 0) + num
    // 不可堆叠或包里不存在该物品
    else {
      if(~nextBlankPlace) container[nextBlankPlace] = item  // 有空位
      else surplus.push(i)  // 没空位
    }
  })

  store.commit('UPDATE')

  return surplus
}

function equip(item, index, type = '$package') {
  // 0: 基本, 1: 教育, 2: 课程, 3: 技能, 4: 兴趣
  // 5: 项目-1, 6: 项目-2, 7: 项目-3, 8: 项目-4, 9: 项目-5
  // 10: 研究-1, 11: 研究-2
  // 12: 论文, 13: 经历
  let container = this[type], $resumes = this.$resumes, equip = item.equip
  
  if(!equip || !container || !$resumes) return false

  // 删除包裹中的装备, 如果已有装备, 卸载装备
  container[index] = undefined

  if($resumes[item.equipType]) this.demount(item.equipType, index, type)
  $resumes[item.equipType] = item

  this.updateHp()
  store.commit('UPDATE')

  return true
}

function demount(equipType, index, type = '$package') {
  let container = this[type],
      equipItem = this.$resumes[equipType],
      $resumes = this.$resumes

  $resumes[equipType] = 0

  if(!equipItem) return 

  index = index || container.findIndex(i => !i)

  if(~index) container[index] = equipItem
  else {
    $resumes[equipType] = equipItem
    return false
  }

  this.updateHp()
  store.commit('UPDATE')
}

function costItem(list, type = '$package') {
  let container = this[type]

  for(let opt of list) {
    let index = this.getList(type, opt[0], true)

    let num = (() => {
      if(typeof opt[1] === 'function') return opt[1].call(this)
      return opt[1]
    })()

    container[index].num -= num

    if(!container[index].num) container[index] = undefined
  }
}

function isEnoughInPackage(list, type = '$package') {
  let container = this[type]
  if(!container || !list || !list.length) return false

  for(let opt of list) {
    let item = this.getList(type, opt[0])
    let num = (() => {
      if(typeof opt[1] === 'function') return opt[1].call(this)
      return opt[1]
    })()
    if(!item || (item.num || 1) < num) return false
  }
  return true
}

export default Unit