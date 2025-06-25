import { useState } from "react";
import { genres, languages } from "../../../utils/showFields";
import { Chip, Box, Typography } from "@mui/material";

export default function GenreLanguageSelector() {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);

  const handleToggle = (item, list, setList) => {
    setList((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
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
              onClick={() =>
                handleToggle(genre, selectedGenres, setSelectedGenres)
              }
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
          {languages.map((language) => (
            <Chip
              key={language}
              label={language}
              clickable
              onClick={() =>
                handleToggle(language, selectedLanguages, setSelectedLanguages)
              }
              variant={
                selectedLanguages.includes(language) ? "filled" : "outlined"
              }
              color={
                selectedLanguages.includes(language) ? "primary" : "default"
              }
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
