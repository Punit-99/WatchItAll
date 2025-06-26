import React from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  Divider,
  Stack,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import MediaUpload from "../../../component/admin/MediaUpload";
import {
  setMovieParts,
  setWebseriesSeasons,
} from "../../../store/show/showSlice";
import { deleteFile, resetUpload } from "../../../store/upload/fileUploadSlice";

const ShowUpload = () => {
  const dispatch = useDispatch();
  const { type, movieParts, webseriesSeasons } = useSelector(
    (state) => state.show
  );

  const createEmptyPart = () => ({
    id: uuid(),
    subtitle: "",
    url: "",
    public_id: "",
    resourceType: "",
  });

  const handleUpload = (fileData, type, sIdx = null, eIdx = null) => {
    if (!fileData?.public_id) return;

    if (type === "movie") {
      const updated = movieParts.map((part, i) =>
        i === sIdx ? { ...part, ...fileData } : part
      );
      dispatch(setMovieParts(updated));
    } else {
      const updatedSeasons = webseriesSeasons.map((season, i) => {
        if (i !== sIdx) return season;
        const updatedEpisodes = season.episodes.map((ep, j) =>
          j === eIdx ? { ...ep, ...fileData } : ep
        );
        return { ...season, episodes: updatedEpisodes };
      });
      dispatch(setWebseriesSeasons(updatedSeasons));
    }
  };

  const handleRemove = (public_id, resourceType, type, sIdx, eIdx) => {
    dispatch(deleteFile({ public_id, file_type: resourceType }));

    if (type === "movie") {
      const updated = movieParts.map((part, i) =>
        i === sIdx
          ? { ...part, url: "", public_id: "", resourceType: "" }
          : part
      );
      dispatch(setMovieParts(updated));
    } else {
      const updatedSeasons = webseriesSeasons.map((season, i) => {
        if (i !== sIdx) return season;
        const updatedEpisodes = season.episodes.map((ep, j) =>
          j === eIdx ? { ...ep, url: "", public_id: "", resourceType: "" } : ep
        );
        return { ...season, episodes: updatedEpisodes };
      });
      dispatch(setWebseriesSeasons(updatedSeasons));
    }
  };

  const handleClearAll = () => {
    dispatch(resetUpload());
    dispatch(setMovieParts([createEmptyPart()]));
    dispatch(
      setWebseriesSeasons([{ season: 1, episodes: [createEmptyPart()] }])
    );
  };

  const addMoviePart = () => {
    dispatch(setMovieParts([...movieParts, createEmptyPart()]));
  };

  const addSeason = () => {
    dispatch(
      setWebseriesSeasons([
        ...webseriesSeasons,
        {
          season: webseriesSeasons.length + 1,
          episodes: [createEmptyPart()],
        },
      ])
    );
  };

  const addEpisode = (seasonIdx) => {
    const updated = webseriesSeasons.map((season, i) => {
      if (i !== seasonIdx) return season;
      return {
        ...season,
        episodes: [...season.episodes, createEmptyPart()],
      };
    });
    dispatch(setWebseriesSeasons(updated));
  };

  const handleSubtitleChange = (value, type, sIdx, eIdx) => {
    if (type === "movie") {
      const updated = movieParts.map((part, i) =>
        i === sIdx ? { ...part, subtitle: value } : part
      );
      dispatch(setMovieParts(updated));
    } else {
      const updated = webseriesSeasons.map((season, i) => {
        if (i !== sIdx) return season;
        const updatedEpisodes = season.episodes.map((ep, j) =>
          j === eIdx ? { ...ep, subtitle: value } : ep
        );
        return { ...season, episodes: updatedEpisodes };
      });
      dispatch(setWebseriesSeasons(updated));
    }
  };

  return (
    <Box sx={{ mt: 6, display: "flex", flexDirection: "column", gap: 4 }}>
      <Typography variant="h6" fontWeight={600}>
        {type === "movie" ? "Movie Parts" : "Web Series Seasons"}
      </Typography>

      {type === "webseries" && (
        <Box>
          <Button
            variant="outlined"
            onClick={addSeason}
            startIcon={<Add />}
            size="small"
          >
            Add Season
          </Button>
        </Box>
      )}

      {type === "movie" &&
        (movieParts.length ? movieParts : [createEmptyPart()]).map(
          (part, i) => (
            <Stack
              key={part.id || i}
              direction="row"
              spacing={2}
              alignItems="flex-start"
              className="border p-4 rounded-lg"
            >
              <IconButton
                onClick={() =>
                  handleRemove(
                    part.public_id,
                    part.resourceType,
                    "movie",
                    i,
                    null
                  )
                }
                sx={{ mt: 0.5 }}
              >
                <Delete />
              </IconButton>
              <Stack spacing={1.5} flex={1}>
                <TextField
                  fullWidth
                  label="Subtitle *"
                  value={part.subtitle || ""}
                  onChange={(e) =>
                    handleSubtitleChange(e.target.value, "movie", i)
                  }
                  size="small"
                />
                <MediaUpload
                  type="media"
                  value={part}
                  onUpload={(data) =>
                    handleUpload(
                      { ...data, subtitle: part.subtitle },
                      "movie",
                      i
                    )
                  }
                  onDelete={() =>
                    handleRemove(
                      part.public_id,
                      part.resourceType,
                      "movie",
                      i,
                      null
                    )
                  }
                />
              </Stack>
            </Stack>
          )
        )}

      {type === "movie" && (
        <Button variant="outlined" onClick={addMoviePart} startIcon={<Add />}>
          Add Part
        </Button>
      )}

      {type === "webseries" &&
        (webseriesSeasons.length
          ? webseriesSeasons
          : [{ season: 1, episodes: [createEmptyPart()] }]
        ).map((season, sIdx) => (
          <Box key={season.season || sIdx} className="border rounded p-4">
            <Typography variant="subtitle1" fontWeight={600} mb={2}>
              Season {season.season}
            </Typography>
            {season.episodes.map((ep, eIdx) => (
              <Stack
                key={ep.id || eIdx}
                direction="row"
                spacing={2}
                alignItems="flex-start"
                className="border p-3 rounded mb-4"
              >
                <IconButton
                  onClick={() =>
                    handleRemove(
                      ep.public_id,
                      ep.resourceType,
                      "webseries",
                      sIdx,
                      eIdx
                    )
                  }
                  sx={{ mt: 0.5 }}
                >
                  <Delete />
                </IconButton>
                <Stack spacing={1.5} flex={1}>
                  <TextField
                    fullWidth
                    label={`Episode ${eIdx + 1} Subtitle *`}
                    value={ep.subtitle || ""}
                    onChange={(e) =>
                      handleSubtitleChange(
                        e.target.value,
                        "webseries",
                        sIdx,
                        eIdx
                      )
                    }
                    size="small"
                  />
                  <MediaUpload
                    type="media"
                    value={ep}
                    onUpload={(data) =>
                      handleUpload(
                        { ...data, subtitle: ep.subtitle },
                        "webseries",
                        sIdx,
                        eIdx
                      )
                    }
                    onDelete={() =>
                      handleRemove(
                        ep.public_id,
                        ep.resourceType,
                        "webseries",
                        sIdx,
                        eIdx
                      )
                    }
                  />
                </Stack>
              </Stack>
            ))}
            <Button
              size="small"
              variant="outlined"
              onClick={() => addEpisode(sIdx)}
              startIcon={<Add />}
            >
              Add Episode
            </Button>
          </Box>
        ))}

      <Divider />
      <Button variant="text" color="error" onClick={handleClearAll}>
        Cancel All Uploads
      </Button>
    </Box>
  );
};

export default ShowUpload;
