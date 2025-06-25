import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { genres, languages } from "../../../utils/showFields";
import { Chip, Box, Typography } from "@mui/material";
import { setGenres, setLanguages } from "../../../store/show/showSlice";

export default function GenreLanguageSelector() {
  const dispatch = useDispatch();
  const selectedGenres = useSelector((state) => state.show.genres);
  const selectedLanguages = useSelector((state) => state.show.languages);

  const handleToggle = (item, list, setAction) => {
    const updatedList = list.includes(item)
      ? list.filter((i) => i !== item)
      : [...list, item];
    dispatch(setAction(updatedList));
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3, p: 2 }}>
      {/* Genre Section */}
      <Box>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Genres
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {genres.map((genre) => (
            <Chip
              key={genre}
              label={genre}
              clickable
              onClick={() => handleToggle(genre, selectedGenres, setGenres)}
              variant={selectedGenres.includes(genre) ? "filled" : "outlined"}
              color={selectedGenres.includes(genre) ? "primary" : "default"}
              sx={{
                fontSize: "0.875rem",
                borderRadius: "999px",
                px: 1.5,
              }}
            />
          ))}
        </Box>
      </Box>

      {/* Language Section */}
      <Box>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Languages
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {languages.map((lang) => (
            <Chip
              key={lang}
              label={lang}
              clickable
              onClick={() =>
                handleToggle(lang, selectedLanguages, setLanguages)
              }
              variant={selectedLanguages.includes(lang) ? "filled" : "outlined"}
              color={selectedLanguages.includes(lang) ? "primary" : "default"}
              sx={{
                fontSize: "0.875rem",
                borderRadius: "999px",
                px: 1.5,
              }}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
