const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define(
  "User",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    points: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    rankingPosition: {
      type: DataTypes.INTEGER,
      defaultValue:  null,
    },
  },
  {
    // Esto añade automáticamente columnas createdAt y updatedAt
    timestamps: true,
  },
);

module.exports = User;
