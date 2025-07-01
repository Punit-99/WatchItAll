import React, { useState } from "react";
import {
  Box,
  Paper,
  Button,
  Stepper,
  Step,
  StepLabel,
  Alert,
} from "@mui/material";

import ShowDetails from "./showUpload/ShowDetail";
import Tags from "./showUpload/Tags";
import ShowUpload from "./showUpload/ShowUpload";
import { useDispatch, useSelector } from "react-redux";
import Preview from "./showUpload/Preview";
import { submitShow } from "../../store/showApi/showApiSlice";
import { showSnackbar } from "../../store/toast/snackbarSlice";

const steps = ["Type & Details", "Tags", "Upload", "Preview"];

const NewShow = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [errors, setErrors] = useState([]);
  const show = useSelector((state) => state.show);

  const isValidURL = (url) => typeof url === "string" && url.startsWith("http");
  const dispatch = useDispatch();
  const validateStep = (step) => {
    const newErrors = [];

    if (step === 0) {
      const { type, title, description, releaseDate, poster } = show;

      if (!(type === "movie" || type === "webseries")) {
        newErrors.push("Type must be either 'Movie' or 'Web Series'.");
      }
      if (!title.trim()) newErrors.push("Title is required.");
      if (!description.trim()) newErrors.push("Description is required.");
      if (!releaseDate) newErrors.push("Release Date is required.");
      if (
        !poster?.url ||
        !poster.public_id ||
        poster.resourceType !== "image"
      ) {
        newErrors.push("Valid poster must be uploaded.");
      }

      setErrors(newErrors);
      return newErrors.length === 0;
    }

    if (step === 1) {
      const { genres, languages } = show;

      if (!genres.length) {
        newErrors.push("At least one genres must be selected.");
      }
      if (!languages.length) {
        newErrors.push("At least one languages must be selected.");
      }

      setErrors(newErrors);
      return newErrors.length === 0;
    }

    if (step === 2) {
      if (show.type === "movie") {
        if (!show.movieParts.length) {
          newErrors.push("At least one movie part must be added.");
        } else {
          show.movieParts.forEach((part, idx) => {
            if (!part.subtitle.trim())
              newErrors.push(`Subtitle missing in Part ${idx + 1}`);
            if (!isValidURL(part.url))
              newErrors.push(`Upload missing for Part ${idx + 1}`);
          });
        }
      } else {
        if (!show.webseriesSeasons.length) {
          newErrors.push("At least one season is required.");
        } else {
          show.webseriesSeasons.forEach((season, sIdx) => {
            if (!season.episodes.length) {
              newErrors.push(`Season ${season.season} has no episodes.`);
            } else {
              season.episodes.forEach((ep, eIdx) => {
                if (!ep.subtitle.trim())
                  newErrors.push(
                    `Subtitle missing in Season ${season.season}, Episode ${
                      eIdx + 1
                    }`
                  );
                if (!isValidURL(ep.url))
                  newErrors.push(
                    `Upload missing in Season ${season.season}, Episode ${
                      eIdx + 1
                    }`
                  );
              });
            }
          });
        }
      }

      setErrors(newErrors);
      return newErrors.length === 0;
    }

    return false;
  };

  const handleNext = () => {
    // const isValid = validateStep(activeStep);
    // if (!isValid) return;

    // setErrors([]);

    if (activeStep < steps.length - 1) {
      setActiveStep((prev) => prev + 1);
    } else {
      dispatch(submitShow(show)).then(() => {
        dispatch(
          showSnackbar({ message: "Show uploaded!", severity: "success" })
        );
      });

      console.log("Final Show JSON:", show);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
    setErrors([]);
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return <ShowDetails />;
      case 1:
        return <Tags />;
      case 2:
        return <ShowUpload />;
      case 3:
        return <Preview />;
      default:
        return null;
    }
  };

  return (
    <div>
      <Paper elevation={3} className="p-6 rounded-xl h-full">
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box mt={4}>{renderStepContent(activeStep)}</Box>

        {/* Error Section */}
        {errors.length > 0 && (
          <Box mt={3}>
            {errors.map((err, i) => (
              <Alert key={i} severity="error" sx={{ mb: 1 }}>
                {err}
              </Alert>
            ))}
          </Box>
        )}

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
  );
};

export default NewShow;
