'use strict';

module.exports = (options, app) => {
  return async (ctx, next) => {
    const result = await next();
    // ctx.rotateCsrfSecret();
    result ? ctx.body = {
      code: 200,
      data: result,
      msg: '成功',
    } : ctx.body = {
      code: 500,
      msg: '失败',
    };
  };
};
