import Header from './components/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Chats from './pages/Chats';


function App() {
  
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
          <Route path = "/login" element = {<Login/>}/>
          <Route path = "/register" element = {<Register/>}/>
          <Route path="/chats" element={<Chats />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
