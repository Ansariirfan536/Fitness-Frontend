import './App.css'
import store from './store/store'
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom' 
import { Button, Box, CircularProgress, Typography } from '@mui/material' 
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from 'react-oauth2-code-pkce'
import { useDispatch } from 'react-redux'
import { setCredentials } from './store/authSlice'
import ActivityForm from "./components/ActivityForm";
import ActivityList from "./components/ActivityList";
import ActivityDetail from "./components/ActivityDetail"; 
const ActivitiesPage = () => {
  return (
    <Box sx={{ p: 2, border: '1px dashed gray' }}>
      <ActivityForm onActivitiesAdded={() => window.location.reload()} />
      <ActivityList />
    </Box>
  )
}

function App() {
  const { token, tokenData, logIn, logOut, isAuthenticated } = useContext(AuthContext); 
  const dispatch = useDispatch();
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      
      if (tokenData) {
        const userId = tokenData.sub || tokenData.id || tokenData.preferred_username || tokenData.name;
        if (userId) {
          localStorage.setItem("userId", userId);
        }
      }

      dispatch(setCredentials({ token, user: tokenData }));
      setAuthReady(true);
    } else {
      setAuthReady(true);
    }
  }, [token, tokenData, dispatch]);

  if (!authReady) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Router>
      {!token ? (
        <Routes>
          <Route path="/" element={
            <div style={{ display: 'block', width: 'max-content', margin: '100px auto' }}>
              <Typography variant="h5" sx={{ mb: 2 }}>Fitness App Login</Typography>
              <Button 
                variant="contained" 
                color="primary"
                fullWidth
                onClick={() => { logIn() }}
              >
                Login with Keycloak
              </Button>
            </div>
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      ) : (
        <div>
          <Box component="section" sx={{ p: 2, border: '1px dashed gray' }}>
            <Button variant='contained' color="error" sx={{ mb: 2 }} onClick={() => {
              localStorage.clear();
              logOut();
            }}>
              Logout
            </Button> 
            <Routes>
              <Route path='/activities' element={<ActivitiesPage />} />
              <Route path='/activities/:id' element={<ActivityDetail />} /> {/* Ab yeh aapka poora professional component render karega */}
              <Route path='/' element={<Navigate to="/activities" replace />} />
              <Route path="*" element={<Navigate to="/activities" replace />} />
            </Routes>
          </Box>
        </div>
      )}
    </Router>
  )
}

export default App