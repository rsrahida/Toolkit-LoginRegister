import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { Navigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Dashboard</h2>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>

      <div className="dashboard-content">
        <div className="welcome-section">
          <h3>Welcome, {user.username}!</h3>
          <p>You have successfully logged in to the application.</p>
        </div>

        <div className="user-info">
          <h4>Your Information:</h4>
          <p>
            <strong>Username:</strong> {user.username}
          </p>
          <p>
            <strong>Age:</strong> {user.age}
          </p>
          <p>
            <strong>Phone:</strong> {user.phone}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
