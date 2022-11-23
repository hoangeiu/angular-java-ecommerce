import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems: CartItem[] = [];
  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);

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

  decrementQuantity(theCartItem: CartItem) {
    var itemIndex = this.cartItems.findIndex(
      (item) => item.id === theCartItem.id
    );

    if (itemIndex != -1) {
      let currentCartItem = this.cartItems[itemIndex];
      currentCartItem.quantity--;
      if (currentCartItem.quantity === 0) {
        this.remove(theCartItem);
      } else {
        this.computeCartTotals();
      }
    }
  }

  remove(theCartItem: CartItem) {
    var itemIndex = this.cartItems.findIndex(
      (item) => item.id === theCartItem.id
    );

    if (itemIndex != -1) {
      this.cartItems.splice(itemIndex, 1);

      this.computeCartTotals();
    }
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
