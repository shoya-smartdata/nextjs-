import { Fragment, useState, useEffect } from "react";
import { Menu, Transition } from "@headlessui/react";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import authService from "../services/authService";

const Navbar = () => {
  const [token, setToken] = useState(null);

  // Check for token in localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const nevigate = useNavigate();

  // Function to handle logout
  const handleLogout = async() => {
    await authService.logout(nevigate); // Call the logout function from authService
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold">CRM System</h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <NavLink to="/" className="hover:text-gray-200">Home</NavLink>
            <NavLink to="/aboutus" className="hover:text-gray-200">About</NavLink>
            <NavLink to="/contact" className="hover:text-gray-200">Contact</NavLink>
            
            {token ? ( // If the user is logged in (has a token)
              <>
                <NavLink to="/dashboard" className="hover:text-gray-200">Dashboard</NavLink>
                <Menu as="div" className="relative">
                  <Menu.Button className="flex items-center space-x-2 hover:bg-blue-500 p-2 rounded-lg">
                    <FaUserCircle className="h-8 w-8 text-white" />
                    <span className="hidden md:block">Profile</span>
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 text-gray-800">
                      <Menu.Item>
                        {({ active }) => (
                          <NavLink to="/profile" className={`block px-4 py-2 ${active ? "bg-gray-100" : ""}`}>
                            My Profile
                          </NavLink>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={`block w-full text-left px-4 py-2 ${active ? "bg-gray-100" : ""}`}
                            onClick={handleLogout} // Calling the logout function
                          >
                            Logout
                          </button>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </>
            ) : ( // If the user is not logged in
              <NavLink to="/login" className="hover:text-gray-200">Login</NavLink>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
