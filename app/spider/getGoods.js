/** ****************************************
 *  Author : niuzz niuzz@hotmail.com
 *  Created On : Fri Feb 23 2018
 *  File : spider.js
 *******************************************/
'use strict';
// 爬取锤子商品
const eventproxy = require('eventproxy');

const request = require('superagent');
const superagent = require('superagent-charset')(request);
const mongoose = require('mongoose');
const Good = require('../model/spider-goods');

mongoose.connect('mongodb://127.0.0.1:27017/nj_shopping', { useMongoClient: true });
const ep = new eventproxy();
const baseUrl = 'https://www.smartisan.com';

// 抓取锤子商品
function getGoods() {
  console.log('-----------------------');
  console.log('开始抓取……');
  console.log('-----------------------');
  return new Promise(resolve => {
    const requestUrlLength = 5;
    const requestUrl = []; // 请求的url
    for (let i = 1; i < requestUrlLength; i++) {
      requestUrl.push(`${baseUrl}/product/spus?page_size=20&category_id=62&page=${i}&sort=sort`);
    }

    ep.after('grabUrl', requestUrl.length, data => { // data是所有数据
      const productUrl = [];
      data.forEach(item => {
        const item1 = JSON.parse(item);
        const { list } = item1.data;
        list.forEach(list1 => { // 每一项
          productUrl.push(`${baseUrl}/product/skus/${list1.sku_info[0].sku_id}?with_spu_sku=true&with_stock=true`);
        });
      });
      ep.after('productData', productUrl.length, data => {
        data = data.map(item => {
          const item1 = JSON.parse(item); // 商品信息
          const { id, price, shop_info } = item1.data;
          const pro = {
            productId: id,
            salePrice: price,
            productName: shop_info.title,
            sub_title: shop_info.sub_title, // 描述
            limit_num: shop_info.limit_num, // 限购
            productImageSmall: shop_info.ali_images, // 小图
            productImageBig: shop_info.ali_image, // 主题
            productMsg: shop_info.tpl_content.base.images.ali,
            stock: 10,
          };
          return pro;
        });
        Good.insertMany(data, () => {
          resolve();
        });
      });
      // 根据url去请求
      productUrl.forEach(url => {
        superagent.get(url).end((err2, res2) => {
          ep.emit('productData', res2.text); // 每次请求的数据 获取id
        });
      });
    });

    requestUrl.forEach(item => {
      superagent.get(item).end((err1, res1) => {
        ep.emit('grabUrl', res1.text); // 每次请求的数据 获取id
      });
    });
  });


}
module.exports = getGoods
;
