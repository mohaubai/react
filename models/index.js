const { Sequelize } = require('sequelize');
const config = require('../config/config');
const userModel = require('./user');
const productModel = require('./product');

const env = process.env.NODE_ENV || 'development';
const sequelizeConfig = config[env];

const sequelize = new Sequelize(
  sequelizeConfig.database,
  sequelizeConfig.username,
  sequelizeConfig.password,
  sequelizeConfig
);

const User = userModel(sequelize);
const Product = productModel(sequelize);

Product.associate({ User });

module.exports = { sequelize, Sequelize, User, Product };
