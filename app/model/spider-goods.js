/******************************************
 *  Author : niuzz niuzz@hotmail.com   
 *  Created On : Fri Feb 23 2018
 *  File : spider-goods.js
 *******************************************/
const mongoose = require('mongoose')
// 表模型
const produtSchema = new mongoose.Schema({
	'productId': String,
	'salePrice': Number,
	'productName': String,
	'productImageSmall': Array,
	'productImageBig': String,
	'stock': Number,
	'sub_title': String,
	'limit_num': String,
	'productMsg': Object
})
module.exports = mongoose.model('Good', produtSchema)