'use strict';
const tran = Symbol('Context#tran');

module.exports = {
  success(data = {}, msg = '') {
    this.body = {
      code: 200,
      msg,
      data,
    };
  },
  fail(msg = '') {
    this.body = {
      code: 500,
      msg,
    };
  },
  notFind(msg) {
    this.body = {
      code: 404,
      msg,
    };
  },
  async tran() {
    if (!this[tran]) {
      this[tran] = await this.app.model.transaction();
    }
    return this[tran];
  },
  getTran() {
    return this[tran];
  },
};
