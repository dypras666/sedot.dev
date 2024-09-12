import React from 'react';
import { Code, Users, BookOpen } from 'lucide-react';

const Feature = ({ icon: Icon, title, description }) => (
  <div className="flex flex-col items-center text-center p-6">
    <Icon size={48} className="text-blue-500 mb-4" />
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const Features = () => {
  return (
    <section className="py-20 bg-gray-50 font-space-mono">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Our Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Feature
            icon={Code}
            title="Code Collaboration"
            description="Work together on projects with real-time code editing and version control."
          />
          <Feature
            icon={Users}
            title="Developer Community"
            description="Connect with other developers, share ideas, and get help on your projects."
          />
          <Feature
            icon={BookOpen}
            title="Learning Resources"
            description="Access a wide range of tutorials, courses, and documentation to improve your skills."
          />
        </div>
      </div>
    </section>
  );
};

export default Features;