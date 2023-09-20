import React, { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  AiOutlinePlus,
  AiOutlineDelete,
  AiOutlineClose,
  AiOutlineEdit,
} from "react-icons/ai";
import "./index.css";
function App() {
  const [boards, setBoards] = useState([]);
  const [boardInput, setBoardInput] = useState("");
  const [taskInput, setTaskInput] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedTask, setEditedTask] = useState({
    id: null,
    name: "",
    dueDate: null,
    description: "",
  });

  useEffect(() => {
    const storedBoards = localStorage.getItem("boards");
    if (storedBoards) {
      setBoards(JSON.parse(storedBoards));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("boards", JSON.stringify(boards));
  }, [boards]);

  const createBoard = () => {
    const newBoard = {
      id: Date.now(),
      name: boardInput,
      tasks: [],
    };
    setBoards([...boards, newBoard]);
    setBoardInput("");
  };

  const deleteBoard = (boardId) => {
    const updatedBoards = boards.filter((board) => board.id !== boardId);
    setBoards(updatedBoards);
  };

  const handleSubmit = (e, boardId) => {
    e.preventDefault();
    const newTask = {
      id: Math.floor(Math.random() * 1000),
      name: taskInput,
      dueDate: "",
      description: "",
      completed: false,
    };

    const updatedBoards = boards.map((board) =>
      board.id === boardId
        ? { ...board, tasks: [...board.tasks, newTask] }
        : board
    );

    setBoards(updatedBoards);
    setTaskInput("");
  };

  const deleteTask = (boardId, taskId) => {
    const updatedBoards = boards.map((board) =>
      board.id === boardId
        ? { ...board, tasks: board.tasks.filter((task) => task.id !== taskId) }
        : board
    );
    setBoards(updatedBoards);
  };

  const toggleComplete = (boardId, taskId) => {
    const updatedBoards = boards.map((board) =>
      board.id === boardId
        ? {
            ...board,
            tasks: board.tasks.map((task) =>
              task.id === taskId
                ? { ...task, completed: !task.completed }
                : task
            ),
          }
        : board
    );
    setBoards(updatedBoards);
  };

  const openEditModal = (taskId) => {
    const taskToEdit = findTaskById(taskId);
    setEditedTask(taskToEdit);
    setIsModalOpen(true);
  };

  const closeEditModal = () => {
    setIsModalOpen(false);
  };

  const findTaskById = (taskId) => {
    for (const board of boards) {
      for (const task of board.tasks) {
        if (task.id === taskId) {
          return task;
        }
      }
    }
    return null;
  };

  const handleEditModalChange = (e) => {
    const { name, value } = e.target;
    setEditedTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleDateChange = (date) => {
    setEditedTask((prevTask) => ({ ...prevTask, dueDate: date }));
  };

  const saveEditedTask = () => {
    const updatedBoards = boards.map((board) => ({
      ...board,
      tasks: board.tasks.map((task) =>
        task.id === editedTask.id ? { ...editedTask } : task
      ),
    }));
    setBoards(updatedBoards);
    setIsModalOpen(false);
  };

  const date = new Date();
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return (
    <div className="app">
      <div id="container">
        <center>
          <h1>Add a List Of Tasks!!</h1>
        </center>
        <div className="board-selector">
          <input
            value={boardInput}
            id="sinput"
            onChange={(e) => setBoardInput(e.target.value)}
            placeholder="Enter board name"
            type="text"
          />
          <button onClick={createBoard}>Create List</button>
        </div>
        <div className="taskss">
          {boards.map((board) => (
            <div key={board.id} className="board">
              <h2>{board.name}</h2>

              <form onSubmit={(e) => handleSubmit(e, board.id)}>
                <div className="form-input">
                  <AiOutlinePlus className="icon" />
                  <input
                    value={taskInput}
                    onChange={(e) => setTaskInput(e.target.value)}
                    placeholder="Enter a task"
                    type="text"
                  />
                </div>
              </form>
              <div>
                {board.tasks.map((task) => (
                  <div
                    className={`task-row ${task.completed ? "completed" : ""}`}
                    key={task.id}
                    onDoubleClick={() => toggleComplete(board.id, task.id)}>
                    <h1>{task.name}</h1>
                    <div className="task-details">
                      {task.description && (
                        <p className="description">
                          <strong>Description</strong>
                          <p>{task.description}</p>
                        </p>
                      )}
                      {task.dueDate && (
                        <p className="due-date">
                          <p>Due Date:</p>{" "}
                          <span>{new Date(task.dueDate).toLocaleString()}</span>
                        </p>
                      )}
                    </div>
                    <div className="task-icons">
                      <AiOutlineEdit
                        onClick={() => openEditModal(task.id)}
                        className="icon"
                      />
                      <AiOutlineClose
                        onClick={() => deleteTask(board.id, task.id)}
                        className="icon"
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="innerboard">
                <div className="bottomsection">
                  <button
                    onClick={() => deleteBoard(board.id)}
                    className="delete-board-button">
                    <AiOutlineDelete width={32} height={32} />
                  </button>

                  <p className="length">
                    {board.tasks.length === 0
                      ? "You have no tasks"
                      : `Tasks: ${board.tasks.length}`}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Edit Task Modal */}
        {isModalOpen && (
          <div
            className="edit-task-modal"
            style={{
              backdropFilter: "blur(5px)",
              backgroundColor: "rgb(28, 67, 126,.4)",
            }}>
            <div className="edit-task-modal-content">
              <div className="edit-task-modal-header">
                <span className="close" onClick={closeEditModal}>
                  &times;
                </span>
                <h2>Edit Task</h2>
              </div>
              <div className="edit-task-modal-body">
                <label htmlFor="taskName">Task Name:</label>
                <input
                  type="text"
                  id="taskName"
                  name="name"
                  value={editedTask.name}
                  onChange={handleEditModalChange}
                />
                <label htmlFor="dueDate">Due Date:</label>
                <ReactDatePicker
                  id="dueDate"
                  selected={
                    editedTask.dueDate ? new Date(editedTask.dueDate) : null
                  }
                  onChange={handleDateChange}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  dateFormat="MMMM d, yyyy h:mm aa"
                  className="date-picker"
                />
                <label htmlFor="description">Description:</label>
                <textarea
                  id="description"
                  name="description"
                  value={editedTask.description}
                  onChange={handleEditModalChange}
                />
              </div>
              <div className="edit-task-modal-footer">
                <button onClick={saveEditedTask}>Save</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
