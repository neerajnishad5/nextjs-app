"use client";
import React, { useState, useCallback } from "react";
import { Box, Typography } from "@mui/material";
import DebouncedSearchBar from "../../../components/ui/DebouncedSearchBar";
import { dummyUsers, User } from "./data";

const Page = () => {
  const [filteredUsers, setFilteredUsers] = useState<User[]>(dummyUsers);

  const handleSearch = useCallback((query: string) => {
    const lower = query.toLowerCase();

    const results = dummyUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(lower) ||
        user.email.toLowerCase().includes(lower),
    );

    setFilteredUsers(results);
  }, []);

  return (
    <Box className="min-h-[80vh] flex flex-col items-center bg-black p-6">
      <Typography className="text-white text-2xl mb-4">Test Page</Typography>

      <DebouncedSearchBar onSearch={handleSearch} />

      <Box className="mt-6 w-full max-w-md">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <Box
              key={user.id}
              className="border-2 border-amber-200 rounded-xl p-3 mb-3"
            >
              <Typography className="text-white font-semibold">
                {user.name}
              </Typography>
              <Typography className="text-gray-300">{user.email}</Typography>
            </Box>
          ))
        ) : (
          <Typography className="text-red-400 mt-4">No users found.</Typography>
        )}
      </Box>
    </Box>
  );
};

export default Page;
