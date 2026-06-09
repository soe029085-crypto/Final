import { PetSpecies, RequestType } from './types';

export type Language = 'en' | 'zh' | 'ko';

export const UI_TRANSLATIONS = {
  en: {
    title: 'Fantasy Pet Clinic',
    subtitle: 'Where mystical creatures find healing and happiness',
    startBusiness: 'Start Business',
    selectLanguage: 'Language Selector',
    day: 'Day',
    satisfaction: 'Satisfaction',
    coins: 'Coins',
    shop: 'Shop',
    journal: 'Journal',
    tutorial: 'Tutorial',
    reset: 'Reset',
    mute: 'Mute',
    unmute: 'Unmute',
    lobbyCapacity: 'Lobby Seats',
    lobbyFullAlert: 'Lobby is full! Dispatch pets to clear seats.',
    diagnoseGuide: '💡 Diagnostic Tip: Listen closely to their mumblings to deduce their true needs, then assign them to the correct room.',
    roomBusy: '❌ Room is currently busy!',
    unlockedAtDay: 'Unlocked on Day',
    rareUnit: 'Rarity',
    petSpecies: 'Species',
    timesServed: 'Times Healed',
    close: 'Close',
    back: 'Back',
    confirm: 'Confirm',
    cancel: 'Cancel',
    buyDecor: 'Buy & Place Upgrade',
    notEnoughCoins: 'Insufficient Coins',
    purchased: 'Purchased',
    facilityUpgrades: 'Room Level Upgrades (Hearts 💖)',
    decorShop: 'Boutique Store Decoration (Coins 🪙)',
    availableHearts: 'Available Satisfaction',
    availableCoins: 'Available Coins',
    maxLevelReached: '✨ Max Level (Lv3) Reached 💐',
    upgradeTo: 'Upgrade to',
    cost: 'Cost',
    currentPower: 'Current',
    nextPowerUnlock: 'Unlocking next',
    freeDiagnosisUsed: '🔮 Level 3 Perk! Free Rediagnosis used for today!',
    wrongRoomDismiss: 'Dismiss Pet',
    checkoutPet: 'Complete Therapy',
    treatBtn: 'Send to Treatment 🩺',
    groomBtn: 'Send to Grooming ✂️',
    trainBtn: 'Send to Training 🎓',
    aiDialogueHint: '🧠 AI Diagnosis Clue:',
    aiClueMedical: 'According to thermal vital scan: symptoms indicate fever or physical illness. Suggest: Send to Treatment 🩺!',
    aiClueGrooming: 'Optical inspection shows healthy vitals but severe fur tangles or mud. Suggest: Send to Grooming ✂️!',
    aiClueTraining: 'Posture Capture: highly energetic but lacks control, tripped or clumsy. Suggest: Send to Training 🎓!',
    startTitle: 'Fantasy Pet Clinic',
    startWelcome: 'Welcome back, Head Doctor',
    startGameBtn: 'Open the Clinic 🐾',
    helpBasicTab: '📖 Outpatients',
    helpUpgradeTab: '💖 Department Upgrade',
    helpSpecialTab: '🪙 Magic Upgrades',
    tapToInteract: 'Tap to soothe and progress...',
    allStepsDone: 'All therapies successfully finished!',
    servedCountText: 'Animals Served',
    achievementJournal: 'Mystical Companion Journal',
    restartWarning: 'Are you sure you want to reset all game progress?',
    closeTutorial: 'Understand',
    tutorialBannerText: 'Read "Tutorial" for clinical instructions and room upgrade bonuses!'
  },
  zh: {
    title: '幻想诊断所',
    subtitle: '奇幻萌宠的温暖疗愈空间',
    startBusiness: '开始开始营业',
    selectLanguage: '语言选择',
    day: '天数',
    satisfaction: '满意度',
    coins: '金币',
    shop: '升级中心',
    journal: '科学图鉴',
    tutorial: '营业指南',
    reset: '重置',
    mute: '静音',
    unmute: '恢复声音',
    lobbyCapacity: '大厅席位客满度',
    lobbyFullAlert: '等候区大厅全满！请尽快下达科室指令分流！',
    diagnoseGuide: '💡 诊断指南: 请仔细阅读每只小动物说的话（碎碎念），判断它们的真实诉求，再按决策按钮分流到对应科室。',
    roomBusy: '❌ 该科室目前正忙！',
    unlockedAtDay: '解锁天数：第',
    rareUnit: '稀有度',
    petSpecies: '萌宠品种',
    timesServed: '痊愈来客数',
    close: '关闭',
    back: '返回',
    confirm: '确认',
    cancel: '取消',
    buyDecor: '购买并部署升级',
    notEnoughCoins: '金币余额不足',
    purchased: '已激活',
    facilityUpgrades: '科室等级升级 (爱心 💖)',
    decorShop: '精品装饰百货 (金币 🪙)',
    availableHearts: '可用爱心满意度',
    availableCoins: '可用游戏金币',
    maxLevelReached: '✨ 设施水平已臻顶奢极满级 (Lv3) 💐',
    upgradeTo: '升至',
    cost: '花费',
    currentPower: '当前',
    nextPowerUnlock: '即将解锁',
    freeDiagnosisUsed: '🔮 医疗中心Lv3福利！诊断已被打回，已为你免费恢复 80% 耐心并重新护送回大厅！',
    wrongRoomDismiss: '退院退案处理',
    checkoutPet: '办理出院手续',
    treatBtn: '护送诊疗 🩺',
    groomBtn: '护送美容 ✂️',
    trainBtn: '护送训练 🎓',
    aiDialogueHint: '🧠 魔法AI会诊线索：',
    aiClueMedical: '据魔法生命体征红外扫描：其异常倾向局部病痛或全身乏力发热。建议指派「护送诊疗 🩺」！',
    aiClueGrooming: '据外表光学反射筛查：生命活力完美，但外物粘连严重、亮泽度下降或有泥污。建议指派「护送美容 ✂️」！',
    aiClueTraining: '据体态动作习惯捕捉：精神饱满且干净，但失手滑落摔倒、渴望技巧精湛。建议指派「护送训练 🎓」！',
    startTitle: '幻想诊断所',
    startWelcome: '欢迎回来，主治兼主理人医生',
    startGameBtn: '开门开启营业 🐾',
    helpBasicTab: '📖 基础门诊',
    helpUpgradeTab: '💖 科室升级',
    helpSpecialTab: '🪙 精品百货',
    tapToInteract: '轻敲触摸进行理疗...',
    allStepsDone: '所有理疗项目已顺利完成！',
    servedCountText: '痊愈出院萌宠总数',
    achievementJournal: '幻想萌宠万事科学图鉴',
    restartWarning: '您确定要清空全店经营进度重新开始吗？',
    closeTutorial: '收起',
    tutorialBannerText: '如果你遇到困难，可随时点击右上角“营业指南”查看科室升级效果与诊断教学！'
  },
  ko: {
    title: '환상 진단소',
    subtitle: '신비롭고 귀여운 동물들의 치유 공간',
    startBusiness: '영업 시작',
    selectLanguage: '언어 선택',
    day: '일자',
    satisfaction: '만족도',
    coins: '코인',
    shop: '상점',
    journal: '도감',
    tutorial: '플레이 가이드',
    reset: '리셋',
    mute: '음소거',
    unmute: '소리 켜기',
    lobbyCapacity: '대기석 현황',
    lobbyFullAlert: '대기실이 꽉 찼습니다! 빨리 진료실로 이송하세요.',
    diagnoseGuide: '💡 진단 팁: 동물이 중얼거리는 말을 읽고 치료, 미용, 훈련 중 필요한 것을 맞게 배치하세요.',
    roomBusy: '❌ 현재 방이 진료 중입니다!',
    unlockedAtDay: '해금 조건: Day',
    rareUnit: '등급',
    petSpecies: '동물 종류',
    timesServed: '치료 횟수',
    close: '닫기',
    back: '뒤로가기',
    confirm: '확인',
    cancel: '취소',
    buyDecor: '업그레이드 활성화',
    notEnoughCoins: '코인이 부족합니다',
    purchased: '활성화됨',
    facilityUpgrades: '방 단계 업그레이드 (만족도 💖)',
    decorShop: '부티크 매장 장식 (코인 🪙)',
    availableHearts: '보유 만족도',
    availableCoins: '보유 게임 코인',
    maxLevelReached: '✨ 최고 단계(Lv3)를 달성했습니다 💐',
    upgradeTo: '승급',
    cost: '비용',
    currentPower: '현재 상태',
    nextPowerUnlock: '다음 단계 예고',
    freeDiagnosisUsed: '🔮 레벨 3 혜택! 잘못된 배치를 물려 대기실로 안전히 복귀시켰습니다! (하루 1회)',
    wrongRoomDismiss: '퇴원 처리',
    checkoutPet: '퇴원 정산',
    treatBtn: '진료실 이송 🩺',
    groomBtn: '미용실 이송 ✂️',
    trainBtn: '훈련장 이송 🎓',
    aiDialogueHint: '🧠 마법 AI 회진 단서:',
    aiClueMedical: '마법 생체 적외선 스캔: 발열 및 국소 통증이 감지됩니다. 권장: [진료실 이송 🩺]!',
    aiClueGrooming: '외관 광학 검사: 생체 수치는 정상이나 모발이 엉켰거나 점막 이물질이 많습니다. 권장: [미용실 이송 ✂️]!',
    aiClueTraining: '모션 캡처: 활력은 넘치나 균형 감각이 부족하여 넘어짐. 권장: [훈련장 이송 🎓]!',
    startTitle: '환상 진단소',
    startWelcome: '어서 오세요, 원장선생님',
    startGameBtn: '진료소 열기 🐾',
    helpBasicTab: '📖 외래 진료',
    helpUpgradeTab: '💖 부서 업그레이드',
    helpSpecialTab: '🪙 마법 가구',
    tapToInteract: '가볍게 눌러 교감 치료...',
    allStepsDone: '모든 치료 프로세스가 원활히 완료되었습니다!',
    servedCountText: '동물 누적 치료 수',
    achievementJournal: '환상 동물 도감',
    restartWarning: '모든 게임 기록을 초기화하시겠습니까?',
    closeTutorial: '닫기',
    tutorialBannerText: '진료가 어렵다면 우측 상단의 [가이드] 버튼을 눌러 레벨업 보너스와 진단 정보를 확인해 보세요!'
  }
};

