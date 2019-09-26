import Unit from '../js/unit-class'
import {ITEM_TABLE} from '../data/item-data';
import PGET from '../js/public-static-get';
import store from '../store';
import Vue from 'vue';

const CreateGame = function(){
  // 生成默认测试英雄
  let letter = PGET(3000001);
  letter.num = 10;

  var hero = new Unit(
    {
      $showName : '愚蠢的人类',
      $type    : 'Hero',
      $package : [letter].concat(_.cloneDeep(ITEM_TABLE).slice(1)).concat(new Array(33))
    }
  );
  Vue.set(store.state.HeroStore,'hero', hero);
}

export {
  CreateGame
}