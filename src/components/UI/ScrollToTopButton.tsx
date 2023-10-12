"use client";

import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

interface ScrollToTopButtonProps {
  bottom?: string;
  scrollThreshold: number;
}

const ScrollToTopButton = ({
  scrollThreshold = 200,
  bottom,
}: ScrollToTopButtonProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > scrollThreshold) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className={`fixed ${
            bottom ? bottom : "bottom-4"
          } right-4 bg-default-100 hover:bg-default-200 text-foreground rounded-full p-2 hover:bg-primary-dark transition-colors duration-300 z-[9999]`}
        >
          <FaArrowUp size={24} />
        </button>
      )}
    </>
  );
};

export default ScrollToTopButton;
