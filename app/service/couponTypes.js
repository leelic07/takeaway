'use strict';
const Base = require('./base');

class CouponTypesService extends Base {
  async bulkSave(data) {
    const { ctx } = this;
    const types = [];
    const couponTypes = data.types.split(',');
    couponTypes.forEach(type => {
      types.push({ name: type });
    });
    const result = await ctx.model.CouponTypes.bulkCreate(types);
    return result;
  }

  async list() {
    const { ctx } = this;
    const result = await ctx.model.CouponTypes.findAll();
    return result;
  }
}

module.exports = CouponTypesService;
