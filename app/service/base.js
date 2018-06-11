'use strict';
const Service = require('egg').Service;

class BaseService extends Service {
  get transaction() {
    // this.ctx.tran();
    return this.ctx.transaction;
  }
}

module.exports = BaseService;
