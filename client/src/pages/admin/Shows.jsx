import { Box, Grid, Typography, Card, CardContent, CardMedia, Chip, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAllShows } from "../../store/showApi/showApiSlice";

const Shows = () => {
  const dispatch = useDispatch();
  const { shows, loading, error } = useSelector((state) => state.showApi);

  useEffect(() => {
    dispatch(fetchAllShows());
  }, [dispatch]);

  if (loading) return <Box p={4}><CircularProgress /></Box>;
  if (error) return <Typography color="error">Error: {error}</Typography>;

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>All Shows</Typography>
      <Grid container spacing={3}>
        {shows.map((show) => (
          <Grid item key={show._id} xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ height: "100%" }}>
              <CardMedia
                component="img"
                height="180"
                image={show.poster || "/placeholder.jpg"}
                alt={show.title}
              />
              <CardContent>
                <Typography variant="h6" noWrap>{show.title}</Typography>
                <Typography variant="body2" color="text.secondary" noWrap>
                  {show.description}
                </Typography>
                <Box mt={1} display="flex" flexWrap="wrap" gap={0.5}>
                  {show.genres.map((g, i) => <Chip key={i} label={g} size="small" />)}
                  <Chip label={show.language} size="small" color="secondary" />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Shows;
