import { BrowserRouter, Routes, Route } from "react-router-dom";
import CustomerLogin from "../pages/CustomerLogin";
import CustomerHome from "../pages/CustomerHome";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CustomerLogin />} />
        <Route path="/customer" element={<CustomerHome />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
