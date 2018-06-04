'use strict';

module.exports = app => {
  const { INTEGER, STRING, DATE, FLOAT } = app.Sequelize;
  const Pictures = app.model.define('pictures', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    url: { type: STRING(64), defaultValue: '' },
  }, {
    timestamps: true,
    paranoid: true,
    underscored: false,
    tableName: 'pictures',
  });
  Pictures.associate = () => {
    Pictures.belongsTo();
  };
  return Pictures;
};
