import React from 'react';
import { Code, Users, BookOpen, Database, Layout, Monitor } from 'lucide-react';

const Skill = ({ icon: Icon, title, description }) => (
  <div className="flex flex-col items-center text-center p-6 skill-card">
    <Icon size={48} className="text-blue-500 mb-4" />
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const Skills = () => {
  const skillsData = [
    {
      icon: Code,
      title: "Java",
      description: "I use all java languages, because im javanese people."
    },
    {
      icon: Code,
      title: "Python",
      description: "Shut up, you don't need experience to try python, only use your browsing skill."
    },
    {
      icon: Code,
      title: "PHP",
      description: "Skilled by copypaste ."
    },
    {
      icon: Database,
      title: "Database Management",
      description: "I can do that with all databases"
    },
    {
      icon: Monitor,
      title: "Web Development",
      description: "I started web development as a baby, even before I was born, I had already begun my career as a web develope."
    },
   
    {
      icon: Code,
      title: "All Languages",
      description: "I CAN DO ALL LANGUAGES, AS LONG AS GOOGLE AND CTRL + C, CTRL + V ARE NOT REMOVED FROM THIS WORLD."
    }
  ];

  return (
    <section className="py-20 bg-gray-50 font-space-mono">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">My Skills with AI,GOOGLE</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillsData.map((skill, index) => (
            <Skill key={index} icon={skill.icon} title={skill.title} description={skill.description} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
