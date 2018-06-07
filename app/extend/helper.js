'use strict';
const md5 = require('md5');

module.exports = {
  md5(param) {
    return md5(param);
  },
  page(pagination) {
    const page = parseInt(pagination.page) || 1;
    const limit = parseInt(pagination.rows) || 10;
    const offset = (page - 1) * limit;
    const where = {};
    delete pagination.page;
    delete pagination.rows;
    Object.keys(pagination).forEach(key => {
      if (pagination[key]) {
        if (parseInt(pagination[key])) {
          where[key] = pagination[key];
        } else where[key] = { $like: `%${pagination[key]}%` };
      }
    });
    return {
      limit,
      offset,
      where,
    };
  },
};
