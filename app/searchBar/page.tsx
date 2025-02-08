// app/components/SearchBar.tsx
"use client";
import { setSearchQuery } from "@/lib/redux/searchSlice";
import { useDispatch } from "react-redux";

const SearchBar = () => {
  const dispatch = useDispatch();

  return (
    <input
      type="text"
      placeholder="Search products..."
      onChange={(e) => dispatch(setSearchQuery(e.target.value))}
      className="w-full p-2 border rounded mb-4"
    />
  );
};

export default SearchBar;