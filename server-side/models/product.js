"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Images, { foreignKey: "productId" });
      this.hasOne(models.Category, { foreignKey: "id" });
    }
  }
  Product.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Name must be filled in" },
          notEmpty: { msg: "Name must be filled in" },
        },
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Slug must be filled in" },
          notEmpty: { msg: "Slug must be filled in" },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Description must be filled in" },
          notEmpty: { msg: "Description must be filled in" },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "Price must be filled in" },
          notEmpty: { msg: "Price must be filled in" },
        },
      },
      mainImg: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: { msg: "Main image must be filled in" },
          notEmpty: { msg: "Main image must be filled in" },
        },
      },
      categoryId: DataTypes.INTEGER,
      authorId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
