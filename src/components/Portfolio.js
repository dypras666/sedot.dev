import React, { useState, useEffect } from 'react';
import portfolioItems from '../data/portfolioData';

const Portfolio = ({ onClose }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [typedContent, setTypedContent] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    return () => setIsVisible(false);
  }, []);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setTypedContent('');
    typeContent(item.description);
  };

  const typeContent = (content) => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < content.length) {
        setTypedContent((prev) => prev + content.charAt(i));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50);
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-20 dark-blue-fantasy-bg transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="relative max-w-4xl w-full p-8">
        <div className="backdrop-blur-md bg-blue-900 bg-opacity-30 p-8 rounded-lg shadow-2xl relative overflow-hidden neuralink-border">
          <div className="absolute inset-0 border-2 border-blue-400 rounded-lg"></div>
          <h3 className="text-2xl font-bold mb-6 text-cyan-300 relative z-10">Project Portfolio</h3>
          <div className="flex overflow-x-auto space-x-4 pb-4 relative z-10">
            {portfolioItems.map((item, index) => (
              <div 
                key={item.id} 
                className="flex-shrink-0 w-64 bg-blue-800 bg-opacity-50 p-4 rounded-lg transition-all duration-300 transform hover:scale-105 cursor-pointer hover:bg-blue-700 hover:bg-opacity-60"
                style={{
                  animation: `slideIn 0.5s ease-out ${index * 0.1}s both`
                }}
                onClick={() => handleItemClick(item)}
              >
                <h4 className="text-xl font-semibold mb-2 text-blue-200">{item.title}</h4>
                <p className="text-blue-100 truncate">{item.description}</p>
              </div>
            ))}
          </div>
          {selectedItem && (
            <div className="mt-6 bg-blue-900 bg-opacity-50 p-4 rounded-lg font-mono text-cyan-300 border border-blue-400 relative z-10">
              <p className="mb-2 text-blue-300">$ cat {selectedItem.title.toLowerCase().replace(/\s+/g, '-')}.txt</p>
              <p>{typedContent}<span className="animate-pulse">_</span></p>
            </div>
          )}
          <button 
            onClick={onClose} 
            className="mt-6 bg-blue-600 bg-opacity-80 text-white px-6 py-2 rounded-full hover:bg-blue-500 transition duration-300 relative z-10"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;