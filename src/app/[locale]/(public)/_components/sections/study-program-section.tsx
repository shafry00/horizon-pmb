import React from "react";
import StudyProgramSlider from "../study-program-slider";
const StudyProgramSection = () => {
  return (
    <section id="home-page-study-program-section" className="p-3">
      <div className="bg-[#F7F7F9] flex flex-col gap-6 border border-solid border-[#EAEAEA] rounded-[20px] p-4 relative">
        <StudyProgramSlider />
      </div>
    </section>
  );
};

export default StudyProgramSection;
