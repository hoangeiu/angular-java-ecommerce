import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems: CartItem[] = [];
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() {}

  addToCart(theCartItem: CartItem) {
    // check if we already have the item in our cart
    // let alreadyExistsInCart: boolean = false;
    // let existingCartItem!: CartItem;

    // if (this.cartItems.length > 0) {
    //   // find the item in the cart based on item id
    //   for (let tempCartItem of this.cartItems) {
    //     if (tempCartItem.id === theCartItem.id) {
    //       existingCartItem = tempCartItem;
    //       break;
    //     }
    //   }
    //   // check if we found it
    //   alreadyExistsInCart = existingCartItem !== undefined;
    // }

    // if (alreadyExistsInCart) {
    //   existingCartItem.quantity++;
    // } else {
    //   this.cartItems.push(theCartItem);
    // }

    var itemIndex = this.cartItems.findIndex(
      (item) => item.id === theCartItem.id
    );
    if (itemIndex != -1) {
      this.cartItems[itemIndex].quantity++;
    } else {
      this.cartItems.push(theCartItem);
    }

    this.computeCartTotals();
  }

  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let currentCartItem of this.cartItems) {
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }

    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
  }
}
