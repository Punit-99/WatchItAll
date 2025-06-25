import React, { useState } from "react";
import {
  Tabs,
  Tab,
  Box,
  Paper,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import UploadFile from "../../component/admin/Upload";

const NewShow = () => {
  const [tab, setTab] = useState(0);
  const [form, setForm] = useState({
    type: "movie",
    title: "",
    description: "",
    genres: [],
    language: [],
    releaseDate: "",
    posterUrl: "", // store uploaded URL
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleUploadSuccess = (url) => {
    setForm((prev) => ({ ...prev, posterUrl: url }));
  };

  const tabs = [
    { label: "Type" },
    { label: "Details" },
    { label: "Tags" },
    { label: "Upload" },
  ];

  return (
    <div className="flex h-screen  p-4 gap-6">
      {/* Live Preview */}
      <div className="w-1/2">
        <Paper elevation={3} className="p-6 rounded-xl">
          <Typography variant="h5" className="mb-4 font-bold">
            Live Preview
          </Typography>
          <Box className="space-y-3">
            <Typography variant="h6">{form.title || "Title Here"}</Typography>
            <Typography className="text-gray-500 italic">
              {form.description || "Description..."}
            </Typography>
            <Typography>
              <b>Type:</b> {form.type}
            </Typography>
            <Typography>
              <b>Genres:</b> {form.genres.join(", ")}
            </Typography>
            <Typography>
              <b>Language:</b> {form.language.join(", ")}
            </Typography>
            <Typography>
              <b>Release Date:</b> {form.releaseDate}
            </Typography>
            {form.posterUrl && (
              <img
                src={form.posterUrl}
                alt="Poster"
                className="mt-2 rounded max-h-64"
              />
            )}
          </Box>
        </Paper>
      </div>

      {/* Form */}
      <div className="w-1/2">
        <Paper elevation={3} className="p-6 rounded-xl">
          <Tabs
            value={tab}
            onChange={(e, val) => setTab(val)}
            variant="fullWidth"
          >
            {tabs.map((t, i) => (
              <Tab key={i} label={t.label} />
            ))}
          </Tabs>

          <div className="relative min-h-[400px]">
            {/* Tab 1 */}
            {tab === 0 && (
              <Box className="mt-6 flex justify-around">
                {["movie", "webseries"].map((type) => (
                  <Box
                    key={type}
                    onClick={() => setForm({ ...form, type })}
                    className={`cursor-pointer p-8 rounded-xl shadow-md w-40 text-center border-2 transition-all 
                      ${
                        form.type === type
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-300"
                      }`}
                  >
                    <Typography variant="h6">{type.toUpperCase()}</Typography>
                  </Box>
                ))}
              </Box>
            )}

            {/* Tab 2 */}
            {tab === 1 && (
              <Box className="space-y-4 mt-6">
                <TextField
                  name="title"
                  label="Show Title *"
                  value={form.title}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                />
                <TextField
                  name="description"
                  label="Description *"
                  value={form.description}
                  onChange={handleChange}
                  multiline
                  rows={3}
                  fullWidth
                  size="small"
                />
                <TextField
                  name="releaseDate"
                  label="Release Date *"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={form.releaseDate}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                />
              </Box>
            )}

            {/* Tab 3 */}
            {tab === 2 && (
              <Box className="space-y-4 mt-6">
                <TextField
                  name="genres"
                  label="Genres * (comma separated)"
                  value={form.genres.join(", ")}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      genres: e.target.value.split(",").map((g) => g.trim()),
                    })
                  }
                  fullWidth
                  size="small"
                />
                <TextField
                  name="language"
                  label="Languages * (comma separated)"
                  value={form.language.join(", ")}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      language: e.target.value.split(",").map((l) => l.trim()),
                    })
                  }
                  fullWidth
                  size="small"
                />
              </Box>
            )}

            {/* Tab 4 */}
            {tab === 3 && (
              <Box className="mt-6">
                <UploadFile onUpload={handleUploadSuccess} />
              </Box>
            )}
          </div>

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
                if (tab < 3) setTab((prev) => prev + 1);
                else alert("Submit functionality coming soon");
              }}
            >
              {tab === 3 ? "Submit" : "Next"}
            </Button>
          </div>
        </Paper>
      </div>
    </div>
  );
};

export default NewShow;
