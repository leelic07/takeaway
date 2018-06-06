'use strict';
const Service = require('egg').Service;

class MerchantsService extends Service {
  get transaction() {
    return this.ctx.getTran();
  }
  async save(merchant) {
    const { ctx } = this;
    const pictures = [];
    const managerInfo = {
      name: merchant.accountName,
      passwordHash: ctx.helper.md5(merchant.accountPassword),
    };
    merchant.pictures.forEach(url => {
      pictures.push({ url });
    });
    const result = await ctx.model.Merchants.create(Object.assign(merchant, {
      manager: managerInfo,
      pictures,
    }), {
      include: [ ctx.model.Managers, ctx.model.Pictures ],
    });
    return result;
  }

  async page(pagination) {
    const { ctx } = this;
    const page = parseInt(pagination.page) || 1;
    const rows = parseInt(pagination.rows) || 10;
    const skip = (page - 1) * rows;
    const condition = {};
    pagination.name && (condition.name = pagination.name);
    const merchants = await ctx.model.Merchants.findAll({
      where: condition,
      offset: skip,
      limit: rows,
      include: [ ctx.model.Pictures, ctx.model.Managers, ctx.model.MerchantTypes ],
    });
    const totalCount = await ctx.model.Merchants.count({ where: condition });
    return {
      merchants,
      totalCount,
    };
  }

  async edit(id) {
    const { ctx } = this;
    const merchant = await ctx.model.Merchants.findOne({
      where: { id },
      include: [ ctx.model.Pictures, ctx.model.Managers, ctx.model.MerchantTypes ],
    });
    return merchant;
  }

  async update(merchant) {
    const { ctx, transaction } = this;
    const id = merchant.id;
    const pictures = [];
    merchant.pictures.forEach(picture => {
      if (picture.url) pictures.push({ url: picture.url });
      else pictures.push({ url: picture });
    });
    const pictureArray = await ctx.model.Pictures.bulkCreate(pictures, transaction);
    const result = await ctx.model.Merchants.update(merchant, {
      where: { id },
      transaction,
    });
    if (result) {
      const merchants = await ctx.model.Merchants.findById(id);
      merchants.setPictures(pictureArray, { transaction });
      return result;
    } return '';
  }
}

module.exports = MerchantsService;
