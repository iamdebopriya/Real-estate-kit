import React, { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky relative p-4 w-full mx-auto rounded-xl shadow-lg bg-opacity-30 backdrop-blur-lg border border-white/20 overflow-hidden z-50">
      {/* Glowing Background */}
      <div className="absolute inset-0 -z-10 bg-purple-500 opacity-30 blur-[120px]" />

      <div className="flex items-center justify-between md:w-[70%] w-full mx-auto">
        {/* Logo / Name */}
        <h1 className="text-purple-300 font-bold text-lg tracking-widest hover:text-pink-400 transition-all duration-300 ease-in-out hover:drop-shadow-lg">
           Debopriya Lahiri 
        </h1>

        {/* Hamburger Icon (Mobile Only) */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* Navbar Links */}
      <div
        className={`flex flex-col md:flex-row md:items-center md:justify-center gap-4 mt-4 md:mt-0 transition-all duration-300 ease-in-out ${
          isOpen ? "block" : "hidden md:flex"
        }`}
      >
        {["Home","Education", "Projects", "Skills", "Experience", "Contact"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="navbar-brand text-white/80 hover:text-pink-400 transition-all duration-300 ease-in-out hover:scale-110 hover:drop-shadow-lg"
          >
            {item}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
