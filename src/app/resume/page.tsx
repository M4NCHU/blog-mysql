export const metadata = {
  title: "Settings",
  description: "Account settings",
};

import Additional from "@/components/resume/Additional";
import Databases from "@/components/resume/Databases";
import Education from "@/components/resume/Education";
import Frameworks from "@/components/resume/Frameworks";
import Languages from "@/components/resume/Languages";
import Objective from "@/components/resume/Objective";
import ProgrammingLanguages from "@/components/resume/ProgrammingLanguages";
import Projects from "@/components/resume/Projects";
import ResumeSection from "@/components/resume/ResumeSection";
import WorkExperience from "@/components/resume/WorkExperience";
import { getAuthSession } from "@/lib/auth";

interface pageProps {}

const page = async ({}) => {
  const session = await getAuthSession();

  return (
    <div className="grow flex flex-col pt-12 px-4 gap-4 mb-24">
      <ResumeSection>
        <Objective />
      </ResumeSection>
      <ResumeSection>
        <Education />
      </ResumeSection>
      <ResumeSection>
        <WorkExperience />
      </ResumeSection>
      <ResumeSection>
        <ProgrammingLanguages />
      </ResumeSection>
      <ResumeSection>
        <Frameworks />
      </ResumeSection>
      <ResumeSection>
        <Databases />
      </ResumeSection>
      <ResumeSection>
        <Projects />
      </ResumeSection>
      <ResumeSection>
        <Additional />
      </ResumeSection>
    </div>
  );
};

export default page;
