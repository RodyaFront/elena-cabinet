const router = require("express-promise-router")();
const authController = require("../controllers/auth.controller");

// Защищенный маршрут
// router.get('/protected', verifyToken, (req, res) => {
//     res.send('This is a protected route');
// });

// Маршрут для авторизации
router.post("/login", authController.login);
router.post("/register", authController.register);

module.exports = router;
