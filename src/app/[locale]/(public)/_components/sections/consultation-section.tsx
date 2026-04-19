import React from "react";
import FormConsultation from "../form-consultation";
import SubTitleBadge from "../../../_components/sub-title-badge";

interface IConsultationSectionProps {
  subTitle: string;
  heading: string;
  locale: string;
}

const ConsultationSection: React.FC<IConsultationSectionProps> = (props) => {
  const { subTitle, heading, locale } = props;
  return (
    <section className="w-full p-3 bg-primary-foreground">
      <div className="flex bg-[#F1F1F1] flex-col border border-solid border-[#EAEAEA] rounded-[20px]">
        <div className="flex flex-col gap-4 p-4 items-center">
          <SubTitleBadge subTitle={subTitle} />
          <div
            className="text-center text-[32px] md:text-[36px] lg:text-[40px] xl:text-[44px] 2xl:text-[48px] leading-9 md:leading-10 lg:leading-11 xl:leading-12 2xl:leading-13 tracking-[-1px]"
            dangerouslySetInnerHTML={{ __html: heading }}
          />
        </div>
        <div className="p-4">
          <FormConsultation locale={locale} />
        </div>
      </div>
    </section>
  );
};

export default ConsultationSection;
