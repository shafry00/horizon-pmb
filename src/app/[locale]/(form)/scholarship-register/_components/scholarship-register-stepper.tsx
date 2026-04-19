/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Stepper } from "@/components/ui/stepper";
import { ArrowRight, FilePlus, FileText } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";
import ScholarshipForm from "./scholarship-form";
import { useScholarshipFormStore } from "@/stores/use-scholarship-register-store";
import { toast } from "sonner";
import AdditionalInformationForm from "./additional-information-form";
import { TStudyProgram } from "@/types";
import { createScholarship } from "../actions";
import ReCAPTCHA from "react-google-recaptcha";

interface IScholarshipRegisterStepperProps {
  locale: string;
  studyPrograms: TStudyProgram[];
}

const ScholarshipRegisterStepper: React.FC<IScholarshipRegisterStepperProps> = (
  props
) => {
  const { locale, studyPrograms } = props;
  const [currentStep, setCurrentStep] = React.useState(0);
  const [isPending, startTransition] = React.useTransition();
  const [captchaToken, setCaptchaToken] = React.useState<string | null>(null);
  const recaptchaRef = React.useRef<ReCAPTCHA | null>(null);
  const formRef = React.useRef<any>(null);
  const t = useTranslations(
    "PAGE.FORM-MODULE.SCHOLARSHIP-REGISTER-PAGE.SECTION.FORM-SECTION.FORM"
  );
  const steps = [
    {
      icon: <FileText size={20} />,
      title: `${t("SCHOLARSHIP-FORM.title")}`,
      content: (
        <ScholarshipForm
          formRef={formRef}
          t={t}
          studyPrograms={studyPrograms}
        />
      ),
    },
    {
      icon: <FilePlus size={20} />,
      title: `${t("ADDITIONAL-INFORMATION-FORM.title")}`,
      content: (
        <AdditionalInformationForm formRef={formRef} t={t} locale={locale} />
      ),
    },
  ];

  const totalSteps = steps.length;

  const {
    formData,
    validateStep,
    resetForm,
    updateScholarshipInfo,
    updateAdditionalInformationInfo,
  } = useScholarshipFormStore();

  const syncFormToStore = React.useCallback(() => {
    if (!formRef.current) return;

    const values = formRef.current.getValues();

    if (currentStep === 0) {
      updateScholarshipInfo(values);
    } else if (currentStep === 1) {
      updateAdditionalInformationInfo(values);
    }
  }, [currentStep, updateScholarshipInfo, updateAdditionalInformationInfo]);

  const handleNext = React.useCallback(() => {
    syncFormToStore();

    const validation = validateStep(currentStep);

    if (!validation.valid) {
      toast.error(t("RESPONSE.error"), {
        style: {
          background: "red",
        },
        classNames: {
          content: "text-white",
          icon: "text-white",
        },
      });
      return;
    }

    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  }, [currentStep, totalSteps, validateStep, syncFormToStore, t]);

  const handlePrevious = React.useCallback(() => {
    syncFormToStore();

    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep, syncFormToStore]);

  const handleSubmit = React.useCallback(() => {
    syncFormToStore();

    const validation = validateStep(currentStep);

    if (!validation.valid) {
      toast("Please fill in all ");
      return;
    }

    startTransition(async () => {
      try {
        const result = await createScholarship(
          formData,
          captchaToken ?? undefined
        );

        if (result.success) {
          toast.success(t("RESPONSE.success"), {
            style: {
              backgroundColor: "#34D399",
              border: "1px solid #34D399",
              color: "#ffffff",
              fontWeight: "bold",
            },
          });
          localStorage.removeItem("scholarship-form");
          resetForm();
          await new Promise((resolve) => setTimeout(resolve, 100));
          setCurrentStep(0);
          setCaptchaToken(null);
          recaptchaRef.current?.reset();
        } else {
          toast.error(result.message || t("RESPONSE.error"), {
            style: {
              backgroundColor: "#FECACA",
              border: "1px solid #FCA5A5",
              color: "#7F1D1D",
              fontWeight: "bold",
            },
          });
        }
      } catch {
        toast.error("Something went wrong. Please try again.");
      }
    });
  }, [
    currentStep,
    syncFormToStore,
    validateStep,
    startTransition,
    formData,
    resetForm,
    captchaToken,
    t,
  ]);

  React.useEffect(() => {
    localStorage.removeItem("scholarship-form");
    resetForm();
  }, [resetForm]);

  return (
    <div className="flex flex-col gap-10">
      <Stepper
        steps={steps}
        currentStep={currentStep}
        onStepChange={setCurrentStep}
      />
      {steps[currentStep].content}
      {currentStep === totalSteps - 1 && (
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
          onChange={(token) => setCaptchaToken(token)}
        />
      )}
      <div className="flex gap-4">
        {currentStep > 0 && (
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="w-fit rounded-[8px] bg-primary-foreground border border-[#F1F1F1] flex items-center justify-center h-full gap-4 py-[6px] pr-[6px] pl-4"
          >
            {t("BUTTON.BACK")}{" "}
            <span className="w-9 aspect-square flex items-center justify-center bg-black rounded">
              <ArrowRight className="size-6 text-primary-foreground" />
            </span>
          </Button>
        )}
        {currentStep < totalSteps - 1 ? (
          <Button
            variant="outline"
            onClick={handleNext}
            disabled={currentStep === totalSteps - 1}
            className="text-primary-foreground capitalize w-fit rounded-[8px] bg-primary border-primary border flex items-center justify-center h-full gap-4 py-[6px] pr-[6px] pl-4"
          >
            {t("BUTTON.NEXT")}{" "}
            <span className="w-9 aspect-square flex items-center justify-center bg-primary-foreground rounded">
              <ArrowRight className="size-6 text-primary" />
            </span>
          </Button>
        ) : (
          <Button
            variant="outline"
            onClick={handleSubmit}
            disabled={isPending}
            className="text-primary-foreground capitalize w-fit rounded-[8px] bg-primary border-primary border flex items-center justify-center h-full gap-4 py-[6px] pr-[6px] pl-4"
          >
            {t("BUTTON.SUBMIT")}{" "}
            <span className="w-9 aspect-square flex items-center justify-center bg-primary-foreground rounded">
              <ArrowRight className="size-6 text-primary" />
            </span>
          </Button>
        )}
      </div>
    </div>
  );
};

export default ScholarshipRegisterStepper;
