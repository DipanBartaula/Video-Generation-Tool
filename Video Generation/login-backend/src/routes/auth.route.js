import { Router } from "express";
import { getUser, getUserByEmail, loginUser, register } from "../controllers/auth.controllers.js";
import { check } from "express-validator";
import authUser from "../middleware/auth.middleware.js";
import { addVideo, getUserVideos, updateVideo } from "../controllers/video.controller.js";
import { getOwnVideos, uploadVideoFromOwnModel } from "../controllers/ownModel.controllers.js";


const route = Router();



route.post('/register', [
    check('given_name', 'Given name is required').not().isEmpty(),
    check('name', 'Name is required').not().isEmpty(),
    check('email', "Email must be in valid format").isEmail(),
    check("password", "Password is required").not().isEmpty(),
    check("picture", "Picture must be a valid URL").optional().isURL(),
    check("nickname", "Nickname should be a string").not().isEmpty(),
    check("voice_id", "Voice ID is required").not().isEmpty(),
    check("avatar_id", "Avatar ID is required").not().isEmpty(),
    check("api_key", "API Key is required").not().isEmpty()

], register);



route.post('/login', [
    check("username", "Username is required").not().isEmpty(), check("email", "Email is required").isEmail(), check("password", "Password is required").not().isEmpty()
], loginUser)

route.get('/user', authUser, getUser)

route.post('/addVideo', [
    check('userId', 'User ID is required').not().isEmpty(),
    check('videoData.id', 'Video ID is required').not().isEmpty(),
    check('videoData.thumbnail_url', 'Thumbnail URL is required').isURL(),
    check('videoData.video_url', 'Video URL is required').isURL(),
], addVideo)

route.post("/uploadvideofromownmodel", [
    check('userId', 'User ID is required').not().isEmpty(),
    check('videoData.video_url', 'Cloudinary URL is required').isURL(),
    check('videoData.script', 'Script is required').not().isEmpty(),
    check('videoData.thumbnail', 'Thumbnail URL is required').not().isEmpty(),
], uploadVideoFromOwnModel)

route.get("/videos/:userId", getUserVideos);



route.put("/updatevideo/:videoId", updateVideo);

route.get("/byemail/:email", getUserByEmail);

route.get("/ownvideos/:userId", getOwnVideos);

export default route;