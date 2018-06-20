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
      }, ctx.model.Pictures, ctx.model.ItemTypes ],
    });
    const totalCount = await ctx.model.Items.count({
      where,
    });
    return {
      items,
      totalCount,
    };
  }

  async save(data) {
    const { ctx, transaction } = this;
    data.itemTypeId = data.itemType;
    data.itemMerchants.forEach(merchant => { merchant.id = merchant.merchantId; });
    data.itemPropertys.forEach(property => { property.id = property.propertyId; });
    await ctx.tran();
    const items = await ctx.model.Items.create(data, { transaction });
    const pictures = await ctx.model.Pictures.bulkCreate(data.pictures, { transaction, updateOnDuplicate: [ 'url' ] });
    const merchants = await ctx.model.Merchants.bulkCreate(data.itemMerchants, { transaction, updateOnDuplicate: [ 'id' ] });
    const propertys = await ctx.model.Propertys.bulkCreate(data.itemPropertys, { transaction, updateOnDuplicate: [ 'price', 'isOpen' ] });
    await items.addPictures(pictures, { transaction });
    await items.addMerchants(merchants, { transaction });
    await items.addPropertys(propertys, { transaction });
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
    const { ctx, app } = this;
    // await ctx.tran();
    data.itemMerchants.forEach(merchant => { merchant.id = merchant.merchantId; });
    data.itemPropertys.forEach(property => { property.id = property.propertyId; });
    const result = await ctx.model.Items.update(data, { where: { id: data.id } });
    app.messenger.sendToApp('updateItemsAssociate', data);
    return result;
  }

  async updateItemsAssociate(data) {
    const { ctx, transaction } = this;
    // ctx.tran();
    const item = await ctx.model.Items.build(data);
    const pictures = await ctx.model.Pictures.bulkCreate(data.pictures, { transaction, updateOnDuplicate: [ 'url' ] });
    const merchants = await ctx.model.Merchants.bulkCreate(data.itemMerchants, { transaction, updateOnDuplicate: [ 'id' ] });
    const propertys = await ctx.model.Propertys.bulkCreate(data.itemPropertys, { transaction, updateOnDuplicate: [ 'price', 'isOpen' ] });
    await item.setPictures(pictures, { transaction });
    await item.setMerchants(merchants, { transaction });
    const result = await item.setPropertys(propertys, { transaction });
    return result;
    // ctx.transaction.commit();
  }

  async superUpdate(data) {
    const { ctx, transaction } = this;
    await ctx.tran();
    data.id = data.itemId;
    const result = await ctx.model.Items.update({ isPuton: data.isPuton }, {
      where: { id: data.id },
      transaction,
    });
    const item = await ctx.model.Items.build(data);
    const merchants = await ctx.model.Merchants.findAll({
      where: { id: { $in: data.merchantId.split(',') } },
    });
    item.setMerchants(merchants, { transaction });
    return result;
  }

  async updateIsPuton(data) {
    const { ctx, transaction } = this;
    await ctx.tran();
    const result = await ctx.model.Items.update({ isPuton: data.isPuton }, {
      where: { id: data.itemId },
      transaction,
    });
    const item = await ctx.model.Items.findById(data.itemId);
    const merchant = await ctx.model.Merchants.findById(data.merchantId);
    await item.setMerchants(merchant, { transaction });
    return result;
  }
}

module.exports = ItemsService;
