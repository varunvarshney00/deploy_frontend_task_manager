import { useState } from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import toast from "react-hot-toast";
import axios from "axios";
import { Container, Card } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";

function Login({ isAuthenticated, setIsAuthenticated }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://deploy-backend-task-manager.onrender.com/api/v1/user/login",
        { email, password },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      setEmail("");
      setPassword("");
      setIsAuthenticated(true);
      toast.success(res.data.message);
    } catch (error) {
      console.error(error); // Log the error for debugging purposes
      toast.error(error.response.data.message);
    }
  };

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Card style={{ backgroundColor: "#424949", width: "400px", padding: "20px", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)" }}>
        <Container>
          <Form onSubmit={handleLogin}>
            <h3 className="text-center">LOGIN</h3>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required // Added required attribute for basic HTML validation
              />
              <Form.Text className="text-muted">
                We will never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required // Added required attribute for basic HTML validation
              />
            </Form.Group>

            <Form.Group className="text-center">
              <Form.Label>
                Not Registered?{" "}
                <Link to={"/register"} className="text-decoration-none">
                  REGISTER NOW
                </Link>
              </Form.Label>
            </Form.Group>

            <Button
              variant="warning"
              type="submit"
              className="w-100 text-light fw-bold fs-5"
            >
              Submit
            </Button>
          </Form>
        </Container>
      </Card>
    </div>
  );
}

// PropTypes validation for props
Login.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  setIsAuthenticated: PropTypes.func.isRequired,
};

export default Login;
