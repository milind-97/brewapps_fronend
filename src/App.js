import logo from './logo.svg';
import './App.css';
import BookEdit from "./BookEdit";
import { BrowserRouter as Router, Routes, Route,Navigate  } from 'react-router-dom';
import ResponsiveTable from "./ResponsiveTable";
import AddBook from './AddBook';
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={ <ResponsiveTable />} />
          <Route path="/books/:id" element={ <BookEdit />} />
          <Route path="/book" element={<AddBook />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
