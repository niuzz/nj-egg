'use strict';

const Controller = require('egg').Controller;

// const createRule = {
//   name: { type: 'string', required: true },
// };

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'hi, egg';
  }
}

module.exports = HomeController;
