import { PetSpecies, RequestType, ShopUpgrade, ServiceWindowConfig } from './types';

export interface SpeciesData {
  species: PetSpecies;
  emoji: string;
  color: string; // Tailwind bg
  textColor: string; // Tailwind text
  accentBg: string; // Tailwind border
  patienceSpeed: number; // Patience loss rate
  baseDialogue: Record<RequestType, string[]>;
  description: string;
  rarity: 'Common' | 'Uncommon' | 'Rare' | 'Legendary';
}

export const SPECIES_LIST: SpeciesData[] = [
  {
    species: '茶杯史莱姆',
    emoji: '🧪',
    color: 'bg-rose-100 border-rose-300 text-rose-700',
    textColor: 'text-rose-600',
    accentBg: 'bg-rose-50',
    patienceSpeed: 1.8,
    description: '一只散发着野生草莓香气的半透明果冻状微型史莱姆。',
    rarity: 'Common',
    baseDialogue: {
      MEDICAL: [
        "它今天摸起来热乎乎的，整个身体都软趴趴的，连弹跳都没力气了。"
      ],
      GROOMING: [
        "刚刚在沙滩玩了一下午，现在身体里全是小沙粒，亮晶晶的部分都看不见了。"
      ],
      TRAINING: [
        "它最近想参加跳跃比赛，但是每次落地都会摔成一团果冻。"
      ]
    }
  },
  {
    species: '云朵小羊',
    emoji: '☁️',
    color: 'bg-cream-100 border-amber-200 text-amber-800',
    textColor: 'text-amber-700',
    accentBg: 'bg-amber-50',
    patienceSpeed: 1.4,
    description: '一只蓬松可爱的小绵羊，拥有像清晨星云般柔软的棉质毛发。',
    rarity: 'Common',
    baseDialogue: {
      MEDICAL: [
        "它跑过树林之后腿上扎了一根小树枝，现在走路一瘸一拐的。"
      ],
      GROOMING: [
        "这孩子的毛发全打结了，摸起来一点都不蓬松。"
      ],
      TRAINING: [
        "它总说想跳到星星上面去，能不能帮它练习一下？"
      ]
    }
  },
  {
    species: '星宿小兔',
    emoji: '🐇',
    color: 'bg-sky-100 border-indigo-200 text-indigo-700',
    textColor: 'text-indigo-600',
    accentBg: 'bg-indigo-50',
    patienceSpeed: 2.2,
    description: '一只精力充沛的兔子，长着在黑暗中会发光的特殊星空星座耳朵。',
    rarity: 'Uncommon',
    baseDialogue: {
      MEDICAL: [
        "它昨晚钻进荆棘丛后回来一直捂ed耳朵，看起来很难受。"
      ],
      GROOMING: [
        "耳朵上沾满了发光泥巴，怎么擦都擦不干净。"
      ],
      TRAINING: [
        "它想学双重跳跃，可是总是在半空中失去平衡。"
      ]
    }
  },
  {
    species: '抹茶柴犬',
    emoji: '🐕',
    color: 'bg-emerald-100 border-emerald-300 text-emerald-800',
    textColor: 'text-emerald-700',
    accentBg: 'bg-emerald-50',
    patienceSpeed: 1.5,
    description: '一只圆滚滚、活泼快乐的柴犬幼崽，身上散发着淡淡的烤绿茶香气。',
    rarity: 'Common',
    baseDialogue: {
      MEDICAL: [
        "它偷吃了好多奇怪的叶子，现在肚子一直咕噜咕噜叫。"
      ],
      GROOMING: [
        "尾巴毛都塌下来了，完全没有以前圆滚滚的样子。"
      ],
      TRAINING: [
        "每次别人叫它名字，它都会装作没听见。"
      ]
    }
  },
  {
    species: '叶子小猫',
    emoji: '🐱',
    color: 'bg-green-100 border-lime-300 text-teal-800',
    textColor: 'text-teal-700',
    accentBg: 'bg-teal-50',
    patienceSpeed: 1.9,
    description: '一只讨人喜爱的小猫咪，长着小小的薄荷叶翅膀，高兴时会轻轻扇动。',
    rarity: 'Uncommon',
    baseDialogue: {
      MEDICAL: [
        "它今天已经打了十几个喷嚏，翅膀看起来也没什么力气。"
      ],
      GROOMING: [
        "不小心掉进花粉桶里了，现在整只猫都变成金黄色。"
      ],
      TRAINING: [
        "它总是在空中转圈圈，就是没办法稳稳停下来。"
      ]
    }
  },
  {
    species: '余烬幼龙',
    emoji: '🐲',
    color: 'bg-amber-100 border-amber-400 text-orange-900',
    textColor: 'text-orange-700',
    accentBg: 'bg-amber-50',
    patienceSpeed: 1.7,
    description: '一只圆鼓鼓的小幼龙，它的尾巴暖洋洋地闪烁着像烟囱小烟花般的美丽星火。',
    rarity: 'Rare',
    baseDialogue: {
      MEDICAL: [
        "它喝了好多冰水，现在尾巴上的小火苗都快熄灭了。"
      ],
      GROOMING: [
        "鳞片缝里全是火山灰，痒得一直蹭墙。"
      ],
      TRAINING: [
        "它想学精准喷火，但总会把目标旁边的东西一起烧掉。"
      ]
    }
  },
  {
    species: '焦糖狐狸',
    emoji: '🦊',
    color: 'bg-orange-100 border-orange-300 text-orange-800',
    textColor: 'text-orange-700',
    accentBg: 'bg-orange-50',
    patienceSpeed: 2.0,
    description: '拥有像焦糖布丁一样柔软蓬松的尾巴，走路时会散发淡淡奶香味。',
    rarity: 'Uncommon',
    baseDialogue: {
      MEDICAL: [
        "它偷吃了一整袋焦糖饼干，现在抱着肚子不肯动。"
      ],
      GROOMING: [
        "尾巴被糖浆黏成一大团了，看起来乱糟糟的。"
      ],
      TRAINING: [
        "每次训练到一半它就跑去偷零食，完全不专心。"
      ]
    }
  },
  {
    species: '冰晶企鹅',
    emoji: '🐧',
    color: 'bg-cyan-100 border-cyan-300 text-cyan-800',
    textColor: 'text-cyan-700',
    accentBg: 'bg-cyan-50',
    patienceSpeed: 1.6,
    description: '小小的企鹅身体覆盖着会闪光的冰晶羽毛，走路时会留下细小雪花。',
    rarity: 'Rare',
    baseDialogue: {
      MEDICAL: [
        "它滑冰摔倒之后翅膀一直抬不起来。"
      ],
      GROOMING: [
        "羽毛都冻成小冰块了，看起来一点都不闪亮。"
      ],
      TRAINING: [
        "它最近想挑战连续滑行，可总是在转弯的时候摔倒。"
      ]
    }
  },
  {
    species: '月光猫头鹰',
    emoji: '🦉',
    color: 'bg-indigo-100 border-indigo-200 text-indigo-800',
    textColor: 'text-indigo-700',
    accentBg: 'bg-indigo-50',
    patienceSpeed: 1.8,
    description: '圆滚滚的小猫头鹰，羽毛像月光一样柔和，闭眼时会发出微弱银光。',
    rarity: 'Rare',
    baseDialogue: {
      MEDICAL: [
        "昨晚飞行太久，现在眼睛一直酸酸的睁不开。"
      ],
      GROOMING: [
        "羽毛乱成一团，月光照上去一点都不漂亮。"
      ],
      TRAINING: [
        "它想学无声滑翔，但每次落地都会发出好大的声音。"
      ]
    }
  },
  {
    species: '彩虹水母团子',
    emoji: '🌈',
    color: 'bg-pink-100 border-pink-200 text-pink-800',
    textColor: 'text-pink-700',
    accentBg: 'bg-pink-50',
    patienceSpeed: 2.5,
    description: '漂浮在空中的透明小水母，会根据情绪改变颜色，像软绵绵的果冻团子。',
    rarity: 'Legendary',
    baseDialogue: {
      MEDICAL: [
        "它最近颜色一直灰蒙蒙的，看起来很没精神。"
      ],
      GROOMING: [
        "身体外面的透明泡泡层变得浑浊了。"
      ],
      TRAINING: [
        "它总是控制不好漂浮高度，一不小心就撞到天花板。"
      ]
    }
  }
];

