import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  scholarshipRegisterFormSchema,
  additionalInformationFormSchema,
  scholarshipFormSchema,
} from "@/lib/schema";
import { z } from "zod";

type TScholarshipFormData = z.infer<typeof scholarshipFormSchema>;
type TAdditionalFormData = z.infer<typeof additionalInformationFormSchema>;

type TFormData = z.infer<typeof scholarshipRegisterFormSchema>;

interface IFormState {
  formData: TFormData;
  updateScholarshipInfo: (data: Partial<TScholarshipFormData>) => void;
  updateAdditionalInformationInfo: (data: Partial<TAdditionalFormData>) => void;
  validateStep: (step: number) => {
    valid: boolean;
    errors?: Record<string, string>;
  };
  resetForm: () => void;
  // isFormDirty: boolean;
  // setFormDirty: (isDirty: boolean) => void;
  // setStepValidation: (step: number, isValid: boolean) => void;
}

const initialState: {
  formData: TFormData;
} = {
  formData: {
    scholarshipInfo: {
      fullName: "",
      phoneNumber: "",
      email: "",
      instagramUsername: "",
      institutionName: "",
      classOrMajor: "",
      birthDate: "",
      province: "",
      districtOrCity: "",
      subDistrict: "",
      village: "",
      fullAddress: "",
      motherContact: "",
      fatherContact: "",
      studyProgramId: "",
      currentStatus: "",
    },
    additionalInfo: {
      currentProvince: "",
      totalFamilyMembers: "",
      hasFamilySavings: "",
      houseFloorMaterial: "",
      consumedMeatLastWeek: "",
      consumedFriedRiceLastWeek: "",
      boughtLaundrySuppliesLastMonth: "",
      boughtFuelLastMonth: "",
      hasRefrigerator: "",
      hasCar: "",
    },
  },
};

export const useScholarshipFormStore = create<IFormState>()(
  persist(
    (set, get) => ({
      ...initialState,

      updateScholarshipInfo: (data: Partial<TScholarshipFormData>) =>
        set((state) => ({
          formData: {
            ...state.formData,
            scholarshipInfo: {
              ...state.formData.scholarshipInfo,
              ...data,
            },
          },
        })),

      updateAdditionalInformationInfo: (data: Partial<TAdditionalFormData>) =>
        set((state) => ({
          formData: {
            ...state.formData,
            additionalInfo: {
              ...state.formData.additionalInfo,
              ...data,
            },
          },
        })),

      validateStep: (step) => {
        const { formData } = get();

        try {
          if (step === 0) {
            scholarshipFormSchema.parse(formData.scholarshipInfo);
            return { valid: true };
          } else if (step === 1) {
            additionalInformationFormSchema.parse(formData.additionalInfo);
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
      name: "scholarship-form",
    }
  )
);
