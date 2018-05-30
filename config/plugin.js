'use strict';

// had enabled by egg
// exports.static = true;

exports.sequelize = {
  enabled: true,
  package: 'egg-sequelize',
};

exports.validate = {
  enabled: true,
  package: 'egg-validate',
};

exports.cors = {
  enabled: true,
  package: 'egg-cors',
};
