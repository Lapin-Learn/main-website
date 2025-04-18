export type Bucket = {
  id: string;
  name: string;
  owner: string;
  permission: string;
  url: string;
};

export type Image = Bucket;
export type Audio = Bucket;

export type PresignedUrl = {
  id: string;
  url: string;
};

export type Option = {
  value: string;
  label: string;
};

export type AudioSource = {
  audioUrl: string;
  audioBlob: Blob;
};

export type IStreak = {
  id: number;
  current: number;
  target: number;
  record: number;
  extended: boolean;
};

export type LandingPageCollection = {
  collectionId: number;
  collectionName: string;
  description: string;
  tags: string[];
  thumbnail: string | null;
  totalTests: number;
  testNames: string[];
};
