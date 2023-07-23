import type { GameItem } from "~/types";

export const MATERIAL_TABLE: Array<GameItem> = [
  {
    id: 3000001,
    name: "印着龙爪的信",
    pile: true,
    num: 1,
    dsc: [
      "信的内容：",
      "· 我是龙，世界上坠帅的龙。",
      "· 我把邹笑寒的简历撕碎了，把碎片扔到了世界各地。",
      "· 我还揍了她一顿，现在她失忆了，所以不能重新写一份简历出来。",
      "· 我真强，哈哈哈哈哈哈哈哈哈。",
      "· 想看简历吗，那就去找那些简历碎片吧，邹笑寒说集齐所有碎片就能让她想起来她是谁。",
      "· 但我觉得她永远都想不起来了，毕竟她看上去好傻。",
      "—— 世界上坠帅的龙"
    ]
  },
  {
    id: 3000002,
    name: "氪金吗朋友",
    pile: true,
    num: 1,
    dsc: ["氪金两亿即可获得所有简历碎片", "扫码付款："],
    img: ["/images/wechat.jpg"]
  },
  {
    id: 3000003,
    name: "关于",
    pile: true,
    num: 1,
    dsc: [
      "· 技术栈：Vue 3 + Vite + Pinia + Typescript + UnoCSS",
      "· 代码托管地址：github.com/Renovamen/midgard"
    ],
    link: {
      text: "点击物品查看源码",
      url: "https://github.com/Renovamen/midgard"
    }
  }
];