export const SPECIES_TRANSLATIONS: Record<PetSpecies, Record<Language, string>> = {
  '茶杯史莱姆': {
    en: 'Teacup Slime',
    zh: '茶杯史莱姆',
    ko: '찻잔 슬라임'
  },
  '云朵小羊': {
    en: 'Cloudy Lamb',
    zh: '云朵小羊',
    ko: '구름 아기양'
  },
  '星宿小兔': {
    en: 'Astro Bunny',
    zh: '星宿小兔',
    ko: '별자리 아기토끼'
  },
  '抹茶柴犬': {
    en: 'Matcha Shiba',
    zh: '抹茶柴犬',
    ko: '말차 시바견'
  },
  '叶子小猫': {
    en: 'Leafy Kitten',
    zh: '叶子小猫',
    ko: '나뭇잎 아기고양이'
  },
  '余烬幼龙': {
    en: 'Ember Drake',
    zh: '余烬幼龙',
    ko: '불씨 아기드래곤'
  },
  '焦糖狐狸': {
    en: 'Caramel Fox',
    zh: '焦糖狐狸',
    ko: '카라멜 아기여우'
  },
  '冰晶企鹅': {
    en: 'Ice Crystal Penguin',
    zh: '冰晶企鹅',
    ko: '빙정 아기펭귄'
  },
  '月光猫头鹰': {
    en: 'Moonlight Owl',
    zh: '月光猫头鹰',
    ko: '달빛 부엉이'
  },
  '彩虹水母团子': {
    en: 'Rainbow Jellyfish',
    zh: '彩虹水母团子',
    ko: '무지개 해파리 경단'
  }
};

export const SPECIES_DESC_TRANSLATIONS: Record<PetSpecies, Record<Language, string>> = {
  '茶杯史莱姆': {
    en: 'A translucent, jelly-like miniature slime that naturally smells like wild strawberries.',
    zh: '一只散发着野生草莓香气的半透明果冻状微型史莱姆。',
    ko: '야생 딸기 향기가 뿜어져 나오는 반투명 푸딩 형상의 초소형 슬라임.'
  },
  '云朵小羊': {
    en: 'A fluffy, soft lamb covered in cotton wool that feels like light morning nebulae.',
    zh: '一只蓬松可爱的小绵羊，拥有像清晨星云般柔软的棉质毛发。',
    ko: '이른 아침의 구름 한 조각처럼 풍성하고 부드러운 솜털로 둘러싸인 아기양.'
  },
  '星宿小兔': {
    en: 'An energetic rabbit featuring mystical starry-ear patterns that emit soft light in the pitch dark.',
    zh: '一只精力充沛的兔子，长着在黑暗中会发光的特殊星空星座耳朵。',
    ko: '우주의 별자리가 귀에 새겨져 있어 깊은 밤 은은하게 주위를 밝혀주는 어여쁜 아기토끼.'
  },
  '抹茶柴犬': {
    en: 'A round, incredibly happy Shiba-Inu puppy smelling like sweet, toasted powdered green tea.',
    zh: '一只圆滚滚、活泼快乐的柴犬幼崽，身上散发着淡淡的烤绿茶香气。',
    ko: '동글동글 활기가 가득 차 있으며 은은한 말차 라떼 향을 풍기는 초특급 귀요미 시바견.'
  },
  '叶子小猫': {
    en: 'A sweet leafy kitten adorned with tiny mint-leaf wings that flutter joyously when happy.',
    zh: '一只讨人喜爱的小猫咪，长着小小的薄荷叶翅膀，高兴时会轻轻扇动。',
    ko: '기분이 좋아지면 민트허브 날개를 꼬물거리며 파닥이는 귀여운 새끼고양이.'
  },
  '余烬幼龙': {
    en: 'A chunky, spherical dragon hatchling with a glowing tail that sparkles like mini fireworks.',
    zh: '一只圆鼓鼓的小幼龙，它的尾巴暖洋洋地闪烁着像烟囱小烟花般的美丽星火。',
    ko: '꼬리 끝이 모닥불 연기처럼 화려한 불꽃을 은은히 피워대는 배가 통통한 아기드래곤.'
  },
  '焦糖狐狸': {
    en: 'Stuffed with a puffy tail resembling caramel pudding, smelling like milky sugar syrup wherever it walks.',
    zh: '拥有像焦糖布丁一样柔软蓬松的尾巴，走路时会散发淡淡奶香味。',
    ko: '달콤한 캐러멜 푸딩처럼 포동포동한 꼬리를 달고 다니는, 기분 좋은 시럽 향을 풍기는 여우.'
  },
  '冰晶企鹅': {
    en: 'An adorable penguin wrapped in glistening ice feathers, leaving a path of tiny snow crystals.',
    zh: '小小的企鹅身体覆盖着会闪光的冰晶羽毛，走路时会留下细小雪花。',
    ko: '몸 전체가 번뜩이는 얼음 깃털로 장식되어 걸을 때마다 잔잔한 미세 눈꽃을 흩뿌리는 펭귄.'
  },
  '月光猫头鹰': {
    en: 'A spherical owl with feathers as comforting as moonlight, glowing softly when sleeping.',
    zh: '圆滚滚的小猫头鹰，羽毛像月光一样柔和，闭眼时会发出微弱银光。',
    ko: '달무리처럼 은총 가득한 깃털을 가졌으며, 잠이 들면 미세하게 실버 펄 광을 내뿜는 부엉이.'
  },
  '彩虹水母团子': {
    en: 'A floating transparent jellyfish that alters its color hues dynamically based on current emotions.',
    zh: '漂浮在空中的透明小水母，会根据情绪改变颜色，像软绵绵的果冻团子。',
    ko: '공중에 살랑살랑 떠다니는 투명 해파리로, 자신의 심리 상태에 따라 시시각각 몸빛을 바꾸는 경단.'
  }
};

