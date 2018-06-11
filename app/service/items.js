'use strict';
const Base = require('./base');

class ItemsService extends Base {
  async page(pagination) {
    const { ctx } = this;
    const { limit, offset, where } = ctx.helper.page(pagination);
    const condition = {};
    where.merchantId && (condition.id = where.merchantId);
    delete where.merchantId;
    const items = await ctx.model.Items.findAll({
      limit,
      offset,
      where,
      include: [{
        model: ctx.model.Merchants,
        where: condition,
      }, ctx.model.Pictures ],
    });
    const totalCount = await ctx.model.Items.count({
      where,
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
    ctx.tran();
    data.itemTypeId = data.itemType;
    const items = await ctx.model.Items.create(data, {
      include: [ ctx.model.Pictures ],
      transaction,
    });
    await data.itemMerchants.forEach(merchant => {
      merchant.id = merchant.merchantId;
      const merchants = ctx.model.Merchants.build(merchant, { transaction });
      items.addMerchants(merchants, { transaction });
    });
    await data.itemPropertys.forEach(property => {
      const propertys = ctx.model.Propertys.build(property, { transaction });
      items.addPropertys(propertys, { transaction });
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

  async edit(param) {
    const { ctx } = this;
    const pids = [];
    const propertys = [];
    const result = await ctx.model.Items.findById(param.id, {
      include: [ ctx.model.Pictures, ctx.model.Propertys, ctx.model.Merchants ],
    });
    result.propertys.forEach(prop => {
      pids.push(prop.pid);
    });
    const parents = await ctx.model.Propertys.findAll({
      where: { id: { $in: pids } },
    });
    parents.forEach(parent => {
      parent.dataValues.subPropertys = [];
      result.propertys.forEach(prop => {
        parent.id === prop.pid && parent.dataValues.subPropertys.push(prop);
        prop.isOpen = prop.isOpen.toString();
      });
      propertys.push(parent);
    });
    result.dataValues.propertys = propertys;
    return result;
  }

  async update(data) {
    const { ctx, transaction } = this;
    ctx.tran();
    const result = await ctx.model.Items.update(data, {
      where: { id: data.id },
      transaction,
    });
    const item = await ctx.model.Items.findById(data.id);
    await item.setPictures(null, { transaction });
    await item.setMerchants(null, { transaction });
    await item.setPropertys(null, { transaction });
    await data.pictures.forEach(pic => delete pic.id);
    const pictures = await ctx.model.Pictures.bulkCreate(data.pictures, { transaction });
    await item.addPictures(pictures, { transaction });
    await data.itemMerchants.forEach(merchant => {
      merchant.id = merchant.merchantId;
      const merc = ctx.model.Merchants.build(merchant, { transaction });
      item.addMerchants(merc, { transaction });
    });
    await data.itemPropertys.forEach(property => {
      property.id = property.propertyId;
      ctx.model.Propertys.update(property, { where: { id: property.id }, transaction });
      const prop = ctx.model.Propertys.build(property, { transaction });
      item.addPropertys(prop, { transaction });
    });
    return result;
  }
}

module.exports = ItemsService;
