export interface IOptInResponse {
  userId: number;
  status: number;
  state: 'SOI' | 'DOI';
}

export enum IOptInStates {
  SOI = 'SOI',
  DOI = 'DOI',
}
