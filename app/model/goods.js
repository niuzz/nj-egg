/** ****************************************
 *  Author : niuzz niuzz@hotmail.com
 *  Created On : Fri Feb 23 2018
 *  File : goods.js
 *******************************************/
'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const produtSchema = new mongoose.Schema({
    productId: String,
    salePrice: Number,
    productName: String,
    productImageSmall: Array,
    productImageBig: String,
    stock: Number,
    sub_title: String,
    limit_num: String,
    productMsg: Object,
  });
  return mongoose.model('Good', produtSchema);
};
