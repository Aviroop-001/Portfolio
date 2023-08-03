

import "../styling_files/experience.css";
import { timelineData } from "./Data";

const TimelineItem = ({ data }) => (
  <div className="timeline-item">
    <div className="timeline-item-content">
      {/* <div>
        <img
          className="iconImage"
          src={data.icon}
          alt=""
        />
      </div> */}
      <span className="tag" style={{ background: data.category.color }}>
        {data.category.tag}
      </span>
      <time>{data.date}</time>
      <div className="position">
        <span style={{ fontWeight: "bolder", fontSize: "1.1rem" }}>
          {data.position}
        </span>
        ,
        <span style={{ fontStyle: "italic", fontSize: "1.1rem" }}>
          {" "}
          {data.org}
        </span>
      </div>
      <div style={{ marginTop: "10px" }}>{data.text}</div>
      {data.skills && (
        <div
          style={{ marginTop: "5px", fontWeight: "bold", fontFamily: "Roboto" }}
        >
          &#x22C6; {data.skills}
        </div>
      )}
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
