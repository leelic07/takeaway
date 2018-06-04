'use strict';

module.exports = app => {
  const { INTEGER, STRING } = app.Sequelize;
  const Advertisements = app.model.define('advertisements', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    imageUrl: { type: STRING(30), defaultValue: '' },
    url: { type: STRING(10), defaultValue: '' },
    sort: { type: STRING(30), defaultValue: '' },
    status: { type: INTEGER, defaultValue: 1 },
  }, {
    timestamps: true,
    paranoid: true,
    underscored: false,
    tableName: 'advertisements',
  });
  return Advertisements;
};
