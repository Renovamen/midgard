const MAP_TABLE = [
  {
    id: 8000001,
    name: '世界',
    logo: '',
    mapInitOption: {
      row : 20,
      col : 20,
      lines : 10,    // 分支量;
      inflex : 0.5  // 曲折度;
    },
    chestList: [
      5000001, 5000002
    ],
    eventList: [
      7000001
    ],    // 特殊事件触发点;
    rule: {          // 生成规则;
      "5000001" : 4,
      "5000002" : 5,
      "7000001" : 1,
    }
  }
];


export default MAP_TABLE;