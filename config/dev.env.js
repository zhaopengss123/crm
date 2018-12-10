'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    //domain: '"http://work.beibeiyue.com"',
    domain: '"http://101.200.177.83:8029/crm"',
    //domain: '"http://twork.beibeiyue.cn"'
})
