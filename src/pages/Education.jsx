import React from 'react';
import { motion } from 'framer-motion';
import { FaFeatherAlt } from 'react-icons/fa';

const Education = () => {
    const educationData = [
        {
            degree: "B.Tech in Computer Science and Engineering (AI & ML)",
            institution: "Techno Main Salt Lake",
            duration: "2022 - Present",
            grade: "GPA: 8.9",
            coursework: "ML, DSA, Deep Learning, OS, AI, Robotics, Web Dev",
        },
        {
            degree: "Higher Secondary (HS)",
            institution: "Kamala Girls’ School",
            duration: "2022",
            grade: "Percentage: 94%",
            coursework: "Physics, Chemistry, Mathematics, CS",
        },
        {
            degree: "Madhyamik (10th Grade)",
            institution: "Kamala Girls’ School",
            duration: "2020",
            grade: "Percentage: 96%",
            coursework: "Science, Mathematics, Literature, History",
        },
    ];

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 py-20 text-white">
            <h2 className="hover:text-pink-400 text-4xl md:text-5xl font-semibold mb-12 text-purple-300 animate-pulse glow-heading transition-all duration-500">
                <FaFeatherAlt className="inline-block mr-2 text-purple-400" />
                “Nurturing Knowledge, One Chapter at a Time”
            </h2>

            <div className="flex flex-wrap justify-center gap-10">
                {educationData.map((edu, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.7, delay: index * 0.2 }}
                        viewport={{ once: true }}
                        className="w-72 h-72 bg-black/30 backdrop-blur-xl rounded-full border border-purple-400 p-6 flex flex-col justify-center items-center text-center shadow-xl hover:shadow-purple-500 hover:scale-105 transition-all duration-300"
                    >
                        <h3 className="text-xl font-bold text-purple-300 mb-2">{edu.degree}</h3>
                        <p className="text-sm italic text-gray-300 mb-1">{edu.institution}</p>
                        <p className="text-sm text-gray-400 mb-1">{edu.duration}</p>
                        <p className="mt-1 font-medium text-purple-200">{edu.grade}</p>
                        <p className="mt-2 text-sm text-gray-300">{edu.coursework}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Education;
