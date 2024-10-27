import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

function AddUser() {
  const [firstName, setFirstName] = useState(''); 
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [picture, setPicture] = useState('');
  let navigate = useNavigate();

  const formSubmit = (e) => {
    e.preventDefault(); 

    Swal.fire({
      title: 'User Added!',
      text: 'You added the User successfully!',
      icon: 'success',
    });

    axios
      .post('https://dummyapi.io/data/v1/user/create', {
        firstName,
        lastName,
        email,
        picture
      }, {
        headers: { 'app-id': '64fc4a747b1786417e354f31' }, 
      })
      .then((response) => {
        console.log('User Created:', response.data);
        navigate('/'); 
      })
      .catch((error) => {
        console.error('Error creating user:', error);
      });
  };

  return (
    <div className=' full-container '>
    <div className='d-flex justify-content-center align-items-center w-100 h-100'>
    <div className="app-container p-5 bg-white ">
                <div className='d-flex justify-content-center align-items-center flex-column'>
                <p>Upload Photo</p>
                <Form onSubmit={formSubmit} className='w-100 h-75 '>
                    <div className='d-flex justify-content-center align-items-center gap-5'>
                        <Form.Group className="mb-3 w-100" controlId="formFirstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter first name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3 w-100" controlId="formLastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter last name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </div>
                    <div className='d-flex justify-content-center align-items-center gap-5'>
                        <Form.Group className="mb-3 w-100" controlId="formFirstName">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3 w-100" controlId="formLastName">
                            <Form.Label>Picture</Form.Label>
                            <Form.Control
                                type="file"
                                placeholder="choose photo"
                                value={picture}
                                onChange={(e) => setPicture(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                        <Button
                            variant="secondary"
                            className="m-auto"
                            onClick={() => navigate('/')}
                        >
                            Cancel
                        </Button>
                        <Button variant="primary" type="submit" className="m-auto">
                            Save
                        </Button>
                    </div>
                </Form>
                </div>
    </div>
    </div>
</div>
  );
}

export default AddUser;
