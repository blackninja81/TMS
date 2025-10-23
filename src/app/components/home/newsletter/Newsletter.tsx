import React from 'react';
import './newsletter.scss';
import bgImage from '../../../../../public/assets/pictures/Interior.png';

const Newsletter = () => {
  return (
    <div
      className="newsletter-parallax"
      style={{ backgroundImage: `url(${bgImage.src})` }}
    >
      <div className="newsletter-content">
        <h2>Stay in the Loop</h2>
        <p>Subscribe to our newsletter for the latest news.</p>
        <form className="newsletter-form">
          <input type="email" placeholder="Enter your email" />
          <button type="submit">Subscribe</button>
        </form>
      </div>
    </div>
  );
};

export default Newsletter;
