import { validationResult } from "express-validator";
import User from "../models/User.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Video from "../models/Video.model.js";



export const register = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            throw new ApiError(400, "Validation Errors", errors.array());
        }

        const { given_name, family_name, name, email, password, picture, nickname, voice_id, avatar_id, api_key } = req.body;

        console.log(req.body);

        // Check if the email or username already exists in the database
        const existed = await User.findOne({ email });


        if (existed) {
            throw new ApiError(409, "User with email or username already exists");
        }

        // Create a new user
        const user = await User.create({
            given_name,
            family_name,
            name,
            email,
            password,
            picture,
            nickname,
            voice_id,
            avatar_id,
            api_key
        });

        console.log("User", user);

        // Generate access token
        const token = await user.generateAccessToken();


        if (token) {
            return res.status(201).json(
                new ApiResponse(200, {
                    token: token,
                    user
                }, "User created successfully")
            );
        } else {
            throw new ApiError(500, "Error while creating user");
        }

    } catch (error) {
        res.status(400).send(error);
    }
};


export const loginUser = async (req, res) => {

    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            throw new ApiError(400, "Missing Fields", errors.array())

        }

        const { username, email, password } = req.body;

        const user1 = await User.findOne({ email });
        const user2 = await User.findOne({ username });
        if (!user1 || !user2) {
            throw new ApiError(404, "User doesn't exist")
        }


        const matchPassword = await user1.isPasswordCorrect(password);

        if (!matchPassword) {
            throw new ApiError(400, "Please provide a correct password");
        }
        const token = await user1.generateAccessToken();

        if (token) {
            return res.status(201).json(
                new ApiResponse(200, token, "User is created Successfully")
            )
        }
        else {
            throw new ApiError(500, "Error while login user")
        }




    } catch (error) {
        res.status(400).send(error)
    }

}

export const getUser = async (req, res) => {
    try {
        const userId = req.uId;

        const user = await User.findById(userId).select("-password");


        if (user) {
            res.status(200).json(
                new ApiResponse(200, user, "Logged in successfull")
            )
        } else {
            throw new ApiError(500, "Error while fetching user");
        }
    } catch (error) {
        res.status(404).send(error)
    }
}

export const getUserByEmail = async (req, res) => {

    try {
        console.log(req.params.email);

        const email = req.params.email;

        const user = await User.findOne({ email }).select("-password");
        const token = await user.generateAccessToken();
        if (user) {
            res.status(200).json(
                new ApiResponse(200, {
                    user,
                    token
                }, "User fetched successfully")
            )
        } else {
            throw new ApiError(500, "Error while fetching user");
        }


    } catch (error) {

        res.status(404).send(error)
    }

}