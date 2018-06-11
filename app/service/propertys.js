'use strict';
const Base = require('./base');

class PropertysService extends Base {
  async parent() {
    const { ctx, transaction } = this;
    const propertys = await ctx.model.Propertys.findAll({
      where: { pid: null },
      transaction,
    });
    return propertys;
  }

  async bathcSave(data) {
    const { ctx, transaction } = this;
    ctx.tran();
    const subPropertys = [];
    const parent = await ctx.model.Propertys.bulkCreate(data, { transaction });
    data.forEach((prop, index) => {
      prop.subPropertys.forEach(sub => {
        sub.pid = parent[index].id;
        subPropertys.push(sub);
      });
    });
    const result = await ctx.model.Propertys.bulkCreate(subPropertys, { transaction });
    return result;
  }

  async page(pagination) {
    const { ctx } = this;
    const pids = [];
    const { limit, offset, where } = ctx.helper.page(pagination);
    Object.assign(where, { pid: null });
    const propertys = await ctx.model.Propertys.findAll({
      limit,
      offset,
      where,
    });
    const totalCount = await ctx.model.Propertys.count({
      where,
    });
    propertys.forEach(prop => pids.push(prop.id));
    const subPropertys = await ctx.model.Propertys.findAll({
      where: { pid: { $in: pids } },
    });
    propertys.forEach(prop => {
      prop.dataValues.subPropertys = [];
      subPropertys.forEach(sub => {
        if (sub.dataValues.pid === prop.dataValues.id) {
          prop.dataValues.subPropertys.push(sub);
        }
      });
    });
    return {
      propertys,
      totalCount,
    };
  }

  async edit(param) {
    const { ctx } = this;
    const propertys = await ctx.model.Propertys.findById(param.id);
    const subPropertys = await ctx.model.Propertys.findAll({
      where: { pid: propertys.id },
    });
    propertys.dataValues.subPropertys = subPropertys;
    return propertys;
  }

  async bathcUpdate(data) {
    const { ctx, transaction } = this;
    ctx.tran();
    let index = '';
    await ctx.model.Propertys.update(data, {
      where: { id: data.id },
      transaction,
    });
    await ctx.model.Propertys.update({ pid: 0 }, {
      where: { pid: data.id },
      transaction,
    });
    await data.subPropertys.forEach((sub, i) => {
      sub.pid = data.id;
      ctx.model.Propertys.upsert(sub, {
        where: { id: sub.id },
        transaction,
      });
      index = i;
    });
    if (index === data.subPropertys.length - 1) return index + 1;
    return '';
  }

  async delete(data) {
    const { ctx, transaction } = this;
    await ctx.model.Propertys.destroy({
      where: { id: data.id },
      transaction,
    });
    const result = await ctx.model.Propertys.destroy({
      where: { pid: data.id },
      transaction,
    });
    return result;
  }

  async children(param) {
    const { ctx } = this;
    const result = await ctx.model.Propertys.findAll({
      where: { pid: param.pid },
    });
    return result;
  }
}

module.exports = PropertysService;
