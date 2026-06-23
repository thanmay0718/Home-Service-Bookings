import { FiUsers, FiTarget, FiAward, FiHeart, FiShield, FiTrendingUp } from 'react-icons/fi';

const AboutUs = () => {
  return (
    <div className="page-container">
      <div className="about-page">
        <section className="hero-section">
          <div className="hero-content">
            <h1>About Home Services App</h1>
            <p className="hero-subtitle">
              Connecting homeowners with trusted professionals since 2020
            </p>
          </div>
        </section>

        <section className="story-section">
          <div className="section-container">
            <div className="story-content">
              <h2>Our Story</h2>
              <p>
                Home Services App was born out of a simple need: making home maintenance and repairs 
                accessible, reliable, and stress-free for homeowners. Founded in 2020 by a team of 
                technology enthusiasts and home improvement experts, we recognized the challenges 
                people face when trying to find trustworthy service providers.
              </p>
              <p>
                What started as a small local platform has grown into a comprehensive ecosystem 
                connecting thousands of homeowners with verified professionals across multiple 
                service categories. Our mission is to eliminate the hassle of home maintenance 
                by providing a seamless, secure, and user-friendly platform.
              </p>
            </div>
          </div>
        </section>

        <section className="values-section">
          <div className="section-container">
            <h2>Our Values</h2>
            <div className="values-grid">
              <div className="value-card">
                <FiShield className="value-icon" />
                <h3>Trust & Safety</h3>
                <p>Every service provider undergoes rigorous background checks and verification processes to ensure your safety and peace of mind.</p>
              </div>
              <div className="value-card">
                <FiHeart className="value-icon" />
                <h3>Customer First</h3>
                <p>We prioritize customer satisfaction above all else, ensuring every interaction exceeds expectations.</p>
              </div>
              <div className="value-card">
                <FiTrendingUp className="value-icon" />
                <h3>Quality Excellence</h3>
                <p>We maintain the highest standards for service quality through continuous monitoring and feedback systems.</p>
              </div>
              <div className="value-card">
                <FiUsers className="value-icon" />
                <h3>Community Building</h3>
                <p>We foster a community where homeowners and service providers can connect, collaborate, and grow together.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mission-section">
          <div className="section-container">
            <div className="mission-content">
              <h2>Our Mission</h2>
              <p>
                To revolutionize the home services industry by creating a transparent, efficient, 
                and trustworthy platform that empowers homeowners to maintain their properties 
                with confidence while enabling service providers to grow their businesses.
              </p>
            </div>
          </div>
        </section>

        <section className="stats-section">
          <div className="section-container">
            <h2>Our Impact</h2>
            <div className="stats-grid">
              <div className="stat-item">
                <FiUsers />
                <h3>10,000+</h3>
                <p>Verified Professionals</p>
              </div>
              <div className="stat-item">
                <FiTarget />
                <h3>50,000+</h3>
                <p>Services Completed</p>
              </div>
              <div className="stat-item">
                <FiAward />
                <h3>4.8/5</h3>
                <p>Average Rating</p>
              </div>
              <div className="stat-item">
                <FiHeart />
                <h3>25,000+</h3>
                <p>Happy Customers</p>
              </div>
            </div>
          </div>
        </section>

        <section className="team-section">
          <div className="section-container">
            <h2>Leadership Team</h2>
            <div className="team-grid">
              <div className="team-member">
                <div className="member-avatar">SN</div>
                <h3>SHREE NANDAN REDDY P</h3>
                <p className="member-role">CEO & Founder</p>
                <p className="member-bio">
                  Technology entrepreneur with 15+ years in home improvement industry.
                </p>
              </div>
              <div className="team-member">
                <div className="member-avatar">MM</div>
                <h3>MATURI MANOJ</h3>
                <p className="member-role">CTO</p>
                <p className="member-bio">
                  Former Google engineer passionate about building scalable platforms.
                </p>
              </div>
              <div className="team-member">
                <div className="member-avatar">KR</div>
                <h3>K VIJAYA RAJU</h3>
                <p className="member-role">Head of Operations</p>
                <p className="member-bio">
                  Operations expert ensuring seamless service delivery across all markets.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
