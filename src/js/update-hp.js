const createPopup = function() {
  let modal = document.createElement('div')
  let shadowView = document.createElement('div')
  let view = document.querySelector('#router-view')
  let opt = {
    height    : 300,
    width     : 120,
    animated  : 'animated zoomIn',
    backForce : 0.2
  }

  shadowView.className = '.shadow-view'.slice(1)

  // 背景层 创建
  Object.assign(shadowView.style, {
    position   : 'absolute',
    background : `rgba(0,0,0,${opt.backForce})`,
    width      : `100%`,
    height     : `100%`,
    left       : `0px`,
    top        : `0px`, 
    zIndex     : '5'
  })

  // 模态框 创建
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

export default function updateHp() {

  let data = (this.$resumes || [])

  // 根据装备计算生命值
  this.$hp = this.$maxHp
  for(let item of data){
    if(!item) continue
    if(item.equip) {
      let v = item.equip['$changeHp']
      this.$hp += v
    }
  }

  if(this.$hp < 0) {
    let info = createPopup()
    let modal = info.modal, shadowView = info.shadowView, opt = info.opt, view = info.view

    Object.assign(modal, {
      className : [ opt.animated, '.gameover-dialog'.slice(1) ].join(' '),
      innerHTML : `
        <div class="radius-2">
          <span>你失去了梦想，已经是一条咸鱼了。</span>
          <div class="event">
            <button class="action radius-2" onclick="location.reload()">重新开始</button>
          </div>
        </div>
      `
    })
    view.appendChild(modal)
    view.appendChild(shadowView)
  }
}