export const DIALOGUE_TRANSLATIONS: Record<string, Record<Language, string>> = {
  // Base dialogues
  "它今天摸起来热乎乎的，整个身体都软趴趴的，连弹跳都没力气了。": {
    en: "It feels hot to the touch today and its whole body is limp. It doesn't even have the energy to bounce.",
    zh: "它今天摸起来热乎乎的，整个身体都软趴趴的，连弹跳都没力气了。",
    ko: "오늘 몸이 불덩이 같고 온몸이 흐물거려요. 통통 튕기는 탄성 조차 없이 축 늘어져 있습니다."
  },
  "刚刚在沙滩玩了一下午，现在身体里全是小沙粒，亮晶晶的部分都看不见了。": {
    en: "It spent the whole afternoon playing on the beach. Now it's full of tiny sand grains, and we can't see its shiny gel anymore.",
    zh: "刚刚在沙滩玩了一下午，现在身体里全是小沙粒，亮晶晶的部分都看不见了。",
    ko: "해변에서 오후 내내 놀고 나니 온몸이 모래투성이예요. 속이 훤히 비치던 반짝이던 비주얼이 모래 때문에 안 보여요."
  },
  "它最近想参加跳跃比赛，但是每次落地都会摔成一团果冻。": {
    en: "It wants to participate in the high-jump contest, but every time it lands, it splats flat like a loose jelly pudd.",
    zh: "它最近想参加跳跃比赛，但是每次落地都会摔成一团果冻。",
    ko: "요즘 점프 대회에 나가려고 연습 중인데, 착지할 때마다 충격을 못 이기고 젤리 덩어리처럼 우스꽝스럽게 뭉개져요."
  },
  "它跑过树林之后腿上扎了一根小树枝，现在走路一瘸一拐的。": {
    en: "A small twig got stuck in its leg after it ran through the woods. Now it is limping and whimpering.",
    zh: "它跑过树林之后腿上扎了一根小树枝，现在走路一瘸一拐的。",
    ko: "숲속을 전력 질주하다가 발목에 나무 가시가 박혔나 봐요. 제대로 디디지 못하고 절뚝거려요."
  },
  "这孩子的毛发全打结了，摸起来一点都不蓬松。": {
    en: "This baby's woolly coat is completely tangled and matted. It's lost all its cozy morning fluff.",
    zh: "这孩子的毛发全打结了，摸起来一点都不蓬松。",
    ko: "깃털처럼 부드럽던 양모가 전부 엉키고 설켰어요. 쓰다듬어도 구름 같은 푹신함을 느낄 수 없네요."
  },
  "它总说想跳到星星上面去，能不能帮它练习一下？": {
    en: "It always dreams of leaping all the way up to touch the sky-stars. Can you help it practice coordination?",
    zh: "它总说想跳到星星上面去，能不能帮它练习一下？",
    ko: "자꾸 밤하늘의 별을 밟으러 올라가고 싶대요. 우주 점핑 연습을 고도화 시켜줄 수 없을까요?"
  },
  "它昨晚钻进荆棘丛后回来一直捂ed耳朵，看起来很难受。": {
    en: "It crawled into the thorny brushwood last night. It keeps hiding its ears and seems in substantial discomfort.",
    zh: "它昨晚钻进荆棘丛后回来一直捂ed耳朵，看起来很难受。",
    ko: "어젯밤 까시덤불에 머리를 디밀고 들어갔다 오더니 하루 종일 귀를 감싸며 울상을 짓고 힘들어해요."
  },
  "耳朵上沾满了发光泥巴，怎么擦都擦不干净。": {
    en: "Mystic mud is caked all over its constellation ears, and no matter how much I wipe, it won't shine properly.",
    zh: "耳朵上沾满了发光泥巴，怎么擦都擦不干净。",
    ko: "영롱한 별빛 귀에 야광 진흙이 잔뜩 달라붙어서 수건으로 아무리 문질러 닦아도 얼룩덜룩해요."
  },
  "它想学双重跳跃，可是总是在半空中失去平衡。": {
    en: "It determined to learn double-jumping, but it constantly loses its center of gravity mid-air and falls.",
    zh: "它想学双重跳跃，可是总是在半空中失去平衡。",
    ko: "공중 이단 점프를 배우고 싶은데, 꼭 허공에서 균형을 못 잡고 나뒹굴어요."
  },
  "它偷吃了好多奇怪的叶子，现在肚子一直咕噜咕噜叫。": {
    en: "It snatched and ate a bunch of strange wild leaves. Now its tummy is gurgling terribly aloud.",
    zh: "它偷吃了好多奇怪的叶子，现在肚子一直咕噜咕噜叫。",
    ko: "산책 중에 이상한 이파리들을 마구 뜯어먹고는 하루 종일 뱃속에서 기분 나쁜 소리와 복통을 주체 못 해요."
  },
  "尾巴毛都塌下来了，完全没有以前圆滚滚的样子。": {
    en: "Its tail coat is flat, dry, and deflated. It no longer looks like a bushy green-tea donut.",
    zh: "尾巴毛都塌下来了，完全没有以前圆滚滚的样子。",
    ko: "풍성하던 꼬리털이 푹 가라앉았어요. 전처럼 동글동글 토실토실한 귀여움을 상실해 슬퍼요."
  },
  "每次别人叫它名字，它都会装作没听见。": {
    en: "Every single time anyone calls its name, it intentionally looks away and plays deaf. Needs basic response drills.",
    zh: "每次别人叫它名字，它都会装作没听见。",
    ko: "이 이름을 불러도 모른 척 등 돌리고 눈을 이리저리 굴려요. 주의 집중 훈련이 필요해요."
  },
  "它今天已经打了十几个喷嚏，翅膀看起来也没什么力气。": {
    en: "It has sneezed more than a dozen times today. Its minty leaf wings look limp and tired.",
    zh: "它今天已经打了十几个喷嚏，翅膀看起来也没什么力气。",
    ko: "오늘 재채기를 수십 번 이어대고, 비행 날개도 힘없이 아래로 축 처진 채로 퍼더덕거려요."
  },
  "不小心掉进花粉桶里了，现在整只猫都变成金黄色。": {
    en: "It clumsily fell into a pollen vat. Now the entire kitten is dyed completely mustard gold.",
    zh: "不小心掉进花粉桶里了，现在整只猫都变成金黄色。",
    ko: "대형 꽃가루 통에 거꾸로 곤두박질쳤어요. 씻지 않아서 지금 온몸이 노랗게 도배되어 있어요."
  },
  "它总是在空中转圈圈，就是没办法稳稳停下来。": {
    en: "It keeps spinning mid-air like a crazy top and can't accomplish a steady landing control.",
    zh: "它总是在空中转圈圈，就是没办法稳稳停下来。",
    ko: "공중에서 자꾸 비틀비틀 회전만 반복하고 직진 활주나 조용히 하강 착륙을 하질 못해요."
  },
  "它喝了好多冰水，现在尾巴上的小火苗都快熄灭了。": {
    en: "It gulped down tons of freezing glacier water. Now the cute tiny spark on its tail is on the verge of fading out.",
    zh: "它喝了好多冰水，现在尾巴上的小火苗都快熄灭了。",
    ko: "시원한 얼음물을 게걸스럽게 들이켜더니 꼬리 밑의 연약한 화로 불빛이 꺼지려고 파르르거려요."
  },
  "鳞片缝里全是火山灰，痒得一直蹭墙。": {
    en: "Volcanic ash is caught underneath its beautiful scales, making it so itchy that it rubs against walls non-stop.",
    zh: "鳞片缝里全是火山灰，痒得一直蹭墙。",
    ko: "비늘 틈새틈새에 새까만 화산재가 끼었는지 간지러 죽겠다고 기둥에 몸을 대고 벅벅 긁어대서 상처가 날 지경이예요."
  },
  "它想学精准喷火，但总会把目标旁边的东西一起烧掉。": {
    en: "It is attempting to learn precise embers spitting, but it always ends up scorching everything near the target.",
    zh: "它想学精准喷火，但总会把目标旁边的东西一起烧掉。",
    ko: "입으로 소형 과적 불꽃을 조절 발사하고 싶어 하는데, 매번 타깃 옆 책상이랑 텐트를 홀랑 구워버려요."
  },
  "它偷吃了一整袋焦糖饼干，现在抱着肚子不肯动。": {
    en: "It snuck in and polished off a whole parcel of caramel cookies. Now it is holding its belly and refusing to budge.",
    zh: "它偷吃了一整袋焦糖饼干，现在抱着肚子不肯动。",
    ko: "달달한 카라멜 쿠키를 포장째로 훔쳐 다 갉아먹더니, 배를 거머쥐고 눈물이 글썽인 채 드러누웠어요."
  },
  "尾巴被糖浆黏成一大团了，看起来乱糟糟的。": {
    en: "Its pudding tail is cemented in a giant sugary shell of thick syrup, looking extremely sticky and chaotic.",
    zh: "尾巴被糖浆黏成一大团了，看起来乱糟糟的。",
    ko: "풍성한 단풍빛 꼬리가 끈적한 수제 시럽 잼 범벅이 되어 한데 뭉개졌어요. 영 형편없군요."
  },
  "每次训练到一半它就跑去偷零食，完全不专心。": {
    en: "Every time we are halfway through training, it bolts and pillages the treats chest. Completely distracted.",
    zh: "每次训练到一半它就跑去偷零食，完全不专心。",
    ko: "가르치기만 하면 한숨을 푹 쉬고는 구석구석에 숨긴 개 사료 간식 통을 뒤지며 탈주를 꾀해요."
  },
  "它滑冰摔倒之后翅膀一直抬不起来。": {
    en: "It crashed on the frozen rink while skating. Ever since, it has been unable to raise its tiny frozen wing.",
    zh: "它滑冰摔倒之后翅膀一直抬不起来。",
    ko: "빙판 활주 도중 중심을 잃고 콰당 자빠지더니 한쪽 날개를 아프다며 아예 꼼짝 못 해요."
  },
  "羽毛都冻成小冰块了，看起来一点都不闪亮。": {
    en: "Its crystal plumage is frozen into messy solid ice nuggets, losing all its graceful holographic shimmer.",
    zh: "羽毛都冻成小冰块了，看起来一点都不闪亮。",
    ko: "영롱한 주얼리 털들이 한 군데 꽁꽁 엉겨 붙어 서리가 끼었어요. 도무지 보석다운 빛이 안 나요."
  },
  "它最近想挑战连续滑行，可总是在转弯的时候摔倒。": {
    en: "It trying to complete continuous drifting arcs, but it consistently slips and spins out on tight turns.",
    zh: "它最近想挑战连续滑行，可总是在转弯的时候摔倒。",
    ko: "연속 부드러운 코너링 회전을 연마 중인데 매번 곡선 구간에서 미끄러지고 자빠져요."
  },
  "昨晚飞行太久，现在眼睛一直酸酸的睁不开。": {
    en: "It patrolled too long past midnight; now its lunar-sensors are sore, red-eyed, and cannot stay open.",
    zh: "昨晚飞行太久，现在眼睛一直酸酸的睁不开。",
    ko: "어젯밤 공중 야간 비행을 너무 오래 한 탓에 눈이 충혈되고 피로해서 끔벅거리며 뜨질 못해요."
  },
  "羽毛乱成一团，月光照上去一点都不漂亮。": {
    en: "Its delicate feathers are disorganized and disheveled. Reflected moonlight looks messy and dim on it.",
    zh: "羽毛乱成一团，月光照上去一点都不漂亮。",
    ko: "깃털 결이 사방으로 잔뜩 헝클어졌어요. 은빛 달그림자가 비쳐도 푸석푸석 지저분하게 보여요."
  },
  "它想学无声滑翔，但每次落地都会发出好大的声音。": {
    en: "It dreams of achieving completely silent glide-landing, yet every drop sounds like a landing heavy crate.",
    zh: "它想学无声滑翔，但每次落地都会发出好大的声音。",
    ko: "소리 없이 유령처럼 스텔스 전술 강하를 배우고 싶은데 부딪칠 때마다 쾅하고 대소동이 나요."
  },
  "它最近颜色一直灰蒙蒙的，看起来很没精神。": {
    en: "Its translucent colors have been dull grey for days, and its floating core looks entirely lethargic.",
    zh: "它最近颜色一直灰蒙蒙的，看起来很没精神。",
    ko: "무지개 영롱한 수중 신체 색이 하루 아침에 잿빛으로 퇴색하더니 식물인간처럼 둥둥 떠 있어요."
  },
  "身体外面的透明泡泡层变得浑浊了。": {
    en: "The protective crystalline cloud layer encompassing its body has turned foggy and opaque.",
    zh: "身体外面的透明泡泡层变得浑浊了。",
    ko: "몸 밖에 한 겹 덮고 있는 마법 버블 보호막이 뿌옇고 불투명해져 윤기가 안 흐릅니다."
  },
  "它总是控制不好漂浮高度，一不小心就撞到天花板。": {
    en: "It struggles to modulate its levitation height, constantly bashing its soft head straight into the ceiling.",
    zh: "它总是控制不好漂浮高度，一不小心就撞到天花板。",
    ko: "정밀한 부유 높낮이 밸런스를 잃어버려서 자기도 모르게 부풀어 오르다 천장에 박치기를 해대요."
  },

  // MEDIUM_CASES
  "“它今天总是缩在茶杯底部不肯弹出来，身上温度冰凉冰凉的，一定是受凉感冒了。”": {
    en: '"It keeps curling up at the very bottom of its teacup and refuses to bounce. Its gel is freezing cold; it must have caught a chill."',
    zh: "“它今天总是缩在茶杯底部不肯弹出来，身上温度冰凉冰凉的，一定是受凉感冒了。”",
    ko: '"하루 종일 찻잔 맨바닥에 쏠린 채 도통 튀어나오질 않는 데다 만지면 뼛속까지 얼음장 같아요. 냉증 감기인 듯해요."'
  },
  "“它在泥地里跑去，白白的毛发全都染土变黏了，还有一股泥土味，抱抱都觉得手脏。”": {
    en: '"It went and rolled around in a muddy swamp, so its fluffy white wool is sticky, brown, and foul-smelling. Hugging is impossible!"',
    zh: "“它在泥地里跑去，白白的毛发全都染土变黏了，还有一股泥土味，抱抱都觉得手脏。”",
    ko: '"진흙탕 속을 뚫고 굴러서 눈처럼 하얗던 양모가 갈색 딱지로 뭉쳐 끈적거려요. 꼬질꼬질 흙비린내가 한가득입니다."'
  },
  "“它很想在草地上练习优雅地站立和打招呼，可是它只要一兴奋就会在原地乱滚，完全不能安静。”": {
    en: '"It really wants to practice dynamic standing and waving on the grass, but whenever it gets hyper, it just rolls around chaotically."',
    zh: "“它很想在草地上练习优雅地站立和打招呼，可是它只要一兴奋就会在原地乱滚，完全不能安静。”",
    ko: '"푸른 들판 위에서 품위 있게 똑바로 서서 관객에게 경례하는 자세를 배우려는데 흥분하면 그대로 옆구리로 데굴데굴 굴러버려요."'
  },
  "“这孩子不停地拍耳朵，耳朵红红的而且总是朝一边倾斜，是不是进水并且发炎了啊？”": {
    en: '"This cutie keeps shaking and scratching its ears, which are red and tilting to one side. Did water get inside and cause an infection?"',
    zh: "“这孩子不停地拍耳朵，耳朵红红的而且总是朝一边倾斜，是不是进水并且发炎了啊？”",
    ko: '"귀가 뻘게진 채 자꾸 허공에 귀를 터는 시늉을 하면서 머리를 한쪽 방향으로 갸웃거려요. 염증이나 귓병이 생긴 건가 봐요."'
  },
  "“它不知道掉到什么甜甜的糖水里去，全身的毛发都被糖浆黏在了一块儿，摸起来特别不舒服。”": {
    en: '"It fell into some unknown sugary syrup bottle. Now all of its fur is cemented together, and it feels terribly uncomfortable."',
    zh: "“它不知道掉到什么甜甜的糖水里去，全身的毛发都被糖浆黏在了一块儿，摸起来特别不舒服。”",
    ko: '"무슨 꿀물 단지 같은 데 홀랑 빠졌었는지 머리부터 발끝까지 끈끈한 엿막이 코팅돼서 만지면 떡진 손이 돼요. 불쾌해해요."'
  },
  "“明天有一场吐微型火星的表演，它每次吐都吐错隔边的木桩上，好需要一次定向训练。”": {
    en: '"We have a mini-spark breathing performance tomorrow, but its fireballs consistently hit the wrong target posts. It urgently needs aim drills!"',
    zh: "“明天有一场吐微型火星的表演，它每次吐都吐错隔边的木桩上，好需要一次定向训练。”",
    ko: '"내일 미니 불꽃 점화 비주얼쇼가 예정되어 있는데 발射하는 탄도마다 옆집 표적 기둥을 태워요. 방향 지향 훈련 장려 바랍니다."'
  },
  "“它身上全是刺藤小挂钩，走路疼得直哼，我实在不忍心，但又不敢随便硬扯下来。”": {
    en: '"It\'s covered in wild thorn-burrs. It whimpers with every step it takes. I want to help, but I\'m afraid to yank them out myself."',
    zh: "“它身上全是刺藤小挂钩，走路疼得直哼，我实在不忍心，但又不敢随便硬扯下来。”",
    ko: '"온몸에 뾰족뾰족한 가시덤불 조각들이 가득 박혀 있어서 한 걸음 디딜 때마다 아파서 끙끙 앓아요. 겁나서 임의로 못 뽑겠어요."'
  },
  "“它在练习溜冰后背上的装饰毛乱成一蓬，它非常爱美，希望能把它梳理得超级威风。”": {
    en: '"After skating practice, back plumage on its rear is completely tangled. It\'s very vain and wants its coat brushed back to looking premium!"',
    zh: "“它在练习溜冰后背上的装饰毛乱成一蓬，它非常爱美，希望能把它梳理得超级威风。”",
    ko: '"피겨 스케이팅 맹연습 이후 등 쪽 보석 깃털이 빗자루처럼 마구 부풀고 찢어졌어요. 멋쟁이라 다시 위풍당당하게 빗질 좀 해주세요."'
  },
  "“它想学低空夜间侦察，但它总是一飞过去就刮出大风，惊扰整片森林，太缺乏动作控制力了。”": {
    en: '"It tries to master low-altitude nightly recon, but its wings generate severe windstorms that wake the forest. It lacks aerodynamic control!"',
    zh: "“它想学低空夜间侦察，但它总是一飞过去就刮出大风，惊扰整片森林，太缺乏动作控制力了。”",
    ko: '"침묵 야간 전방 정찰 비행을 훈련 중인데, 활공할 때마다 과격한 날개바람이 일어 야생 동물들을 다 깨워요. 비행 조종력이 결인된 것 같아요."'
  },
  "“它刚才在游玩时身上卡了一小截海藻丝，把它好看的半透明晶格都缠住变样了，需要洗香香顺便清洁。”": {
    en: '"While swimming, a big clump of dry seaweed got tangled around its beautiful lattice body. It needs a soapy wash and gentle detangling."',
    zh: "“它刚才在游玩时身上卡了一小截海藻丝，把它好看的半透明晶格都缠住变样了，需要洗香香顺便清洁。”",
    ko: '"해류를 타며 놀다가 투명 수조에 수초 조각이랑 미역 가닥이 어지럽게 붙어 격자 디자인을 망쳤어요. 샤워로 세적해주고 떼어주세요."'
  },

  // DIFFICULT_CASES
  "“它最近总是不愿意飞，还经常躲在角落里。不过昨天又不小心掉进花粉桶，把翅膀弄得脏兮兮的。”": {
    en: '"Lately it refuses to fly and cowers in dark corners. Also, it fell into a pollen container yesterday, making its wings extremely dirty."',
    zh: "“它最近总是不愿意飞，还经常躲在角落里。不过昨天又不小心掉进花粉桶，把翅膀弄得脏兮兮的。”",
    ko: '"최근 구석진 데만 처박혀 서럽게 떨고 안 솟아오르려 해요. 설상가상 어제 양봉 상자에 추락해 날개가 대단히 불결해졌어요."'
  },
  "“它刚洗完澡，看起来挺干净的，但最近总是乱咬家具，还把我的拖鞋藏起来。”": {
    en: '"It just came back from a bath and looks pristine, but recently it has started chewing up furniture and hiding my home slippers."',
    zh: "“它刚洗完澡，看起来挺干净的，但最近总是乱咬家具，还把我的拖鞋藏起来。”",
    ko: '"아까 막 목욕을 끝마쳐 외관은 대단히 뽀숑뽀숑한 상태인데, 집안 가구를 무자비하게 물어뜯고 외출용 슬리퍼를 탈취하여 숨깁니다."'
  },
  "“它最近跳不高了，而且身体里还卡着不少沙子。不过它精神看起来还不错。”": {
    en: '"It can\'t jump very high anymore and has quite a bit of beach sand trapped in its gel. Its spirit, however, seems quite robust."',
    zh: "“它最近跳不高了，而且身体里还卡着不少沙子。不过它精神看起来还不错。”",
    ko: '"점프 높이가 턱없이 낮아진 데 더해 몸속 깊숙이 바다 모래 알갱이들이 침전되어 흐릿해요. 기운 자체는 아주 팔팔해 뵈네요."'
  },
  "“尾巴火苗比平时小很多，而且喷火总是喷歪。我不知道它是生病了还是练习太少。”": {
    en: '"Its tail spark is tiny and its ember shots consistently miss the targets. I don\'t know if it is ailing or just needs more shooting drills."',
    zh: "“尾巴火苗比平时小很多，而且喷火总是喷歪。我不知道它是生病了还是练习太少。”",
    ko: '"꼬리에 고정된 미세 발열 불꽃 크기가 콩알만 해졌고 끄덕하면 정면에다 불발 탄을 내뿜어요. 감기 기운인 건지 능숙도 결여인지 아리송합니다."'
  },
  "“羽毛有点凌乱，不过更让我担心的是它最近总撞到树枝，飞行好像不太稳定。”": {
    en: '"Its wings feel slightly dishevelled, but my biggest worry is that it keeps bumping straight into tree limbs. Its flight balance seems unstable."',
    zh: "“羽毛有点凌乱，不过更让我担心的是它最近总撞到树枝，飞行好像不太稳定。”",
    ko: '"깃결이 다소 뒤틀린 것은 사소한 일인데 비행 유도 시 시시각각 가로수 중심 가지에 머리를 들이받는군요. 중심 제어력이 심각해요."'
  },
  "“它在练习溜冰回来后羽毛结冰了，而且走路时总说翅膀有点酸。”": {
    en: '"After skating practice, ice formed on its wing feathers, and it keeps whining that its joints feel very sore."',
    zh: "“它在练习溜冰回来后羽毛结冰了，而且走路时总说翅膀有点酸。”",
    ko: '"아이스 필드 주파 훈련을 마친 뒤 보석 깃털이 꽁꽁 동결되었고, 걸어오면서 날개 어깨뼈 쪽이 욱신거리고 저릿하다고 투정을 부려요."'
  },
  "“尾巴被糖浆黏住了，不过它一直抱着肚子哼哼唧唧，看起来不太舒服。”": {
    en: '"Its tail fluffy area is stuck with thick maple syrup, but it keeps clutching its stomach and whimpering in severe discomfort."',
    zh: "“尾巴被糖浆黏住了，不过它一直抱着肚子哼哼唧唧，看起来不太舒服。”",
    ko: '"꼬리 부분에 초코 시럽이 한 무더기 고착되어 굳었는데, 그것보단 머리를 땅에 대고 아랫배를 감싼 채 식은땀을 흘리며 아파합니다."'
  },
  "“毛发有点打结，但它最近总是摔倒，跨不过平时很轻松的小障碍。”": {
    en: '"Its white wool wool is a bit tangled, but lately it keeps falling flat on its face and can\'t clear simple small bar jumps anymore."',
    zh: "“毛发有点打结，但它最近总是摔倒，跨不过平时很轻松的小障碍。”",
    ko: '"외관 털이 뭉친 것보단, 이상하게 뜀틀 가로장이나 마당 소형 플라스틱 턱도 자꾸 제풀에 넘어져서 뛰어넘지 못하는 모습을 보입니다."'
  },
  "“颜色有点暗淡，而且最近总是控制不好漂浮高度，一会儿撞天花板一会儿掉下来。”": {
    en: '"Its neon color feels slightly dim, but worse, it cannot stabilize its floating height—constantly hitting the ceiling then crashing down."',
    zh: "“颜色有点暗淡，而且最近总是控制不好漂浮高度，一会儿撞天花板一会儿掉下来。”",
    ko: '"몸체의 무지개 색 채도가 살짝 빠졌는데 눈에 띄게 부유 고도 설정에 허점을 보이며 천장 충돌과 급강하 바닥 추락을 반복해요."'
  },
  "“它探险回来后耳朵上沾满泥巴，最近跳跃时还经常落地不稳。我本来想帮它洗洗，但总觉得哪里怪怪的。”": {
    en: '"Since returning from field adventures, its ears are covered in mud, and it lands unstably after jumps. I thought about washing it but feel something is deeply wrong."',
    zh: "“它探险回来后耳朵上沾满泥巴，最近跳跃时还经常落地不稳。我本来想帮它洗洗，但总觉得哪里怪怪的。”",
    ko: '"산악 탐험대 귀환 직후 귀 주위가 뻘흙투성이며 낙하 후 하중 전달에서 휘청이네요. 단순 오염 인지 알았는데 관절이나 통증 문제 같아요."'
  },

  // VIP Dialogues
  "我的彩虹水母团子最近颜色变灰、漂浮不稳，而且泡泡层也不再透明了。我实在分不清到底出了什么问题。": {
    en: "My Rainbow Jellyfish has recently turned a dull grey color, floats unstably, and its outer bubble shield is foggy. I have no idea where the root issue lies.",
    zh: "我的彩虹水母团子最近颜色变灰、漂浮不稳，而且泡泡层也不再透明了。我实在分不清到底出了什么问题。",
    ko: "이 소중한 무지개 해파리가 최근 온몸이 회색조로 변하고 뜰 때 비틀대며 겉면 막이 장님 항아리처럼 뿌옇습니다. 근본적으로 무엇을 해주어야 할지 모르겠어요."
  },
  "明天要参加王国庆典了，希望我的叶子小猫能成为最耀眼的小明星！": {
    en: "We are attending the Grand Royal Ceremony tomorrow! I truly hope my Leafy Kitten can be polished to become the shining star!",
    zh: "明天要参加王国庆典了，希望我的叶子小猫能成为最耀眼的小明星！",
    ko: "내일 왕국 주년 기념 퍼레이드가 벌어집니다! 이 귀한 아기고양이가 무대에서 최고로 기품 넘치고 예쁘게 돋보일 수 있게 꽃단장 부탁드려요."
  },
  "我的余烬幼龙最近喷火总是歪掉，实验室已经被烧坏三张桌子了。": {
    en: "My Ember Drake keeps aiming its target flames completely crookedly. It has already incinerated three wooden desks in my lab!",
    zh: "我的余烬幼龙最近喷火总是歪掉，实验室已经被烧坏三张桌子了。",
    ko: "이 용가리가 정면 표적은 안 맞추고 옆으로 파이어볼을 불어제끼는데 주간 연구실 참나무 조종 데스크 3개가 홀랑 탔습니다. 제발 각도 제어 좀 가르치세요!"
  },
  "星宿小兔探险回来之后耳朵一直在抽动，我有点担心。": {
    en: "Ever since returning from our latest wild stargazing expedition, my Astro Bunny's ears have been twitching restlessly. I am really worried.",
    zh: "星宿小兔探险回来之后耳朵一直在抽动，我有点担心。",
    ko: "행성 관측 탐사를 마치고 안전 귀가했는데 토끼녀석이 계속 귀에다 대고 꼬리를 떨며 고통 어린 작은 비명을 질러요. 염려스럽습니다."
  }
};

