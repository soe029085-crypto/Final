/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { PetInstance, ShopUpgrade, RequestType } from './types';
import { SPECIES_LIST, PET_NAMES, SERVICE_WINDOWS, INITIAL_UPGRADES, MEDIUM_CASES, DIFFICULT_CASES } from './data';
import { cozyAudio } from './audio';
import { GameStats } from './components/GameStats';
import { WindowCard } from './components/WindowCard';
import { DecorShop } from './components/DecorShop';
import { PetJournal } from './components/PetJournal';
import { Language, t, translateName, translateSpecies, translateDialogue } from './translations';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, ArrowRight, BookOpen, ShoppingBag } from 'lucide-react';

// Path to the beautiful background we generated
const bgImage = '/src/assets/images/pet_shop_background_1779639453224.png';

interface FloatingFeedback {
  id: number;
  text: string;
  x: number;
  y: number;
  color: string;
}

export default function App() {
  // --- Internationalization & Default Lang (English) ---
  const [lang, setLang] = useState<Language>('en');
  const [gameStarted, setGameStarted] = useState<boolean>(false);

  // --- Career Stats ---
  const [day, setDay] = useState(1);
  const [hearts, setHearts] = useState(25);
  const [coins, setCoins] = useState(60);
  const [totalServed, setTotalServed] = useState(0);
  const [servedCounts, setServedCounts] = useState<Record<string, number>>({
    '茶杯史莱姆': 1, // Start with 1 so the manual is partially open!
  });

  // --- Active State Lists ---
  const [lobbyPets, setLobbyPets] = useState<PetInstance[]>([]);
  const [medicalRoomPet, setMedicalRoomPet] = useState<PetInstance | null>(null);
  const [groomingRoomPet, setGroomingRoomPet] = useState<PetInstance | null>(null);
  const [trainingRoomPet, setTrainingRoomPet] = useState<PetInstance | null>(null);

  // --- Upgrades State ---
  const [upgrades, setUpgrades] = useState<ShopUpgrade[]>(INITIAL_UPGRADES);

  // --- Facility Levels State (Hearts-based upgrade system) ---
  const [medicalLevel, setMedicalLevel] = useState<number>(1);
  const [groomingLevel, setGroomingLevel] = useState<number>(1);
  const [trainingLevel, setTrainingLevel] = useState<number>(1);
  const [storeLevel, setStoreLevel] = useState<number>(1);
  const [usedFreeRediagnosis, setUsedFreeRediagnosis] = useState<boolean>(false);

  // --- UI Layouts ---
  const [activeModal, setActiveModal] = useState<'none' | 'shop' | 'journal'>('none');
  const [floaters, setFloaters] = useState<FloatingFeedback[]>([]);
  const [selectedLobbyPetId, setSelectedLobbyPetId] = useState<string | null>(null);
  const [showHelp, setShowHelp] = useState(true);
  const [showDayBanner, setShowDayBanner] = useState(false);
  const [activeExplanation, setActiveExplanation] = useState<{
    petName: string;
    species: string;
    correctDept: string;
    actualDept: string;
    explanation: string;
  } | null>(null);

  // Core upgrade values
  const hasCandle = upgrades.find((u) => u.id === 'aromatherapy_candle')?.purchased || false;
  const hasIvy = upgrades.find((u) => u.id === 'hanging_ivy')?.purchased || false;
  const hasFairyLights = upgrades.find((u) => u.id === 'fairy_lights')?.purchased || false;
  const hasCozyRugs = upgrades.find((u) => u.id === 'plush_carpets')?.purchased || false;
  const hasGoldenTreats = upgrades.find((u) => u.id === 'golden_treat_box')?.purchased || false;

  // Sound speed boosts
  const serviceSpeedMultiplier = hasFairyLights ? 1.5 : 1.0;

  // Unique key indexers for ids
  const petIdCounter = useRef(1);

  // First-turn onboarding pet: Spawn 2 automatic patients so players have stuff to do immediately
  useEffect(() => {
    // Generate initial lobby pets
    const initial1 = generateRandomPet('MEDICAL', true);
    const initial2 = generateRandomPet('GROOMING', false);
    setLobbyPets([initial1, initial2]);
  }, []);

  // --- Particle Creators ---
  const addFloater = (text: string, x: number = 300, y: number = 200, color: string = 'text-green-600') => {
    const id = Date.now() + Math.random();
    setFloaters((prev) => [...prev, { id, text, x, y, color }]);
    setTimeout(() => {
      setFloaters((prev) => prev.filter((f) => f.id !== id));
    }, 1500);
  };

  // --- Pet Generator Auxiliary ---
  function generateRandomPet(forcedRequest?: RequestType, firstLoad = false): PetInstance {
    // Helper function to roll for rarity according to:
    // Common (70%), Uncommon (20%), Rare (8%), Legendary (2%)
    function rollRarity(currentDay: number): 'Common' | 'Uncommon' | 'Rare' | 'Legendary' {
      const roll = Math.random();
      let chosen: 'Common' | 'Uncommon' | 'Rare' | 'Legendary' = 'Common';
      if (roll < 0.70) {
        chosen = 'Common';
      } else if (roll < 0.90) {
        chosen = 'Uncommon';
      } else if (roll < 0.98) {
        chosen = 'Rare';
      } else {
        chosen = 'Legendary';
      }

      // Clamp based on day limits to keep unlock progression clean
      if (currentDay === 1) {
        return 'Common';
      }
      if (currentDay === 2) {
        if (chosen === 'Rare' || chosen === 'Legendary') {
          return Math.random() < 7/9 ? 'Common' : 'Uncommon';
        }
        return chosen;
      }
      if (currentDay === 3) {
        if (chosen === 'Legendary') {
          const r = Math.random();
          if (r < 70/98) return 'Common';
          if (r < 90/98) return 'Uncommon';
          return 'Rare';
        }
        return chosen;
      }
      return chosen;
    }

    function createSingleCandidate(diffGroup: 'SIMPLE' | 'MEDIUM' | 'DIFFICULT'): PetInstance {
      // 1. Check if we should spawn a special VIP / Boss case
      // Special VIP and Boss characters are unlocked once the store is upgraded to Lv3 (梦幻宠物中心)
      const isSpecialIndex = (storeLevel === 3) && !firstLoad && (totalServed + 1) % 5 === 0;

      let maxPatience = 100;
      if (hasCandle) maxPatience += 15;
      let startPatience = maxPatience;
      if (hasIvy && !firstLoad) {
        startPatience = Math.min(maxPatience, maxPatience * 1.15);
      }

      if (isSpecialIndex) {
        const isBoss = (totalServed + 1) % 10 === 0;

        if (isBoss) {
          // 👑 Hidden BOSS Case: 神秘收藏家
          const spec = SPECIES_LIST.find((s) => s.species === '彩虹水母团子') || SPECIES_LIST[0];
          petIdCounter.current += 1;
          return {
            id: `pet_${Date.now()}_${petIdCounter.current}`,
            species: spec.species,
            name: '👑 幕后大BOSS「神秘收藏家」',
            avatar: spec.emoji,
            color: 'bg-slate-900 border-indigo-500 text-indigo-200 border-4',
            emoji: spec.emoji,
            request: 'MEDICAL', // Correct: 医治
            patience: startPatience,
            patienceSpeed: spec.patienceSpeed * 1.3, // Faster patience decay for Boss!
            dialogue: '我的彩虹水母团子最近颜色变灰、漂浮不稳，而且泡泡层也不再透明了。我实在分不清到底出了什么问题。',
            state: 'LOBBY',
            serviceProgress: 0,
            currentTaskStep: 0,
            explanation: '同时出现了医疗（变灰）、美容（浑浊层）和训练（漂浮不稳）的线索。因颜色灰蒙等生命体征下降是根本病因，洗浴或训练只是治标不治本，首选【诊疗治疗 🏥】！'
          };
        } else {
          // Regular VIP
          let vipRoll = Math.floor(Math.random() * 3);
          // Fallbacks if levels aren't met yet
          if (vipRoll === 0 && groomingLevel < 3) {
            // Princess fallback to Wizard or Adventurer
            vipRoll = 1 + Math.floor(Math.random() * 2);
          }
          if (vipRoll === 1 && trainingLevel < 3) {
            // Wizard fallback to Adventurer (2) or Princess (if groomingLevel is 3)
            vipRoll = (groomingLevel >= 3) ? 0 : 2;
          }

          if (vipRoll === 0) {
            // Princess Customer
            const spec = SPECIES_LIST.find((s) => s.species === '叶子小猫') || SPECIES_LIST[0];
            petIdCounter.current += 1;
            return {
              id: `pet_${Date.now()}_${petIdCounter.current}`,
              species: spec.species,
              name: '👑 尊贵的公主殿下',
              avatar: spec.emoji,
              color: spec.color,
              emoji: spec.emoji,
              request: 'GROOMING', // Correct: 美容
              patience: startPatience,
              patienceSpeed: spec.patienceSpeed,
              dialogue: '明天要参加王国庆典了，希望我的叶子小猫能成为最耀眼的小明星！',
              state: 'LOBBY',
              serviceProgress: 0,
              currentTaskStep: 0,
              explanation: '叶子小猫攻击力……哦不，明日将登上王室盛大庆典舞台，急需进行草本泡沫洗浴与精美饰带装点，毫无疑问应选择【温馨美容 🧴】。'
            };
          } else if (vipRoll === 1) {
            // Wizard Customer
            const spec = SPECIES_LIST.find((s) => s.species === '余烬幼龙') || SPECIES_LIST[0];
            petIdCounter.current += 1;
            return {
              id: `pet_${Date.now()}_${petIdCounter.current}`,
              species: spec.species,
              name: '🧙 学院首席魔法师',
              avatar: spec.emoji,
              color: spec.color,
              emoji: spec.emoji,
              request: 'TRAINING', // Correct: 训练
              patience: startPatience,
              patienceSpeed: spec.patienceSpeed,
              dialogue: '我的余烬幼龙最近喷火总是歪掉，实验室已经被烧坏三张桌子了。',
              state: 'LOBBY',
              serviceProgress: 0,
              currentTaskStep: 0,
              explanation: '小龙喷火方向偏移击毁家具，纯属施法角度与姿态异常，需要靶心喷吐和敏捷纠偏，应前往【趣味训练 🎪】。'
            };
          } else {
            // Adventurer Customer
            const spec = SPECIES_LIST.find((s) => s.species === '星宿小兔') || SPECIES_LIST[0];
            petIdCounter.current += 1;
            return {
              id: `pet_${Date.now()}_${petIdCounter.current}`,
              species: spec.species,
              name: '🗺️ 皇家首席探险家',
              avatar: spec.emoji,
              color: spec.color,
              emoji: spec.emoji,
              request: 'MEDICAL', // Correct: 医治
              patience: startPatience,
              patienceSpeed: spec.patienceSpeed,
              dialogue: '星宿小兔探险回来之后耳朵一直在抽动，我有点担心。',
              state: 'LOBBY',
              serviceProgress: 0,
              currentTaskStep: 0,
              explanation: '探险森林易遭遇蛰咬或耳道发炎，频繁卷动抽搐通常伴随剧烈疼痛与微型寄生受伤，需医生诊疗处理，首选【诊疗治疗 🏥】。'
            };
          }
        }
      }

      // Handler for MEDIUM and DIFFICULT cases
      if (diffGroup === 'MEDIUM' || diffGroup === 'DIFFICULT') {
        const activePool = diffGroup === 'MEDIUM' ? MEDIUM_CASES : DIFFICULT_CASES;
        const targetRarity = rollRarity(day);

        // Try to find special cases matching our rolled target rarity
        let availableSpecialCases = activePool.filter((item) => {
          const specData = SPECIES_LIST.find((s) => s.species === item.species);
          if (!specData) return false;
          if (item.species === '余烬幼龙' && trainingLevel < 3) return false;
          return specData.rarity === targetRarity;
        });

        // Safeguard fallback: if no matches for that rarity pool, pull any unlocked special cases for current day
        if (availableSpecialCases.length === 0) {
          availableSpecialCases = activePool.filter((item) => {
            const specData = SPECIES_LIST.find((s) => s.species === item.species);
            if (!specData) return false;
            if (item.species === '余烬幼龙' && trainingLevel < 3) return false;
            if (day === 1) return specData.rarity === 'Common';
            if (day === 2) return specData.rarity === 'Common' || specData.rarity === 'Uncommon';
            if (day === 3) return specData.rarity === 'Common' || specData.rarity === 'Uncommon' || specData.rarity === 'Rare';
            return true;
          });
        }

        const finalPool = availableSpecialCases.length > 0 ? availableSpecialCases : activePool;
        const chosenCase = finalPool[Math.floor(Math.random() * finalPool.length)];
        const spec = SPECIES_LIST.find((s) => s.species === chosenCase.species) || SPECIES_LIST[0];
        const randomName = PET_NAMES[Math.floor(Math.random() * PET_NAMES.length)];
        petIdCounter.current += 1;

        return {
          id: `pet_${Date.now()}_${petIdCounter.current}`,
          species: spec.species,
          name: randomName,
          avatar: spec.emoji,
          color: spec.color,
          emoji: spec.emoji,
          request: chosenCase.request,
          patience: startPatience,
          patienceSpeed: spec.patienceSpeed,
          dialogue: chosenCase.dialogue,
          state: 'LOBBY',
          serviceProgress: 0,
          currentTaskStep: 0,
          explanation: chosenCase.explanation
        };
      }

      // Default to SIMPLE Case (using baseDialogue)
      const targetRarity = rollRarity(day);
      let filteredSpeciesList = SPECIES_LIST.filter((spec) => spec.rarity === targetRarity);

      // Filter unlocked species list based on current day to ensure progressive journal unlocking
      filteredSpeciesList = filteredSpeciesList.filter((spec) => {
        if (spec.species === '余烬幼龙' && trainingLevel < 3) return false;
        if (day === 1) {
          return spec.rarity === 'Common';
        } else if (day === 2) {
          return spec.rarity === 'Common' || spec.rarity === 'Uncommon';
        } else if (day === 3) {
          return spec.rarity === 'Common' || spec.rarity === 'Uncommon' || spec.rarity === 'Rare';
        } else {
          return true; // Day 4+: All
        }
      });

      // Safeguard fallback if filteredSpeciesList is somehow empty
      if (filteredSpeciesList.length === 0) {
        filteredSpeciesList = SPECIES_LIST.filter((spec) => {
          if (spec.species === '余烬幼龙' && trainingLevel < 3) return false;
          if (day === 1) return spec.rarity === 'Common';
          if (day === 2) return spec.rarity === 'Common' || spec.rarity === 'Uncommon';
          if (day === 3) return spec.rarity === 'Common' || spec.rarity === 'Uncommon' || spec.rarity === 'Rare';
          return true;
        });
      }

      const finalSpeciesList = filteredSpeciesList.length > 0 ? filteredSpeciesList : SPECIES_LIST;
      const speciesIndex = Math.floor(Math.random() * finalSpeciesList.length);
      const spec = finalSpeciesList[speciesIndex];
      const randomName = PET_NAMES[Math.floor(Math.random() * PET_NAMES.length)];

      const reqs: RequestType[] = ['MEDICAL', 'GROOMING', 'TRAINING'];
      const finalReq = forcedRequest || reqs[Math.floor(Math.random() * reqs.length)];
      const phrases = spec.baseDialogue[finalReq];
      const dialogue = phrases[Math.floor(Math.random() * phrases.length)];

      const simpleExplLabel = 
        finalReq === 'MEDICAL' ? '身体出现可判定的微小异样特征，应当提供及时的医学诊疗。' :
        finalReq === 'GROOMING' ? '毛发产生轻度污损或凌乱，渴望进行清洗打扮，应当选择美容沙龙。' :
        '希望能够掌握和精炼某些实用技巧，需要去训练广场开展指导练习。';

      petIdCounter.current += 1;

      return {
        id: `pet_${Date.now()}_${petIdCounter.current}`,
        species: spec.species,
        name: randomName,
        avatar: spec.emoji,
        color: spec.color,
        emoji: spec.emoji,
        request: finalReq,
        patience: startPatience,
        patienceSpeed: spec.patienceSpeed,
        dialogue,
        state: 'LOBBY',
        serviceProgress: 0,
        currentTaskStep: 0,
        explanation: simpleExplLabel
      };
    }

    // Determine current Difficulty based on customers count, but with higher probability for difficult/medium cases!
    let difficultyGroup: 'SIMPLE' | 'MEDIUM' | 'DIFFICULT' = 'SIMPLE';
    const rand = Math.random();
    if (totalServed >= 15) {
      // 70% DIFFICULT, 25% MEDIUM, 5% SIMPLE
      difficultyGroup = rand < 0.70 ? 'DIFFICULT' : rand < 0.95 ? 'MEDIUM' : 'SIMPLE';
    } else if (totalServed >= 6) {
      // 55% DIFFICULT, 35% MEDIUM, 10% SIMPLE
      difficultyGroup = rand < 0.55 ? 'DIFFICULT' : rand < 0.90 ? 'MEDIUM' : 'SIMPLE';
    } else {
      // Very beginning under 6 served: still 30% DIFFICULT, 40% MEDIUM, 30% SIMPLE for better challenge
      difficultyGroup = rand < 0.30 ? 'DIFFICULT' : rand < 0.70 ? 'MEDIUM' : 'SIMPLE';
    }

    // Active Screen Pets for checking duplicate types
    const activeScreenPets = [
      ...lobbyPets,
      ...(medicalRoomPet ? [medicalRoomPet] : []),
      ...(groomingRoomPet ? [groomingRoomPet] : []),
      ...(trainingRoomPet ? [trainingRoomPet] : [])
    ];

    let bestCandidate: PetInstance | null = null;
    let fallbackCandidate: PetInstance | null = null;

    // Retry loop up to 15 times to ensure variety (avoid identical species or problem-kinds together)
    for (let attempt = 0; attempt < 15; attempt++) {
      const candidate = createSingleCandidate(difficultyGroup);
      if (!fallbackCandidate) fallbackCandidate = candidate;

      let hasExactDialogueConflict = false;
      let hasSpeciesConflict = false;
      let hasRequestConflict = false;

      for (const activePet of activeScreenPets) {
        if (activePet.dialogue === candidate.dialogue) {
          hasExactDialogueConflict = true;
        }
        if (activePet.species === candidate.species) {
          hasSpeciesConflict = true;
        }
        if (activePet.request === candidate.request) {
          hasRequestConflict = true;
        }
      }

      if (activeScreenPets.length === 0 || firstLoad || forcedRequest) {
        bestCandidate = candidate;
        break;
      }

      // Rejection filters
      if (attempt < 4) {
        // Strict uniqueness: no same dialogue, species, or request type!
        if (!hasExactDialogueConflict && !hasSpeciesConflict && !hasRequestConflict) {
          bestCandidate = candidate;
          break;
        }
      } else if (attempt < 9) {
        // Moderately strict: no same dialogue or species
        if (!hasExactDialogueConflict && !hasSpeciesConflict) {
          bestCandidate = candidate;
          break;
        }
      } else if (attempt < 13) {
        // Safe: just avoid duplicate exact dialogue line
        if (!hasExactDialogueConflict) {
          bestCandidate = candidate;
          break;
        }
      } else {
        // Fallback
        bestCandidate = candidate;
        break;
      }
    }

    return bestCandidate || fallbackCandidate!;
  }

  // --- Dynamic Influx Ticker ---
  useEffect(() => {
    // Lobby refresh speed made significantly faster (from 2.2s down to a minimum of 600ms on later days)
    const checkInterval = Math.max(600, 2200 - (day - 1) * 400);
    const maxLobbyLimit = storeLevel === 1 ? 2 : storeLevel === 2 ? 3 : 4;

    const interval = setInterval(() => {
      // Lobby slots limits depending on shop store level upgrade!
      if (lobbyPets.length < maxLobbyLimit) {
        // High entry chance to keep lobby refreshed very quickly
        const spawnChance = 0.85 + day * 0.05;
        if (Math.random() < spawnChance) {
          const freshPet = generateRandomPet();
          setLobbyPets((prev) => [...prev, freshPet]);
          cozyAudio.playClick();
          addFloater(`🐾 新到店客人：${freshPet.name}！`, 100, 320, 'text-teal-600');
        }
      }
    }, checkInterval);

    return () => clearInterval(interval);
  }, [lobbyPets.length, day, hasCandle, hasIvy, storeLevel]);

  // --- Patience Grumpiness Ticker ---
  useEffect(() => {
    const decayInterval = setInterval(() => {
      // Ticks lobby pets
      setLobbyPets((prev) => {
        let lobbyLeavingOccurred = false;
        const mapped = prev.map((pet) => {
          // If lobby carpets are possessed, decay is slower
          const speedMod = hasCozyRugs ? 0.7 : 1.0;
          const finalPatience = Math.max(0, pet.patience - pet.patienceSpeed * speedMod * 4);

          if (finalPatience <= 0 && pet.patience > 0) {
            lobbyLeavingOccurred = true;
          }

          return { ...pet, patience: finalPatience };
        });

        if (lobbyLeavingOccurred) {
          // Play warning sound and drop stats
          cozyAudio.playPatienceWarning();
          setHearts((h) => Math.max(0, h - 15));
          addFloater('💔 宠物因等待太久而生气离开等候区！(满意度 -15 ❤️)', 200, 300, 'text-rose-500 font-bold');
        }

        return mapped.filter((pet) => pet.patience > 0);
      });
    }, 2000);

    return () => clearInterval(decayInterval);
  }, [hasCozyRugs]);

  // --- Check-in and dispatch flow ---
  const handleAssignPet = (petId: string, department: RequestType) => {
    const petToAssign = lobbyPets.find((p) => p.id === petId);
    if (!petToAssign) return;

    // Check if the department target window is occupied
    if (department === 'MEDICAL') {
      const isAllowed = 
        medicalLevel >= 3 ? true :
        medicalLevel === 2 ? (petToAssign.species !== '余烬幼龙' && petToAssign.species !== '彩虹水母团子' && petToAssign.species !== '冰晶企鹅' && petToAssign.species !== '月光猫头鹰') :
        (petToAssign.species === '茶杯史莱姆' || petToAssign.species === '抹茶柴犬' || petToAssign.species === '云朵小羊');

      if (!isAllowed) {
        cozyAudio.playPatienceWarning();
        let targetLevel = "Lv2 魔法护理室";
        if (petToAssign.species === '余烬幼龙' || petToAssign.species === '彩虹水母团子' || petToAssign.species === '冰晶企鹅' || petToAssign.species === '月光猫头鹰') {
          targetLevel = "Lv3 幻想医疗中心";
        }
        addFloater(`❌ 诊疗小屋等级不足！无法接纳「${petToAssign.species}」，急需前往精品升级商店升级至：${targetLevel}！`, 500, 300, 'text-rose-500 font-bold');
        return;
      }

      if (medicalRoomPet) {
        addFloater('❌ 左侧诊疗室目前正忙！', 500, 350, 'text-rose-500');
        cozyAudio.playPatienceWarning();
        return;
      }
    }

    if (department === 'GROOMING' && groomingRoomPet) {
      addFloater('❌ 中部美容沙龙目前正忙！', 500, 350, 'text-rose-500');
      cozyAudio.playPatienceWarning();
      return;
    }
    if (department === 'TRAINING' && trainingRoomPet) {
      addFloater('❌ 右侧训练场目前正忙！', 500, 350, 'text-rose-500');
      cozyAudio.playPatienceWarning();
      return;
    }

    // Success assign (players may direct any pet to any room!)
    cozyAudio.playClick();
    const updatedPet: PetInstance = {
      ...petToAssign,
      state: department === 'MEDICAL' ? 'SERVICE_LEFT' : department === 'GROOMING' ? 'SERVICE_CENTER' : 'SERVICE_RIGHT',
    };

    // Remove from lobby
    setLobbyPets((prev) => prev.filter((p) => p.id !== petId));
    setSelectedLobbyPetId(null);

    // Place into corresponding window
    if (department === 'MEDICAL') setMedicalRoomPet(updatedPet);
    if (department === 'GROOMING') setGroomingRoomPet(updatedPet);
    if (department === 'TRAINING') setTrainingRoomPet(updatedPet);

    const destLabel = 
      department === 'MEDICAL' ? '左侧诊疗 🏥' : 
      department === 'GROOMING' ? '中部美容 🧴' : '右侧训练 🎪';

    addFloater(`🚪 已护送 ${petToAssign.name} 前往 ${destLabel}！`, 400, 200, 'text-[#4e4539] font-bold');
  };

  // Give local treat to boost patience
  const handleFeedLobbyTreat = (petId: string) => {
    if (!hasGoldenTreats) return;
    cozyAudio.playHeal();
    setLobbyPets((prev) =>
      prev.map((pet) => {
        if (pet.id === petId) {
          const maxPatience = hasCandle ? 115 : 100;
          return { ...pet, patience: Math.min(maxPatience, pet.patience + 30) };
        }
        return pet;
      })
    );
    addFloater('🍖 喂食专属皇家肉肉！耐心恢复！', 110, 300, 'text-amber-600 font-bold');
  };

  // --- Checkout Completions ---
  const handleCheckoutPet = (petId: string, department: RequestType) => {
    let checkedPet: PetInstance | null = null;

    if (department === 'MEDICAL') {
      checkedPet = medicalRoomPet;
      setMedicalRoomPet(null);
    } else if (department === 'GROOMING') {
      checkedPet = groomingRoomPet;
      setGroomingRoomPet(null);
    } else if (department === 'TRAINING') {
      checkedPet = trainingRoomPet;
      setTrainingRoomPet(null);
    }

    if (!checkedPet) return;

    // Check if the checkout window actually matches the pet's original request
    const isCorrect = checkedPet.request === department;

    if (!isCorrect && medicalLevel === 3 && !usedFreeRediagnosis) {
      setUsedFreeRediagnosis(true);
      cozyAudio.playHeal();
      setLobbyPets((prev) => [...prev, { ...checkedPet, patience: 80, state: 'LOBBY' }]);
      addFloater(`🔮 医疗中心Lv3福利！诊断已被打回，已为你免费恢复 80% 耐心并重新护送回大厅！`, 600, 250, 'text-teal-600 font-bold text-xs');
      return;
    }

    // Coins and Hearts logic (Incorrect = 0, Correct = Boosted to 45 coins and 35 hearts)
    let coinReward = isCorrect ? 45 : 0;
    let heartReward = isCorrect ? 35 : 0;

    if (isCorrect) {
      if (department === 'GROOMING' && groomingLevel >= 2) {
        // 美容收益 +20%
        coinReward = Math.round(coinReward * 1.2);
        heartReward = Math.round(heartReward * 1.2);
      }
      if (department === 'TRAINING' && trainingLevel >= 2) {
        // 训练成功能力额外提供 +5 🪙 且 +5 💖
        coinReward += 5;
        heartReward += 5;
      }
    }

    setCoins((c) => c + coinReward);
    setHearts((h) => h + heartReward);
    setTotalServed((prev) => {
      const nextTotal = prev + 1;
      // Day escalation trigger (every 5 serviced pets advances day!)
      if (nextTotal % 5 === 0) {
        setDay((d) => d + 1);
        setUsedFreeRediagnosis(false); // Reset daily free rediagnosis ticket!
        setShowDayBanner(true);
        setTimeout(() => setShowDayBanner(false), 4200);
      }
      return nextTotal;
    });

    // Update Care Bookings discover counters
    const finalSpecies = checkedPet.species;
    setServedCounts((prev) => ({
      ...prev,
      [finalSpecies]: (prev[finalSpecies] || 0) + 1,
    }));

    if (isCorrect) {
      addFloater(`🎉 诊断正确！🪙 硬币 +${coinReward}  ❤️ 爱心 +${heartReward}！`, 650, 200, 'text-emerald-600 font-bold text-sm');
    } else {
      cozyAudio.playPatienceWarning();
      const correctDeptLabel = 
        checkedPet.request === 'MEDICAL' ? '左侧诊疗室 🏥 (医疗医治)' : 
        checkedPet.request === 'GROOMING' ? '中部美容沙龙 🧴 (清洗梳妆)' : '右侧训练广场 🎪 (习惯训练)';
      
      const actualDeptLabel =
        department === 'MEDICAL' ? '左侧诊疗室 🏥' : 
        department === 'GROOMING' ? '中部美容沙龙 🧴' : '右侧训练广场 🎪';

      setActiveExplanation({
        petName: checkedPet.name,
        species: checkedPet.species,
        correctDept: correctDeptLabel,
        actualDept: actualDeptLabel,
        explanation: checkedPet.explanation || '请参考宠物的倾诉表现进行合理诊断，有的症状可能伴随干扰性词汇哦。',
      });

      addFloater(`❌ 诊断不匹配！它原本需要的是: ${correctDeptLabel.split(' ')[0]}`, 650, 200, 'text-rose-500 font-bold text-xs');
    }
  };

  // --- Abort/Dismiss Care ---
  const handleDismissPet = (petId: string, department: RequestType) => {
    if (department === 'MEDICAL') setMedicalRoomPet(null);
    if (department === 'GROOMING') setGroomingRoomPet(null);
    if (department === 'TRAINING') setTrainingRoomPet(null);

    // Minor penalty
    setCoins((c) => Math.max(5, c - 5));
    addFloater('🥀 宠物提前不满意离店回家了', 600, 250, 'text-rose-400');
  };

  // --- Buy upgrades ---
  const handleBuyUpgrade = (id: string, cost: number) => {
    setCoins((c) => c - cost);
    setUpgrades((prev) =>
      prev.map((up) => (up.id === id ? { ...up, purchased: true } : up))
    );
    addFloater('🎉 特配精品升级购买成功！', 600, 100, 'text-indigo-600 font-bold');
  };

  // --- Upgrade Level with hearts satisfaction ---
  const handleUpgradeLevel = (type: 'medical' | 'grooming' | 'training' | 'store', cost: number) => {
    // Subtract hearts cost and increment target level
    setHearts((h) => Math.max(0, h - cost));
    if (type === 'medical') {
      setMedicalLevel((lvl) => Math.min(3, lvl + 1));
      addFloater('🏥 诊疗科室等级完美跃升！', 300, 100, 'text-emerald-600 font-bold text-sm animate-bounce');
    } else if (type === 'grooming') {
      setGroomingLevel((lvl) => Math.min(3, lvl + 1));
      addFloater('🧴 美容科室获得香氛香薰加持！(正确诊断时硬币与爱心收益额外+20%)', 300, 100, 'text-rose-500 font-bold text-sm animate-bounce');
    } else if (type === 'training') {
      setTrainingLevel((lvl) => Math.min(3, lvl + 1));
      addFloater('🎪 训练乐园物理交互速率跃升 50%！并自带 +5 收益加成！', 300, 100, 'text-sky-600 font-bold text-sm animate-bounce');
    } else if (type === 'store') {
      setStoreLevel((lvl) => Math.min(3, lvl + 1));
      addFloater('🏬 诊所整体客容量扩建完成！全新特殊客人事件完美解锁！', 300, 100, 'text-amber-600 font-bold text-sm animate-bounce');
    }
  };

  // --- Reset career ---
  const handleResetGame = () => {
    petIdCounter.current = 1;
    setDay(1);
    setHearts(25);
    setCoins(60);
    setTotalServed(0);
    setServedCounts({
      '茶杯史莱姆': 1,
    });
    // Reset levels as well!
    setMedicalLevel(1);
    setGroomingLevel(1);
    setTrainingLevel(1);
    setStoreLevel(1);
    setUsedFreeRediagnosis(false);

    setLobbyPets([
      generateRandomPet('MEDICAL', true),
      generateRandomPet('GROOMING', false),
    ]);
    setMedicalRoomPet(null);
    setGroomingRoomPet(null);
    setTrainingRoomPet(null);
    setUpgrades(INITIAL_UPGRADES);
    setSelectedLobbyPetId(null);
    cozyAudio.playHeal();
  };

  // --- Game Start Screen if not started ---
  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-[#fffcf0] px-4 py-8 flex flex-col items-center justify-center crt-overlay relative selection:bg-rose-100 selection:text-rose-800 w-full overflow-hidden font-sans">
        {/* Floating text particles handler */}
        {floaters.map((fl) => (
          <span
            key={fl.id}
            className={`absolute pointer-events-none text-xs font-bold font-mono tracking-tight animate-bounce z-50 p-2 bg-white/90 border border-zinc-100 shadow-sm rounded-xl duration-500`}
            style={{ left: fl.x, top: fl.y }}
          >
            ✨ {fl.text}
          </span>
        ))}

        {/* Floating clouds/sparkles decor layer */}
        <div className="absolute inset-0 pointer-events-none opacity-10 bg-cover bg-center" style={{ backgroundImage: `url(${bgImage})` }}></div>

        {/* Decorative Floating Blobs in corners */}
        <div className="absolute -top-12 -left-12 w-64 h-64 rounded-full bg-rose-200/40 blur-3xl" />
        <div className="absolute -bottom-16 -right-16 w-80 h-80 rounded-full bg-emerald-200/30 blur-3xl" />
        <div className="absolute top-1/4 right-1/10 w-48 h-48 rounded-full bg-amber-100/50 blur-2xl" />

        <div className="max-w-2xl w-full z-10 flex flex-col items-center text-center px-4">
          {/* Large bouncing clinic logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: -20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.6, type: 'spring' }}
            className="text-8xl mb-6 float-cute bg-white p-6 rounded-[40px] border-4 border-amber-900/10 shadow-xl relative"
          >
            🏩
            <span className="absolute -top-2 -right-2 text-3xl animate-bounce">✨</span>
            <span className="absolute -bottom-1 -left-2 text-3xl animate-pulse">🐹</span>
          </motion.div>

          {/* Header titles */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="space-y-3"
          >
            <h1 className="text-5.5xl md:text-7.5xl font-black text-[#3d3b3c] tracking-tight font-pixel text-shadow leading-tight">
              {t('title', lang)}
            </h1>
            <p className="text-sm md:text-base text-[#85796a] font-semibold leading-relaxed max-w-lg mx-auto">
              {t('subtitle', lang)}
            </p>
          </motion.div>

          <div className="h-0.5 w-[60%] bg-[#eadecd] my-8 opacity-60"></div>

          {/* Welcome Card Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="w-full bg-white border-4 border-[#eee4d5] rounded-[32px] p-6 shadow-xl mb-8 space-y-5"
          >
            <div className="text-center">
              <span className="text-[11px] font-mono font-bold uppercase py-1 px-3 bg-rose-50 border border-rose-200 rounded-full text-rose-800 tracking-wider">
                👩‍⚕️ {t('startWelcome', lang)} 👨‍⚕️
              </span>
            </div>

            {/* Language Selector block */}
            <div className="space-y-2.5">
              <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest leading-none">
                🌐 {t('selectLanguage', lang)}
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { code: 'en', name: 'English', desc: 'US/EU English' },
                  { code: 'zh', name: '中文', desc: '简体中文' },
                  { code: 'ko', name: '한국어', desc: '한국어 팩' }
                ].map((item) => {
                  const active = lang === item.code;
                  return (
                    <button
                      key={item.code}
                      onClick={() => {
                        cozyAudio.playClick();
                        setLang(item.code as Language);
                        addFloater(item.code === 'en' ? 'English Selected!' : item.code === 'ko' ? '한국어 선택됨!' : '已切换至中文！', window.innerWidth/2 - 80, 240, 'text-[#4e3b2c]');
                      }}
                      className={`flex flex-col items-center justify-center p-3 rounded-2xl border-2 transition-all cursor-pointer ${
                        active
                          ? 'bg-amber-100/40 border-amber-500 shadow-md text-amber-950 scale-102 font-bold'
                          : 'bg-[#faf8f5] border-stone-200 hover:border-amber-300 text-stone-500'
                      }`}
                      id={`lang_select_${item.code}`}
                    >
                      <span className="text-xs md:text-sm font-bold">{item.name}</span>
                      <span className="text-[9px] opacity-60 mt-0.5">{item.desc}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Start Game Action Button */}
            <div className="pt-2">
              <button
                onClick={() => {
                  cozyAudio.playSuccess();
                  setGameStarted(true);
                }}
                className="w-full py-4 px-6 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-extrabold text-base md:text-lg rounded-2xl border-b-6 border-teal-700 hover:from-emerald-400 hover:to-teal-400 cursor-pointer active:border-b-0 active:translate-y-1 shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 header-fonts uppercase tracking-wider animate-pulse"
                id="btn_start_game_open"
              >
                <span>🚀 {t('startGameBtn', lang)}</span>
              </button>
            </div>
          </motion.div>

          {/* Small credit footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 0.5 }}
            className="text-[10px] text-stone-500 max-w-sm mt-3 leading-comfortable"
          >
            🐾 {lang === 'en' ? 'Fantasy Companion Clinic' : lang === 'ko' ? '환상 꼬마 신수 진료소' : '幻想诊断所'} | {lang === 'en' ? 'Super cozy, 100% localized' : lang === 'ko' ? '100% 한글화 지원' : '无缝支持完美汉化'}
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f3eb] px-4 py-6 md:p-8 flex flex-col items-center gap-6 crt-overlay relative selection:bg-rose-100 selection:text-rose-800">

      {/* Floating text particles handler */}
      {floaters.map((fl) => (
        <span
          key={fl.id}
          className={`absolute pointer-events-none text-xs font-bold font-mono tracking-tight animate-bounce z-50 p-2 bg-white/90 border border-zinc-100 shadow-sm rounded-xl duration-500`}
          style={{ left: fl.x, top: fl.y }}
        >
          ✨ {fl.text}
        </span>
      ))}

      {/* Career Banner Alerts */}
      <AnimatePresence>
        {showDayBanner && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 flex items-center justify-center bg-black/40 z-[100] p-4 backdrop-blur-xs"
          >
            <div className="bg-white border-8 border-amber-400 rounded-[40px] p-8 max-w-md text-center shadow-2xl relative float-cute">
              <span className="text-6xl block mb-2">🌅</span>
              <h2 className="text-3xl font-bold text-amber-900 font-pixel tracking-wide">
                清晨初阳冉冉升起！
              </h2>
              <div className="h-0.5 bg-[#dfdfdf] my-3"></div>
              <p className="text-sm font-bold text-amber-700 font-mono uppercase tracking-widest">
                欢迎进入经营的第 {day} 天
              </p>
              <p className="text-xs text-[#6e6353] mt-2 leading-relaxed">
                你的疗愈声誉已传遍了精灵之野！越来越多拥有奇妙魔法的幻想萌宠们在朝着咱们这间暖和舒坦的度假诊所闻讯而来了。请继续关照爱护并理疗好它们哦！
              </p>
              <button
                onClick={() => {
                  cozyAudio.playClick();
                  setShowDayBanner(false);
                }}
                className="mt-6 px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold text-xs rounded-2xl border-b-4 border-amber-800 active:border-b-0 hover:from-amber-400 cursor-pointer"
                id="btn_close_day_banner"
              >
                营业开门！ 🤝
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOP HEADER */}
      <div className="w-full max-w-7xl flex flex-col md:flex-row justify-between items-center gap-2 border-b-2 border-[#eadecd] pb-4 font-sans">
        <div className="text-center md:text-left flex items-center gap-3">
          <span className="text-4xl p-2 bg-rose-100 rounded-2xl border-2 border-rose-300 shadow-xs float-cute leading-none inline-block">
            🐹
          </span>
          <div>
            <h1 className="text-2.5xl md:text-3.5xl font-extrabold text-[#3d3b3c] tracking-tight header-fonts flex items-center justify-center md:justify-start gap-1">
              {lang === 'en' ? 'Fantasy Companion Clinic' : lang === 'ko' ? '환상 꼬마 신수 진료소' : '宠物诊断所'}{' '}
              <span className="text-xs font-mono font-bold uppercase py-0.5 px-2 bg-amber-400 border border-amber-500 rounded-full text-amber-950 tracking-widest hidden sm:inline-block">
                {lang === 'en' ? 'Pixel Town Mode' : lang === 'ko' ? '픽셀 미니게임 모드' : '像素小游戏模式'}
              </span>
            </h1>
            <p className="text-xs text-[#85796a] font-semibold leading-normal mt-0.5 max-w-2xl">
              {lang === 'en'
                ? 'Super cozy and relaxing pet clinic simulation. Run warm soapy bubble baths, perform clinical checkups, and coach funny physical jumps!'
                : lang === 'ko'
                ? '스트레스를 단숨에 부수는 상큼하고 따스한 동물 병원. 아기자기하게 온수 거품 목욕을 진행하고, 물뿌리기 점프 훈련을 이끌어보세요!'
                : '超级解压清新的幻想兽医院游戏。为极其可爱娇滴滴的小家伙们进行温水泡澡泡泡浴、诊视喂药和翻滚跨栏吧！'}
            </p>
          </div>
        </div>

        {/* Ambient aesthetic tags and Language Quick Switcher */}
        <div className="flex flex-wrap items-center gap-2">
          {hasCandle && (
            <span className="text-xs px-2 py-1 bg-rose-5 border border-rose-100 text-rose-700 font-bold rounded-xl" title={lang === 'en' ? 'Max patience limit +15' : lang === 'ko' ? '인내 제한치 확장 +15' : '魔法熏香生效中 (全店宠物耐心上限+15点)'}>
              🕯️ {lang === 'en' ? 'Incense' : lang === 'ko' ? '아로마 향' : '魔法熏香'}
            </span>
          )}
          {hasIvy && (
            <span className="text-xs px-2 py-1 bg-emerald-5 border border-emerald-100 text-emerald-700 font-bold rounded-xl" title={lang === 'en' ? 'Initial entry patience +10%' : lang === 'ko' ? '진입 인내 기본치 상승 +10%' : '挂壁长春藤生效中 (初始耐心格外提升+10%)'}>
              🌿 {lang === 'en' ? 'Ivy Plant' : lang === 'ko' ? '상록 넝쿨' : '生态绿植'}
            </span>
          )}
          {hasCozyRugs && (
            <span className="text-xs px-2 py-1 bg-amber-5 border border-amber-100 text-amber-700 font-bold rounded-xl" title={lang === 'en' ? 'Lobby patience decay -30%' : lang === 'ko' ? '대기석 대기 피로도 감쇄 -30%' : '松软防滑爪爪地毯生效中 (排队耐心消耗减缓-30%)'}>
              🧶 {lang === 'en' ? 'Soft Rugs' : lang === 'ko' ? '폭신 러그' : '玩偶地毯'}
            </span>
          )}
          {hasFairyLights && (
            <span className="text-xs px-2 py-1 bg-yellow-5 border border-yellow-100 text-yellow-600 font-bold rounded-xl animate-pulse" title={lang === 'en' ? 'Therapy speed +25%' : lang === 'ko' ? '치료 공정 반응 단축 +25%' : '荧光荧星彩灯生效中 (所有调理治疗效率提升+25%)'}>
              ✨ {lang === 'en' ? '1.25x Speed' : lang === 'ko' ? '1.25배 부스터' : '1.25x 效率'}
            </span>
          )}

          {/* Quick Language Changer */}
          <div className="flex bg-[#eadecd]/60 border border-[#dfd2bf] rounded-xl p-0.5 ml-1 shadow-inner">
            {(['en', 'zh', 'ko'] as Language[]).map((l) => (
              <button
                key={l}
                onClick={() => {
                  cozyAudio.playClick();
                  setLang(l);
                  addFloater(l === 'en' ? 'English Active!' : l === 'ko' ? '한국어 팩 적용!' : '简体中文已应用！', window.innerWidth - 300, 100, 'text-[#7c5843]');
                }}
                className={`px-2 py-0.5 text-[10px] font-sans font-bold rounded-lg cursor-pointer transition-all ${
                  lang === l
                    ? 'bg-white text-amber-950 shadow-xs scale-102 font-extrabold'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                {l === 'en' ? 'EN' : l === 'zh' ? '中' : '한'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* CORE STATUS DASHBOARD PANEL */}
      <div className="w-full max-w-7xl relative z-30">
        <GameStats
          hearts={hearts}
          coins={coins}
          day={day}
          totalServed={totalServed}
          onResetGame={handleResetGame}
          goldenTreatsCount={hasGoldenTreats ? 1 : 0}
          showHelp={showHelp}
          setShowHelp={setShowHelp}
          activeModal={activeModal}
          setActiveModal={setActiveModal}
          lang={lang}
        />
      </div>

      {/* MAIN CLINICAL GAME AREA */}
      <div className="w-full max-w-7xl flex flex-col gap-6 bg-[#faf8f4] border-4 border-[#eadecd] rounded-[36px] p-4 md:p-6 shadow-xs relative">

        {/* Background pixel-art decor showcase layer */}
        <div className="absolute inset-0 rounded-[30px] overflow-hidden pointer-events-none opacity-20 bg-cover bg-center" style={{ backgroundImage: `url(${bgImage})` }}></div>

        {/* SECTION 1: THREE SERVICE WINDOWS (Full-width top section) */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 z-20">
          <WindowCard
            config={SERVICE_WINDOWS[0]}
            pet={medicalRoomPet}
            onCompletePet={(id) => handleCheckoutPet(id, 'MEDICAL')}
            onDismissPet={(id) => handleDismissPet(id, 'MEDICAL')}
            speedMultiplier={serviceSpeedMultiplier}
            medicalLevel={medicalLevel}
            groomingLevel={groomingLevel}
            trainingLevel={trainingLevel}
            lang={lang}
          />
          <WindowCard
            config={SERVICE_WINDOWS[1]}
            pet={groomingRoomPet}
            onCompletePet={(id) => handleCheckoutPet(id, 'GROOMING')}
            onDismissPet={(id) => handleDismissPet(id, 'GROOMING')}
            speedMultiplier={serviceSpeedMultiplier}
            medicalLevel={medicalLevel}
            groomingLevel={groomingLevel}
            trainingLevel={trainingLevel}
            lang={lang}
          />
          <WindowCard
            config={SERVICE_WINDOWS[2]}
            pet={trainingRoomPet}
            onCompletePet={(id) => handleCheckoutPet(id, 'TRAINING')}
            onDismissPet={(id) => handleCheckoutPet(id, 'TRAINING')}
            speedMultiplier={serviceSpeedMultiplier}
            medicalLevel={medicalLevel}
            groomingLevel={groomingLevel}
            trainingLevel={trainingLevel}
            lang={lang}
          />
        </div>

        {/* SECTION 2: LOBBY CHECK-IN PANEL (Below windows, sequential layout of pets to be assigned) */}
        <div className="w-full bg-white border-2 border-[#dfd6c6] rounded-3xl p-5 shadow-xs z-20 font-sans">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b-2 border-slate-100 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🛋️</span>
              <div>
                <h3 className="font-bold text-slate-800 text-sm tracking-wide">
                  {lang === 'en'
                    ? 'Lobby Waiting Area (Diagnose & Route)'
                    : lang === 'ko'
                    ? '대기 구역 대기실 (증상을 읽고 부서 지정)'
                    : '待分配等候诊断区 (请仔细判断需求并指派)'}
                </h3>
                <p className="text-[11px] text-[#817462] leading-normal">
                  {lang === 'en'
                    ? "Read each magical pet's thoughts, diagnose their therapeutic desires, and assign them using department buttons below!"
                    : lang === 'ko'
                    ? '대기 아기들의 꼬물꼬물 속마음을 정밀 관찰하시고, 알맞은 코스로 하프라인 분류 인계를 단행하세요!'
                    : '仔细阅读每只萌宠的碎碎念描述，诊断它们的真实需求，然后点击对应的科室按钮护送它们过去！'}
                </p>
              </div>
            </div>
            <span className="text-xs px-2.5 py-1 bg-[#f4efe6] text-amber-800 font-mono font-bold rounded-lg border border-[#eadecd] whitespace-nowrap">
              {lang === 'en' ? 'Lobby Seats Checked' : lang === 'ko' ? '대기석 혼잡도' : '大厅席位客满度'}{' '}
              {lobbyPets.length} / {storeLevel === 1 ? 2 : storeLevel === 2 ? 3 : 4} 🐾
            </span>
          </div>

          {/* Cushions List - sequentially arranged */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {lobbyPets.length === 0 ? (
              <div className="col-span-full py-10 text-center text-zinc-400 border border-dashed border-zinc-200 rounded-2xl flex flex-col items-center justify-center gap-1.5 bg-[#fdfbf8]/50">
                <span className="text-2xl">💤</span>
                <p className="text-xs font-semibold">
                  {lang === 'en'
                    ? 'Lobby is peaceful and silent'
                    : lang === 'ko'
                    ? '대기 광장이 한산하고 고요합니다'
                    : '等候大厅空旷舒畅'}
                </p>
                <p className="text-[10px] text-zinc-400 max-w-sm leading-normal animate-pulse">
                  {lang === 'en'
                    ? 'A magical companion will wander into the clinic soon, please wait...'
                    : lang === 'ko'
                    ? '조금만 누워 수배 대기하세요, 요술 숲속 친구가 바삐 뽈뽈 헤매다 문을 두드려 올 것입니다...'
                    : '请稍安勿躁，活泼调皮的幻想动物们正在急匆匆地奔跑过来……'}
                </p>
              </div>
            ) : (
              lobbyPets.map((pet) => {
                const isSelected = selectedLobbyPetId === pet.id;
                const patienceColor =
                  pet.patience > 55
                    ? 'bg-emerald-500'
                    : pet.patience > 25
                    ? 'bg-amber-500 animate-pulse'
                    : 'bg-rose-500 animate-bounce duration-500';

                return (
                  <div
                    key={pet.id}
                    className="p-4 rounded-2xl border-2 flex flex-col justify-between transition-all bg-white border-[#f4efe6] hover:border-amber-400 hover:scale-[1.02] hover:shadow-md cursor-pointer relative group"
                    onClick={() => {
                      cozyAudio.playClick();
                    }}
                  >
                    <div>
                      {/* Top line with avatar and species */}
                      <div className="flex items-center justify-between gap-1.5">
                        <div className="flex items-center gap-2">
                          <div className="text-2.5xl p-1.5 bg-[#fdfbf8] border border-[#eadecd] rounded-xl float-cute inline-block leading-none">
                            {pet.emoji}
                          </div>
                          <div>
                            <span className="text-xs font-bold text-slate-800 block leading-tight group-hover:text-amber-800 transition-colors">
                              {translateName(pet.name, lang)}
                            </span>
                            <span className="text-[10px] text-[#aa9880] block font-medium leading-none mt-0.5 font-sans">
                              {translateSpecies(pet.species, lang)}
                            </span>
                          </div>
                        </div>

                        {/* Mysterious Request Status Badge (Zero spoilers/hints!) */}
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md flex items-center gap-0.5 leading-none h-5 border bg-slate-50 border-slate-200 text-slate-500 font-sans uppercase">
                          💬 {lang === 'en' ? 'Diagnose' : lang === 'ko' ? '진단 대기' : '待诊断'}
                        </span>
                      </div>

                      {/* Cute Dialogue bubble */}
                      <p className="text-[11px] italic text-[#706456] leading-relaxed mt-2.5 border-t border-[#f4efe6] pt-2 mb-2 line-clamp-3 min-h-[50px] font-sans">
                        “{translateDialogue(pet.dialogue, lang)}”
                      </p>

                      {/* AI Medical Assistant Hint (Unlocked at Medical Level >= 2) */}
                      {medicalLevel >= 2 && (
                        <div className="mt-1.5 p-1.5 bg-[#eff6ff] border border-[#bfdbfe] rounded-xl text-[10px] text-blue-800 leading-normal text-left font-sans flex items-start gap-1">
                          <span className="text-xs">🧠</span>
                          <div>
                            <span className="font-extrabold block text-[#1e40af]">{t('aiDialogueHint', lang)}</span>
                            <span>
                              {pet.request === 'MEDICAL' 
                                ? t('aiClueMedical', lang)
                                : pet.request === 'GROOMING' 
                                ? t('aiClueGrooming', lang)
                                : t('aiClueTraining', lang)}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Patience indicator bottom bar and dispatch buttons */}
                    <div className="mt-3">
                      <div className="flex items-center justify-between gap-1 border-t border-[#f7f5f0] pt-2 font-sans">
                        <div className="flex items-center gap-0.5 text-[9px] text-zinc-400 font-bold whitespace-nowrap">
                          <Clock className="w-2.5 h-2.5 block text-zinc-400" /> {lang === 'en' ? 'Patience:' : lang === 'ko' ? '대기 인내:' : '耐心:'}
                        </div>
                        <div className="w-full bg-[#f0ede6] h-1.5 rounded-full overflow-hidden mx-1">
                          <div className={`h-full ${patienceColor}`} style={{ width: `${pet.patience}%` }}></div>
                        </div>
                        <span className="text-[9px] font-mono text-zinc-500 font-bold leading-none min-w-[22px] text-right">
                          {Math.round(pet.patience)}%
                        </span>
                      </div>

                      {/* One-click Action Buttons (Direct Choice without selection) */}
                      <div className="mt-3 pt-2.5 border-t border-dashed border-[#e6decb] space-y-2 font-sans">
                        {/* 3 manual choices block */}
                        <div className="grid grid-cols-3 gap-1 px-0.5">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAssignPet(pet.id, 'MEDICAL');
                            }}
                            className="py-1.5 px-0.5 bg-emerald-500 hover:bg-emerald-600 font-bold text-[9px] text-white border-b-2 border-emerald-700 rounded-lg flex flex-col items-center justify-center gap-0.5 transition-all active:translate-y-0.5 cursor-pointer"
                            id={`btn_assign_medical_${pet.id}`}
                            title={lang === 'en' ? 'Dispatch to medical ward' : lang === 'ko' ? '진료실 이송 수술' : '护送诊疗室'}
                          >
                            <span className="text-xs">🏥</span>
                            <span className="scale-[0.95] truncate">
                              {lang === 'en' ? 'Treatment' : lang === 'ko' ? '진료실' : '护送诊疗'}
                            </span>
                          </button>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAssignPet(pet.id, 'GROOMING');
                            }}
                            className="py-1.5 px-0.5 bg-rose-500 hover:bg-rose-600 font-bold text-[9px] text-white border-b-2 border-rose-700 rounded-lg flex flex-col items-center justify-center gap-0.5 transition-all active:translate-y-0.5 cursor-pointer"
                            id={`btn_assign_grooming_${pet.id}`}
                            title={lang === 'en' ? 'Dispatch to grooming salon' : lang === 'ko' ? '미용실 이송 샴푸' : '护送美容室'}
                          >
                            <span className="text-xs">🧴</span>
                            <span className="scale-[0.95] truncate">
                              {lang === 'en' ? 'Grooming' : lang === 'ko' ? '미용실' : '护送美容'}
                            </span>
                          </button>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAssignPet(pet.id, 'TRAINING');
                            }}
                            className="py-1.5 px-0.5 bg-[#1c64f2] hover:bg-[#1a56db] font-bold text-[9px] text-white border-b-2 border-blue-800 rounded-lg flex flex-col items-center justify-center gap-0.5 transition-all active:translate-y-0.5 cursor-pointer"
                            id={`btn_assign_training_${pet.id}`}
                            title={lang === 'en' ? 'Dispatch to training area' : lang === 'ko' ? '훈련장 이송 실습' : '护送训练场'}
                          >
                            <span className="text-xs">🎪</span>
                            <span className="scale-[0.95] truncate">
                              {lang === 'en' ? 'Training' : lang === 'ko' ? '훈련장' : '护送训练'}
                            </span>
                          </button>
                        </div>

                        {/* Sweet treats cookies recovery */}
                        {hasGoldenTreats && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleFeedLobbyTreat(pet.id);
                            }}
                            className="w-full py-1.5 px-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold text-[9px] rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                            id={`btn_treat_lobby_${pet.id}`}
                          >
                            <span>
                              🍖{' '}
                              {lang === 'en'
                                ? 'Feed Royal Treat (+30% Patience)'
                                : lang === 'ko'
                                ? '황실 고기 통조림 피딩 (+30% 인내)'
                                : '喂皇家点心 (+30% 耐心)'}
                            </span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-[#aa9f90] leading-none font-sans">
            <span>
              {lang === 'en'
                ? '💡 Diagnose guideline: Read their dialogues closely, match requirements (diseases vs styling vs behavior), and route them smoothly!'
                : lang === 'ko'
                ? '💡 진단 가이드: 아기들의 대화(사연)를 주의 깊게 읽고 진료(체온등), 미용(오염등), 혹은 훈련(자세불량) 중 알맞은 부서로 보내주세요.'
                : '💡 诊断指南: 请仔细阅读每只小动物说的话（碎碎念），判断它们的真实诉求，再按决策按钮分流到对应科室。'}
            </span>
            <span className="font-pixel text-[11px] text-amber-700 font-semibold">16 bits · {lang === 'en' ? 'Cozy Clinic' : lang === 'ko' ? '꼬마 신수 진료소' : '宠物诊断所'}</span>
          </div>
        </div>
      </div>

      {/* MODAL OVERLAYS */}
      <AnimatePresence>
        {activeModal !== 'none' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-[110] flex items-center justify-center p-4 backdrop-blur-xs"
            onClick={() => {
              cozyAudio.playClick();
              setActiveModal('none');
            }}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 15 }}
              transition={{ type: 'spring', damping: 26, stiffness: 360 }}
              className="bg-[#faf8f4] border-4 border-[#3d3b3c] rounded-[32px] shadow-2xl w-full max-w-4xl max-h-[85vh] overflow-hidden p-6 relative flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header inside modal */}
              <div className="flex items-center justify-between border-b-2 border-[#eadecd] pb-4 mb-4 flex-shrink-0">
                <div className="flex items-center gap-2.5">
                  {activeModal === 'shop' ? (
                    <>
                      <div className="p-2.5 bg-amber-50 rounded-2xl border-2 border-amber-200">
                        <ShoppingBag className="w-5 h-5 text-amber-600 animate-pulse" />
                      </div>
                      <div>
                        <h2 className="text-lg md:text-xl font-black text-amber-900 tracking-tight header-fonts">
                          精品店升级系统 🏬
                        </h2>
                        <p className="text-[10px] md:text-xs text-amber-700 font-medium">购买特配店铺装潢，获永久自动化提速与极品道具特效！</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="p-2.5 bg-indigo-50 rounded-2xl border-2 border-indigo-200">
                        <BookOpen className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div>
                        <h2 className="text-lg md:text-xl font-black text-indigo-900 tracking-tight header-fonts">
                          幻想萌宠科学图鉴 📖
                        </h2>
                        <p className="text-[10px] md:text-xs text-indigo-700 font-medium">观察并解锁所有神奇伙伴们的秘密，聆听身世背景八卦。</p>
                      </div>
                    </>
                  )}
                </div>
                <button
                  onClick={() => {
                    cozyAudio.playClick();
                    setActiveModal('none');
                  }}
                  className="px-4 py-2 bg-[#f4efe6] hover:bg-[#eadecd] text-amber-900 font-bold font-mono text-xs rounded-xl border-b-2 border-[#d3c2a9] active:border-b-0 active:translate-y-0.5 cursor-pointer leading-none"
                >
                  关闭 ✕
                </button>
              </div>

              {/* Scrollable content area */}
              <div className="overflow-y-auto flex-1 pr-1">
                {activeModal === 'shop' ? (
                  <DecorShop
                    upgrades={upgrades}
                    coins={coins}
                    onBuyUpgrade={handleBuyUpgrade}
                    hearts={hearts}
                    medicalLevel={medicalLevel}
                    groomingLevel={groomingLevel}
                    trainingLevel={trainingLevel}
                    storeLevel={storeLevel}
                    onUpgradeLevel={handleUpgradeLevel}
                  />
                ) : (
                  <PetJournal servedCounts={servedCounts} />
                )}
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Incorrect Diagnosis Explanation Pop-up */}
        {activeExplanation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-[120] flex items-center justify-center p-4 backdrop-blur-xs"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              className="bg-white border-4 border-[#3d3b3c] rounded-[36px] shadow-2xl w-full max-w-lg p-6 relative flex flex-col text-left float-cute"
            >
              {/* Top Cute Accent Ribbon */}
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-rose-500 text-white text-[10px] md:text-xs font-black px-6 py-1.5 rounded-full border-2 border-[#3d3b3c] uppercase tracking-widest shadow-md whitespace-nowrap">
                🔍 萌宠会诊分析报告 / 决策判定解析
              </div>

              <div className="mt-4 text-center">
                <span className="text-5xl block mb-2">🩹</span>
                <h3 className="text-lg md:text-xl font-black text-rose-600 tracking-tight">
                  「{activeExplanation.petName}」的分流诊断产生了偏差！
                </h3>
                <p className="text-[10px] text-zinc-400 mt-1 font-mono">
                  科目分类错案记录 📖 反思与积累
                </p>
              </div>

              <div className="h-px bg-zinc-100 my-4"></div>

              {/* Patient Profile info */}
              <div className="bg-rose-50/50 border border-rose-100 rounded-2xl p-4 space-y-2.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-500 font-medium">看诊萌宠：</span>
                  <span className="font-bold text-[#4e4539] bg-white px-2.5 py-0.5 rounded-lg border border-rose-100 gap-1 inline-flex items-center">
                    {activeExplanation.species}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-500 font-medium font-bold">你的选择：</span>
                  <span className="text-rose-500 font-black line-through bg-rose-50 px-2 py-0.5 rounded border border-rose-100">
                    {activeExplanation.actualDept}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-500 font-medium font-bold">正确目的地：</span>
                  <span className="text-emerald-700 font-black bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-200 animate-pulse">
                    {activeExplanation.correctDept}
                  </span>
                </div>
              </div>

              {/* Diagnosis Case Analysis */}
              <div className="mt-4">
                <h4 className="text-xs font-black text-zinc-700 mb-1.5 flex items-center gap-1">
                  💡 医师联合会诊判定原因：
                </h4>
                <p className="text-xs text-[#5c5449] leading-relaxed bg-[#fbf9f5] border border-[#eee9df] p-3 rounded-2xl font-medium font-sans">
                  {activeExplanation.explanation}
                </p>
              </div>

              {/* Close Button */}
              <button
                onClick={() => {
                  cozyAudio.playHeal();
                  setActiveExplanation(null);
                }}
                className="mt-6 w-full py-3 bg-[#4e4539] hover:bg-[#3d352b] text-white font-black text-sm rounded-2xl border-b-4 border-black active:border-b-0 active:translate-y-1 cursor-pointer transition-all leading-none shadow-md font-pixel tracking-wide"
              >
                我知道了，继续精进！💪
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CREDITS FOOTER */}
      <div className="text-center py-6 text-zinc-400 text-[11px] leading-relaxed select-none">
        <p>🐾 幻想萌宠医院模拟器 | 专为所有喜爱小动物的老板们打造的放松身心港湾 ❤️</p>
        <p className="mt-0.5">努力获取金币与爱心，解锁更多精品店永久升级，邂逅前所未闻的奇异森林伙伴们吧！</p>
      </div>
    </div>
  );
}
