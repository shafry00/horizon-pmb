"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  assestmentAnswerSchema,
  createAssessmentAnswerSchema,
} from "@/lib/schema";
import { usePMBStore } from "@/stores/use-pmb-store";
import { TAssessmentQuestion } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type FormData = z.infer<typeof assestmentAnswerSchema>;

interface IAssessmentForm {
  assessments: TAssessmentQuestion[];
}

const AssessmentForm: React.FC<IAssessmentForm> = (props) => {
  const { assessments } = props;
  const t = useTranslations(
    "PAGE.PMB-PAGE.SECTION.FORM-SECTION.FORM.ASSESSMENT-FORM"
  );
  const { formData, updateAssessmentAnswer } = usePMBStore();

  const questionIds = assessments.map((q) => q.id.toString());

  const form = useForm<FormData>({
    resolver: zodResolver(createAssessmentAnswerSchema(questionIds)),
    defaultValues: {},
    mode: "onBlur",
  });

  const handleFieldChange = (questionId: string, selected: string) => {
    updateAssessmentAnswer({
      answer: {
        ...formData.assessmentAnswer.answer,
        [questionId]: selected as "A" | "B" | "C" | "D" | "E",
      },
    });

    form.setValue(
      `answer.${questionId}`,
      selected as "A" | "B" | "C" | "D" | "E",
      {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      }
    );
  };

  return (
    <Form {...form}>
      <div className="flex flex-col gap-7 md:gap-[31px] lg:gap-[34px] xl:ga-[37px] 2xl:gap-10">
        <div className="grid grid-cols-1 gap-4 md:gap-[19px] lg:gap-[22px] xl:gap-[25px] 2xl:gap-7">
          {assessments.map((assessment) => (
            <FormField
              key={assessment.id}
              control={form.control}
              name={`answer.${assessment.id}` as const}
              render={({}) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="main-label">
                    {assessment.question} (*)
                  </FormLabel>
                  <Select
                    value={
                      formData.assessmentAnswer.answer?.[assessment.id] ?? ""
                    }
                    onValueChange={(val) =>
                      handleFieldChange(assessment.id.toString(), val)
                    }
                  >
                    <FormControl className="mt-2 lg:mt-4">
                      <SelectTrigger className="main-input">
                        <SelectValue placeholder={t("FIELD.placeholder")} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="A">{assessment.optionA}</SelectItem>
                      <SelectItem value="B">{assessment.optionB}</SelectItem>
                      <SelectItem value="C">{assessment.optionC}</SelectItem>
                      <SelectItem value="D">{assessment.optionD}</SelectItem>
                      <SelectItem value="E">{assessment.optionE}</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>
      </div>
    </Form>
  );
};

export default AssessmentForm;
