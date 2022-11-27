import { CartItem } from './cart-item';

export class OrderItem {
  imageUrl: string;
  unitPrice: number;
  quantity: number;
  productId: number;

  constructor(cartITem: CartItem) {
    this.imageUrl = cartITem.imageUrl;
    this.quantity = cartITem.quantity;
    this.unitPrice = cartITem.unitPrice;
    this.productId = cartITem.id;
  }
}
