'use strict';
const Base = require('./base');

class CouponsService extends Base {
  async page() {
    const { ctx } = this;
    const { limit, offset, where } = this;
    const coupons = await ctx.model.Coupons.findAll({
      where,
      limit,
      offset,
    });
    const tottalCount = await ctx.model.Coupons.count({
      where,
    });
    return {
      coupons,
      tottalCount,
    };
  }
}

module.exports = CouponsService;
