import React, { useEffect, useState } from 'react';
import '../App.css';
import { FaPlus, FaTrash, FaEdit } from 'react-icons/fa';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

function AllUsers() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAllUsers(); 
  }, []);

  const getAllUsers = () => {
    axios
      .get('https://dummyapi.io/data/v1/user', {
        headers: { 'app-id': '64fc4a747b1786417e354f31' },
      })
      .then((res) => {
        console.log(`zyad`, res );
        setUsers(res.data.data);
      })
      .catch((err) => {
        console.error('Error fetching users:', err);
        setError('Failed to fetch users');
      });
  };

  const DeleteUser = (userId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://dummyapi.io/data/v1/user/${userId}`, {
            headers: { 'app-id': '64fc4a747b1786417e354f31' }, 
          })
          .then((response) => {
            console.log('User Deleted:', response.data);
            getAllUsers(); 
            Swal.fire('Deleted!', 'The user has been deleted.', 'success');
          })
          .catch((error) => {
            console.error('Error deleting user:', error);
            Swal.fire('Error!', 'Failed to delete the user.', 'error');
          });
      }
    });
  };

  return (
    <div className='d-flex justify-content-center align-items center  full-container'>

    <div className="app-container w-100">
      <div className="search-container">
        <input type="text" placeholder="Search by Name" className="w-100" />
      </div>
      <Link className="add-btn " to={'/add'}>
        <FaPlus /> Add New Contact
      </Link>

      <div className="contact-list">
        {users.map((user) => (
          <div className="contact-item" key={user.id}>
            <img
              src={user.picture}
              alt={user.firstName}
              className="contact-image"
            />
            <div className="contact-info">
              <h3>{`${user.firstName} ${user.lastName}`}</h3>
              <p>1233545</p>
            </div>
            <div className="contact-actions">
              <Link className="edit-btn" to={`/update/${user.id}`}>
                <FaEdit />
              </Link>
              <button
                className="delete-btn"
                onClick={() => {
                  DeleteUser(user.id);
                }}
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button>&lt;</button>
        <span>1 / 10</span>
        <button>&gt;</button>
      </div>
    </div>
    </div>
  );
}

export default AllUsers;
