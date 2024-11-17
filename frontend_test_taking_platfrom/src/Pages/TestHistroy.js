import React from 'react';
import { Box, Typography, Button, Card, CardContent, Grid } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

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

  const tests = [
    { id: 1, name: 'Math Test - 2024', description: 'Test on Algebra and Geometry', score: 85, source: 'Textbook' },
    { id: 2, name: 'Physics Test - 2024', description: 'Test on Mechanics and Thermodynamics', score: 70, source: 'Online Course' },
    { id: 3, name: 'Chemistry Test - 2024', description: 'Test on Organic Chemistry', score: 50, source: 'Research Paper' },
    { id: 4, name: 'Biology Test - 2024', description: 'Test on Genetics and Evolution', score: 90, source: 'Lecture Notes' },
    { id: 5, name: 'History Test - 2024', description: 'Test on World War II', score: 60, source: 'History Book' },
  ];

  const handleViewTest = (testId) => {
    navigate(`/view-test/${testId}`);
  };

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
                    {test.name}
                  </Typography>
                  <Typography sx={{ color: '#004d4b', marginBottom: '16px' }}>
                    {test.description}
                  </Typography>

                  <Box sx={{ marginBottom: '16px' }}>
                    <Typography sx={{ color: '#004d4b', fontWeight: 'bold' }}>
                      Score: {test.score}%
                    </Typography>
                  </Box>

                  <Typography sx={{ color: '#004d4b', marginBottom: '8px' }}>
                    <strong>Source:</strong> {test.source}
                  </Typography>

                  <Box sx={{ textAlign: 'right' }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleViewTest(test.id)}
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
