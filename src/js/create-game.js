import Unit from '../js/unit-class'
import {ITEM_TABLE} from '../data/item-data';
import PGET from '../js/public-static-get';
import store from '../store';
import Vue from 'vue';

const CreateGame = function(isCheat){
  let letter = PGET(3000001);
  letter.num = 1;
  let money = PGET(3000002);
  money.num = 1;

  // 初始背包装有龙的信和氪金信
  if(isCheat == false){
    var hero = new Unit(
      {
        $package : [letter, money].concat(new Array(88))
      }
    );
    Vue.set(store.state.HeroStore,'hero', hero);
  }
  // 输入作弊码获得所有简历碎片
  else {
    let newPackage = [letter, money].concat(_.cloneDeep(ITEM_TABLE).slice(2)).concat(new Array(32))
    Vue.set(store.state.HeroStore.hero,'$package', newPackage);
  }
}

export default CreateGame