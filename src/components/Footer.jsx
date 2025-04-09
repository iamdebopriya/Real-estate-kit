import React from "react";

const Footer = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full p-4 text-center backdrop-blur-lg bg-white/10 border-t border-white/20 shadow-md">
      <p className="text-lg font-semibold text-white/80 tracking-wide">
        © 2025{" "} 
        <span className="font-bold  text-purple-300 hover:text-pink-400 transition-all duration-300 ease-in-out hover:drop-shadow-lg">
          <br/>Designed with 💜 by Debopriya Lahiri <br />
        “In the silence of code and cosmos, creativity finds its echo.”
        </span>
      </p>
    </div>
  );
};

export default Footer;
