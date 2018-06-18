'use strict';
const DataClient = require('./data-client');
const { APIClientBase } = require('cluster-client');
// const cluster = require('cluster-client');
// const client_1 = cluster(DataClient).delegate('updateItems').create({});
// const client_2 = cluster(DataClient).delegate('updateItemsAssociate').create({});
// const client_3 = cluster(DataClient).delegate('buildAssociate').create({});

class APIClient extends APIClientBase {
  constructor(options) {
    super(options);
    this._cache = new Map();
  }
  get DataClient() {
    return DataClient;
  }
  get delegates() {
    return {
      getData: 'invoke',
      getItems: 'invoke',
      updateItems: 'invoke',
      updateItemsAssociate: 'invoke',
      buildAssociate: 'invoke',
    };
  }
  get clusterOptions() {
    return {
      name: 'MyClient',
    };
  }
  subscribe(...args) {
    return this._client.subscribe(...args);
  }
  publish(...args) {
    return this._client.publish(...args);
  }
  async getData(id) {
    // write your business logic & use data client API
    if (this._cache.has(id)) {
      return this._cache.get(id);
    }
    const data = await this._client.getData(id);
    this._cache.set(id, data);
    return data;
  }
  async getItems(controller) {
    const result = await this._client.getItems(controller);
    return result;
  }
  async updateItems(controller) {
    const { ctx } = controller;
    await ctx.tran();
    const item = await this._client.updateItems(controller);
    const data = await this._client.updateItemsAssociate(controller);
    const result = await this._client.buildAssociate(controller, Object.assign(data, { item }));
    return result;
  }
  async updateItemsAssociate(controller) {
    const data = await this._client.updateItemsAssociate(controller);
    return data;
  }
  async buildAssociate(controller, data) {
    const result = await this._client.buildAssociate(controller, data);
    return result;
  }
}

module.exports = APIClient;
