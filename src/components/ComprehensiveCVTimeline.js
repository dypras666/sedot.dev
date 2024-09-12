import React, { useState, useEffect } from 'react';
import { FaBriefcase, FaGraduationCap, FaCertificate, FaUsers, FaHeart, FaCalendar, FaExternalLinkAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const TimelineItem = ({ item, getRelatedProjects }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getIcon = () => {
    if ('title' in item && 'company' in item) return <FaBriefcase />;
    if ('degree' in item) return <FaGraduationCap />;
    if ('name' in item && 'issuer' in item) return <FaCertificate />;
    if ('role' in item && 'organization' in item) return <FaUsers />;
    if ('hobby' in item) return <FaHeart />;
    return null;
  };

  const getYear = () => {
    if ('startDate' in item) return new Date(item.startDate).getFullYear();
    if ('graduationYear' in item) return item.graduationYear;
    if ('year' in item) return item.year;
    return null;
  };

  return (
    <div className="mb-8 relative">
      <div className="absolute w-8 h-8 bg-blue-600 rounded-full -left-4 flex items-center justify-center text-white">
        {getIcon()}
      </div>
      {getYear() && (
        <div className="absolute -left-20 top-0 text-sm font-bold text-gray-400">
          {getYear()}
        </div>
      )}
      <div className="ml-8 p-4 bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
        <h3 className="text-xl font-semibold mb-2">
          {'title' in item ? item.title : 
           'degree' in item ? item.degree : 
           'name' in item ? item.name : 
           'role' in item ? item.role : 
           'hobby' in item ? item.hobby : ''}
        </h3>
        <p className="text-gray-400">
          {'company' in item ? `${item.company}, ${item.location}` :
           'institution' in item ? `${item.institution}, ${item.location}` :
           'issuer' in item ? item.issuer :
           'organization' in item ? item.organization : ''}
        </p>
        {'startDate' in item && (
          <p className="text-gray-400 flex items-center">
            <FaCalendar className="mr-2" />
            {item.startDate} - {item.endDate || 'Present'}
          </p>
        )}
        {isExpanded && (
          <>
            {'responsibilities' in item && (
              <ul className="list-disc list-inside mt-2">
                {item.responsibilities.map((responsibility, idx) => (
                  <li key={idx} className="text-gray-300">{responsibility}</li>
                ))}
              </ul>
            )}
            {'description' in item && (
              <p className="mt-2 text-gray-300">{item.description}</p>
            )}
            {'relatedProjects' in item && item.relatedProjects.length > 0 && (
              <div className="mt-3">
                <h4 className="font-semibold">Related Projects:</h4>
                <ul className="list-disc list-inside">
                  {getRelatedProjects(item.relatedProjects).map((project) => (
                    <li key={project.id}>
                      <Link to={`/portfolio/${project.id}`} className="text-blue-400 hover:underline">
                        {project.title} <FaExternalLinkAlt className="inline ml-1" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-2 text-blue-400 hover:underline focus:outline-none"
        >
          {isExpanded ? 'Show less' : 'Show more'}
        </button>
      </div>
    </div>
  );
};

const ComprehensiveCVTimeline = ({ experience, education, certifications, organizations, hobbies, getRelatedProjects }) => {
  const [showTimeline, setShowTimeline] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const timelineSection = document.getElementById('comprehensive-timeline');
      if (timelineSection) {
        const rect = timelineSection.getBoundingClientRect();
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
          setShowTimeline(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const combinedTimeline = [
    ...experience, 
    ...education, 
    ...certifications, 
    ...organizations,
    ...hobbies
  ].sort((a, b) => {
    const aYear = a.startDate ? new Date(a.startDate).getFullYear() : (a.graduationYear || a.year || 0);
    const bYear = b.startDate ? new Date(b.startDate).getFullYear() : (b.graduationYear || b.year || 0);
    return bYear - aYear;
  });

  return (
    <section id="comprehensive-timeline" className="mb-8">
      <h2 className="text-2xl font-bold mb-8">Comprehensive Timeline</h2>
      <div className="relative border-l-2 border-blue-600 ml-16">
        {combinedTimeline.map((item, index) => (
          <div 
            key={index} 
            className={`transition-all duration-1000 ease-out ${
              showTimeline ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <TimelineItem item={item} getRelatedProjects={getRelatedProjects} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ComprehensiveCVTimeline;