import { Locate, LocateFixedIcon } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router";

const CurrentLocationBtn = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

  const handleCurrentLocation = () => {
    try {
      setLoading(true)
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        navigate({
          pathname: `/weather/current-location`,
          search: `?lat=${latitude}&lon=${longitude}`,
        });
      });
    } catch (error) {
      console.log(error);
      alert("Error getting current location,or permission denied");
    }
  };

  return (
    <>
      <div className="flex items-center -mt-4 mb-1 ">
        <hr className="w-10 border-gray-200/70" />
        <span className="px-2 text-xs text-gray-100">OR</span>
        <hr className="w-10 border-gray-200/70" />
      </div>
      <button
        onClick={handleCurrentLocation}
        className={`flex items-center justify-center gap-2 px-2 py-1 text-xs rounded-2xl bg-white/20 ring ring-white/50 text-white dark:text-black hover:bg-white/30 transition-all duration-500 cursor-pointer ${loading ? "animate-pulse pointer-events-none" : ""}`}
      >
        <LocateFixedIcon size={20} />
        {loading ? (
          <span>Getting Location...</span>
        ) : (
          <span>Use My Current Location</span>
        )}
      </button>
    </>
  );
};

export default CurrentLocationBtn;
