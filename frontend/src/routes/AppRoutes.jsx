import { BrowserRouter, Routes, Route } from "react-router-dom";
import CustomerLogin from "../pages/CustomerLogin";

function AppRoutes(params) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CustomerLogin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
