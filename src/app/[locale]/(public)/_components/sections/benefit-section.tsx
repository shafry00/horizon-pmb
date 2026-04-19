import React from "react";
import BenefitSlider from "../benefit-slider";

const BenefitSection = () => {
  return (
    <section
      id="home-page-benefit-section"
      className="padding-x-global padding-y-global"
    >
      <div className="bg-[#F7F7F9] flex flex-col gap-5 border border-solid border-[#EAEAEA] rounded-[20px] p-4 relative">
        <BenefitSlider />
      </div>
    </section>
  );
};

export default BenefitSection;
