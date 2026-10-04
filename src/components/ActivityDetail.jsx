import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  Container, 
  Card, 
  CardContent, 
  Typography, 
  Button, 
  Box, 
  CircularProgress, 
  Divider, 
  Grid,
  Chip 
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import { getActivityById, getActivityRecommendation } from "../services/api";
export default function ActivityDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activity, setActivity] = useState(null);
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Dono APIs ko parallel mein call karte hain
       const [activityRes, recommendationRes] = await Promise.allSettled([
          getActivityById(id),
          getActivityRecommendation(id)
        ]);

        if (activityRes.status === "fulfilled") {
          setActivity(activityRes.value.data);
        }

        if (recommendationRes.status === "fulfilled") {
          setRecommendation(recommendationRes.value.data);
        }
      } catch (err) {
        console.error("Error fetching details:", err);
        setError("Could not load activity details.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error && !activity) {
    return (
      <Container maxWidth="sm" sx={{ mt: 8, textAlign: 'center' }}>
        <Typography color="error" variant="h6" gutterBottom>{error}</Typography>
        <Button 
          startIcon={<ArrowBackIcon />} 
          variant="contained" 
          onClick={() => navigate('/activities')} 
          sx={{ mt: 2 }}
        >
          Back to Activities
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 6 }}>
      <Button 
        startIcon={<ArrowBackIcon />} 
        onClick={() => navigate('/activities')} 
        sx={{ mb: 3 }}
        variant="outlined"
      >
        Back to List
      </Button>

      {/* Main Activity Card */}
      <Card sx={{ boxShadow: 4, p: 3, borderRadius: 3, mb: 4 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h4" color="primary" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1 }}>
              <FitnessCenterIcon fontSize="large" /> {activity?.type || "Workout"} Details
            </Typography>
            <Chip label={`ID: ${id?.substring(0, 8)}...`} variant="outlined" size="small" />
          </Box>
          <Divider sx={{ mb: 3 }} />

          {/* Quick Metrics Grid */}
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, bgcolor: '#f0f4f8', p: 2, borderRadius: 2 }}>
                <AccessTimeIcon color="primary" />
                <Box>
                  <Typography variant="body2" color="text.secondary">Duration</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{activity?.duration ?? 'N/A'} mins</Typography>
                </Box>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, bgcolor: '#fff4e5', p: 2, borderRadius: 2 }}>
                <LocalFireDepartmentIcon color="error" />
                <Box>
                  <Typography variant="body2" color="text.secondary">Calories Burned</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{activity?.caloriesBurned ?? 'N/A'} kcal</Typography>
                </Box>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, bgcolor: '#e8f5e9', p: 2, borderRadius: 2 }}>
                <FitnessCenterIcon color="success" />
                <Box>
                  <Typography variant="body2" color="text.secondary">Start Time</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    {activity?.startTime ? new Date(activity.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'N/A'}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* AI Trainer Insights Section */}
      <Card sx={{ boxShadow: 4, p: 3, borderRadius: 3, bgcolor: '#f8f9fa', borderLeft: '6px solid #1976d2' }}>
        <CardContent>
          <Typography variant="h5" color="primary" gutterBottom sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1 }}>
            <SmartToyIcon /> AI Trainer Insights & Analysis
          </Typography>
          <Divider sx={{ mb: 3 }} />

          {/* Performance Analysis */}
          <Typography variant="body1" sx={{ lineHeight: 1.6, mb: 3 }}>
            <strong>Performance Analysis:</strong><br />
            {recommendation?.recommendation || "Sorry 😒😢 try again maybe 429/500 please check logs or AI insights are still processing or not generated yet."}
          </Typography>

          {/* Improvements */}
          {recommendation?.improvements?.length > 0 && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#d32f2f' }}>
                💡 Areas for Improvement:
              </Typography>
              <ul>
                {recommendation.improvements.map((imp, index) => (
                  <li key={index}><Typography variant="body2">{imp}</Typography></li>
                ))}
              </ul>
            </Box>
          )}

          {/* Suggestions */}
          {recommendation?.suggestions?.length > 0 && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#2e7d32' }}>
                🚀 Next Workout Suggestions:
              </Typography>
              <ul>
                {recommendation.suggestions.map((sug, index) => (
                  <li key={index}><Typography variant="body2">{sug}</Typography></li>
                ))}
              </ul>
            </Box>
          )}

          {/* Safety Tips */}
          {recommendation?.safety?.length > 0 && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#ed6c02' }}>
                🛡️ Safety & Recovery Tips:
              </Typography>
              <ul>
                {recommendation.safety.map((safe, index) => (
                  <li key={index}><Typography variant="body2">{safe}</Typography></li>
                ))}
              </ul>
            </Box>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}