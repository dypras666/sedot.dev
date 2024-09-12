import React from 'react';
import { Document, Page, Text, View, StyleSheet, Svg, Circle, Rect, Image, Path } from '@react-pdf/renderer';
import { format, parse } from 'date-fns';

const styles = StyleSheet.create({
  page: { 
    padding: 30,
    fontFamily: 'Helvetica',
    fontSize: 9,
    position: 'relative',
    backgroundColor: '#ffffff',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  content: {
    position: 'relative',
    zIndex: 1,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 15,
    backgroundColor: '#1a5f7a',
    padding: 15,
    borderRadius: 10,
  },
  photoContainer: {
    width: 100,
    height: 100,
    marginRight: 15,
    borderRadius: 50,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: '#ffffff',
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  personalInfo: {
    flex: 1,
    color: '#ffffff',
  },
  section: { 
    marginBottom: 10,
  },
  sectionHeader: {
    fontSize: 12,
    marginBottom: 5,
    fontWeight: 'bold',
    color: '#1a5f7a',
    borderBottomWidth: 1,
    borderBottomColor: '#1a5f7a',
    paddingBottom: 2,
  },
  title: { 
    fontSize: 20, 
    marginBottom: 3,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  subtitle: { 
    fontSize: 12, 
    marginBottom: 3,
    color: '#e0e0e0',
  },
  text: { 
    marginBottom: 2,
    color: '#333333',
  },
  bold: {
    fontWeight: 'bold',
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  bullet: {
    width: 10,
    fontSize: 9,
    color: '#1a5f7a',
  },
  column: {
    width: '48%',
    marginRight: '2%',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  skillBar: {
    height: 4,
    marginBottom: 4,
    backgroundColor: '#e0e0e0',
    borderRadius: 2,
  },
  skillFill: {
    height: '100%',
    backgroundColor: '#1a5f7a',
    borderRadius: 2,
  },
  experienceItem: {
    marginBottom: 5,
  },
  signature: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 80,
    height: 40,
  },
  contactInfo: {
    flexDirection: 'row',
    marginTop: 3,
  },
  contactIcon: {
    width: 10,
    height: 10,
    marginRight: 3,
  },
  contactText: {
    color: '#ffffff',
    fontSize: 8,
  },
});

const formatDate = (dateString) => {
  if (dateString === 'Present') return 'Present';
  try {
    const date = parse(dateString, 'yyyy-MM', new Date());
    return format(date, 'MMM yyyy');
  } catch (error) {
    console.error('Error parsing date:', error);
    return dateString;
  }
};

const SkillBar = ({ name, level }) => (
  <View style={{marginBottom: 3}}>
    <Text style={styles.text}>{name}</Text>
    <View style={styles.skillBar}>
      <View style={[styles.skillFill, { width: `${level}%` }]} />
    </View>
  </View>
);

const ExperienceItem = ({ job }) => (
  <View style={styles.experienceItem}>
    <Text style={[styles.bold, {fontSize: 10, color: '#1a5f7a'}]}>{job.title}</Text>
    <Text style={[styles.text, {fontStyle: 'italic', fontSize: 8}]}>{job.company}, {job.location}</Text>
    <Text style={[styles.text, {color: '#666666', fontSize: 8}]}>
      {formatDate(job.startDate)} - {formatDate(job.endDate)}
    </Text>
    {job.responsibilities.slice(0, 2).map((resp, idx) => (
      <View key={idx} style={styles.listItem}>
        <Text style={styles.bullet}>•</Text>
        <Text style={[styles.text, {flex: 1, fontSize: 8}]}>{resp}</Text>
      </View>
    ))}
  </View>
);

const CVDocument = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Svg style={styles.background}>
        <Rect x="0" y="0" width="100%" height="100%" fill="#f0f0f0" />
        <Circle cx="0" cy="0" r="300" fill="#1a5f7a" opacity="0.1" />
        <Circle cx="595" cy="842" r="400" fill="#1a5f7a" opacity="0.1" />
      </Svg>

      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.photoContainer}>
            <Image style={styles.photo} src={data.personalInfo.photo} />
          </View>
          <View style={styles.personalInfo}>
            <Text style={styles.title}>{data.personalInfo.name}</Text>
            <Text style={styles.subtitle}>{data.personalInfo.title}</Text>
            <View style={styles.contactInfo}>
              <Svg style={styles.contactIcon}>
                <Path d="M2 4l4 4 4-4" stroke="#ffffff" strokeWidth={1} fill="none" />
                <Rect x="1" y="8" width="10" height="6" stroke="#ffffff" strokeWidth={1} fill="none" />
              </Svg>
              <Text style={styles.contactText}>{data.personalInfo.email}</Text>
            </View>
            <View style={styles.contactInfo}>
              <Svg style={styles.contactIcon}>
                <Circle cx="6" cy="6" r="5" stroke="#ffffff" strokeWidth={1} fill="none" />
                <Path d="M10 10L8.5 8.5" stroke="#ffffff" strokeWidth={1} fill="none" />
              </Svg>
              <Text style={styles.contactText}>{data.personalInfo.phone}</Text>
            </View>
            <View style={styles.contactInfo}>
              <Svg style={styles.contactIcon}>
                <Path d="M6 1L1 4v6l5 3 5-3V4L6 1z" stroke="#ffffff" strokeWidth={1} fill="none" />
              </Svg>
              <Text style={styles.contactText}>{data.personalInfo.location}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Professional Summary</Text>
          <Text style={[styles.text, {fontSize: 8}]}>{data.personalInfo.summary}</Text>
        </View>

        <View style={styles.row}>
          <View style={styles.column}>
            <View style={styles.section}>
              <Text style={styles.sectionHeader}>Skills</Text>
              <View style={styles.row}>
                <View style={styles.column}>
                  <Text style={[styles.bold, {marginBottom: 3, fontSize: 9}]}>Hard Skills:</Text>
                  {data.hardSkills.slice(0, 4).map((skill, index) => (
                    <SkillBar key={index} name={skill.name} level={skill.level} />
                  ))}
                </View>
                <View style={styles.column}>
                  <Text style={[styles.bold, {marginBottom: 3, fontSize: 9}]}>Soft Skills:</Text>
                  {data.softSkills.slice(0, 4).map((skill, index) => (
                    <SkillBar key={index} name={skill.name} level={skill.level} />
                  ))}
                </View>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionHeader}>Work Experience</Text>
              {data.experience.map((job, index) => (
                <ExperienceItem key={index} job={job} />
              ))}
            </View>
          </View>

          <View style={styles.column}>
            <View style={styles.section}>
              <Text style={styles.sectionHeader}>Education</Text>
              {data.education.map((edu, index) => (
                <View key={index} style={{marginBottom: 3}}>
                  <Text style={[styles.bold, {fontSize: 9}]}>{edu.degree}</Text>
                  <Text style={[styles.text, {fontSize: 8}]}>{edu.institution}, {edu.location}</Text>
                  <Text style={[styles.text, {fontStyle: 'italic', fontSize: 8}]}>Graduated: {edu.graduationYear}</Text>
                </View>
              ))}
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionHeader}>Certifications</Text>
              {data.certifications.map((cert, index) => (
                <View key={index} style={{marginBottom: 2}}>
                  <Text style={[styles.bold, {fontSize: 9}]}>{cert.name}</Text>
                  <Text style={[styles.text, {fontStyle: 'italic', fontSize: 8}]}>{cert.issuer}, {cert.year}</Text>
                </View>
              ))}
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionHeader}>Languages</Text>
              {data.languages.map((lang, index) => (
                <Text key={index} style={[styles.text, {fontSize: 8}]}>
                  <Text style={styles.bold}>{lang.name}:</Text> {lang.level}
                </Text>
              ))}
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionHeader}>Organizational Experience</Text>
              {data.organizations.map((org, index) => (
                <View key={index} style={{marginBottom: 3}}>
                  <Text style={[styles.bold, {fontSize: 9}]}>{org.role} - {org.organization}</Text>
                  <Text style={[styles.text, {fontStyle: 'italic', fontSize: 8}]}>
                    {formatDate(org.startDate)} - {formatDate(org.endDate)}
                  </Text>
                  <Text style={[styles.text, {fontSize: 8}]}>{org.description}</Text>
                </View>
              ))}
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionHeader}>Hobbies</Text>
              {data.hobbies.map((hobby, index) => (
                <View key={index} style={{marginBottom: 2}}>
                  <Text style={[styles.bold, {fontSize: 9}]}>{hobby.hobby}</Text>
                  <Text style={[styles.text, {fontSize: 8}]}>{hobby.description}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        <Svg style={styles.signature}>
          <Path
            d="M10,25 C15,10 25,10 25,25 S35,40 40,25"
            stroke="#1a5f7a"
            strokeWidth={2}
            fill="none"
          />
          <Text
            x="0"
            y="35"
            style={{
              fontSize: 8,
              fontFamily: 'Helvetica',
              fill: '#1a5f7a',
            }}
          >
            {data.personalInfo.name}
          </Text>
        </Svg>
      </View>
    </Page>
  </Document>
);

export default CVDocument;