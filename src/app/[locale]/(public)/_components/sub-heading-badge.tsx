import React from "react";
import { Badge } from "@/components/ui/badge";
import { Circle } from "lucide-react";

interface ISubHeadingBadgeProps {
  subHeading: string;
}

const SubHeadingBadge: React.FC<ISubHeadingBadgeProps> = (props) => {
  const { subHeading } = props;
  return (
    <Badge className="bg-[#FFE5E8] rounded-[50px] p-2 gap-[10px]">
      <Circle className="fill-primary size-2" />{" "}
      <span className="text-[14px] leading-[18px] text-black">
        {subHeading}
      </span>
    </Badge>
  );
};

export default SubHeadingBadge;
