const boom = require("boom");
const User = require("../models/User");
const { secret, createToken } = require("../services/auth.service");

const authController = {
  async register(req, res, next) {
    const { name, password } = req.body;
    try {
      const user = await User.create({ name, password });
      res.json(user);
    } catch (e) {
      next(boom.boomify(e));
    }
  },
  async login(req, res, next) {
    const { name, password } = req.body;
    try {
      const user = await User.findOne({ where: { name } });
      if (!user) {
        return res.status(401).json({ error: "Не верное имя или пароль" });
      }
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({ error: "Не верное имя или пароль" });
      }
      const token = createToken(user.id);
      res.json({ token });
    } catch (e) {
      next(boom.boomify(e));
    }
  },
};

module.exports = authController;
