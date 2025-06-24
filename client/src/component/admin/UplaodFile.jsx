import React, { useEffect } from "react";
import { Box, Skeleton, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { uploadFile } from "../../store/upload/fileUpload";

const UploadFile = ({ onUpload }) => {
  const dispatch = useDispatch();
  const { loading, url, error } = useSelector((state) => state.upload);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    dispatch(uploadFile(file));
  };

  useEffect(() => {
    if (url && onUpload) {
      onUpload(url);
    }
  }, [url, onUpload]);

  return (
    <Box className="border-2 border-dashed border-gray-400 rounded-lg p-6 text-center cursor-pointer">
      <label className="cursor-pointer">
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

      {error && (
        <Typography className="text-red-500 mt-2">Upload failed!</Typography>
      )}
    </Box>
  );
};

export default UploadFile;
