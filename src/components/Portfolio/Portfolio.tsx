"use client";
import { FC, useEffect, useState } from "react";
import Contact from "./Contact";
import LandingPage from "./LandingPage";
import MySkills from "./MySkills";
import RecentProjects from "./RecentProjects";

interface PortfolioProps {}

const Portfolio: FC<PortfolioProps> = ({}) => {
  const [activeSection, setActiveSection] = useState<string>("landing");

  const sections = [
    {
      title: "Landing",
      id: "landing",
    },
    {
      title: "Skills",
      id: "skills",
    },
    {
      title: "Recent",
      id: "recent",
    },
    {
      title: "Contact",
      id: "contact",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      for (const section of sections) {
        const sectionElement = document.getElementById(section.id);
        if (sectionElement) {
          const rect = sectionElement.getBoundingClientRect();
          if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="portfolio container px-0 sm:px-6 pb-4">
        <LandingPage />
        <MySkills />
        <RecentProjects />
        {/* <Contact /> */}
      </div>

      <div className="fixed hidden sm:flex right-2 h-full w-6 text-center  flex-col items-center justify-center text-xl gap-4 ">
        <div className={`rotate-90 flex gap-4 text-base text-foreground`}>
          {sections &&
            sections.map((item, i) => (
              <a
                key={i}
                href={`#${item.id}`}
                className={`
                
                  ${
                    activeSection === item.id
                      ? "active-link text-foreground"
                      : "text-hoverColor"
                  }
                `}
              >
                {item.title}
              </a>
            ))}
        </div>
      </div>
    </>
  );
};

export default Portfolio;