export const PET_NAMES = [
  '麦芽', '麻薯', '泡泡', '洒洒', '皮皮', '抹茶', '小叶子',
  '奇奇', '巴纳比', '柚子', '花生', '可可', '小软糖', '华夫饼',
  '酸奶', '小芽', '千代', '海苔', '星海', '烈焰'
];

export const SERVICE_WINDOWS: ServiceWindowConfig[] = [
  {
    id: 'MEDICAL',
    title: '萌宠诊疗室',
    windowName: 'Left', // Will render customized Chinese label
    colorTheme: 'from-emerald-50 to-teal-50 border-emerald-200 shadow-emerald-100/50',
    accentColor: 'text-teal-600 bg-teal-50 border-teal-200',
    description: '薄荷绿的治愈空间，用于检查体温、涂抹舒缓软膏和喂食草本营养片。',
    steps: ['测量温热核心', '涂抹舒缓药膏', '喂食快乐维他命']
  },
  {
    id: 'GROOMING',
    title: '温馨美容沙龙',
    windowName: 'Center',
    colorTheme: 'from-rose-50 to-pink-50 border-rose-200 shadow-rose-100/50',
    accentColor: 'text-rose-600 bg-rose-50 border-rose-200',
    description: '柔粉色的温馨沙龙，提供温暖的泡沫护肤料、打理结块毛发并系上可爱饰带。',
    steps: ['草本泡沫浴', '精细梳理被毛', '系上精美饰带']
  },
  {
    id: 'TRAINING',
    title: '趣味训练广场',
    windowName: 'Right',
    colorTheme: 'from-sky-50 to-amber-50 border-sky-200 shadow-sky-100/50',
    accentColor: 'text-sky-600 bg-sky-50 border-sky-100',
    description: '天蓝色与鹅黄色的练习场地，用于小跨栏跳跃、目标触碰和美味零食训练。',
    steps: ['趣味跨栏练习', '飞扑触碰目标', '奖励美味烤饼']
  }
];

