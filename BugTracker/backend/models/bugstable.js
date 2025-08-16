"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class bugstable extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  bugstable.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      title: DataTypes.STRING,
      status: DataTypes.STRING,
      description: DataTypes.TEXT,
      expected_output: DataTypes.TEXT,
      actual_output: DataTypes.TEXT,
      current_time: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "bugstable",
    }
  );
  return bugstable;
};
