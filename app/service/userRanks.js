'use strict';
const Base = require('./base');

class UserRanksService extends Base {
  async list() {
    const { ctx } = this;
    const result = await ctx.model.UserRanks.findAll();
    return result;
  }

  async batchSave(data) {
    const { ctx } = this;
    const result = await ctx.model.UserRanks.bulkCreate(data.userRanks);
    return result;
  }

  async batchUpdate(data) {
    const { ctx } = this;
    const result = await ctx.model.UserRanks.bulkCreate(data, { updateOnDuplicate: [] });
    return result;
  }
}

module.exports = UserRanksService;
