/** ****************************************
 *  Author : niuzz niuzz@hotmail.com
 *  Created On : Wed Feb 21 2018
 *  File : user.js
 *******************************************/
'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const UserSchema = new mongoose.Schema({
    uid: String,
    name: String,
    avatar: String,
    mobile: String,
    password: String,
    orderList: Array,
    cartList: [
      {
        productId: String,
        productImg: String,
        productName: String,
        checked: String,
        productNum: Number,
        productPrice: Number,
      },
    ],
    addressList: [
      {
        addressId: Number,
        userName: String,
        streetName: String,
        tel: Number,
        isDefault: Boolean,
      },
    ],
  });
  return mongoose.model('User', UserSchema);
};
