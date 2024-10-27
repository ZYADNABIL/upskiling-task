import logo from './logo.svg';
import './App.css';
import AllUsers from './pages/AllUsers';
import { Route, Routes } from 'react-router-dom';
import AddUser from './pages/AddUser';
import UpdateUser from './pages/UpdateUser';
function App() {
  return (
    <div>
    <Routes>
      <Route path="/" element={<AllUsers />} />
      <Route path="add" element={<AddUser />} />
      <Route path='update/:userId' element={<UpdateUser/>}/>
    </Routes>
  </div>
  );
}

export default App;
