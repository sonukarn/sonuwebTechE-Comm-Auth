import jwt from "jsonwebtoken";
import UserModel from "../modals/User.js";

var CheckUserAuth = async (req, res, next) => {
  let token;
  const { authorization } = req.headers;
  if (authorization && authorization.startsWith("Bearer")) {
    try {
      //Get Token from Headers
      token = authorization.split(" ")[1];

      // Verify Token
      const { userId } = jwt.verify(token, process.env.JWT_SECRET_KEY);
      //GET USER FROM TOKEN
      req.user = await UserModel.findById(userId).select("-password");
      next();
    } catch (error) {
      res.send({ status: "failed", message: "Unauthorized User" });
    }
  }
  if (!token) {
    res
      .status(401)
      .send({ status: "failed", message: "Unauthorized User No Token" });
  }
};
export default CheckUserAuth;
