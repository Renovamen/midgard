import { RESUME_ITEMS_TABLE } from "./item-data";

const CHEST = "map-chest",
  FIRST_ID = RESUME_ITEMS_TABLE[0].id;

const getChestData = function () {
  const chestList = [];
  for (const item of RESUME_ITEMS_TABLE) {
    chestList.push({
      $type: CHEST,
      id: 5000000 + (item.id - FIRST_ID + 1),
      data: [
        {
          msg: "你捡到了一个包裹",
          buttons: ["[放弃]{3, 1}", "#[拾取]{2, 1}"],
          get: [[item.id, 1]]
        },
        "可喜可贺。",
        "你的背包放不下了，下次再来吧。",
        "你失去它了。"
      ]
    });
  }
  return chestList;
};

const CHEST_DATA = getChestData();

export default CHEST_DATA;
