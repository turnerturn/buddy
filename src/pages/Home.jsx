import {
  SmartToy as BuddyIcon,
  Chat as ChatIcon,
  Help as HelpIcon,
  Note as NoteIcon,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: 'Notes Management',
      description: 'Organize and manage your important notes with tags and search functionality.',
      icon: <NoteIcon fontSize="large" color="primary" />,
      action: () => navigate('/notes'),
      buttonText: 'View Notes'
    },
    {
      title: 'FAQs Database',
      description: 'Access frequently asked questions and their answers in an organized way.',
      icon: <HelpIcon fontSize="large" color="primary" />,
      action: () => navigate('/faqs'),
      buttonText: 'Browse FAQs'
    },
    {
      title: 'Chat with Buddy',
      description: 'Ask Buddy any questions about your notes and FAQs using natural language.',
      icon: <ChatIcon fontSize="large" color="primary" />,
      action: () => navigate('/chat'),
      buttonText: 'Start Chat'
    },
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Paper
          elevation={3}
          sx={{
            p: 4,
            mb: 4,
            background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
            color: 'white',
            textAlign: 'center',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
            <BuddyIcon sx={{ fontSize: 60, mr: 2 }} />
            <Typography variant="h3" component="h1" fontWeight="bold">
              Welcome to Buddy Portal
            </Typography>
          </Box>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Your new #1 buddy at Ninja LLC
          </Typography>
          <Typography variant="body1" sx={{ maxWidth: 800, mx: 'auto' }}>
            This portal allows you to manage notes and frequently asked questions.
            Buddy is our embedded AI agent which is an expert of all things contained
            within your notes and FAQs. Use natural language questions to chat with
            Buddy and find the answers you need.
          </Typography>
        </Paper>

        <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 4 }}>
          Key Features
        </Typography>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4,
                  }
                }}
              >
                <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                  <Box sx={{ mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" component="h3" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                  <Button
                    variant="contained"
                    onClick={feature.action}
                    size="large"
                  >
                    {feature.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Paper elevation={1} sx={{ p: 3, mt: 4, bgcolor: 'grey.50' }}>
          <Typography variant="h6" component="h3" gutterBottom>
            Getting Started
          </Typography>
          <Typography variant="body1" paragraph>
            1. <strong>Add Notes:</strong> Use the Notes section to create and organize your important information with tags.
          </Typography>
          <Typography variant="body1" paragraph>
            2. <strong>Browse FAQs:</strong> Check the FAQs section for commonly asked questions and answers.
          </Typography>
          <Typography variant="body1" paragraph>
            3. <strong>Chat with Buddy:</strong> Ask natural language questions to find information across all your content.
          </Typography>
          <Typography variant="body1">
            4. <strong>Provide Feedback:</strong> Help us improve by sharing your experience and suggestions.
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default Home;
