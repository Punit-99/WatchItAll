import {
  Box,
  TextField,
  Typography,
  Stack,
  Card,
  CardActionArea,
} from "@mui/material";
import MediaUpload from "../../../component/admin/MediaUpload";
import { useDispatch, useSelector } from "react-redux";
import { setShowDetails } from "../../../store/show/showSlice";

const ShowDetails = () => {
  const dispatch = useDispatch();
  const { type, title, description, releaseDate, poster } = useSelector(
    (state) => state.show
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setShowDetails({ name, value }));
  };

  const handlePosterUpload = (data) => {
    dispatch(setShowDetails({ name: "poster", value: data })); // full object
  };

  return (
    <Stack spacing={3} mt={4}>
      {/* Title */}
      <TextField
        label="Main Title"
        name="title"
        value={title}
        onChange={handleChange}
        required
        fullWidth
        size="small"
      />

      {/* Description */}
      <TextField
        label="Description"
        name="description"
        value={description}
        onChange={handleChange}
        required
        fullWidth
        multiline
        rows={3}
        size="small"
      />

      {/* Release Date */}
      <TextField
        label="Release Date"
        name="releaseDate"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={releaseDate}
        onChange={handleChange}
        required
        fullWidth
        size="small"
      />
      {/* Show Type Selector */}
      <Box>
        <Typography variant="h6" gutterBottom>
          Choose Show Type *
        </Typography>
        <Box display="flex" gap={2}>
          {["movie", "webseries"].map((opt) => (
            <Card
              key={opt}
              variant="outlined"
              sx={{
                borderColor: type === opt ? "primary.main" : "grey.400",
                flex: "1 1 0",
              }}
            >
              <CardActionArea
                onClick={() =>
                  dispatch(setShowDetails({ name: "type", value: opt }))
                }
                sx={{ p: 2 }}
              >
                <Typography
                  align="center"
                  variant="body1"
                  fontWeight="medium"
                  textTransform="capitalize"
                >
                  {opt}
                </Typography>
              </CardActionArea>
            </Card>
          ))}
        </Box>
      </Box>

      {/* Poster Upload */}
      <Box>
        <Typography variant="subtitle1" gutterBottom>
          Upload Poster *
        </Typography>
        <MediaUpload
          type="poster"
          value={poster}
          onUpload={handlePosterUpload}
          onDelete={() =>
            handlePosterUpload({ url: "", public_id: "", resourceType: "" })
          }
        />
      </Box>
    </Stack>
  );
};

export default ShowDetails;
