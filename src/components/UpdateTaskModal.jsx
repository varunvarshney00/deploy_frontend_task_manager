import { useEffect, useState } from "react";
import { Button, Modal, Stack } from "react-bootstrap";
import toast from "react-hot-toast";
import axios from "axios";
import PropTypes from "prop-types";






const UpdateTaskModal = ({
  showUpdateModal,
  handleUpdateModalClose,
  id,
  setTasks,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("incomplete");
  const [archived, setArchived] = useState(false);






  useEffect(() => {
    const getSingleTask = async () => {
      try {
        const response = await axios.get(
          `https://deploy-backend-task-manager.onrender.com/api/v1/task/single/${id}`,
          { withCredentials: true }
        );
        const taskData = response.data.task;
        setTitle(taskData.title);
        setDescription(taskData.description);
        setStatus(taskData.status);
        setArchived(taskData.archived);
      } catch (error) {
        console.error("Error fetching task:", error);
        toast.error(error.response.data.message);
      }
    };

    if (id) {
      getSingleTask();
    }
  }, [id]);






  const handleUpdateTask = async () => {
    try {
      const response = await axios.put(
        `https://deploy-backend-task-manager.onrender.com/api/v1/task/update/${id}`,
        { title, description, status, archived },
        { withCredentials: true }
      );
      toast.success(response.data.message);

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === id
            ? { ...task, title, description, status, archived }
            : task
        )
      );
      handleUpdateModalClose();
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error(error.response.data.message);
    }
  };




  

  return (

    <Modal show={showUpdateModal} onHide={handleUpdateModalClose}>





      <Modal.Header closeButton>
        <Modal.Title>Update Task</Modal.Title>
      </Modal.Header>





      <Modal.Body>

        <Stack gap={2}>
          <label>Title</label>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Stack>


        <br />


        <Stack gap={2}>
          <label>Description</label>
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Stack>


        <br />


        <Stack gap={2}>
          <label>Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="completed">COMPLETED</option>
            <option value="incomplete">INCOMPLETE</option>
          </select>
        </Stack>


        <br />


        <Stack gap={2}>
          <label>Archived</label>
          <select value={archived} onChange={(e) => setArchived(e.target.value)}>
            <option value={true}>YES</option>
            <option value={false}>NO</option>
          </select>
        </Stack>

      </Modal.Body>





      <Modal.Footer>
        <Button variant="secondary" onClick={handleUpdateModalClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleUpdateTask}>
          Update
        </Button>
      </Modal.Footer>





    </Modal>
  );
};






UpdateTaskModal.propTypes = {
  showUpdateModal: PropTypes.bool.isRequired,
  handleUpdateModalClose: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  setTasks: PropTypes.func.isRequired,
};

export default UpdateTaskModal;
