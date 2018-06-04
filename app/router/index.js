'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  if (app.config.env === 'local') {
    app.beforeStart(async () => {
      await app.model.sync();
    });
  }
  router.get('/', controller.home.index);
  router.get('/login', controller.merchants.login);
};
