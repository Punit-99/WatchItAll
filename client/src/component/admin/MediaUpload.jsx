import { Button, CircularProgress, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { CloudUpload, Delete } from "@mui/icons-material";

// Media Slice only
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
        onUpload?.(res.payload); // Notify parent
      }
    });
  };

  const handleDelete = () => {
    dispatch(deleteMediaFile({ public_id, resourceType }));
    onDelete?.(public_id);
  };

  return (
    <div className="space-y-2">
      {!url ? (
        <>
          <Button
            variant="outlined"
            component="label"
            startIcon={<CloudUpload />}
            disabled={loading}
          >
            {loading ? "Uploading..." : "Choose File"}
            <input type="file" hidden onChange={handleFileChange} />
          </Button>
          {loading && <CircularProgress size={24} />}
        </>
      ) : (
        <>
          <Typography className="text-sm text-green-600">
            ✅ Uploaded
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

// compoent to upload media and delete media
// it can be used to delete all the media at once when user canclke the operation
