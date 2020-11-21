const MATERIAL_TABLE = [
  {
    id: 3000001,
    name: '印着龙爪的信',
    pile: true,
    label: ['提示'],
    num: 1,
    dsc: [
      '信的内容：',
      '· 我是龙，世界上坠帅的龙。',
      '· 我把邹笑寒的简历撕碎了，把碎片扔到了世界各地。',
      '· 我还揍了她一顿，现在她失忆了，所以不能重新写一份简历出来。',
      '· 我真强，哈哈哈哈哈哈哈哈哈。',
      '· 想看简历吗，那就去找那些简历碎片吧，邹笑寒说集齐所有碎片就能让她想起来她是谁。',
      '· 但我觉得她永远都想不起来了，毕竟她看上去好傻。',
      '—— 世界上坠帅的龙'
    ]
  },
  {
    id: 3000002,
    name: '氪金吗朋友',
    pile: true,
    label: ['提示'],
    num: 1,
    dsc: [
      '氪金两亿即可获得所有简历碎片',
      '扫码付款：'
    ],
    img: [
      require('assets/wechat.jpg')
    ]
  },
  {
    id: 3000003,
    name: '关于',
    pile: true,
    label: ['提示'],
    num: 1,
    dsc: [
      '代码托管地址：github.com/Renovamen/midgard'
    ],
    link: {
      text: '点击物品查看源码',
      url: 'https://github.com/Renovamen/midgard'
    }
  }
]

