const chai = require('chai');
const expect = chai.expect;
const fs = require('fs');

const Cart = require('../src/08');

describe('08.js', () => {
  const cart = new Cart();
  cart
    .addItem({ item_id: 1, price: 30000, quantity: 3 })
    .addItem({ item_id: 2, price: 10000 })
    .addItem({ item_id: 3, price: 5000, quantity: 2 })
    .removeItem({ item_id: 2 })
    .addItem({ item_id: 4, price: 400, quantity: 6 })
    .addDiscount('50%');

  it('should return the total item', function() {
    expect(cart.totalItems()).to.be.equal(3);
  });

  it('should return the total quantity', function() {
    expect(cart.totalQuantity()).to.be.equal(11);
  });

  it('should return the total price', function() {
    expect(cart.totalPrice()).to.be.equal(51200);
  });

  it('should show all items in cart', function() {
    expect(cart.showAll()).to.be.eql([
      {
        item_id: 1,
        price: 30000,
        quantity: 3
      },
      {
        item_id: 3,
        price: 5000,
        quantity: 2
      },
      {
        item_id: 4,
        price: 400,
        quantity: 6
      }
    ]);
  });

  it('should store data in a file', function() {
    cart.checkOut();
    expect(fs.existsSync('./checkout.json')).to.be.equal(true);
  });
});
