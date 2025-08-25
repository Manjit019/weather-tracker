
import { useEffect, useState } from 'react';
import ForecastCard from './ForecastCard';
import { FormatDate } from '../utils/FormatDate';


export default function Forecast({forecast}) {

  const [dailyForecast, setDailyForecast] = useState<any[]>([]);

  const groupByDay = (list: any[]) => {
    const days: {[key: string]: any[]} = {};

    list.forEach((item) => {
      const day = FormatDate(item.dt*1000);
    
      if (!days[day]) {
        days[day] = [];
      }
      days[day].push(item);
    });

    return Object.entries(days).map(([date, items]: [any, any]) => {
      const temps = items.map(i => i.main.temp);
      const min = Math.min(...temps);
      const max = Math.max(...temps);

      const noon = items.find(i => {
          const hour = new Date(i.dt * 1000).getHours();
          return hour === 12;
      }) || items[Math.floor(items.length/2)];

      const icon = noon.weather[0].icon;

      return {
        date,
        min: Math.round(min),
        max: Math.round(max),
        icon
      };
    }).slice(0, 5); 
  };

    useEffect(() => {
      const grouped = groupByDay(forecast.list);
      setDailyForecast(grouped);
    }, [forecast]);


  return (
    <div className="flex gap-2 items-center overflow-x-auto">
      {dailyForecast.map((day:any, index) => (
        <ForecastCard
          key={index}
          date={day.date}
          iconUri={`http://openweathermap.org/img/wn/${day.icon}@2x.png`}
          data={`${day.min}°/${day.max}°`}
        />
      ))}
    </div>
  );
}