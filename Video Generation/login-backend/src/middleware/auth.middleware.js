import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken"

const authUser = async (req, res, next) => {

    try {
        const token = req.header("auth-token");

        if (!token) {
            throw new ApiError(400, "Authorization token doesn't exist")
        }

        const user = jwt.decode(token, process.env.ACCESS_TOKEN_SECRET);
       
        if (user) {
            req.uId = user._id;
            next();
        } else {
            throw new ApiError(500, "Error while fetching user");
        }


    } catch (error) {
        res.send(error);
    }

}


export default authUser;