import axios from 'axios';

import OwnVideo from '../models/OwnVideo.model.js';


export const uploadVideoFromOwnModel = async (req, res) => {
    try {
        const { userId, videoData } = req.body;



        const { video_url, script,thumbnail } = videoData;

        // Construct the request text to ask for the title and description
        const requestText = `Can you give title and 30 word description like in youtube with tags of the given title : ${script}`;

        // Call the API to get title and description
        const apiResponse = await axios.post("http://127.0.0.1:7000/chat", {
            text: requestText,
        });

        const { response } = apiResponse.data;

        const titleMatch = response.match(/\*\*Title:\*\* (.*)/);
        const descriptionMatch = response.match(/\*\*Description:\*\* (.*)/);

        const title = titleMatch ? titleMatch[1] : "Untitled";
        const description = descriptionMatch ? descriptionMatch[1] : "No description available.";

        // Create the video data object
        const newvideoData = {
            video_url,
            title,
            description,
            script,
            thumbnail,
        };

        // Save to DB
        const newVideo = new OwnVideo({
            userId,
            newvideoData,
        });

        await newVideo.save();

        res.status(201).json({ message: "Video uploaded successfully", video: newVideo });

    } catch (error) {
        console.error("Upload error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const getOwnVideos = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const videos = await OwnVideo.find({ userId });

        res.status(200).json({ videos });
    } catch (error) {
        console.error("Fetch error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};