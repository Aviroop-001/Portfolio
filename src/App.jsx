import React, {useState} from 'react';
import Navbar from './components/jsx_files/navbar';
import Burgermenu from "./components/jsx_files/burgermenu";
import Intro from "./components/jsx_files/intro";
import Projects from "./components/jsx_files/Projects";
// import Recommendation from "./components/jsx_files/recommendation";
import Contact from "./components/jsx_files/Contact";
import Experience from './components/jsx_files/Experience';
import Skills from './components/jsx_files/Skills';
import "./App.scss";
import Education from './components/jsx_files/Education';

function App() {
  const [menuactive, setmenuactive] = useState(false);
  return (
    <div className="App">
      <div className="sections">
        <Intro />
        <Experience />
        <Skills />
        <Education />
        <Projects />
        <Contact/>
      </div>
    </div>
  );
}

export default App;
