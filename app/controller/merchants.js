'use strict';
const Controller = require('egg').Controller;

class MerchantsController extends Controller {
  async login() {
    this.ctx.body = 'login';
  }
}

module.exports = MerchantsController;
