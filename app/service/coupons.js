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
    data.merchants.forEach(merchant => { merchant.id = merchant.merchantId; });
    await ctx.tran();
    const coupon = await ctx.model.Coupons.create(data, { transaction });
    const merchants = await ctx.model.Merchants.bulkCreate(data.merchants, {
      transaction,
      updateOnDuplicate: [ 'id' ],
    });
    coupon.addMerchants(merchants, { transaction });
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

  async update(data) {
    const { ctx, transaction } = this;
    data.merchants.forEach(merchant => { merchant.id = merchant.merchantId; });
    await ctx.tran();
    const result = await ctx.model.Coupons.update(data, {
      transaction,
      where: { id: data.id },
    });
    const merchants = await ctx.model.Merchants.bulkCreate(data.merchants, {
      transaction,
      updateOnDuplicate: [ 'id' ],
    });
    const coupon = await ctx.model.Coupons.findById(data.id);
    await coupon.setMerchants(merchants, { transaction });
    return result;
  }
}

module.exports = CouponsService;
