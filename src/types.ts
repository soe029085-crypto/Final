export type PetSpecies =
  | '云朵小羊'
  | '茶杯史莱姆'
  | '星宿小兔'
  | '余烬幼龙'
  | '叶子小猫'
  | '抹茶柴犬'
  | '焦糖狐狸'
  | '冰晶企鹅'
  | '月光猫头鹰'
  | '彩虹水母团子';

export type RequestType = 'MEDICAL' | 'GROOMING' | 'TRAINING';

export type ActivityStepStatus = 'PENDING' | 'ACTIVE' | 'DONE';

export interface PetInstance {
  id: string;
  species: PetSpecies;
  name: string;
  avatar: string;
  color: string;
  emoji: string;
  request: RequestType;
  patience: number; // 0 - 100
  patienceSpeed: number; // Speed at which patience decays per second
  dialogue: string;
  state: 'LOBBY' | 'SERVICE_LEFT' | 'SERVICE_CENTER' | 'SERVICE_RIGHT' | 'LEAVING';
  serviceProgress: number; // 0 - 100
  currentTaskStep: number; // current step of mini-game
  explanation?: string; // Cause/Reason text for difficult and critical cases
}

export interface LobbySpace {
  id: number;
  assignedPetId: string | null;
}

export interface ShopUpgrade {
  id: string;
  name: string;
  cost: number;
  description: string;
  purchased: boolean;
  category: 'decor' | 'equipment' | 'atmosphere';
  icon: string;
  visualEffectClass?: string;
}

export interface ServiceWindowConfig {
  id: RequestType;
  title: string;
  colorTheme: string; // Tailwind class
  accentColor: string;
  windowName: 'Left' | 'Center' | 'Right';
  description: string;
  steps: string[];
}

export interface HighScore {
  name: string;
  score: number;
  date: string;
}
