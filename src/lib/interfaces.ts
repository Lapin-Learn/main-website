export interface IBucket {
  // id: string;
  // name: string;
  // permission: string;
  // createdAt: string;
  // updatedAt: string;
  // uploadStatus: string;
  url: string;
}

export interface IStreak {
  id: number;
  current: number;
  target: number;
  record: number;
  extended: boolean;
}
