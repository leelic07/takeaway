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

  async save(data) {
    const { ctx, transaction } = this;
    await ctx.tran();
    const coupon = await ctx.model.Coupons.create(data, { transaction });
    await data.merchants.forEach(merchant => {
      merchant.id = merchant.merchantId;
      const mer = ctx.model.Merchants.build(merchant, { transaction });
      coupon.addMerchants(mer, { transaction });
    });
    const couponType = await ctx.model.CouponTypes.build({ id: data.couponSendType });
    await couponType.addCoupons(coupon, { transaction });
    return coupon;
  }

  async edit(param) {
    const { ctx } = this;
    const result = await ctx.model.Coupons.findById(param.id, {
      where: { id: param.id },
      include: [ ctx.model.CouponTypes, ctx.model.Merchants ],
    });
    result.merchants.forEach(merchant => {
      merchant.dataValues.merchantId = merchant.id;
    });
    return result;
  }
}

module.exports = CouponsService;
