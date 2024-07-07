import axios from "axios"; // Import the axios library for making HTTP requests
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react"; // Import React and useState hook for managing component state
import { Button, Modal, Stack } from "react-bootstrap"; // Import Bootstrap components for styling
import toast from "react-hot-toast"; // Import toast for displaying notifications
import PropTypes from "prop-types"; // Import PropTypes for prop type validation





// Define the CreateTaskModal functional component
const CreateTaskModal = ({ showCreateModal, handleCreateModalClose, setTasks }) => {





  // Define state variables for title, description, and due date using the useState hook
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");





  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];





  // Function to handle the creation of a new task
  const handleCreateTask = async () => {


    // Check if the due date is in the past
    if (new Date(dueDate) < new Date(today)) {
      toast.error("Due date cannot be in the past."); // Display error notification
      return;
    }





    // Make a POST request to the backend API to create a new task
    await axios
      .post(
        "https://deploy-backend-task-manager.onrender.com/api/v1/task/post",
        { title, description, dueDate },
        {
          withCredentials: true, // Include credentials with the request
          headers: { "Content-Type": "application/json" }, // Set the content type header
        }
      )


      .then((res) => {
        toast.success(res.data.message); // Display success notification
        // Update the tasks state by adding the new task to the existing tasks
        setTasks((prevTasks) => [...prevTasks, res.data.task]);
        // Reset the input fields
        setTitle("");
        setDescription("");
        setDueDate("");
        // Close the modal
        handleCreateModalClose();
      })
      .catch((error) => {
        toast.error(error.response.data.message); // Display error notification
      });
  };





  return (
    <>
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
              value={title}
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
