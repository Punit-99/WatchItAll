import { Breadcrumbs, Typography, useMediaQuery } from "@mui/material";

const BreadCrumbs = ({ activePage }) => {
  const isMobile = useMediaQuery("(max-width:640px)");

  return (
    <>
      {isMobile ? (
        <Typography>{activePage}</Typography>
      ) : (
        <Breadcrumbs separator=">" sx={{ marginBottom: "0.6rem" }}>
          <Typography color="inherit">Dashboard</Typography>
          <Typography color="text.primary">{activePage}</Typography>
        </Breadcrumbs>
      )}
    </>
  );
};

export default BreadCrumbs;
