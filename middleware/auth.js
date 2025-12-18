const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const token = req.cookies.token
    if (!token) {
      res.json({msg : "login first"})
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      UserId: decoded.id
    };
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = {
    auth
}
