"use client";

import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import CircularProgress from "@mui/material/CircularProgress";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import { useDebounce } from "../../hooks/useDebounce";

interface DebouncedSearchBarProps {
  onSearch: (query: string, signal?: AbortSignal) => Promise<void> | void;
  delay?: number;
  width?: number | string;
}

export default function DebouncedSearchBar({
  onSearch,
  delay = 500,
  width = 400,
}: DebouncedSearchBarProps) {
  const [query, setQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const debouncedQuery = useDebounce(query, delay);

  useEffect(() => {
    if (!debouncedQuery) return;

    const controller = new AbortController();
    let isActive = true;

    const handleSearch = async () => {
      setLoading(true);
      try {
        await onSearch(debouncedQuery, controller.signal);
      } catch (err: any) {
        // Ignore abort errors
        if (err.name !== "AbortError") {
          console.error(err);
        }
      } finally {
        if (isActive) setLoading(false);
      }
    };

    handleSearch();

    return () => {
      isActive = false;
      // Cancel previous search
      controller.abort();
    };
  }, [debouncedQuery, onSearch]);

  return (
    <Box sx={{ width }} className="p-2 m-2 bg-amber-100 rounded-xl">
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search"
        value={query}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setQuery(e.target.value)
        }
        className="bg-white rounded-xl"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: loading ? (
            <InputAdornment position="end">
              <CircularProgress size={20} />
            </InputAdornment>
          ) : null,
        }}
      />
    </Box>
  );
}
