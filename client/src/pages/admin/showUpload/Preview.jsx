import React, { useState } from "react";
import {
  Box,
  Typography,
  Chip,
  Stack,
  Divider,
  IconButton,
  Fade,
} from "@mui/material";
import { useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";

const Preview = () => {
  const {
    type,
    title,
    description,
    releaseDate,
    genres,
    languages,
    poster,
    movieParts,
    webseriesSeasons,
  } = useSelector((state) => state.show);

  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleChipClick = (url, subtitle) => {
    setSelectedVideo({ url, subtitle });
  };

  const renderEpisodes = () => {
    if (type === "movie") {
      return movieParts.map((part, index) =>
        part.url ? (
          <Chip
            key={part.public_id || index}
            label={part.subtitle || `Part ${index + 1}`}
            onClick={() => handleChipClick(part.url, part.subtitle)}
            variant="outlined"
            color="primary"
          />
        ) : null
      );
    }

    return webseriesSeasons.flatMap((season) =>
      season.episodes.map((ep, index) =>
        ep.url ? (
          <Chip
            key={ep.public_id || index}
            label={ep.subtitle || `Episode ${index + 1}`}
            onClick={() => handleChipClick(ep.url, ep.subtitle)}
            variant="outlined"
            color="primary"
          />
        ) : null
      )
    );
  };

  return (
    <Box
      sx={{ display: "flex", gap: 3, p: 3, width: "100%", flexWrap: "wrap" }}
    >
      {/* Poster Section */}
      <Box
        sx={{
          width: 200,
          height: 300,
          borderRadius: 2,
          bgcolor: poster.url ? "transparent" : "background.default",
          border: poster.url ? "none" : "2px dashed",
          borderColor: "divider",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {poster.url ? (
          <Box
            component="img"
            src={poster.url}
            alt="Poster"
            sx={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <Typography
            color="text.secondary"
            fontStyle="italic"
            fontSize={14}
            sx={{ textAlign: "center" }}
          >
            Upload Poster to see preview
          </Typography>
        )}
      </Box>

      {/* Data Section */}
      <Box sx={{ flex: 1, minWidth: 250 }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          {title || "Untitled Show"}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {description || "No description provided."}
        </Typography>
        <Typography variant="caption" color="text.secondary" display="block">
          Release Date: {releaseDate || "N/A"}
        </Typography>
        <Typography variant="caption" color="text.secondary" display="block">
          Show type {type || "N/A"}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Stack direction="row" spacing={1} flexWrap="wrap" mb={2}>
          {genres?.map((g, i) => (
            <Chip key={i} label={g} size="small" />
          ))}
          {languages?.map((l, i) => (
            <Chip key={i} label={l} size="small" color="secondary" />
          ))}
        </Stack>

        <Typography variant="subtitle2" fontWeight={500} gutterBottom>
          {type === "movie" ? "Parts:" : "Episodes:"}
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap">
          {renderEpisodes()}
        </Stack>
      </Box>

      {/* Video Player Section with Fade */}
      <Fade in={!!selectedVideo?.url} timeout={500} unmountOnExit>
        <Box
          sx={{
            minWidth: 300,
            maxWidth: 400,
            flex: 1,
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 2,
            p: 2,
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography fontWeight={500}>{selectedVideo?.subtitle}</Typography>
            <IconButton onClick={() => setSelectedVideo(null)} size="small">
              <CloseIcon />
            </IconButton>
          </Stack>
          <Box
            component="video"
            controls
            src={selectedVideo?.url}
            sx={{ mt: 2, width: "100%", borderRadius: 1 }}
          />
        </Box>
      </Fade>
    </Box>
  );
};

export default Preview;
