
import { Box, FormControl, InputLabel, Select, MenuItem, TextField, Button } from "@mui/material";
import { useState } from "react"; 
import { addActivity } from "../services/api";

// Helper function to get current datetime in 'YYYY-MM-DDTHH:mm' format
const getCurrentLocalDateTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
};

export default function ActivityForm({ onActivitiesAdded }) {
  
    const [activity, setActivity] = useState({
        type: "RUNNING", 
        duration: "", 
        caloriesBurned: "",
        startTime: getCurrentLocalDateTime(), 
        additionalMetrics: {}
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                type: activity.type,
                duration: activity.duration === "" ? 0 : Number(activity.duration),
                caloriesBurned: activity.caloriesBurned === "" ? 0 : Number(activity.caloriesBurned),
                // ⚡ Yahan .toISOString() hata kar local time ke sath ':00' seconds append kar diya hai taaki UTC conversion na ho
                startTime: activity.startTime ? activity.startTime + ":00" : null,
                additionalMetrics: activity.additionalMetrics || {}
            };

            await addActivity(payload);
            
            onActivitiesAdded();
            setActivity({
                type: "RUNNING", 
                duration: "", 
                caloriesBurned: "",
                startTime: getCurrentLocalDateTime(), 
                additionalMetrics: {}
            });
        } catch (error) {
            console.error("Error adding activity:", error);
        }
    };

    return (
        <Box component="form" sx={{ p: 2, mb: 2 }} onSubmit={handleSubmit}>
            <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Activity List</InputLabel>
                <Select
                    value={activity.type} 
                    onChange={(e) => { setActivity({ ...activity, type: e.target.value }) }} 
                >
                    <MenuItem value="RUNNING">Running</MenuItem>
                    <MenuItem value="WALKING">Walking</MenuItem>
                    <MenuItem value="CYCLING">Cycling</MenuItem>
                </Select>
            </FormControl>

            <TextField fullWidth 
                label="Duration (Minutes)"
                type="number"
                sx={{ mb: 2 }}
                value={activity.duration}
                onChange={(e) => { setActivity({ ...activity, duration: e.target.value }) }}
            />

            <TextField fullWidth 
                label="Calories Burned"
                type="number"
                sx={{ mb: 2 }}
                value={activity.caloriesBurned}
                onChange={(e) => { setActivity({ ...activity, caloriesBurned: e.target.value }) }}
            />

            <TextField fullWidth 
                label="Start Time"
                type="datetime-local"
                sx={{ mb: 2 }}
                InputLabelProps={{ shrink: true }}
                value={activity.startTime}
                onChange={(e) => { setActivity({ ...activity, startTime: e.target.value }) }}
            />

            <Button type="submit" variant="contained">
                Add Activity
            </Button>
        </Box>
    );
}