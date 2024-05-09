//Note: import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Note: Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_id'
});

//Note: Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'category_id'
});

//Note: Products belongToMany Tags (through ProductTag)
Products.belongsToMany(Tag, {
  through: ProductTag,
  foreignKey: 'tag_id'
});

//Note: Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: ProductTag,
  foreignKey: 'product_id'
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
