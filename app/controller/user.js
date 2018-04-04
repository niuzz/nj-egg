/** ****************************************
 *  Author : niuzz niuzz@hotmail.com
 *  Created On : Mon Feb 19 2018
 *  File : login.js
 *******************************************/
'use strict';

const Controller = require('egg').Controller;

class LoginController extends Controller {

  constructor(ctx) {
    super(ctx);
    this.UserCreateRule = {
      mobile: { type: 'string', required: true, allowEmpty: false, format: /^[0-9]{11}$/ },
      password: { type: 'password', required: true, allowEmpty: false, min: 6 },
      // realName: { type: 'string', required: true, allowEmpty: false, format: /^[\u2E80-\u9FFF]{2,6}$/ }
    };
    this.UserLoginRule = {
      mobile: { type: 'string', required: true, allowEmpty: false, format: /^[0-9]{11}$/ },
      password: { type: 'string', required: true, allowEmpty: false, min: 6 },
    };
  }

  async create() {
    const { ctx, service } = this;
    ctx.validate(this.UserCreateRule, ctx.request.body);
    const res = await service.user.create(ctx.request.body);
    ctx.helper.success({ ctx, res });
  }

  async login() {
    const { ctx, service } = this;
    ctx.validate(this.UserLoginRule, ctx.request.body);
    const res = await service.user.login(ctx.request.body);
    ctx.helper.success({ ctx, res });
  }

  async destory() {
    const { ctx, service } = this;
    const res = await service.user.destory(ctx.request.body);
    ctx.helper.success({ ctx, res });
  }

  async all() {
    const { ctx, service } = this;
    const res = await service.user.all();
    ctx.helper.success({ ctx, res });
  }
}

module.exports = LoginController;
