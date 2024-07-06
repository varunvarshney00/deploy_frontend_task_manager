import PropTypes from "prop-types";
import { Container, Stack, Card } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import './Profile.css'; // Custom CSS file

const Profile = ({ user, isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <Container className="my-4 d-flex justify-content-center">
      <Card className="profile-card p-4">
        <Card.Body>
          <h1 className="mb-3 text-center">PROFILE</h1>
          {user ? (
            <Stack className="align-items-center" gap={3}>
              <img
                className="profile-avatar mb-4"
                src={user.avatar?.url}
                alt="avatar"
              />
              <Stack direction="horizontal" className="w-100 justify-content-between">
                <p className="fw-bold">NAME:</p>
                <p>{user.name || "N/A"}</p>
              </Stack>
              <Stack direction="horizontal" className="w-100 justify-content-between">
                <p className="fw-bold">EMAIL:</p>
                <p>{user.email || "N/A"}</p>
              </Stack>
              <Stack direction="horizontal" className="w-100 justify-content-between">
                <p className="fw-bold">PHONE:</p>
                <p>{user.phone || "N/A"}</p>
              </Stack>
            </Stack>
          ) : (
            <p className="text-center">User data is not available.</p>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

// PropTypes validation for props
Profile.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    avatar: PropTypes.shape({
      url: PropTypes.string,
    }),
  }),
  isAuthenticated: PropTypes.bool.isRequired,
};

// Default props
Profile.defaultProps = {
  user: null,
};

export default Profile;
