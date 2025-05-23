import VideoCardGHome from "../../components/videos/VideoCardHomePage";
import { videoData } from "../../data/videoData";

const Homepage = () => {
  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 bg-[#1f1f1f] text-white">
      {videoData.map((video) => (
        <VideoCardGHome key={video.id} video={video} />
      ))}
    </div>
  );
};

export default Homepage;
