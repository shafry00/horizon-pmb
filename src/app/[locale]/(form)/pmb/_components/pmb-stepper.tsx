"use client";

import { Button } from "@/components/ui/button";
import { Stepper } from "@/components/ui/stepper";
import { ArrowRight, FilePlus, FileText } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";
import { toast } from "sonner";
import StudentInformationForm from "./student-information-form";
import ParentInformationForm from "./parent-information-form";
import { usePMBStore } from "@/stores/use-pmb-store";
import AssessmentForm from "./assessment-form";
import { StudyProgram, TAssessmentQuestion } from "@/types";
import { Input } from "@/components/ui/input";
import ReCAPTCHA from "react-google-recaptcha";

interface IPMBStepper {
  assessments: TAssessmentQuestion[];
  studyPrograms: StudyProgram[];
  locale: string;
}

const PMBStepper: React.FC<IPMBStepper> = (props) => {
  const { assessments, studyPrograms, locale } = props;
  const [currentStep, setCurrentStep] = React.useState(0);
  const [isPending, startTransition] = React.useTransition();
  const [csrfToken, setCsrfToken] = React.useState("");
  const [captchaToken, setCaptchaToken] = React.useState<string | null>(null);
  const recaptchaRef = React.useRef<ReCAPTCHA | null>(null);
  const t = useTranslations("PAGE.PMB-PAGE.SECTION.FORM-SECTION.FORM");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formRef = React.useRef<any>(null);
  const steps = [
    {
      icon: <FileText size={20} />,
      title: `${t("STUDENT-INFORMATION-FORM.title")}`,
      content: (
        <StudentInformationForm
          studyPrograms={studyPrograms}
          formRef={formRef}
          locale={locale}
        />
      ),
    },
    {
      icon: <FilePlus size={20} />,
      title: `${t("PARENT-INFORMATION-FORM.title")}`,
      content: <ParentInformationForm locale={locale} formRef={formRef} />,
    },
    {
      icon: <FilePlus size={20} />,
      title: `${t("ASSESSMENT-FORM.title")}`,
      content: <AssessmentForm assessments={assessments} />,
    },
  ];

  const totalSteps = steps.length;

  React.useEffect(() => {
    const getCsrfToken = async () => {
      try {
        const res = await fetch("/api/csrf");
        const data = await res.json();
        setCsrfToken(data.token);
      } catch (error) {
        console.error("Gagal mengambil CSRF token", error);
      }
    };

    getCsrfToken();
  }, []);

  const {
    formData,
    validateStep,
    resetForm,
    updateStudentInformation,
    updateParentInformation,
    updateAssessmentAnswer,
    setAssessmentQuestionIds,
  } = usePMBStore();

  const syncFormToStore = () => {
    if (!formRef.current) return;

    const values = formRef.current.getValues();

    if (currentStep === 0) {
      updateStudentInformation({
        ...values,
        studyProgramId: Number(values.studyProgramId),
      });
    } else if (currentStep === 1) {
      updateParentInformation(values);
    } else if (currentStep === 2) {
      updateAssessmentAnswer(values);
    }
  };
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
  }, [currentStep, totalSteps, validateStep, updateStudentInformation]);

  const handlePrevious = React.useCallback(() => {
    syncFormToStore();
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep]);

  const handleSubmit = React.useCallback(() => {
    const validation = validateStep(currentStep);

    if (!validation.valid) {
      toast.error(t("RESPONSE.error"));
      return;
    }

    const honeypotValue =
      typeof document !== "undefined"
        ? (document.querySelector("input[name='honeypot']") as HTMLInputElement)
            ?.value
        : "";

    if (honeypotValue && honeypotValue.trim() !== "") {
      console.warn("Spam detected, honeypot triggered.");
      return;
    }

    startTransition(async () => {
      try {
        const payload = {
          ...formData,
          csrf_token: csrfToken,
          captcha_token: captchaToken,
          honeypot:
            (
              document.querySelector(
                "input[name='honeypot']"
              ) as HTMLInputElement
            )?.value ?? "",
        };

        const response = await fetch("/api/pmb", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        const result = await response.json();

        if (response.ok && result.success) {
          toast.success("Formulir berhasil dikirim!");
          resetForm();
          setCurrentStep(0);
          setCaptchaToken(null);
          recaptchaRef.current?.reset();
        } else {
          toast.error("Gagal mengirim formulir.");
          console.warn(result.errors || result.message);
        }
      } catch (error) {
        console.error(error);
        toast.error("Terjadi kesalahan saat mengirim formulir.");
      }
    });
  }, [
    formData,
    currentStep,
    validateStep,
    resetForm,
    t,
    captchaToken,
    csrfToken,
  ]);

  React.useEffect(() => {
    localStorage.removeItem("pmb-form");
    resetForm();
  }, [resetForm]);

  React.useEffect(() => {
    const ids = assessments.map((q) => q.id.toString());
    setAssessmentQuestionIds(ids);
  }, [assessments, setAssessmentQuestionIds]);
  return (
    <div className="flex flex-col gap-10">
      <Input
        type="text"
        name="honeypot"
        autoComplete="off"
        className="hidden"
        tabIndex={-1}
      />
      <input type="hidden" name="csrf_token" value={csrfToken} />
      <input type="hidden" name="captcha_token" value={captchaToken || ""} />
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
            // disabled={currentStep === 0}
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

export default PMBStepper;
