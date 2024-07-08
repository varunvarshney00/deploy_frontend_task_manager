import { useEffect, useState } from "react"; 
// Importing hooks from React for managing state and side effects

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
// Importing components for routing from react-router-dom

import Home from "./components/Home"; 
// Importing the Home component

import Navbar from "./components/Navbar"; 
// Importing the Navbar component

import Register from "./components/Register"; 
// Importing the Register component

import { Toaster } from "react-hot-toast"; 
// Importing Toaster for displaying notifications

import axios from "axios"; 
// Importing axios for making HTTP requests

import Login from "./components/Login"; 
// Importing the Login component

import Profile from "./components/Profile"; 
// Importing the Profile component

import 'bootstrap/dist/css/bootstrap.min.css'; 
// Importing Bootstrap CSS for styling





const App = () => {



  // Define state variables using useState hook

  const [isAuthenticated, setIsAuthenticated] = useState(false); 
  // State to track if the user is authenticated
  // Initially set to false, indicating the user is not logged in
  // isAuthenticated: A boolean value indicating whether the user is authenticated
  // setIsAuthenticated: A function to update the isAuthenticated state

  const [tasks, setTasks] = useState([]); 
  // State to store the list of tasks
  // Initially set to an empty array, indicating no tasks are loaded
  // tasks: An array to hold the list of tasks fetched from the backend
  // setTasks: A function to update the tasks state

  const [user, setUser] = useState({}); 
  // State to store the user information
  // Initially set to an empty object, indicating no user data is loaded
  // user: An object to hold the user information fetched from the backend
  // setUser: A function to update the user state

  const [taskTitle, setTaskTitle] = useState("Tasks"); 
  // State to store the title of the task list
  // Initially set to "Tasks", indicating the default title for the task list
  // taskTitle: A string to hold the title of the task list
  // setTaskTitle: A function to update the taskTitle state




  useEffect(() => {
    // useEffect hook to perform side effects (fetching user data) when the component mounts
    // Runs once when the component mounts to fetch user data.



    const handleGetUser = async () => {
      // Define an asynchronous function to fetch authenticated user's data

      try {
        const { data } = await axios.get(
          // axios.get Request: Sends a GET request to the backend API endpoint to fetch user data.
          "https://deploy-backend-task-manager.onrender.com/api/v1/user/me",
          { withCredentials: true } 
          // Include credentials (cookies) with the request to ensure the user is authenticated
        );

        setIsAuthenticated(true); 
        // Set isAuthenticated to true if user data is successfully fetched

        setUser(data.user); 
        // Update the user state with the fetched user data

      } catch (error) {
        // Handle any errors that occur during the request

        console.log("USER IS NOT AUTHENTICATED!"); 
        // Log a message indicating that the user is not authenticated

        setIsAuthenticated(false); 
        // Set isAuthenticated to false if there is an error

        setUser({}); 
        // Reset the user state to an empty object to clear any previous user data.
      }
    };


    handleGetUser(); 
    // Call the handleGetUser function to fetch user data when the component mounts    
    // Single Execution: By placing handleGetUser() inside the useEffect with an empty dependency array it ensures that the user data fetching process is initiated exactly once when the component mounts, preventing unnecessary API calls.

  }, []); 
  // Dependency array set to empty to run only once when the component mounts





  return (
    <>
      <Router>
        {/* Router component wraps around all the routes and provides routing functionality */}



        <Navbar
          setTasks={setTasks}
          setIsAuthenticated={setIsAuthenticated}
          isAuthenticated={isAuthenticated}
          setTaskTitle={setTaskTitle}
        />
        {/* Purpose: Displays the navigation bar. */}


        
        <Routes>
          {/* Purpose: Contains all the Route components that define the different routes of the application. */}

          {/* Path: The path prop specifies the URL path (/ for the home page).
          Element: The element prop specifies the component to render (Home component) along with its props (isAuthenticated, tasks, setTasks, and taskTitle). */}

          <Route
            path="/"
            element={
              <Home
                isAuthenticated={isAuthenticated}
                tasks={tasks}
                setTasks={setTasks}
                taskTitle={taskTitle}
              />
            }
          />
          {/* Purpose: Represents the home page of the application. */}
          {/* When the user navigates to the root URL (/), the Route component matches this path and renders the Home component. */}



          <Route
            path="/register"
            element={
              <Register
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={setIsAuthenticated}
              />
            }
          />
          {/* Route for the register page */}



          <Route
            path="/login"
            element={
              <Login
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={setIsAuthenticated}
              />
            }
          />
          {/* Route for the login page */}



          <Route
            path="/profile"
            element={<Profile user={user} isAuthenticated={isAuthenticated} />}
          />
          {/* Route for the profile page */}

        </Routes>

        
        <Toaster />
        {/* Toaster component for displaying notifications */}

        
      </Router>
    </>
  );
};

export default App;
// Export the App component as the default export
