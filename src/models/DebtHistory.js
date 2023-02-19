const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../database");
const Debtor = require("./Debtor");

class DebtHistory extends Model {}
DebtHistory.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    debtor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Debtor,
        key: "id",
      },
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "debt_history",
    timestamps: true,
  }
);

module.exports = DebtHistory;
