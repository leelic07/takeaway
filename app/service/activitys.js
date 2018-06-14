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
    const totalCount = await ctx.model.Activitys.count({ where });
    return {
      activitys,
      totalCount,
    };
  }

  async save(data) {
    const { ctx, transaction } = this;
    data.merchants.forEach(merchant => { merchant.id = merchant.merchantId; });
    await ctx.tran();
    const activity = await ctx.model.Activitys.create(data, { transaction });
    const merchants = await ctx.model.Merchants.bulkCreate(data.merchants, {
      transaction,
      updateOnDuplicate: [ 'id' ],
    });
    activity.setMerchants(merchants, { transaction });
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
    data.merchants.forEach(merchant => { merchant.id = merchant.merchantId; });
    await ctx.tran();
    await ctx.model.Activitys.update(data, {
      where: { id: data.id },
      transaction,
    });
    const activity = await ctx.model.Activitys.findById(data.id);
    const merchants = await ctx.model.Merchants.bulkCreate(data.merchants, {
      updateOnDuplicate: [ 'id' ],
      transaction,
    });
    const result = await activity.setMerchants(merchants, { transaction });
    return result;
  }
}

module.exports = ActivitysService;
