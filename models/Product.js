// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    //Note: Defining id
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    //Note: Defining product_name
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    //Note: Defining price 
    //Note: For decimal value im limiting it to a total of 10 digits that can be stored in the column to the left and right of the decimal point & limiting it to to digits after the decimal point
    price: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
      validate: {
      isDecimal: true,
      },
    },

    //Note: Defining stock
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10,
      validate: {
        isNumeric: true,
      },
    },
    
    //Note:Defining category id
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'category',
        key: 'id',
      },
    },
  },

  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
