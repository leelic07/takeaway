'use strict';

module.exports = () => {
  return async (ctx, next) => {
    const managerId = ctx.session.managerId;
    const path = ctx.path;
    const publicPath = new RegExp('^/public');
    if (path === '/login' || '/register' || '/logout' || publicPath.test(path)) {
      await next();
    } else {
      if (managerId) {
        const result = await ctx.model.Managers.findById(managerId);
        if (result) {
          await next();
        } else {
          ctx.body = {
            code: 999,
            msg: '用户未登录',
          };
        }
      } else {
        ctx.body = {
          code: 999,
          msg: '用户未登录',
        };
      }
    }
  };
};
