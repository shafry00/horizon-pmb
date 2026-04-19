import React from "react";
import { Badge } from "@/components/ui/badge";
import { Circle } from "lucide-react";

interface ISubTitleBadgeProps {
  subTitle: string;
}

const SubTitleBadge: React.FC<ISubTitleBadgeProps> = (props) => {
  const { subTitle } = props;
  return (
    <Badge className="bg-[#FFE5E8] rounded-[50px] px-2 py-2 lg:px-4 gap-[10px]">
      <Circle className="fill-primary size-2" />{" "}
      <span className="text-[14px] lg:text-[16px] leading-[18px] lg:leading-5 text-black">
        {subTitle}
      </span>
    </Badge>
  );
};

export default SubTitleBadge;
