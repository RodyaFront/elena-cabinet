const Debtor = require("../models/Debtor");
const DebtHistory = require("../models/DebtHistory");
const boom = require("boom");

const debtorController = {
  async get(req, res, next) {
    try {
      const debtor = await Debtor.findByPk(req.params.id);

      if (!debtor) res.status(404).json({ message: "User not found" });

      return res.status(200).json({ debtor });
    } catch (e) {
      next(boom.boomify(e));
    }
  },
  async getAll(req, res, next) {
    try {
      const debtors = await Debtor.findAll();

      if (debtors.length === 0)
        return res.status(404).json({ error: "No debtors found" });

      return res.status(200).json({ debtors });
    } catch (e) {
      next(boom.boomify(e));
    }
  },
  async create(req, res, next) {
    try {
      const debtor = await Debtor.create(req.body);
      return res.status(200).json({ debtor, status: true });
    } catch (e) {
      next(boom.boomify(e));
    }
  },
  async update(req, res, next) {
    try {
      await Debtor.update({ ...req.body }, { where: { id: req.params.id } });

      const newDebtHistory = await DebtHistory.create({
        debtor_id: req.params.id,
        amount: req.body.difference || req.body.debt,
        date: new Date(),
        description: req.body.difference ? "Приплюсовано" : "Долг переписан",
      });

      return res.status(200).json({ status: true });
    } catch (e) {
      next(boom.boomify(e));
    }
  },
  async delete(req, res, next) {
    try {
      await Debtor.destroy({ where: { id: req.params.id } });
      return res.status(200).json({ message: "Debtor successfully deleted." });
    } catch (e) {
      next(boom.boomify(e));
    }
  },
  async getDebtsHistory(req, res, next) {
    try {
      const debtor = await Debtor.findByPk(req.params.id);
      const history = await DebtHistory.findAll({
        where: { debtor_id: debtor.id },
      });

      return res.status(200).json({ debtor, history });
    } catch (e) {
      next(boom.boomify(e));
    }
  },
};

module.exports = debtorController;
