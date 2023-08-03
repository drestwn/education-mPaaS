"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/encrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: { msg: `Email format is in valid` },
          notNull: {
            msg: `Email must be filled`,
          },
          notEmpty: {
            msg: `Email must be filled`,
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [5, Infinity], // Minimum length is 6 characters
            msg: "Password must be more than 5 characters",
          },
        },
      },
      role: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      address: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.beforeCreate((el) => {
    el.password = hashPassword(el.password);
  });
  return User;
};
