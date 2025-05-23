import React from "react";
import VideoPlayer from "../../components/videoPlayer/VideoPlayer";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const VideoPlayerPage = () => {
  const videos = useSelector((state) => state.videos.videos);
  const { videoId } = useParams();

  const video = videos.find(
    (video) => video?.videoData?.id === videoId || video?._id === videoId
  );

  const videoLink = video?.videoData?.video_url;

  return (
    <div className='App bg-[#1f1f1f] text-white h-[100vh] mt-6'>
      <h1 className='text-3xl font-bold text-center my-4'>
        {video?.videoData?.title || "Videos"}
      </h1>
      <VideoPlayer videoUrl={videoLink} />

      <div className='p-6'>
        <h3 className='text-xl font-semibold mb-2'>Description</h3>
        <p className='text-gray-300 text-lg leading-relaxed'>
          {video?.videoData?.description || "No description available"}
        </p>
      </div>
    </div>
  );
};

export default VideoPlayerPage;
