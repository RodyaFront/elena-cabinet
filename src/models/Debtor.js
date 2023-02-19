const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../database");
const DebtHistory = require("./DebtHistory");

class Debtor extends Model {}
Debtor.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    debt: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "debtor",
    timestamps: true,
  }
);

DebtHistory.belongsTo(Debtor, { foreignKey: "debtor_id" });
Debtor.hasMany(DebtHistory, { foreignKey: "debtor_id" });

module.exports = Debtor;
