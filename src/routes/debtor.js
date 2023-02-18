const router = require("express-promise-router")();
const debtorController = require("../controllers/debtor.controller.js");

router.route("/").get(debtorController.getAll);
router.route("/:id").get(debtorController.get);
router.route("/create").post(debtorController.create);
router.route("/:id").put(debtorController.update);
router.route("/:id").delete(debtorController.delete);

module.exports = router;
