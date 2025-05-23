import React, { useState } from "react";
import ReactPlayer from "react-player";
import "tailwindcss/tailwind.css";

const ReelsVideoPlayer = ({ videoUrl }) => {
  const [url, setUrl] = useState(videoUrl || "");

  return (
    <div className='flex justify-center items-center p-0 bg-white h-screen'>
      <div className='w-full h-full'>
        <ReactPlayer
          url={url}
          playing={true} // Autoplay
          loop={true} // Loop video
          width='100%' // Full width
          height='100%' // Full height
          className='rounded-lg'
          controls={true} // Show controls
        />
      </div>
    </div>
  );
};

export default ReelsVideoPlayer;