const baseResumeItems = [
  {
    id: 3000004,
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
      '电话：(+86) 18321968867',
      '邮箱：xiaohan.zou@foxmail.com',
      'Facebook：renovamen.zou',
      'Github：Renovamen',
      '博客：renovamen.ink'
    ]
  },
  {
    id: 3000005,
    name: '教育经历',
    equipType: 1,
    label: [
      '教育'
    ],
    equip: {
      $changeHp: -85,
    },
    dsc: [
      '同济大学，软件工程，工学学士',
      '2016.09 - 2020.07'
    ]
  },
  {
    id: 3000006,
    name: '核心课程',
    equipType: 2,
    label: [
      '课程'
    ],
    equip: {
      $changeHp: -75,
    },
    dsc: [
      '概率论',
      '线性代数',
      '高等数学',
      '数据结构',
      '算法设计与分析',
      '数据库原理与应用',
      '操作系统',
      '编译原理',
      '面向对象程序设计',
      'Web 应用与开发',
      'Web 服务与 SOA',
      '分布式计算',
      '... 等'
    ]
  },
  {
    id: 3000007,
    name: '技能树',
    equipType: 3,
    label: [
      '技能'
    ],
    equip: {
      $changeHp: -90,
    },
    dsc: [
      '· 编程语言：Python、JavaScript、HTML/CSS、C/C++、Java、MATLAB',
      '· 语言：中文（重庆话和普通话，母语）、英文（四六级、托福 106、GRE 322）',
      '· 工具与框架： Git、PyTorch、Keras、Linux、Vue、Django、LaTeX'
    ]
  },
  {
    id: 3000008,
    name: '兴趣',
    equipType: 4,
    label: [
      '兴趣'
    ],
    equip: {
      $changeHp: -60,
    },
    dsc: [
      '· 研究兴趣：',
      '\xa0\xa0\xa0· Continual Learning（持续学习）',
      '\xa0\xa0\xa0· Meta Learning（元学习）',
      '\xa0\xa0\xa0· Nature Language Processing（自然语言处理）',
      '· 其他兴趣：游戏、吃、睡',
      '· 毫无兴趣：鹦鹉'
    ]
  },
  {
    id: 3000009,
    name: '元学习',
    equipType: 5,
    label: [
      '研究1'
    ],
    equip: {
      $changeHp: -200,
    },
    dsc: [
      '正在北京大学进行的工作：',
      '\xa0· 开发基于 PyTorch 的元学习和持续学习工具包，包括主流基准数据集的数据加载模块和对前沿算法的复现；',
      '\xa0· 进行元学习和持续学习的相关研究。'
    ]
  },
  {
    id: 3000010,
    name: '图像美感描述',
    equipType: 6,
    label: [
      '研究2'
    ],
    equip: {
      $changeHp: 5
    },
    dsc: [
      '为食物图像自动生成美学层面的文字评价，该工作已被 ICTAI 接收：',
      '\xa0· 提出了一种新颖的模型来为食物图片生成全面的美学评价，该模型由两个模块组成，一个模块用于生成单个美学角度的评价，而另一个模块会对来自所有角度的评价进行无监督文本摘要；',
      '\xa0· 为这个新任务构建了一个数据集，该数据集中每张食物图片都附带来自最多六个美学角度的描述；',
      '\xa0· 提出了两种新的客观评估指标，用于评估模型生成的描述的新颖性和多样性；',
      '\xa0· 在上述数据集上的实验显示，我们的方法在生成句子的多样性、新颖性和连贯性上都优于基线模型和现有方法。'
    ],
    link: {
      text: '点击物品查看论文',
      url: 'https://renovamen.ink/files/papers/ictai2020/food-iac.pdf'
    }
  },
  {
    id: 3000011,
    name: '故障诊断系统',
    equipType: 7,
    label: [
      '研究3'
    ],
    equip: {
      $changeHp: -30
    },
    dsc: [
      '为微服务架构构建故障诊断系统：',
      '\xa0· 根据当前时刻监测到的云原生平台的性能指标，动态地用 PC 算法构建出因果图。图中节点表示每个微服务，有向边表示微服务之间的因果关系；',
      '\xa0· 当出现异常时，利用随机漫步算法在因果图上搜索出可能引发该异常的故障服务；',
      '\xa0· 故障注入实验显示，在不需要任何专家知识的情况下，相比传统方法，我们的方法能达到更高的准确率和更快的诊断速度。'
    ]
  },
  {
    id: 3000012,
    name: '机器翻译',
    equipType: 8,
    label: [
      '研究4'
    ],
    equip: {
      $changeHp: 5
    },
    dsc: [
      '利用结构对偶性来进行半监督机器翻译，在北京大学期间完成的工作：',
      '\xa0· 提出了一个基于共享隐空间的对偶学习框架，利用机器翻译模型的结构对偶性来同时提高双向任务的性能；',
      '\xa0· 基于传统的序列到序列的神经机器翻译模型，利用不同方向的翻译器的编码器和解码器组建了额外的重构器，从而利用无标签数据；',
      "\xa0· 在数据集 IWSLT'15（英语-越南语）和 WMT'14（英语-德语）上的实验显示，我们的方法相比基线方法取得了 1.0 - 2.9 个 BLEU 值的性能提升。提升在成对数据非常少的时候尤为明显。"
    ]
  },
  {
    id: 3000013,
    name: '语音情感识别',
    equipType: 9,
    label: [
      '项目1'
    ],
    equip: {
      $changeHp: 5
    },
    dsc: [
      '· 尝试了多种特征提取方法并构建了多个语音情感识别模型；',
      '· 我们的模型在 CASIA（汉语）、EMODB（德语）、SAVEE（英语）、RAVDESS（英语）四个基线数据集上，相比基线模型有了 7.2 - 12.2 的准确率提升；',
      '· 该项目已在 Github 上开源，截至 11/2020 已获得 130 个 star。'
    ],
    link: {
      text: '点击物品查看源码',
      url: 'https://github.com/Renovamen/Speech-Emotion-Recognition'
    }
  },
  {
    id: 3000014,
    name: '聊天机器人',
    equipType: 10,
    label: [
      '项目2'
    ],
    equip: {
      $changeHp: -60
    },
    dsc: [
      '在麻省理工学院期间完成的工作（远程）：',
      '\xa0· 利用 RasaNLU 搭建了一个能识别用户意图并提供股票和天气信息的聊天机器人；',
      '\xa0· 使用 spaCy 和 scikit-learn 实现了基于 SVM 的意图分类和命名实体识别模型；',
      '\xa0· 实现了基于有限状态自动机的多轮问询和状态切换；',
      '\xa0· 将机器人部署到了微信和 QQ 上，以获取更好的交互体验。'
    ]
  },
  {
    id: 3000015,
    name: '论文',
    equipType: 11,
    label: [
      '论文'
    ],
    equip: {
      $changeHp: -50
    },
    dsc: [
      '· Xiaohan Zou, Cheng Lin, Yinjia Zhang, and Qinpei Zhao. "To be an Artist: Automatic Generation on Food Image Aesthetic Captioning". ICTAI 2020.',
      '· Xiaohan Zou. "A Survey on Application of Knowledge Graph". CCEAI 2020.'
    ]
  },
  {
    id: 3000016,
    name: '实习',
    equipType: 12,
    label: [
      '实习'
    ],
    equip: {
      $changeHp: -80
    },
    dsc: [
      '· 2020.10 - 至今：软件开发实习生，中国电子科技集团',
      '· 2020.09 - 至今：研究助理，北京大学',
      '· 2019.10 - 2020.5：游戏开发实习生，上海伯拉乐文化科技有限公司',
    ]
  },
  {
    id: 3000017,
    name: '其他经历',
    equipType: 13,
    label: [
      '经历'
    ],
    equip: {
      $changeHp: -40
    },
    dsc: [
      '1. 2017.09 - 2019.06：同济大学微软俱乐部，技术部副部长',
      '2. 2018.03 - 2019.01：同济大学棒垒球协会，嘉定分会副会长',
      '3. 2016.09 - 2019.06：同济大学垒球队'
    ],
  }
]

const getResumeItems = function(baseItems) {
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
        dsc: item.dsc,
        link: item.link
      })
    }
  }
  return allItems
}

const RESUME_ITEMS_TABLE = getResumeItems(baseResumeItems)

const ITEM_TABLE = _.concat(MATERIAL_TABLE, RESUME_ITEMS_TABLE)

export { ITEM_TABLE, MATERIAL_TABLE, RESUME_ITEMS_TABLE }