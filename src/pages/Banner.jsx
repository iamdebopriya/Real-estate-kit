import React from 'react'
import me from '../images/mee.jpg'
import { FaLinkedin, FaGithub } from "react-icons/fa";
import '../App.css';



const Banner = () => {
  return (
    <>
      <div className="relative pb-4 lg:mb-36 flex flex-col lg:flex-row items-center lg:items-start">

        {/* Left Side - Profile Image with Outer Glow */}
        <div className="relative flex justify-center items-center p-4 sm:p-6">
          <div className="absolute h-[250px] w-[250px] sm:h-[300px] sm:w-[300px] lg:h-[450px] lg:w-[450px] 
                          rounded-full bg-purple-500 opacity-40 blur-[120px]" />

          {/* Floating Stars */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-10 left-10 w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <div className="absolute top-20 right-5 w-1.5 h-1.5 bg-white rounded-full animate-i delay-1000"></div>
            <div className="absolute bottom-16 left-1/3 w-2 h-2 bg-white rounded-full animate-pulse delay-1500"></div>
            <div className="absolute bottom-8 right-1/4 w-1.5 h-1.5 bg-white rounded-full animate-pulse delay-2000"></div>
          </div>

          {/* Profile Image */}
          <img
            className="rounded-full z-10 h-[200px] w-[200px] sm:h-[250px] sm:w-[250px] lg:h-[400px] lg:w-[400px]
             transition-transform animate-[syncedGlow_3s_ease-in-out_infinite] brightness-125 contrast-110"
            src={me}
            alt="Profile"
          />





        </div>

        {/* Right Side - Text */}
        <div className="w-full lg:w-1/2 px-4 sm:px-6 text-center lg:text-left">
          <h1 className="glow-text text-center text-3xl sm:text-4xl lg:text-6xl font-bold animate-[syncedGlow_3s_ease-in-out_infinite]">
            Hello, I'm <span className="text-white">Debopriya</span>
          </h1>


          <br />
          <span className="font-bold text-base sm:text-xl lg:text-2xl bg-gradient-to-r from-white via-pink-300 to-pink-500 bg-clip-text text-transparent tracking-tight mt-4 transition-all duration-500 ease-in-out hover:rotate-1 hover:scale-105 hover:from-yellow-300 hover:to-pink-600">
            Passionate AI/ML Engineer & Full-Stack Developer, working on innovative projects.
            <br /><br />
            I am an AI and ML enthusiast pursuing B.Tech in Computer Science at Techno India Salt Lake. Skilled in Python, Java, C, and TypeScript, she develops AI-driven applications in healthcare, prediction modeling, and web development. Passionate about technology, she aspires to be a Software Developer and AI Engineer.
          </span>
          <br /><br />

          <div className="flex flex-col sm:flex-row m-4 justify-center lg:justify-start items-center gap-4">
            <button className="bg-pink-300 text-black font-bold rounded-xl text-md p-2 px-4" onClick={() => window.open("https://drive.google.com/file/d/1iAWLaTDT6_wvP77tw6TJ7q6LAT3BzfJj/view?usp=drive_link", "_blank")} >
              Download Resume
            </button>
            <FaLinkedin
              className="text-white text-3xl sm:text-4xl cursor-pointer"
              onClick={() => window.open("https://www.linkedin.com/in/debopriya-lahiri-615a37266/", "_blank")}
            />
            <FaGithub
              className="text-white text-3xl sm:text-4xl cursor-pointer"
              onClick={() => window.open("https://github.com/iamdebopriya", "_blank")}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Banner
