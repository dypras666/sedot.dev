import React, { useState, useEffect, useRef } from 'react';
import Portfolio from './Portfolio';
import TypingEffect from './TypingEffect'; // Import the TypingEffect component

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [clickPosition, setClickPosition] = useState(null);
  const [clickAnimation, setClickAnimation] = useState(false);
  const [showPortfolio, setShowPortfolio] = useState(false);
  const heroRef = useRef(null);
  const nodesRef = useRef([]);

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (heroRef.current) {
        const { left, top, width, height } = heroRef.current.getBoundingClientRect();
        const x = ((event.clientX - left) / width) * 100;
        const y = ((event.clientY - top) / height) * 100;
        setMousePosition({ x, y });
      }
    };

    const handleMouseLeave = () => {
      setMousePosition({ x: 50, y: 50 });
    };

    const handleClick = (event) => {
      if (heroRef.current) {
        const { left, top, width, height } = heroRef.current.getBoundingClientRect();
        const x = ((event.clientX - left) / width) * 100;
        const y = ((event.clientY - top) / height) * 100;
        setClickPosition({ x, y });
        setClickAnimation(true);
        setTimeout(() => setClickAnimation(false), 1500);
      }
    };

    heroRef.current.addEventListener('mousemove', handleMouseMove);
    heroRef.current.addEventListener('mouseleave', handleMouseLeave);
    heroRef.current.addEventListener('click', handleClick);

    return () => {
      if (heroRef.current) {
        heroRef.current.removeEventListener('mousemove', handleMouseMove);
        heroRef.current.removeEventListener('mouseleave', handleMouseLeave);
        heroRef.current.removeEventListener('click', handleClick);
      }
    };
  }, []);

  useEffect(() => {
    const generateNodes = () => {
      const nodes = [];
      for (let i = 0; i < 50; i++) {
        nodes.push({
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 2 + 0.5,
          twinkleDelay: Math.random() * 5,
          twinkleDuration: Math.random() * 3 + 2,
        });
      }
      nodesRef.current = nodes;
    };

    generateNodes();
  }, []);

  const handleInitializeProject = () => {
    setShowPortfolio(true);
  };

  return (
    <div ref={heroRef} className="relative bg-gradient-to-br from-gray-950 via-blue-950 to-gray-950 text-white py-32 overflow-hidden font-space-mono">
      <div className="container mx-auto px-4 text-center relative z-10">
        <h2 className="text-5xl font-bold mb-6 relative tracking-tight">
          Welcome to <span className="text-blue-400">./sedot.dev</span>
        </h2>
        <p className="text-xl mb-10 relative max-w-2xl mx-auto leading-relaxed">
          <TypingEffect text="Your nexus for developer resources and collaboration. Dive into a world of innovative coding solutions and community-driven development." speed={50} />
        </p>
        <div className="relative">
          <button 
            onClick={handleInitializeProject}
            className="bg-blue-500 text-white px-8 py-4 rounded-full font-bold hover:bg-blue-400 transition duration-300 inline-block text-lg tracking-wide"
          >
            Initialize Project
          </button>
        </div>
      </div>
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {nodesRef.current.map((node, index) => (
          <React.Fragment key={index}>
            <line
              x1={`${mousePosition.x}%`}
              y1={`${mousePosition.y}%`}
              x2={`${node.x}%`}
              y2={`${node.y}%`}
              stroke="rgba(59, 130, 246, 0.1)"
              strokeWidth="1"
            />
            <circle
              cx={`${node.x}%`}
              cy={`${node.y}%`}
              r={node.size}
              fill="rgba(255, 255, 255, 0.7)"
            >
              <animate
                attributeName="opacity"
                values="0.7;1;0.7"
                dur={`${node.twinkleDuration}s`}
                begin={`${node.twinkleDelay}s`}
                repeatCount="indefinite"
              />
            </circle>
            {clickAnimation && clickPosition && (
              <line
                x1={`${clickPosition.x}%`}
                y1={`${clickPosition.y}%`}
                x2={`${node.x}%`}
                y2={`${node.y}%`}
                stroke="rgba(59, 130, 246, 0.8)"
                strokeWidth="3"
                opacity="0"
              >
                <animate
                  attributeName="opacity"
                  values="0;1;0"
                  dur="1.5s"
                  begin="0s"
                  repeatCount="1"
                />
                <animate
                  attributeName="strokeWidth"
                  values="3;1;3"
                  dur="1.5s"
                  begin="0s"
                  repeatCount="1"
                />
              </line>
            )}
          </React.Fragment>
        ))}
        <circle
          cx={`${mousePosition.x}%`}
          cy={`${mousePosition.y}%`}
          r="4"
          fill="rgba(59, 130, 246, 0.8)"
        />
        {clickAnimation && clickPosition && (
          <circle
            cx={`${clickPosition.x}%`}
            cy={`${clickPosition.y}%`}
            r="0"
            fill="none"
            stroke="rgba(59, 130, 246, 0.8)"
            strokeWidth="2"
          >
            <animate
              attributeName="r"
              from="0"
              to="100"
              dur="1.5s"
              begin="0s"
              fill="freeze"
            />
            <animate
              attributeName="opacity"
              from="1"
              to="0"
              dur="1.5s"
              begin="0s"
              fill="freeze"
            />
          </circle>
        )}
      </svg>
      {showPortfolio && <Portfolio onClose={() => setShowPortfolio(false)} />}
    </div>
  );
};

export default Hero;
