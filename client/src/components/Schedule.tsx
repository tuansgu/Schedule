import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'; // Không cần destructure Axios

type Task = {
  id: number;
  name: string;
};

const Schedule = () => {
  const [inputValue, setInputValue] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]); // State để lưu trữ danh sách tasks

  const getAllTask = () => {
    axios.get('http://localhost:3002/getAllTask')
      .then(response => {
        console.log(response.data)
        setTasks(response.data); // Cập nhật state tasks với dữ liệu nhận được từ API

      })
      .catch(error => {
        console.error("There was an error fetching the tasks!", error);
      });
  };

  useEffect(() => {
    getAllTask(); // Gọi hàm getAllTask khi component được mount
  }, []);

  return (
    <>
      <div className='' style={{ marginTop: '50px' }}>
        <div className='text-center justify-content-center d-flex'>
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
        <div id="form-insert-task" className='d-inline-block mt-3 p-3 bg-secondary rounded-3'>
          <h4 className='text-light text-center'>
            Insert Task
          </h4>
          <form
            id="form-insert"
            className='p-4 rounded-4 d-flex align-items-center'
            onSubmit={e => e.preventDefault()}
          >
            <input
              type='text'
              id='input-task'
              className='form-control w-80 p-2 rounded-2 me-2'
              placeholder='Enter task'
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button
              type='button'
              className='btn btn-light p-2 rounded-2'
            >
              Insert
            </button>
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
              tasks.map(task => (
                <div 
                key={task.id} className='task-item bg-light p-3 mb-3 rounded-2' 
                draggable='true'  
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
    </>
  );
}

export default Schedule;