const BASE_RESUME_ITEMS_TABLE: Array<GameItem> = [
  {
    id: 3000004,
    name: "基本个人信息",
    equipType: 0,
    equip: {
      changeHp: -60
    },
    dsc: [
      "姓名：邹笑寒",
      "邮箱：renovamenzxh@foxmail.com",
      "Github：Renovamen",
      "博客：zxh.io",
      "知乎：people/chao-neng-gui-su"
    ]
  },
  {
    id: 3000005,
    name: "教育经历",
    equipType: 1,
    equip: {
      changeHp: -85
    },
    dsc: [
      "· 宾夕法尼亚州立大学，计算机科学与工程，博士（2023.08 - 2028.05）",
      "· 波士顿大学，计算机科学，理学硕士（2021.09 - 2023.01）",
      "· 同济大学，软件工程，工学学士（2016.09 - 2020.07）"
    ]
  },
  {
    id: 3000006,
    name: "论文",
    equipType: 2,
    equip: {
      changeHp: -50
    },
    dsc: [
      '· "TokenFlow: Rethinking Fine-grained Cross-modal Alignment in Vision-Language Retrieval". 2022. Xiaohan Zou, Changqiao Wu, Lele Cheng, Zhongyuan Wang.',
      '· " Efficient Meta-Learning for Continual Learning with Taylor Expansion Approximation". IJCNN 2022. Xiaohan Zou, Tong Lin.',
      '· "To be an Artist: Automatic Generation on Food Image Aesthetic Captioning". ICTAI 2020. Xiaohan Zou, Cheng Lin, Yinjia Zhang, and Qinpei Zhao.',
      '· "A Survey on Application of Knowledge Graph". CCEAI 2020. Xiaohan Zou.'
    ],
    link: {
      text: "点击物品查看 Google Scholar",
      url: "https://scholar.google.com/citations?user=RuW6xgMAAAAJ"
    }
  },
  {
    id: 3000007,
    name: "实习",
    equipType: 3,
    equip: {
      changeHp: -80
    },
    dsc: [
      "工业界：",
      "· 2021.07 - 2022.07：多模态算法实习生，快手",
      "· 2020.10 - 2021.06：软件开发实习生，中国电子科技集团",
      "· 2019.10 - 2020.05：游戏开发实习生，上海伯拉乐文化科技有限公司",
      "高校：",
      "· 2022.09 - 2022.12：波士顿大学（导师：Bryan Plummer) ",
      "· 2020.09 - 2022.01：北京大学（导师：Tong Lin) ",
      "· 2020.03 - 2020.06：同济大学（导师：Qinpei Zhao) ",
      "· 2018.09 - 2019.06：同济大学（导师：Qingfeng Du) ",
      "· 2018.07 - 2018.08：北京大学（导师：Tong Lin) "
    ]
  },
  {
    id: 3000008,
    name: "灵活持续学习",
    equipType: 4,
    equip: {
      changeHp: 5
    },
    dsc: [
      "可扩展、参数高效的持续学习方法：",
      "· 在指定任意参数数量、且不保存旧任务数据的情况下，实现了零遗忘",
      "· 学习了一些共享的权重模板，每个 task-specific 的模型会由这些权重模板进行线性组合而成",
      "· 性能优于绝大多数最新的工作，且使用的参数数量仅为它们的五分之一"
    ]
  },
  {
    id: 3000009,
    name: "快速持续学习",
    equipType: 5,
    equip: {
      changeHp: -200
    },
    dsc: [
      "快速的基于元学习的持续学习方法：",
      "\xa0· 基于泰勒展开，设计了一种高效的神经网络参数重要性计算方法",
      "\xa0· 提出了一种快速的基于元学习的持续学习算法，它估计出了 meta-update 时的梯度的闭式解，从而避免了计算海森矩阵",
      "\xa0· 在多个基准数据集上的性能超过了 SoTA 方法，且训练时间更短"
    ],
    link: {
      text: "点击物品查看论文",
      url: "https://arxiv.org/abs/2210.00713"
    }
  },
  {
    id: 3000010,
    name: "多模态检索",
    equipType: 6,
    equip: {
      changeHp: -30
    },
    dsc: [
      "细粒度视觉-文本学习：",
      "\xa0· 为细粒度跨膜态语义匹配提出了一种模型无关的新范式，并用该范式解释了一些近期的工作",
      "\xa0· 提出了一种细粒度的视频-文本检索的新方法，该方法仅修改了相似度计算函数，就达到了与有着复杂模型设计的 SoTA 方法相当的性能"
    ],
    link: {
      text: "点击物品查看论文",
      url: "http://arxiv.org/abs/2209.13822"
    }
  },
  {
    id: 3000011,
    name: "图像美学描述",
    equipType: 7,
    equip: {
      changeHp: 5
    },
    dsc: [
      "为食物图像自动生成美学层面的文字评价：",
      "\xa0· 提出了一种新颖的模型来为食物图片生成全面的美学评价，由两个模块组成：一个模块用于生成单个美学角度的评价，另一个模块对来自所有角度的评价进行无监督文本摘要",
      "\xa0· 设计了一种受 TF-IDF 方法启发的图像美学描述文本清洗策略，为该新任务构建了一个数据集",
      "\xa0· 提出了两种新的客观评估指标，用于评估模型生成的描述的新颖性和多样性",
      "\xa0· 提出的方法在生成句子的多样性、新颖性和连贯性上都优于基线模型和现有方法"
    ],
    link: {
      text: "点击物品查看论文",
      url: "https://zxh.io/files/papers/ictai2020/food-iac.pdf"
    }
  },
  {
    id: 3000012,
    name: "机器翻译",
    equipType: 8,
    equip: {
      changeHp: 5
    },
    dsc: [
      "利用结构对偶性来进行半监督机器翻译：",
      "\xa0· 提出了一个基于共享隐空间的对偶学习框架，利用神经机器翻译模型的结构对偶性来同时提高双向任务的性能",
      "\xa0· 基于传统的序列到序列的神经机器翻译模型，利用不同方向的翻译器的编码器和解码器组建了额外的重构器，从而利用无标签数据",
      "\xa0· 在数据集 IWSLT'15（英语-越南语）和 WMT'14（英语-德语）上相比基线方法取得了 1.0 - 2.9 个 BLEU 值的性能提升，提升在成对数据非常少的时候尤为明显"
    ]
  },
  {
    id: 3000013,
    name: "深度学习框架",
    equipType: 9,
    equip: {
      changeHp: -60
    },
    dsc: [
      "Flint - 使用 Numpy 手写深度学习框架：",
      "\xa0· 使用纯 Numpy 实现了自动微分引擎（支持 19 种操作）",
      "\xa0· 实现了线性、卷积、池化、Flatten、RNN、Dropout 和 BatchNorm 层，6 种优化器，4 种损失函数，3 种激活函数，5 种初始化器和数据加载模块",
      "\xa0· 编写了详细的文档和全面的单元测试用例"
    ],
    link: {
      text: "点击物品查看代码",
      url: "https://github.com/Renovamen/flint"
    }
  },
  {
    id: 3000014,
    name: "核心课程",
    equipType: 10,
    equip: {
      changeHp: -75
    },
    dsc: [
      "机器学习",
      "图像与视频计算",
      "密码学",
      "概率论",
      "线性代数",
      "高等数学",
      "数据结构",
      "算法设计与分析",
      "数据库原理与应用",
      "操作系统",
      "编译原理",
      "分布式计算",
      "... 等"
    ]
  },
  {
    id: 3000015,
    name: "技能树",
    equipType: 11,
    equip: {
      changeHp: -90
    },
    dsc: [
      "· 编程语言：Python、JavaScript/TypeScript、HTML/CSS、Java、C/C++",
      "· 语言：中文（母语）、英文（托福 106）",
      "· 工具与框架： Git、PyTorch、Keras、Linux、Vue、React、Django、LaTeX"
    ]
  },
  {
    id: 3000016,
    name: "兴趣",
    equipType: 12,
    equip: {
      changeHp: -60
    },
    dsc: [
      "· 研究兴趣：视觉-语言学习、视频模型、机器学习",
      "· 其他兴趣：游戏、吃、睡、猫、狗、鹦鹉"
    ]
  },
  {
    id: 3000017,
    name: "其他经历",
    equipType: 13,
    equip: {
      changeHp: -40
    },
    dsc: [
      "1. 2017.09 - 2019.06：同济大学微软俱乐部，技术部副部长",
      "2. 2018.03 - 2019.01：同济大学棒垒球协会，嘉定分会副会长",
      "3. 2016.09 - 2019.06：同济大学垒球队"
    ]
  }
];

const generateResumeItems = (items: Array<GameItem>) => {
  const allItems = [] as Array<GameItem>;

  for (let grade = 0; grade <= 3; grade++) {
    items.forEach((item) => {
      const changeHp = item.equip?.changeHp || 0;

      allItems.push({
        id: item.id + 14 * grade,
        name: item.name,
        grade,
        equipType: item.equipType,
        equip: {
          changeHp:
            changeHp > 0
              ? changeHp + 10 * grade
              : Math.round(changeHp - grade * 0.2 * changeHp)
        },
        dsc: item.dsc,
        link: item.link
      });
    });
  }

  return allItems;
};

export const RESUME_ITEMS_TABLE = generateResumeItems(BASE_RESUME_ITEMS_TABLE);

export const ITEM_TABLE = MATERIAL_TABLE.concat(RESUME_ITEMS_TABLE);
