import React, { useState, useEffect } from 'react';
import me from '../images/mountain.webp';
import '../App.css';
import shop from '../images/shop.jpg';
import health from '../images/health.jpg';
import cultural from '../images/sih.jpg';
import todo from '../images/todo.webp';

const TypingHeader = () => {
    const fullText = "Deep Dive Into My Projects";
    const [displayText, setDisplayText] = useState("");
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const typingInterval = setInterval(() => {
            if (index < fullText.length) {
                setDisplayText(prev => prev + fullText.charAt(index));
                setIndex(prev => prev + 1);
            } else {
                setTimeout(() => {
                    setDisplayText("");
                    setIndex(0);
                }, 2000);
                clearInterval(typingInterval);
            }
        }, 100);

        return () => clearInterval(typingInterval);
    }, [index]);

    return (
        <h2 className="text-4xl font-extrabold text-left text-white mb-10 glow-text">
            {displayText}<span className="animate-blink">|</span>
        </h2>
    );
};

const ProjectCard = ({ title, description, link, image }) => (
    <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full sm:w-[90%] md:w-[45%] bg-white/10 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-6 m-4 hover:scale-105 transform transition-all duration-300"
    >
        <img className="rounded-xl h-52 w-full object-cover mb-4" src={image} alt={title} />
        <h5 className="text-2xl font-bold mb-2 text-white glow-text">{title}</h5>
        <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
    </a>
);

const Projects = () => {
    return (
        <div className="m-5 mx-auto flex flex-col items-center justify-center px-6 py-12">
            <br />
            <br />
            <TypingHeader />

            {/* Responsive Grid: 2 on desktop, 1 on mobile */}
            <div className="flex flex-wrap justify-center">
                <ProjectCard
                    title="Cultural Canvas (SIH 2024 Winning Project)"
                    image={cultural}
                    description={`AI-powered platform preserving Indian heritage with React, MongoDB, and ML. Features: Story generation, blog with nudity detection, trip planner, artisan e-commerce.`}
                    link="https://www.youtube.com/watch?v=ZFd87YL0XqU"
                />
                <ProjectCard
                    title="HealthAI"
                    image={health}
                    description={`AI healthcare system with dashboard, medicine reminders, doctor video chat, and scan analysis. Uses DL models and secure patient authentication.`}
                    link="https://health-ai-teal.vercel.app/"
                />
                <ProjectCard
                    title="Shopnest"
                    image={shop}
                    description={`AI shopping assistant for buyers and sellers. Includes ML-powered price prediction, recommendation, add-to-cart & real-time forecasting.`}
                    link="https://shop-nest-olive.vercel.app/"
                />
                <ProjectCard
                    title="Simple Todo App"
                    image={todo}
                    description={`Developed a full-stack task management system using Prisma ORM and Supabase as the backend.

Designed and implemented a modern, interactive frontend with Streamlit, providing a smooth and intuitive user experience.`}
                    link="https://github.com/iamdebopriya/TodoList"
                />
            </div>
        </div>
    );
};

export default Projects;
