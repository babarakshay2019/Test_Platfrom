import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Divider,
  Card,
  CardContent,
  Radio,
  RadioGroup,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useParams, useLocation } from "react-router-dom";
import { getQuestionTest } from "../services/api";

const theme = createTheme({
  palette: {
    primary: {
      main: "#004d4b",
    },
    secondary: {
      main: "#e9f9ed",
    },
  },
  typography: {
    fontFamily: "Arial, sans-serif",
  },
});

const ViewTest = () => {
  const navigate = useNavigate();
  const { startTestId } = useParams();
  const location = useLocation();
  const status = location.state || {};

  const test = {
    id: 1,
    test_subject: "Maths",
    test_type: "Completed",
    Question: [
      {
        id: 1,
        question: "What is the capital of France?",
        type: "mcq",
        options: ["Paris", "London", "Rome", "Berlin"],
        answer: "Paris",
        submitted_answer: "Paris",
        explanation: "Paris is the capital of France.",
      },
      {
        id: 2,
        question: "Is water boiling at 100°C? (True/False)",
        type: "truefalse",
        answer: "True",
        submitted_answer: "False",
        explanation:
          "Water boils at 100°C under standard atmospheric conditions.",
      },
      {
        id: 3,
        question: "Fill in the blank: The chemical symbol for gold is _______.",
        type: "fillblank",
        answer: "Au",
        submitted_answer: "Ag",
        explanation: "The chemical symbol for gold is Au.",
      },
    ],
  };

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchTestDetails = async () => {
    try {
      const response = await getQuestionTest(startTestId);
      console.log(response);
    } catch (error) {
      console.error("Error fetching tests:", error);
    }
  };

  useEffect(() => {
    if (status === "startTest") {
      fetchTestDetails();
    }
  }, [status]);

  const handleNext = () => {
    if (currentQuestionIndex < test.Question.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowExplanation(false);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setShowExplanation(false);
    }
  };

  const handleSubmitTest = () => {
    console.log("Test Submitted");
  };

  const toggleExplanation = () => {
    setShowExplanation(!showExplanation);
  };

  const handleReturnToDashboard = () => {
    navigate(`/dashboard`);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ padding: "16px", borderRadius: "12px" }}>
        <Box sx={{ marginBottom: "16px", textAlign: "center" }}>
          <Typography
            variant="h5"
            sx={{ color: "#004d4b", fontWeight: "bold", fontSize: "24px" }}
          >
            Test Details
          </Typography>
        </Box>

        <Box sx={{ marginBottom: "16px", width: "100%" }} mt={10}>
          <Typography sx={{ fontSize: "18px", fontWeight: "bold" }}>
            Question {currentQuestionIndex + 1} of {test.Question.length}
          </Typography>
          <Divider sx={{ margin: "8px 0" }} />
          <Card
            sx={{
              padding: "20px",
              boxShadow: 3,
              borderRadius: "15px",
              width: "100%",
              position: "relative",
              background: "linear-gradient(145deg, #004d4b, #8fc0a9)",
              color: "#fff",
              marginTop: "30px",
            }}
          >
            <CardContent>
              <Typography variant="h6" sx={{ marginBottom: "8px" }}>
                {test.Question[currentQuestionIndex].question}
              </Typography>

              {test.test_type === "Completed" && (
                <Button
                  variant="outlined"
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    fontSize: "14px",
                    color: "#004d4b",
                    borderColor: "#004d4b",
                  }}
                  onClick={toggleExplanation}
                >
                  {showExplanation ? "Hide Explanation" : "Show Explanation"}
                </Button>
              )}

              {test.Question[currentQuestionIndex].type === "mcq" && (
                <RadioGroup
                  value={test.Question[currentQuestionIndex].submitted_answer}
                >
                  {test.Question[currentQuestionIndex].options.map(
                    (option, index) => (
                      <FormControlLabel
                        key={index}
                        value={option}
                        control={<Radio />}
                        label={option}
                        disabled
                        sx={{
                          marginBottom: "8px",
                          color: "#fff",
                        }}
                      />
                    )
                  )}
                </RadioGroup>
              )}

              {test.Question[currentQuestionIndex].type === "truefalse" && (
                <RadioGroup
                  value={test.Question[currentQuestionIndex].submitted_answer}
                >
                  <FormControlLabel
                    value="True"
                    control={<Radio />}
                    label="True"
                    disabled
                    sx={{ color: "#fff" }}
                  />
                  <FormControlLabel
                    value="False"
                    control={<Radio />}
                    label="False"
                    disabled
                    sx={{ color: "#fff" }}
                  />
                </RadioGroup>
              )}

              {test.Question[currentQuestionIndex].type === "fillblank" && (
                <TextField
                  fullWidth
                  variant="outlined"
                  value={test.Question[currentQuestionIndex].submitted_answer}
                  disabled
                  label="Your Answer"
                  sx={{
                    marginBottom: "8px",
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                  }}
                />
              )}

              {test.test_type === "Completed" && (
                <Box
                  sx={{
                    marginTop: "16px",
                    color: "#004d4b",
                    fontWeight: "bold",
                  }}
                >
                  <Typography variant="body1">
                    <strong>Your answer:</strong>{" "}
                    {test.Question[currentQuestionIndex].submitted_answer}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Correct answer:</strong>{" "}
                    {test.Question[currentQuestionIndex].answer}
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      color:
                        test.Question[currentQuestionIndex].submitted_answer ===
                        test.Question[currentQuestionIndex].answer
                          ? "green"
                          : "red",
                      fontWeight: "bold",
                    }}
                  >
                    {test.Question[currentQuestionIndex].submitted_answer ===
                    test.Question[currentQuestionIndex].answer
                      ? "Correct"
                      : "Incorrect"}
                  </Typography>
                </Box>
              )}

              {showExplanation && (
                <Box
                  sx={{
                    marginTop: "16px",
                    fontStyle: "italic",
                    color: "#e9f9ed",
                  }}
                >
                  <Typography variant="body2">
                    {test.Question[currentQuestionIndex].explanation}
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {currentQuestionIndex > 0 && (
            <Button variant="outlined" color="primary" onClick={handleBack}>
              Back
            </Button>
          )}

          {currentQuestionIndex < test.Question.length - 1 && (
            <Box sx={{ marginLeft: "auto" }}>
              <Button variant="contained" color="primary" onClick={handleNext}>
                Next
              </Button>
            </Box>
          )}
        </Box>

        {currentQuestionIndex === test.Question.length - 1 &&
          test.test_type !== "Completed" && (
            <Box sx={{ textAlign: "center", marginTop: "16px" }}>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleSubmitTest}
              >
                Submit Test
              </Button>
            </Box>
          )}
        {test.test_type === "Completed" && (
          <Box sx={{ textAlign: "center", marginTop: "16px" }}>
            <Button
              variant="contained"
              color="error"
              onClick={handleReturnToDashboard}
            >
              Return to Dashboard
            </Button>
          </Box>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default ViewTest;
