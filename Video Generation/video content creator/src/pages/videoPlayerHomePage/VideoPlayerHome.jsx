import React from "react";
import { useParams } from "react-router-dom";
import videoUrls from "../../data/videoUrls";
import ReelsVideoPlayer from "../../components/videoPlayer/VideoPlayerReels";

const HomeVideoPlayerPage = () => {
  const { videoId } = useParams();

  console.log("Video ID", videoId);

  // Find the video URL based on the videoId parameter from the URL
  const video = videoUrls.find((video) => video.id.toString() === videoId);

  console.log("Video", video);

  const videoLink = video?.videoUrl;
  const videoTitle = video?.title;
  const videoDescription = video?.description;

  console.log("Video Link", videoLink);

  return (
    <div className="App bg-[#1f1f1f] text-white h-[100vh] mt-6">
      <h1 className="text-3xl font-bold text-center my-4 capitalize">
        {videoTitle ? videoTitle : "Video not found"}
      </h1>
      {videoLink ? (
        <ReelsVideoPlayer videoUrl={videoLink} />
      ) : (
        <p className="text-center text-red-500">Video not available</p>
      )}

      <div className="p-6 bg-[#1f1f1f] ">
        <h3 className="text-xl font-semibold mb-2">Description</h3>
        <p className="text-gray-300 text-lg leading-relaxed">
          {videoDescription ? videoDescription : "No description available"}
        </p>
      </div>
    </div>
  );
};

export default HomeVideoPlayerPage;
