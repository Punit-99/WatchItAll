import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";

import ShowDetails from "./showUpload/ShowDetail";
import Tags from "./showUpload/Tags";
import ShowUpload from "./showUpload/ShowUpload";
import { useSelector } from "react-redux";

const steps = ["Type & Details", "Tags", "Upload"];

const NewShow = () => {
  const [activeStep, setActiveStep] = useState(0);
  const show = useSelector((state) => state.show);

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prev) => prev + 1);
    } else {
      const finalData = { ...show };
      console.log("Final Show JSON:", finalData);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return <ShowDetails />;
      case 1:
        return <Tags />;
      case 2:
        return <ShowUpload />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen p-4 gap-6">
      {/* Left: Live Preview */}
      {/* <div className="w-1/2">
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
              <b>Languages:</b> {show.languages?.join(", ")}
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
      </div> */}

      {/* Right: Horizontal Stepper Form */}
      <div className="w-full">
        <Paper elevation={3} className="p-6 rounded-xl h-full">
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => (
              <Step key={index}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <Box mt={4}>{renderStepContent(activeStep)}</Box>

          <Box mt={6} display="flex" justifyContent="space-between">
            <Button
              variant="outlined"
              disabled={activeStep === 0}
              onClick={handleBack}
            >
              Back
            </Button>
            <Button variant="contained" onClick={handleNext}>
              {activeStep === steps.length - 1 ? "Submit" : "Next"}
            </Button>
          </Box>
        </Paper>
      </div>
    </div>
  );
};

export default NewShow;
