import { validationResult } from "express-validator";
import User from "../models/User.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Video from "../models/Video.model.js";
import axios from 'axios'; // Ensure you have axios installed

export const addVideo = async (req, res) => {
    try {
        // Destructure the required fields from the request body
        const { userId, videoData } = req.body;

        console.log(req.body);

        // Get the script from the videoData object
        const script = videoData.script;

        // Construct the request text to ask for the title and description
        const requestText = `Can you give title and 30 word description like in youtube with tags of the given paragraph starting from here: ${script}`;

        // Make the API call to get the title and description for the video script
        const apiUrl = "http://127.0.0.1:7000/chat"; // Your API endpoint
        const apiPayload = {
            text: requestText // Pass the constructed string as the text parameter
        };

        const response = await axios.post(apiUrl, apiPayload);

        // Extract the title and description from the API response
        const { response: apiResponse } = response.data;
        const title = apiResponse.match(/\*\*Title:\*\* (.*)/)[1]; // Extracting title
        const description = apiResponse.match(/\*\*Description:\*\* (.*)/)[1]; // Extracting description

        // Add the title and description to the videoData
        const updatedVideoData = {
            ...videoData,
            title,
            description
        };

        // Create a new video entry
        const newUserVideo = new Video({
            userId,
            videoData: updatedVideoData
        });

        // Save the new video entry to the database
        await newUserVideo.save();

        // Respond with success
        res.status(201).json({ message: 'Video added successfully', video: newUserVideo });
    } catch (err) {
        // Handle errors (e.g., API call failure, database issues)
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};


export const getUserVideos = async (req, res) => {
    try {
        // Get the userId from request parameters or query
        const { userId } = req.params; // Assuming `userId` is passed as a route parameter



        // Check if userId is provided
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        // Fetch all videos related to the given userId
        const userVideos = await Video.find({ userId });

        // Check if any videos are found for the user
        if (!userVideos.length) {
            return res.status(404).json({ message: 'No videos found for the user' });
        }

        // Respond with the list of videos
        res.status(200).json({
            message: 'Videos retrieved successfully',
            videos: userVideos
        });
    } catch (err) {
        // Handle unexpected errors
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};




export const updateVideo = async (req, res) => {
    try {
        const { videoId } = req.params; // Get the videoId from the route parameter
        const { title, description } = req.body; // Get title and script from the request body

        // Check if at least one field (title or script) is provided
        if (!title && !description) {
            return res.status(400).json({ message: 'Either title or script must be provided to update' });
        }

        // Prepare the update object
        const updateFields = {};
        if (title) updateFields['videoData.title'] = title;
        if (description) updateFields['videoData.description'] = description;

        // Update the video document
        const updatedVideo = await Video.findByIdAndUpdate(
            videoId, // Find the video by ID
            { $set: updateFields }, // Set the updated fields
            { new: true } // Return the updated document
        );

        // Check if the video was found and updated
        if (!updatedVideo) {
            return res.status(404).json({ message: 'Video not found' });
        }

        // Respond with the updated video
        res.status(200).json({
            message: 'Video updated successfully',
            video: updatedVideo,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};