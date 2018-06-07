'use strict';
const Service = require('egg').Service;

class ItemsService extends Service {
  get transaction() {
    return this.ctx.getTran();
  }

  async page(pagination) {
    const { ctx, transaction } = this;
    const { limit, offset, where } = ctx.helper.page(pagination);
    const items = await ctx.model.Items.findAll({
      limit,
      offset,
      transaction,
      include: [{
        model: ctx.model.Merchants,
        as: 'merchants',
        where: { id: where.merchantId },
      }],
    });
    const totalCount = await ctx.model.Items.count({
      transaction,
      include: [{
        model: ctx.model.Merchants,
        as: 'merchants',
        where: { id: where.merchantId },
      }],
    });
    return {
      items,
      totalCount,
    };
  }
}

module.exports = ItemsService;
