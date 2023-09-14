import "../styling_files/skills.scss";
import { useState } from "react";

export default function Skills() {

  const languages = ["JavaScript","Python","C++/ C","HTML","CSS","SQL","SASS"]
  const frameworks = [
    "Node.js",
    "Express.js",
    "Django",
    "Flask",
    "ReactJS",
    "React Native",
    "Mongoose",
    "jQuery",
    "Socket.IO",
    "Redux",
    "Tailwind CSS",
    "Axios",
    "Scrapy",
    "Beautiful Soup ",
  ];
  const others = ["System Design", 'MongoDB','MySQL','Firebase','REST API','Web Scraping','Git','Github','Docker','Kubernetes', "CI/CD"];
  const ml = ["TensorFlow", 'Machine Learning','Data Science','Large Language Models','Natural Language Processing']
  const frontend = ["ReactJS" , "React Native","Redux","React-Query","HTML/CSS","SASS","jQuery","Tailwind CSS","Bootstrap","Material UI"]
  const backend = ["Node.js","Express.js","MongoDB","REST API","CRUD","Mongoose","MySQL",, "Docker", "Kubernetes"];
  const misc = ["JavaScript","Python","C++/C","Git","Github","Shell script","jQuery","Axios","Bootstrap","Material UI"
  ];

  return (
    <div className="skills" id="skills">
      {/* <div className="headsection"> */}
        <div className="head">Skills</div>
      {/* </div> */}
      <div className="skillsections">
        <div className="section">
          <div className="header">Languages</div>
          <div className="content">
            {languages.map((f) => (
              <button className="btn">{f}</button>
            ))}
          </div>
        </div>
        <div className="section">
          <div className="header">Frameworks</div>
          <div className="content">
            {frameworks.map((f) => (
              <button className="btn">{f}</button>
            ))}
          </div>
        </div>
        <div className="section">
          <div className="header">Others</div>
          <div className="content">
            {others.map((f) => (
              <button className="btn">{f}</button>
            ))}
          </div>
        </div>
        <div className="section">
          <div className="header">AI/ML</div>
          <div className="content">
            {ml.map((f) => (
              <button className="btn">{f}</button>
            ))}
          </div>
        </div>
      </div>
      
    </div>
  );
}

  
