import React, { useState } from 'react';
import { ShopUpgrade } from '../types';
import { Sparkles, Check, Heart, Store, Activity, Scissors, Milestone } from 'lucide-react';
import { cozyAudio } from '../audio';
import { Language, t, UPGRADE_TRANSLATIONS } from '../translations';

interface DecorShopProps {
  upgrades: ShopUpgrade[];
  coins: number;
  onBuyUpgrade: (id: string, cost: number) => void;
  // Heart upgrades props
  hearts: number;
  medicalLevel: number;
  groomingLevel: number;
  trainingLevel: number;
  storeLevel: number;
  onUpgradeLevel: (type: 'medical' | 'grooming' | 'training' | 'store', cost: number) => void;
  lang: Language;
}

export const DecorShop: React.FC<DecorShopProps> = ({
  upgrades,
  coins,
  onBuyUpgrade,
  hearts,
  medicalLevel,
  groomingLevel,
  trainingLevel,
  storeLevel,
  onUpgradeLevel,
  lang: langConfig = 'en',
}) => {
  const lang = langConfig as Language;
  const [activeTab, setActiveTab] = useState<'decor' | 'facilities'>('facilities'); // Default to facility upgrades to show the requested heart system first!

  const currentTab = activeTab;

  const handleBuyDecor = (id: string, cost: number) => {
    if (coins >= cost) {
      cozyAudio.playHeal();
      onBuyUpgrade(id, cost);
    } else {
      cozyAudio.playPatienceWarning();
    }
  };

  const handleFacilityUpgrade = (type: 'medical' | 'grooming' | 'training' | 'store', currentLv: number, cost: number) => {
    if (currentLv >= 3) return;
    if (hearts >= cost) {
      cozyAudio.playHeal();
      onUpgradeLevel(type, cost);
    } else {
      cozyAudio.playPatienceWarning();
    }
  };

  // Facility Levels configurations fully localized
  const facilityData = [
    {
      type: 'medical' as const,
      currentLv: medicalLevel,
      icon: <Activity className="w-5 h-5 text-emerald-600" />,
      label: { en: '🩺 Care Unit', zh: '🩺 医治科室', ko: '🩺 진료실 본부' },
      levels: [
        {
          name: { en: 'Lv1 Clinic Shack', zh: 'Lv1 诊疗小屋', ko: 'Lv1 치료 은화 오두막' },
          cost: 0,
          desc: {
            en: 'Serves Teacup Slimes, Matcha Shibas, Cloudy Lambs. Treats common mild anomalies or light colds.',
            zh: '接待：茶杯史莱姆、抹茶柴犬、云朵小羊。只能看诊普通级微小异常或轻微感冒。',
            ko: '진료 대상: 찻잔 슬라임, 말차 시바견, 구름 아기양. 감기 같은 가벼운 일반적 증상만 돌보게 됩니다.'
          }
        },
        {
          name: { en: 'Lv2 Magic Care Room', zh: 'Lv2 魔法护理室', ko: 'Lv2 마법 특수 치료실' },
          cost: 30,
          desc: {
            en: 'Unlocks Leafy Kittens, Astro Bunnies, Caramel Foxes. Adds advanced AI Diagnostic Screen with treatment clues!',
            zh: '解锁：高级品质叶子小猫、星宿小兔、焦糖狐狸。新增「AI会诊大脑」🧠，看诊即附带多维智能诊断分析与额外疾病指向线索！',
            ko: '진료 대상: 나뭇잎 아기캣, 별자리 토끼, 카라멜 여우. 인공지능 AI 진단 브레인 🧠이 가동되어 진단 시 고효율 치유 힌트를 전수합니다.'
          }
        },
        {
          name: { en: 'Lv3 Fantasy Medical Center', zh: 'Lv3 幻想医疗中心', ko: 'Lv3 환상 종합 메디컬 메카' },
          cost: 75,
          desc: {
            en: 'Unlocks Rainbow Jellyfish, Ember Drakes and all pets. Grants "Rediagnosis 🔮" once/day to reset misrouted pets.',
            zh: '解锁：彩虹水母团子，余烬幼龙等全部萌宠。获得「每日一次免费重诊🔮」技能！患者分流诊断失误时，可免签退案重新诊断！',
            ko: '진료 대상: 무지개 해파리 경단, 불씨 아기드래곤 등 전원해금. 강력한 "하루 1회 대기실 재배치 🔮" 능력을 터득합니다.'
          }
        }
      ]
    },
    {
      type: 'grooming' as const,
      currentLv: groomingLevel,
      icon: <Scissors className="w-5 h-5 text-rose-500" />,
      label: { en: '✂️ Grooming Salon', zh: '✂️ 美容科室', ko: '✂️ 헤어스타일 살롱' },
      levels: [
        {
          name: { en: 'Lv1 Wash Corner', zh: 'Lv1 洗护角', ko: 'Lv1 냥이 온수 목욕장' },
          cost: 0,
          desc: {
            en: 'Basic warm sponge baths to fluff up and clean messy coats.',
            zh: '提供温暖温水对爱美小动物毛皮进行基础舒缓洗浴以及简单擦拭。',
            ko: '미온수로 털 표면을 가볍게 세정하고 기본적인 부드러운 수건 드라이를 보장합니다.'
          }
        },
        {
          name: { en: 'Lv2 Fragrance Boutique', zh: 'Lv2 香氛护理馆', ko: 'Lv2 로즈 입욕 스파관' },
          cost: 25,
          desc: {
            en: 'Adds flower bubble massage. Permanently boosts Grooming payouts of Cash & Satisfaction by +20% 🪙💖!',
            zh: '新增：玫瑰花瓣魔法浴、精油香氛微晶理疗。全能提升宠物美容享受度，使美容科室退理正确退还硬币和爱心收益永久提高 20% 🪙💖！',
            ko: '아로마 거품 워시가 신설됩니다. 미용 완료 시 획득하는 골드와 만족도 보상이 영구히 +20% 🪙💖 영구 업그레이드됩니다.'
          }
        },
        {
          name: { en: 'Lv3 Royal Salon', zh: 'Lv3 皇家造型馆', ko: 'Lv3 엑설런트 황실 궁전' },
          cost: 60,
          desc: {
            en: 'Adds golden tiaras and cosmic feather accents. Unlocks highly specialized elite guest: 👑 Royal Princess Pets.',
            zh: '新增：定制微奢星光耳饰、弯弯月光羽毛等神话造型。极致解锁极高规格的特殊顾客：👑 尊贵的公主殿下。',
            ko: '특수 은하수 티아라, 황금 깃털 코디. 최고 럭셔리 VIP 단골 인형인 "👑 어여쁜 왕관 공주새" 단독 방문을 유도합니다.'
          }
        }
      ]
    },
    {
      type: 'training' as const,
      currentLv: trainingLevel,
      icon: <Milestone className="w-5 h-5 text-sky-600" />,
      label: { en: '🎓 Training Lawn', zh: '🎓 训练科室', ko: '🎓 집중 영재 훈련 시설' },
      levels: [
        {
          name: { en: 'Lv1 Training Turf', zh: 'Lv1 训练草坪', ko: 'Lv1 초급 새내기 운동장' },
          cost: 0,
          desc: {
            en: 'Basic obstacle jumps and ball retrievals to develop reflexes and basic coordination traits.',
            zh: '基础动作跨栏步、丢掷球投递练习，锻炼动物们的肢体习惯与基础指令。',
            ko: '허들 뛰어넘기 및 미니 볼 회수 놀이로 생명체의 몸체 조작 능력과 행동 기틀을 다집니다.'
          }
        },
        {
          name: { en: 'Lv2 Obstacle Park', zh: 'Lv2 障碍乐园', ko: 'Lv2 도약 어드벤처 타운' },
          cost: 25,
          desc: {
            en: 'Adds magic loops. Boosts activity speed by +50% ⏱️. Generates an extra +5 🪙 and +5 💖 for every graduate!',
            zh: '新增：魔法跳跃课程、滑翔飞行课程。显著提高训练课效率——动作交互处理速度提升 50% ⏱️，且每次训练大捷退房时额外提供 +5 🪙 和 +5 ❤️！',
            ko: '훈련 탭의 반응 완수 스피드가 +50% ⏱️ 폭발 가속되며, 성공 졸업 성표 퇴원 시 마다 추가 보너스로 +5 🪙, +5 ❤️를 제공합니다.'
          }
        },
        {
          name: { en: 'Lv3 Elite Academy', zh: 'Lv3 精英学院', ko: 'Lv3 엘리트 고공 사관학교' },
          cost: 60,
          desc: {
            en: 'Adds aerial breath maneuvers and cosmic blink trails. Heavily increases Legendary 🐲 Ember Drake spawn visits.',
            zh: '新增：龙族吐息制空偏航纠正、超现实魔法闪烁飞行。极致解锁繁育极罕萌宠：🐲 余烬幼龙常驻造访机率。',
            ko: '드래곤 멸공 제동 전술 지식 습득 배양. 최도 신화 동물인 "🐲 불씨 아기드래곤" 방문 행패 주파수를 고도로 이끕니다.'
          }
        }
      ]
    },
    {
      type: 'store' as const,
      currentLv: storeLevel,
      icon: <Store className="w-5 h-5 text-amber-600" />,
      label: { en: '🏪 Clinic General', zh: '🏪 店铺整体', ko: '🏪 진단소 인프라 전반' },
      levels: [
        {
          name: { en: 'Lv1 Simple Parlor', zh: 'Lv1 常见小木屋', ko: 'Lv1 아담 오두막' },
          cost: 0,
          desc: {
            en: 'Lobby seating capacity: Maximum of 2 pets waiting and sitting simultaneously.',
            zh: '萌宠客满限制为：大厅最多只能同时容纳 2 位等候区的萌宠顾客排队。',
            ko: '대기석 한도: 원내 로비 대기 소파가 2석으로 구성되어 최대 2마리까지만 안전 대기가 가능합니다.'
          }
        },
        {
          name: { en: 'Lv2 Cozy Parlor', zh: 'Lv2 温馨宠物屋', ko: 'Lv2 스위트 포근 펫 룸' },
          cost: 40,
          desc: {
            en: 'Adds cute extra lounge cushions. Expands lobby queue capacity to 3 pets simultaneously.',
            zh: '扩容大厅座椅环境：等候大厅坐垫席位提升，允许最多同时拥有 3 位顾客等候排队。',
            ko: '소파 대기석 확장: 등받이 폭 포인트를 늘려 대기실 내 3마리 수용이 정식 가동됩니다.'
          }
        },
        {
          name: { en: 'Lv3 Dream Pavilion', zh: 'Lv3 梦幻宠物中心', ko: 'Lv3 드림스타 메디컬 헤드쿼터' },
          cost: 80,
          desc: {
            en: 'Lobby limits up to 4 patients. Unlocks Boss Guests: 👑 Wealthy Collector, 🧙 Grand Mage, and 🗺️ Renowned Explorer!',
            zh: '梦幻大厅扩容顶点：允许最多同时拥有 4 位顾客坐席。且终极解锁「特殊贵宾萌宠事件」：幕后大BOSS神秘收藏家👑、首席魔法师🧙、首席探险家🗺️！',
            ko: '로비 최종 증량 4마리 완비. 전하의 보스 귀빈 이벤트 해금: [👑 수수께끼 거상 보스], [🧙 수석 마도사], [🗺️ 모험 탐험대장]들이 조우 방문합니다!'
          }
        }
      ]
    }
  ];

  return (
    <div className="w-full bg-[#fcfbfa]/95 border-4 border-[#eadecd] rounded-3xl p-4 md:p-5 shadow-sm">
      
      {/* Top Selector Panel */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 border-b-2 border-amber-100 pb-4 mb-5">
        <div>
          <h3 className="font-extrabold text-[#43392e] text-lg flex items-center gap-1.5 header-fonts">
            {lang === 'en' ? '🐾 Fantasy Upgrade & Decor Center' : lang === 'ko' ? '🐾 환상 치료실 업그레이드 센터' : '🐾 幻想诊断所 · 升级中心'}
          </h3>
          <p className="text-[11px] text-[#8c8273] font-medium mt-0.5 font-sans leading-normal">
            {lang === 'en' 
              ? 'Spend coins to decorate with boutique items, or use satisfaction hearts to upgrade clinical care level!' 
              : lang === 'ko' 
              ? '골드로 가구를 입혀 아기들을 아늑히 감싸거나, 누적 만족도로 부서 단계를 승급시키세요!' 
              : '积累硬币金币天置实体家具，或累积来客痊愈的心满意足爱心（满意度），升级核心科室能力！'}
          </p>
        </div>

        {/* Tab Selection Switches */}
        <div className="flex bg-slate-100 p-1 rounded-2xl border-2 border-slate-200 font-sans">
          <button
            onClick={() => {
              cozyAudio.playClick();
              setActiveTab('facilities');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold leading-none cursor-pointer transition-all flex items-center gap-1.5 ${
              currentTab === 'facilities'
                ? 'bg-rose-500 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Heart className="w-3.5 h-3.5 fill-current" />
            {t('facilityUpgrades', lang)}
          </button>
          <button
            onClick={() => {
              cozyAudio.playClick();
              setActiveTab('decor');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold leading-none cursor-pointer transition-all flex items-center gap-1.5 ${
              currentTab === 'decor'
                ? 'bg-amber-500 text-[#2c1c05] shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            {t('decorShop', lang)}
          </button>
        </div>
      </div>

      {/* Main Display depending on tab */}
      {currentTab === 'facilities' ? (
        <div className="space-y-5">
          {/* Heart count banner */}
          <div className="w-full bg-rose-50 border-2 border-rose-100 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <span className="text-3xl animate-pulse">💖</span>
              <div className="text-left">
                <h4 className="font-bold text-rose-950 text-sm">
                  {lang === 'en' ? 'Cumulative Satisfaction Milestones 🎖️' : lang === 'ko' ? '진료소 누적 만족도 하트 🎖️' : '全店累计爱心里程碑 Satisfaction Store'}
                </h4>
                <p className="text-[10.5px] text-rose-700 leading-normal font-sans pr-2">
                  {lang === 'en' 
                    ? 'Satisfaction hearts manifest from the immense joy and gratitude of mystical patients after being accurately diagnosed and cared for.' 
                    : lang === 'ko' 
                    ? '이 하트는 동물을 정확한 시설에 이송하여 성공적으로 가려한 때 생겨난 고마움 마음의 상징입니다.' 
                    : '这些爱心是由每一位小可爱被精准分类、成功疗愈后流露出的痊愈喜悦所化。'}
                </p>
              </div>
            </div>
            <div className="px-5 py-2.5 bg-white border border-rose-200 rounded-2xl flex flex-col items-center shadow-xs shrink-0">
              <span className="text-[10px] uppercase font-black text-rose-500 font-sans tracking-widest leading-none mb-1">
                {lang === 'en' ? 'Available Hearts' : lang === 'ko' ? '가용 만족도' : '可用爱心满意度'}
              </span>
              <span className="text-xl md:text-2xl font-black text-rose-600 font-pixel tracking-wider leading-none">{hearts} 💖</span>
            </div>
          </div>

          {/* Facilities list mapping */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {facilityData.map((facility) => {
              const currentLevelIndex = facility.currentLv - 1; // 0, 1, 2
              const nextLevelIndex = facility.currentLv; // 1, 2, 3 (3 means max)
              const hasNext = nextLevelIndex < 3;
              const nextCost = hasNext ? facility.levels[nextLevelIndex].cost : 0;
              const currentConfig = facility.levels[currentLevelIndex];
              const nextConfig = hasNext ? facility.levels[nextLevelIndex] : null;
              const canAfford = hasNext && hearts >= nextCost;

              return (
                <div
                  key={facility.type}
                  className="bg-white border-2 border-[#eadecd] rounded-[28px] overflow-hidden shadow-xs flex flex-col justify-between text-left"
                >
                  {/* Top bar with level trackers */}
                  <div className="bg-[#FAF8F5] border-b border-[#ebdccb] px-4 py-3.5 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-[#FAF8F5] border border-[#eadecd] rounded-xl shadow-inner inline-flex">
                        {facility.icon}
                      </div>
                      <span className="font-black text-slate-800 text-sm font-sans tracking-tight">
                        {facility.label[lang]}
                      </span>
                    </div>

                    {/* Stage visual indicators */}
                    <div className="flex items-center gap-1.5">
                      {[1, 2, 3].map((lv) => (
                        <div
                          key={lv}
                          className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-black font-mono border ${
                            lv <= facility.currentLv
                              ? 'bg-emerald-500 text-white border-emerald-600'
                              : 'bg-zinc-100 text-zinc-400 border-zinc-200'
                          }`}
                          title={`Level ${lv}`}
                        >
                          {lv}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Body details */}
                  <div className="p-4 flex-1 space-y-3">
                    {/* Current level display */}
                    <div>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-sans">
                        {t('currentPower', lang)}: {currentConfig.name[lang]}
                      </span>
                      <p className="text-[11.5px] text-[#5c5449] leading-relaxed mt-1.5 font-sans">
                        {currentConfig.desc[lang]}
                      </p>
                    </div>

                    {/* Next level display (Locked preview) */}
                    {hasNext && nextConfig && (
                      <div className="pt-2.5 border-t border-dashed border-zinc-100 bg-[#fbf9f5]/50 rounded-2xl p-3">
                        <span className="text-[10px] font-semibold text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded border border-zinc-200 font-sans">
                          {t('nextPowerUnlock', lang)}: {nextConfig.name[lang]}
                        </span>
                        <p className="text-[11px] text-[#7a7062] leading-normal mt-1 bg-white border border-dashed border-zinc-100 p-2 rounded-xl font-sans">
                          {nextConfig.desc[lang]}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Action Purchase Button */}
                  <div className="p-4 pt-0">
                    {hasNext && nextConfig ? (
                      <button
                        onClick={() => handleFacilityUpgrade(facility.type, facility.currentLv, nextCost)}
                        disabled={!canAfford}
                        className={`w-full py-2.5 px-4 rounded-2xl font-bold text-xs flex items-center justify-center gap-1.5 border-b-4 transition-all ${
                          canAfford
                            ? 'bg-rose-500 hover:bg-rose-400 text-white border-rose-700 active:border-b-0 active:translate-y-1 cursor-pointer'
                            : 'bg-[#faf8f5] text-slate-400 border-zinc-100 cursor-not-allowed border font-medium'
                        }`}
                        id={`btn_upgrade_facility_${facility.type}`}
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        {lang === 'en' 
                          ? `Upgrade to ${nextConfig.name.en} (${nextCost} 💖)` 
                          : lang === 'ko' 
                          ? `${nextConfig.name.ko} 승급 (${nextCost} 💖)` 
                          : `升至 ${nextConfig.name.zh} (花费 ${nextCost} 💖)`}
                      </button>
                    ) : (
                      <div className="w-full py-2 bg-emerald-50 text-emerald-700 text-xs font-bold font-sans rounded-xl border border-emerald-200 text-center flex items-center justify-center gap-1">
                        {t('maxLevelReached', lang)}
                      </div>
                    )}
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div>
          {/* Coins balance banner */}
          <div className="w-full bg-amber-50/70 border-2 border-amber-100 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2.5">
              <span className="text-3xl animate-bounce">🪙</span>
              <div className="text-left">
                <h4 className="font-bold text-amber-950 text-sm">
                  {lang === 'en' ? 'Boutique Gold Vault' : lang === 'ko' ? '수납 금고 잔고' : '持有金币硬币 Gold Account Balance'}
                </h4>
                <p className="text-[10.5px] text-amber-800 leading-normal font-sans">
                  {lang === 'en' 
                    ? 'Coins earned from satisfying customers. Spend them on lavender magic candles, ivy leaves, and sparkly lights.' 
                    : lang === 'ko' 
                    ? '마법 완치 반려동물이 보답으로 주고 간 둥근 코인입니다. 원내 장식 가구를 배치하는 조달원입니다.' 
                    : '用于购买各式魔法挂帘、安抚草本熏香以及蓬松舒适的爪爪专用长毛绒沙发和点心。'}
                </p>
              </div>
            </div>
            <div className="px-5 py-2.5 bg-white border border-amber-200 rounded-2xl flex flex-col items-center shadow-xs shrink-0 bg-white">
              <span className="text-[10px] uppercase font-black text-amber-500 font-sans tracking-widest leading-none mb-1">
                {lang === 'en' ? 'Available Coins' : lang === 'ko' ? '가용 코인' : '可用游戏金币'}
              </span>
              <span className="text-xl md:text-2xl font-black text-amber-700 font-pixel tracking-wider leading-none">{coins} 🪙</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {upgrades.map((upgrade) => {
              const canAfford = coins >= upgrade.cost;
              const details = UPGRADE_TRANSLATIONS[upgrade.id]?.[lang] || { name: upgrade.name, desc: upgrade.description };

              return (
                <div
                  key={upgrade.id}
                  className={`p-4 rounded-2xl border-2 flex flex-col justify-between gap-3 transition-all ${
                    upgrade.purchased
                      ? 'bg-emerald-50/50 border-emerald-200'
                      : 'bg-white border-[#eadecd] hover:border-amber-300 hover:shadow-xs'
                  }`}
                >
                  <div className="text-left">
                    <div className="flex items-center justify-between gap-2 mb-1.5 font-sans">
                      <div className="flex items-center gap-2">
                        <span className="text-2.5xl p-2 bg-[#faf8f5] rounded-xl border border-[#eadecd] leading-none inline-block">
                          {upgrade.icon}
                        </span>
                        <span className="font-bold text-slate-800 text-xs md:text-sm">{details.name}</span>
                      </div>
                      {upgrade.purchased ? (
                        <span className="flex items-center gap-0.5 px-2 py-0.5 bg-emerald-100/80 border border-emerald-300 rounded-full text-[10px] font-bold text-emerald-700 uppercase shrink-0">
                          <Check className="w-3" /> {t('purchased', lang)}
                        </span>
                      ) : (
                        <span className="text-xs font-mono font-bold text-amber-700 bg-amber-100/70 border border-amber-200 px-2 py-0.5 rounded-lg flex items-center shrink-0">
                          {upgrade.cost} <span className="text-[10px] ml-0.5">🪙</span>
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#6e685f] leading-relaxed mt-1 font-sans">
                      {details.desc}
                    </p>
                  </div>

                  {!upgrade.purchased && (
                    <button
                      onClick={() => handleBuyDecor(upgrade.id, upgrade.cost)}
                      disabled={!canAfford}
                      className={`w-full py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 border-b-4 transition-all ${
                        canAfford
                          ? 'bg-amber-400 hover:bg-amber-350 text-[#2c1c05] border-amber-600 active:border-b-2 active:translate-y-0.5 cursor-pointer shadow-xs'
                          : 'bg-[#faf8f5] text-[#b3b3b3] border-zinc-100 border cursor-not-allowed shadow-none font-medium'
                      }`}
                      id={`btn_buy_${upgrade.id}`}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      {canAfford ? t('buyDecor', lang) : t('notEnoughCoins', lang)}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
