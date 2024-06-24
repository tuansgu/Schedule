import React, { useEffect, useState } from 'react';

const User = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [createAt, setCreateAt] = useState(new Date()); // Initialize createAt with a Date object
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        const userString = localStorage.getItem('user');
        console.log(typeof(userString))
        if (userString) {
            const user = JSON.parse(userString);
            setUserName(user.username);
            setPassword(user.password);
            setEmail(user.email);
            setName(user.name);
            setAddress(user.address);
            setCreateAt(new Date(user.created_at)); // Parse create_at to a Date object
        }
    }, []);

    const handleUpdate = (e) => {
        e.preventDefault();
        
    }

    const handleChangePassword = (e) => {
        e.preventDefault();
        // Handle change password logic here
        console.log('Password change requested');
    }

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    return (
        <div className='container mt-5'>
            <h1 className='text-center mb-4'>
                User's Information
            </h1>
            <form>
                <div className="row justify-content-around">
                    <div className='form-group col-4'>
                        <label htmlFor='name'>Name</label>
                        <input
                            type='text'
                            className='form-control mb-3'
                            id='name'
                            value={name}
                            readOnly
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className='form-group col-4'>
                        <label htmlFor='createAt'>Created at</label>
                        <input
                            type='text'
                            className='form-control mb-3'
                            id='createAt'
                            value={createAt.toLocaleString()} // Format createAt as desired
                            readOnly
                        />
                    </div>
                </div>
                <div className="row justify-content-around">
                    <div className='form-group col-4'>
                        <label htmlFor='username'>Username</label>
                        <input
                            type='text'
                            className='form-control mb-3'
                            id='username'
                            readOnly
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                    </div>
                    <div className='form-group col-4'>
                        <label htmlFor='email'>Email</label>
                        <input
                            type='email'
                            readOnly
                            className='form-control mb-3'
                            id='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </div>
                <div className="row justify-content-around">
                    <div className='form-group col-4'>
                        <label htmlFor='password'>Password</label>
                        <div className='input-group mb-2'>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                className='form-control'
                                id='password'
                                readOnly
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className='input-group-append'>
                                <button
                                    type='button'
                                    className='btn btn-outline-secondary'
                                    style={{ fontSize: '14px' }}
                                    onClick={toggleShowPassword}
                                >
                                    {showPassword ? 'Hide' : 'Show'}
                                </button>
                            </div>
                    </div>
                    <div className='form-group col-4'>
                        <label htmlFor='address'>Address</label>
                        <input
                            type='text'
                            className='form-control mb-3'
                            id='address'
                            readOnly
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                </div>
                <div className='d-flex justify-content-around'>
                    <button type='button' className='btn btn-primary mt-3' onClick={handleChangePassword}>
                        Change Password
                    </button>
                    <button type='button' className='btn btn-primary mt-3' onClick={handleUpdate}>
                        Update
                    </button>
                </div>
            </form>
            
        </div>
    );
}

export default User;
