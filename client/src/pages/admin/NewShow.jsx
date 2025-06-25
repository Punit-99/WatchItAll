import { useState } from "react";
import { Tabs, Tab, Box, Paper, Typography, Button } from "@mui/material";

import ShowDetails from "./showUpload/ShowDetail";
import Tags from "./showUpload/Tags";
import ShowUpload from "./showUpload/ShowUpload";
import { useSelector } from "react-redux";

const NewShow = () => {
  const [tab, setTab] = useState(0);
  const tabs = ["Type & Details", "Tags", "Upload"];

  const show = useSelector((state) => state.show); // Assumes full show form is here
  const posterUrl = useSelector((state) => state.posterUpload.url);

  return (
    <div className="flex h-screen p-4 gap-6">
      {/* Left: Live Preview */}
      <div className="w-1/2">
        <Paper elevation={3} className="p-6 rounded-xl">
          <Typography variant="h5" className="mb-4 font-bold">
            Live Preview
          </Typography>
          <Box className="space-y-3">
            <Typography variant="h6">{show.title || "Title Here"}</Typography>
            <Typography className="text-gray-500 italic">
              {show.description || "Description..."}
            </Typography>
            <Typography>
              <b>Type:</b> {show.type}
            </Typography>
            <Typography>
              <b>Genres:</b> {show.genres?.join(", ")}
            </Typography>
            <Typography>
              <b>Languages:</b> {show.language?.join(", ")}
            </Typography>
            <Typography>
              <b>Release Date:</b> {show.releaseDate}
            </Typography>
            {show.posterUrl && (
              <img
                src={show.posterUrl}
                alt="Poster"
                className="mt-2 rounded max-h-64"
              />
            )}
          </Box>
        </Paper>
      </div>

      {/* Right: Form */}
      <div className="w-1/2">
        <Paper elevation={3} className="p-6 rounded-xl">
          <Tabs
            value={tab}
            onChange={(e, val) => setTab(val)}
            variant="fullWidth"
          >
            {tabs.map((label, idx) => (
              <Tab key={idx} label={label} />
            ))}
          </Tabs>

          <Box className="mt-6">
            {tab === 0 && <ShowDetails />}
            {tab === 1 && <Tags />}
            {tab === 2 && <ShowUpload />}
          </Box>

          <div className="flex justify-between mt-10">
            <Button
              variant="outlined"
              disabled={tab === 0}
              onClick={() => setTab((prev) => prev - 1)}
            >
              Back
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                if (tab < tabs.length - 1) {
                  setTab((prev) => prev + 1);
                } else {
                  // ✅ Prepare final data structure for submission
                  const finalData = {
                    ...show,
                    uploads: show.uploads,
                    poster: posterUrl,
                  };

                  console.log("Final Show JSON:", finalData);

                  // Later: send finalData to backend
                }
              }}
            >
              {tab === tabs.length - 1 ? "Submit" : "Next"}
            </Button>
          </div>
        </Paper>
      </div>
    </div>
  );
};

export default NewShow;
