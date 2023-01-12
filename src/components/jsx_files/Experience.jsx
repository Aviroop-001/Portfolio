

import "../styling_files/experience.css";
import { timelineData } from "./Data";

const TimelineItem = ({ data }) => (
  <div className="timeline-item">
    <div className="timeline-item-content">
      <span className="tag" style={{ background: data.category.color }}>
        {data.category.tag}
      </span>
      <time>{data.date}</time>
      <p>{data.text}</p>
      <span className="circle" />
    </div>
  </div>
);

function Experience() {
  return (
    <div className="exp" id="experience">
      <div className="header">My Journey</div>
      {timelineData.length > 0 && (
      <div className="timeline-container">
        {timelineData.map((data, idx) => (
          <TimelineItem data={data} key={idx} />
        ))}
      </div>
      )}
    </div>
  );
}

export default Experience;
