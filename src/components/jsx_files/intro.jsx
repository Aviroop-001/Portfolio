import "../styling_files/intro.scss"
import {FaChevronDown} from "react-icons/fa";
import { init } from "ityped";
import { useEffect, useRef } from "react";
import {RiLinkedinLine} from "react-icons/ri"
import {VscGithubAlt} from 'react-icons/vsc'
import {SlSocialTwitter} from 'react-icons/sl'
import {SiLeetcode} from 'react-icons/si'
import {AiOutlineDown} from 'react-icons/ai'
import { RiMenuLine } from "react-icons/ri";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  IconButton,
  Box, Text
} from "@chakra-ui/react";

export default function Intro() {

    // const  textRef = useRef();
    // useEffect(() => {
    //     init(textRef.current, {
    //       showCursor: true,
    //       backDelay: 1000,
    //       backSpeed: 30,
    //       strings: [
    //         "Backend Developer",
    //         "Frontend Developer",
    //         "MERN Fullstack Developer",
    //         "Problem Solver",
    //       ],
    //     });
        
    // }, [])

    return (
      <Box
        className="intro"
        id="intro"
        backgroundColor="#d5dbd8"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Menu justifyContent="flex-end" height="fit-content">
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<RiMenuLine />}
            size="lg"
            variant="ghost"
            position="fixed"
            top={["20px", "50px"]}
            right={["25px", "60px"]}
            _hover={{ boxShadow: "2px 2px 5px gray" }}
            _active={{ backgroundColor: "#d5dbd8" }}
            z-index= '999'
          />
          <MenuList color="black" backgroundColor="#d5dbd8" borderWidth="0px">
            <a href="#intro">
              <MenuItem
                backgroundColor="#d5dbd8"
                borderRadius="5px"
                padding="1rem 2rem"
                _hover={{ color: "#d5dbd8", backgroundColor: "black" }}
                _active={{ color: "#d5dbd8", backgroundColor: "black" }}
              >
                {" "}
                Intorduction{" "}
              </MenuItem>
            </a>
            <a href="#experience">
              <MenuItem
                backgroundColor="#d5dbd8"
                borderRadius="5px"
                padding="1rem 2rem"
                _hover={{ color: "#d5dbd8", backgroundColor: "black" }}
                _active={{ color: "#d5dbd8", backgroundColor: "black" }}
              >
                {" "}
                Experience{" "}
              </MenuItem>
            </a>
            <a href="#skills">
              <MenuItem
                backgroundColor="#d5dbd8"
                borderRadius="5px"
                padding="1rem 2rem"
                _hover={{ color: "#d5dbd8", backgroundColor: "black" }}
                _active={{ color: "#d5dbd8", backgroundColor: "black" }}
              >
                {" "}
                Skills{" "}
              </MenuItem>
            </a>
            <a href="#projects">
              <MenuItem
                backgroundColor="#d5dbd8"
                borderRadius="5px"
                padding="1rem 2rem"
                _hover={{ color: "#d5dbd8", backgroundColor: "black" }}
                _active={{ color: "#d5dbd8", backgroundColor: "black" }}
              >
                {" "}
                Project{" "}
              </MenuItem>
            </a>
            <a href="#contact">
              <MenuItem
                backgroundColor="#d5dbd8"
                borderRadius="5px"
                padding="1rem 2rem"
                _hover={{ color: "#d5dbd8", backgroundColor: "black" }}
                _active={{ color: "#d5dbd8", backgroundColor: "black" }}
              >
                {" "}
                Contact me{" "}
              </MenuItem>
            </a>
          </MenuList>
        </Menu>
        <Text
          color="black"
          fontSize={["3.4rem", "5rem"]}
          width="100%"
          textAlign="center"
        >
          Aviroop Banerjee
        </Text>
        {/* <h3>
              <span ref={textRef}></span>
            </h3> */}
        <a
          href="https://drive.google.com/file/d/13n1yMqtzusGvOnR6oipaYFaROGStBXGJ/view?usp=share_link"
          className="btn-shine"
          target="_blank"
        >
          Download Resume
        </a>
        {/* <div className="right">
          <Box className="links">
            <a
              href="https://github.com/Aviroop-001"
              className="link"
              target="_blank"
            >
              <VscGithubAlt color="white" />
            </a>
            <a
              href="https://www.linkedin.com/in/aviroopbanerjee/"
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
            {/* <a
              href="https://leetcode.com/Aviroop_01/"
              className="link"
              target="_blank"
            >
              <SiLeetcode color="white" />
            </a> */}
        {/* <button className="btn">Resume</button> */}
        {/* </div> */}
        {/* </div> */}
      </Box>
    );
}
