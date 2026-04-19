import { create } from "zustand";
import { persist } from "zustand/middleware";
import { z } from "zod";
import {
  assestmentAnswerSchema,
  createAssessmentAnswerSchema,
  parentInformationSchema,
  studentInformationSchema,
} from "@/lib/schema";

export const formSchema = z.object({
  studentInformation: studentInformationSchema,
  parentInformation: parentInformationSchema,
  assessmentAnswer: assestmentAnswerSchema,
});

export type TStudentInformation = z.infer<typeof studentInformationSchema>;
export type TParentInformation = z.infer<typeof parentInformationSchema>;
export type TAssessmentAnswer = z.infer<typeof assestmentAnswerSchema>;
export type FormData = z.infer<typeof formSchema>;

interface IFormState {
  formData: FormData;
  assessmentQuestionIds: string[];
  updateStudentInformation: (data: Partial<TStudentInformation>) => void;
  updateParentInformation: (data: Partial<TParentInformation>) => void;
  updateAssessmentAnswer: (data: Partial<TAssessmentAnswer>) => void;
  setAssessmentQuestionIds: (ids: string[]) => void;
  validateStep: (step: number) => {
    valid: boolean;
    errors?: Record<string, string>;
  };
  resetForm: () => void;
}

const initialState: {
  formData: FormData;
  assessmentQuestionIds: string[];
} = {
  formData: {
    studentInformation: {
      studyProgramId: 0,
      fullName: "",
      phoneNumber: "",
      instagramUsername: "",
      placeOfBirth: "",
      dateOfBirth: new Date(),
      gender: "",
      religion: "",
      domicileAddress: "",
      province: "",
      village: "",
      subDistrict: "",
      districtOrCity: "",
      institutionName: "",
      graduationYear: "",
      maritalStatus: "",
      employmentStatus: "",
    },
    parentInformation: {
      fatherName: "",
      fatherOccupation: "",
      fatherContact: "",
      motherName: "",
      motherOccupation: "",
      motherContact: "",
      sourceInfoOfHorizonU: "",
      reasonChooseHorizonU: "",
      ambassadorName: "",
      scholarshipLetter: null,
    },
    assessmentAnswer: {
      answer: {},
    },
  },
  assessmentQuestionIds: [],
};

export const usePMBStore = create<IFormState>()(
  persist(
    (set, get) => ({
      ...initialState,

      setAssessmentQuestionIds: (ids) =>
        set(() => ({
          assessmentQuestionIds: ids,
        })),
      updateStudentInformation: (data) =>
        set((state) => ({
          formData: {
            ...state.formData,
            studentInformation: {
              ...state.formData.studentInformation,
              ...data,
            },
          },
        })),

      updateParentInformation: (data) =>
        set((state) => ({
          formData: {
            ...state.formData,
            parentInformation: { ...state.formData.parentInformation, ...data },
          },
        })),

      updateAssessmentAnswer: (data) =>
        set((state) => ({
          formData: {
            ...state.formData,
            assessmentAnswer: {
              answer: data.answer ?? {},
            },
          },
        })),

      validateStep: (step) => {
        const { formData } = get();

        try {
          if (step === 0) {
            studentInformationSchema.parse(formData.studentInformation);
            return { valid: true };
          } else if (step === 1) {
            parentInformationSchema.parse(formData.parentInformation);
            return { valid: true };
          } else if (step === 2) {
            const assessmentKeys = Object.keys(
              formData.assessmentAnswer.answer
            );

            const expectedQuestionIds = ["1", "2", "3"];
            if (assessmentKeys.length !== expectedQuestionIds.length) {
              return {
                valid: false,
                errors: {
                  _form: "Semua soal wajib dijawab.",
                },
              };
            }

            const schema = createAssessmentAnswerSchema(expectedQuestionIds);
            schema.parse(formData.assessmentAnswer);

            return { valid: true };
          }

          return { valid: false, errors: { _form: "Invalid step" } };
        } catch (error) {
          if (error instanceof z.ZodError) {
            const errors: Record<string, string> = {};
            error.errors.forEach((err) => {
              if (err.path) {
                errors[err.path.join(".")] = err.message;
              }
            });
            return { valid: false, errors };
          }
          return { valid: false, errors: { _form: "Validation failed" } };
        }
      },

      resetForm: () => set(initialState),
    }),
    {
      name: "pmb-form",
    }
  )
);
