import "../styling_files/skills.scss";
import { useState } from "react";

export default function Skills() {

  const frontend = ["ReactJS" , "React Native","Redux","React-Query","HTML/CSS","SASS","jQuery","Tailwind CSS","Bootstrap","Material UI"]
  const backend = ["Node.js","Express.js","MongoDB","REST API","CRUD Ops","Mongoose","MySQL","JSON Web Tokens", "Docker", "Kubernetes"];
  const misc = ["JavaScript","Python","C++/C","Git","Github","Shell script","jQuery","Axios","Bootstrap","Material UI"
  ];

  return (
    <div className="skills" id="skills">
      {/* <div className="headsection"> */}
        <div className="head">Skills</div>
      {/* </div> */}
      <div className="skillsections">
        <div className="section">
          <div className="header">Frontend</div>
          <div className="content">
            {frontend.map((f) => (
              <button className="btn">{f}</button>
            ))}
          </div>
        </div>
        <div className="section">
          <div className="header">Backend</div>
          <div className="content">
            {backend.map((f) => (
              <button className="btn">{f}</button>
            ))}
          </div>
        </div>
        <div className="section">
          <div className="header">Others</div>
          <div className="content">
            {misc.map((f) => (
              <button className="btn">{f}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

  
