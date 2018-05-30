'use strict';

module.exports = app => {
  const { INTEGER, STRING } = app.Sequelize;
  const Merchants = app.model.define('merchants', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    typeId: {
      type: INTEGER,
      defaultValue: 0,
    },
    name: {
      type: STRING(32),
      defaultValue: '',
    },
    code: {
      type: STRING(8),
      defaultValue: '',
    },
    address: {
      type: STRING(32),
      defaultValue: '',
    },
    managerName: {
      type: STRING(32),
      defaultValue: '',
    },
    managerPhone: {
      type: STRING(32),
      defaultValue: '',
    },
  });
  return Merchants;
};
