import "../styling_files/projects.scss";
import { useState } from "react";
import {BsCodeSlash} from 'react-icons/bs'
import {AiOutlineLink} from 'react-icons/ai'
import { projectsData } from "./Data";

export default function Projects() {

  const [Currentslide, setCurrentslide] = useState(0);

  const handleclick = (direction) =>{
    if(direction === 'left'){
      setCurrentslide(
        Currentslide > 0 ? Currentslide - 1 : projectsData.length - 1
      );
    }
    else{
      setCurrentslide(
        Currentslide < projectsData.length - 1 ? Currentslide + 1 : 0
      );
    }
  }

  return (
    <div className="projects" id="projects">
      <div className="header">Projects</div>
      <div
        className="slider"
        style={{ transform: `translateX(-${Currentslide * 100}vw)` }}
      >
        {projectsData.map((d) => (
          <div className="container">
            <div className="item">
              <div className="left">
                <div className="icons">
                  {/* <a href={d.repo} target="_blank">
                    <BsCodeSlash className="icon" />
                  </a> */}
                  <a href={d.liveLink} target="_blank">
                    <AiOutlineLink className="icon" />
                  </a>
                </div>
                <h2>{d.title}</h2>
                <p>{d.description}</p>
              </div>
              <div className="right">
                <img src={d.image} alt="" />
              </div>
            </div>
          </div>
        ))}
      </div>
      <img
        src="myAssets/leftarrow.png"
        alt=""
        className="arrow left"
        onClick={() => handleclick("left")}
      />
      <img
        src="myAssets/rightarrow.png"
        alt=""
        className="arrow right"
        onClick={() => handleclick("right")}
      />
    </div>
  );
}
