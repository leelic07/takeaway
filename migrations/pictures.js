'use strict';
const co = require('co');

module.exports = {
  up: co.wrap(async (db, Sequelize) => {
    const { INTEGER, STRING } = Sequelize;
    await db.createTable('pictures', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      url: { type: STRING(120), defaultValue: '' },
    });
  }),
  down: co.wrap(async db => {
    await db.dropTable('pictures');
  }),
};
