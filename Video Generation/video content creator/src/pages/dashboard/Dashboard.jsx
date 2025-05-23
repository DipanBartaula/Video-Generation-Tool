import React, { useState, useEffect } from "react";
import { FaVideo, FaRobot } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useGetOwnModelVideosQuery,
  useGetVideosByUserIdQuery,
} from "../../store/slice/api/userApi";
import { setOwnAllVideos, setVideos } from "../../store/slice/videosSlice";
import VideoCard from "../../components/videos/VidoesCard";
import OwnVideoCard from "../../components/videos/OwnVideoCard";

const Dashboard = () => {
  const videos = useSelector((state) => state.videos.videos);
  const ownFetchedVideos = useSelector((state) => state.videos.ownVideos);
  const user = useSelector((state) => state.user.user);
  const updatedUser = useSelector((state) => state.updatedUser.updatedUser);
  const {
    data: ownVideos,
    isFetching: ownVideoIsFetching,
    error: isOwnVideoError,
  } = useGetOwnModelVideosQuery(updatedUser?._id);
  const navigate = useNavigate();
  const { data, isFetching, error } = useGetVideosByUserIdQuery(
    updatedUser?._id
  );
  const location = useLocation();
  const dispatch = useDispatch();
  const handleCreateWithAI = () => {
    navigate("/dashboard/create-with-ai");
  };

  const handleCreateWithCustomModel = () => {
    navigate("/dashboard/upload-video");
  };

  useEffect(() => {
    if (data?.videos) {
      dispatch(setVideos(data?.videos));
    }
  }, [data?.videos, location]);

  useEffect(() => {
    dispatch(setOwnAllVideos(ownVideos?.videos));
  }, [ownVideos?.videos, location]);

  console.log("ownFetchedVideos", ownFetchedVideos);

  return (
    <div className='p-4 bg-[#1f1f1f] text-white min-h-[calc(100vh-4rem)]'>
      {/* User Information and Create Video Options */}
      <div className='mb-6'>
        <h1 className='text-2xl font-bold mb-4'>Welcome, {user?.name}</h1>

        <div className='flex space-x-4 mb-6'>
          <button className='bg-black text-white px-6 py-2 rounded-full flex items-center hover:bg-gray-700' onClick={handleCreateWithCustomModel}>
            <FaVideo className='mr-2' />
            Create Video With Custom Model
          </button>
          <button
            className='bg-black text-white px-6 py-2 rounded-full flex items-center hover:bg-gray-700'
            onClick={handleCreateWithAI}
          >
            <FaRobot className='mr-2' />
            Create Video With Heygen
          </button>
        </div>
      </div>

      {/* Your Videos Title */}
      <h2 className='text-xl font-semibold mb-4'>Your HeyGen Videos</h2>

      {/* Display User Videos */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {videos?.length > 0 ? (
          videos?.map((video) => (
            <VideoCard
              key={video._id}
              video={video}
            />
          ))
        ) : (
          <p>No videos available. Start creating!</p>
        )}
      </div>

      <h2 className='text-xl font-semibold mb-4'>Your Own Videos</h2>

      {/* Display User Videos */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {ownFetchedVideos?.length > 0 ? (
          ownFetchedVideos?.map((video) => (
            <OwnVideoCard
              key={video?._id}
              video={video}
            />
          ))
        ) : (
          <p>No videos available. Start creating!</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
