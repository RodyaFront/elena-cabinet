const jwt = require("jsonwebtoken");
const secret = "321my_super_duper_secret_key123";

function createToken(userId) {
  const token = jwt.sign({ userId }, secret, { expiresIn: "11h" });
  return token;
}

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  let token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.sendStatus(401);
  }

  token = token.trim();

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.userId = decoded.userId;
    next();
  });
}

module.exports = {
  createToken,
  verifyToken,
  secret,
};
