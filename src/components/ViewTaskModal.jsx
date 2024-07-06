import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Modal, Stack } from "react-bootstrap";
import toast from "react-hot-toast";
import PropTypes from "prop-types";

const ViewTaskModal = ({ showViewModal, handleViewModalClose, id }) => {
  const [task, setTask] = useState(null);

  useEffect(() => {
    const getSingleTask = async () => {
      try {
        const response = await axios.get(
          `https://deploy-backend-task-manager.onrender.com/api/v1/task/single/${id}`,
          { withCredentials: true }
        );
        setTask(response.data.task);
      } catch (error) {
        console.error("Error fetching task:", error);
        toast.error(error.response.data.message);
      }
    };

    if (id) {
      getSingleTask();
    }
  }, [id]);

  return (
    <Modal show={showViewModal} onHide={handleViewModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>View Task</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {task && (
          <>
            <Stack>
              <p className="fw-bold mb-0">Title</p>
              <p>{task.title}</p>
            </Stack>
            <Stack>
              <p className="fw-bold mb-0">Description</p>
              <p>{task.description}</p>
            </Stack>
            <Stack>
              <p className="fw-bold mb-0">Due Date</p>
              <p>
                {task.dueDate
                  ? new Date(task.dueDate).toLocaleDateString()
                  : "Not specified"}
              </p>
            </Stack>
          </>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleViewModalClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

ViewTaskModal.propTypes = {
  showViewModal: PropTypes.bool.isRequired,
  handleViewModalClose: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default ViewTaskModal;
