import React, { useEffect } from "react";
import { Box, Skeleton, Typography, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  uploadFile,
  deleteFile,
  resetUpload,
} from "../../store/upload/fileUploadSlice";
import CloseIcon from "@mui/icons-material/Close";

const UploadFile = ({ onUpload }) => {
  const dispatch = useDispatch();
  const { loading, url, error, public_id, resourceType } = useSelector(
    (state) => state.upload
  );

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    dispatch(uploadFile(file));
  };

  const handleDelete = () => {

    if (public_id && resourceType) {
      dispatch(deleteFile({ public_id, file_type: resourceType }));
    }

    dispatch(resetUpload());
  };

  useEffect(() => {
    if (url && onUpload) {
      onUpload(url);
    }
  }, [url, onUpload]);

  return (
    <Box className="relative border-2 border-dashed border-gray-400 rounded-lg p-6 text-center cursor-pointer">
      <label
        className={`${
          loading || url ? "pointer-events-none" : "cursor-pointer"
        }`}
      >
        {loading ? (
          <Skeleton variant="rectangular" width="100%" height={200} />
        ) : url ? (
          <img
            src={url}
            alt="Uploaded Preview"
            className="mx-auto max-h-48 rounded"
          />
        ) : (
          <Typography className="text-gray-500">
            Click to Upload File
          </Typography>
        )}
        <input type="file" onChange={handleFileChange} className="hidden" />
      </label>

      {url && (
        <IconButton
          size="small"
          onClick={handleDelete}
          className="absolute top-2 right-2 bg-white shadow"
        >
          <CloseIcon />
        </IconButton>
      )}

      {error && (
        <Typography className="text-red-500 mt-2">Upload failed!</Typography>
      )}
    </Box>
  );
};

export default UploadFile;
