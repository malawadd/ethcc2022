import {useState} from 'react';
import {useMoralis} from 'react-moralis';
import Link from "next/link";


export function LoginButton() {
    const {authenticate, isAuthenticated, user, logout} = useMoralis();
    const [isDropdownOpen, toggleDropdown] = useState(false);

    const handleLogin = () => {
        authenticate();
    };

    if (!isAuthenticated) {
        return (
            <div className="nav-item cursor-pointer" onClick={handleLogin}>
                please login
            </div>
        )
    };
    
    return(
        <div
        className="relative inline-block text-left"
        onMouseOver={() => toggleDropdown(true)}
        >
            <div>
                <button>
                Welcome {user.get("ethAddress")}
                </button>
            </div>

            <div
            className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
            onMouseOut={() => toggleDropdown(false)}
            >
                <button
                className="text-gray-700 block w-full text-left px-4 py-2 text-sm"
                onClick={logout}
                >
                    sign out
                </button>

            </div>

        </div>

        
    )
}

// export default LoginButton;