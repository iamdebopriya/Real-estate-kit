import React from "react";
import { TypeAnimation } from "react-type-animation";
import { FaCode, FaRobot, FaGlobe, FaTools, FaBrain, FaUsers } from "react-icons/fa";

const skillsData = [
  {
    title: "Programming Languages",
    icon: <FaCode className="text-purple-400 text-3xl" />,
    skills: ["Java", "Python", "C", "TypeScript","JavaScript"],
  },
  {
    title: "Machine Learning",
    icon: <FaRobot className="text-purple-400 text-3xl" />,
    skills: ["Deep Learning", "NLP", "CNN", "SVM", "Logistic Regression"],
  },
  {
    title: "Web Technologies",
    icon: <FaGlobe className="text-purple-400 text-3xl" />,
    skills: ["React.js","TailWind CSS", "Streamlit", "Prisma ORM", "Supabase", "Flask", "FastAPI"],
  },
  {
    title: "Tools",
    icon: <FaTools className="text-purple-400 text-3xl" />,
    skills: ["Git", "WEKA", "Kaggle", "Jupyter Notebook"],
  },
  {
    title: "Concepts",
    icon: <FaBrain className="text-purple-400 text-3xl" />,
    skills: ["DSA", "OOP", "System Design"],
  },
  {
    title: "Soft Skills",
    icon: <FaUsers className="text-purple-400 text-3xl" />,
    skills: ["Problem-solving", "Teamwork", "Time Management", "Adaptability", "Leadership", "Communication"],
  },
];

const Skills = () => {
  return (
    <div className=" p-5 w-full px-4 sm:px-6 md:px-20 pt-36 pb-32 text-white"> {/* Notice: Increased pb */}
      {/* Heading */}
      <div className="text-center mb-14 px-4">
        <h2 className="glow-text text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-300 via-pink-400 to-purple-500 bg-clip-text animate-pulse drop-shadow-md">
          Where Logic Meets Magic 🔮
        </h2>
        <TypeAnimation
          sequence={[
            "I turn ideas into reality 💡 ",
            2000,
            "ML • AI • Web • Logic ✨",
            2000,
            "Creative. Focused. Passionate 💻",
            2000,
          ]}
          wrapper="span"
          speed={40}
          repeat={Infinity}
          className="font-bold text-lg sm:text-xl text-purple-200 font-medium"
        />
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        {skillsData.map((category, index) => (
          <div
            key={index}
            className="bg-black/30 backdrop-blur-md p-6 rounded-xl border border-purple-500/20 shadow-md hover:shadow-purple-500/30 transition duration-300"
          >
            <div className="flex items-center gap-3 mb-3">
              {category.icon}
              <h3 className="text-xl font-semibold text-purple-200">{category.title}</h3>
            </div>
            <ul className="list-disc ml-6 text-white/90 space-y-1 text-sm">
              {category.skills.map((skill, idx) => (
                <li key={idx}>{skill}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div h-40/>
    </div>
  );
};


export default Skills;
