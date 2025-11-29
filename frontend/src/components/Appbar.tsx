import { Link } from "react-router-dom"
import { Avatar } from "./PostCard"
import mediumLogo from "../assets/Medium-Wordmark-Black.svg"
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";


export const Appbar = ({name} : {name: string}) => { 
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [])

    function handleLogout() {
        localStorage.removeItem("token");
        navigate("/signin");
    }
    
    return <div className="border-b flex justify-between px-10 py-4">
        <Link to={'/posts'} className="flex flex-col justify-center cursor-pointer">
                <img src= {mediumLogo} alt="Medium Logo" className="h-8"/>
        </Link>
        <div className="flex justify-center">
            <Link to={`/publish`}>
                <button type="button" className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 ">New</button>
            </Link>    
            <div className="relative" ref={dropdownRef}>
        <button onClick={() => setOpen((prev) => !prev)}>
          <Avatar size="big" name={name} />
        </button>

        {/* Dropdown */}
        {open && (
          <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg border">
            <ul className="py-2 text-gray-700">
              <li>
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={handleLogout}
                >
                  Sign Out
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>

        </div>
    </div>
}