import Unit from '../js/unit-class'
import { ITEM_TABLE, MATERIAL_TABLE } from '../data/item-data'
import store from '../store'
import Vue from 'vue'

const MATERIAL_LENGTH = MATERIAL_TABLE.length
const ITEM_LENGTH = ITEM_TABLE.length

const CreateGame = function(isCheat) {
  // 初始背包装有龙的信和氪金信
  if(isCheat == false) {
    var hero = new Unit({
      $package : MATERIAL_TABLE.concat(new Array(90 - MATERIAL_LENGTH))
    })
    Vue.set(store.state.HeroStore,'hero', hero)
  }
  // 输入作弊码获得所有简历碎片
  else {
    let newPackage = ITEM_TABLE.concat(new Array(90 - ITEM_LENGTH))
    Vue.set(store.state.HeroStore.hero,'$package', newPackage)
  }
}

export default CreateGame