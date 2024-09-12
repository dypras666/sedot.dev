import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaEye, FaTh, FaThList } from 'react-icons/fa';
import newsData from '../data/newsData';

const News = () => {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [clickPosition, setClickPosition] = useState(null);
  const [clickAnimation, setClickAnimation] = useState(false);
  const [filteredNews, setFilteredNews] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [displayMode, setDisplayMode] = useState('grid');
  const [loading, setLoading] = useState(true);
  const newsRef = useRef(null);
  const nodesRef = useRef([]);


  useEffect(() => {
    const handleMouseMove = (event) => {
      if (newsRef.current) {
        const { left, top, width, height } = newsRef.current.getBoundingClientRect();
        const x = ((event.clientX - left) / width) * 100;
        const y = ((event.clientY - top) / height) * 100;
        setMousePosition({ x, y });
      }
    };

    const handleMouseLeave = () => {
      setMousePosition({ x: 50, y: 50 });
    };

    const handleClick = (event) => {
      if (newsRef.current) {
        const { left, top, width, height } = newsRef.current.getBoundingClientRect();
        const x = ((event.clientX - left) / width) * 100;
        const y = ((event.clientY - top) / height) * 100;
        setClickPosition({ x, y });
        setClickAnimation(true);
        setTimeout(() => setClickAnimation(false), 1500);
      }
    };

    newsRef.current.addEventListener('mousemove', handleMouseMove);
    newsRef.current.addEventListener('mouseleave', handleMouseLeave);
    newsRef.current.addEventListener('click', handleClick);

    return () => {
      if (newsRef.current) {
        newsRef.current.removeEventListener('mousemove', handleMouseMove);
        newsRef.current.removeEventListener('mouseleave', handleMouseLeave);
        newsRef.current.removeEventListener('click', handleClick);
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

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const filtered = newsData.filter(
        (item) =>
          (selectedCategory === 'All' || item.category === selectedCategory) &&
          item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredNews(filtered);
      setLoading(false);
    }, 1000); // Simulated loading delay
  }, [searchTerm, selectedCategory]);

  const categories = ['All', ...new Set(newsData.map((item) => item.category))];

  return (
    <div ref={newsRef} className="relative dark-blue-fantasy-bg text-white py-32 min-h-screen font-mono">
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-5xl font-bold mb-6 text-center animate-fadeIn">Latest News</h2>
        
        <div className="mb-8 flex flex-wrap justify-between items-center">
          <div className="relative w-full md:w-64 mb-4 md:mb-0">
            <input
              type="text"
              placeholder="Search news..."
              className="bg-gray-800 text-white p-2 rounded w-full pr-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <select
            className="bg-gray-800 text-white p-2 rounded w-full md:w-auto mb-4 md:mb-0"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <div>
            <button
              className={`px-4 py-2 rounded mr-2 neuralink-border-effect relative ${displayMode === 'grid' ? 'bg-blue-500' : 'bg-gray-800'}`}
              onClick={() => setDisplayMode('grid')}
            >
              <FaTh className="inline-block mr-2" /> Grid
            </button>
            <button
              className={`px-4 py-2 rounded neuralink-border-effect relative ${displayMode === 'full' ? 'bg-blue-500' : 'bg-gray-800'}`}
              onClick={() => setDisplayMode('full')}
            >
              <FaThList className="inline-block mr-2" /> Full
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className={`grid ${displayMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' : 'grid-cols-1 gap-8'}`}>
            {filteredNews.map((item, index) => (
              <div key={item.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg neuralink-border-effect relative animate-fadeIn" style={{animationDelay: `${index * 0.1}s`}}>
                <img src={`https://picsum.photos/seed/${item.id}/400/200`} alt={item.title} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-400 mb-4">{item.excerpt}</p>
                  <div className="flex justify-between items-center">
                    <span className="bg-blue-500 text-white px-2 py-1 rounded text-sm">{item.category}</span>
                    <span className="text-gray-400 text-sm"><FaEye className="inline-block mr-1" /> {item.views}</span>
                  </div>
                  <Link to={`/news/${item.id}`} className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400 transition duration-300 neuralink-border-effect relative">
                    Read More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
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
    </div>
  );
};

export default News;