import React, { useState } from 'react';
import { SPECIES_LIST, SpeciesData } from '../data';
import { Sparkles, Trophy, BookOpen, Heart } from 'lucide-react';
import { cozyAudio } from '../audio';
import { Language, t, translateSpecies, SPECIES_TRANSLATIONS, SPECIES_DESC_TRANSLATIONS } from '../translations';

interface PetJournalProps {
  servedCounts: Record<string, number>;
  lang: Language;
}

export const PetJournal: React.FC<PetJournalProps> = ({ servedCounts, lang: langConfig = 'en' }) => {
  const lang = langConfig as Language;
  const [selectedSpecies, setSelectedSpecies] = useState<SpeciesData>(SPECIES_LIST[0]);

  // Count how many unique species have been served at least once
  const uniqueList = Object.keys(servedCounts).filter((k) => servedCounts[k] > 0);
  const totalDiscoveredCount = uniqueList.length;

  const funFacts: Record<string, Record<Language, string>> = {
    '茶杯史莱姆': {
      en: 'Loves sleeping inside cupboards. Frequently found squeezed inside empty teacups. When they become overly mushy and hot, place them in the magic chiller to solidify.',
      zh: '最喜欢睡在橱柜内部，常被发现挤在空茶杯内。每当它们过度激动而变得温热柔软时，把它们放进冰箱冷藏室稍事休息能快速冷静下来！',
      ko: '찬장 깊숙이 주무시는 것을 즐깁니다. 때로 찻알 구석 스퀴즈 된 상태로 발견되는데, 인내도가 줄어 흥분하면 냉각실에 살짝 넣어주세요.'
    },
    '云朵小羊': {
      en: 'When cloudy lambs fall asleep, their curled cloud-wool puff out sweet cotton-candy scented calming vapor. Suggest soothing instrumental tunes.',
      zh: '它们入睡后身上卷曲的羊毛会自动喷吐出棉花糖香气的宁静蒸汽。它们洗澡美容时最喜欢听轻柔舒缓 ofi 纯音乐。',
      ko: '잠에 빠져들면 소용돌이 모양의 털에서 솜사탕 향의 유순한 프레그런스가 유출됩니다. 미용 주사 시 가벼운 소울 음악을 연주해 주면 편안해집니다.'
    },
    '星宿小兔': {
      en: 'Relies on starry constellations for cosmic charging. If their stars dim, put them near a moonlit window to rejuvenate their spirits.',
      zh: '依靠夜晚的璀璨星光来获取能量。如果它们的星空耳朵亮光突然消灭了，赶紧把它们抱到窗边，用温暖惬意的月光沐浴它们吧。',
      ko: '깊은 밤 총천의 별자리 아우라를 축적하여 살아가며, 귀 끝의 별빛이 사그라드는 즉시 창문가로 이송시켜 정겨운 월광을 비춰주어야 치유됩니다.'
    },
    '抹茶柴犬': {
      en: 'A rounded cheerful puppy whose tail curled into exactly 2.5 loops when feeling happy. Loves traversing active athletic obstacles.',
      zh: '一只非常健康的修勾，闻到抹茶浓盐泡沫或看到训练跨栏时，尾巴会精准缩成整整 2.5 圈。具有极强的服从性且热爱障碍。',
      ko: '말차 거품을 발견하면 꼬리가 정밀히 2.5바퀴 달팽이 모양으로 응결되는 기특한 시바견. 성격이 온건하여 허들 뛰어넘기를 광적으로 즐깁니다.'
    },
    '叶子小猫': {
      en: 'Unbelievably light body! They love snoozing on big herbal flower petals, levitating 4 inches above ground by flapping leafy wings.',
      zh: '身子特别轻巧！小家伙最爱睡在宽扁的花瓣上，高兴时只要挥挥小翅膀，就能稳稳地悬浮离地四英寸呢。',
      ko: '무게가 거의 느껴지지 않는 가벼운 아기캣. 허브 밭 꽃봉오리에 파묻혀 취침하며, 기공 날개를 푸닥여 공중 4인치 수준을 상시 부양합니다.'
    },
    '余烬幼龙': {
      en: 'When ember drakes hiccup, they spew out tiny safe fireworks that smell like grilled blood-oranges. Keep ice cream away to defend their furnace!',
      zh: '打嗝时会咕噜噜吐出散发烤橘子香气的迷你温热火星！警惕：千万别给它们吃冰淇淋，否则娇嫩的火焰核心会短暂熄灭。',
      ko: '딸꾹질할 때 구운 오렌지 냄새의 화려한 아기 불꽃을 자글자글 뿜습니다. 단, 달콤한 아이스크림을 하사하면 속안의 고열 화로가 식어버립니다.'
    },
    '焦糖狐狸': {
      en: 'Feeds on sweet cookies. Their fluffy caramel-syrup tails release delicious milky notes when pampered, but stickiness means they raided the maple pantry.',
      zh: '每次吃下一整盒最心爱的蜂蜜曲奇或蜂蜜布丁，尾巴就会不由自主地散发淡淡的烘烤奶香味！焦糖尾巴黏糊糊的时候通常是因为去厨房偷吃了太多的枫糖浆。',
      ko: '달콤한 벌꿀 머핀을 식사하면 꼬리 끝 사시나무에서 카라멜 연유 향이 발산됩니다. 만약 꼬리가 끈적거리는 경우, 보관소의 꿀을 훔쳐먹은 증거입니다.'
    },
    '冰晶企鹅': {
      en: 'Inhabits ancient, eternal glacier lines. Slumping off ice fields naturally freezes their fur. Resolve this gently with grooming blow dryers.',
      zh: '生活在万年不化的坚冰上。每次在冰面作旋转飞跃、或者滑雪滑梯回来时，羽毛结冰属于很常见但必须尽快用温热风机或雪花水护理温柔溶出的有趣状态。',
      ko: '빙하 평원 속에 서식하며, 고속 썰매 슬라이딩을 거듭한 후 깃털이 언 상태로 원내에 실려옵니다. 샤워룸의 드라이기로 가볍게 가온 용해를 행해야 합니다.'
    },
    '月光猫头鹰': {
      en: 'Reflects silver light from the forest moon. Soft moonlight therapy can instantly restore their ruffled silver plumage caused by bright light shock.',
      zh: '夜晚能自主反射最皎洁的森林月辉。若遭遇夜光蘑菇强光刺激、或长途飞行后羽毛乱蓬蓬的，只要做一次银色羽毛温润理疗就能迅速恢复迷人的满月银色。',
      ko: '깊은 숲 달무리를 깃털에 완벽 투영해 내며 밤을 지배합니다. 강렬한 조명을 맞으면 날개 가닥이 흩어지는데, 미용실 리클라이너에서 은빛 비늘 치료를 선사하세요.'
    },
    '彩虹水母团子': {
      en: 'Shifts transparent body colors in tune with human vocal tones. Often wobbles in half-air, requiring buoyancy and flip training classes.',
      zh: '会根据主人和医生和蔼的语调变幻出彩虹一般绚烂的半透明微光。但它们的空中定位极度虚弱，浮力控制不稳时，需要接受专业的半空翻转与浮力矫正训练。',
      ko: '의사선생님의 온정 어린 스피치 주파수를 해석하여 오색찬란한 빛을 내뿜습니다. 공중 부력 제어가 어지러워 미끄러지면 즉시 하늘 전사 훈련을 병행하세요.'
    }
  };

  const rarityMap: Record<string, Record<Language, string>> = {
    'Common': { en: 'Common', zh: '普通级', ko: '일반 등급' },
    'Uncommon': { en: 'Uncommon', zh: '杰出级', ko: '우수 등급' },
    'Rare': { en: 'Rare', zh: '珍稀级', ko: '희귀 등급' },
    'Legendary': { en: 'Legendary', zh: '幻想传说级', ko: '전설·신화 등급' }
  };

  return (
    <div className="w-full bg-[#fcfbfa]/95 border-4 border-[#eadecd] rounded-3xl p-5 shadow-sm">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 border-b-2 border-amber-100 pb-3 gap-2">
        <div className="flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-indigo-700" />
          <div className="text-left font-sans">
            <h3 className="font-bold text-indigo-900 text-base md:text-lg">
              {lang === 'en' ? '🐾 Pet Care Encyclopedia (Research Manual)' : lang === 'ko' ? '🐾 꼬마 신수 관찰 도감 (연구 매뉴얼)' : '🐾 萌宠护理科学图鉴 (百科手册)'}
            </h3>
            <p className="text-xs text-[#8c8273]">
              {lang === 'en' 
                ? 'Check out the behavioral traits and background stories of all of our magical clinic visitors.' 
                : lang === 'ko' 
                ? '진료소를 찾는 모든 환수 종족의 생활 습관 및 질환 습성 히스토리를 연구합니다.' 
                : '在这里能查阅每一款探访诊所的幻想小生灵们的详细习性与背景故事'}
            </p>
          </div>
        </div>

        {/* Discovery percentage badge */}
        <div className="flex items-center gap-1.5 px-3 py-1 bg-indigo-50 border border-indigo-100 text-indigo-800 rounded-2xl text-xs font-bold leading-tight font-sans">
          <Trophy className="w-3.5 h-3.5 text-amber-500 fill-amber-100" />
          <span>
            {lang === 'en' ? 'Discovery Progress' : lang === 'ko' ? '도감 해금도' : '图鉴开启进度'}: {totalDiscoveredCount} / {SPECIES_LIST.length}
          </span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-5">
        {/* Left column: scrollable mini species items */}
        <div className="w-full md:w-2/5 flex flex-col gap-2 max-h-80 overflow-y-auto pr-1">
          {SPECIES_LIST.map((spec) => {
            const hasServed = servedCounts[spec.species] > 0;
            const isSelected = selectedSpecies.species === spec.species;
            const translatedName = translateSpecies(spec.species, lang);

            return (
              <button
                key={spec.species}
                onClick={() => {
                  cozyAudio.playClick();
                  setSelectedSpecies(spec);
                }}
                className={`w-full text-left p-3 rounded-2xl border-2 flex items-center justify-between transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-50 border-indigo-300 shadow-xs'
                    : 'bg-white border-[#f4efe6] hover:border-amber-200'
                }`}
                id={`btn_journal_${spec.species.toLowerCase().replace(' ', '_')}`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl p-1 bg-[#fdfbf7] rounded-lg border border-[#eadecd]">
                    {spec.emoji}
                  </span>
                  <div className="font-sans">
                    <div className="font-bold text-slate-800 text-xs">
                      {hasServed ? translatedName : '???'}
                    </div>
                    <div className="text-[10px] text-slate-500 font-medium">
                      {hasServed ? rarityMap[spec.rarity][lang] : (lang === 'en' ? 'Not yet met' : lang === 'ko' ? '미발견종' : '尚未遇见的生物')}
                    </div>
                  </div>
                </div>

                <div className="text-right font-sans shrink-0">
                  <span className="text-[10px] font-bold text-slate-400 block tracking-tight">
                    {lang === 'en' ? 'Cured' : lang === 'ko' ? '완치' : '累计治愈'}
                  </span>
                  <span className="text-xs font-bold text-slate-700 font-pixel">
                    {servedCounts[spec.species] || 0} {lang === 'en' ? 'times' : lang === 'ko' ? '회' : '次'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right column: detailed species inspection card */}
        <div className="w-full md:w-3/5 bg-[#faf8f5] border-2 border-[#eadecd] rounded-2xl p-4 flex flex-col justify-between text-left">
          <div>
            {/* Header info */}
            <div className="flex items-center gap-3.5 mb-3 font-sans">
              <div className="text-4xl p-2.5 bg-white border-2 border-[#eadecd] rounded-2xl float-cute leading-none shadow-xs">
                {selectedSpecies.emoji}
              </div>
              <div>
                <h4 className="font-bold text-[#43392e] text-base leading-snug">
                  {servedCounts[selectedSpecies.species] > 0 
                    ? translateSpecies(selectedSpecies.species, lang) 
                    : (lang === 'en' ? '??? File Sealed ???' : lang === 'ko' ? '??? 정보 미잠금 해제 ???' : '??? 暂未解锁档案 ???')}
                </h4>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className={`px-2 py-0.5 rounded border text-[9px] font-black uppercase tracking-wider ${
                    selectedSpecies.rarity === 'Legendary' ? 'bg-amber-100 text-amber-950 border-amber-300' :
                    selectedSpecies.rarity === 'Rare' ? 'bg-rose-100 text-rose-800 border-rose-300' :
                    selectedSpecies.rarity === 'Uncommon' ? 'bg-sky-100 text-sky-800 border bg-sky-50 border-sky-300' :
                    'bg-slate-100 text-slate-600 border border-slate-300'
                  }`}>
                    {rarityMap[selectedSpecies.rarity][lang]}
                  </span>
                  <span className="text-[10px] text-zinc-500 font-mono">
                    {lang === 'en' ? 'Patience speed' : lang === 'ko' ? '인내 소모 속도' : '耐心衰减速度'}: {selectedSpecies.patienceSpeed}x
                  </span>
                </div>
              </div>
            </div>

            {/* Description or Lock State */}
            {servedCounts[selectedSpecies.species] > 0 ? (
              <div className="space-y-2.5 font-sans">
                <div>
                  <h5 className="text-[10px] uppercase font-bold text-[#b4a999] tracking-wide">
                    {lang === 'en' ? 'Biological Notes' : lang === 'ko' ? '종족 보건 분석 학명' : '生物学说明'}
                  </h5>
                  <p className="text-xs text-[#5c564f] leading-relaxed">
                    {SPECIES_DESC_TRANSLATIONS[selectedSpecies.species]?.[lang] || selectedSpecies.description}
                  </p>
                </div>

                <div className="bg-indigo-50/50 p-2.5 rounded-xl border border-indigo-100/50 text-left">
                  <h5 className="text-[10px] uppercase font-bold text-indigo-600 tracking-wide flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    {lang === 'en' ? 'Care Anecdote' : lang === 'ko' ? '보건 돌봄 특이 상식' : '科学护理趣闻知识'}
                  </h5>
                  <p className="text-xs text-[#4c4852] italic leading-normal mt-0.5">
                    “{funFacts[selectedSpecies.species]?.[lang] || ''}”
                  </p>
                </div>
              </div>
            ) : (
              <div className="py-6 text-center text-[#9c9488] leading-relaxed flex flex-col items-center justify-center gap-2 font-sans">
                <span className="text-3xl animate-pulse">🔒</span>
                <div>
                  <p className="text-xs font-semibold">{lang === 'en' ? 'Record locked' : lang === 'ko' ? '데이터 기밀 상태' : '资料描述已被封存'}</p>
                  <p className="text-[11px] text-[#aa9f90] mt-0.5 max-w-sm">
                    {lang === 'en' 
                      ? `Diagnose, treat, and safely checkout a ${translateSpecies(selectedSpecies.species, lang)} to unlock their background stories!` 
                      : lang === 'ko' 
                      ? `대기소에서 환수를 맞이해 무사히 완치시키고 ${translateSpecies(selectedSpecies.species, lang)}를 퇴원시키면, 이 환수의 상세 역사가 해금됩니다!` 
                      : `在大厅接收并送入疗愈窗口，圆满帮助一只 ${translateSpecies(selectedSpecies.species, lang)} 离开后，它会亲口将自己的身世对你娓娓道来！`}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-[#ebdccb] pt-2.5 mt-3 flex justify-between items-center text-[11px] text-zinc-500 font-sans">
            <span>
              {lang === 'en' ? 'Care Encyclopedia · Vol A' : lang === 'ko' ? '꼬마 신수 백과사전 · 제A학권' : '萌宠大科全书 · 第 A 卷'}
            </span>
            <span className="font-bold text-indigo-600 uppercase flex items-center gap-1">
              <Heart className="w-3 h-3 text-rose-500 fill-rose-100" /> 
              {lang === 'en' ? 'Cozy Bond Archives' : lang === 'ko' ? '소중한 유대 아카이브' : '温馨守候档案'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
