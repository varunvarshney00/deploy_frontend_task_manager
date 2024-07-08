import { useEffect, useState } from "react"; 
// Import React hooks for managing state and side effects

import PropTypes from "prop-types"; 
// Import PropTypes for prop type validation

import axios from "axios"; 
// Import axios for making HTTP requests
// axios is a promise-based HTTP client for the browser and Node.js, used to interact with APIs by making HTTP requests to fetch or send data.

import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap"; 
// Import Bootstrap components for styling and layout
// Button: A component to create styled buttons.
// Container: A component to center and horizontally pad the content.
// Nav: A component to create navigation links.
// Navbar: A component to create a responsive navigation header.
// NavDropdown: A component to create a dropdown menu within the navigation bar.

import toast from "react-hot-toast"; 
// Import toast for displaying notifications
// toast is a library for displaying toast notifications, providing feedback to the user about the operation's status (success, error, etc.).

import { Link } from "react-router-dom"; 
// Import Link from react-router-dom for navigation
// Link is a component from react-router-dom that provides declarative navigation around the application, allowing navigation without full page reloads.


import "./Header.css"; 
// Import custom CSS for additional styling





  // Define the Header functional component
  // It accepts the following props:
  // setTasks: Used to update the state that holds the tasks list. 
  // setIsAuthenticated: Used to set whether a user is logged in or out.
  // isAuthenticated: A boolean indicating whether the user is authenticated. Indicates whether the user is currently authenticated (logged in). This boolean value is used to conditionally render parts of the Header component, like the logout button or certain navigation links.
  // setTaskTitle: A function to update the task title in the parent component.
function Header({ setTasks, setIsAuthenticated, isAuthenticated, setTaskTitle }) {



  // Define a state variable to hold all tasks
  const [allTasks, setAllTasks] = useState([]);




  // useEffect hook to fetch tasks when the component mounts or when isAuthenticated changes
  useEffect(() => {
    // Function to fetch tasks from the backend API
    const fetchTasks = async () => {
      try {
        // Make a GET request to the backend API to fetch tasks
        const response = await axios.get("https://deploy-backend-task-manager.onrender.com/api/v1/task/mytask", {
          withCredentials: true, // Include credentials with the request
        });
        // Update state with the fetched tasks
        setAllTasks(response.data.tasks);
        setTasks(response.data.tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error); // Log error to console
        toast.error("Error fetching tasks."); // Display error notification
      }
    };

    // Fetch tasks only if the user is authenticated
    if (isAuthenticated) {
      fetchTasks();
    }
  }, [isAuthenticated, setTasks]); // Dependencies array to control when the effect runs

  // Function to handle user logout
  const handleLogout = async () => {
    try {
      // Make a GET request to the backend API to log out the user
      const { data } = await axios.get("https://deploy-backend-task-manager.onrender.com/api/v1/user/logout", {
        withCredentials: true, // Include credentials with the request
      });
      toast.success(data.message); // Display success notification
      setIsAuthenticated(false); // Update state to reflect the user is logged out
    } catch (error) {
      toast.error(error.response?.data?.message || "Error logging out."); // Display error notification
    }
  };

  // Function to filter tasks based on the filter type
  const filterTasks = (filterType) => {
    // Mapping of filter types to corresponding filter functions and titles
    const filterMapping = {
      completed: { filter: (task) => task.status === "completed", title: "Completed Tasks" },
      incomplete: { filter: (task) => task.status === "incomplete", title: "Incomplete Tasks" },
      archived: { filter: (task) => task.archived === true, title: "Archived Tasks" },
      all: { filter: () => true, title: "Tasks" }
    };

    // Destructure filter and title from the filterMapping object, default to 'all' if filterType is not found
    const { filter, title } = filterMapping[filterType] || filterMapping.all;
    setTasks(allTasks.filter(filter)); // Update tasks state with the filtered tasks
    setTaskTitle(title); // Update the task title
  };

  return (
    <Navbar expand="lg" className={`bg-body-tertiary ${!isAuthenticated ? "d-none" : ""} custom-navbar`}>
      <Container>
        <Navbar.Brand as={Link} to="/" className="custom-brand">TASK MANAGER</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="custom-toggle" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
          <Nav className="me-auto">
            {/* Navigation Dropdown for filtering tasks */}
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

// PropTypes validation for props to ensure correct prop types are passed
Header.propTypes = {
  setTasks: PropTypes.func.isRequired, // setTasks must be a function and is required
  setIsAuthenticated: PropTypes.func.isRequired, // setIsAuthenticated must be a function and is required
  isAuthenticated: PropTypes.bool.isRequired, // isAuthenticated must be a boolean and is required
  setTaskTitle: PropTypes.func.isRequired, // setTaskTitle must be a function and is required
};

// Export the Header component as the default export
export default Header;
