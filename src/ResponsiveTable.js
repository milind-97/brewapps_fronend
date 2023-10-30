import React, { useState, useEffect } from "react";
import "./books.css";
import { useNavigate, useLocation } from 'react-router-dom';
import config from './config';

function ResponsiveTable() {
  const baseUrl = config.base_url;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [shouldFetchData, setShouldFetchData] = useState(true);
  const [bookToDelete, setBookToDelete] = useState(null); // Track the book to be deleted
  const navigate = useNavigate();

  useEffect(() => {
    if (shouldFetchData) {
      fetch(`${baseUrl}/api/books`)
        .then((response) => response.json())
        .then((data) => {
          setData(data.books);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoading(false);
        });
    }
    return () => {
      setShouldFetchData(true);
    };
  }, [shouldFetchData]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const handleEdit = (bookID) => {
    navigate(`/books/${bookID}`);
  };

const handleDelete = (item) => {
  // Show the confirmation dialog before deleting
  setBookToDelete(item);
};

const confirmDelete = () => {
  // Send a request to delete the book
  fetch(`${baseUrl}/api/books/${bookToDelete._id}`, {
    method: 'DELETE',
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle success or show a success message
      console.log('Book deleted:', data);
      // Reset the book to be deleted and trigger data fetching
      setBookToDelete(null);
      setShouldFetchData(true); // Trigger data fetching to refresh the list
      navigate('/', { state: { userEdited: true } });
      
    })
    .catch((error) => {
      console.error('Error deleting book:', error);
      // Reset the book to be deleted
      setBookToDelete(null);
    });
};


  const cancelDelete = () => {
    // Cancel the delete action and hide the confirmation dialog
    setBookToDelete(null);
  };

  return (
    <div className="table-container">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Summary</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <tr key={item._id}>
                  <td>{item.title}</td>
                  <td>{item.author}</td>
                  <td>{item.summary}</td>
                  <td>
                    <button onClick={() => handleEdit(item._id)}>Edit</button>
                    <button onClick={() => handleDelete(item)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            {/* Pagination buttons */}
          </div>
        </div>
      )}

      {bookToDelete && (
        <div className="delete-confirmation">
          <p>Are you sure you want to delete the book: {bookToDelete.title}?</p>
          <button onClick={confirmDelete}>Yes</button>
          <button onClick={cancelDelete}>No</button>
        </div>
      )}
    </div>
  );
}

export default ResponsiveTable;
