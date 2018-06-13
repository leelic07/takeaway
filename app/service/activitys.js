'use strict';
const Base = require('./base');

class ActivitysService extends Base {
  async page(pagination) {
    const { ctx } = this;
    const { limit, offset, where } = ctx.helper.page(pagination);
    const activitys = await ctx.model.Activitys.findAll({
      where,
      limit,
      offset,
    });
    const totalCount = await ctx.model.Activitys.count({
      where,
    });
    return {
      activitys,
      totalCount,
    };
  }

  async save(data) {
    const { ctx, transaction } = this;
    await ctx.tran();
    const activity = await ctx.model.Activitys.create(data, { transaction });
    await data.merchants.forEach(merchant => {
      merchant.id = merchant.merchantId;
      const mer = ctx.model.Merchants.build(merchant, { transaction });
      mer.addActivitys(activity, { transaction });
    });
    return activity;
  }

  async edit(param) {
    const { ctx } = this;
    const result = await ctx.model.Activitys.findOne({
      where: { id: param.id },
      include: [ ctx.model.Merchants ],
    });
    result.merchants.forEach(merchant => {
      merchant.dataValues.merchantId = merchant.id;
    });
    return result;
  }

  async update(data) {
    const { ctx, transaction } = this;
    await ctx.tran();
    const result = await ctx.model.Activitys.update(data, {
      where: { id: data.id },
      transaction,
    });
    const activity = await ctx.model.Activitys.findById(data.id);
    await activity.setMerchants(null, { transaction });
    await data.merchants.forEach(merchant => {
      merchant.id = merchant.merchantId;
      const mer = ctx.model.Merchants.build(merchant);
      activity.addMerchants(mer, { transaction });
    });
    return result;
  }
}

module.exports = ActivitysService;
