import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { FaStar, FaTimes, FaImage, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import portfolioItems from '../data/portfolioData';

const PortfolioPage = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeTab, setActiveTab] = useState('details');
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = portfolioItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(portfolioItems.length / itemsPerPage);

  const handleItemClick = (item) => {
    setLoading(true);
    setSelectedItem(item);
    setActiveTab('details');
    setTimeout(() => setLoading(false), 500); // Simulated loading
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
    setSelectedImage(null);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const renderTimeline = (timeline) => {
    const data = Object.entries(timeline).map(([name, value]) => ({ name, value }));
    return (
      <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis label={{ value: 'Days', angle: -90, position: 'insideLeft' }} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    );
  };

  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-16 px-4 font-mono">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Portfolio</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {currentItems.map((item) => (
            <div
              key={item.id}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-lg cursor-pointer transform transition duration-300 hover:scale-105"
              onClick={() => handleItemClick(item)}
            >
              <div className="relative h-48 bg-blue-500 overflow-hidden">
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="w-full h-full object-cover transition duration-300 transform hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition duration-300">
                  <span className="text-white text-lg font-bold">View Details</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Pagination Controls */}
        <div className="flex justify-center items-center space-x-4 mt-8">
          <button
            onClick={() => changePage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-md ${currentPage === 1 ? 'bg-gray-600 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
          >
            <FaChevronLeft />
          </button>
          <span>{currentPage} of {totalPages}</span>
          <button
            onClick={() => changePage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-md ${currentPage === totalPages ? 'bg-gray-600 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
          >
            <FaChevronRight />
          </button>
        </div>
      </div>

      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-3xl font-bold">{selectedItem.title}</h2>
                  <button onClick={handleCloseModal} className="text-gray-400 hover:text-white">
                    <FaTimes size={24} />
                  </button>
                </div>
                <div className="mb-4">
                  <button
                    className={`mr-4 ${activeTab === 'details' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-400'}`}
                    onClick={() => setActiveTab('details')}
                  >
                    Details
                  </button>
                  <button
                    className={`mr-4 ${activeTab === 'timeline' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-400'}`}
                    onClick={() => setActiveTab('timeline')}
                  >
                    Timeline
                  </button>
                  <button
                    className={`${activeTab === 'gallery' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-400'}`}
                    onClick={() => setActiveTab('gallery')}
                  >
                    Gallery
                  </button>
                </div>
                {activeTab === 'details' && (
                  <div>
                    <p className="text-gray-300 mb-6">{selectedItem.description}</p>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <h4 className="text-lg font-semibold mb-2">Project Details</h4>
                        <p><span className="font-bold">Start Year:</span> {selectedItem.startYear}</p>
                        <p><span className="font-bold">Release Year:</span> {selectedItem.releaseYear}</p>
                        <p><span className="font-bold">Client:</span> {selectedItem.client}</p>
                        <p className="flex items-center">
                          <span className="font-bold mr-2">Rating:</span>
                          {[...Array(5)].map((_, i) => (
                            <FaStar key={i} className={i < selectedItem.rating ? "text-yellow-400" : "text-gray-400"} />
                          ))}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold mb-2">Technologies</h4>
                        <p><span className="font-bold">Languages:</span> {selectedItem.languages.join(', ')}</p>
                        <p><span className="font-bold">Database:</span> {selectedItem.database}</p>
                        <p><span className="font-bold">UI Framework:</span> {selectedItem.ui}</p>
                      </div>
                    </div>
                    <h4 className="text-lg font-semibold mb-2">Project Flow</h4>
                    <p className="text-gray-300 mb-6">{selectedItem.flow}</p>
                  </div>
                )}
                {activeTab === 'timeline' && (
                  <div>
                    <h3 className="text-2xl font-semibold mb-4">Project Timeline</h3>
                    {renderTimeline(selectedItem.timeline)}
                  </div>
                )}
                {activeTab === 'gallery' && (
                  <div className="grid grid-cols-3 gap-4">
                    {selectedItem.images.map((image, index) => (
                      <div key={index} className="relative cursor-pointer" onClick={() => handleImageClick(image)}>
                        <img src={image} alt={`${selectedItem.title} ${index + 1}`} className="w-full h-32 object-cover rounded" />
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition duration-300">
                          <FaImage className="text-white text-2xl" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50" onClick={() => setSelectedImage(null)}>
          <img src={selectedImage} alt="Full size" className="max-w-full max-h-full" />
        </div>
      )}
    </div>
  );
};

export default PortfolioPage;