import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { importantUrls } from "../../data/importantUrls";
import { useUploadownModelVideoMutation } from "../../store/slice/api/userApi";
import { useNavigate } from "react-router-dom";
import { setSingleVideo } from "../../store/slice/videosSlice";
import { setOwnVideos } from "../../store/slice/ownVideosSlice";
const VideoCreator = () => {
  const [ttsUrl, setTtsUrl] = useState("");
  const [clipUrl, setClipUrl] = useState("");
  const [script, setScript] = useState("");
  const thumbnail = useSelector((state) => state.selfModel?.THUMBNAIL_URL);

  console.log("thumbnail", thumbnail);

  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [error, setError] = useState("");
  const [addOwnVideo, videoStatus] = useUploadownModelVideoMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId = useSelector((state) => state?.updatedUser?.updatedUser?._id);

  console.log("userId", userId);

  const { REFERENCE_VIDEO_URL, REFERNE_AUDIO_URL } = useSelector(
    (state) => state.selfModel
  );

  console.log("REFERENCE_VIDEO_URL", REFERENCE_VIDEO_URL);
  console.log("REFERNE_AUDIO_URL", REFERNE_AUDIO_URL);

  const API_BASE_URL = importantUrls.frontEndUrl; // Replace with your current ngrok link

  const handleCreateVideo = async () => {
    setLoading(true);
    setVideoUrl("");
    setError("");

    const payload = {
      tts_url: `${ttsUrl}/generate`,
      clip_url: `${clipUrl}/generate_from_urls`,
      ref_video: REFERENCE_VIDEO_URL,
      ref_audio: REFERNE_AUDIO_URL,
      script: script,
    };

    try {
      const response = await axios.post(
        `${API_BASE_URL}/create_video`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
          },
        }
      );

      setVideoUrl(response.data.cloudinary_url);
      addOwnVideo({
        userId: userId,
        videoData: {
          video_url: response.data.cloudinary_url,
          script: script,
          thumbnail: thumbnail,
        },
      });
    } catch (err) {
      console.error(err);
      setError(
        "❌ Failed to create video. Please check your inputs and try again."
      );
    }

    setLoading(false);
  };

  const { data, isLoading, isError } = videoStatus;

  console.log("data", data);
  console.log("isLoading", isLoading);
  console.log("isError", isError);

  useEffect(() => {
    if (data?.video?.newvideoData) {
      dispatch(setOwnVideos(data?.video?.newvideoData));
      navigate(`/dashboard/own-model-video-player`);
    }
  }, [data?.video, dispatch, navigate]);

  return (
    <div className='p-6 max-w-xl mx-auto text-center'>
      <h1 className='text-2xl font-bold mb-6'>🎬 Create Video</h1>

      <div className='space-y-4 mb-6'>
        <input
          className='w-full p-2 border rounded text-black'
          type='text'
          placeholder='TTS URL'
          value={ttsUrl}
          onChange={(e) => setTtsUrl(e.target.value)}
        />
        <input
          className='w-full p-2 border rounded text-black'
          type='text'
          placeholder='Clip Generator URL'
          value={clipUrl}
          onChange={(e) => setClipUrl(e.target.value)}
        />
        <textarea
          className='w-full p-2 border rounded text-black'
          rows='3'
          placeholder='Script'
          value={script}
          onChange={(e) => setScript(e.target.value)}
        />
      </div>

      <button
        className='w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50'
        onClick={handleCreateVideo}
        disabled={loading || !ttsUrl || !clipUrl || !script}
      >
        {loading ? "🎥 Processing..." : "✨ Create Video"}
      </button>

      {videoUrl && (
        <div className='mt-6'>
          <p className='text-green-600 font-medium mb-2'>✅ Video Created!</p>
          <video
            src={videoUrl}
            controls
            autoPlay
            className='w-full max-h-[400px] rounded shadow-lg'
          />
        </div>
      )}

      {error && <p className='text-red-500 mt-4'>{error}</p>}
    </div>
  );
};

export default VideoCreator;
