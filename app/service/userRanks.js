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
    // data.userRanks = [{
    //   name: '普通',
    //   startScore: 0,
    //   endScore: 0,
    // }, {
    //   name: '银牌',
    //   startScore: 0,
    //   endScore: 0,
    // }, {
    //   name: '金牌',
    //   startScore: 0,
    //   endScore: 0,
    // }, {
    //   name: '钻石',
    //   startScore: 0,
    //   endScore: 0,
    // }];
    const result = await ctx.model.UserRanks.bulkCreate(data);
    return result;
  }

  async batchUpdate(data) {
    const { ctx } = this;
    const result = await ctx.model.UserRanks.bulkCreate(data, { updateOnDuplicate: [] });
    return result;
  }
}

module.exports = UserRanksService;
