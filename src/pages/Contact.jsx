import React from "react";
import { FaEnvelope, FaLinkedin, FaGithub } from "react-icons/fa";

const Contact = () => {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen px-4 text-white">
      <h2 className="text-4xl md:text-5xl font-serif font-semibold mb-4 hover:text-fuchsia-300 transition-colors duration-300 drop-shadow-lg">
        Let's Connect Beneath the Stars ✨
      </h2>

      <p className="text-center text-lg max-w-xl text-gray-300 mb-10 italic">
        “Every meaningful journey begins with a single message. Let our paths cross, our ideas collide, and something beautiful emerge.”
      </p>

      <div className="bg-white/5 backdrop-blur-md border border-white/10 shadow-xl rounded-2xl p-8 w-full max-w-md hover:shadow-fuchsia-500/30 transition-all duration-300">
        <h3 className="text-2xl font-semibold text-center mb-6 text-purple-300">
          Reach Out to Me
        </h3>

        <div className="flex flex-col gap-6 text-lg text-gray-200">
          <a
            href="mailto:lahiridebopriya46@gmail.com"
            className="flex items-center gap-3 hover:text-fuchsia-400 transition"
          >
            <FaEnvelope /> lahiridebopriya46@gmail.com
          </a>

          
        </div>
      </div>

    
    </section>
  );
};

export default Contact;
