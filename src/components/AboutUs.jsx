import React from 'react';
import Layout from './Layout';
import '../styles/AboutUs.css';

const AboutUs = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Saurabh Soni",
      position: "CEO & Founder",
      image: "/public/Photos/Contact/CEO.PNG",
      bio: "Passionate about fitness and nutrition for over 8 years."
    },
    {
      id: 2,
      name: "Rahul Rajput",
      position: "Head of Product Development",
      image: "/public/Photos/Contact/Product developer.PNG",
      bio: "Certified nutritionist with expertise in supplement formulation."
    },
    {
      id: 3,
      name: "Aditya Singh",
      position: "CEO & Founder",
      image: "/public/Photos/Contact/CEO 2.PNG",
      bio: "Passionate about fitness and nutrition for over 5 years."
    }
  ];

  return (
    <Layout>
      <div className="about-page">
        <div className="about-header">
          <h1>About Us</h1>
          <p>Your trusted partner in fitness and nutrition</p>
        </div>

        <div className="about-container">
          <section className="mission-section">
            <h2>Our Mission</h2>
            <p>We are dedicated to providing high-quality supplements and fitness products that help our customers achieve their health and fitness goals. Our commitment to quality, innovation, and customer satisfaction sets us apart in the industry.</p>
          </section>

          <section className="values-section">
            <h2>Our Values</h2>
            <div className="values-grid">
              <div className="value-card">
                <h3>Quality</h3>
                <p>We source only the highest quality ingredients for our products.</p>
              </div>
              <div className="value-card">
                <h3>Innovation</h3>
                <p>Constantly researching and developing new, effective products.</p>
              </div>
              <div className="value-card">
                <h3>Integrity</h3>
                <p>Honest and transparent in all our business practices.</p>
              </div>
            </div>
          </section>

          <section className="team-section">
            <h2>Our Team</h2>
            <div className="team-grid">
              {teamMembers.map(member => (
                <div key={member.id} className="team-card">
                  <div className="team-image">
                    <img src={member.image} alt={member.name} />
                  </div>
                  <h3>{member.name}</h3>
                  <p className="position">{member.position}</p>
                  <p className="bio">{member.bio}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default AboutUs; 