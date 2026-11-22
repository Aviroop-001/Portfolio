import React, { useRef, useEffect } from 'react';
import "../styling_files/testimonials.scss";
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const testimonialsData = [
  {
    id: 1,
    name: 'Alabhya Vaibhav',
    animal: '🚀',
    role: 'PM @ Itron | ex-CommerceIQ',
    company: 'CommerceIQ / Itron',
    relationship: 'Worked with Aviroop on the same team',
    date: 'September 13, 2026',
    avatarBg: '#8B5CF6',
    text: `I worked with Aviroop at CommerceIQ on several horizontal initiatives, including our back-end and user-level permissions framework and the mass migration of customers to a unified system. On both, Aviroop took things from early discovery all the way through to delivery, with complete ownership at every stage. He didn't just build what was asked — he shaped the problem, thought through the edge cases, and drove execution end-to-end. Impressive to see this level of ownership from an SDE1. Aviroop would be a strong addition to any team.`
  },
  {
    id: 2,
    name: 'Aman Kadam',
    animal: '🐺',
    role: 'Engineering @ Urbint',
    company: 'Urbint',
    relationship: 'Senior to Aviroop (worked across multiple projects)',
    date: 'September 13, 2026',
    avatarBg: '#10B981',
    text: `I worked with Aviroop across multiple projects, right from his internship through his transition into a full-time role. He is one of the most hardworking and curious people I’ve worked with. He’s always eager to learn, takes strong ownership of his work, and can be trusted to drive features end to end from understanding the requirements to implementation and release. What stands out most is his willingness to take responsibility, learn quickly, and get things done. He has grown tremendously during the time we have worked together, and I am confident he will be a great addition to any team he works with. I’d highly recommend Aviroop.`
  },
  {
    id: 3,
    name: 'Biswarup Mukherjee',
    animal: '🦔',
    role: 'SDE2 @ Oracle',
    company: 'Oracle',
    relationship: 'Worked with Aviroop on different teams',
    date: 'July 19, 2024',
    avatarBg: '#FBE285',
    text: `He has shown extreme ownership towards the tasks he was assigned to. Always eager to learn and explore new things. Really great at problem solving.`
  },
  {
    id: 4,
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
    id: 5,
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
    id: 6,
    name: 'Jayant Kapila',
    animal: '🐼',
    role: 'Software Engineer',
    company: 'Winsple',
    relationship: 'Managed Aviroop directly',
    date: 'October 19, 2023',
    avatarBg: '#FFBD2E',
    text: `Throughout his time with us, he demonstrated exceptional dedication and a strong work ethic. He consistently delivered high-quality work, met deadlines, and displayed a willingness to learn and adapt. I recommend that Aviroop is a strong and valuable asset to any team he works with.`
  },
  {
    id: 7,
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

  // We append a few extra to allow for infinite scrolling illusion, though step scrolling handles it well
  const marqueeItems = [...testimonialsData, ...testimonialsData, ...testimonialsData];

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    let scrollInterval;
    
    const startAutoScroll = () => {
      scrollInterval = setInterval(() => {
        if (scrollContainer) {
          const cardWidth = 380 + 24; // Card width + gap
          const maxScrollLeft = scrollContainer.scrollWidth - scrollContainer.clientWidth;
          
          if (scrollContainer.scrollLeft >= maxScrollLeft - cardWidth) {
            // Reset to beginning seamlessly
            scrollContainer.scrollLeft = 0;
          } else {
            scrollContainer.scrollBy({ left: cardWidth, behavior: 'smooth' });
          }
        }
      }, 4000); // Wait 4 seconds, then glide
    };

    startAutoScroll();

    // Pause auto-scroll on hover
    const handleMouseEnter = () => clearInterval(scrollInterval);
    const handleMouseLeave = () => startAutoScroll();

    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);
    
    // Also pause on touch
    scrollContainer.addEventListener('touchstart', handleMouseEnter);
    scrollContainer.addEventListener('touchend', handleMouseLeave);

    return () => {
      clearInterval(scrollInterval);
      if (scrollContainer) {
        scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
        scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
        scrollContainer.removeEventListener('touchstart', handleMouseEnter);
        scrollContainer.removeEventListener('touchend', handleMouseLeave);
      }
    };
  }, []);

  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      const cardWidth = 380 + 24;
      scrollContainerRef.current.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    }
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      const cardWidth = 380 + 24;
      scrollContainerRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
    }
  };

  return (
    <div className="testimonials-showcase-container">
      {/* Header Bar */}
      <div className="testimonials-header">
        <h2 className="section-title">Peer &amp; Leadership Reviews</h2>
        <p className="testimonials-description">
          Don't take my word for it. Hear it directly from my managers and colleagues.
        </p>

        {/* Controls Toolbar */}
        <div className="reviews-toolbar">
          <div className="status-pills">
            <span className="pill badge-pill">
              ⭐ {testimonialsData.length} Verified Recommendations
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

      {/* Step Scrolling Viewport */}
      <div className="infinite-marquee-viewport" ref={scrollContainerRef}>
        <div className="marquee-track">
          {marqueeItems.map((item, index) => (
            <div key={`${item.id}-${index}`} className="testimonial-card-modern">
              <div className="card-top-avatar">
                <div 
                  className="author-avatar-animal"
                  style={{ backgroundColor: item.avatarBg }}
                >
                  {item.animal}
                </div>
              </div>

              <blockquote className="card-quote-body">
                "{item.text}"
              </blockquote>
              
              <div className="card-bottom-signature">
                <div className="signature-font">{item.name}</div>
                <div className="author-role">{item.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
