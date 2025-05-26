import React, { useState } from 'react';
import Layout from './Layout';
import '../styles/ContactUs.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  const locationUrl = "https://www.google.com/maps?q=Bahrampur+Rd,+near+PS+Memorial+School,+Rahul+Vihar,+Vijay+Nagar,+Ghaziabad,+Uttar+Pradesh+201009";

  return (
    <Layout>
      <div className="contact-page">
        <div className="contact-header">
          <h1>Contact Us</h1>
          <p>We'd love to hear from you</p>
        </div>

        <div className="contact-container">
          <div className="contact-info">
            <div className="info-card">
              <h3>Address</h3>
              <a 
                href={locationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="address-link"
              >
                <p>Bahrampur Rd, near PS Memorial</p>
                <p>School, Rahul Vihar, Vijay Nagar,</p>
                <p>Ghaziabad, Uttar Pradesh 201009</p>
                <span className="view-map-text">View on Google Maps →</span>
              </a>
            </div>
            
            <div className="info-card">
              <h3>Phone</h3>
              <p>+91 9310152968</p>
              <p>Mon-Sat: 05:00 AM - 11:00 PM</p>
            </div>
            
            <div className="info-card">
              <h3>Email</h3>
              <p>holdstrongfitnessnutrition@gmail.com</p>
              <p>holdstrongfitnessnutritionshop@gmail.com</p>
            </div>

            <div className="info-card map-card">
              <h3>Location</h3>
              <div className="map-container">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3499.876650376!2d77.4712!3d28.6712!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cf1bb41c50fdf%3A0xe6f06fd26a7798ba!2sBahrampur%20Rd%2C%20Rahul%20Vihar%2C%20Vijay%20Nagar%2C%20Ghaziabad%2C%20Uttar%20Pradesh%20201009!5e0!3m2!1sen!2sin!4v1647881234567!5m2!1sen!2sin"
                  width="100%"
                  height="250"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="HSF Nutrition Location"
                ></iframe>
              </div>
            </div>
          </div>

          <div className="contact-form-container">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                ></textarea>
              </div>

              <button type="submit" className="submit-btn">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactUs; 