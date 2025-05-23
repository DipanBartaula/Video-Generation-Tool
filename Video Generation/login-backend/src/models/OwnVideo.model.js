import mongoose from "mongoose";

const ownVideoDataSchema = new mongoose.Schema(
    {

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
        thumbnail: {
            type: String,
            required: true,
            trim: true,
        }

    });


const ownVideoSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        newvideoData: {
            type: ownVideoDataSchema,
            required: true,
        }
    },
    { timestamps: true }
);

const OwnVideo = mongoose.model("OwnVideo", ownVideoSchema);

export default OwnVideo;

