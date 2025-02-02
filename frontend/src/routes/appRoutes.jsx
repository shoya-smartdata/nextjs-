import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./privateRoutes";
import Login from "../Pages/Login";
import Dashboard from "../pages/Dashboard";
import Layout from '../Components/Layout';
import Register from "../Pages/Register";
import AboutUs from "../Pages/AboutUs";
import ContactUs from "../Pages/ContactUs";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
       
        <Route element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
        </Route>
        
        {/* Redirect or handle other routes like Home here */}
        <Route path="/" element={<Layout />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
