const jwt = require("jsonwebtoken");
function authenticateToken(req, res, next) {
  const authHeader = req.headers["autherization"];
  const token = authHeader && authHeader.split("")[1];
  if (token == null) return res.sendStaus(401);
  jwt.verify(token, "Snippet_SecretKEY", (err, user) => {
    if (err) return res.sendStaus(403);
    req.user = user;
    next();
  });
}

function generateAccessToken(username) {
  return jwt.sign({ data: username }, "Snippet_SecretKEY", {
    expireIn: "1h",
  });
}

module.exports = {
  authenticateToken,
  generateAccessToken,
};
