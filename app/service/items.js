'use strict';
const Base = require('./base');

class ItemsService extends Base {
  async page(pagination) {
    const { ctx } = this;
    const { limit, offset, where } = ctx.helper.page(pagination);
    const condition = {};
    where.merchantId && (condition.id = where.merchantId);
    const items = await ctx.model.Items.findAll({
      limit,
      offset,
      include: [{
        model: ctx.model.Merchants,
        where: condition,
      }, ctx.model.Pictures ],
    });
    const totalCount = await ctx.model.Items.count({
      include: [{
        model: ctx.model.Merchants,
        where: condition,
      }],
    });
    return {
      items,
      totalCount,
    };
  }

  async save(data) {
    const { ctx, transaction } = this;
    data.itemTypeId = data.itemType;
    const items = await ctx.model.Items.create(data, {
      include: [ ctx.model.Pictures ],
      transaction,
    });
    await data.itemMerchants.forEach(merchant => {
      merchant.id = merchant.merchantId;
      const merchants = ctx.model.Merchants.build(merchant);
      items.setMerchants(merchants);
    });
    await data.itemPropertys.forEach(property => {
      const propertys = ctx.model.Propertys.build(property);
      items.setPropertys(propertys);
    });
    const type = await ctx.model.ItemTypes.findById(items.itemTypeId, { transaction });
    const quantity = type.quantity + 1;
    const id = type.id;
    const result = await ctx.model.ItemTypes.update({ quantity }, {
      where: { id },
      transaction,
    });
    return result;
  }
}

module.exports = ItemsService;
