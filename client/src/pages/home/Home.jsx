import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen text-2xl ">
      <Button variant="contained" onClick={() => navigate("/admin")}>
        Go to Admin
      </Button>
    </div>
  );
};

export default Home;
