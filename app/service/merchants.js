'use strict';
const Base = require('./base');

class MerchantsService extends Base {
  async save(merchant) {
    const { ctx } = this;
    const pictures = [];
    merchant.accountPassword = ctx.helper.md5(merchant.passwordHash);
    const managerInfo = {
      name: merchant.accountName,
      passwordHash: merchant.passwordHash,
    };
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
    const { limit, offset, where } = ctx.helper.page(pagination);
    const merchants = await this.ctx.model.Merchants.findAll({
      where,
      offset,
      limit,
      include: [ ctx.model.Pictures, ctx.model.Managers, ctx.model.MerchantTypes ],
    });
    const totalCount = await ctx.model.Merchants.count({
      where,
    });
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
    const pictureArray = await ctx.model.Pictures.bulkCreate(pictures, { transaction });
    const result = await ctx.model.Merchants.update(merchant, {
      where: { id },
      transaction,
    });
    const merchants = await ctx.model.Merchants.findById(id);
    await merchants.setPictures(pictureArray, { transaction });
    return result;
  }

  async list() {
    const { ctx } = this;
    const merchants = await ctx.model.Merchants.findAll();
    return merchants;
  }

  async homePage(param) {
    const { ctx } = this;
    const merchants = await ctx.model.Merchants.findById(param.merchantId);
    return merchants;
  }
}

module.exports = MerchantsService;
