'use strict';
// const APIClient = require('../cluster/api-client');
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
  // const config = app.config.client;
  // app.client = new APIClient(Object.assign({}, config, { cluster: app.cluster.bind(this) }));
  // app.beforeStart(async () => {
  //   await app.client.ready();
  // });

  router.get('/', controller.home.index);
  router.post('/login', controller.managers.login);
  router.post('/register', controller.managers.register);
  router.get('/logout', controller.managers.logout);
  router.get('/managers/edit', controller.managers.edit);
  router.post('/resetPwd', controller.managers.resetPwd);

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
  router.post('/activitys/save', controller.activitys.save);
  router.get('/activitys/edit', controller.activitys.edit);
  router.post('/activitys/update', controller.activitys.update);
  router.get('/coupons/page', controller.coupons.page);
  router.post('/coupons/save', controller.coupons.save);
  router.get('/coupons/edit', controller.coupons.edit);
  router.post('/coupons/update', controller.coupons.update);

  router.get('/coupon_send_types/list', controller.couponTypes.list);
  router.post('/coupon_send_types/save', controller.couponTypes.bulkSave);

  router.get('/advertisements/page', controller.advertisements.page);
  router.post('/advertisements/save', controller.advertisements.save);
  router.get('/advertisements/edit', controller.advertisements.edit);
  router.post('/advertisements/update', controller.advertisements.update);
  router.post('/advertisements/updateIsPuton', controller.advertisements.updateIsPuton);

  router.get('/user_ranks/list', controller.userRanks.list);
  router.post('/user_ranks/batchSave', controller.userRanks.batchSave);
  router.post('/user_ranks/batchUpdate', controller.userRanks.batchUpdate);
};
