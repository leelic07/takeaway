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
    const totalCount = await ctx.model.Activitys.count({
      where,
    });
    return {
      activitys,
      totalCount,
    };
  }
}

module.exports = ActivitysService;
