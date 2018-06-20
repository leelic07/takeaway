'use strict';
// const RegistryClient = require('./cluster/registry_client');

module.exports = agent => {
  // // 对 RegistryClient 进行封装和实例化
  // agent.registryClient = agent.cluster(RegistryClient)
  //   // create 方法的参数就是 RegistryClient 构造函数的参数
  //   .create({});

  // agent.beforeStart(async () => {
  //   await agent.registryClient.ready();
  //   agent.coreLogger.info('registry client is ready');
  // });
  agent.beforeStart(async () => {
    agent.messenger.on('updateItemsAssociate', data => {
      agent.messenger.sendRandom('updateItemsAssociate', data);
    });
  });
};
