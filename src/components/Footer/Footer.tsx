import { FC } from "react";
import FooterSection from "./FooterSection";
import FooterList from "./FooterList";
import FooterListItem from "./FooterListItem";

import { FaFacebook, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import RoundedBtn from "../UI/RoundedBtn";
import FooterSectionTitleTitle from "./FooterSectionTitle";

interface FooterProps {}

const Footer: FC<FooterProps> = ({}) => {
  return (
    <div className="w-full py-16 bg-backgroundSecond flex justify-center">
      <div className="flex flex-col md:flex-row container">
        <FooterSection>
          <p className="">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi rem
            quam laborum odit, culpa
          </p>
          <div className="flex flex-row items-center">
            <RoundedBtn icon={<FaFacebook />} />
            <RoundedBtn icon={<FaGithub />} />
            <RoundedBtn icon={<FaLinkedin />} />
            <RoundedBtn icon={<FaTwitter />} />
          </div>
        </FooterSection>
        <FooterSection>
          <FooterList>
            <FooterSectionTitleTitle title="Links" />
            <FooterListItem title="Home" href="/" />
            <FooterListItem title="Blog" href="/blog" />
            <FooterListItem title="About" href="/about" />
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
    </div>
  );
};

export default Footer;
