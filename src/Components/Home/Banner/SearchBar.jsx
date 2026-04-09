import React, { useState } from "react";
import { FilterModal } from "./FilterModal";

const SearchBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="w-full bg-white/20 p-2 rounded-xl">
      <div className="bg-white w-full max-w-7xl  shadow-lg shadow-white/30 rounded-xl p-4">
        {/* MAIN FLEX */}
        <div className="flex flex-col md:flex-row gap-3">
          {/* Input (bigger) */}
          <input
            type="text"
            placeholder="Skills, Designations, Keyword"
            className="flex-1 w-full px-4 py-3 border rounded-md focus:outline-none"
          />

          {/* Select 1 */}
          <select className="flex-1 w-full px-4 py-3 border rounded-md">
            <option>Job Category</option>
            <option>Frontend</option>
            <option>Backend</option>
            <option>Full Stack</option>
          </select>

          {/* Select 2 */}
          <select className="flex-1 w-full px-4 py-3 border rounded-md">
            <option>Select City</option>
            <option>Dhaka</option>
            <option>Chittagong</option>
            <option>Khulna</option>
          </select>

          {/* Filter Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex-shrink-0 px-6 cursor-pointer py-3 bg-gray-200 rounded-md hover:bg-gray-300">
            Filter
          </button>

          {/* Search Button */}
          <button className="flex-shrink-0 cursor-pointer px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700">
            Search
          </button>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <FilterModal closeModal={() => setIsModalOpen(false)} />
        )}
      </div>
    </div>
  );
};

export default SearchBar;
