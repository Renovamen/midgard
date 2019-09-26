const CHEST = 'Chest';

const CHEST_DATA = [
  {  
    $type : CHEST,
    id : 5000002,
    data: [
      {
        msg: '你捡到了一个包裹',
        buttons : [
          "[放弃]{3,1}",
          "#[拾取]{2,1}"
        ],
        get  : [[3000003,1]]
      },
      '可喜可贺。',
      '你的背包放不下了，下次再来吧。',
      '你失去它了。'
    ]
  }
]

export default CHEST_DATA;