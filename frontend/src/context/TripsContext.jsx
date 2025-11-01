import { createContext, useReducer } from "react";

export const TripsContext = createContext();

export const tripsReducer = (state, action) => {
    switch (action.type) {
        case "SET_TRIPS":
            // Homepage trips (from other users)
            return {
                ...state,
                trips: action.payload
            };

        case "SET_MY_TRIPS":
            // Personal dashboard trips (current user's trips)
            return {
                ...state,
                myTrips: action.payload
            };

        case "CREATE_TRIP":
            // Add to myTrips only
            return {
                ...state,
                myTrips: [action.payload, ...(state.myTrips || [])]
            };

        case "UPDATE_TRIP":
            // Update in myTrips only
            return {
                ...state,
                myTrips: (state.myTrips || []).map(trip =>
                    trip._id === action.payload._id ? action.payload : trip
                ),
            };

        case "DELETE_TRIP":
            // Delete from myTrips only
            return {
                ...state,
                myTrips: (state.myTrips || []).filter((trip) => trip._id !== action.payload._id),
            };

        default:
            return state;
    }
};

export const TripsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(tripsReducer, {
        trips: [],      // Other users' trips (homepage)
        myTrips: []     // Current user's trips (personal dashboard)
    });

    return (
        <TripsContext.Provider value={{ ...state, dispatch }}>
            {children}
        </TripsContext.Provider>
    );
};