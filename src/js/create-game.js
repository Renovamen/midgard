import Unit from '../js/unit-class'
import {ITEM_TABLE} from '../data/item-data';
import PGET from '../js/public-static-get';
import store from '../store';
import Vue from 'vue';

const CreateGame = function(){
  // 生成默认测试英雄
  let letter = PGET(3000001);
  letter.num = 1;
  let money = PGET(3000002);
  money.num = 1;

  var hero = new Unit(
    {
      $showName : '愚蠢的人类',
      $type    : 'Hero',
      $package : [letter, money].concat(_.cloneDeep(ITEM_TABLE).slice(2)).concat(new Array(32))
    }
  );
  Vue.set(store.state.HeroStore,'hero', hero);
}

export {
  CreateGame
}