import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Card, CardContent, Grid } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import {TestHistoryApi } from '../services/api'

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

const TestHistory = () => {
  const navigate = useNavigate();

  // State to store the test data
  const [tests, setTests] = useState([]);

  useEffect(() => {
    // Fetch test data from API
    const fetchTestData = async () => {
      try {
        const response= await TestHistoryApi("completed");
        console.log(response)
        setTests(response); // Store response data
      } catch (error) {
        console.error('Failed to fetch test data:', error);
      }
    };

    fetchTestData(); // Call the function to fetch data
  }, []); // Empty dependency array to run only once on mount

  const handleViewTest = (testId) => {
    navigate(`/view-test/${testId}`,{ state: {testStatus:"completed"} });
  };

  // If no tests are available, show a message
  if (tests.length === 0) {
    return (
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h6" sx={{ color: '#004d4b' }}>
          No tests available.
        </Typography>
      </Box>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ padding: '16px', borderRadius: '12px' }}>
        <Typography variant="h5" sx={{ mb: 2, textAlign: 'center', color: '#004d4b', fontWeight: 'bold' }}>
          Test History
        </Typography>

        <Grid container spacing={3}>
          {tests.map((test) => (
            <Grid item xs={12} sm={6} key={test.id} mt={5}>
              <Card
                sx={{
                  padding: '16px',
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  boxShadow: 3,
                  width: '85%',
                  transition: 'transform 0.2s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                }}
              >
                <CardContent>
                  <Typography variant="h6" sx={{ color: '#004d4b', fontWeight: 'bold' }}>
                    {test?.quiz?.title}
                  </Typography>
                  <Typography sx={{ color: '#004d4b', marginBottom: '16px' }}>
                    {test?.quiz?.description}
                  </Typography>

                  <Box sx={{ marginBottom: '16px' }}>
                    <Typography sx={{ color: '#004d4b', fontWeight: 'bold' }}>
                      Score: {test.score}%
                    </Typography>
                  </Box>

                  <Box sx={{ textAlign: 'right' }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleViewTest(test?.quiz?.id)}
                      sx={{ width: '120px' }}
                    >
                      View Test
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default TestHistory;
