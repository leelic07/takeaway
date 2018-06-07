'use strict';
const tran = Symbol('Service#tran');

module.exports = {
  async tran() {
    if (!this[tran]) {
      this[tran] = await this.ctx.model.transaction();
    }
    return this[tran];
  },
  get transaction() {
    return this[tran];
  },
};
