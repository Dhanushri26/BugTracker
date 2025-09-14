"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Bug extends Model {
    static associate(models) {
      // associations if needed later
    }
  }

  Bug.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      difficulty: {
        type: DataTypes.ENUM("Easy", "Medium", "Hard", "Critical"),
        allowNull: false,
      },
      expected_outcome: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      actual_outcome: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      problem_identified: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM(
          "Open",
          "In Progress",
          "Testing",
          "Resolved",
          "Closed"
        ),
        defaultValue: "Open",
      },
      resolution: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      tags: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        defaultValue: [],
      },
      images: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        defaultValue: [],
      },
      is_favorite: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      created_by: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Bug",
      tableName: "bugs",
      timestamps: false, // we are handling created_at & updated_at manually
    }
  );
  return Bug;
};
