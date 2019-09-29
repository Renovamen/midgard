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
      $package : [letter, money].concat(new Array(88))
    }
  );
  Vue.set(store.state.HeroStore,'hero', hero);
}

export {
  CreateGame
}