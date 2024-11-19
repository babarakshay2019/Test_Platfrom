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
import { submitAnswer, submitTest, getQuestionTest,TestHistoryQuestion } from "../services/api"; // Import the API functions

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
  // const status = location.state || {};
  const {testStatus} =location.state || {}
  const [test, setTest] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState(""); // State to store the answer for the current question

  // Fetching test details
  const fetchTestDetails = async () => {
    setLoading(true);
    try {
      const response = await getQuestionTest(startTestId); // Your API call to fetch test data
      const testData = {
        id: response.quiz?.id,
        title: response.quiz?.title,
        status: response.quiz?.status,
        Question: response?.questions.map((question) => ({
          ...question,
          // Handle options properly
          options: typeof question.options === "string" ? JSON.parse(question.options).options : question.options?.options || [],
        })),
      };
      setTest(testData);
    } catch (error) {
      console.error("Error fetching tests:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTestHistroyDetails = async () => {
    setLoading(true);
    try {
      const response = await TestHistoryQuestion(startTestId); // Your API call to fetch test data
      const testData = {
        id: response.quiz?.id,
        title: response.quiz?.title,
        status: response.quiz?.status,
        Question: response?.questions.map((question) => ({
          ...question,
          // Handle options properly
          options: typeof question.options === "string" ? JSON.parse(question.options).options : question.options?.options || [],
        })),
      };
      setTest(testData);
    } catch (error) {
      console.error("Error fetching tests:", error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    console.log(testStatus)
    if (testStatus === "startTest") {
      fetchTestDetails();
    }
    if (testStatus==="completed"){
      fetchTestHistroyDetails()
    }
  }, [testStatus]);

  const handleNext = async () => {
    const currentQuestion = test.Question[currentQuestionIndex];
    if (answer) {
      try {
        const student_answer={
          selected_option:answer
        }
        // Call the API to submit the current answer
        await submitAnswer(startTestId, currentQuestion.id, student_answer);

        // Move to the next question
        if (currentQuestionIndex < test.Question.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          setShowExplanation(false);
          setAnswer(""); // Clear the answer after submission
        }
      } catch (error) {
        console.error("Error submitting answer:", error);
      }
    } else {
      // alert("Please select an answer or provide a response before proceeding.");
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setShowExplanation(false);
    }
  };

  const handleSubmitTest = async () => {

    handleNext()
    const answers = test.Question.map((question) => ({
      question_id: question.id,
      answer: question.submitted_answer,
    }));

    try {
      // Call the API to submit the test
      const response=await submitTest(startTestId, answers);

      // Redirect to the result page or show success
      alert("Test submitted successfully!");
      // navigate(`/view-test/${id}`, { state: "startTest" });
      navigate("/results", {
        state: { result: response }, // Pass the result data via state
      });
    } catch (error) {
      console.error("Error submitting the test:", error);
    }
    
  };

  const toggleExplanation = () => {
    setShowExplanation(!showExplanation);
  };

  const handleReturnToDashboard = () => {
    navigate(`/dashboard`);
  };

  // Handle answer selection for MCQs and True/False questions
  const handleOptionChange = (event) => {
    setAnswer(event.target.value); // Update the answer state
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (!test) {
    return <Typography>No test details available.</Typography>;
  }

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
                {test.Question[currentQuestionIndex].question_text}
              </Typography>

              {test.status === "Completed" && (
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

              {/* MCQ Question */}
              {test.Question[currentQuestionIndex].question_type === "MCQ" && (
                <RadioGroup
                  value={answer} // Bind the RadioGroup value to the answer state
                  onChange={handleOptionChange}
                >
                  {test.Question[currentQuestionIndex].options.map(
                    (option, index) => (
                      <FormControlLabel
                        key={index}
                        value={option}
                        control={<Radio />}
                        label={option}
                        sx={{ marginBottom: "8px", color: "#fff" }}
                      />
                    )
                  )}
                </RadioGroup>
              )}
              {test.Question[currentQuestionIndex].question_type === "MULTI" && (
                <RadioGroup
                  value={answer} // Bind the RadioGroup value to the answer state
                  onChange={handleOptionChange}
                >
                  {test.Question[currentQuestionIndex].options.map(
                    (option, index) => (
                      <FormControlLabel
                        key={index}
                        value={option}
                        control={<Radio />}
                        label={option}
                        sx={{ marginBottom: "8px", color: "#fff" }}
                      />
                    )
                  )}
                </RadioGroup>
              )}

              {/* True/False Question */}
              {test.Question[currentQuestionIndex].question_type === "YN" && (
                <RadioGroup
                  value={answer} // Bind the RadioGroup value to the answer state
                  onChange={handleOptionChange}
                >
                  <FormControlLabel
                    value="True"
                    control={<Radio />}
                    label="True"
                    sx={{ color: "#fff" }}
                  />
                  <FormControlLabel
                    value="False"
                    control={<Radio />}
                    label="False"
                    sx={{ color: "#fff" }}
                  />
                </RadioGroup>
              )}

              {/* Fill-in-the-Blank Question */}
              {test.Question[currentQuestionIndex].question_type === "FILL" && (
                <TextField
                  fullWidth
                  variant="outlined"
                  value={answer} // Bind the TextField value to the answer state
                  onChange={(e) => setAnswer(e.target.value)} // Update the answer state
                  label="Your Answer"
                  sx={{
                    marginBottom: "8px",
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                  }}
                />
              )}

              {/* Show Explanation */}
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

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          {currentQuestionIndex < test.Question.length - 1 && (
            <Button variant="contained" color="primary" onClick={handleNext}>
              Next
            </Button>
          )}
        </Box>

        {currentQuestionIndex === test.Question.length - 1 && (
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
      </Box>
    </ThemeProvider>
  );
};

export default ViewTest;
