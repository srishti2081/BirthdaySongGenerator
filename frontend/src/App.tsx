import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Details1 from "./pages/Details1";
import Details2 from "./pages/Details2";
import Final from "./pages/Final";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/details1" element={<Details1 />} />
        <Route path="/details2" element={<Details2 />} />
        <Route path="/generate-song" element={<Final />} /> 
        <Route path="/final" element={<Final />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;