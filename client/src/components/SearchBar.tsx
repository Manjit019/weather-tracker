import { Search } from "lucide-react";
import React, { useState } from "react";

function SearchBar({ onSearch }: { onSearch: (city: string) => void }) {

  const [city,setCity] = useState('');

  const handleSearch = () => {
    if(!city||city.length === 1){
      return;
    }
    onSearch(city);
  }

  return (
    <div className="p-2 rounded-full bg-white dark:bg-gray-900 flex items-center gap-2 px-3 my-6 md:w-96">
      <input
        type="text"
        placeholder="Enter Your City"
        className="w-full outline-none ml-4  dark:text-white"
        onChange={(e)=>setCity(e.target.value)}
      />
      <button onClick={handleSearch} className="bg-violet-500 rounded-full text-white p-2 hover:cursor-pointer hover:bg-violet-900 transition-all duration-500 ">
        <Search size={24} />
      </button>
    </div>
  );
}

export default SearchBar;
