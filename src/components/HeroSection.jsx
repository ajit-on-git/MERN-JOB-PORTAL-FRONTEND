import React, { useState } from 'react';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  }

  return (
    <div className="bg-blue-50 py-16">
      <div className="max-w-7xl mx-auto text-center px-4">
        <div className="space-y-6">
          <span className="inline-block px-6 py-2 rounded-full bg-[#f0f5ff] text-[#0073b1] font-medium">
            Welcome To Job Hunt Website
          </span>
          <h1 className="text-5xl font-semibold leading-tight text-gray-800">
            Search, Apply & <br /> Get Your <span className="text-[#0066cc]">Dream Jobs</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover thousands of job opportunities, tailored just for you. Start your journey to your dream job today!
          </p>
        </div>

        {/* Search Bar */}
        <div className="flex justify-center mt-10">
          <div className="flex items-center w-full sm:w-1/2 lg:w-1/3 border border-gray-200 rounded-full shadow-lg overflow-hidden">
            <input
              type="text"
              placeholder="Find your dream jobs by job title"
              onChange={(e) => setQuery(e.target.value)}
              className="w-full py-3 px-4 text-lg border-none outline-none rounded-l-full"
            />
            <Button onClick={searchJobHandler} className="bg-[#0066cc] text-white py-7 px-6 rounded-r-full flex items-center">
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
