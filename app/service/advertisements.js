'use strict';
const Base = require('./base');

class AdvertisementService extends Base {
  async page(pagination) {
    const { ctx } = this;
    const { limit, offset, where } = ctx.helper.page(pagination);
    const advertisements = await ctx.model.Advertisements.findAll({
      where,
      offset,
      limit,
    });
    const totalCount = await ctx.model.Advertisements.count({
      where,
    });
    return {
      advertisements,
      totalCount,
    };
  }

  async save(data) {
    const { ctx } = this;
    const pictures = [];
    data.pictures.forEach(picture => pictures.push({ url: picture }));
    const advertisement = await ctx.model.Advertisements.create(data);
    return advertisement;
  }

  async edit(param) {
    const { ctx } = this;
    const result = await ctx.model.Advertisements.findById(param.id);
    return result;
  }

  async update(data) {
    const { ctx, transaction } = this;
    await ctx.tran();
    const result = await ctx.model.Advertisements.update(data, {
      transaction,
      where: { id: data.id },
    });
    return result;
  }

  async updateIsPuton(data) {
    const { ctx } = this;
    const result = await ctx.model.Advertisements.update(data, {
      where: { id: data.id },
    });
    return result;
  }
}

module.exports = AdvertisementService;
