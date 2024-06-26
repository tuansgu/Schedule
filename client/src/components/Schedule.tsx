import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

type Task = {
  id: number;
  name: string;
};

const Schedule = () => {
  const [inputValue, setInputValue] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const [schedule, setSchedule] = useState<{ [key: string]: Task[] }>({
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: []
  });
  // create 7 array to contain data in day of week
  const getAllTask = () => {
    axios.get('http://localhost:3002/getAllTask')
      .then(response => {
        console.log(response.data);
        setTasks(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the tasks!", error);
      });
  };
  // get All task in database

  const getTaskSearch = (query: string) => {
    axios.get('http://localhost:3002/getTaskByKey', {
      params: {
        Work: query
      }
    })
      .then(response => {
        console.log(response.data);
        setTasks(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the tasks!", error);
      });
  };
  // search task in database for each letter

  useEffect(() => {
    getAllTask();
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (inputValue) {
        getTaskSearch(inputValue);
      } else {
        getAllTask();
      }
    }, 300); // Debounce time (300ms)

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue]);

  const onDragStart = (task: Task) => {
    setDraggedTask(task);
  };

  const onDrop = (day: string) => {
    if (draggedTask) {
      setSchedule((prevSchedule) => ({
        ...prevSchedule,
        [day]: [...prevSchedule[day], draggedTask],
      }));
      setDraggedTask(null);
    }
  };

  const handleDeleteScheduledTask = (day: string, index: number) => {
    setSchedule((prevSchedule) => {
      const updatedDayTasks = prevSchedule[day].filter((_, taskIndex) => taskIndex !== index);
      return {
        ...prevSchedule,
        [day]: updatedDayTasks,
      };
    });
  };

  return (
    <>
      <div className='text-center justify-content-center d-flex mt-3'>
        <input
          type="text"
          placeholder="Schedule Name"
          className='border border-3 rounded-2 p-2 '
        />
        <button
          type='submit'
          className='btn btn-primary ms-2 border border-3 p-2 '
        >
          Save
        </button>
      </div>
      <div className='d-flex'>
        <div id="Task" style={{ marginTop: '50px' }}>
          <div id="form-insert-task" className='d-inline-block mt-3 p-3 bg-secondary rounded-3' style={{ width: '300px' }}>
            <form
              id="form-insert"
              className='p-3 rounded-4 d-flex align-items-center'
              onSubmit={e => e.preventDefault()}
            >
              <input
                type='text'
                id='input-task'
                className='form-control p-2 rounded-2 me-2'
                placeholder='Search for task in here !!!'
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </form>
            {/* Hiển thị các task ở đây */}
            <div
              className='task-list mt-4 scrollspy-example'
              data-bs-spy="scroll"
              data-bs-target="#navbar-example2"
              data-bs-offset="0"
              tabIndex={0}
              style={{ maxHeight: '70vh', overflowY: 'auto' }} // Thêm kiểu để tạo vùng cuộn
            >
              {tasks.length > 0 ? (
                tasks.map((task, index) => (
                  <div
                    key={task.id}
                    className='task-item bg-light p-3 mb-3 rounded-2'
                    draggable='true'
                    onDragStart={() => onDragStart(task)}
                  >
                    <FontAwesomeIcon icon={faPenToSquare} className='me-2' />
                    {task.name}
                  </div>
                ))
              ) : (
                <p className='text-light text-center'>No tasks available</p>
              )}
            </div>
          </div>
        </div>
        <div id="Schedule" style={{ marginTop: '50px', marginLeft: '30px' }}>
          <table className='table'>
            <thead>
              <tr>
                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(day => (
                  <th key={day} className="p-3 fs-3">{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(day => (
                  <td
                    key={day}
                    className='p-3'
                    onDrop={() => onDrop(day)}
                    onDragOver={(e) => e.preventDefault()}
                    style={{ minHeight: '100px', border: '1px solid #ccc' }}
                  >
                    {schedule[day].map((task, index) => (
                      <div key={task.id} className='bg-light p-2 mb-2 rounded-2'>
                        {task.name}
                        <FontAwesomeIcon
                          icon={faEdit}
                          className="btn ms-auto me-2"
                        // onClick={() => handleEditTime(day, index)}
                        />
                        <FontAwesomeIcon
                          icon={faTrash}
                          className="btn"
                          onClick={() => handleDeleteScheduledTask(day, index)}
                        />
                      </div>
                    ))}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Schedule;
