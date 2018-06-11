'use strict';
const Base = require('./base');

class MerchantsService extends Base {
  async save(merchant) {
    const { ctx } = this;
    merchant.accountPassword = ctx.helper.md5(merchant.accountPassword);
    const managerInfo = {
      name: merchant.accountName,
      passwordHash: merchant.accountPasswordHash,
    };
    const result = await ctx.model.Merchants.create(Object.assign(merchant, {
      manager: managerInfo,
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
      include: [{
        model: ctx.model.Pictures,
        as: 'pictures',
      }, ctx.model.Managers, ctx.model.MerchantTypes ],
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
      include: [{
        model: ctx.model.Pictures,
        as: 'pictures',
      }, ctx.model.Managers, ctx.model.MerchantTypes ],
    });
    return merchant;
  }

  async update(data) {
    const { ctx, transaction } = this;
    ctx.tran();
    const id = data.id;
    const result = await ctx.model.Merchants.update(data, {
      where: { id },
      transaction,
    });
    const merchant = await ctx.model.Merchants.findById(id);
    await merchant.setPictures(null);
    await data.pictures.forEach(picture => {
      delete picture.id;
      const pic = ctx.model.Pictures.create(picture);
      merchant.addPictures(pic, { transaction });
    });
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
