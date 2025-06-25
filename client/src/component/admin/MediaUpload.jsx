import React from "react";
import { Button, CircularProgress, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { CloudUpload, Delete } from "@mui/icons-material";

// Poster Slice
import {
  uploadPoster,
  deletePoster,
  resetPoster,
} from "../../store/show/posterUploadSlice";

// Media Slice
import {
  uploadMediaFile,
  deleteMediaFile,
  clearAllMediaUploads,
} from "../../store/show/mediaUploadSlice";

const MediaUpload = ({ onUpload, type = "poster" }) => {
  const dispatch = useDispatch();

  // Selectors
  const poster = useSelector((state) => state.posterUpload);
  const media = useSelector((state) => state.mediaUpload);

  const current = type === "poster" ? poster : media;
  const isLoading = current.loading;
  const url = current.url;
  const public_id = current.public_id;
  const resourceType = current.resourceType;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const thunk = type === "poster" ? uploadPoster : uploadMediaFile;
    dispatch(thunk(file)).then((res) => {
      if (res.payload?.url) {
        onUpload?.(res.payload); // pass full { url, public_id, resourceType }
      }
    });
  };

  const handleDelete = () => {
    const thunk = type === "poster" ? deletePoster : deleteMediaFile;
    dispatch(thunk({ public_id, resourceType }));
    const reset = type === "poster" ? resetPoster : clearAllMediaUploads;
    dispatch(reset());
    onUpload?.(null); // Optional: notify parent
  };

  return (
    <div className="space-y-2">
      {!url ? (
        <>
          <Button
            variant="outlined"
            component="label"
            startIcon={<CloudUpload />}
            disabled={isLoading}
          >
            {isLoading ? "Uploading..." : "Choose File"}
            <input type="file" hidden onChange={handleFileChange} />
          </Button>
          {isLoading && <CircularProgress size={24} />}
        </>
      ) : (
        <>
          <Typography className="text-sm text-green-600">
            Uploaded successfully
          </Typography>
          {resourceType === "image" && (
            <img src={url} alt="upload preview" className="max-h-40 rounded" />
          )}
          <Button
            variant="text"
            color="error"
            startIcon={<Delete />}
            onClick={handleDelete}
          >
            Delete
          </Button>
        </>
      )}
    </div>
  );
};

export default MediaUpload;
