const jwt = require("jsonwebtoken");

exports.authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Lấy token từ header

  if (!token) {
    return res
      .status(403)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Xác thực token
    req.user = decoded;
    console.log(decoded);
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token is not valid" });
  }
};

exports.checkToken = async (req, res, next) => {
  const { token } = req.body;
  if (!token) {
    next();
    return res.status(400).json({ message: "Token is null" });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ message: "Invalid token", error: err.message });
    }
    console.log(decoded);
    res.json({ decoded });
  });
};
