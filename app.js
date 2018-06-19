'use strict';
const RegistryClient = require('./cluster/registry_client');


module.exports = app => {
  // app.registryClient = app.cluster(RegistryClient).create({});
  // app.beforeStart(async () => {
  //   await app.registryClient.ready();
  //   app.coreLogger.info('registry client is ready');

  //   // 调用 subscribe 进行订阅
  //   app.registryClient.subscribe({
  //     dataId: 'demo.DemoService',
  //   }, val => {
  //     // ...
  //     console.log(val);
  //   });

  //   // 调用 publish 发布数据
  //   app.registryClient.publish({
  //     dataId: 'demo.DemoService',
  //     publishData: 'xxx',
  //   });

  //   // 调用 getConfig 接口
  //   const res = await app.registryClient.getConfig('demo.DemoService');
    
  //   console.log('getConfig'+res);
  // });
  
  app.messenger.on('updateItemsAssociate', data => {
    const ctx = app.createAnonymousContext();
    console.log('come in worker');
    ctx.runInBackground(async () => {
      await ctx.service.items.updateItemsAssociate(data);
    });
  });
};

