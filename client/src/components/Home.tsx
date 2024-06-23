// src/components/Home.tsx
import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const Home = () => {
  const [userName, setUserName] = useState<string>('');
  const navigateTo = useNavigate();

  useEffect(() => {
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      setUserName(user.name);
    }
  }, []);

  const Logout = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    localStorage.removeItem('user');
    navigateTo('/login');
  };

  return (
    <div className="d-flex" id="wrapper">
      <div className="bg-secondary border-right text-center p-3 d-flex flex-column justify-content-between" style={{ height: '100vh' }} id="sidebar-wrapper">
        <div>
          <div className="sidebar-heading mt-3 mb-3 text-light " style={{ fontSize: '24px' }}>
            Welcome, {userName}
          </div>
          <div className="list-group list-group-flush">
            <Link to="/home/dashboard" className="list-group-item list-group-item-action bg-light rounded-3 mb-3">
              Dashboard
            </Link>
            <Link to="/home/user" className="list-group-item list-group-item-action rounded-3 bg-light mb-3">
              Information Of User
            </Link>
            <Link to="/home/schedule" className="list-group-item list-group-item-action bg-light rounded-3 mb-3">
              Management Of Schedule
            </Link>
            <Link to="/home/task" className="list-group-item list-group-item-action bg-light rounded-3 mb-3">
              Management Of Task
            </Link>
          </div>
        </div>
        <div className='list-group list-group-flush'>
          <Link to="/logout" className="list-group-item list-group-item-action bg-light rounded-3 mb-3" onClick={Logout}>
            Log Out
          </Link>
        </div>
      </div>
      <div id="page-content-wrapper">
        <div className="container-fluid">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Home;
