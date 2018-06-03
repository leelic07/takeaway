'use strict';

module.exports = app => {
  const { INTEGER, STRING, DATE } = app.Sequelize;
  const Members = app.model.define('members', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
  });
  return Members;
};
