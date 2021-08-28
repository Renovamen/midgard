import { RESUME_ITEMS_TABLE } from "./item-data";

const DIALOG = "map-dialog",
  FIRST_ID = RESUME_ITEMS_TABLE[0].id;

const getDialogData = function () {
  const dialogList = [];
  for (let i = 1; i <= 10; i++) {
    dialogList.push({
      id: 7000000 + i,
      type: DIALOG,
      data: [
        {
          msg: "我只跟有钱人做生意",
          buttons: ["[拒绝]{1,1}", "#[同意]{3,4,2,1}"],
          need: [[FIRST_ID + Math.ceil(Math.random() * 56) - 1, 1]],
          get: [[FIRST_ID + Math.ceil(Math.random() * 56) - 1, 1]]
        },
        "穷鬼滚开。",
        "我有你想要的任何简历，只要你有钱。",
        "你的背包里没有我要的东西，没诚意的家伙。",
        "你的背包放不下了，下次再来吧。"
      ]
    });
  }
  return dialogList;
};

const DIALOG_DATA = getDialogData();

export default DIALOG_DATA;
