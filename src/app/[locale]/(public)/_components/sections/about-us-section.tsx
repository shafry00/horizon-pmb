import React from "react";
import AboutUsSlider from "../about-us-slider";

const AboutUsSection = () => {
  return (
    <section>
      <div className="h-full padding-x-global padding-y-global bg-[#F7F7F9] rounded-[20px] border border-solid border-[#EAEAEA]">
        <AboutUsSlider />
      </div>
    </section>
  );
};

export default AboutUsSection;
