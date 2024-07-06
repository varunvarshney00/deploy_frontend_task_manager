import axios from "axios";
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Button, Modal, Stack } from "react-bootstrap";
import toast from "react-hot-toast";
import PropTypes from "prop-types"; // Import PropTypes

const CreateTaskModal = ({ showCreateModal, handleCreateModalClose, setTasks }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  const handleCreateTask = async () => {
    if (new Date(dueDate) < new Date(today)) {
      toast.error("Due date cannot be in the past.");
      return;
    }

    await axios
      .post(
        "https://deploy-backend-task-manager.onrender.com/api/v1/task/post",
        { title, description, dueDate },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {
        toast.success(res.data.message);
        setTasks((prevTasks) => [...prevTasks, res.data.task]);
        setTitle("");
        setDescription("");
        setDueDate("");
        handleCreateModalClose();
      })
      .catch((error) => {
        toast.error(error.response.data.message);
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
              onChange={(e) => setTitle(e.target.value)}
            />
          </Stack>
          <br />
          <Stack gap={3}>
            <label>Description</label>
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Stack>
          <br />
          <Stack gap={3}>
            <label>Due date</label>
            <input
              type="date"
              value={dueDate}
              min={today} // Set the min attribute to today's date
              onChange={(e) => setDueDate(e.target.value)}
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

// PropTypes validation for props
CreateTaskModal.propTypes = {
  showCreateModal: PropTypes.bool.isRequired,
  handleCreateModalClose: PropTypes.func.isRequired,
  setTasks: PropTypes.func.isRequired,
};

export default CreateTaskModal;
