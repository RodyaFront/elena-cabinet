const router = require("express-promise-router")();
const debtorController = require("../controllers/debtor.controller.js");
const { verifyToken } = require("../services/auth.service");

router.get("/", verifyToken, debtorController.getAll);
router.get("/:id", verifyToken, debtorController.get);
router.post("/create", verifyToken, debtorController.create);
router.put("/:id", verifyToken, debtorController.update);
router.delete("/:id", verifyToken, debtorController.delete);
router.get("/history/:id", verifyToken, debtorController.getDebtsHistory);

module.exports = router;
