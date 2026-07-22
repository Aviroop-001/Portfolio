import React, { useRef } from 'react';
import "../styling_files/testimonials.scss";
import { FiMessageSquare, FiLinkedin, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const testimonialsData = [
  {
    id: 1,
    name: 'Biswarup Mukherjee',
    animal: '🦔',
    role: 'SDE2 @ Oracle (5+ Yrs Exp)',
    company: 'Oracle',
    relationship: 'Worked with Aviroop on different teams',
    date: 'July 19, 2024',
    avatarBg: '#FBE285',
    text: `He has shown extreme ownership towards the tasks he was assigned to. Always eager to learn and explore new things. Really great at problem solving.`
  },
  {
    id: 2,
    name: 'Vishal Bajaj',
    animal: '🦁',
    role: 'Co-founder @ Airbook & Pylar',
    company: 'Airbook',
    relationship: 'Managed Aviroop directly',
    date: 'March 5, 2024',
    avatarBg: '#27C93F',
    text: `Aviroop’s major contribution was the addition of database and data warehouse integrations to Airbook so that users can connect directly to their sources of truth to make data driven decisions. This played a pivotal role in expanding our customer base and improving our product. Additionally, he quickly learned new tools/skills and worked on tasks like ELT, devops and building sql parsers. I enjoyed working with Aviroop and am curious to observe his potential unfold in various working environments.`
  },
  {
    id: 3,
    name: 'Danish D\'souza',
    animal: '🦊',
    role: 'Founding Engineer @ Faved ⭐️',
    company: 'Airbook / Faved',
    relationship: 'Worked with Aviroop on the same team',
    date: 'January 3, 2024',
    avatarBg: '#FF5F56',
    text: `Aviroop was a great intern to have on the team! While most of his duties involved backend work, Aviroop also lent a hand on the frontend, and went above and beyond to offer viable solutions to issues we were facing. Aviroop was able to work with APIs for multiple cloud platforms and built out ETL pipelines to enable customers to bring their own DBs. Despite working asynchronously in another city, Aviroop was always engaged with our dev and business teams.`
  },
  {
    id: 4,
    name: 'Jayant Kapila',
    animal: '🐼',
    role: 'Software Engineer (Android / Backend)',
    company: 'Winsple',
    relationship: 'Managed Aviroop directly',
    date: 'October 19, 2023',
    avatarBg: '#FFBD2E',
    text: `Throughout his time with us, he demonstrated exceptional dedication and a strong work ethic. He consistently delivered high-quality work, met deadlines, and displayed a willingness to learn and adapt. I recommend that Aviroop is a strong and valuable asset to any team he works with.`
  },
  {
    id: 5,
    name: 'Debdoot Roy Chowdhury',
    animal: '🦉',
    role: 'Software Engineer @ Oracle',
    company: 'Oracle / IIT Bombay',
    relationship: 'Studied & built projects together',
    date: 'July 23, 2023',
    avatarBg: '#B99DED',
    text: `I have worked with Aviroop in small projects in college and he has a this skill of learning new tech stacks very quickly. He also has a profound knowledge on Web Development especially in the backend. In a group he has the potential to be the most valuable member.`
  }
];

export default function Testimonials() {
  const scrollContainerRef = useRef(null);

  // Duplicated data array to enable infinite seamless marquee loop
  const marqueeItems = [...testimonialsData, ...testimonialsData];

  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -440, behavior: 'smooth' });
    }
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 440, behavior: 'smooth' });
    }
  };

  return (
    <div className="testimonials-showcase-container">
      {/* Header Bar */}
      <div className="testimonials-header">
        <h2 className="section-title">Peer &amp; Leadership Reviews</h2>
        <p className="testimonials-description">
          Recommendations and feedback from co-founders, engineering managers, and senior colleagues I've collaborated with.
        </p>

        {/* Controls Toolbar */}
        <div className="reviews-toolbar">
          <div className="status-pills">
            <span className="pill badge-pill">
              ⭐ 5 Verified Recommendations
            </span>
          </div>

          <div className="nav-arrow-btns">
            <button className="nav-arrow-btn" onClick={handleScrollLeft} title="Scroll Left">
              <FiChevronLeft />
            </button>
            <button className="nav-arrow-btn" onClick={handleScrollRight} title="Scroll Right">
              <FiChevronRight />
            </button>
          </div>
        </div>
      </div>

      {/* Infinite Horizontally Looping Marquee Showcase */}
      <div className="infinite-marquee-viewport" ref={scrollContainerRef}>
        <div className="marquee-track">
          {marqueeItems.map((item, index) => (
            <div key={`${item.id}-${index}`} className="testimonial-card-horizontal">
              {/* Card Header */}
              <div className="card-top-row">
                <div className="author-meta">
                  <div 
                    className="author-avatar-animal"
                    style={{ backgroundColor: item.avatarBg }}
                  >
                    {item.animal}
                  </div>
                  <div className="author-titles">
                    <span className="author-name">{item.name}</span>
                    <span className="author-role">{item.role}</span>
                  </div>
                </div>

                <a
                  href="https://www.linkedin.com/in/aviroopbanerjee/details/recommendations/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="linkedin-verified-badge"
                  title="Verified on LinkedIn"
                >
                  <FiLinkedin /> Verified ↗
                </a>
              </div>

              {/* Relationship Banner */}
              <div className="relationship-banner">
                <FiMessageSquare className="banner-icon" />
                <span>{item.relationship} · {item.date}</span>
              </div>

              {/* Review Quote Body */}
              <blockquote className="card-quote-body">
                "{item.text}"
              </blockquote>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
