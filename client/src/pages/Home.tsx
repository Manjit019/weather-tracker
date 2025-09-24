import { useEffect, useRef, useState } from "react";
import SearchBar from "../components/SearchBar";
import FeaturesCard from "../components/FeaturesCard";
import HeroVid from "../assets/weather-video.mp4";
import { Activity, CloudLightningIcon, LucideBolt, Zap } from "lucide-react";
import { useNavigate } from "react-router";
import CurrentLocationBtn from "../components/CurrentLocationBtn";

const Home = () => {
  const navigate = useNavigate();

  const videoRef = useRef(null);

  const Features = [
    {
      heading: "Real-Time & Accurate Weather",
      subHeading:
        " Get instant weather conditions with accurate temperature,humidity, and wind details.",
      icon: <Zap />,
    },
    {
      heading: "5-Day Forecast",
      subHeading:
        " Get detailed 5-day weather forecasts with daily summaries and temperature highs/lows.",
      icon: <Activity />,
    },
    {
      heading: "Severe Weather Alerts",
      subHeading:
        " Stay informed with real-time alerts for severe weather conditions in your area.",
      icon: <CloudLightningIcon />,
    },
  ];

  //   useEffect(() => {
  //     videoRef.current.playbackRate = 1.5;
  //   }, [])

  return (
    <>
      <main className="min-h-screen  overflow-hidden">
        <div className="relative flex flex-col justify-center items-center p-4 md:py-14 py-28 text-center  ">
          <h2 className="text-white text-2xl font-bold">
            Check the weather anytime
          </h2>
          <p className="text-sm text-white opacity-80">
            Simple forecast with all the details you need in one place.
          </p>
          <SearchBar
            onSearch={(city) => {
              navigate({
                pathname: `/weather`,
                search: `?city=${city}`,
              });
            }}
          />

          <CurrentLocationBtn />

          <video
            ref={videoRef}
            autoPlay
            loop
            className="min-w-svw h-full inset-0 absolute -z-10 top-0 left-0 object-cover bg-violet-950"
          >
            <source src={HeroVid} type="video/mp4" />
          </video>
        </div>

        <section className="p-4  bg-gradient-to-b dark:from-gray-800 dark:to-gray-700 from-blue-50 to-violet-50">
          <h3 className="dark:text-white mb-3 flex items-center gap-2">
            {" "}
            <LucideBolt /> Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {Features.map((feature, index) => (
              <FeaturesCard
                key={index}
                heading={feature?.heading}
                subHeading={feature?.subHeading}
                icon={feature?.icon}
              />
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
