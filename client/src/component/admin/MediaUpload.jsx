import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Skeleton,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { CloudUpload, Delete } from "@mui/icons-material";
import {
  uploadMediaFile,
  deleteMediaFile,
} from "../../store/show/mediaUploadSlice";

const MediaUpload = ({ onUpload, onDelete, value = {} }) => {
  const dispatch = useDispatch();
  const { url, public_id, resourceType } = value;
  const loading = useSelector((state) => state.mediaUpload.loading);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    dispatch(uploadMediaFile(file)).then((res) => {
      if (res.payload?.url) {
        onUpload?.(res.payload);
      }
    });
  };

  const handleDelete = () => {
    dispatch(deleteMediaFile({ public_id, resourceType }));
    onDelete?.(public_id);
  };

  return (
    <Box>
      {!url && !loading && (
        <Button
          variant="outlined"
          component="label"
          startIcon={<CloudUpload />}
        >
          Choose File
          <input type="file" hidden onChange={handleFileChange} />
        </Button>
      )}

      {loading && (
        <Box
          sx={{
            border: "2px dashed #aaa",
            borderRadius: 2,
            padding: 2,
            textAlign: "center",
            position: "relative",
          }}
        >
          <Skeleton variant="rectangular" width="100%" height={180} />
          <CircularProgress
            size={32}
            sx={{
              position: "absolute",
              top: "calc(50% - 16px)",
              left: "calc(50% - 16px)",
            }}
          />
          <Typography variant="body2" mt={2}>
            Uploading...
          </Typography>
        </Box>
      )}

      {url && (
        <Box
          sx={{
            border: "2px dashed #4caf50",
            borderRadius: 2,
            position: "relative",
            overflow: "hidden",
            mt: 1,
            maxHeight: 240,
          }}
        >
          <IconButton
            onClick={handleDelete}
            sx={{
              position: "absolute",
              top: 6,
              right: 6,
              bgcolor: "rgba(0,0,0,0.6)",
              color: "white",
              "&:hover": { bgcolor: "rgba(255,0,0,0.8)" },
              zIndex: 1,
            }}
          >
            <Delete fontSize="small" />
          </IconButton>

          {resourceType === "image" ? (
            <img
              src={url}
              alt="Upload Preview"
              style={{ width: "100%", display: "block", borderRadius: 8 }}
            />
          ) : resourceType === "video" ? (
            <video
              src={url}
              controls
              style={{ width: "100%", display: "block", borderRadius: 8 }}
            />
          ) : (
            <Typography sx={{ p: 2 }}>Unsupported format</Typography>
          )}
        </Box>
      )}
    </Box>
  );
};

export default MediaUpload;

// compoent to upload media and delete media
// it can be used to delete all the media at once when user canclke the operation
