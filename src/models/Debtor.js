const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../database");
class Debtor extends Model {}
Debtor.init(
  {
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    debt: {
      type: DataTypes.INTEGER,
      default: 0,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "debtor",
    timestamps: true,
  }
);

module.exports = Debtor;
