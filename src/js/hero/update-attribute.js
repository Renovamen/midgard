const createPopup = function() {
  
  let modal = document.createElement('div');
  let shadowView = document.createElement('div');
  let view = document.querySelector('#router-view');
  let opt = {
    height    : 300,
    width     : 120,
    animated  : 'animated zoomIn',
    backForce : 0.2,
  }

  shadowView.className = '.shadow-view'.slice(1);

  // 背景层 创建;
  Object.assign(shadowView.style, {
    position   : 'absolute',
    background : `rgba(0,0,0,${opt.backForce})`,
    width      : `100%`,
    height     : `100%`,
    left       : `0px`,
    top        : `0px`, 
    zIndex     : '5'
  })

  // 模态框 创建;
  Object.assign(modal.style, {
    position  : 'absolute',
    width     : `${opt.height}px`,
    height    : `${opt.width}px`,
    left      : `${(view.offsetWidth - opt.width)/2}px`,
    top       : `${(view.offsetHeight - opt.height)/2}px`,
    zIndex    : '6'
  })

  let info = {
                "modal": modal, 
                "shadowView": shadowView,
                "opt": opt,
                "view": view
              }
  return info
}

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

  if(this.$hp < 0) {
    let info = createPopup();
    let modal = info.modal, shadowView = info.shadowView,
        opt = info.opt, view = info.view;

    Object.assign(modal, {
      className : [ opt.animated, '.restart-dialog'.slice(1) ].join(' '),
      innerHTML : `
        <div class="radius-2">
          <span>你失去了梦想，已经是一条咸鱼了。</span>
          <div class="event">
            <button class="action radius-2" onclick="location.reload()">重新开始</button>
          </div>
        </div>
      `
    })

    view.appendChild(modal);
    view.appendChild(shadowView);
  }
}