import { EnumGender, EnumRank, EnumRole, EnumTransactionStatus } from "../enums";
import { Image } from "./common.type";

export type AccountIdentifier = {
  username: string;
  id: string;
  dob: string;
  role: EnumRole;
};

export type Level = {
  id: number;
  xp: number;
};

export type Streak = {
  id: number;
  current: number;
  target: number;
  record: number;
  extended: boolean;
};

export type LearnerProfile = {
  id: string;
  rank: EnumRank;
  levelId: number;
  xp: number;
  carrots: number;
  streakId: number;
  createdAt: string;
  updatedAt: string;
  level: Level;
  streak?: Streak;
};

export type UserProfile = {
  id: string;
  username: string;
  email: string;
  role: string;
  fullName: string | null;
  dob: Date | null | string;
  gender: EnumGender | null;
  createdAt: string;
  learnerProfile: LearnerProfile | null;
  avatarId: string | null;
  avatar?: Image;
};

export type OrderItem = {
  name: string;
  price: number;
  quantity: number;
};

export type PayOsTransaction = {
  id: string;
  amount: string;
  status: EnumTransactionStatus;
  createdAt: string;
  updatedAt: string;
};

export type TransactionHistory = {
  id: number;
  accountId: string;
  status: EnumTransactionStatus;
  amount: number;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
  payosTransaction?: PayOsTransaction;
};

export type Transaction = {
  accountNumber: string;
  amount: number;
  counterAccountBankId: string | null;
  counterAccountBankName: string;
  counterAccountName: string;
  counterAccountNumber: string;
  description: string;
  reference: string;
  transactionDateTime: string;
  virtualAccountName: string;
  virtualAccountNumber: string;
};

export type Order = {
  id: string;
  orderCode: number;
  amount: number;
  amountPaid: number;
  amountRemaining: number;
  status: EnumTransactionStatus;
  createdAt: string;
  transactions?: Transaction[];
  canceledAt: string | null;
  cancellationReason: string | null;
};
