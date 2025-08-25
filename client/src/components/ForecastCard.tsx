import { CloudLightning } from "lucide-react";
import React, { FC, ReactNode } from "react";

const ForecastCard: FC<{
  date: string;
  icon?: string | ReactNode;
  data: string;
  iconUri: string;
}> = ({ data, date, icon, iconUri }) => {
  return (
    <div className="rounded-xl p-4 px-6 max-h-36 bg-white dark:bg-gray-700 dark:text-white flex flex-col justify-center items-center gap-2">
      <p className="text-xs capitalize text-center">{date}</p>
      {/* <CloudLightning size={34} className='text-violet-800' /> */}
      {icon}
      {iconUri && <img src={iconUri} className="size-14" />}
      <strong className="text-sm opacity-60">{data}</strong>
    </div>
  );
};

export default ForecastCard;
