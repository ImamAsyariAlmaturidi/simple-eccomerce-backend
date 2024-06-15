const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config()
const sequelize = new Sequelize(process.env.NAMA_DATABASE, process.env.USER_DATABASE, process.env.PASSWORD_DATABASE, {
  host: 'localhost',
  dialect: 'postgres'  
});

const Product = sequelize.define('products', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING
  },
  description: {
    type: DataTypes.STRING
  },
  price: {
    type: DataTypes.INTEGER
  },
  imageUrl: {
    type: DataTypes.STRING
  },
  quantity: {
    type: DataTypes.INTEGER
  }
});

module.exports = {
  Product
};
