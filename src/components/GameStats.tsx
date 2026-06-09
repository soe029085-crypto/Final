import React, { useState } from 'react';
import { Heart, Coins, Sparkles, Volume2, VolumeX, HelpCircle, RefreshCw, Star, Info, ShoppingBag, BookOpen } from 'lucide-react';
import { cozyAudio } from '../audio';
import { Language, t } from '../translations';

interface GameStatsProps {
  hearts: number;
  coins: number;
  day: number;
  totalServed: number;
  onResetGame: () => void;
  goldenTreatsCount: number;
  showHelp: boolean;
  setShowHelp: (show: boolean) => void;
  activeModal: 'none' | 'shop' | 'journal';
  setActiveModal: (modal: 'none' | 'shop' | 'journal') => void;
  lang: Language;
}

export const GameStats: React.FC<GameStatsProps> = ({
  hearts,
  coins,
  day,
  totalServed,
  onResetGame,
  goldenTreatsCount,
  showHelp,
  setShowHelp,
  activeModal,
  setActiveModal,
  lang = 'en',
}) => {
  const [muted, setMuted] = useState(cozyAudio.getMuteState());
  const [helpTab, setHelpTab] = useState<'basic' | 'upgrade' | 'special'>('basic');

  const handleToggleMute = () => {
    const isNowMuted = cozyAudio.toggleMute();
    setMuted(isNowMuted);
    cozyAudio.playClick();
  };

  const handleResetConfirm = () => {
    const text = lang === 'en' 
      ? 'Are you sure you want to restart your pet clinic? All of your coins, satisfaction, up-levels and journal progress will be reset!' 
      : lang === 'ko' 
      ? '정말로 꼬마 신수소 운영 성과를 초기화하고 처음부터 새로 경영하시겠습니까? 골드와 만족도, 업그레이드가 소멸됩니다!' 
      : '你确定要重新开始你的萌宠店经营吗？当前所有进度都将被清零！';
    if (confirm(text)) {
      onResetGame();
    }
  };

  return (
    <div className="w-full bg-[#fcfbfa]/90 backdrop-blur-md border-4 border-[#eadecd] rounded-3xl p-4 md:p-5 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4 relative z-30">
      {/* Absolute cute sparkle banner */}
      <span className="hidden lg:flex items-center gap-1.5 absolute -top-3.5 left-8 px-3 py-1 bg-gradient-to-r from-amber-400 to-amber-500 border-2 border-[#3d3b3c] rounded-full text-xs font-semibold text-white tracking-wide shadow-sm font-sans">
        <Star className="w-3 h-3 fill-current animate-spin" />
        {lang === 'en' ? 'Fantasy Sanctuary' : lang === 'ko' ? '환상 반려동물 본부' : '宠物诊断所'}
      </span>

      {/* Main stats counters */}
      <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 font-sans">
        {/* Day count */}
        <div className="flex items-center gap-2 bg-[#faf8f5] border-2 border-[#eadecd] rounded-2xl px-4 py-2">
          <span className="text-xs uppercase font-extrabold text-amber-600 tracking-wider font-sans">
            {lang === 'en' ? 'DATE' : lang === 'ko' ? '날짜' : '日期'}
          </span>
          <span className="text-xl md:text-2xl font-bold font-pixel text-amber-700 leading-tight">
            {lang === 'en' ? `Day ${day}` : lang === 'ko' ? `Day ${day}` : `第 ${day} 天`}
          </span>
        </div>

        {/* Reputation Score */}
        <div className="flex items-center gap-3 bg-rose-50 border-2 border-rose-200 rounded-2xl px-4 py-2 hover:indigo-50 transition-colors">
          <Heart className="w-6 h-6 text-rose-500 fill-rose-500 animate-pulse animate-duration-1000" />
          <div className="text-left">
            <div className="text-[10px] uppercase font-black text-rose-600 tracking-wider">
              {lang === 'en' ? 'Hearts Satisfaction' : lang === 'ko' ? '만족도 하트' : '爱心满意度'}
            </div>
            <div className="text-lg md:text-xl font-bold font-pixel text-rose-700 leading-tight">
              {hearts} <span className="text-xs font-sans text-rose-400 font-medium">{lang === 'en' ? 'pts' : lang === 'ko' ? '개' : '点'}</span>
            </div>
          </div>
        </div>

        {/* Cozy Coins Balance */}
        <div className="flex items-center gap-3 bg-amber-50 border-2 border-amber-200 rounded-2xl px-4 py-2">
          <Coins className="w-6 h-6 text-amber-500 fill-amber-100" />
          <div className="text-left">
            <div className="text-[10px] uppercase font-black text-amber-600 tracking-wider">
              {lang === 'en' ? 'Magic Gold Coins' : lang === 'ko' ? '게임 골드' : '温馨萌宠币'}
            </div>
            <div className="text-lg md:text-xl font-bold font-pixel text-amber-800 leading-tight">
              {coins} <span className="text-xs text-amber-500">🪙</span>
            </div>
          </div>
        </div>

        {/* Golden Treats Special Inventory */}
        {goldenTreatsCount > 0 && (
          <div className="flex items-center gap-2 bg-emerald-50 border-2 border-emerald-200 rounded-2xl px-3.5 py-1.5 animate-bounce">
            <span className="text-xl">🍖</span>
            <div className="text-left">
              <div className="text-[9px] uppercase font-black text-emerald-700 tracking-wide font-sans">
                {lang === 'en' ? 'Lobby Treats' : lang === 'ko' ? '대기 로열쿠키' : '耐心小点心'}
              </div>
              <div className="text-[10px] font-bold text-emerald-800 font-sans">
                {lang === 'en' ? 'Active' : lang === 'ko' ? '공동 정량 공급중' : '尊贵金肉盒已生效!'}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Served Tracker and Control buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <span className="text-xs text-[#8c8273] font-sans font-semibold hidden sm:inline-block bg-[#f4efe6]/50 px-3 py-1.5 rounded-xl border border-[#eadecd] leading-none text-left">
          {lang === 'en' ? 'Cured' : lang === 'ko' ? '완치 신수' : '累计治愈幻想萌宠数'}: <strong>{totalServed}</strong>
          <span className={`ml-2 text-[9px] font-black px-2 py-0.5 rounded-lg border inline-flex items-center leading-none ${
            totalServed < 10 
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
              : totalServed < 20 
              ? 'bg-amber-50 text-amber-700 border-amber-200' 
              : 'bg-rose-50 text-rose-700 border-rose-200 animate-pulse'
          }`}>
            {totalServed < 10 
              ? (lang === 'en' ? '🌱 Simple Case' : lang === 'ko' ? '🌱 초급 진료' : '🟢 简单诊断') 
              : totalServed < 20 
              ? (lang === 'en' ? '✨ Medium Case' : lang === 'ko' ? '✨ 숙련 진료' : '🟡 中等进阶') 
              : (lang === 'en' ? '🔥 Expert Case' : lang === 'ko' ? '🔥 전문 도감' : '🔴 困难挑战')}
          </span>
        </span>

        {/* Audio Mute button */}
        <button
          onClick={handleToggleMute}
          className={`p-2.5 rounded-xl border-2 transition-all cursor-pointer ${
            muted
              ? 'bg-amber-50 border-amber-200 text-amber-500 hover:bg-amber-100'
              : 'bg-white border-[#eadecd] text-[#4d4a4b] hover:bg-[#faf8f5]'
          }`}
          title={lang === 'en' ? 'Toggle Audio' : lang === 'ko' ? '소리 설정' : '开启声音'}
          id="btn_mute_audio"
        >
          {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>

        {/* Upgrade Shop button */}
        <button
          onClick={() => {
            cozyAudio.playClick();
            setActiveModal(activeModal === 'shop' ? 'none' : 'shop');
            if (showHelp) setShowHelp(false);
          }}
          className={`p-2.5 rounded-xl border-2 transition-all cursor-pointer ${
            activeModal === 'shop'
              ? 'bg-amber-100 border-amber-300 text-amber-800 ring-2 ring-amber-100'
              : 'bg-white border-[#eadecd] text-amber-900 hover:bg-amber-50'
          }`}
          title={lang === 'en' ? 'Sanctuary Upgrades' : lang === 'ko' ? '진료소 강화 등급가' : '精品店升级装潢'}
          id="btn_shop_modal"
        >
          <ShoppingBag className="w-5 h-5 text-amber-600 animate-pulse" />
        </button>

        {/* Pet Journal button */}
        <button
          onClick={() => {
            cozyAudio.playClick();
            setActiveModal(activeModal === 'journal' ? 'none' : 'journal');
            if (showHelp) setShowHelp(false);
          }}
          className={`p-2.5 rounded-xl border-2 transition-all cursor-pointer ${
            activeModal === 'journal'
              ? 'bg-indigo-100 border-indigo-200 text-indigo-800 ring-2 ring-indigo-50'
              : 'bg-white border-[#eadecd] text-indigo-900 hover:bg-indigo-50'
          }`}
          title={lang === 'en' ? 'Species Manual' : lang === 'ko' ? '관찰 백과 앨범' : '科学图鉴'}
          id="btn_journal_modal"
        >
          <BookOpen className="w-5 h-5 text-indigo-600" />
        </button>

        {/* Help button */}
        <button
          onClick={() => {
            cozyAudio.playClick();
            setShowHelp(!showHelp);
            if (!showHelp) setActiveModal('none');
          }}
          className={`p-2.5 rounded-xl border-2 transition-all cursor-pointer ${
            showHelp
              ? 'bg-teal-50 border-teal-300 text-teal-700 font-bold'
              : 'bg-white border-[#eadecd] text-teal-900 hover:bg-teal-50'
          }`}
          title={lang === 'en' ? 'Clinic Help' : lang === 'ko' ? '조달 관리 요령' : '游戏指南'}
          id="btn_game_help"
        >
          <HelpCircle className="w-5 h-5 text-teal-600" />
        </button>

        {/* Reset button */}
        <button
          onClick={handleResetConfirm}
          className="p-2.5 rounded-xl border-2 bg-rose-50 border-rose-200 text-rose-600 hover:bg-rose-100 transition-all cursor-pointer"
          title={lang === 'en' ? 'Restart clinic' : lang === 'ko' ? '초기화하고 다시시작' : '重新开始'}
          id="btn_restart_game"
        >
          <RefreshCw className="w-5 h-5" />
        </button>
      </div>

      {/* Floating Tutorial Help Overlay Card */}
      {showHelp && (
        <div className="absolute top-20 right-4 lg:right-6 w-92 md:w-[450px] bg-white border-4 border-[#3d3b3c] rounded-[32px] p-5 shadow-2xl z-50 text-left animate-in fade-in duration-200">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b-2 border-dashed border-[#e6dfd3] pb-2 mb-3">
            <h3 className="text-xs md:text-sm font-black text-[#5c4d3c] flex items-center gap-1.5 header-fonts font-sans">
              📘 {lang === 'en' ? 'Sanctuary Directory & Cozy Clinic Guide' : lang === 'ko' ? '소장의 진료소 관리 비급 가이드' : '幻想诊断所 · 营业管理掌中宝'}
            </h3>
            <button
              onClick={() => {
                cozyAudio.playClick();
                setShowHelp(false);
              }}
              className="text-[#968e83] hover:text-[#524d46] text-xs font-bold font-sans px-2 py-0.5 bg-[#faf8f5] rounded-xl border-2 border-[#eadecd] cursor-pointer"
            >
              {lang === 'en' ? 'Hide' : lang === 'ko' ? '숨기기' : '收起'}
            </button>
          </div>

          {/* Guide Subtabs */}
          <div className="grid grid-cols-3 gap-1 bg-[#FAF8F5] border-2 border-[#eadecd] rounded-xl p-1 mb-4 font-sans">
            <button
              onClick={() => {
                cozyAudio.playClick();
                setHelpTab('basic');
              }}
              className={`py-1.5 text-[10px] font-black rounded-lg transition-all cursor-pointer ${
                helpTab === 'basic'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'text-zinc-500 hover:text-zinc-800'
              }`}
            >
              📖 {lang === 'en' ? 'Clinic Steps' : lang === 'ko' ? '기본 진료' : '基础门诊'}
            </button>
            <button
              onClick={() => {
                cozyAudio.playClick();
                setHelpTab('upgrade');
              }}
              className={`py-1.5 text-[10px] font-black rounded-lg transition-all cursor-pointer ${
                helpTab === 'upgrade'
                  ? 'bg-rose-500 text-white shadow-xs'
                  : 'text-zinc-500 hover:text-zinc-800'
              }`}
            >
              💖 {lang === 'en' ? 'Sectors' : lang === 'ko' ? '부서 승급' : '科室升级'}
            </button>
            <button
              onClick={() => {
                cozyAudio.playClick();
                setHelpTab('special');
              }}
              className={`py-1.5 text-[10px] font-black rounded-lg transition-all cursor-pointer ${
                helpTab === 'special'
                  ? 'bg-indigo-500 text-white shadow-xs'
                  : 'text-zinc-500 hover:text-zinc-800'
              }`}
            >
              🪙 {lang === 'en' ? 'Decor' : lang === 'ko' ? '인테리어' : '精品百货'}
            </button>
          </div>

          {/* Guide Content Panels */}
          {helpTab === 'basic' && (
            <div className="space-y-3 font-sans">
              <p className="text-[11px] text-[#8c8273] font-medium leading-normal">
                {lang === 'en' 
                  ? 'As head doctor, you must correctly route arriving mystical patients depending on their worries:' 
                  : lang === 'ko' 
                  ? '진료소 사장으로서 환수를 관찰하고 알맞은 치료 부서로 신속히 인계하십시오:' 
                  : '作为主治医生兼主理人，你需要引导小家伙们进行对应疗愈决策：'}
              </p>
              <ul className="space-y-2.5 text-xs text-[#524d46] leading-relaxed">
                <li className="flex items-start gap-2 bg-[#fdfaf5] p-2 rounded-xl border border-[#faf0e1]">
                  <span className="font-bold text-amber-600 bg-amber-50 w-5 h-5 flex items-center justify-center rounded-full border border-amber-200 flex-shrink-0 text-[10px]">1</span>
                  <span>
                    {lang === 'en' 
                      ? 'Listen to Worries (Diagnose): Read their speech bubbles to figure out if they got bruised/cold (Care), muddy fur (Grooming), or laggy posture (Training).' 
                      : lang === 'ko'
                      ? '기운 읽기 (진단): 소파 위 환수들의 중얼거림 속 숨은 아픔을 도출하여 내과, 미용, 스포츠 훈련실 중 한 곳을 택해 버튼을 누릅니다.'
                      : '仔细聆听 (诊断)：阅读大厅沙发上小可爱的心理碎碎念，以此推断它们是生病了（去医治）、想变漂亮（去美容）、还是太笨拙（去训练）。'}
                  </span>
                </li>
                <li className="flex items-start gap-2 bg-[#fdfaf5] p-2 rounded-xl border border-[#faf0e1]">
                  <span className="font-bold text-teal-600 bg-teal-50 w-5 h-5 flex items-center justify-center rounded-full border border-teal-200 flex-shrink-0 text-[10px]">2</span>
                  <span>
                    {lang === 'en' 
                      ? 'Strict Routing (No Spoils!): Route them via direct room buttons. If they end up in the wrong area, they leave unhappy!' 
                      : lang === 'ko'
                      ? '정확한 입과 (분류): 전용 인계 버튼을 누르십시오. 엉뚱한 방에 보내면 정산 퇴원 시 실망하여 하트가 소실되니 유의하세요.'
                      : '一键派送 (分类)：点击科室按钮将萌宠分流派送。如果分类错误，宠物出院时将气呼呼离开并扣除对应诊所评级收益！派对精准则双丰收。'}
                  </span>
                </li>
                <li className="flex items-start gap-2 bg-[#fdfaf5] p-2 rounded-xl border border-[#faf0e1]">
                  <span className="font-bold text-rose-500 bg-rose-50 w-5 h-5 flex items-center justify-center rounded-full border border-rose-200 flex-shrink-0 text-[10px]">3</span>
                  <span>
                    {lang === 'en' 
                      ? 'Click & Cure (Care flow): Click inside their medical cards to run healing steps. When finished, check them out for cash and hearts!' 
                      : lang === 'ko'
                      ? '터치 치료 (케어): 방 안의 생명체를 눌러 전용 단계를 완수하고 게이지를 마감하세요. 수납 전송 후 완료되면 보상이 가산됩니다.'
                      : '爱心康复 (操作)：点击科室中的萌宠可进行理疗动作，观察进度条。当所有步骤走过，宠物会转移到结算前台，出院即可收获硬币与爱心！'}
                  </span>
                </li>
              </ul>
            </div>
          )}

          {helpTab === 'upgrade' && (
            <div className="space-y-3 font-sans">
              <p className="text-[11px] text-[#8c8273] font-medium leading-normal">
                {lang === 'en' 
                  ? 'Spend satisfaction hearts 💖 from cured pets in the Sanctuary tab to upgrade clinic power:' 
                  : lang === 'ko' 
                  ? '환수들을 성공적으로 치유해 획득한 만족도 하트 💖로, 핵심 시설 등급을 올릴 수 있습니다:' 
                  : '积累痊愈动物留下的 爱心满意度 💖，可在精品升级商城的科室页签中强化诊所硬核能力：'}
              </p>
              <div className="space-y-2 text-[11px] text-[#524d46] leading-relaxed max-h-[220px] overflow-y-auto pr-1">
                <div className="p-2 border border-[#eadecd] rounded-xl space-y-1 bg-emerald-50/40">
                  <span className="font-bold text-emerald-800 text-xs">🩺 {lang === 'en' ? 'Clinical Ward (Lv1 - Lv3)' : lang === 'ko' ? '진료 센터 업그레이드' : '诊疗小屋 ➜ 魔法医疗中心'}</span>
                  <p>{lang === 'en' 
                    ? '• Lv2 Helper: Unlocks Leafy Kittens and more, plus triggers "AI Assistant Hints" 🧠 inside lobby cards to safely outline correct departments.' 
                    : lang === 'ko' 
                    ? '• Lv2 진단 보조: 대기실의 아기 카드 안에 스마트 "진단 서포터 AI" 뇌 가 연동되어 확실한 치료실 힌트를 공급합니다.' 
                    : '• Lv2 魔法诊断: 免费解锁全新高阶种群，同时装配「魔法AI会诊大脑」🧠，全自动分析并为你提供宠物的精确疾病诉求，防止错诊！'}</p>
                  <p>{lang === 'en' 
                    ? '• Lv3 Destiny Rewind: Triggers a free "Destiny Rediagnosis" reset ticket 🔮 once per day to return a misrouted pet safely to the lobby with 80% patience.' 
                    : lang === 'ko' 
                    ? '• Lv3 보류 텔레포트: 하루 한 번 실수로 잘못 보낸 아기 구조 구출 스킬 🔮 이 발휘되어, 80%의 인내를 머금고 대기석으로 귀환합니다.' 
                    : '• Lv3 幻彩救赎: 治疗出错时，额外启动每日一次梦幻🔮「重诊退回特权」，恢复 80% 耐心并完璧归归！'}</p>
                </div>
                <div className="p-2 border border-[#eadecd] rounded-xl space-y-1 bg-rose-50/40">
                  <span className="font-bold text-rose-800 text-xs">✂️ {lang === 'en' ? 'Grooming Salon (Lv1 - Lv3)' : lang === 'ko' ? '미용실 업그레이드' : '洗护角 ➜ 皇家造型馆'}</span>
                  <p>{lang === 'en' 
                    ? '• Lv2 Lavender Bubbles: Grants permanent +20% coins and satisfaction hearts 🪙💖 payoff for all successful grooming checkouts.' 
                    : lang === 'ko' 
                    ? '• Lv2 아로마 스파: 미용실 진료 졸업 시 정산되는 보상이 소급 적용되어 영구히 +20% 🪙💖 증폭 가산됩니다.' 
                    : '• Lv2 香氛精油: 美容科室出院大捷时，金币与爱心满意度收益永久提高 +20% 🪙💖！'}</p>
                  <p>{lang === 'en' 
                    ? '• Lv3 Royal Tiara: Summons prestigious elite client: 👑 Royal Princess Peacock.' 
                    : lang === 'ko' 
                    ? '• Lv3 로열 쥬얼리: 왕궁 최고 신화 귀빈용인 "👑 어여쁜 왕관 공주새" 단골 방문 이벤트를 완벽 고정 유도합니다.' 
                    : '• Lv3 皇家金饰: 极致解锁终极高奢珍稀顾客 👑 尊贵的“公主殿下”。'}</p>
                </div>
                <div className="p-2 border border-[#eadecd] rounded-xl space-y-1 bg-sky-50/40">
                  <span className="font-bold text-[#1e40af] text-xs">🎓 {lang === 'en' ? 'Training Academy (Lv1 - Lv3)' : lang === 'ko' ? '체육관 업그레이드' : '训练草坪 ➜ 魔法精英学院'}</span>
                  <p>{lang === 'en' 
                    ? '• Lv2 Swift Obstacles: Accelerates training step processing speed by +50% ⏱️, and prints a static bonus reward of +5 🪙 and +5 💖 each time.' 
                    : lang === 'ko' 
                    ? '• Lv2 부스터 코스: 훈련 반응 조작 게이지가 +50% ⏱️ 폭발 가치 가속되며, 성공 매 시간마다 +5 🪙, +5 💖를 추가 지급합니다.' 
                    : '• Lv2 飞行跨越: 动作训练效率爆升 +50% ⏱️，完美减少干预时间，且额外附赠金币 / 爱心 +5 的固定加成！'}</p>
                  <p>{lang === 'en' 
                    ? '• Lv3 Ember Drake: Unlocks legendary myth dragon 🐲 Ember Drake.' 
                    : lang === 'ko' 
                    ? '• Lv3 드래곤 소집: 아카데미가 용족 수용을 승인하여 "🐲 불씨 아기드래곤" 방문 행패 주파수를 기동화합니다.' 
                    : '• Lv3 余烬幼龙: 触发解锁极罕世上难寻常驻神兽：🐲 余烬幼龙来访。'}</p>
                </div>
                <div className="p-2 border border-[#eadecd] rounded-xl space-y-1 bg-amber-50/45">
                  <span className="font-bold text-amber-900 text-xs">🏪 {lang === 'en' ? 'Clinic Capacity (Lv1 - Lv3)' : lang === 'ko' ? '대기 로비 확장' : '常见小木屋 ➜ 梦幻等候中心'}</span>
                  <p>{lang === 'en' 
                    ? '• Lobby Seats limit: Expands lounge seats to 3 or 4 spaces, and triggers luxurious Boss client encounters like 🧙 Grand Mage or 🔑 Mystery Collector.' 
                    : lang === 'ko' 
                    ? '• 대기석 증축: 로비 한도를 3석, 4석으로 넓히며, [👑 수수께끼 소장가], [🧙 수석 마법사], [🗺️ 최고 모험가] 등의 보스 손님들을 초빙해 냅니다.' 
                    : '• Lv2 & Lv3 扩建: 大厅接待多达 3 或 4 位小可爱一同舒心排队，且概率触发幕后首席魔法师、首席探险家、神秘收藏家等至尊贵宾到访！'}</p>
                </div>
              </div>
            </div>
          )}

          {helpTab === 'special' && (
            <div className="space-y-3 font-sans">
              <p className="text-[11px] text-[#8c8273] font-medium leading-normal">
                {lang === 'en' 
                  ? 'Spend earned gold coins 🪙 to place physical decor and cute luxury equipment:' 
                  : lang === 'ko' 
                  ? '획득한 게임 골드 🪙로 인테리어 시설 가구를 기획 조달해 특수 혜택 보너스를 얻으세요:' 
                  : '花费 金币 🪙 在精品店购置装饰实体家具，让动物们流连忘返：'}
              </p>
              <ul className="space-y-2 text-xs text-[#524d46] leading-relaxed bg-[#faf8f5] p-3 rounded-2xl border border-[#ebdccb]">
                <li className="flex items-start gap-1.5 text-left">
                  <span>🕯️🌟</span>
                  <span>
                    {lang === 'en' 
                      ? 'Scented Candles & Fairylights: Dramatically retards patience decay speed, and accelerates service progress speed by +50%!' 
                      : lang === 'ko' 
                      ? '아로마 촛대 & 별빛 조명: 대기 아기들의 탈출 전 인내 소실을 격감시키고, 코스 완수 스피드를 1.5배 부스트 가열시킵니다.' 
                      : '香薰与灯饰：大范围延缓等候萌宠的耐心衰退速度，大幅降低焦虑，并提高调理服务速度 50% ⏱️！'}
                  </span>
                </li>
                <li className="flex items-start gap-1.5 text-left">
                  <span>🛋️🌿</span>
                  <span>
                    {lang === 'en' 
                      ? 'Anti-Slip Rugs & Green Ivy: Soothes lobby anxieties, limits patience decline by -30%, and raises initial entry patience limits by +15%.' 
                      : lang === 'ko' 
                      ? '포근 러그매트 & 담쟁이 덩굴: 대기 위로를 가미해 퇴실 불안도를 30% 제동하고, 내점 초기 인내 상한선을 1.15배 확대합니다.' 
                      : '松软防滑地毯与常春藤：安慰排队动物心灵，减少排队焦虑 30%，使全店客人进门生命上限及耐心基础提高 15%。'}
                  </span>
                </li>
                <li className="flex items-start gap-1.5 text-left">
                  <span>🍖🍬</span>
                  <span>
                    {lang === 'en' 
                      ? 'Golden Treats Box: Automatically spawns premium meaty treats. Feeding can immediately restore 30% patience score to lobby pets.' 
                      : lang === 'ko' 
                      ? '가용 쿠키 함대: 맛깔스런 고품격 로열 소고기 함을 연동해, 로비에서 고달파진 동물의 인내 수치를 즉시 30% 수혈 재생합니다.' 
                      : '至尊自动肉食盒：周期性免费提供多汁零嘴，遇到焦虑的排队患者可一键对任何大厅角色投喂，瞬间拉升 30% 耐心条！'}
                  </span>
                </li>
              </ul>
            </div>
          )}

          {/* Banner bottom tip */}
          <div className="mt-4 pt-2.5 border-t border-[#f4efe6] bg-[#fdfaf5] p-2.5 rounded-2xl flex items-start gap-2 text-[10px] text-[#786e60] leading-normal font-medium font-sans">
            <Info className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
            <span>
              {lang === 'en' 
                ? 'Tip: Use the upgrade tabs anytime to discover new species and increase capacity. Day progressions speed up automatically every 5 cured pets!' 
                : lang === 'ko' 
                ? '팁: 수시로 상점과 도감을 누벼 백과 수치를 점검하세요. 환수들을 5번 졸업시킬 때마다 다음 영업일 날짜가 화려히 밝아옵니다!' 
                : '记得按需点击顶部的“精品店升级装潢”和“科学图鉴”按钮来扩展你的奇幻萌宠百科与装备库噢！天数随服务人数增加而推进。'}
            </span>
          </div>

        </div>
      )}
    </div>
  );
};
