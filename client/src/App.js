import Chats from './pages/Chats';
import Home from './pages/Home';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/chats" element={<Chats/>}></Route>
        </Routes>
    </div>
  );
}

export default App;
