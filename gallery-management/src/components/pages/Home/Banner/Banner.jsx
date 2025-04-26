import bgVideo from "../../../../assets/video/bg-video.mp4";

const Banner = () => {
  return (
    <div className="relative w-full h-[400px] md:h-[600px] lg:h-[800px] bg-[#1A202C]"> {/* Added negative margin */}
      <video
        className="w-full h-full object-cover"
        src={bgVideo}
        autoPlay
        loop
        muted
      ></video>
    </div>
  );
};

export default Banner;