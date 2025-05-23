import React from "react";
import { useNavigate } from "react-router-dom";

const VideoCardGHome = ({ video }) => {
  const navigate = useNavigate();

  const handleVideoClick = () => {
    navigate(`/video-player/${video.id}`);
  };

  return (
    <div
      className="cursor-pointer bg-[#1f1f1f] text-white rounded-lg shadow-md overflow-hidden w-full border border-gray-700"
      onClick={handleVideoClick}
    >
      <img
        src={video.thumbnail}
        alt={video.title}
        className="w-full h-44 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold truncate capitalize">{video.title}</h3>
        <p className="text-gray-400 text-sm">{video.channelName}</p>
        <div className="flex items-center text-gray-400 text-sm space-x-2">
          <span>{video.views}</span>
          <span>•</span>
          <span>{video.likes} likes</span>
        </div>
      </div>
    </div>
  );
};

export default VideoCardGHome;
