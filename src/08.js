const secret = new WeakMap();
const fs = require('fs');

class Cart {
  constructor() {
    secret.set(this, { _items: [], _finalTotalResult: 0 });
  }

  addItem(item) {
    const newItem = {
      item_id: item.item_id,
      price: item.price,
      quantity: item.quantity || 1
    };

    secret.get(this)._items.push(newItem);

    return this;
  }

  removeItem({ item_id }) {
    const filteredItems = [];

    for (const item of secret.get(this)._items) {
      if (item.item_id !== item_id) {
        filteredItems.push(item);
      }
    }

    secret.get(this)._items = [...filteredItems];

    return this;
  }

  totalItems() {
    return secret.get(this)._items.length;
  }

  totalQuantity() {
    let totalQuantity = 0;
    secret.get(this)._items.forEach(item => {
      totalQuantity += item.quantity;
    });

    return totalQuantity;
  }

  totalPrice() {
    return secret.get(this)._finalTotalResult;
  }

  showAll() {
    const itemsArr = [];
    secret.get(this)._items.forEach(item => {
      itemsArr.push(item);
    });

    return itemsArr;
  }

  checkOut() {
    const objString = JSON.stringify(secret.get(this)._items);

    return fs.writeFileSync('checkout.json', objString);
  }

  addDiscount(percentage) {
    let totalPrice = 0;
    const discount = (percentage.replace(/%/, '') * 1) / 100;
    secret.get(this)._items.forEach(item => {
      totalPrice += item.price * item.quantity;
    });

    secret.get(this)._finalTotalResult = totalPrice - discount * totalPrice;

    return this;
  }
}

module.exports = Cart;
