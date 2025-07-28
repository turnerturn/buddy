import {
    BugReport as BugIcon,
    Feedback as FeedbackIcon,
    Lightbulb as IdeaIcon,
    Send as SendIcon,
    Star as StarIcon,
} from '@mui/icons-material';
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Rating,
    Select,
    Snackbar,
    TextField,
    Typography,
} from '@mui/material';
import { useState } from 'react';

const Feedback = () => {
  const [feedbackData, setFeedbackData] = useState({
    type: '',
    subject: '',
    description: '',
    rating: 0,
    email: '',
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const feedbackTypes = [
    { value: 'bug', label: 'Bug Report', icon: <BugIcon /> },
    { value: 'feature', label: 'Feature Request', icon: <IdeaIcon /> },
    { value: 'general', label: 'General Feedback', icon: <FeedbackIcon /> },
    { value: 'content', label: 'Content Suggestion', icon: <StarIcon /> },
  ];

  const handleInputChange = (field) => (event) => {
    setFeedbackData({
      ...feedbackData,
      [field]: event.target.value,
    });
  };

  const handleRatingChange = (event, newValue) => {
    setFeedbackData({
      ...feedbackData,
      rating: newValue,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Simulate form submission
    console.log('Feedback submitted:', feedbackData);

    // Show success message
    setShowSuccess(true);

    // Reset form
    setFeedbackData({
      type: '',
      subject: '',
      description: '',
      rating: 0,
      email: '',
    });
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
  };

  const isFormValid = () => {
    return feedbackData.type && feedbackData.subject && feedbackData.description;
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Feedback & Suggestions
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Help us improve the Buddy Portal by sharing your feedback, reporting bugs, or suggesting new features.
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <FormControl fullWidth required>
                    <InputLabel>Feedback Type</InputLabel>
                    <Select
                      value={feedbackData.type}
                      onChange={handleInputChange('type')}
                      label="Feedback Type"
                    >
                      {feedbackTypes.map((type) => (
                        <MenuItem key={type.value} value={type.value}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {type.icon}
                            <Typography sx={{ ml: 1 }}>{type.label}</Typography>
                          </Box>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    required
                    label="Subject"
                    value={feedbackData.subject}
                    onChange={handleInputChange('subject')}
                    placeholder="Brief summary of your feedback"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    required
                    multiline
                    rows={6}
                    label="Description"
                    value={feedbackData.description}
                    onChange={handleInputChange('description')}
                    placeholder="Provide detailed information about your feedback, including steps to reproduce if reporting a bug"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography component="legend" gutterBottom>
                    Overall Rating (Optional)
                  </Typography>
                  <Rating
                    name="rating"
                    value={feedbackData.rating}
                    onChange={handleRatingChange}
                    size="large"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type="email"
                    label="Email (Optional)"
                    value={feedbackData.email}
                    onChange={handleInputChange('email')}
                    placeholder="your.email@ninja llc.com"
                    helperText="For follow-up communication"
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    startIcon={<SendIcon />}
                    disabled={!isFormValid()}
                    sx={{ mt: 2 }}
                  >
                    Submit Feedback
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card elevation={2} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom color="primary">
                <BugIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                Bug Reports
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Found an issue? Help us fix it by providing detailed steps to reproduce the problem.
              </Typography>
            </CardContent>
          </Card>

          <Card elevation={2} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom color="primary">
                <IdeaIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                Feature Requests
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Have an idea for a new feature? Share your suggestions to make the portal even better.
              </Typography>
            </CardContent>
          </Card>

          <Card elevation={2}>
            <CardContent>
              <Typography variant="h6" gutterBottom color="primary">
                <StarIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                Content Improvements
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Suggest improvements to existing content, documentation, or knowledge base articles.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Snackbar
        open={showSuccess}
        autoHideDuration={6000}
        onClose={handleCloseSuccess}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSuccess} severity="success" sx={{ width: '100%' }}>
          Thank you for your feedback! We'll review it and get back to you if needed.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Feedback;
