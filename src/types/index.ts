export type Generation = 1 | 2 | 3 | 4 | 5 | 6;

export type AircraftStatus = '服役中' | '已退役' | '研发中';

export interface Performance {
  maxSpeed: string;
  maxPayload: string;
  maxTakeoffWeight: string;
  emptyWeight: string;
  combatRadius: string;
  serviceCeiling: string;
  climbRate: string;
  length: string;
  wingspan: string;
  height: string;
}

export interface Photos {
  frontView: string;
  sideView: string;
  topView: string;
  additionalViews: string[];
}

export interface Aircraft {
  id: string;
  name: string;
  nameEn: string;
  generation: Generation;
  country: string;
  manufacturer: string;
  firstFlight: string;
  serviceEntry: string;
 退役Date?: string;
  status: AircraftStatus;
  description: string;
  performance: Performance;
  photos: Photos;
}
