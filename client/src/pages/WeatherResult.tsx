import {
  ChevronLeft,
  CloudDrizzle,
  Droplet,
  Droplets,
  Eye,
  Gauge,
  Loader,
  MapPin,
  Pin,
  SunMedium,
  Wind,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useNavigation, useParams, useSearchParams } from "react-router";
import CurrentConditionCard from "../components/CurrentConditionCard";
// import weatherIcon from "../assets/images/cloudy.png";
import ForecastCard from "../components/ForecastCard";
import api from "../utils/api";
import { FormatDate } from "../utils/FormatDate";
import Skeleton from "../components/Skeleton";
import Forecast from "../components/Forecast";

const WeatherResult = () => {
  const [searchParams] = useSearchParams();
  const city = searchParams.get("city");
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");
  const navigate = useNavigate();
  const [weather, setWeather] = useState<any>(null);
  const [forecast, setForecast] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchWeather = async () => {
    try {
      setError(null);
      setWeather(null);
      setForecast(null);

      if (city) {
        const res = await api.get(`/api/weather?city=${city}`);
        setWeather(res.data.current);
        setForecast(res.data.forecast);
        setLoading(false);
        return;
      }
      if (lat && lon) {
        const res = await api.post(`/api/weather/current-location`, { lat, lon });
        setWeather(res.data?.current);
        setForecast(res.data?.forecast);
        setLoading(false);
        return;
      }
    } catch (err: any) {
      console.error(
        "Error fetching weather:",
        err.response?.data || err.message
      );
      setError("City not found or server error");
      alert("City not found or server error, Returning to Home Screen...");
      navigate(-1);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen p-4 px-16 space-y-4 dark:bg-gray-900">
        <Skeleton className="w-32 h-8 mt-10 rounded-md" />
        <Skeleton className="w-64 h-8 my-2 rounded-md" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-4">
          <Skeleton className="w-full h-52" />
          <Skeleton className="w-full h-52" />
        </div>
        <Skeleton className="w-56 h-8 my-4" />

        <div className="flex mt-4 gap-4 items-center overflow-x-visible flex-wrap">
          {Array.from({ length: 5 }).map((_, idx: number) => (
            <Skeleton key={idx} className="w-28 h-36" />
          ))}
        </div>
      </div>
    );
    // return (
    //     <div className="flex min-h-screen items-center justify-center gap-2">
    //         <Loader className="animate-spin my-2 " />
    //         <p className="animate-pulse">Fetching weather...</p>
    //     </div>
    // )
  }

  return (
    <main className="p-4 md:px-24 bg-violet-50 dark:bg-gray-900">
      <button
        onClick={() => window.history.back()}
        className="mb-4 text-violet-600 flex items-center hover:cursor-pointer"
      >
        <ChevronLeft /> Back To Home
      </button>
      <h2 className=" text-gray-800 dark:text-white flex items-center gap-1">
        Weather in <span className="flex items-center justify-center gap-1"> <MapPin size={20} /> <strong>{weather?.name}</strong></span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-2">
        <div className="bg-white dark:bg-gray-700 dark:text-white relative rounded-xl p-2 px-4 flex justify-around items-center gap-4">
          <div className="py-6">
            <p className="text-sm opacity-60">Now</p>
            <strong className="text-3xl md:text-5xl flex items-start my-1">
              {weather?.main?.temp}
              <span className="text-xl">°C</span>
            </strong>
            <p className=" text-xs sm:text-sm opacity-60 capitalize font-semibold">
              {weather?.weather[0]?.description}
            </p>
            <p className="text-xs opacity-60 mb-3">
              Feels Like {weather?.main?.feels_like}°C
            </p>
            <p className=" opacity-60 text-xs absolute bottom-3 left-3">
              High: {weather?.main?.temp_max}°C ● Low: {weather?.main?.temp_min}
              °C
            </p>
          </div>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0]?.icon}@2x.png`}
            alt="weather icon"
            className="size-28"
          />

          <div className="px-2 py-1 rounded-2xl border border-violet-200 bg-violet-100 dark:bg-gray-950 dark:border-gray-900 absolute top-2 right-2">
            <p className="text-xs">{weather?.weather[0]?.main}</p>
          </div>
        </div>

        {/* current conditions */}
        <div className="bg-white dark:bg-gray-700 dark:text-white rounded-xl p-2">
          <h3 className="">Current Conditions</h3>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <CurrentConditionCard
              title="Wind"
              icon={<Wind size={45} />}
              data={`${weather?.wind?.speed}m/s`}
            />
            <CurrentConditionCard
              title="Humidity"
              icon={<Droplets size={45} />}
              data={`${weather?.main?.humidity}%`}
            />
            <CurrentConditionCard
              title="Pressure"
              icon={<Gauge size={45} />}
              data={`${weather?.main?.pressure}hPa`}
            />
            <CurrentConditionCard
              title="Visibility"
              icon={<Eye size={45} />}
              data={`${weather?.visibility / 1000}km`}
            />
          </div>
        </div>
      </div>

      {/* forecast  starts*/}
      <div className="">
        <h3 className="my-2 mt-6 dark:text-white">5 days forecast</h3>
        {
          forecast ? (
            <Forecast forecast={forecast} />
          ) : (
            <p className="text-gray-500/60 text-center py-10 text-sm">No forecast available</p>
          )
        }
      </div>
    </main>
  );
};

export default WeatherResult;
