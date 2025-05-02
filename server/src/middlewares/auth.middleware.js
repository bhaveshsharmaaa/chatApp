import jwt from "jsonwebtoken";
import User from "../models/user.models.js";

export const protectedRoute = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized-Invalid" });
    }

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res
        .status(401)
        .json({ message: "Unauthorized-User not foundssss" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protectedRoute", error.message);
    return res.status(401).json({ message: "Unauthorized" });
  }
};
