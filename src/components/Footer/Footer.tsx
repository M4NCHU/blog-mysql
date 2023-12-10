import { FC } from "react";
import FooterList from "./FooterList";
import FooterListItem from "./FooterListItem";
import FooterSection from "./FooterSection";

import { FaFacebook, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import RoundedBtn from "../UI/RoundedBtn";
import FooterSectionTitleTitle from "./FooterSectionTitle";

interface FooterProps {}

const Footer: FC<FooterProps> = ({}) => {
  return (
    <footer className="w-full py-16 bg-backgroundSecond flex justify-center ">
      <div className="flex flex-col md:flex-row container">
        <FooterSection>
          <p className="">
            Web developer with a passion for clean code and creative design.{" "}
            {`Let's`} build something amazing together!
          </p>
          <div className="flex flex-row items-center">
            <a
              href="https://www.facebook.com/maciej.szwast"
              target="_blank"
              rel="noopener noreferrer"
            >
              <RoundedBtn icon={<FaFacebook />} />
            </a>
            <a
              href="https://github.com/M4NCHU"
              target="_blank"
              rel="noopener noreferrer"
            >
              <RoundedBtn icon={<FaGithub />} />
            </a>
            <a
              href="https://www.linkedin.com/in/maciej-szwast-189684293/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <RoundedBtn icon={<FaLinkedin />} />
            </a>
            <a
              href="https://twitter.com/MaciejSzwast"
              target="_blank"
              rel="noopener noreferrer"
            >
              <RoundedBtn icon={<FaTwitter />} />
            </a>
          </div>
        </FooterSection>
        <FooterSection>
          <FooterList>
            <FooterSectionTitleTitle title="Links" />
            <FooterListItem title="Home" href="/" />
            <FooterListItem title="Blog" href="/blog" />
            <FooterListItem title="About" href="/resume" />
            <FooterListItem title="Contact" href="contact" />
          </FooterList>
        </FooterSection>
        <FooterSection>
          <FooterList>
            <FooterSectionTitleTitle title="Contact me" />
            <FooterListItem title="793 659 960" href="/" />
            <FooterListItem title="maciejov250@gmail.com" href="/blog" />
          </FooterList>
        </FooterSection>
        <FooterSection>
          <FooterList>
            <FooterSectionTitleTitle title="Write to me" />
          </FooterList>
        </FooterSection>
      </div>
    </footer>
  );
};

export default Footer;
