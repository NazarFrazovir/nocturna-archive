export type RealmAudioId =
  | 'hero'
  | 'saga'
  | 'default'
  | 'ashveil'
  | 'thornmere'
  | 'duskmire'
  | 'ironwraith'
  | 'hollowspire'
  | 'nightfen'
  | 'grimhold'
  | 'ethelmourn'

export interface RealmAudioProfile {
  id: RealmAudioId
  label: string
  droneA: number
  droneB: number
  windCutoff: number
  windGain: number
  droneGain: number
  lfoRate: number
  lfoDepth: number
  detune: number
}

export const HERO_PROFILE: RealmAudioProfile = {
  id: 'hero',
  label: 'Архів',
  droneA: 55,
  droneB: 82.5,
  windCutoff: 420,
  windGain: 0.06,
  droneGain: 0.07,
  lfoRate: 0.08,
  lfoDepth: 0.015,
  detune: 3,
}

export const SAGA_PROFILE: RealmAudioProfile = {
  id: 'saga',
  label: 'Сага',
  droneA: 65,
  droneB: 97.5,
  windCutoff: 280,
  windGain: 0.035,
  droneGain: 0.05,
  lfoRate: 0.05,
  lfoDepth: 0.01,
  detune: 2,
}

export const DEFAULT_PROFILE: RealmAudioProfile = {
  id: 'default',
  label: 'Етельморн',
  droneA: 60,
  droneB: 90,
  windCutoff: 350,
  windGain: 0.045,
  droneGain: 0.055,
  lfoRate: 0.06,
  lfoDepth: 0.012,
  detune: 2,
}

export const REALM_PROFILES: Record<string, RealmAudioProfile> = {
  ashveil: {
    id: 'ashveil',
    label: 'Ашвелія',
    droneA: 48,
    droneB: 72,
    windCutoff: 520,
    windGain: 0.09,
    droneGain: 0.04,
    lfoRate: 0.12,
    lfoDepth: 0.02,
    detune: 5,
  },
  thornmere: {
    id: 'thornmere',
    label: 'Торнмер',
    droneA: 52,
    droneB: 78,
    windCutoff: 300,
    windGain: 0.05,
    droneGain: 0.06,
    lfoRate: 0.35,
    lfoDepth: 0.025,
    detune: 4,
  },
  duskmire: {
    id: 'duskmire',
    label: 'Дускмір',
    droneA: 42,
    droneB: 63,
    windCutoff: 220,
    windGain: 0.04,
    droneGain: 0.08,
    lfoRate: 0.04,
    lfoDepth: 0.018,
    detune: 1,
  },
  ironwraith: {
    id: 'ironwraith',
    label: 'Айронврайт',
    droneA: 70,
    droneB: 105,
    windCutoff: 800,
    windGain: 0.03,
    droneGain: 0.065,
    lfoRate: 0.2,
    lfoDepth: 0.03,
    detune: 8,
  },
  hollowspire: {
    id: 'hollowspire',
    label: 'Шпилес',
    droneA: 88,
    droneB: 132,
    windCutoff: 600,
    windGain: 0.055,
    droneGain: 0.05,
    lfoRate: 0.15,
    lfoDepth: 0.022,
    detune: 6,
  },
  nightfen: {
    id: 'nightfen',
    label: 'Найтфен',
    droneA: 50,
    droneB: 75,
    windCutoff: 180,
    windGain: 0.07,
    droneGain: 0.045,
    lfoRate: 0.07,
    lfoDepth: 0.014,
    detune: 2,
  },
  grimhold: {
    id: 'grimhold',
    label: 'Грімхольд',
    droneA: 38,
    droneB: 57,
    windCutoff: 150,
    windGain: 0.025,
    droneGain: 0.09,
    lfoRate: 0.03,
    lfoDepth: 0.01,
    detune: 0,
  },
  ethelmourn: {
    id: 'ethelmourn',
    label: 'Етельморн',
    droneA: 58,
    droneB: 87,
    windCutoff: 400,
    windGain: 0.05,
    droneGain: 0.075,
    lfoRate: 0.09,
    lfoDepth: 0.02,
    detune: 4,
  },
}

export function getProfileForRealm(realmId: string | null): RealmAudioProfile {
  if (!realmId) return DEFAULT_PROFILE
  return REALM_PROFILES[realmId] ?? DEFAULT_PROFILE
}