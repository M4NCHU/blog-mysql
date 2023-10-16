"use client";

import { FC } from "react";
import ResumeHeader from "./ResumeHeader";

interface ObjectiveProps {}

const Objective: FC<ObjectiveProps> = ({}) => {
  return (
    <>
      <ResumeHeader title="Objective" id="objective" />
      <p>
        I am an ambitious and creative junior web developer seeking
        opportunities to gain experience and professional growth in the field of
        web development. I have a strong foundation in web programming and am
        eager to learn and work on various projects.
      </p>
    </>
  );
};

export default Objective;
