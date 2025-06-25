import React from "react";
import { Box, TextField, Typography } from "@mui/material";
import MediaUpload from "../../../component/admin/MediaUpload";
import { useDispatch, useSelector } from "react-redux";
import { setShowDetails } from "../../../store/show/showSlice"; // your slice

const ShowDetails = () => {
  const dispatch = useDispatch();
  const { type, title, description, releaseDate, posterUrl } = useSelector(
    (state) => state.show
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setShowDetails({ name, value }));
  };

  const handlePosterUpload = (url) => {
    dispatch(setShowDetails({ name: "posterUrl", value: url }));
  };

  return (
    <Box className="space-y-6 mt-6">
      <Typography variant="h6" className="font-semibold">
        Choose Show Type *
      </Typography>
      <Box className="flex gap-6">
        {["movie", "webseries"].map((opt) => (
          <Box
            key={opt}
            onClick={() =>
              dispatch(setShowDetails({ name: "type", value: opt }))
            }
            className={`cursor-pointer px-6 py-4 rounded-lg border-2 shadow-sm transition-all w-40 text-center ${
              type === opt
                ? "border-blue-500 bg-lime-900"
                : "border-gray-300 bg-lime-700"
            }`}
          >
            <Typography variant="body1" className="capitalize">
              {opt}
            </Typography>
          </Box>
        ))}
      </Box>

      <TextField
        label="Main Title"
        name="title"
        value={title}
        onChange={handleChange}
        fullWidth
        size="small"
      />
      <TextField
        label="Description"
        name="description"
        value={description}
        onChange={handleChange}
        fullWidth
        multiline
        rows={3}
        size="small"
      />
      <TextField
        label="Release Date"
        name="releaseDate"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={releaseDate}
        onChange={handleChange}
        fullWidth
        size="small"
      />
      <div>
        <Typography className="mb-2 font-medium text-gray-600">
          Upload Poster
        </Typography>
        <MediaUpload onUpload={handlePosterUpload} />
        {posterUrl && (
          <img
            src={posterUrl}
            alt="poster"
            className="mt-3 max-h-48 rounded shadow"
          />
        )}
      </div>
    </Box>
  );
};

export default ShowDetails;
