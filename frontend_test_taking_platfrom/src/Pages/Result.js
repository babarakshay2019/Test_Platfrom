import React from "react";
import { Box, Typography, Button, CircularProgress, Divider } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate, useLocation } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: "#004d4b",
    },
    secondary: {
      main: "#f0f8ff",
    },
  },
  typography: {
    fontFamily: "Arial, sans-serif",
    h5: {
      fontSize: "30px",
      fontWeight: 600,
    },
    h6: {
      fontSize: "20px",
      fontWeight: 600,
    },
    body2: {
      fontSize: "18px",
      color: "#555",
    },
  },
});

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { result } = location.state || {};
  console.log(result, "results");
  console.log(location.state?.results);

  const scorePercentage = (50 / 100) * 100;

  let progressColor;
  let feedbackMessage;

  if (scorePercentage >= 80) {
    progressColor = "#28a745";
    feedbackMessage = "Excellent work! Keep it up!";
  } else if (scorePercentage >= 50) {
    progressColor = "#ffc107";
    feedbackMessage = "Good job, but there’s room for improvement.";
  } else if (scorePercentage >= 30) {
    progressColor = "#007bff";
    feedbackMessage = "Needs improvement. Keep practicing!";
  } else {
    progressColor = "#dc3545";
    feedbackMessage = "Try harder next time. You can do it!";
  }

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
          maxWidth: "600px",
          margin: "auto",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#fff",
          overflow: "visible",
        }}
      >
        <Typography variant="h5" sx={{ color: "#004d4b", marginBottom: "20px" }}>
          Test Results
        </Typography>
        <Box
          sx={{
            position: "relative",
            marginBottom: "30px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "200px",
            height: "200px",
          }}
        >
          <CircularProgress
            variant="determinate"
            value={100}
            size={160}
            thickness={8}
            sx={{
              color: "#d3d3d3",
              position: "absolute",
            }}
          />
          <CircularProgress
            variant="determinate"
            value={scorePercentage}
            size={160}
            thickness={8}
            sx={{
              color: progressColor,
            }}
          />
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontSize: "40px",
              fontWeight: "bold",
              color: "#555",
            }}
          >
            {`${scorePercentage.toFixed(0)}%`}
          </Box>
        </Box>
        <Divider sx={{ marginBottom: "20px", width: "100%" }} />
        <Typography variant="h6" sx={{ marginBottom: "12px" }}>
          Feedback:
        </Typography>
        <Typography variant="body2" sx={{ marginBottom: "30px" }}>
          {feedbackMessage}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/dashboard")}
          sx={{
            padding: "12px 24px",
            fontSize: "16px",
            borderRadius: "8px",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "#003f3b",
              boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.15)",
            },
          }}
        >
          Return to Dashboard
        </Button>
      </Box>
    </ThemeProvider>
  );
};

export default Results;
