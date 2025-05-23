import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useGenerateVideoMutation } from "../../store/slice/api/heyGen";
import { useAddVideoToUserMutation } from "../../store/slice/api/userApi";
import { setSingleVideo } from "../../store/slice/videosSlice";

const CreateWithAI = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const updatedUser = useSelector((state) => state.updatedUser.updatedUser); //have access to the redux store 
  const apiKey = updatedUser?.api_key;

  const [generateVideo, { data: generateData }] = useGenerateVideoMutation();
  const [addVideoToUser, userAddStatus] = useAddVideoToUserMutation();

  const [videoId, setVideoId] = useState(null);
  const [videoData, setVideoData] = useState(null);
  const [polling, setPolling] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [videoScript, setVideoScript] = useState("");

  /** Function to fetch video status */
  const fetchVideoStatus = async () => {
    if (!videoId || !apiKey) return;

    try {
      const response = await fetch(
        `https://api.heygen.com/v1/video_status.get?video_id=${videoId}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "X-Api-Key": apiKey,
          },
        }
      );

      const result = await response.json();

      if (result?.data?.status === "completed") {
        setVideoData(result.data);
        setPolling(false); // Stop polling
      } else if (result?.data?.status === "failed") {
        console.error("Video generation failed");
        setPolling(false);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error fetching video status:", error);
      setPolling(false);
    }
  };

  /** Polling effect: runs only when videoId updates */
  useEffect(() => {
    if (polling && videoId) {
      const interval = setInterval(fetchVideoStatus, 10000); // Poll every 10s
      return () => clearInterval(interval); // Cleanup on unmount
    }
  }, [polling, videoId]);

  /** Effect: Triggered when video is completed */
  useEffect(() => {
    if (videoData) {
      const dataToSend = {
        userId: updatedUser._id,
        videoData: {
          id: videoData.id,
          thumbnail_url: videoData.thumbnail_url,
          video_url: videoData.video_url,
          script: videoScript,
        },
      };
      addVideoToUser(dataToSend);
    }
  }, [videoData]);

  useEffect(() => {
    if (userAddStatus.data) {
      setIsLoading(false);
      dispatch(setSingleVideo(userAddStatus.data.video));
      navigate(`/dashboard/video-player/${userAddStatus.data.video._id}`);
    }
  }, [userAddStatus.data, dispatch, navigate]);

  /** Effect: Handle videoId update & start polling */
  useEffect(() => {
    if (generateData?.data?.video_id) {
      setVideoId(generateData.data.video_id);
      setPolling(true); // Start polling
    }
  }, [generateData]);

  /** Handle form submission */
  const handleCreateVideo = (data) => {
    setVideoScript(data.script);
    const payload = {
      inputText: data.script,
      apiKey: updatedUser.api_key,
      avatarId: updatedUser.avatar_id,
      voiceId: updatedUser.voice_id,
    };

    generateVideo(payload);
  };

  return (
    <div className="p-6 bg-[#1f1f1f] text-white h-[calc(100vh-4rem)]">
      <h1 className="text-3xl font-bold mb-4">Create Video with AI</h1>

      <form onSubmit={handleSubmit(handleCreateVideo)} className="mb-6">
        <label htmlFor="script" className="block text-xl mb-2">
          Enter your video script:
        </label>
        <textarea
          id="script"
          {...register("script", { required: "Script is required" })}
          rows="6"
          className={`w-full p-4 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 ${
            errors.script ? "border-red-500" : ""
          }`}
          placeholder="Write your script here..."
        />
        {errors.script && (
          <p className="text-red-500 text-sm">{errors.script.message}</p>
        )}

        <div>
          <button
            type="submit"
            className="bg-gray-700 text-white px-6 py-2 rounded-full flex items-center hover:bg-gray-600 mt-4"
            disabled={isLoading}
          >
            {polling ? "Creating..." : "Create Video"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateWithAI;
