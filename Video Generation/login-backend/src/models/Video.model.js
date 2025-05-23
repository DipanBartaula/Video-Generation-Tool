import mongoose from "mongoose"

const videoDataSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            required: true,
            trim: true,
        },
        thumbnail_url: {
            type: String,
            required: true,
            trim: true,
        },
        video_url: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        title: {
            type: String,
            trim: true,
        },
        script: {
            type: String,
            trim: true,
            required: true
        }
    },
    { _id: false } // Prevent _id creation for the nested schema
);

const videoSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        videoData: {
            type: videoDataSchema,
            required: true,
        }
    },
    { timestamps: true }
);

const Video = mongoose.model("Video", videoSchema);

export default Video;
