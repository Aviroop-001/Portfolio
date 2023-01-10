import "../styling_files/intro.scss"
import {FaChevronDown} from "react-icons/fa";
import { init } from "ityped";
import { useEffect, useRef } from "react";
import {RiLinkedinLine} from "react-icons/ri"
import {VscGithubAlt} from 'react-icons/vsc'
import {SlSocialTwitter} from 'react-icons/sl'
import {SiLeetcode} from 'react-icons/si'
import {AiOutlineDown} from 'react-icons/ai'

export default function Intro() {

    const  textRef = useRef();
    useEffect(() => {
        init(textRef.current, {
          showCursor: true,
          backDelay: 1000,
          backSpeed: 30,
          strings: [
            "Backend Web Developer",
            "Frontend Web Developer",
            "MERN Fullstack Developer",
            "Problem Solver",
          ],
        });
        
    }, [])

    return (
      <div className="intro" id="intro">
        <div className="left">
          <div className="shortintro">
            <h1>Aviroop Banerjee</h1>
            <h3>
              I'm a <span ref={textRef}></span>
            </h3>
          </div>
          <a href="#skills">
            <AiOutlineDown className="downarrow" />
          </a>
        </div>
        <div className="right">
          <div className="links">
            <a
              href="https://github.com/Aviroop-001"
              className="link"
              target="_blank"
            >
              <VscGithubAlt color="white" />
            </a>
            <a
              href="https://www.linkedin.com/in/aviroop-banerjee-4946621b5/"
              className="link"
              target="_blank"
            >
              <RiLinkedinLine color="white" />
            </a>
            <a
              href="https://twitter.com/aviroop_B"
              className="link"
              target="_blank"
            >
              <SlSocialTwitter color="white" />
            </a>
            <a
              href="https://leetcode.com/Aviroop_01/"
              className="link"
              target="_blank"
            >
              <SiLeetcode color="white" />
            </a>
            <button className="btn">Resume</button>
          </div>
        </div>
      </div>
    );
}
