/******************************************
 *  Author : niuzz niuzz@hotmail.com   
 *  Created On : Tue Feb 20 2018
 *  File : helper.js
 *******************************************/
const moment = require('moment')

// 格式化时间
exports.formatTime = time => moment(time).format('YYYY-MM-DD hh:mm:ss')

// 处理成功响应
exports.success = ({ ctx, res = null, msg = '请求成功' }) => {
	ctx.body = {
		code: 1000,
		data: res,
		msg
	}
	ctx.status = 200
}