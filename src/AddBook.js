import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import config from './config';
export default function AddBook() {
  const baseUrl = config.base_url;
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      title: '',
      author: '',
      summary: ''
    });
  

    const handleInputChange = event => {
      const { name, value } = event.target;
      setFormData(prevData => ({
        ...prevData,
        [name]: value,
      }));
    };

    const handleSubmit = event => {
      event.preventDefault();
  
     
  
    // Make API call to add book details
    axios.post(`https://brewapps-backend.onrender.com/api/books`, formData)
      .then(response => {
        navigate('/', { state: { userEdited: true } });
      })
      .catch(error => {
        console.error('Error updating user details:', error);
      });
  
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
          name="title"
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
          name="author"
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
          name="summary"
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