export const EXPLANATION_TRANSLATIONS: Record<string, Record<Language, string>> = {
  "史莱姆体温过低且精神萎靡，符合医疗诊断。": {
    en: "Decreased body temperature combined with heavy lethargy indicates a systemic physical illness. Treatment required.",
    zh: "史莱姆体温过低且精神萎靡，符合医疗诊断。",
    ko: "기본 슬라임 한파 증세 및 저체온 탈진은 병적인 감기이므로 의학적 처치 필수."
  },
  "毛发变脏、充满泥土，需要进行洗浴和美容护理。": {
    en: "Heavily stained coat with foul muddy particles implies cosmetic restoration is needed. Put in Grooming.",
    zh: "毛发变脏、充满泥土，需要进行洗浴和美容护理。",
    ko: "온몸이 진흙탕 얼룩으로 굳어 있는 것은 기본 위생 및 털 정리 소독 코스인 미용실 배정에 부합."
  },
  "日常站立和打招呼需要动作上的行为纠正和专注度训练。": {
    en: "Refining static posture and social standing requires posture correction drills. Belongs in Training.",
    zh: "日常站立和打招呼需要动作上的行为纠正和专注度训练。",
    ko: "직립 보행 및 기수 인사 제스처는 물리적 자세 교정 및 행동 지침 훈련 영역에 배정."
  },
  "耳朵发红、刺痛，显然是身体发生病变炎症，需要医治。": {
    en: "Severe red visual swelling and sharp ear-ache are core pathology symptoms, indicating an infection that requires clinic medication.",
    zh: "耳朵发红、刺痛，显然是身体发生病变炎症，需要医治。",
    ko: "외이도 상처, 고막 홍반 현상은 병의 발전 염증 상태이므로 즉시 의학적 주사 및 수화 도포 필수."
  },
  "被黏液或糖浆糊住，需要美容清洗。": {
    en: "Stuck together under massive thick syrup, demanding a detailed soapy shampoo and comb styling. Send to Grooming.",
    zh: "被黏液或糖浆糊住，需要美容清洗。",
    ko: "단 시럽 잼이 달라붙어 가라앉은 거동 불량이며, 시럽 세안과 트리트먼트 미용 필요."
  },
  "练习精准施法与定向吐火，完全属于技能训练范围。": {
    en: "Honing tactical flame precision and casting angle falls purely under functional target-practice drills. Send to Training.",
    zh: "练习精准施法与定向吐火，完全属于技能训练范围。",
    ko: "정밀 입사각 조절 조준 발화 연습은 훈련장에 마련된 소성 과녁 치격 행동 교육에 소속."
  },
  "刺藤挂到身体造成的明显刺痛与外伤，优先级在医疗救治。": {
    en: "Stuck thorny burrs causing sharp bleeding risk and flesh pains prioritizes clinical forceps removal. Destination is Treatment.",
    zh: "刺藤挂到身体造成的明显刺痛与外伤，优先级在医疗救治。",
    ko: "온몸에 박힌 독가시 줄기로 인한 기질적 통증과 표피 상처는 오염 탈의보단 치료 수술이 우선."
  },
  "属于造型梳理与打扮美容要求。": {
    en: "Disorganized feathers and damaged aesthetic state matches directly with intensive comb styling. Grooming Salon standard.",
    zh: "属于造型梳理与打扮美容要求。",
    ko: "뒤얽힌 깃털과 자태 정비, 스타일 배치는 전형적인 헤어 스타일링 및 세련 미용 코스."
  },
  "无声低飞与动作控制属于协调度和行为训练。": {
    en: "Silent gliding and wings micro-drag management belong to flying coordination and skills development. Send to Training.",
    zh: "无声低飞与动作控制属于协调度和行为训练。",
    ko: "은밀 비행, 고도 조율 제어 등은 기동성 단련 및 비행 기술 교실 훈련 코스."
  },
  "清理海藻异物，保持晶格亮丽的外貌美容项目。": {
    en: "Extracting seaweed threads and polishing translucent skin are pure beauty care demands. Send to Grooming.",
    zh: "清理海藻异物，保持晶格亮丽的外貌美容项目。",
    ko: "엉킨 잔디 이물질 제거와 피부 막 청정 세안은 미용 파트에서 처리하는 안면 외형 정비 프로젝트."
  },
  "核心问题是身体状态异常导致不愿意飞行，身体健康恢复优先级高于花粉清洁美容！": {
    en: "The underlying crisis is active depression/lethargy preventing flights, overriding the minor pollen dust. Health comes first (Treatment)!",
    zh: "核心问题是身体状态异常导致不愿意飞行，身体健康恢复优先级高于花粉清洁美容！",
    ko: "주요 병증의 원인은 기어 다니기 및 무력감 구석 은닉 등 전신 전반의 중대 질병으로, 외관 꽃가루 오염 치료보단 병의 격파인 치료가 주된 목적!"
  },
  "美容已经由主人自己完成（很干净），真正影响正常生活的是乱咬家具的坏习惯，需要系统化行为训练！": {
    en: "Cosmetics are already pristine (very clean). The actual barrier to happy cohabitation is furniture chewing, which demands corrective behavior Training!",
    zh: "美容已经由主人自己完成（很干净），真正影响正常生活的是乱咬家具的坏习惯，需要系统化行为训练！",
    ko: "미용은 이미 주인이 집에서 완료하여 말끔합니다. 가구를 파괴하는 문제 행동을 고치기 위해 훈련장 지시 교육으로 투입되어야 함!"
  },
  "精神状态完全正常（精神不错），跳不高纯粹是因为身体里堵着沙子增加了自重，核心诉求是清沙美容！": {
    en: "Vitals and spirit are perfectly fine. Jumping lower is simply mechanical due to heavy trapped beach sand raising body mass—requires de-clogging Grooming!",
    zh: "精神状态完全正常（精神不错），跳不高纯粹是因为身体里堵着沙子增加了自重，核心诉求是清沙美容！",
    ko: "심리 및 기력은 아주 좋음. 못 올라가는 이유는 슬라임 속에 무겁게 찬 지석(모래) 자중으로 가중되었기 때문이니 모래 제거 샤워 미용이 급선무!"
  },
  "尾巴核心火苗变得微弱，是自身火源熄灭或虚弱的发热疾病，火焰异常在幼龙学中属于生病，需要医治！": {
    en: "The tail's fading spark suggests dragon thermal vital failure or high-fever condition. In Drake studies, flame loss is a systemic illness. Treatment required!",
    zh: "尾巴核心火苗变得微弱，是自身火源熄灭或虚弱的发热疾病，火焰异常在幼龙学中属于生病，需要医治！",
    ko: "꼬리 생명의 핵심 연로 발전 불씨가 소형화된 것은, 열량 대사 부전 및 감기성 발열 중대 병증입니다. 용 구급의학에서 불씨 퇴색은 입원 치료 요건!"
  },
  "羽毛微凌乱不影响大局，总是撞树说明空间感和滑翔平衡掌握欠佳，当以飞行能力相关的障碍训练为主！": {
    en: "Slightly unkempt wings are secondary. Crashing into tree boughs indicates disorientation and poor flight-pitch alignment—requires obstacle Training!",
    zh: "羽毛微凌乱不影响大局，总是撞树说明空间感和滑翔平衡掌握欠佳，当以飞行能力相关的障碍训练为主！",
    ko: "깃 개성이 튼 건 지엽적 사정입니다. 공중에서 나무와 자꾸 충돌하는 것은 삼차원 공간 인지와 활공 도약 균형이 낮아진 것으로 비행 교정 훈련으로 수용!"
  },
  "羽毛结冰可以用身体温度暖化，但滑滑梯摔倒带来的翅膀酸胀疼痛说明有软组织损伤，应优先安排医治！": {
    en: "Frost is easily melted by natural warmth, but shoulder aches point to tendon tear or soft tissue trauma. Clinical Care (Treatment) is the highest priority!",
    zh: "羽毛结冰可以用身体温度暖化，但滑滑梯摔倒带来的翅膀酸胀疼痛说明有软组织损伤，应优先安排医治！",
    ko: "서리결 동결은 온수나 가습으로 녹일 수 있으나 관절 고통과 운동성 상실은 연골 타박상 및 근육 파열 등의 외상이 우선이니 진료실행!"
  },
  "糖浆黏尾仅仅是轻微的脏，而抱着肚子哼哼痛苦，表示可能偷吃变质糖浆导致了肠胃炎，肚子不适首选医治！": {
    en: "Syrup on the tail is just visual dirt, but clutching its stomach crying reveals acute toxic enteritis from ingestion. Must seek clinical Treatment!",
    zh: "糖浆黏尾仅仅是轻微的脏，而抱着肚子哼哼痛苦，表示可能偷吃变质糖浆导致了肠胃炎，肚子不适首选医治！",
    ko: "꼬리 가당 오염은 외양 오타일 뿐이나, 배를 잡고 뒹구는데서 심한 위장 쇼크 및 소화불량(장염)이 관찰되어 치료실 배치가 우선적 요구사항!"
  },
  "毛发打结是小羊常态，经常平地摔跤以及跳不过障碍反映出平衡与跃障技巧退化，需要腿部动作指导训练！": {
    en: "Tangled wool is standard for sheep. Spontaneous tripping and failing hurdle jumps prove deteriorated vaulting reflexes—requires muscle motor Training!",
    zh: "毛发打结是小羊常态，经常平地摔跤以及跳不过障碍反映出平衡与跃障技巧退化，需要腿部动作指导训练！",
    ko: "솜털 뭉침은 아기양의 일상. 틈만 나면 문턱에서 발 걸리고 뜀마루를 회피하는 몸놀림은 평형성 단련이 전무해서이니 체육 훈련으로 투입!"
  },
  "颜色有点暗淡，而且最近总是控制不好漂浮高度，一会儿撞天花板一会儿掉下来。": {
    en: "Neon fades are emotional indicators, but an inability to govern physical density (crashing ceiling/floor) calls for altitude control Training!",
    zh: "颜色有点暗淡，而且最近总是控制不好漂浮高度，一会儿撞天花板一会儿掉下来。",
    ko: "몸 빛깔이 어두워진 건 심적 동사나, 상하 부력 고도 저감은 중력 제어 신경 연계 불량이므로 팽창 평형성 향상 훈련 지시가 정합!"
  },
  "它探险回来后耳朵上沾满泥巴，最近跳跃时还经常落地不稳。我本来想帮它洗洗，但总觉得哪里怪怪的。": {
    en: "Muddy ears are simple dirt, but tumbling during jumps indicates middle-ear damage or severe pain from field trauma—send immediately to Treatment!",
    zh: "它探险回来后耳朵上沾满泥巴，最近跳跃时还经常落地不稳。我本来想帮它洗洗，但总觉得哪里怪怪的。",
    ko: "진흙 가루는 단기 세면 요인이나 도약 착지에서 연달아 균형을 잃는 것은 이비인후 계열 신경 손상이나 내부 가시 침입이므로 정밀 검진 치료행!"
  },
  "同时出现了医疗（变灰）、美容（浑浊层）和训练（漂浮不稳）的线索。因颜色灰蒙等生命体征下降是根本病因，洗浴或训练只是治标不治本，首选【诊疗治疗 🏥】！": {
    en: "The case presents mixed clues: grey hue (medical), opacity (grooming), instability (training). Cellular-level grey coloration represents organ vitals failure. Grooming or training are superficial—Treatment 🩺 is vital!",
    zh: "同时出现了医疗（变灰）、美容（浑浊层）和训练（漂浮不稳）的线索。因颜色灰蒙等生命体征下降是根本病因，洗浴或训练只是治标不治本，首选【诊疗治疗 🏥】！",
    ko: "세 부서의 단서가 혼재함: 수조 잿빛 탈색 (치료), 탁한 기막 (미용), 부유 기복 (훈련). 신체 탈색 증세는 전생 역량 저하의 병증이며 표피 청소나 물리 요법으론 복구가 불능하므로 진료 🩺실이 필수 배정처!"
  },
  "叶子小猫攻击力……哦不，明日将登上王室盛大庆典舞台，急需进行草本泡沫洗浴与精美饰带装点，毫无疑问应选择【温馨美容 🧴】。": {
    en: "The Leafy Kitten is stepping onto the grand majestic stage tomorrow. It crucially requires herbal bathes and premium accessory styling—undoubtedly a task for Grooming ✂️.",
    zh: "叶子小猫攻击力……哦不，明日将登上王室盛大庆典舞台，急需进行草本泡沫洗浴与精美饰带装点，毫无疑问应选择【温馨美容 🧴】。",
    ko: "내일 아침 국왕 폐하 존전 연단에 오르는 막중한 행사로, 광택 털 세척과 티아라 수공 띠 장식이 요구되므로 의심의 여지없이 뷰티 장식 미용실!"
  },
  "小龙喷火方向偏移击毁家具，纯属施法角度与姿态异常，需要靶心喷吐和敏捷纠偏，应前往【趣味训练 🎪】。": {
    en: "Uncontrolled drake flames roasting woodworks are physical firecasting posture errors. Precision training and agile correction are requested—Training 🎓 is the match.",
    zh: "小龙喷火方向偏移击毁家具，纯属施法角度与姿态异常，需要靶心喷吐和敏捷纠偏，应前往【趣味训练 🎪】。",
    ko: "어린 무동이 불꽃 발포에서 꼬리 중심 흔들림으로 엄한 데를 해먹는 것은 기술적 기립 자세 연수 미달이므로 모션 바짝 다듬는 훈련소행!"
  },
  "探险森林易遭遇蛰咬或耳道发炎，频繁卷动抽搐通常伴随剧烈疼痛与微型寄生受伤，需医生诊疗处理，首选【诊疗治疗 🏥】。": {
    en: "Deep-forest travels expose rabbit-ears to insect stingers or canal infections. Twitching accompanies sharp pains that require clinical Treatment 🩺.",
    zh: "探险森林易遭遇蛰咬或耳道发炎，频繁卷动抽搐通常伴随剧烈疼痛与微型寄生受伤，需医生诊疗处理，首选【诊疗治疗 🏥】。",
    ko: "야외 탐사에서는 해충 침입 및 독풀 면역 반응에 취약합니다. 귀의 거친 수축과 경련은 기생충이나 감염 통증이 수반된 것이므로 마법 의료원 치료 수속!"
  }
};

