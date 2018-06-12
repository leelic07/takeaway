'use strict';
const Service = require('egg').Service;

class BaseService extends Service {
  get transaction() {
    const transaction = this.ctx.transaction();
    return transaction;
  }
}

module.exports = BaseService;