export const INITIAL_UPGRADES: ShopUpgrade[] = [
  {
    id: 'aromatherapy_candle',
    name: '薰衣草魔法熏香',
    cost: 50,
    description: '散发芬芳甜美的平静气息，使来访宠物的最大耐心上限增加 15 点。',
    purchased: false,
    category: 'decor',
    icon: '🕯️'
  },
  {
    id: 'hanging_ivy',
    name: '温馨生态常春藤',
    cost: 85,
    description: '给到店宠物带来大自然的庇佑，使它们的初始耐心值额外提升 10%。',
    purchased: false,
    category: 'decor',
    icon: '🌿'
  },
  {
    id: 'fairy_lights',
    name: '五彩梦幻荧光灯',
    cost: 130,
    description: '给诊所罩上一层奇异的梦幻光环。全方位使诊疗、美容和训练的处理效率提高 25%。',
    purchased: false,
    category: 'atmosphere',
    icon: '✨'
  },
  {
    id: 'plush_carpets',
    name: '松软防滑爪爪地毯',
    cost: 110,
    description: '极其蓬松的编织小地毯，使在等候区大厅排队等候的宠物耐心流失速度降低 30%。',
    purchased: false,
    category: 'decor',
    icon: '🧶'
  },
  {
    id: 'golden_treat_box',
    name: '金尊皇家小肉盒',
    cost: 180,
    description: '在等候区大厅解锁专属美味肉肉选项，随时可以用肉饼零食给任意一只宠物补回 25 点耐心。',
    purchased: false,
    category: 'equipment',
    icon: '🍖'
  }
];

export interface SpecialCaseConfig {
  species: PetSpecies;
  dialogue: string;
  request: RequestType;
  explanation: string;
}

export const MEDIUM_CASES: SpecialCaseConfig[] = [
  {
    species: '茶杯史莱姆',
    dialogue: "“它今天总是缩在茶杯底部不肯弹出来，身上温度冰凉冰凉的，一定是受凉感冒了。”",
    request: 'MEDICAL',
    explanation: "史莱姆体温过低且精神萎靡，符合医疗诊断。"
  },
  {
    species: '云朵小羊',
    dialogue: "“它在泥地里跑去，白白的毛发全都染土变黏了，还有一股泥土味，抱抱都觉得手脏。”",
    request: 'GROOMING',
    explanation: "毛发变脏、充满泥土，需要进行洗浴和美容护理。"
  },
  {
    species: '星宿小兔',
    dialogue: "“它很想在草地上练习优雅地站立和打招呼，可是它只要一兴奋就会在原地乱滚，完全不能安静。”",
    request: 'TRAINING',
    explanation: "日常站立和打招呼需要动作上的行为纠正和专注度训练。"
  },
  {
    species: '抹茶柴犬',
    dialogue: "“这孩子不停地拍耳朵，耳朵红红的而且总是朝一边倾斜，是不是进水并且发炎了啊？”",
    request: 'MEDICAL',
    explanation: "耳朵发红、刺痛，显然是身体发生病变炎症，需要医治。"
  },
  {
    species: '叶子小猫',
    dialogue: "“它不知道掉到什么甜甜的糖水里去，全身的毛发都被糖浆黏在了一块儿，摸起来特别不舒服。”",
    request: 'GROOMING',
    explanation: "被黏液或糖浆糊住，需要美容清洗。"
  },
  {
    species: '余烬幼龙',
    dialogue: "“明天有一场吐微型火星的表演，它每次吐都吐错隔边的木桩上，好需要一次定向训练。”",
    request: 'TRAINING',
    explanation: "练习精准施法与定向吐火，完全属于技能训练范围。"
  },
  {
    species: '焦糖狐狸',
    dialogue: "“它身上全是刺藤小挂钩，走路疼得直哼，我实在不忍心，但又不敢随便硬扯下来。”",
    request: 'MEDICAL',
    explanation: "刺藤挂到身体造成的明显刺痛与外伤，优先级在医疗救治。"
  },
  {
    species: '冰晶企鹅',
    dialogue: "“它在练习溜冰后背上的装饰毛乱成一蓬，它非常爱美，希望能把它梳理得超级威风。”",
    request: 'GROOMING',
    explanation: "属于造型梳理与打扮美容要求。"
  },
  {
    species: '月光猫头鹰',
    dialogue: "“它想学低空夜间侦察，但它总是一飞过去就刮出大风，惊扰整片森林，太缺乏动作控制力了。”",
    request: 'TRAINING',
    explanation: "无声低飞与动作控制属于协调度和行为训练。"
  },
  {
    species: '彩虹水母团子',
    dialogue: "“它刚才在游玩时身上卡了一小截海藻丝，把它好看的半透明晶格都缠住变样了，需要洗香香顺便清洁。”",
    request: 'GROOMING',
    explanation: "清理海藻异物，保持晶格亮丽的外貌美容项目。"
  }
];

