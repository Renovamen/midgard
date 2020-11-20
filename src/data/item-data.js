const Materials = [
  {
    id: 3000001,
    name: '印着龙爪的信',
    pile: true,
    label: ['提示'],
    dsc: [
      '信的内容：',
      '· 我是龙，世界上最帅的龙。',
      '· 我把邹笑寒的简历撕碎了，把碎片扔到了世界各地。',
      '· 我还揍了她一顿，现在她失忆了，所以不能重新写一份简历出来。',
      '· 我真强，哈哈哈哈哈哈哈哈哈。',
      '· 想看简历吗，那就去找那些简历碎片吧，邹笑寒说集齐所有碎片就能让她想起来她是谁。',
      '· 但我觉得她永远都想不起来了，因为我吃掉了她的脑子。',
      '· 真难吃 : )',
      '—— 世界上坠帅的龙'
    ]
  },
  {
    id: 3000002,
    name: '氪金吗朋友',
    pile: true,
    label: [
      '提示'
    ],
    dsc: [
      '氪金两亿即可获得所有简历碎片',
      '扫码付款：'
    ],
    img: [
      require('assets/wechat.jpg')
    ]
  }
]

const BaseItems = [
  {
    id: 3000003,
    name: '基本个人信息',
    equipType: 0,
    label: [
      '基本'
    ],
    equip: {
      $changeHp: -60,
    },
    dsc: [
      '姓名：邹笑寒',
      '籍贯：中国 重庆',
      '电话：18321968867',
      '邮箱：renovamenzxh@gmail.com',
      'Facebook：renovamen.zou',
      'Github：Renovamen',
      'Blog：renovamen.ink'
    ]
  },
  {
    id: 3000004,
    name: '教育经历',
    equipType: 1,
    label: [
      '教育'
    ],
    equip: {
      $changeHp: -85,
    },
    dsc: [
      '同济大学，软件学院，软件工程',
      '2016-2020（预期）'
    ]
  },
  {
    id: 3000005,
    name: '相关课程',
    equipType: 2,
    label: [
      '课程'
    ],
    equip: {
      $changeHp: -75,
    },
    dsc: [
      '软件工程',
      '软件测试',
      '用户交互技术',
      'Web 系统与技术',
      'Web 服务与 SOA',
      '... 等'
    ]
  },
  {
    id: 3000006,
    name: '技能点',
    equipType: 3,
    label: [
      '技能'
    ],
    equip: {
      $changeHp: -90,
    },
    dsc: [
      '· 编程语言（按熟悉程度从高到低粗略排序）：Python，MATLAB，JavaScript，HTML，CSS，C/C++，Java',
      '· 语言：中文（重庆话和普通话，母语）、英文（四六级、托福 100-、GRE 320+）',
      '· 算法框架：Tensorflow，Keras，scikit-learn',
      '· 开发框架：Vue，Django'
    ]
  },
  {
    id: 3000007,
    name: '兴趣',
    equipType: 4,
    label: [
      '兴趣'
    ],
    equip: {
      $changeHp: -60,
    },
    dsc: [
      '· 研究兴趣：NLP（自然语言处理）、Knowledge Representation & Reasoning（知识表示及知识推理）',
      '· 其他兴趣：游戏、吃、睡',
      '· 毫无兴趣：鹦鹉'
    ]
  },
  {
    id: 3000008,
    name: 'Galaxy Voyage',
    equipType: 5,
    label: [
      '项目1'
    ],
    equip: {
      $changeHp: -200,
    },
    dsc: [
      '八分音符飞船 + VR 飞船（Web 系统与技术期末项目）：',
      '1. 八分音符飞船：控制⼀艘飞船躲避红⾊块并捕获蓝色块，支持鼠标控制和声音控制飞船高度（分贝越高飞船飞得越高， 通过 Web Audio API 实现）。',
      '2. VR 飞船：控制一艘飞船尽可能从不断旋转的障碍物的孔中穿过去，支持鼠标控制和 VR 控制飞船方向（需要支持重力感应的移动设备和类似 Google Cardbard 的 VR 眼镜，头部跟踪通过 DeviceOrientationEvent 接⼝实现）。',
      '获得的赞誉：被誉为“能让人失去梦想的游戏”'
    ],
    linkInfo: '点击物品查看源码、详细说明及进行试玩',
    link: 'https://github.com/Renovamen/Galaxy-Voyager'
  },
  {
    id: 3000009,
    name: 'Cube',
    equipType: 6,
    label: [
      '项目2'
    ],
    equip: {
      $changeHp: 5
    },
    dsc: [
      '魔方',
      '· 使用 Three.js 实现可交互的魔方',
      '· 支持打乱、重置及复原并输出公式（层先法和 Two-Phase 算法）'
    ],
    linkInfo: '点击物品查看源码、详细说明及进行试玩',
    link: 'https://github.com/Renovamen/Just-a-Cube'
  },
  {
    id: 3000010,
    name: 'Stupid Torch',
    equipType: 7,
    label: [
      '项目3'
    ],
    equip: {
      $changeHp: -30
    },
    dsc: [
      '沙雕安卓光能手电筒',
      '· 支持正常模式、SOS 模式和屏幕白光模式',
      '· 在有光的地方亮，没有光的地方绝对不亮（通过 Light Sensor 传感器实现）',
      '· Java + Android Studio 开发'
    ],
    linkInfo: '点击物品查看源码及说明',
    link: 'https://github.com/Renovamen/Stupid-Torch'
  },
  {
    id: 3000011,
    name: 'Gomoku',
    equipType: 8,
    label: [
      '项目4'
    ],
    equip: {
      $changeHp: 5
    },
    dsc: [
      '五子棋人工智障',
      '· C 语言程序设计期末项目',
      '· 极大极小值搜索 + Alpha-beta 剪枝'
    ],
    linkInfo: '点击物品查看源码',
    link: 'https://github.com/Renovamen/Gomoku'
  },
  {
    id: 3000012,
    name: 'Zelda',
    equipType: 9,
    label: [
      '项目5'
    ],
    equip: {
      $changeHp: 5
    },
    dsc: ['《塞尔达传说：荒野之息》介绍网页（用户交互技术课程作业）'],
    linkInfo: '点击物品查看网页',
    link: 'http://renovamen.ink/Legend-of-Zeld/index.html'
  },
  {
    id: 3000013,
    name: '语音情感识别',
    equipType: 10,
    label: [
      '研究1'
    ],
    equip: {
      $changeHp: -60
    },
    dsc: [
      '语音情感识别（2019.3 - 2019.6）',
      '· 使用 Opensmile 提取语音音频中的特征，并进行特征处理',
      '· 构建 LSTM、CNN、SVM 和 MLP 模型进行语音情感识别',
      '· 在 CASIA（汉语）、EMODB（德语），SAVEE（英语）和 RAVDESS（英语）数据集上达到了 80% 以上的识别准确率，与现有研究相比有着具有竞争力的效果。'
    ],
    linkInfo: '点击物品查看源码及详细说明',
    link: 'https://github.com/Renovamen/Speech-Emotion-Recognition'
  },
  {
    id: 3000014,
    name: '智障问答系统',
    equipType: 11,
    label: [
      '研究2'
    ],
    equip: {
      $changeHp: -50
    },
    dsc: [
      '问答系统（2018.11 - 2019.1）',
      '· 基于 Rasa NLU 实现的能提供股票和天气信息的问答系统',
      '· 调用 iexfinance 和天气预报 API 提供股票和天气信息',
      '· 使用 spaCy 和 sklearn 进行意图识别和实体抽取，使用 SVM 模型作为分类器',
      '· 能处理单轮查询、多轮查询、状态转换和识别否定实体',
      '· 使用 wxpy 将该系统集成到微信上，使其作为一个微信号跟别人聊天'
    ],
    linkInfo: '点击物品查看源码及详细说明',
    link: 'https://github.com/Renovamen/StockBot'
  },
  {
    id: 3000015,
    name: '知识图谱',
    equipType: 12,
    label: [
      '论文'
    ],
    equip: {
      $changeHp: -80
    },
    dsc: ['Xiaohan Zou. "A Survey on Application of Knowledge Graph". Under Review.']
  },
  {
    id: 3000016,
    name: '经历',
    equipType: 13,
    label: [
      '经历'
    ],
    equip: {
      $changeHp: -40
    },
    dsc: [
      '1. 微软俱乐部（2017.9 - 2019.6）',
      '· 技术部副部长（2018.9 - 2019.6）',
      '2. 垒球队 & 棒垒球协会（2016.9 - 至今）',
      '· 棒垒球协会嘉定分社副社长（2018.3 - 2019.1）',
      '· 打球和被球打'
    ],
  }
]

const getAllItems = function(baseItems) {
  var allItems = []
  for(let grade = 0; grade <= 3; grade++) {
    for(let item of baseItems) {
      allItems.push({
        id: item.id + 14 * grade,
        name: item.name,
        grade: grade,
        equipType: item.equipType,
        label: item.label,
        equip: {
          $changeHp: item.equip.$changeHp > 0 ? item.equip.$changeHp + (10 * grade)
                     : Math.round(item.equip.$changeHp + grade * 0.2 * Math.abs(item.equip.$changeHp))
        },
        dsc: item.dsc
      })
    }
  }
  return allItems
}

const AllItems = getAllItems(BaseItems)

const ITEM_TABLE = _.concat(Materials, AllItems)

export default ITEM_TABLE