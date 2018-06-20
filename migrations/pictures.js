'use strict';
const co = require('co');

module.exports = {
  up: co.wrap(async (db, Sequelize) => {
    const { INTEGER, STRING } = Sequelize;
    await db.createTable('pictures', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      url: { type: STRING(120), defaultValue: '' },
    });
    await db.addIndex('pictures', [ 'name' ], { type: STRING(32) });
  }),
  down: co.wrap(async db => {
    await db.dropTable('pictures');
  }),
};
