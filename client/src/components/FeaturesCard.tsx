import { Flashlight } from "lucide-react";
import React, { ReactNode } from "react";
import { FC } from "react";

interface FeaturesCard {
  heading: string;
  subHeading: string;
  icon: string | ReactNode;
}

const FeaturesCard: FC<FeaturesCard> = ({ heading, icon, subHeading }) => {
  return (
    <div className="p-4 rounded-2xl bg-white border-slate-200 dark:bg-gray-800 border dark:border-gray-700 ">
      <div className="p-2 w-fit rounded-lg text-violet-600 border bg-violet-200 border-violet-300 dark:bg-gray-900 dark:border-gray-700">
        {icon}
      </div>
      <h4 className=" dark:text-white my-4">{heading}</h4>
      <p className="opacity-60 dark:text-white/80 text-sm ">{subHeading}</p>
    </div>
  );
};

export default FeaturesCard;
