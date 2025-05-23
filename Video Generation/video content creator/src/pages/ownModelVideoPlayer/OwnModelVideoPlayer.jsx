import React from "react";
import { useSelector } from "react-redux";
import OwnModelVideoPlayerComponent from "../../components/ownModelVideoPlayer/OwnModelVideoPlayer";

function OwnModelVideoPlayer() {
  const ownVideo = useSelector((state) => state.ownVideos.ownVideos);


  return (
    <div>
      <div className='App bg-[#1f1f1f] text-white h-[100vh] mt-6'>
        <h1 className='text-3xl font-bold text-center my-4'>
          {ownVideo?.title || "Videos"}
        </h1>
        <OwnModelVideoPlayerComponent videoUrl={ownVideo?.video_url} />

        <div className='p-6'>
          <h3 className='text-xl font-semibold mb-2'>Description</h3>
          <p className='text-gray-300 text-lg leading-relaxed'>
            {ownVideo?.description || "No description available"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default OwnModelVideoPlayer;
