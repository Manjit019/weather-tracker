import { CloudDrizzle } from "lucide-react";
import React, { FC } from "react";

const CurrentConditionCard: FC<{
  title: string;
  data: number | string;
  icon: any;
}> = ({ data, icon, title }) => {
  return (
    <div className="bg-violet-50 dark:bg-gray-900 rounded-xl p-4">
      <h3 className="text-sm mb-2">{title}</h3>
      <div className="flex justify-between gap-2 items-center">
        <strong className="text-xl">{data || 0}</strong>
        {icon}
      </div>
    </div>
  );
};

export default CurrentConditionCard;
