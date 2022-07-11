const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  console.log("here error", token);
  jwt.verify(token, "Snippet_SceretKEY", (err, user) => {
    console.log("here error",err,user);
    if (err) {
      //return res.send("here error");
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
}

function generateAccessToken(username) {
  return jwt.sign({ data: username }, "Snippet_SceretKEY", {
    expiresIn: "1h",
  });
}

module.exports = {
  authenticateToken,
  generateAccessToken,
};
