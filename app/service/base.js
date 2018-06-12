'use strict';
const Service = require('egg').Service;

class BaseService extends Service {
  get transaction() {
    return this.ctx.transaction;
  }
}

module.exports = BaseService;
