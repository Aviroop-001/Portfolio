import React from 'react'
import "../styling_files/contact.scss"
import {AiOutlineMail, AiOutlineWhatsApp} from 'react-icons/ai'
import { SlSocialLinkedin } from "react-icons/sl";

function Contact() {
  return (
    <div className="contact" id="contact">
      <div className="header">Contact me</div>
      <div className="container">
        <a href="mailto: banerjeeaviroop01@gmail.com" className="icon">
          <AiOutlineMail />
        </a>
        <a
          href="https://www.linkedin.com/in/aviroop-banerjee-4946621b5/"
          className="icon"
        >
          <SlSocialLinkedin />
        </a>
        {/* <a
          href="https://wa.me/917439263408"
          className="icon"
        >
          <AiOutlineWhatsApp />
        </a> */}
      </div>
    </div>
  );
}

export default Contact