// Map names
export function translateName(name: string, lang: Language): string {
  if (lang === 'zh') return name;

  // Check unique VIP names
  if (name.includes('神秘收藏家')) {
    return lang === 'en' ? '👑 Grand Boss: Mystery Collector' : '👑 숨겨진 보스: 신비한 수집가';
  }
  if (name.includes('公主殿下')) {
    return lang === 'en' ? '👑 Her Royal Highness the Princess' : '👑 존귀하신 공주 마마';
  }
  if (name.includes('首席魔法师')) {
    return lang === 'en' ? '🧙 Royal Archmage Arthur' : '🧙 아카데미 수석 대마법사';
  }
  if (name.includes('首席探险家')) {
    return lang === 'en' ? '🗺️ Chief Royal Adventurer' : '🗺️ 황실 수석 탐험대장';
  }

  // Regular pet name lookup
  const namesMap: Record<string, Record<Language, string>> = {
    '麦芽': { en: 'Malty', zh: '麦芽', ko: '엿기름' },
    '麻薯': { en: 'Mochi', zh: '麻薯', ko: '모찌' },
    '泡泡': { en: 'Bubbles', zh: '泡泡', ko: '방울이' },
    '洒洒': { en: 'Sassy', zh: '洒洒', ko: '사사' },
    '皮皮': { en: 'Pippy', zh: '皮皮', ko: '피피' },
    '抹茶': { en: 'Matcha', zh: '抹茶', ko: '말차' },
    '小叶子': { en: 'Leafy', zh: '小叶子', ko: '나뭇잎' },
    '奇奇': { en: 'Kiki', zh: '奇奇', ko: '키키' },
    '巴纳比': { en: 'Barnaby', zh: '巴纳比', ko: '바나비' },
    '柚子': { en: 'Yuzu', zh: '柚子', ko: '유자' },
    '花生': { en: 'Peanut', zh: '花生', ko: '땅콩' },
    '可可': { en: 'Coco', zh: '可可', ko: '코코' },
    '小软糖': { en: 'Gummy', zh: '小软糖', ko: '젤리' },
    '华夫饼': { en: 'Waffle', zh: '华夫饼', ko: '와플' },
    '酸奶': { en: 'Yogurt', zh: '酸奶', ko: '요구르트' },
    '小芽': { en: 'Sprout', zh: '小芽', ko: '푸릇이' },
    '千代': { en: 'Chiyo', zh: '千代', ko: '치요' },
    '海苔': { en: 'Nori', zh: '海苔', ko: '김가루' },
    '星海': { en: 'Starsea', zh: '星海', ko: '별바다' },
    '烈焰': { en: 'Blaze', zh: '烈焰', ko: '블레이즈' }
  };

  const pureName = name.replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, '').trim();
  for (const [zhKey, value] of Object.entries(namesMap)) {
    if (pureName.includes(zhKey) || zhKey.includes(pureName)) {
      return value[lang];
    }
  }

  return name;
}

