'use strict';
const path = require('path')

module.exports = {
    'config': path.resolve('./app','config.json'),
    'migrations-path': path.resolve('./','migrations'),
    'models-path': path.resolve('./app','model'),
    'seeders-path': path.resolve('./app','seeders'),
}