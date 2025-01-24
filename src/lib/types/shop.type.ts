import { EnumItemShop, EnumRandomGiftType } from "../enums";
import { IBucket } from "../interfaces";

export type Shop = {
  id: string;
  name: EnumItemShop;
  description: string;
  price: {
    [key: string]: number;
  };
  duration: number;
  imageId: string;
  image: IBucket;
  popular: string;
  isPopular: boolean;
};

export type Item = {
  id: string;
  itemId: string;
  profileId: string;
  quantity: number;
  expAt: string;
  inUseQuantity: number;
};

export type Inventory = Pick<Item, "quantity" | "expAt"> & Omit<Shop, "popular" | "isPopular">;

export type RandomGift = {
  type: EnumRandomGiftType;
  value: number | Omit<Shop, "popular" | "isPopular">;
};

export type Reward =
  | {
      message: string;
    }
  | RandomGift;

export type CheckoutResponseDataType = {
  bin: string; // Mã BIN ngân hàng
  accountNumber: string; // Số tài khoản của kênh thanh toán
  accountName: string; // Tên chủ tài khoản của kênh thanh toán
  amount: number; // Số tiền của đơn hàng
  description: string; // Mô tả đơn hàng, được sử dụng làm nội dung chuyển khoản
  orderCode: number; // Mã đơn hàng
  currency: string; // Đơn vị tiền tệ
  paymentLinkId: string; // ID link thanh toán
  status: string; // Trạng thái của link thanh toán
  checkoutUrl: string; // Đường dẫn trang thanh toán
  qrCode: string; // Mã QR thanh toán
};