export const DIFFICULT_CASES: SpecialCaseConfig[] = [
  {
    species: '叶子小猫',
    dialogue: "“它最近总是不愿意飞，还经常躲在角落里。不过昨天又不小心掉进花粉桶，把翅膀弄得脏兮兮的。”",
    request: 'MEDICAL',
    explanation: "核心问题是身体状态异常导致不愿意飞行，身体健康恢复优先级高于花粉清洁美容！"
  },
  {
    species: '抹茶柴犬',
    dialogue: "“它刚洗完澡，看起来挺干净的，但最近总是乱咬家具，还把我的拖鞋藏起来。”",
    request: 'TRAINING',
    explanation: "美容已经由主人自己完成（很干净），真正影响正常生活的是乱咬家具的坏习惯，需要系统化行为训练！"
  },
  {
    species: '茶杯史莱姆',
    dialogue: "“它最近跳不高了，而且身体里还卡着不少沙子。不过它精神看起来还不错。”",
    request: 'GROOMING',
    explanation: "精神状态完全正常（精神不错），跳不高纯粹是因为身体里堵着沙子增加了自重，核心诉求是清沙美容！"
  },
  {
    species: '余烬幼龙',
    dialogue: "“尾巴火苗比平时小很多，而且喷火总是喷歪。我不知道它是生病了还是练习太少。”",
    request: 'MEDICAL',
    explanation: "尾巴核心火苗变得微弱，是自身火源熄灭或虚弱的发热疾病，火焰异常在幼龙学中属于生病，需要医治！"
  },
  {
    species: '月光猫头鹰',
    dialogue: "“羽毛有点凌乱，不过更让我担心的是它最近总撞到树枝，飞行好像不太稳定。”",
    request: 'TRAINING',
    explanation: "羽毛微凌乱不影响大局，总是撞树说明空间感和滑翔平衡掌握欠佳，当以飞行能力相关的障碍训练为主！"
  },
  {
    species: '冰晶企鹅',
    dialogue: "“它滑冰回来后羽毛结冰了，而且走路时总说翅膀有点酸。”",
    request: 'MEDICAL',
    explanation: "羽毛结冰可以用身体温度暖化，但滑滑梯摔倒带来的翅膀酸胀疼痛说明有软组织损伤，应优先安排医治！"
  },
  {
    species: '焦糖狐狸',
    dialogue: "“尾巴被糖浆黏住了，不过它一直抱着肚子哼哼唧唧，看起来不太舒服。”",
    request: 'MEDICAL',
    explanation: "糖浆黏尾仅仅是轻微的脏，而抱着肚子哼哼痛苦，表示可能偷吃变质糖浆导致了肠胃炎，肚子不适首选医治！"
  },
  {
    species: '云朵小羊',
    dialogue: "“毛发有点打结，但它最近总是摔倒，跨不过平时很轻松的小障碍。”",
    request: 'TRAINING',
    explanation: "毛发打结是小羊常态，经常平地摔跤以及跳不过障碍反映出平衡与跃障技巧退化，需要腿部动作指导训练！"
  },
  {
    species: '彩虹水母团子',
    dialogue: "“颜色有点暗淡，而且最近总是控制不好漂浮高度，一会儿撞天花板一会儿掉下来。”",
    request: 'TRAINING',
    explanation: "水母团子颜色本身就多变（微暗淡非重疾），控制不了漂浮浮力、撞屋顶，才是极度需要重心滑行练习的训练指标！"
  },
  {
    species: '星宿小兔',
    dialogue: "“它探险回来后耳朵上沾满泥巴，最近跳跃时还经常落地不稳。我本来想帮它洗洗，但总觉得哪里怪怪的。”",
    request: 'MEDICAL',
    explanation: "落地不稳是耳内星宿平衡器受损或荆棘丛扎伤导致的平衡失调，极具误导性（泥巴纯属路过），应优先去医学检查！"
  }
];

