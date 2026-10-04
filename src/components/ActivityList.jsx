
import { Card, CardContent, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getActivities } from "../services/api"; 

export default function ActivityList() {
  const [activities, setActivities] = useState([]);
  const navigate = useNavigate();

  const fetchActivities = async () => {
    try {
      const response = await getActivities();
      setActivities(response.data);
    } catch (error) {
      console.error("Error fetching activities list:", error);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  return (
    <Grid container spacing={2} sx={{ p: 2 }}>
      {activities.length === 0 ? (
        <Typography variant="h6" sx={{ ml: 2, mt: 2 }}>No activities found. Add one above!</Typography>
      ) : (
        activities.map((activity) => (
          <Grid size xs={12} sm={6} md={4} key={activity.id || activity._id}> 
            <Card sx={{ cursor: "pointer", boxShadow: 3 }} onClick={() => navigate(`/activities/${activity.id}`)}>
              <CardContent>
                <Typography variant="h6" color="primary">{activity.type}</Typography>
                <Typography>Duration: {activity.duration} mins</Typography>
                <Typography>Calories: {activity.caloriesBurned} kcal</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))
      )}
    </Grid>
  );
}