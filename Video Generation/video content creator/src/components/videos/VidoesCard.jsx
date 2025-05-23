import React from "react";
import { useNavigate } from "react-router-dom";

const VideoCard = ({ video }) => {
  const navigate = useNavigate();

  const handleVideoClick = () => {
    navigate(`/dashboard/video-player/${video?.videoData?.id}`);
  };

  const truncateDescription = (description = "") => {
    const words = description.split(" ");
    const truncated = words.slice(0, 5).join(" ");
    return words.length > 10 ? `${truncated}...` : truncated;
  };

  return (
    <div
      className='cursor-pointer bg-[#1f1f1f] text-white rounded-lg shadow-md overflow-hidden w-full border border-gray-700'
      onClick={handleVideoClick}
    >
      <img
        src={video?.videoData?.thumbnail_url}
        alt={video?.videoData?.title}
        className='w-full h-44 object-cover'
      />
      <div className='p-4'>
        <h3 className='text-lg font-semibold truncate'>
          {video?.videoData?.title}
        </h3>
        <p className='text-gray-300'>
          {truncateDescription(video?.videoData?.description)}
        </p>
        <p className='text-gray-400 text-sm'>{video?.channelName}</p>
        <div className='flex items-center text-gray-500 text-sm space-x-2'>
          <span>{video?.views}</span>
          <span>•</span>
          <span>{video?.uploaded}</span>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
