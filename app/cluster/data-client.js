'use strict';
const Base = require('sdk-base');

class DataClient extends Base {
  constructor(options) {
    super(options);
    this.ready(true);
  }

  subscribe(info, listener) {
    // subscribe data from server
  }

  publish(info) {
    // publish data to server
  }

  async getData(id) {
    // asynchronous API
  }

  async getItems(controller) {
    const { ctx, service } = controller;
    const result = await service.items.page(ctx.query);
    return result;
  }

  // async updateItems(controller) {
  //   const { ctx, service } = controller;
  //   // const result = await service.items.update(ctx.request.body);
  //   return result;
  // }

  async updateItems(controller) {
    const { ctx, service } = controller;
    const result = await service.items.updateItems(ctx.request.body);
    return result;
  }

  async updateItemsAssociate(controller) {
    const { ctx, service } = controller;
    const result = await service.items.updateItemsAssociate(ctx.request.body);
    return result;
  }

  async buildAssociate(controller, data) {
    const { service } = controller;
    const result = await service.items.buildAssociate(data);
    return result;
  }
}

module.exports = DataClient;
