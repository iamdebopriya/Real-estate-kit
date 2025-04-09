import React from "react";
import "../App.css"; 

const experiences = [
  {
    role: "Software Engineer Intern",
    company: "Techno Billion AI (TBAI)",
    duration: "Feb 2025 – Ongoing",
    points: [
      "Developed and optimized backend services with Prisma, improving query efficiency by 40%.",
      "Engineered scalable cloud-based solutions serving 15,000+ students across multiple platforms.",
      "Enhancing personalization and user engagement by 30%.",
    ],
  },
  {
    role: "Business Analyst Intern",
    company: "Younity.in",
    duration: "Dec 2023 - Jan 2024",
    points: [
      "Conducted competitor market research on 10+ ed-tech companies, analyzing pricing models and engagement strategies.",
      "Created a research presentation that highlighted key trends, influencing a 15% adjustment in company positioning.",
    ],
  },
];

const Experience = () => {
  return (
    <div className="w-full px-6 sm:px-10 lg:px-20 py-10 text-white">
      <h2
  className="glow-text p-5 text-center text-4xl md:text-5xl font-semibold text-white hover:text-purple-300 transition-colors duration-300 drop-shadow-md hover:drop-shadow-lg"
>
  Learning Through Experience
</h2>





      <div className="space-y-10">
        {experiences.map((exp, index) => (
          <div
            key={index}
            className="border border-purple-500 rounded-xl p-6 bg-black/30 backdrop-blur-md hover:scale-[1.02] transition-transform duration-300 shadow-lg"
          >
            <h3 className="text-2xl font-semibold text-purple-300">{exp.role}</h3>
            <p className="text-md font-medium text-white mt-1">
              {exp.company} <span className="text-sm text-gray-300">({exp.duration})</span>
            </p>
            <ul className="mt-4 list-disc list-inside text-gray-200 space-y-2">
              {exp.points.map((point, i) => (
                <li key={i} className="transition-opacity duration-500 hover:text-white">
                  {point}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
