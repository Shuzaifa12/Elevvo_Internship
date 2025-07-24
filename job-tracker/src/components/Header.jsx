import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-800 text-white">
      <div className="relative max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <h1 className="text-xl font-bold">Job Tracker</h1>

        {/* Toggle button (visible on small screens) */}
        <button
          className="sm:hidden text-white text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>

        {/* Links */}
        <ul
          className={`sm:flex sm:space-x-6 absolute sm:static top-full left-0 w-full sm:w-auto bg-gray-800 sm:bg-transparent transition-all duration-300 ease-in-out ${
            isOpen ? 'block' : 'hidden'
          }`}
        >
          <li className="px-4 py-2 sm:p-0">
            <Link to="/" className="block hover:text-gray-300">
              Dashboard
            </Link>
          </li>
          <li className="px-4 py-2 sm:p-0">
            <Link to="/add" className="block hover:text-gray-300">
              Add Job
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
