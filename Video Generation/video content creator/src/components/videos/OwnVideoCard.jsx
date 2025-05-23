import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setOwnVideos } from "../../store/slice/ownVideosSlice";

function OwnVideoCard({ video }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log("newVideo", video?.newvideoData);

  const handleClick = () => {
    dispatch(setOwnVideos(video?.newvideoData));
    navigate(`/dashboard/own-model-video-player`);
  };

  return (
    <div
      className='max-w-md rounded-2xl overflow-hidden shadow-lg  p-4 cursor-pointer hover:shadow-xl transition-shadow  border border-gray-300 '
      onClick={handleClick}
    >
      <div className='relative pb-[56.25%] mb-4 bg-gray-200 rounded-xl overflow-hidden'>
        {/* Replace with real thumbnail if available */}
        <img
          src={
            video?.newvideoData?.thumbnail ||
            "https://www.techsmith.com/blog/wp-content/uploads/2021/02/video-thumbnails-hero-1.png"
          }
          alt='Video Thumbnail'
          className='absolute top-0 left-0 w-full h-full object-cover'
        />
      </div>
      <h2 className='text-xl font-semibold text-white mb-2'>
        {video?.newvideoData?.title}
      </h2>
      <p className=' text-sm line-clamp-3 text-white'>
        {video?.newvideoData?.description}
      </p>
    </div>
  );
}

export default OwnVideoCard;
