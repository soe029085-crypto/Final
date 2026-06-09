import React, { useState, useEffect } from 'react';
import { PetInstance, ServiceWindowConfig } from '../types';
import { ArrowRight, Heart, Trash2, Award } from 'lucide-react';
import { cozyAudio } from '../audio';
import { Language, t, translateName, translateSpecies, translateDialogue, getTranslatedSteps, translateRoomTitle, translateRoomDesc } from '../translations';

interface WindowCardProps {
  config: ServiceWindowConfig;
  pet: PetInstance | null;
  onCompletePet: (petId: string) => void;
  onDismissPet: (petId: string) => void;
  speedMultiplier: number; // For fairy lights upgrade
  medicalLevel?: number;
  groomingLevel?: number;
  trainingLevel?: number;
  lang: Language;
}

export const WindowCard: React.FC<WindowCardProps> = ({
  config,
  pet,
  onCompletePet,
  onDismissPet,
  speedMultiplier = 1,
  medicalLevel = 1,
  groomingLevel = 1,
  trainingLevel = 1,
  lang: langConfig = 'en',
}) => {
  const lang = langConfig as Language;
  const [clickCount, setClickCount] = useState(0);
  const [activeStep, setActiveStep] = useState(0); // 0, 1, 2, 3 (done)
  const [stepProgress, setStepProgress] = useState(0); // 0 - 100%
  const [foamBubbles, setFoamBubbles] = useState<{ id: number; left: number; top: number; size: number }[]>([]);
  const [sparkles, setSparkles] = useState<{ id: number; left: number; top: number }[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  // Reset steps and clicks when pet changes
  useEffect(() => {
    setActiveStep(0);
    setClickCount(0);
    setStepProgress(0);
    setFoamBubbles([]);
    setSparkles([]);
    setIsProcessing(false);
  }, [pet?.id]);

  // Handle the automatic treatment progress sequence when player clicks the pet once
  useEffect(() => {
    if (!isProcessing || !pet) return;

    let currentStep = activeStep;
    let progress = 0;

    const spawnParticles = (stepIndex: number) => {
      if (config.id === 'GROOMING') {
        cozyAudio.playBubble();
        setFoamBubbles((prev) => [
          ...prev,
          {
            id: Date.now() + Math.random(),
            left: 15 + Math.random() * 70,
            top: 25 + Math.random() * 45,
            size: 12 + Math.random() * 16,
          },
        ]);
      } else if (config.id === 'MEDICAL') {
        cozyAudio.playHeal();
        setSparkles((prev) => [
          ...prev,
          {
            id: Date.now() + Math.random(),
            left: 20 + Math.random() * 60,
            top: 20 + Math.random() * 50,
          },
        ]);
      } else {
        cozyAudio.playWhistle();
        setSparkles((prev) => [
          ...prev,
          {
            id: Date.now() + Math.random(),
            left: 20 + Math.random() * 60,
            top: 20 + Math.random() * 50,
          },
        ]);
      }
    };

    // Spawn first burst of effects
    spawnParticles(currentStep);

    // Fast timer to smoothly advance progress from 0% to 100% for each step automatically
    const interval = setInterval(() => {
      let speedInc = 8;
      if (config.id === 'TRAINING' && trainingLevel >= 2) {
        speedInc = 12; // 50% faster training sessions!
      }
      progress += speedInc; // Step advance speed

      if (progress % 24 === 0 || progress >= 96) {
        spawnParticles(currentStep);
      }

      setStepProgress(Math.min(100, progress));

      if (progress >= 100) {
        if (currentStep < 2) {
          // Move to next step of the treatment
          cozyAudio.playSuccess();
          currentStep += 1;
          setActiveStep(currentStep);
          progress = 0;
          setStepProgress(0);
        } else {
          // Completed all 3 steps!
          clearInterval(interval);
          cozyAudio.playSuccess();
          setActiveStep(3); // Completed treatment
          setStepProgress(100);
          setIsProcessing(false);
        }
      }
    }, 35); // Approx 400ms per step, ~1.2 seconds for full automated multi-step treatment

    return () => {
      clearInterval(interval);
    };
  }, [isProcessing, config.id, pet?.id]);

  const windowLocName: Record<string, Record<Language, string>> = {
    'Left': { en: 'Left Treatment Window 🩺', zh: '左侧诊疗窗口', ko: '좌측 진료실 🩺' },
    'Center': { en: 'Center Grooming Window ✂️', zh: '中部美容窗口', ko: '중앙 미용실 ✂️' },
    'Right': { en: 'Right Training Window 🎓', zh: '右侧训练窗口', ko: '우측 훈련실 🎓' }
  };

  if (!pet) {
    const defaultLabel: Record<Language, string> = {
      en: 'Vacant (Waiting)',
      zh: '空置中 (等待护送)',
      ko: '대기 중 (이송 대기)'
    };

    return (
      <div
        className={`flex-1 border-4 border-dashed rounded-3xl p-6 flex flex-col justify-center items-center text-center min-h-[360px] transition-all bg-gradient-to-b ${
          config.id === 'MEDICAL'
            ? 'border-emerald-200 hover:border-emerald-300 bg-emerald-50/15'
            : config.id === 'GROOMING'
            ? 'border-rose-100 hover:border-rose-200 bg-rose-50/15'
            : 'border-sky-100 hover:border-sky-200 bg-sky-50/15'
        }`}
      >
        <div className="relative mb-3 flex items-center justify-center">
          {/* Vacant icon */}
          <span className="text-4xl filter grayscale opacity-45 block float-cute p-1.5 bg-[#faf8f5] rounded-2xl border-2 border-zinc-200">
            {config.id === 'MEDICAL' ? '🏥' : config.id === 'GROOMING' ? '🧴' : '🎪'}
          </span>
        </div>
        <h4 className="font-bold text-[#716556] text-sm tracking-wide">
          {translateRoomTitle(config.id, lang)}
        </h4>
        <p className="text-[11px] text-[#aa9f90] max-w-xs mt-1 leading-normal">
          {translateRoomDesc(config.id, lang)}
        </p>
        <div className="mt-4 px-2.5 py-1 bg-[#ffffff]/60 border border-zinc-100 rounded-full text-[9px] font-mono tracking-wider font-bold text-zinc-500 uppercase">
          {defaultLabel[lang]}
        </div>
      </div>
    );
  }

  // Handle active clicks on the pet to start automated care
  const handleInteractionClick = () => {
    if (activeStep > 2 || isProcessing) return;
    setIsProcessing(true);
  };

  const handleFinishCheckout = () => {
    cozyAudio.playChimeUp();
    onCompletePet(pet.id);
  };

  let stepsToUse = getTranslatedSteps(config.id, config.id === 'MEDICAL' ? medicalLevel : config.id === 'GROOMING' ? groomingLevel : trainingLevel, lang);

  const currentStepLabel = stepsToUse[activeStep] || (lang === 'en' ? 'All steps completed successfully!' : lang === 'ko' ? '모든 가료 단계가 성료되었습니다!' : '所有理疗项目已顺利完成！');

  const dismissalConfirmMsg: Record<Language, string> = {
    en: `Are you sure you want to dismiss ${translateName(pet.name, lang)}? They will go home empty-handed and sad!`,
    zh: `要在护理结束前提前送可怜的 ${pet.name} 回家吗？它可能会空手而归并感到十分难过！`,
    ko: `정말 치료 도중에 아기 ${translateName(pet.name, lang)}를 돌려보내시겠습니까? 실망하여 슬피 떠납니다!`
  };

  return (
    <div
       className={`flex-1 border-4 rounded-3xl p-5 md:p-6 flex flex-col justify-between shadow-xs transition-all relative ${
         config.id === 'MEDICAL'
           ? 'bg-gradient-to-b from-[#eefaf4] to-emerald-50 border-emerald-300'
           : config.id === 'GROOMING'
           ? 'bg-gradient-to-b from-[#fff5f6] to-rose-50 border-rose-300'
           : 'bg-gradient-to-b from-[#f2f9ff] to-sky-50 border-sky-300'
       }`}
    >
      {/* Header Info */}
      <div className="flex items-start justify-between gap-1 border-b border-[#e6dfd3] pb-2 font-sans">
        <div>
          <h4 className="font-bold text-slate-800 text-sm leading-snug flex items-center gap-1.5">
            <span className="text-lg">
              {config.id === 'MEDICAL' ? '🩺' : config.id === 'GROOMING' ? '🎀' : '🎯'}
            </span>
            {translateRoomTitle(config.id, lang)}
          </h4>
          <span className="text-[10px] text-zinc-500 font-medium">
            {lang === 'en' ? 'Area:' : lang === 'ko' ? '담당 구역:' : '区域:'} {windowLocName[config.windowName]?.[lang] || config.windowName}
          </span>
        </div>

        {/* Emergency cancel bin */}
        <button
          onClick={() => {
            if (confirm(dismissalConfirmMsg[lang])) {
              onDismissPet(pet.id);
            }
          }}
          className="p-1 px-1.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-500 hover:bg-rose-100 transition-colors cursor-pointer"
          title={lang === 'en' ? 'Dismiss pet' : lang === 'ko' ? '퇴원 처리' : '提前送回宠物'}
          id={`btn_dismiss_window_${config.id}`}
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Center Interactive Stage */}
      <div className="my-5 flex flex-col items-center justify-center relative min-h-[140px]">
        {/* Foam bubbles layer for grooming */}
        {config.id === 'GROOMING' && foamBubbles.map((bub) => (
          <span
            key={bub.id}
            className="absolute rounded-full bg-white/75 border border-pink-100 opacity-80 pointer-events-none animate-ping"
            style={{
              left: `${bub.left}%`,
              top: `${bub.top}%`,
              width: `${bub.size}px`,
              height: `${bub.size}px`,
            }}
          >
            🧼
          </span>
        ))}

        {/* Healing sparkles for medical */}
        {sparkles.map((spk) => (
          <span
            key={spk.id}
            className="absolute text-sm pointer-events-none animate-bounce"
            style={{ left: `${spk.left}%`, top: `${spk.top}%` }}
          >
            ✨
          </span>
        ))}

        {/* The Patient Sprite Box */}
        <button
          onClick={handleInteractionClick}
          disabled={activeStep > 2}
          className={`relative group p-4 rounded-3xl border-2 transition-all float-cute ${
            activeStep > 2
              ? 'bg-amber-100/40 border-amber-300'
              : 'bg-white border-[#dfd2c0] hover:border-amber-300 hover:scale-105 active:scale-95 shadow-sm hover:shadow-md cursor-pointer'
          }`}
          id={`btn_interact_pet_${config.id}`}
        >
          {/* Avatar circle & Glow */}
          <div
            className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center text-4xl border-2 shadow-inner relative transition-transform ${
              activeStep > 2 ? 'bg-amber-200/50' : 'bg-[#faf8f5]'
            }`}
            style={{ borderColor: pet.color.split(' ')[1] }}
          >
            {pet.emoji}

            {/* Wing or aura badges depending on task state */}
            {activeStep === 3 && (
              <span className="absolute -top-1.5 -right-1.5 text-lg bg-green-100 border border-green-300 rounded-full px-1 py-0.2 animate-bounce">
                💖
              </span>
            )}
          </div>

          {/* Sparkly pointer instructions */}
          {activeStep <= 2 && (
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-slate-800 text-white rounded-full py-1 px-3 text-[9px] font-bold uppercase tracking-wider scale-0 group-hover:scale-100 transition-transform whitespace-nowrap">
              {isProcessing 
                ? (lang === 'en' ? 'Tending with care...' : lang === 'ko' ? '치료 중...' : '正在温柔理疗中...') 
                : (lang === 'en' ? '☝️ Tap to process therapies' : lang === 'ko' ? '☝️ 터치하여 자동 간호' : '☝️ 点我一键完成全部理疗')}
            </div>
          )}
        </button>

        {/* Pet Dialogue bubble */}
        <div className="inset-x-0 bottom-[-16px] text-center mt-3 max-w-[240px]">
          <div className="bg-white/95 border border-[#dfdfdf] px-3 py-1.5 rounded-xl shadow-xs text-[11px] font-medium leading-comfortable text-[#44403d] relative">
            <span className="font-bold text-amber-900 block border-b border-rose-50 pb-0.5">
              {translateName(pet.name, lang)} ({translateSpecies(pet.species, lang)})
            </span>
            <p className="italic text-[#6b6256] mt-0.5 max-h-[44px] overflow-y-auto leading-tight">
              {translateDialogue(pet.dialogue, lang)}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Progress Controls */}
      <div className="space-y-3 pt-3 border-t border-[#ebdccb]">
        {activeStep <= 2 ? (
          <div>
            {/* Step badges */}
            <div className="flex items-center justify-between text-xs font-semibold text-[#4e4539] mb-1.5 font-sans">
              <span className="flex items-center gap-1">
                <span className="bg-slate-700 text-white text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center mt-0.5 font-mono">
                  {activeStep + 1}
                </span>
                <span className="truncate max-w-[140px] text-[11px]">{currentStepLabel}</span>
              </span>
              <span className="font-mono text-[9px] text-[#938676]">
                {isProcessing 
                  ? (lang === 'en' ? '🧬 Tending...' : lang === 'ko' ? '🧬 치료중...' : '🧬 自动理疗中...') 
                  : (lang === 'en' ? '⚡ Waiting' : lang === 'ko' ? '⚡ 대기중' : '⚡ 待一键开始')}
              </span>
            </div>

            {/* Miniature clinical bar */}
            <div className="w-full h-3 bg-[#e8e4db] rounded-full overflow-hidden border border-[#dfd8cd] p-0.5 shadow-inner">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all duration-150"
                style={{ width: `${stepProgress}%` }}
              ></div>
            </div>

            {/* Stepper indicator balls */}
            <div className="flex justify-between items-center mt-2 px-1">
              {stepsToUse.map((st, i) => (
                <div key={st} className="flex items-center gap-1">
                  <span
                    className={`text-[9.5px] px-1.5 py-0.5 rounded-md font-sans font-bold leading-normal ${
                      i < activeStep
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : i === activeStep
                        ? 'bg-amber-100 text-amber-800 border border-amber-300 animate-pulse'
                        : 'bg-zinc-100 text-zinc-400 border border-zinc-200'
                    }`}
                  >
                    {st.split(/[\s🛡️✨🧴🧪🎪⚙️🩹💉🧬🎈🍬🧇🎁🌸👑💎🪮🧼💊🧃]/)[0] || st}
                  </span>
                  {i < 2 && <ArrowRight className="w-2.5 h-2.5 text-zinc-300" />}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center bg-[#fdfdfc] p-3 rounded-2xl border border-green-200 font-sans">
            <div className="flex items-center justify-center gap-1.5 text-emerald-600 font-bold text-xs mb-2">
              <Award className="w-4 h-4 fill-green-50 text-emerald-600" /> 
              {lang === 'en' ? 'Pet Vitality Fully Recovered!' : lang === 'ko' ? '반려동물이 활력을 되찾았습니다!' : '萌宠活力重焕生机！'}
            </div>
            <button
              onClick={handleFinishCheckout}
              className="w-full py-2.5 px-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-xs rounded-xl border-b-4 border-teal-700 active:border-b-0 hover:from-emerald-400 hover:to-teal-400 cursor-pointer active:translate-y-0.5 transition-all flex items-center justify-center gap-1 header-fonts"
              id={`btn_checkout_window_${config.id}`}
            >
              <Heart className="w-3.5 h-3.5 fill-current" /> 
              {lang === 'en' ? 'Proceed with Checkout & Earn Treats' : lang === 'ko' ? '퇴원 수속 및 보사 획득' : '完成送客并收取丰厚酬劳'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
