import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Dashboard = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/'); // Redirect to login page after logout
    };

    return (
        <div>
            <h1>Welcome to the Dashboard</h1>
            <p>You're logged in!</p>
            <Link to="/" onClick={handleLogout}>Logout</Link>
        </div>
    );
};

export default Dashboard;
