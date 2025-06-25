import React from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  Divider,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import MediaUpload from "../../../component/admin/MediaUpload";
import {
  clearAllUploads,
  addUpload,
  removeUpload,
  setMovieParts,
  setWebseriesSeasons,
} from "../../../store/show/showSlice";
import { deleteFile, resetUpload } from "../../../store/upload/fileUploadSlice";

const ShowUpload = () => {
  const dispatch = useDispatch();
  const { type, movieParts, webseriesSeasons } = useSelector(
    (state) => state.show
  );

  const handleUpload = (fileData, type, sIdx = null, eIdx = null) => {
    if (!fileData?.public_id) return;

    if (type === "movie") {
      const existing = movieParts[sIdx];
      if (existing?.public_id === fileData.public_id) return;

      const updated = [...movieParts];
      updated[sIdx] = { ...updated[sIdx], ...fileData };
      dispatch(setMovieParts(updated));
      dispatch(addUpload(fileData));
    } else {
      const existing = webseriesSeasons[sIdx].episodes[eIdx];
      if (existing?.public_id === fileData.public_id) return;

      const updated = [...webseriesSeasons];
      updated[sIdx].episodes[eIdx] = {
        ...updated[sIdx].episodes[eIdx],
        ...fileData,
      };
      dispatch(setWebseriesSeasons(updated));
      dispatch(
        addUpload({
          season: updated[sIdx].season,
          episodes: updated[sIdx].episodes,
        })
      );
    }
  };

  const handleRemove = (public_id, resourceType, type, sIdx, eIdx) => {
    dispatch(deleteFile({ public_id, file_type: resourceType }));
    dispatch(removeUpload(public_id));

    if (type === "movie") {
      const updated = movieParts.filter((_, i) => i !== sIdx);
      dispatch(setMovieParts(updated));
    } else {
      const updatedSeasons = [...webseriesSeasons];
      updatedSeasons[sIdx].episodes.splice(eIdx, 1);
      if (updatedSeasons[sIdx].episodes.length === 0) {
        updatedSeasons.splice(sIdx, 1);
      }
      dispatch(setWebseriesSeasons(updatedSeasons));
    }
  };

  const handleClearAll = () => {
    dispatch(clearAllUploads());
    dispatch(resetUpload());
    dispatch(
      setMovieParts([
        {
          id: Date.now(),
          subtitle: "",
          url: "",
          public_id: "",
          resourceType: "",
        },
      ])
    );
    dispatch(
      setWebseriesSeasons([
        {
          season: 1,
          episodes: [
            {
              id: Date.now(),
              subtitle: "",
              url: "",
              public_id: "",
              resourceType: "",
            },
          ],
        },
      ])
    );
  };

  const addMoviePart = () => {
    dispatch(
      setMovieParts([
        ...movieParts,
        {
          id: Date.now(),
          subtitle: "",
          url: "",
          public_id: "",
          resourceType: "",
        },
      ])
    );
  };

  const addSeason = () => {
    dispatch(
      setWebseriesSeasons([
        ...webseriesSeasons,
        {
          season: webseriesSeasons.length + 1,
          episodes: [
            {
              id: Date.now(),
              subtitle: "",
              url: "",
              public_id: "",
              resourceType: "",
            },
          ],
        },
      ])
    );
  };

  const addEpisode = (seasonIdx) => {
    const updated = [...webseriesSeasons];
    updated[seasonIdx].episodes.push({
      id: Date.now(),
      subtitle: "",
      url: "",
      public_id: "",
      resourceType: "",
    });
    dispatch(setWebseriesSeasons(updated));
  };

  const handleSubtitleChange = (value, type, sIdx, eIdx) => {
    if (type === "movie") {
      const updated = [...movieParts];
      updated[sIdx] = { ...updated[sIdx], subtitle: value };
      dispatch(setMovieParts(updated));
    } else {
      const updated = [...webseriesSeasons];
      updated[sIdx].episodes[eIdx] = {
        ...updated[sIdx].episodes[eIdx],
        subtitle: value,
      };
      dispatch(setWebseriesSeasons(updated));
    }
  };

  return (
    <Box className="mt-6 space-y-6">
      <Typography variant="h6" className="font-semibold">
        {type === "movie" ? "Movie Parts" : "Web Series Seasons"}
      </Typography>

      {type === "movie" &&
        movieParts.map((part, i) => (
          <Box
            key={part.id}
            className="border p-4 rounded-lg relative space-y-2"
          >
            <TextField
              fullWidth
              label="Subtitle *"
              value={part.subtitle}
              onChange={(e) => handleSubtitleChange(e.target.value, "movie", i)}
              size="small"
            />
            <MediaUpload
              type="media"
              value={part}
              onUpload={(data) =>
                handleUpload({ ...data, subtitle: part.subtitle }, "movie", i)
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
            <IconButton
              className="absolute top-2 right-2"
              onClick={() =>
                handleRemove(
                  part.public_id,
                  part.resourceType,
                  "movie",
                  i,
                  null
                )
              }
            >
              <Delete />
            </IconButton>
          </Box>
        ))}

      {type === "movie" && (
        <Button variant="outlined" onClick={addMoviePart} startIcon={<Add />}>
          Add Part
        </Button>
      )}

      {type === "webseries" &&
        webseriesSeasons.map((season, sIdx) => (
          <Box key={season.season} className="border rounded p-4">
            <Typography variant="subtitle1" className="font-semibold mb-2">
              Season {season.season}
            </Typography>
            {season.episodes.map((ep, eIdx) => (
              <Box
                key={ep.id}
                className="border p-3 rounded mb-4 relative space-y-2"
              >
                <TextField
                  fullWidth
                  label={`Episode ${eIdx + 1} Subtitle *`}
                  value={ep.subtitle}
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
                <IconButton
                  className="absolute top-2 right-2"
                  onClick={() =>
                    handleRemove(
                      ep.public_id,
                      ep.resourceType,
                      "webseries",
                      sIdx,
                      eIdx
                    )
                  }
                >
                  <Delete />
                </IconButton>
              </Box>
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

      {type === "webseries" && (
        <Button
          className="mt-2"
          variant="outlined"
          onClick={addSeason}
          startIcon={<Add />}
        >
          Add Season
        </Button>
      )}

      <Divider className="my-4" />
      <Button variant="text" color="error" onClick={handleClearAll}>
        Cancel All Uploads
      </Button>
    </Box>
  );
};

export default ShowUpload;
