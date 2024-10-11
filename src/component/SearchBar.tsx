import React, { useEffect, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    if (searchTerm) {
      navigate(`/search/${searchTerm}`);
    }
  }, [searchTerm, navigate]);

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg mb-6">
      <input
        className="w-full p-2 border border-blue-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
        type="text"
        value={searchTerm}
        placeholder="Search..."
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