// Map species names
export function translateSpecies(species: PetSpecies, lang: Language): string {
  return SPECIES_TRANSLATIONS[species]?.[lang] || species;
}

// Map description
export function translateDesc(desc: string, lang: Language): string {
  if (lang === 'zh') return desc;
  
  for (const spec of Object.keys(SPECIES_DESC_TRANSLATIONS) as PetSpecies[]) {
    const origZh = SPECIES_DESC_TRANSLATIONS[spec].zh;
    if (desc === origZh || desc.includes(origZh)) {
      return SPECIES_DESC_TRANSLATIONS[spec][lang];
    }
  }
  return desc;
}

// Map Dialogue
export function translateDialogue(dialogue: string, lang: Language): string {
  if (lang === 'zh') return dialogue;

  const clean = dialogue.replace(/[“’”"]/g, '').trim();
  for (const [zhKey, value] of Object.entries(DIALOGUE_TRANSLATIONS)) {
    const cleanZh = zhKey.replace(/[“’”"]/g, '').trim();
    if (clean === cleanZh || clean.includes(cleanZh) || cleanZh.includes(clean)) {
      const translated = value[lang];
      return lang === 'en' ? `"${translated}"` : `“${translated}”`;
    }
  }
  return dialogue;
}

// Map Explanation
export function translateExplanation(explanation: string, lang: Language): string {
  if (lang === 'zh') return explanation;

  for (const [zhKey, value] of Object.entries(EXPLANATION_TRANSLATIONS)) {
    if (explanation === zhKey || explanation.includes(zhKey)) {
      return value[lang];
    }
  }
  return explanation;
}

// Map dynamic level steps for room cards based on levels & room configuration
export function getTranslatedSteps(roomId: RequestType, level: number, lang: Language): string[] {
  if (roomId === 'MEDICAL') {
    if (level === 3) {
      return lang === 'en' 
        ? ['Micro Sonic Lattice Reshape 🧪', 'Infect Healing Binder 💉', 'Ingest Ultra Elixir Pill 💊']
        : lang === 'ko'
        ? ['미세 카테터 주파수 세포 성형 🧪', '힐링 재생 활성화 주사 💉', '최상급 오로라 구슬약 복용 💊']
        : ['微创超声晶格重塑 🧪', '注射活化治愈粘合剂 💉', '吞服极品幻彩回能丹 💊'];
    }
    if (level === 2) {
      return lang === 'en'
        ? ['Thermal Core Infrared Check 🧬', 'Anoint Magic Balm 🧴', 'Feed Bubbles Vitamin 💊']
        : lang === 'ko'
        ? ['적외선 코어 스캔 측정 🧬', '특제 보습 진정 연고 도포 🧴', '버블 멀티 비타민 냠냠 💊']
        : ['热能晶核红外检测 🧬', '外涂魔法舒缓灵膏 🧴', '喂食快乐泡泡维他命 💊'];
    }
    return lang === 'en'
      ? ['Check core warmness', 'Anoint soothing ointment', 'Feed happy vitamins']
      : lang === 'ko'
      ? ['온열 코어 측정 차트', '진정 치료 유화액 연고', '해피 비타민 냠냠']
      : ['测量温热核心', '涂抹舒缓药膏', '喂食快乐维他命'];
  }

  if (roomId === 'GROOMING') {
    if (level === 3) {
      return lang === 'en' 
        ? ['Deluxe Herbal Foam Bath 🌸', 'Royal Tangles Brushing 💎', 'Fairy Ribbon Decoration ✨']
        : lang === 'ko'
        ? ['디럭스 가든 포말 아로마 배스 🌸', '로열 소프트 골드 핀 빗질 💎', '오로라 날개 깃 가든 달 장식 ✨']
        : ['豪华草本泡沫浴 🌸', '皇家御毛梳理 💎', '星光贴花与月光柔羽 ✨'];
    }
    if (level === 2) {
      return lang === 'en' 
        ? ['Petal Warm Foam Bath 🧼', 'Delicate Fluff Detangling 🪮', 'Scented Fragrant Ribbon 🧴']
        : lang === 'ko'
        ? ['장미 잎 마법 버블샤워 🧼', '보슬보슬 엉킨 털 골고루 풀기 🪮', '맞춤 아로마 보본 타이 부착 🧴']
        : ['温热花瓣泡沫浴 🧼', '精细蓬松梳整 🪮', '系上特调香氛饰带 🧴'];
    }
    return lang === 'en' 
      ? ['Herbal foam bath', 'Detangle woolly coat', 'Tie a gorgeous ribbon']
      : lang === 'ko'
      ? ['허브 기포 배스', '보들 엉킨 털 빗질', '고운 장식 끈 리본']
      : ['草本泡沫浴', '精细梳理被毛', '系上精美饰带'];
  }

  // TRAINING
  if (level === 3) {
    return lang === 'en' 
      ? ['Dragon Winds Evading Drills 🐉', 'Magic Spells Focus Jumping 🔮', 'Elite Tasty Mystic Beans 🍬']
      : lang === 'ko'
      ? ['용족 공지 활공 제동 훈련 🐉', '마도 정신 집중 도약 비행 🔮', '최일류 사육사 특제 사탕 🍬']
      : ['龙族御风特技训练 🐉', '魔法御法专注飞跳 🔮', '奖励精英美味魔豆 🍬'];
  }
  if (level === 2) {
    return lang === 'en' 
      ? ['Advanced Obstacles Hurdling 🏃', 'Bullseye Flying Touch Action ⚽', 'Reward Golden Baked Scone  waffle']
      : lang === 'ko'
      ? ['도전 장애 코스 타임 트라이얼 🏃', '중력 이탈 과녁 돌진 슛 ⚽', '포상 마법 아카데미 스콘 🧇']
      : ['障碍物跨越演练 🏃', '定点飞扑触碰球心 ⚽', '奖励精装黄金烤饼 🧇'];
  }
  return lang === 'en' 
    ? ['Hurdles jump exercises', 'Leap to touch the target', 'Reward baked scones']
    : lang === 'ko'
    ? ['장애물 허들 홉', '질주 표적 짚기 터치', '포상 구운 스콘 과자']
    : ['趣味跨栏练习', '飞扑触碰目标', '奖励美味烤饼'];
}

// Map Room titles
export function translateRoomTitle(roomId: RequestType, lang: Language): string {
  if (roomId === 'MEDICAL') {
    return lang === 'en' ? 'Arcane Treatment Ward 🩺' : lang === 'ko' ? '환상 치료 연구실 🩺' : '萌宠诊疗室';
  }
  if (roomId === 'GROOMING') {
    return lang === 'en' ? 'Cosmic Grooming Salon ✂️' : lang === 'ko' ? '아우라 스타일 미용실 ✂️' : '温馨美容沙龙';
  }
  return lang === 'en' ? 'Elite Training Arena 🎓' : lang === 'ko' ? '초집중 행동 훈련 운동장 🎓' : '趣味训练广场';
}

// Map Room description
export function translateRoomDesc(roomId: RequestType, lang: Language): string {
  if (roomId === 'MEDICAL') {
    return lang === 'en' 
      ? 'A healing ward focused on checking vitals, applying magical recovery balms, and soothing elixirs.'
      : lang === 'ko'
      ? '은은한 은하빛 치유 장소. 체온 스캔을 행하고, 통증 완화 연고를 조제하며 마법 주사를 처방합니다.'
      : '薄荷绿的治愈空间，用于检查体温、涂抹舒缓软膏和喂食草本营养片。';
  }
  if (roomId === 'GROOMING') {
    return lang === 'en'
      ? 'A pink aesthetic boutique offering warm organic foam shampoos, fur sorting, and ribbon accessorizing.'
      : lang === 'ko'
      ? '포근한 핑크빛 샵. 향긋한 아로마 거품 워시를 행하고 얽힌 깃털을 풀며 리본을 조율합니다.'
      : '柔粉色的温馨沙龙，提供温暖的泡沫护肤料、打理结块毛发并系上可爱饰带。';
  }
  return lang === 'en'
    ? 'A sky-blue stadium for teaching coordination hops, precision target touch, and scone treat incentives.'
    : lang === 'ko'
    ? '시원한 하늘 운동장. 타행 허들 이동 연습 및 집중 대공 격돌, 영양 소성 과자 훈련을 진행합니다.'
    : '天蓝色与鹅黄色的练习场地，用于小跨栏跳跃、目标触碰和美味零食训练。';
}

// Translate Shop Upgrades (Gold ones)
export interface UpgradeText {
  name: string;
  desc: string;
}

export const UPGRADE_TRANSLATIONS: Record<string, Record<Language, UpgradeText>> = {
  aromatherapy_candle: {
    en: {
      name: 'Lavender Magic Incense',
      desc: 'Releases sweet, calm herbal vapors, increasing maximum pet patience limit by +15 for all guests.'
    },
    zh: {
      name: '薰衣草魔法熏香',
      desc: '散发芬芳甜美的平静气息，使来访宠物的最大耐心上限增加 15 点。'
    },
    ko: {
      name: '라벤더 마법 향수 촛대',
      desc: '실내에 그윽한 수면 향기를 퍼트려 방문하는 모든 환상종의 기본 최대 인내도를 +15 올려줍니다.'
    }
  },
  hanging_ivy: {
    en: {
      name: 'Ecology Emerald Ivy',
      desc: 'Grants the blessing of nature. Extends the initial lobby patience status of newly arrived pets by +15%.'
    },
    zh: {
      name: '温馨生态常春藤',
      desc: '给到店宠物带来大自然的庇佑，使它们的初始耐心值额外提升 10%。'
    },
    ko: {
      name: '온화한 에코 담쟁이덩굴',
      desc: '푸른 풀과 잎의 축복을 내립니다. 등교하는 새로운 동물의 초기 진입 대기 기분을 +15% 확장합니다.'
    }
  },
  fairy_lights: {
    en: {
      name: 'Sparkly Dream Fairy Lights',
      desc: 'Envelops the clinic in a rapid cosmic aura, accelerating progress in all treatment activities by +25%!'
    },
    zh: {
      name: '五彩梦幻荧光灯',
      desc: '给诊所罩上一层奇异的梦幻光环。全方位使诊疗、美容和训练的处理效率提高 25%。'
    },
    ko: {
      name: '환상 별빛 커튼 조명',
      desc: '방 전체에 초시공적 주파수를 입힙니다. 모든 임상 보조 마찰 및 훈련 진척을 +25% 고도 가속합니다.'
    }
  },
  plush_carpets: {
    en: {
      name: 'Cozy Non-Slip Paw Carpet',
      desc: 'Very cushiony wool-woven rugs. Drastically slows down the patience depletion of lobby waiting customers by -30%!'
    },
    zh: {
      name: '松软防滑爪爪地毯',
      desc: '极其蓬松的编织小地毯，使在等候区大厅排队等候的宠物耐心流失速度降低 30%。'
    },
    ko: {
      name: '보송보송 육구 밀림 방지 카페트',
      desc: '대단히 통기성이 좋은 솜털 깔개. 소파 위 대기 중인 고객들의 초조한 인내도 하강 곡선을 -30% 경감합니다.'
    }
  },
  golden_treat_box: {
    en: {
      name: 'Royal Golden Treat Drawer',
      desc: 'Unlocks a premium meat treats shelf inside the lobby. Dispense steak anytime to restore +25 patience immediately to any pet!'
    },
    zh: {
      name: '金尊皇家小肉盒',
      desc: '在等候区大厅解锁专属美味肉肉选项，随时可以用肉饼零食给任意一只宠物补回 25 点耐心。'
    },
    ko: {
      name: '로열 골드 포식자 고기 함',
      desc: '대기 구역 벽장에 황실 특제 고기 통조림을 완비합니다. 클릭하면 즉시 한 동물의 인내도를 +25 소생 복구시킵니다.'
    }
  }
};

export const t = (key: keyof typeof UI_TRANSLATIONS['en'], lang: Language): string => {
  return UI_TRANSLATIONS[lang]?.[key] || UI_TRANSLATIONS['en'][key] || String(key);
};
