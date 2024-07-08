// Purpose: axios is a popular JavaScript library used to make HTTP requests to APIs. It's commonly used in React applications for fetching data from a server or sending data to a server.
import axios from "axios"; // Import the axios library for making HTTP requests


// eslint-disable-next-line no-unused-vars
import React, { useState } from "react"; // Import React and useState hook for managing component state

// Purpose: react-bootstrap is a library that provides Bootstrap components as React components. Here, Button, Modal, and Stack are imported for use in the component.
// Button: For creating styled buttons.
// Modal: For creating modal dialogs.
// Stack: For creating a flex container with Bootstrap's Stack component.
import { Button, Modal, Stack } from "react-bootstrap"; // Import Bootstrap components for styling

// Purpose: react-hot-toast is a library for showing notifications (toasts) in a React application. It provides a simple API to display various types of notifications (success, error, etc.).
import toast from "react-hot-toast"; // Import toast for displaying notifications

// Purpose: PropTypes is a library for type-checking props passed to React components. It helps ensure that components are used correctly by validating the types of props they receive. This can help catch bugs and improve code readability.
import PropTypes from "prop-types"; // Import PropTypes for prop type validation





// Define the CreateTaskModal functional component
const CreateTaskModal = ({ showCreateModal, handleCreateModalClose, setTasks }) => {





  // Define state variables for title, description, and due date using the useState hook
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");





  // Get today's date in YYYY-MM-DD format
  const today = new Date()        // Create a new Date object representing the current date and time
    .toISOString()                // Convert the Date object to a string in ISO 8601 format
    .split("T")[0];               // Split the ISO string at 'T' and take the first part (date) as 'YYYY-MM-DD'






  // Function to handle the creation of a new task
  const handleCreateTask = async () => {


    // Check if the due date is in the past
    // This block checks if the dueDate is in the past compared to today. If it is, an error notification is displayed using toast.error, and the function exits early.
    if (new Date(dueDate) < new Date(today)) {
      toast.error("Due date cannot be in the past."); // Display error notification
      return;
    }





    // Make a POST request to the backend API to create a new task
    // axios.post is used to make a POST request to the specified API endpoint.
    await axios
      .post(
        "https://deploy-backend-task-manager.onrender.com/api/v1/task/post",
        // The request body contains the title, description, and dueDate for the new task.
        { title, description, dueDate },
        {
          // withCredentials: true ensures that credentials (like cookies) are included in the request.
          withCredentials: true, // Include credentials with the request
          // headers: { "Content-Type": "application/json" } sets the request header to indicate that the request body is in JSON format.
          headers: { "Content-Type": "application/json" }, // Set the content type header
        }
      )

      

      // .then((res) => { ... }) handles the response from the server if the request is successful.
      .then((res) => {

        // displays a success notification with the message from the response.
        toast.success(res.data.message); // Display success notification

        // Update the tasks state by adding the new task to the existing tasks
        setTasks((prevTasks) => [...prevTasks, res.data.task]);
        // 'prevTasks' represents the current state of tasks
        // The spread operator '...' is used to include all existing tasks in the new array
        // 'res.data.task' is the new task returned from the server response

        // Reset the input fields to their initial empty values
        setTitle("");       // Clear the title input field
        setDescription(""); // Clear the description input field
        setDueDate("");     // Clear the due date input field

        // Close the modal dialog
        handleCreateModalClose();
        // This function triggers the logic to hide the modal from the view
        // Provides a visual indication that the task creation process is complete

      })

      // handles any errors that occur during the request.
      .catch((error) => {
        
        toast.error(error.response.data.message); 
        // displays an error notification with the message from the error response.
      });
  };




  // This marks the beginning of the JSX that will be rendered by the component.
  // The <> and </> tags are React fragments, which allow you to group multiple elements without adding extra nodes to the DOM.
  return (
    <>


    {/* <Modal>: This is a component from react-bootstrap that provides a styled modal dialog.

show={showCreateModal}: This prop determines whether the modal is visible. It is controlled by the showCreateModal prop, which should be a boolean value.
If showCreateModal is true, the modal will be displayed; otherwise, it will be hidden.

onHide={handleCreateModalClose}: This prop specifies the function to call when the modal is requested to be closed (e.g., when clicking outside the modal or pressing the escape key). 

handleCreateModalClose is the function passed as a prop to handle the modal close event. */}
      <Modal show={showCreateModal} onHide={handleCreateModalClose}>

        
        <Modal.Header closeButton>
          <Modal.Title>Create Task</Modal.Title>
        </Modal.Header>



        

        <Modal.Body>

          <Stack gap={3}>
            <label>Title</label>
            <input
              type="text"
              placeholder="Title"

              // value={title}: Binds the value of the input to the title state variable.
              value={title}

              // onChange: This is a built-in event attribute in React that triggers when the value of an input element changes.
              
              // (e): This is a parameter representing the event object that contains information about the event, such as the type of event (onChange), the element (<input> in this case), and the new value of the input field.
              
              // setTitle(e.target.value): This is an arrow function that gets invoked when the onChange event occurs. It updates the state variable title with the new value entered by the user.

              // e.target.value: This retrieves the current value of the input field (<input>). In this context, it refers to the value typed by the user in the input field.
              onChange={(e) => setTitle(e.target.value)} // Update title state on change
            />
          </Stack>


          <br />


          <Stack gap={3}>
            <label>Description</label>
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)} // Update description state on change
            />
          </Stack>


          <br />


          <Stack gap={3}>
            <label>Due date</label>
            <input
              type="date"
              value={dueDate}
              min={today} // Set the minimum date to today's date
              onChange={(e) => setDueDate(e.target.value)} // Update dueDate state on change
            />
          </Stack>

        </Modal.Body>





        <Modal.Footer>

          <Button variant="secondary" onClick={handleCreateModalClose}>
            Close
          </Button>


          <Button variant="primary" onClick={handleCreateTask}>
            Create
          </Button>

        </Modal.Footer>


      </Modal>
    </>
  );
};





// PropTypes validation for props to ensure correct prop types are passed
CreateTaskModal.propTypes = {
  showCreateModal: PropTypes.bool.isRequired, // showCreateModal must be a boolean and is required
  handleCreateModalClose: PropTypes.func.isRequired, // handleCreateModalClose must be a function and is required
  setTasks: PropTypes.func.isRequired, // setTasks must be a function and is required
};





export default CreateTaskModal; // Export the CreateTaskModal component as the default export
