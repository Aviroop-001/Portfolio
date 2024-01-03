import React from 'react'
import {AiOutlineMail} from 'react-icons/ai'
import { SlSocialLinkedin } from "react-icons/sl";
import { VscGithubAlt } from "react-icons/vsc";
import { SlSocialTwitter } from "react-icons/sl";
import { SiLeetcode } from "react-icons/si";
import {
  Box,
  Text,
} from "@chakra-ui/react";

function Contact() {
  return (
    <Box
      backgroundColor="#d5dbd8"
      display="flex"
      flexDirection="column"
      color="black"
      justifyContent="space-evenly"
      alignItems="center"
    >
      <Text fontSize={["3rem", "4rem"]}>Contact me</Text>
      <Box
        width="80%"
        display="flex"
        justifyContent="space-evenly"
        alignItems="center"
      >
        <a href="mailto: banerjeeaviroop01@gmail.com" className="icon">
          <AiOutlineMail fontSize="3rem" />
        </a>
        <a
          href="https://www.linkedin.com/in/aviroop-banerjee-4946621b5/"
          className="icon"
          target="_blank"
        >
          <SlSocialLinkedin fontSize="3rem" />
        </a>
        <a
          href="https://github.com/Aviroop-001"
          className="icon"
          target="_blank"
        >
          <VscGithubAlt fontSize="3rem" />
        </a>
        {/* <a
          href="https://wa.me/917439263408"
          className="icon"
        >
          <AiOutlineWhatsApp />
        </a> */}
      </Box>
    </Box>
  );
}

export default Contact