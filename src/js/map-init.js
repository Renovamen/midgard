import DungeonCreater from '../js/dungeon-creater';
import CONSTANT from '../data/constant';
import PGET from '../js/public-static-get';

let blockType = CONSTANT.MAP_BLOCK_TYPE;

const Map = function(o){
  
  let opt = this.$opt = _.cloneDeep(o),
      getBlankRandomBlock = size => {
        return _.sampleSize(
          _.filter( _.flattenDeep(this.$data.mapData), item => {
            if (item.block_type != blockType['ROAD'] || item.event){
              return false;
            }
            return true;
          }),
          size
        );
      }
  
  this.$data = opt.mapData || new DungeonCreater(opt.mapInitOption || {});

  this.hero = (() => {
    let hero = getBlankRandomBlock(1)[0];
    hero.block_type = blockType['HERO'];
    return hero;
  })();


  for(let id of (opt.chestList || []).concat(opt.eventList || [])){

    let event = PGET(id);

    if(!id){
      console.warn('No Such Map Event Object:', id, opt);
      continue;
    }

    for(let block of getBlankRandomBlock(opt.rule[String(id)])){
      block.event = {
        event_type: event.type || event.$type || 'unknown',
        event,
      };
    }
  }
}

export default Map;