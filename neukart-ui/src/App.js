// import logo from './logo.svg';
// import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import SignIn from "./components/SignIn"
import Dashboard from "./components/Dashboard";


function App() {
  return (
    <div className="App">

      <h1>
        NeuKart-UI
      </h1><BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
          </Route>
        </Routes>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />}>
          </Route>
        </Routes>
      </BrowserRouter>
    </div >
  );
}

export default App;
