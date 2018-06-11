'use strict';
const path = require('path');

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1527696214875_227';

  // add your config here
  config.middleware = [ 'verify' ];

  config.sequelize = {
    dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
    database: 'takeout',
    host: 'localhost',
    port: '3306',
    username: 'root',
    // password: 'root', // 家里
    password: '123456', // 公司
    // password: '', //笔记本
    define: {
      timestamps: true,
      paranoid: true,
      underscored: false,
      freezeTableName: true,
    },
  };

  // session
  config.session = {
    key: 'EGG_SESS',
    maxAge: 1 * 3600 * 1000, // 1小时
    httpOnly: true,
    encrypt: true,
  };

  // csrf security
  config.security = {
    // csrf: {
    //   // 判断是否需要 ignore 的方法，请求上下文 context 作为第一个参数
    //   ignore: ctx => ctx.ip === '127.0.0.1' || 'localhost',
    // },
    csrf: false,
    domainWhiteList: [
      'http://localhost:9528',
    ],
  };

  config.cors = {
    credentials: true,
  };

  config.view = {
    // 如果还有其他模板引擎，需要合并多个目录
    defaultViewEngine: 'nunjucks',
    defaultExtension: '.html',
    root: path.join(appInfo.baseDir, 'app/assets'),
    mapping: {
      '.js': 'nunjucks',
      '.html': 'nunjucks',
    },
  };

  config.cluster = {
    listen: {
      port: 7003,
      hostname: '127.0.0.1',
      // path: '/var/run/egg.sock',
    },
  };

  return config;
};
