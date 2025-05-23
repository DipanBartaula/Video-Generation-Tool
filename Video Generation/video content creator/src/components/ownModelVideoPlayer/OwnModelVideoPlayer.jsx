import React, { useState } from "react";
import ReactPlayer from "react-player";
import "tailwindcss/tailwind.css";

const OwnModelVideoPlayerComponent = ({ videoUrl }) => {
  return (
    <div className='flex justify-center items-center p-4 bg-[#1f1f1f] rounded-lg'>
      <div className='w-full max-w-3xl'>
        <ReactPlayer
          url={videoUrl}
          controls
          width='100%'
          height='100%'
          className='rounded-lg'
        />
      </div>
    </div>
  );
};

export default OwnModelVideoPlayerComponent;
