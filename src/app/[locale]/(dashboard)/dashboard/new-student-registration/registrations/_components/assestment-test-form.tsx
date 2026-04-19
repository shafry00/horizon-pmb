"use client";

import RequiredIcon from "@/components/icons/required-icon";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

import { getFieldError, getInputValue } from "@/lib/utils";
import {
  TActionResult,
  TAssessmentQuestion,
  TNewStudentRegistrationDetail,
} from "@/types";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import * as React from "react";
import { updateAssessmentAnswersById } from "../actions";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface IAssestmentTestFormProps {
  registration: TNewStudentRegistrationDetail;
  locale: string;
  assessments: TAssessmentQuestion[];
  functionType?: string;
}

const AssestmentTestForm: React.FC<IAssestmentTestFormProps> = (props) => {
  const { registration, assessments, functionType = "edit" } = props;
  const t = useTranslations(
    "PAGE.DASHBOARD.REGISTRATION-PAGE.EDIT-PAGE.SECTION.FORM-SECTION.FORM"
  );

  const isDisabled = functionType === "detail";

  const initialState: TActionResult = {
    success: false,
    message: "",
    errors: {},
    inputValues: {},
  };

  const [state, formAction, isPending] = React.useActionState(
    async (
      _prevState: TActionResult,
      formData: FormData
    ): Promise<TActionResult> => {
      return await updateAssessmentAnswersById(registration.id, formData);
    },
    initialState
  );
  const formRef = React.useRef<HTMLFormElement>(null);
  const [isDirty, setIsDirty] = React.useState(false);

  React.useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (isDirty) {
        event.preventDefault();
        event.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isDirty]);

  React.useEffect(() => {
    if (state.success) {
      toast.success(t("RESPONSE.success"), {
        style: {
          backgroundColor: "#34D399",
          border: "1px solid #34D399",
          color: "#ffffff",
          fontWeight: "bold",
        },
      });
      setIsDirty(false);
      formRef.current?.reset();
    } else if (state.message) {
      toast.error(state.message || t("RESPONSE.error"), {
        style: {
          backgroundColor: "#FECACA",
          border: "1px solid #FCA5A5",
          color: "#7F1D1D",
          fontWeight: "bold",
        },
      });
    }
  }, [state, t]);

  return (
    <form ref={formRef} action={isDisabled ? undefined : formAction}>
      <Card>
        <CardHeader>
          <CardTitle> {t("ASSESSMENT-FORM.title")}</CardTitle>
          <CardDescription>{t("ASSESSMENT-FORM.description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-2 lg:gap-4">
            {assessments.map((assessment) => {
              const existingAnswer = registration.assessmentAnswers?.find(
                (ans) => ans.questionId === Number(assessment.id)
              );

              return (
                <div key={assessment.id} className="flex flex-col gap-1">
                  <div className="flex flex-col gap-2 lg:gap-4">
                    <Label
                      className={`${
                        getFieldError(state, "studyProgramId")
                          ? "secondary-label-error"
                          : "secondary-label"
                      }`}
                    >
                      {assessment.question}
                      <RequiredIcon />
                    </Label>
                    <Select
                      name={`assessment-${assessment.id}`}
                      defaultValue={
                        getInputValue(state, `assessment-${assessment.id}`) ||
                        existingAnswer?.selectedOption ||
                        ""
                      }
                      onValueChange={() => !isDisabled && setIsDirty(true)}
                      disabled={isDisabled}
                    >
                      <SelectTrigger
                        className={
                          getFieldError(state, "studyProgramId")
                            ? "secondary-input-error"
                            : "secondary-input"
                        }
                      >
                        <SelectValue
                          placeholder={t(
                            "STUDENT-INFORMATION-FORM.FIELD.FIELD-1.placeholder"
                          )}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A">{assessment.optionA}</SelectItem>
                        <SelectItem value="B">{assessment.optionB}</SelectItem>
                        <SelectItem value="C">{assessment.optionC}</SelectItem>
                        <SelectItem value="D">{assessment.optionD}</SelectItem>
                        <SelectItem value="E">{assessment.optionE}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {getFieldError(state, "studyProgramId") && (
                    <p className="text-red-500 text-sm">
                      {getFieldError(state, "studyProgramId")}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
        {isDisabled ? null : (
          <CardFooter>
            <div className="flex items-center w-full justify-end gap-2">
              <Button
                disabled={isPending}
                className={`cursor-pointer text-primary-foreground capitalize w-fit rounded-[8px] bg-primary border-primary border flex items-center justify-center h-full gap-4 py-[6px] pr-[6px] ${
                  isPending ? "pl-[6px]" : "pl-4"
                }`}
              >
                {isPending ? (
                  <Spinner className="text-white" />
                ) : (
                  <>
                    {t("BUTTON.SUBMIT")}
                    <span className="w-9 aspect-square flex items-center justify-center bg-primary-foreground rounded">
                      <ArrowRight className="size-6 text-primary" />
                    </span>
                  </>
                )}
              </Button>
            </div>
          </CardFooter>
        )}
      </Card>
    </form>
  );
};

export default AssestmentTestForm;
