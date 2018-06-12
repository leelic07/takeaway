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
  router.get('/merchants/bindItemlist', controller.merchants.bindItemlist);

  router.get('/propertys/parent', controller.propertys.parent);
  router.post('/propertys/bathcSave', controller.propertys.bathcSave);
  router.get('/propertys/page', controller.propertys.page);
  router.get('/propertys/edit', controller.propertys.edit);
  router.post('/propertys/bathcUpdate', controller.propertys.bathcUpdate);
  router.post('/propertys/delete', controller.propertys.delete);
  router.get('/propertys/children', controller.propertys.children);

  router.post('/merchant_types/save', controller.merchantTypes.save);
  router.get('/merchant_types/list', controller.merchantTypes.list);
  router.get('/merchant_types/page', controller.merchantTypes.page);
  router.post('/merchant_types/update', controller.merchantTypes.update);
  router.get('/merchant_types/edit', controller.merchantTypes.edit);

  router.get('/items/page', controller.items.page);
  router.post('/items/save', controller.items.save);
  router.get('/items/edit', controller.items.edit);
  router.post('/items/update', controller.items.update);
  router.post('/items/superUpdate', controller.items.superUpdate);
  router.post('/items/updateIsPuton', controller.items.updateIsPuton);

  router.get('/item_types/list', controller.itemTypes.list);
  router.post('/item_types/save', controller.itemTypes.save);
  router.get('/item_types/page', controller.itemTypes.page);
  router.get('/item_types/edit', controller.itemTypes.edit);
  router.post('/item_types/update', controller.itemTypes.update);

  router.get('/activitys/page', controller.activitys.page);
  router.get('/coupons/page', controller.coupons.page);
};
