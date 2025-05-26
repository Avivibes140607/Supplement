import React from 'react';
import Layout from './Layout';
import '../styles/Blog.css';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "The Benefits of Protein Supplements",
      date: "March 15, 2024",
      author: "John Doe",
      image: "/Photos/Category/21.webp",
      excerpt: "Discover how protein supplements can enhance your workout results and overall fitness journey."
    },
    {
      id: 2,
      title: "Pre-Workout Supplements Guide",
      date: "March 10, 2024",
      author: "Jane Smith",
      image: "/Photos/Category/Pre workout.webp",
      excerpt: "A comprehensive guide to choosing and using pre-workout supplements effectively."
    },
    {
      id: 3,
      title: "Nutrition Tips for Athletes",
      date: "March 5, 2024",
      author: "Mike Johnson",
      image: "/Photos/Category/Creatine.webp",
      excerpt: "Essential nutrition tips and supplement recommendations for athletes at all levels."
    }
  ];

  return (
    <Layout>
      <div className="blog-page">
        <div className="blog-header">
          <h1>Our Blog</h1>
          <p>Latest insights and updates from the fitness world</p>
        </div>
        
        <div className="blog-container">
          <div className="blog-grid">
            {blogPosts.map(post => (
              <article key={post.id} className="blog-card">
                <div className="blog-image">
                  <img src={post.image} alt={post.title} />
                </div>
                <div className="blog-content">
                  <div className="blog-meta">
                    <span className="blog-date">{post.date}</span>
                    <span className="blog-author">By {post.author}</span>
                  </div>
                  <h2>{post.title}</h2>
                  <p>{post.excerpt}</p>
                  <button className="read-more">Read More</button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Blog; 