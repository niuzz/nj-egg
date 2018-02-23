/******************************************
 *  Author : niuzz niuzz@hotmail.com   
 *  Created On : Mon Feb 19 2018
 *  File : home.js
 *******************************************/
'use strict';

const Service = require('egg').Service;

const PAGE_SIZE = 20;

class UserService extends Service {
	constructor(ctx) {
		super(ctx);
		this.root = 'http://localhost:7001/';
	}

	async login(payload) {
		const { ctx, service } = this
		const user = await service.user.findByMobile(payload.mobile)
		if (!user) {
			ctx.throw(404, 'user not found')
		}
		let verifyPsw = await ctx.compare(payload.password, user.password)
		if (!verifyPsw) {
			ctx.throw(404, 'user password is error')
		}
		// 生成Token令牌
		return { token: await service.actionToken.apply(user._id) }
	}

	async create(payload) {
		const { ctx, service } = this
		const mobile = payload.mobile
		let user = await this.findByMobile(mobile)
		if(user) {
			ctx.throw(404, 'user is already existed')
		} else {
			user = payload
		}
		user.avatar = 'https://avatars0.githubusercontent.com/u/10822458?s=96&v=4'
		user.password = await ctx.genHash(payload.password)
		return ctx.model.User.create(user)
	}

	async destory(params) {
		const { ctx, service } = this
		const _id = params.uid
		const user = await this.findById(_id)
		if (!user) {
			ctx.throw(404, 'user not found')
		}
		return ctx.model.User.findByIdAndRemove(_id)
	}

	async all() {
		return this.ctx.model.User.find()
	}

/**
 * common fun
 * 
 */
	async findByMobile(mobile) {
		return this.ctx.model.User.findOne({mobile})
	}

	async findById(_id) {
		return this.ctx.model.User.findOne({_id: _id})
	}
}

module.exports = UserService;
