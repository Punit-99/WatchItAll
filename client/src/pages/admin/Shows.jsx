import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Chip,
  CircularProgress,
  IconButton,
  Drawer,
  Stack,
  Divider,
  Button,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchAllShows } from "../../store/showApi/showApiSlice";

const Shows = () => {
  const dispatch = useDispatch();
  const { shows, loading, error } = useSelector((state) => state.showApi);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedShow, setSelectedShow] = useState(null);

  useEffect(() => {
    dispatch(fetchAllShows());
  }, [dispatch]);

  const handlePreview = (show) => {
    setSelectedShow(show);
    setOpenDrawer(true);
  };

  if (loading)
    return (
      <Box p={4}>
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Typography color="error" p={4}>
        Error: {error}
      </Typography>
    );

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        All Shows
      </Typography>
      <Grid container spacing={3}>
        {shows.map((show) => {
          const descriptionPreview = show.description.slice(0, 100) + "...";

          return (
            <Grid item key={show._id} xs={12} sm={6} md={4} lg={3}>
              <Card
                sx={{
                  maxWidth: 345,
                  height: 420,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: 4,
                  borderRadius: 2,
                  overflow: "hidden",
                  transition: "transform 0.2s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.02)",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  image={show.poster || "/placeholder.jpg"}
                  alt={show.title}
                  sx={{
                    height: 180,
                    width: "100%",
                    objectFit: "cover",
                  }}
                />
                <CardContent
                  sx={{ flex: 1, display: "flex", flexDirection: "column" }}
                >
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ mb: 1 }}
                  >
                    <Typography
                      variant="subtitle1"
                      fontWeight={600}
                      sx={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {show.title}
                    </Typography>
                    <Stack direction="row" spacing={1}>
                      <IconButton
                        size="small"
                        onClick={() => handlePreview(show)}
                      >
                        <VisibilityIcon fontSize="small" />
                      </IconButton>

                      <IconButton size="small">
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Stack>
                  </Stack>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      overflow: "hidden",
                    }}
                  >
                    {descriptionPreview || "No description"}
                  </Typography>

                  <Box mt="auto">
                    <Typography variant="caption" fontWeight={600}>
                      Genres:
                    </Typography>
                    <Box
                      display="flex"
                      flexWrap="wrap"
                      gap={0.5}
                      mb={1}
                      mt={"0.5rem"}
                    >
                      {show.genres.map((g, i) => (
                        <Chip key={i} label={g} size="small" />
                      ))}
                    </Box>
                    <Typography variant="caption" fontWeight={600}>
                      Languages:
                    </Typography>
                    <Box display="flex" flexWrap="wrap" gap={0.5} mt={"0.5rem"}>
                      {show.languages.map((l, i) => (
                        <Chip
                          key={i}
                          label={l}
                          size="small"
                          color="secondary"
                        />
                      ))}
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* === Preview Drawer === */}
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        PaperProps={{ sx: { width: { xs: "100%", sm: 400, md: 500 }, p: 3 } }}
      >
        {selectedShow && (
          <>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              {selectedShow.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {selectedShow.description}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Release Date:{" "}
              {new Date(selectedShow.releaseDate).toLocaleDateString()}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography variant="subtitle2" gutterBottom>
              Genres
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" mb={2}>
              {selectedShow.genres.map((g, i) => (
                <Chip key={i} label={g} size="small" />
              ))}
            </Stack>

            <Typography variant="subtitle2" gutterBottom>
              Languages
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" mb={2}>
              {selectedShow.languages.map((g, i) => (
                <Chip key={i} label={g} size="small" />
              ))}
            </Stack>

            {selectedShow.parts?.length > 0 && (
              <>
                <Typography variant="subtitle2" gutterBottom>
                  Parts
                </Typography>
                <Stack spacing={1}>
                  {selectedShow.parts.map((part, index) => (
                    <Box key={index}>
                      <Typography variant="body2" fontWeight={500}>
                        {part.partTitle}
                      </Typography>
                      <Box
                        component="video"
                        src={part.videoUrl}
                        controls
                        sx={{
                          mt: 1,
                          width: "100%",
                          borderRadius: 1,
                        }}
                      />
                    </Box>
                  ))}
                </Stack>
              </>
            )}

            {selectedShow.seasons?.length > 0 && (
              <>
                <Typography variant="subtitle2" gutterBottom>
                  Seasons
                </Typography>
                <Stack spacing={2}>
                  {selectedShow.seasons.map((season, sIdx) => (
                    <Box key={sIdx}>
                      <Typography fontWeight={500}>
                        Season {season.seasonNumber}
                      </Typography>
                      {season.episodes.map((ep, eIdx) => (
                        <Box key={eIdx} sx={{ mt: 1 }}>
                          <Typography variant="body2">
                            {ep.episodeTitle}
                          </Typography>
                          <Box
                            component="video"
                            src={ep.videoUrl}
                            controls
                            sx={{ width: "100%", borderRadius: 1 }}
                          />
                        </Box>
                      ))}
                    </Box>
                  ))}
                </Stack>
              </>
            )}
          </>
        )}
      </Drawer>
    </Box>
  );
};

export default Shows;
