// import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavBar } from "./Component/Navbar";
import { Landing } from "./Component/Landing";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SignUp } from "./Component/Register";
import { Login } from "./Component/Login";
import { Inventory } from "./Component/Inventory";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/api/users/login" element={<Login />} />
        <Route path="/api/users" element={<SignUp />} />
        <Route path="/api/products/inventory" element={<Inventory />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
