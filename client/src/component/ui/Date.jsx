import { Box, Typography } from "@mui/material";
import DateRangeRoundedIcon from "@mui/icons-material/DateRangeRounded";

const DateComponent = () => {
  const today = new Date();

  const options = { month: "long" };
  const month = today.toLocaleString("en-US", options);
  const date = today.getDate();
  const year = today.getFullYear();

  return (
    <Box
      sx={{
        borderRadius: "9px",
        padding: "0.6rem 0.6rem",
        display: "flex",
        alignItems: "center",
        gap: 0.5,
        width: "fit-content",
        fontSize: "0.8rem",
        border: 1,
      }}
    >
      <DateRangeRoundedIcon fontSize="small" color="primary" />
      <Typography variant="body2">
        {month} {date}, {year}
      </Typography>
    </Box>
  );
};

export default DateComponent;
