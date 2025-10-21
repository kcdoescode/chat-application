import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
    // 1️⃣ Try to get token from cookie
    let token = req.cookies.token;

    // 2️⃣ If not found, check Authorization header (Bearer <token>)
    if (!token && req.headers.authorization) {
      token = req.headers.authorization.split(" ")[1];
    }

    // 3️⃣ If still no token, user isn’t authenticated
    if (!token) {
      return res.status(401).json({ message: "User not authenticated." });
    }

    // 4️⃣ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // 5️⃣ Attach user ID to request object
    req.id = decoded.userId;
    next();
  } catch (error) {
    console.error("Authentication error:", error.message);
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};

export default isAuthenticated;
