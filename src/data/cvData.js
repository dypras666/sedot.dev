// src/data/cvData.js

export const cvData = {
    personalInfo: {
      name: "Kurniawan Adi P, M.Tech",
      title: "Krim Sus Developer",
      email: "dev@sedot.dev",
      phone: "+6281373350813",
      location: "Nigeria, Panama",
      photo: "/images/foto.jpg",
      startCareerYear: 2011,
      summary: "Im Fullstack developer, based on copy paste."
    },
    hardSkills: [
      { name: "JavaScript", level: 95 },
      { name: "React", level: 90 },
      { name: "Node.js", level: 85 },
      { name: "Python", level: 80 },
      { name: "SQL", level: 85 },
      { name: "Docker", level: 75 },
      { name: "AWS", level: 70 }
    ],
    softSkills: [
      { name: "Communication", level: 90 },
      { name: "Teamwork", level: 95 },
      { name: "Problem Solving", level: 88 },
      { name: "Adaptability", level: 85 },
      { name: "Time Management", level: 82 }
    ],
    experience: [
      {
        title: "Senior Full Stack Developer",
        company: "Aling Sedot WC Inc.",
        location: "Nepal",
        startDate: "2012-01",
        endDate: "Present",
        responsibilities: [
          "Lead a team of 5 developers in building a cloud-based SaaS platform",
          "Implemented microservices architecture using Node.js and Docker",
          "Improved application performance by 40% through code optimization and caching strategies"
        ],
        relatedProjects: [1, 3]
      },
      {
        title: "Full Stack Cheff Enginer",
        company: "Prambudi Lelang Ikan Co.",
        location: "Nigeria",
        startDate: "2012-03",
        endDate: "2019-12",
        responsibilities: [
          "Developed and maintained multiple client websites using React and Express.js",
          "Integrated third-party APIs and payment gateways",
          "Mentored junior developers and conducted code reviews"
        ],
        relatedProjects: [2, 4]
      },
      {
        title: "Junior Cheff Executive Director",
        company: "StartUp Nexus",
        location: "Panama",
        startDate: "2013-06",
        endDate: "2017-02",
        responsibilities: [
          "Assisted in the development of responsive web applications",
          "Worked on bug fixing and improving application performance",
          "Collaborated with the design team to implement user interface components"
        ],
        relatedProjects: [5]
      }
    ],
    education: [
      {
        degree: "TK",
        institution: "TK INDONESIA BERSATU",
        location: "Indonesia",
        graduationYear: 2005
      },
      {
        degree: "PAUD",
        institution: "PAUD INDONESIA BERSATU",
        location: "Indonesia",
        graduationYear: 2006
      }
    ],
    certifications: [
      {
        name: "Menaklukan Godzila bersama ultramen",
        issuer: "GCP Japan",
        year: 2014
      },
      {
        name: "Satria Baja Hitam",
        issuer: "Amazon Japan",
        year: 2015
      }
    ],
    languages: [
    { name: "Java", level: "OP" },
    { name: "Indonesian", level: "Native" },
      { name: "English", level: "Fluent" }
    ],
    organizations: [
        {
          role: "Volunteer Coordinator",
          organization: "Local Community Center",
          startDate: "2019-06",
          endDate: "Present",
          description: "Organize and manage volunteer activities for community events."
        }, 
      ],
      hobbies: [
        {
          hobby: "Nyetrum Iwak",
          description: "Capture landscapes and street scenes in my river.", 
        }, 
        {
            hobby: "Madhang",
            description: "Increase fat activity.", 
        }, 
      ]
  };
  
  export default cvData;