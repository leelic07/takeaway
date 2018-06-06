'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const upload = app.middleware.multer();
  // if (app.config.env === 'local') {
  //   app.beforeStart(async () => {
  //     await app.model.sync();
  //   });
  // }
  router.get('/', controller.home.index);
  router.post('/upload/uploadfile', upload.single('file'), controller.upload.uploadfile);
  router.post('/merchants/save', controller.merchants.save);
  router.get('/merchants/page', controller.merchants.page);
  router.get('/merchants/edit', controller.merchants.edit);
  router.post('/merchants/update', controller.merchants.update);

  router.post('/merchant_types/save', controller.merchantTypes.save);
  router.get('/merchant_types/list', controller.merchantTypes.list);

  router.post('/login', controller.managers.login);
  router.post('/register', controller.managers.register);
  router.get('/logout', controller.managers.logout);
};
