import { DIALOG_DATA } from '../data/event-data'
import { ITEM_TABLE } from '../data/item-data'
import CHEST_DATA from '../data/chest-data'

const Data = {     
  '3' : ITEM_TABLE,  
  '5' : CHEST_DATA, 
  // '6' : MISSION_TABLE, 
  '7' : DIALOG_DATA, 
  // '8' : MAP_TABLE,     
  // '9' : ACHIEVEMENT_TABLE, 
}

const PublicStaticGet = function(key){
  let Head = key.toString()[0];
  let record = Data[Head];
  let result = _.cloneDeep(_.find(record, {
    id: key
  })) || key;

  return result;
}

export default PublicStaticGet;