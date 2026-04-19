/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import { Check, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepProps {
  title: string;
  description?: string;
  isCompleted?: boolean;
  isActive?: boolean;
  icon: React.ReactElement;
}

const Step: React.FC<StepProps> = ({ title, isCompleted, isActive, icon }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="relative flex items-center justify-center">
        <div
          className={cn(
            "w-8 h-8 rounded-full border-2 flex items-center justify-center",
            isCompleted
              ? "border-primary bg-primary text-primary-foreground"
              : isActive
              ? "border-black bg-black"
              : "border-[#A3A3A3]"
          )}
        >
          {isCompleted ? (
            <Check className="w-4 h-4" />
          ) : (
            React.cloneElement(icon as React.ReactElement<any>, {
              className: cn(
                "",
                isActive
                  ? "text-white"
                  : isCompleted
                  ? "text-black"
                  : "text-[#A3A3A3]"
              ),
            })
          )}
        </div>
      </div>
      <div className="ml-2 mt-[10px]">
        <span
          className={cn(
            "text-[16px] leading-5",
            isActive || isCompleted
              ? "text-black font-bold"
              : "text-[#A3A3A3] font-medium"
          )}
        >
          {title}
        </span>
      </div>
    </div>
  );
};

interface StepperProps {
  steps: Array<{
    title: string;
    description?: string;
    icon: React.ReactElement;
  }>;
  currentStep: number;
  onStepChange: (step: number) => void;
}

export function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <div className="w-full max-w-3xl mx-auto overflow-x-auto">
      <div className="flex flex-row justify-between items-center gap-4 mb-8">
        {steps.map((step, index) => (
          <React.Fragment key={step.title}>
            <Step
              title={step.title}
              description={step.description}
              isCompleted={index < currentStep}
              isActive={index === currentStep}
              icon={step.icon}
            />
            {index < steps.length - 1 && (
              <ChevronRight className="text-muted-foreground" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
