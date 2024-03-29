import React from 'react';
import "../styling_files/burgermenu.scss";

export default function burgermenu({menuactive, setmenuactive}) {
    return (
      <div className={"burgermenu " + (menuactive && "active")}>
        <ul>
          <li onClick={() => setmenuactive(false)}>
            <a href="#intro">Intorduction</a>
          </li>
          <li onClick={() => setmenuactive(false)}>
            <a href="#experience">Experience</a>
          </li>
          <li onClick={() => setmenuactive(false)}>
            <a href="#skills">Skills</a>
          </li>
          <li onClick={() => setmenuactive(false)}>
            <a href="#projects">Projects</a>
          </li>
          {/* <li onClick={()=>setmenuactive(false)}><a href="#recommendations">Testimonials</a></li> */}
          <li onClick={()=>setmenuactive(false)}><a href="#contact">Contact Me</a></li>
        </ul>
      </div>
    );
}
