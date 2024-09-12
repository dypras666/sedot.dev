import React from 'react';
import { FaBriefcase, FaGraduationCap, FaCertificate, FaCalendar, FaExternalLinkAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const TimelineItem = ({ item, getRelatedProjects }) => {
  const isExperience = 'title' in item;
  const isEducation = 'degree' in item;
  const isCertification = 'name' in item && 'issuer' in item;
  
  let icon, year;
  if (isExperience) {
    icon = <FaBriefcase />;
    year = new Date(item.startDate).getFullYear();
  } else if (isEducation) {
    icon = <FaGraduationCap />;
    year = item.graduationYear;
  } else if (isCertification) {
    icon = <FaCertificate />;
    year = item.year;
  }

  return (
    <div className="mb-12 relative">
      <div className="absolute w-8 h-8 bg-blue-600 rounded-full -left-4 flex items-center justify-center text-white">
        {icon}
      </div>
      <div className="absolute -left-20 top-0 text-sm font-bold text-gray-300">
        {year}
      </div>
      <div className="ml-8 p-4 bg-gray-800 rounded-lg shadow-md">
        {isExperience && (
          <>
            <h3 className="text-xl font-semibold">{item.title}</h3>
            <p className="text-gray-400">{item.company}, {item.location}</p>
            <p className="text-gray-400 flex items-center">
              <FaCalendar className="mr-2" />
              {item.startDate} - {item.endDate || 'Present'}
            </p>
            <ul className="list-disc list-inside mt-2">
              {item.responsibilities.map((responsibility, idx) => (
                <li key={idx} className="text-gray-300">{responsibility}</li>
              ))}
            </ul>
            {item.relatedProjects && item.relatedProjects.length > 0 && (
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
        {isEducation && (
          <>
            <h3 className="text-xl font-semibold">{item.degree}</h3>
            <p className="text-gray-400">{item.institution}, {item.location}</p>
            <p className="text-gray-400">Graduated: {item.graduationYear}</p>
          </>
        )}
        {isCertification && (
          <>
            <h3 className="text-xl font-semibold">{item.name}</h3>
            <p className="text-gray-400">{item.issuer}</p>
            <p className="text-gray-400">Year: {item.year}</p>
          </>
        )}
      </div>
    </div>
  );
};

const EnhancedCVTimeline = ({ experience, education, certifications, getRelatedProjects }) => {
  const combinedTimeline = [...experience, ...education, ...certifications].sort((a, b) => {
    const aYear = a.startDate ? new Date(a.startDate).getFullYear() : (a.graduationYear || a.year);
    const bYear = b.startDate ? new Date(b.startDate).getFullYear() : (b.graduationYear || b.year);
    return bYear - aYear;
  });

  return (
    <section id="timeline-section" className="mb-8">
      <h2 className="text-2xl font-bold mb-8">Experience, Education, and Certifications Timeline</h2>
      <div className="relative border-l-2 border-blue-600 ml-16">
        {combinedTimeline.map((item, index) => (
          <TimelineItem key={index} item={item} getRelatedProjects={getRelatedProjects} />
        ))}
      </div>
    </section>
  );
};

export default EnhancedCVTimeline;