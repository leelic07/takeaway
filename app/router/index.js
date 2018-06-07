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
  router.post('/login', controller.managers.login);
  router.post('/register', controller.managers.register);
  router.get('/logout', controller.managers.logout);

  router.post('/upload/uploadfile', upload.single('file'), controller.upload.uploadfile);
  router.post('/merchants/save', controller.merchants.save);
  router.get('/merchants/page', controller.merchants.page);
  router.get('/merchants/edit', controller.merchants.edit);
  router.post('/merchants/update', controller.merchants.update);
  router.get('/merchants/list', controller.merchants.list);
  router.get('/merchants/homePage', controller.merchants.homePage);

  router.get('/propertys/parent', controller.propertys.parent);

  router.post('/merchant_types/save', controller.merchantTypes.save);
  router.get('/merchant_types/list', controller.merchantTypes.list);

  router.get('/items/page', controller.items.page);
  router.post('/items/save', controller.items.save);

  router.get('/item_types/list', controller.itemTypes.list);
};
