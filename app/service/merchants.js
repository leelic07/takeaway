'use strict';
const Service = require('egg').Service;

class MerchantsService extends Service {
  async save(merchant) {
    const { ctx } = this;
    merchant.accountPassword = ctx.helper.md5(merchant.accountPassword);
    const result = await ctx.model.Merchants.create(Object.assign(merchant, {
      managers: {
        name: merchant.accountName,
        passwordHash: merchant.accountPassword,
      },
      pictures: merchant.pictures,
    }), {
      include: [{
        model: ctx.model.Managers,
        as: 'managers',
      }, {
        model: ctx.model.Pictures,
        as: 'pictures',
      }],
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
      include: [ ctx.model.Pictures, ctx.model.Managers ],
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
      include: [ ctx.model.Pictures, ctx.model.Managers ],
    });
    return merchant;
  }

  async update(merchant) {
    const { ctx } = this;
    const id = merchant.id;
    // delete merchant.id;
    const result = await ctx.model.Merchants.update(merchant, {
      where: { id },
      include: [ ctx.model.Pictures, ctx.model.Managers ],
    });
    return result;
  }
}

module.exports = MerchantsService;
