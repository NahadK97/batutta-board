import React, { useEffect } from 'react';
import { useTripsContext } from '../hooks/useTripsContext';
import { useAuthContext } from '../hooks/useAuthContext';
import TravelCard from '../components/TravelCard';

const PersonalDashboard = () => {
  const { myTrips, dispatch } = useTripsContext(); //  Use myTrips instead of trips
  const { user } = useAuthContext();

  useEffect(() => {
    if (!user) return;

    const fetchMyTrips = async () => {
      try {
        const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || '';
        const response = await fetch(`${API_BASE_URL}/api/trips/user/me`, {
          headers: { 'Authorization': `Bearer ${user.token}` }
        });
        const data = await response.json();
        if (response.ok) {
          dispatch({ type: 'SET_MY_TRIPS', payload: data });
        } else {
          console.error('Fetch error:', data.error || data.message);
        }
      } catch (err) {
        console.error('Network error:', err);
      }
    };

    fetchMyTrips();
  }, [user, dispatch]);

  return (
    <div className="personal-dashboard">
      <div className="container">
        <h2>My Travel Cards</h2>
        <div className="travel-cards">
          {!myTrips || myTrips.length === 0 ? (
            <p>You haven't created any trips yet.</p>
          ) : (
            myTrips.map(trip => (
              <TravelCard key={trip._id} card={trip} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalDashboard;