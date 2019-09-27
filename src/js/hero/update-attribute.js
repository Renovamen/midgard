export default function updateAttribute(){

  // 记录当前血量百分比;
  let hp_per = Math.min(this.$hp / (this.$r.$maxHp || this.$maxHp), 1);

  let promote = {
    $maxHp       : [0,0,0,0],    // 血量最大值
  }

  let data = (this.$resumes || []);

  let action = {
    $default : function(key,v){
      this.$r[key] = Math.floor(((this[key] + v[0]) * (1 + v[1] / 100) + v[2]) * (1 + v[3] / 100));
    },
  }

  // 计算基础属性
  for(let item of data){
    
    if(!item) continue;

    if(item.equip) {
      for(let key in item.equip){
        
        let v = item.equip[key];
        console.log(key, v, item.equip)

        if(!promote[key]) continue;

        let index = 0, up = v;

        if(v instanceof Array){
          index = v[1];
          up = v[0];
        }
        
        promote[key][index] += up;
      }
    }
  };

  for(let key in promote){
    action[action[key] ? key : '$default'].apply(this, [key, promote[key]]);
  }

  this.$hp = Math.floor(hp_per * this.$r.$maxHp) || 0;
}