import axios from "axios";
import { useState } from "react";
import { Button, Card, Stack } from "react-bootstrap";
import toast from "react-hot-toast";
import CreateTaskModal from "./CreateTaskModal";
import UpdateTaskModal from "./UpdateTaskModal";
import ViewTaskModal from "./ViewTaskModal";
import { FaEye } from "react-icons/fa";
import { MdEdit, MdDelete } from "react-icons/md";
import { Navigate } from "react-router-dom";

const Home = ({ isAuthenticated, tasks, setTasks, taskTitle }) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewTaskId, setViewTaskId] = useState(null);
  const [updatedTaskId, setUpdateTaskId] = useState(null);

  const deleteTask = async (id) => {
    try {
      const response = await axios.delete(
        `https://deploy-backend-task-manager.onrender.com/api/v1/task/delete/${id}`,
        {
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleCreateModalClose = () => setShowCreateModal(false);
  const handleUpdateModalClose = () => setShowUpdateModal(false);
  const handleViewModalClose = () => setShowViewModal(false);

  const handleCreateModalShow = () => setShowCreateModal(true);

  const handleUpdateModalShow = (id) => {
    setUpdateTaskId(id);
    setShowUpdateModal(true);
  };

  const handleViewModalShow = (id) => {
    setViewTaskId(id);
    setShowViewModal(true);
  };

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="container my-4">
      <div className="row mb-3">
        <div className="col">
          <h1>{taskTitle}</h1>
        </div>
        <div className="col text-end">
          <Button variant="primary" onClick={handleCreateModalShow}>
            Create Task
          </Button>
        </div>
      </div>

      <div className="row">
        {tasks && tasks.length > 0 ? (
          tasks.map((task) => (
            <div key={task._id} className="col-lg-3 col-md-4 col-sm-6">
              <Card style={{ marginBottom: "20px", minHeight: "400px", backgroundColor: "#242424" }}>
                <Card.Body className="d-flex flex-column justify-content-between">
                  <Stack gap={2}>


                    <Card.Title
                      className="mb-2"
                      style={{
                        height: "50px",
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                        color: "#85929E ",
                      }}
                    >
                      {task && task.title.length <= 20
                        ? task.title
                        : task.title.slice(0, 20) + "..."}
                    </Card.Title>

                    

                    <Card.Text style={{ flexGrow: 1 }}>
                      {task && task.description.length <= 300
                        ? task.description
                        : task.description.slice(0, 280) + "..."}
                    </Card.Text>

                    {/* Due Date */}
                    <Stack direction="horizontal" gap={3} className="mt-auto">
                      <p className="fw-bold mb-3">Due Date:</p>
                      <p>
                        {task.dueDate
                          ? new Date(task.dueDate).toLocaleDateString()
                          : "Not specified"}
                      </p>
                    </Stack>
                  </Stack>
                  <Stack
                    direction="horizontal"
                    className="justify-content-end"
                    gap={2}
                  >
                    <MdEdit
                      onClick={() => handleUpdateModalShow(task._id)}
                      className="fs-3 text-primary"
                      style={{ cursor: "pointer" }}
                    />
                    <MdDelete
                      onClick={() => deleteTask(task._id)}
                      className="fs-3 text-danger"
                      style={{ cursor: "pointer" }}
                    />
                    <FaEye
                      onClick={() => handleViewModalShow(task._id)}
                      className="fs-3 text-info"
                      style={{ cursor: "pointer" }}
                    />
                  </Stack>
                </Card.Body>
              </Card>
            </div>
          ))
        ) : (
          <h1>YOU DO NOT HAVE ANY {taskTitle}</h1>
        )}
      </div>

      <CreateTaskModal
        handleCreateModalClose={handleCreateModalClose}
        showCreateModal={showCreateModal}
        setTasks={setTasks}
      />

      <UpdateTaskModal
        handleUpdateModalClose={handleUpdateModalClose}
        showUpdateModal={showUpdateModal}
        id={updatedTaskId}
        setTasks={setTasks}
      />

      <ViewTaskModal
        handleViewModalClose={handleViewModalClose}
        showViewModal={showViewModal}
        id={viewTaskId}
      />
    </div>
  );
};

export default Home;
