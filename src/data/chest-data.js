const CHEST = 'map-chest'

const getChestData = function() {
  let chestList = []
  for(let i = 3000003; i <= 3000058; i++) {
    chestList.push({
      $type: CHEST,
      id: 5000000 + (i - 3000000 - 2),
      data: [
        {
          msg: '你捡到了一个包裹',
          buttons: [
            "[放弃]{3, 1}",
            "#[拾取]{2, 1}"
          ],
          get: [[i, 1]]
        },
        '可喜可贺。',
        '你的背包放不下了，下次再来吧。',
        '你失去它了。'
      ]
    })
  }
  return chestList
}

const CHEST_DATA = getChestData()

export default CHEST_DATA