import { useState } from "react";
import { useMoralis } from "react-moralis";
import Link from "next/link";

export function LoginButton() {
  const { authenticate, isAuthenticated, user, logout } = useMoralis();
  const [isDropdownOpen, toggleDropdown] = useState(false);

  const handleLogin = () => {
    authenticate();
  };

  if (!isAuthenticated) {
    return (
      <div className="nav-item cursor-pointer" onClick={handleLogin}>
         login
      </div>
    );
  }

  return (
    <div
     className="relative inline-block text-left bg-pink-300" 
     onMouseOver={() => toggleDropdown(true)}>
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 bg-pink-500"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
        >
          Welcome {user.get("ethAddress")}
        </button>
       
      </div>

      <div 
        className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" 
        onMouseOut={() => toggleDropdown(false)}
        style={{ display: !isDropdownOpen && "none" }}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        tabIndex="-1"
        >
        <div lassName="py-1" role="none">
            <Link href="/playground">
            <a
              className="text-gray-700 block px-4 py-2 text-sm"
              role="menuitem"
              tabIndex="-1"
              id="menu-item-0"
            >
              Account settings
            </a>
            </Link>
            <button 
            type="submit"
            className="text-gray-700 block w-full text-left px-4 py-2 text-sm"
            role="menuitem"
            tabIndex="-1"
            id="menu-item-3"
            onClick={logout}
            >
            sign out
            </button>

        </div>
        
      </div>
    </div>
  );
}

// export default LoginButton;
