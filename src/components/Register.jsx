import { useState } from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import toast from "react-hot-toast";
import axios from "axios";
import { Container, Card } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";

function Register({ isAuthenticated, setIsAuthenticated }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState("");

  const avatarHandler = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("avatar", avatar);
    try {
      const res = await axios.post(
        "https://deploy-backend-task-manager.onrender.com/api/v1/user/register",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setAvatar("");
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
    <div style={{  minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Card style={{ backgroundColor: "#424949", width: "400px", padding: "20px", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)" }}>
        <Container>
          <Form onSubmit={handleRegister}>
            <h3 className="text-center">REGISTER</h3>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPhone">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Your Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicAvatar">
              <Form.Label>Avatar</Form.Label>
              <Form.Control type="file" onChange={avatarHandler} required />
            </Form.Group>

            <Form.Group className="text-center">
              <Form.Label>
                Already Registered?{" "}
                <Link to={"/login"} className="text-decoration-none">
                  LOGIN
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
Register.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  setIsAuthenticated: PropTypes.func.isRequired,
};

export default Register;
