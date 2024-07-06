import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import "./Header.css"; // Custom CSS file

function Header({ setTasks, setIsAuthenticated, isAuthenticated, setTaskTitle }) {
  const [allTasks, setAllTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("https://deploy-backend-task-manager.onrender.com/api/v1/task/mytask", {
          withCredentials: true,
        });
        setAllTasks(response.data.tasks);
        setTasks(response.data.tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        toast.error("Error fetching tasks.");
      }
    };

    if (isAuthenticated) {
      fetchTasks();
    }
  }, [isAuthenticated, setTasks]);

  const handleLogout = async () => {
    try {
      const { data } = await axios.get("https://deploy-backend-task-manager.onrender.com/api/v1/user/logout", {
        withCredentials: true,
      });
      toast.success(data.message);
      setIsAuthenticated(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error logging out.");
    }
  };

  const filterTasks = (filterType) => {
    const filterMapping = {
      completed: { filter: (task) => task.status === "completed", title: "Completed Tasks" },
      incomplete: { filter: (task) => task.status === "incomplete", title: "Incomplete Tasks" },
      archived: { filter: (task) => task.archived === true, title: "Archived Tasks" },
      all: { filter: () => true, title: "Tasks" }
    };

    const { filter, title } = filterMapping[filterType] || filterMapping.all;
    setTasks(allTasks.filter(filter));
    setTaskTitle(title);
  };

  return (
    <Navbar expand="lg" className={`bg-body-tertiary ${!isAuthenticated ? "d-none" : ""} custom-navbar`}>
      <Container>
        <Navbar.Brand as={Link} to="/" className="custom-brand">TASK MANAGER</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="custom-toggle" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
          <Nav className="me-auto" >
           
           
            
            {/* <Link to="/" className="text-decoration-none d-flex align-items-center link-light custom-link">
              Home
            </Link> */}
            
            
            
            
            <NavDropdown title="Filter Tasks" id="basic-nav-dropdown" className="custom-dropdown">
              
              
              <NavDropdown.Item onClick={() => filterTasks("all")}>
                All Tasks
              </NavDropdown.Item>
              
              
              <NavDropdown.Item onClick={() => filterTasks("completed")}>
                Completed Tasks
              </NavDropdown.Item>
              
              
              <NavDropdown.Item onClick={() => filterTasks("incomplete")}>
                Incomplete Tasks
              </NavDropdown.Item>
              
              
              <NavDropdown.Item onClick={() => filterTasks("archived")}>
                Archived Tasks
              </NavDropdown.Item>
            
            
            </NavDropdown>
            
            
            
            
            
            <Link to="/profile" className="text-decoration-none d-flex align-items-center link-light custom-link">
              Profile
            </Link>
          
          
          
          
          
          </Nav>
          <Button
            className="bg-transparent border-0 custom-logout"
            onClick={handleLogout}
          >
            LOGOUT
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

Header.propTypes = {
  setTasks: PropTypes.func.isRequired,
  setIsAuthenticated: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  setTaskTitle: PropTypes.func.isRequired,
};

export default Header;
