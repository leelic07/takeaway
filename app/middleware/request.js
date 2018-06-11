'use strict';

module.exports = app => {
  return async (ctx, next) => {
    try {
      const result = await next();
      // ctx.rotateCsrfSecret();
      if (!ctx.body) {
        result ? ctx.body = {
          code: 200,
          data: result,
          msg: '成功',
        } : ctx.body = {
          code: 500,
          msg: '失败',
        };
      }
    } catch (e) {
      ctx.body = {
        success: false,
        stack: app.config.env === 'local' ? e.stack : undefined,
        message: e.message,
      };
    }
  };
};