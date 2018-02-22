# nj-egg

## about
使用阿里egg框架搭建的RESTful服务端，数据库使用mongo，使用jwt完成用户识别

## 配置
```javascript
// 更改config.default.js相应mongo配置
config.mongoose = {
    url: 'mongodb://127.0.0.1:27017/nj_shopping',
    options: {
      useMongoClient: true,
      autoReconnect: true,
      reconnectTries: Number.MAX_VALUE,
      bufferMaxEntries: 0,
    },
  }

// JSON WEB TOKEN设置, 替代cookie，session方式，更适合分布式和移动端开发
// config.default.js

config.jwt = {
    secret: 'NJason39A', // 替换个人私钥
    enable: true, 
    match: '/jwt', // optional
	}

// router.js
// 此时访问all接口需要request header 带token
// 具体格式如下, 其中Bearer后面是login返回给客户端的token
// Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjVhOGQ4MzM0MDFjZjE1NjJjN2RhNzM4YyJ9LCJleHAiOjE1MTk4NjczNTYsImlhdCI6MTUxOTI2MjU1Nn0.mCKLjMZIhYglMYve75lLUSIcONxbTE_Dq4KP1E95vwU
router.post('/api/user/all', app.jwt, controller.user.all)


// 统一响应格式
// /extend/helper.js, 名字和位置与egg保持一致，详见egg扩展
// 处理成功响应
exports.success = ({ ctx, res = null, msg = '请求成功' }) => {
	ctx.body = {
		code: 1000,
		data: res,
		msg
	}
	ctx.status = 200
}
// 使用
// controller/user.js
async login() {
		const { ctx, service } = this
		ctx.validate(this.UserLoginRule, ctx.request.body)
		const res = await service.user.login(ctx.request.body)
		ctx.helper.success({ctx, res})
	}


// 统一异常捕获
// middleware/error_handler.js
module.exports = (option, app) => {
	return async function (ctx, next) {
		try {
			await next()
		} catch (err) {
			// 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
			app.emit('error', err, this)
			const status = err.status || 500
			// 生产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
			const error = status === 500 && app.config.env === 'prod' ?
				'Internal Server Error' :
				err.message
			// 从 error 对象上读出各个属性，设置到响应中
			ctx.body = {
				code: 100,
				error: error
			}
			if (status === 422) {
				ctx.body.detail = err.errors
			}
			ctx.status = 200
		}
	}
// 使用
// config.default.js
config.middleware = ['errorHandler'];

```

## QuickStart

<!-- add docs here for user -->

see [egg docs][egg] for more detail.

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### Deploy

```bash
$ npm start
$ npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.


[egg]: https://eggjs.org