import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import config from './config';
export default function EditUser() {
  const baseUrl = config.base_url;
    const { id } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState({});
    const [formData, setFormData] = useState({
      title: '',
      author: '',
      summary: '',
    });
  
    useEffect(() => { const getUser = axios.get(`${baseUrl}/api/books?book_id=${id}`)
    .then((data)=>{
      console.log(data.data.book)
      setBook(data.data.book);
      setFormData({
        title: data.data.book.title,
        author: data.data.book.author,
        summary: data.data.book.summary,
    
      });
    })
    .catch((err)=>{
        console.log(err)
    })},[id])

    const handleInputChange = event => {
      const { name, value } = event.target;
      setFormData(prevData => ({
        ...prevData,
        [name]: value,
      }));
    };

    const handleSubmit = event => {
      event.preventDefault();
  
      const confirmed = window.confirm('Are you sure you want to update the device details?');

  if (confirmed) {
    // Make API call to update user details
    axios.patch(`${baseUrl}/api/books/${id}`, formData)
      .then(response => {
        // Handle success, e.g., show a success message
        navigate('/', { state: { userEdited: true } });
      })
      .catch(error => {
        console.error('Error updating user details:', error);
        // Handle error, e.g., show an error message
      });
  }
    };
   
  return (
    <form onSubmit={handleSubmit} style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      maxWidth: '400px', // Set the maximum width of the form
      margin: '0 auto', // Center the form horizontally
    }}>
      <div className="mb-3" style={{ width: '100%', textAlign: 'left' }}>
        <label htmlFor="exampleInputEmail1" className="form-label">
        Title
        </label>
        <input
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          name="h"
          value={formData.title}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-3" style={{ width: '100%', textAlign: 'left' }}>
        <label htmlFor="exampleInputPassword1" className="form-label">
        Author
        </label>
        <input
        
          className="form-control"
          id="exampleInputPassword1"
          name="w"
          value={formData.author}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-3" style={{ width: '100%', textAlign: 'left' }}>
        <label htmlFor="exampleInputPassword1" className="form-label">
        Summary
        </label>
        <input
        
          className="form-control"
          id="exampleInputPassword1"
          name="p1"
          value={formData.summary}
          onChange={handleInputChange}
        />
      </div>
      
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  )
}
