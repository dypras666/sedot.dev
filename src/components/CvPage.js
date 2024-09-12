import React, { useState, useEffect, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaFilePdf } from 'react-icons/fa';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import cvData from '../data/cvData';
import portfolioItems from '../data/portfolioData';
import ComprehensiveCVTimeline from './ComprehensiveCVTimeline'; 
import CVDocument from './CvDocument';

// Styles untuk PDF
const styles = StyleSheet.create({
  page: { padding: 30 },
  section: { margin: 10, padding: 10 },
  title: { fontSize: 24, marginBottom: 10 },
  subtitle: { fontSize: 18, marginBottom: 10 },
  text: { fontSize: 12, marginBottom: 5 },
});
 

const CVPage = () => {
  const { personalInfo, hardSkills, softSkills, experience, education, certifications, languages, organizations, hobbies } = cvData;
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [showSkills, setShowSkills] = useState(false);
  const pageRef = useRef(null);
  const nodesRef = useRef([]);

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (pageRef.current) {
        const { left, top, width, height } = pageRef.current.getBoundingClientRect();
        const x = ((event.clientX - left) / width) * 100;
        const y = ((event.clientY - top) / height) * 100;
        setMousePosition({ x, y });
      }
    };

    const handleScroll = () => {
      const skillsSection = document.getElementById('skills-section');
      if (skillsSection) {
        const rect = skillsSection.getBoundingClientRect();
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
          setShowSkills(true);
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const generateNodes = () => {
      const nodes = [];
      for (let i = 0; i < 30; i++) {
        nodes.push({
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 2 + 0.5,
        });
      }
      nodesRef.current = nodes;
    };

    generateNodes();
  }, []);

  const getRelatedProjects = (projectIds) => {
    return projectIds.map(id => portfolioItems.find(item => item.id === id)).filter(Boolean);
  };

  const generateProjectTimeline = () => {
    const timeline = {};
    portfolioItems.forEach(item => {
      const year = new Date(item.startYear, 0).getFullYear();
      timeline[year] = (timeline[year] || 0) + 1;
    });
    return Object.entries(timeline).map(([year, count]) => ({ year, count }));
  };

  const renderSkills = (skills, title) => (
    <div className="mb-8">
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <div className="grid grid-cols-2 gap-4">
        {skills.map((skill, index) => (
          <div key={index} className="bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="bg-blue-600 text-white text-xs font-medium text-center p-1 leading-none rounded-full transition-all duration-1000 ease-out"
              style={{ 
                width: showSkills ? `${skill.level}%` : '0%',
                transitionDelay: `${index * 100}ms`
              }}
            >
              {skill.name} ({skill.level}%)
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div ref={pageRef} className="min-h-screen bg-gradient-to-br from-gray-950 via-blue-950 to-gray-950 text-white py-16 px-4 sm:px-6 lg:px-8 font-space-mono relative overflow-hidden">
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
            />
          </React.Fragment>
        ))}
      </svg>

      <div className="max-w-4xl mx-auto bg-gray-800 shadow-xl rounded-lg overflow-hidden relative z-10">
        <div className="bg-blue-600 p-6 sm:p-10 flex flex-col sm:flex-row items-center justify-between">
          <div className="flex flex-col sm:flex-row items-center">
            <img src={personalInfo.photo} alt={personalInfo.name} className="w-32 h-32 rounded-full mb-4 sm:mb-0 sm:mr-6" />
            <div>
              <h1 className="text-3xl font-bold">{personalInfo.name}</h1>
              <p className="text-xl">{personalInfo.title}</p>
              <div className="mt-2 flex flex-wrap">
                <p className="mr-4 flex items-center"><FaEnvelope className="mr-2" /> {personalInfo.email}</p>
                <p className="mr-4 flex items-center"><FaPhone className="mr-2" /> {personalInfo.phone}</p>
                <p className="flex items-center"><FaMapMarkerAlt className="mr-2" /> {personalInfo.location}</p>
              </div>
            </div>
          </div>
          <PDFDownloadLink document={<CVDocument data={cvData} />} fileName="cv.pdf" className="mt-4 sm:mt-0">
            {({ blob, url, loading, error }) =>
              loading ? 'Loading document...' : (
                <button className="bg-white text-blue-600 hover:bg-blue-100 font-bold py-2 px-4 rounded flex items-center">
                  <FaFilePdf className="mr-2" /> Download PDF
                </button>
              )
            }
          </PDFDownloadLink>
        </div>

        <div className="p-6 sm:p-10">
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Professional Summary</h2>
            <p>{personalInfo.summary}</p>
          </section>

          <section id="skills-section" className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Skills</h2>
            {renderSkills(hardSkills, "Hard Skills")}
            {renderSkills(softSkills, "Soft Skills")}
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Project Timeline</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={generateProjectTimeline()} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </section>

          <ComprehensiveCVTimeline 
            experience={experience}
            education={education}
            certifications={certifications}
            organizations={organizations}
            hobbies={hobbies}
            getRelatedProjects={getRelatedProjects}
            cvData={cvData}
          />

          <section>
            <h2 className="text-2xl font-bold mb-4">Languages</h2>
            {languages.map((lang, index) => (
              <p key={index}>{lang.name}: {lang.level}</p>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
};

export default CVPage;