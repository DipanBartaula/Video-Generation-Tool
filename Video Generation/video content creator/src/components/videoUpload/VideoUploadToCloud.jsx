import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  setREFERENCE_VIDEO_URL,
  setREFERNE_AUDIO_URL,
  setTHUMBNAIL_URL,
} from "../../store/slice/selfmodel";

import { useNavigate } from "react-router-dom";
import { importantUrls } from "../../data/importantUrls";

const VideoUploader = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState(""); // ✅ New state
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [cutVideoUrl, setCutVideoUrl] = useState("");
  const [wavUrl, setWavUrl] = useState("");
  const [processing, setProcessing] = useState(false);

  const cloudName = "de1yfnzdz";
  const uploadPreset = "ai_project";
  const FASTAPI_URL = `${importantUrls.cloudinaryUrl}/cut_video`;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ Helper to generate thumbnail URL
  const getThumbnailUrl = (videoUrl, timeInSeconds = 1) => {
    const parts = videoUrl.split("/upload/");
    if (parts.length !== 2) return "";
    return `${parts[0]}/upload/so_${timeInSeconds}/${parts[1].replace(
      /\.\w+$/,
      ".jpg"
    )}`;
  };

  const handleVideoUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true);
    setError(null);
    setVideoUrl("");
    setThumbnailUrl(""); // ✅ Clear thumbnail
    setCutVideoUrl("");
    setWavUrl("");

    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    try {
      const response = await axios.post(cloudinaryUrl, formData);
      const uploadedUrl = response.data.secure_url;
      setVideoUrl(uploadedUrl);

      // ✅ Generate and store thumbnail
      setThumbnailUrl(getThumbnailUrl(uploadedUrl, 1));
    } catch (err) {
      setError(
        "Upload error: " + (err.response?.data?.error?.message || err.message)
      );
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    if (thumbnailUrl) {
      dispatch(setTHUMBNAIL_URL(thumbnailUrl));
    }
  }, [thumbnailUrl]);

  const handleCutVideo = async () => {
    if (!videoUrl || !startTime || !endTime) {
      setError("Please upload a video and set both start and end times.");
      return;
    }

    setProcessing(true);
    setError(null);
    setCutVideoUrl("");
    setWavUrl("");

    try {
      const response = await axios.get(FASTAPI_URL, {
        params: {
          cloudinary_url: videoUrl,
          start_time: startTime,
          end_time: endTime,
        },
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
      });

      setCutVideoUrl(response.data.video_url);
      dispatch(setREFERENCE_VIDEO_URL(response.data.video_url));
      setWavUrl(response.data.wav_url);
      dispatch(setREFERNE_AUDIO_URL(response.data.wav_url));
      navigate("/dashboard/own-model");
    } catch (err) {
      setError(
        "Processing error: " + (err.response?.data?.error || err.message)
      );
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className='p-4 border rounded max-w-md mx-auto'>
      <h2 className='text-xl font-semibold mb-2'>Upload a Video</h2>
      <input
        type='file'
        accept='video/*'
        onChange={handleVideoUpload}
        className='mb-4'
        disabled={uploading}
      />
      {uploading && <p>Uploading...</p>}
      {error && <p className='text-red-500'>{error}</p>}

      {videoUrl && (
        <div className='mt-4'>
          <p className='text-green-600'>Upload complete!</p>
          <p className='mt-2 text-sm break-all'>{videoUrl}</p>

          {thumbnailUrl && (
            <div className='mt-4'>
              <h3 className='font-semibold'>Thumbnail:</h3>
              <img
                src={thumbnailUrl}
                alt='Video thumbnail'
                className='w-full max-h-64 object-cover mt-2 rounded border'
              />
            </div>
          )}

          <div className='mt-4'>
            <label className='block mb-1'>Start Time (in seconds)</label>
            <input
              type='number'
              className='border rounded px-2 py-1 w-full mb-2 text-black'
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
            <label className='block mb-1'>End Time (in seconds)</label>
            <input
              type='number'
              className='border rounded px-2 py-1 w-full mb-2 text-black'
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
            <button
              onClick={handleCutVideo}
              disabled={processing}
              className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'
            >
              {processing ? "Processing..." : "Cut Video Clip"}
            </button>
          </div>
        </div>
      )}

      {cutVideoUrl && (
        <div className='mt-6'>
          <h3 className='font-semibold'>Clipped Video URL:</h3>
          <p className='mt-1 break-all text-sm'>{cutVideoUrl}</p>
        </div>
      )}

      {wavUrl && (
        <div className='mt-4'>
          <h3 className='font-semibold'>Extracted Audio (WAV):</h3>
          <audio
            controls
            src={wavUrl}
            className='w-full mt-2'
          />
          <p className='mt-1 break-all text-sm'>{wavUrl}</p>
        </div>
      )}
    </div>
  );
};

export default VideoUploader;
