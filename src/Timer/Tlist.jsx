import React, { useState } from 'react';
import Suggestions from './Suggestions';
import ProgressTracking from './ProgressTracking';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Tlist.css';
import { faEdit, faTrash, faTimes } from '@fortawesome/free-solid-svg-icons';

function TaskList() {
  const [tasks, setTasks] = useState([
    { id: 1, name: 'Complete project proposal', completed: false, deadline: '2024-09-18', priority: 'High', category: 'Work', milestones: [], completedMilestones: 0, isEditing: false },
    { id: 2, name: 'Prepare for the meeting', completed: false, deadline: '2024-09-19', priority: 'Medium', category: 'Work', milestones: [], completedMilestones: 0, isEditing: false },
  ]);

  const [newTask, setNewTask] = useState({ name: '', deadline: '', priority: '', category: '', milestones: '' });
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  const addTask = () => {
    if (newTask.name && newTask.deadline && newTask.priority) {
      const milestonesArray = newTask.milestones ? newTask.milestones.split(',').map(m => ({ name: m.trim(), completed: false })) : [];
      setTasks([
        ...tasks,
        { ...newTask, id: tasks.length + 1, completed: false, isEditing: false, milestones: milestonesArray, completedMilestones: 0 }
      ]);
      setNewTask({ name: '', deadline: '', priority: '', category: '', milestones: '' });
    } else {
      alert("Please fill in all fields");
    }
  };

  const startEditing = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, isEditing: true } : task));
  };

  const saveTask = (id, updatedTask) => {
    setTasks(tasks.map(task => task.id === id ? { ...updatedTask, id, isEditing: false } : task));
    setSelectedTaskId(null);
  };

  const cancelEditing = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, isEditing: false } : task));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
    setSelectedTaskId(null);
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const toggleMilestoneComplete = (taskId, milestoneIndex) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        const updatedMilestones = task.milestones.map((m, index) => (
          index === milestoneIndex ? { ...m, completed: !m.completed } : m
        ));

        // Count completed milestones
        const completedMilestones = updatedMilestones.filter(m => m.completed).length;
        return { ...task, milestones: updatedMilestones, completedMilestones };
      }
      return task;
    }));
  };

  // Updated calculateTaskProgress function
  const calculateTaskProgress = (task) => {
    if (task.milestones.length === 0) {
      // If the task has no milestones, return 100% progress if the task is completed
      return task.completed ? 100 : 0;
    }

    // If the task has milestones, calculate progress based on completed milestones
    const completedMilestones = task.milestones.filter(milestone => milestone.completed).length;
    return (completedMilestones / task.milestones.length) * 100;
  };

  return (
    <div className="task-list">
      <h2>Your Tasks</h2>

      <div className="task-form">
        <input
          type="text"
          placeholder="Task Name"
          value={newTask.name}
          onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
        />
        <input
          type="date"
          value={newTask.deadline}
          onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
        />
        <select
          value={newTask.priority}
          onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
        >
          <option value="">Priority</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <input
          type="text"
          placeholder="Category"
          value={newTask.category}
          onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
        />
        <input
          type="text"
          placeholder="Milestones (comma separated)"
          value={newTask.milestones}
          onChange={(e) => setNewTask({ ...newTask, milestones: e.target.value })}
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <span onClick={() => setSelectedTaskId(task.id === selectedTaskId ? null : task.id)}>
              <strong>{task.name}</strong>
            </span>
            {selectedTaskId === task.id && (
              <div className="task-details">
                
                
                {task.isEditing ? (
                  <>
                    <input
                      type="text"
                      value={task.name}
                      onChange={(e) => setTasks(tasks.map(t => t.id === task.id ? { ...t, name: e.target.value } : t))}
                    />
                    <input
                      type="date"
                      value={task.deadline}
                      onChange={(e) => setTasks(tasks.map(t => t.id === task.id ? { ...t, deadline: e.target.value } : t))}
                    />
                    <select
                      value={task.priority}
                      onChange={(e) => setTasks(tasks.map(t => t.id === task.id ? { ...t, priority: e.target.value } : t))}
                    >
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                    <input
                      type="text"
                      value={task.category}
                      onChange={(e) => setTasks(tasks.map(t => t.id === task.id ? { ...t, category: e.target.value } : t))}
                    />
                    <button className="save" onClick={() => saveTask(task.id, task)}>
                      Save Changes
                    </button   >
                    <button  className='save' onClick={() => cancelEditing(task.id)}>
                      <FontAwesomeIcon icon={faTimes} />
                    </button>
                  </>
                ) : (
                  <>
                    {/* <p>Deadline: {task.deadline}</p>
                    <p>Priority: {task.priority}</p>
                    <p>Category: {task.category}</p> */}
                    {/* <p>Milestones:</p>
                    <ul>
                      {task.milestones.map((milestone, index) => (
                        <li key={index} style={{ display: 'flex', alignItems: 'center' }}>
                          <input
                            type="checkbox"
                            checked={milestone.completed}
                            onChange={() => toggleMilestoneComplete(task.id, index)}
                          />
                          <span style={{ marginLeft: '10px' }}>{milestone.name}</span>
                        </li>
                      ))}
                    </ul>
                    <p>Progress: {calculateTaskProgress(task)}%</p>
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleComplete(task.id)}
                    /> */}

<div style={{display: "flex", justifyContent:"space-between"}}>
                     {/* Milestones and Progress in the Middle */}
    <div className="task-middle">
      <p>Milestones:</p>
      <ul>
        {task.milestones.map((milestone, index) => (
          <li key={index} style={{ display: 'flex', alignItems: 'center' }}>
            <input
              type="checkbox"
              checked={milestone.completed}
              onChange={() => toggleMilestoneComplete(task.id, index)}
            />
            <span style={{ marginLeft: '10px' }}>{milestone.name}</span>
          </li>
        ))}
      </ul>
      <p>Progress: {calculateTaskProgress(task)}%</p>
    </div>

                    {/* Deadline, Priority, Category, and Complete Checkbox */}
    <div className="task-info">
      <div className="">
        <p>Deadline: {task.deadline}</p>
      </div>
      <div className="">
        <p>Priority: {task.priority}</p>
      </div>
      <div className="">
        <p>Category: {task.category}</p>
      </div>
      <div className="">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleComplete(task.id)}
        />
          <span>{task.completed ? 'Completed' : 'Complete?'}</span>
                    <div className="task-action">
                      <button onClick={() => startEditing(task.id)}>
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button onClick={() => deleteTask(task.id)}>
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
        </div>
        </div>
      </div>
                   
                  </>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>

      <ProgressTracking tasks={tasks} calculateTaskProgress={calculateTaskProgress} />

      <Suggestions tasks={tasks} />
    </div>
  );
}

export default TaskList;
