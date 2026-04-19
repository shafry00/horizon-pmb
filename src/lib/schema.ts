import { z } from "zod";

const currentYear = new Date().getFullYear();

export const consultationSchema = z.object({
  fullName: z
    .string({ required_error: "Silakan isi nama Anda." })
    .min(3, { message: "Nama minimal terdiri dari 3 karakter." }),

  email: z
    .string({ required_error: "Silakan isi email Anda." })
    .email({ message: "Format email yang Anda masukkan belum benar." }),

  phoneNumber: z
    .string({ required_error: "Silakan isi nomor telepon Anda." })
    .min(10, { message: "Nomor telepon minimal 10 digit." }),

  instagramUsername: z
    .string()
    .transform((val) => (val?.trim() === "" ? undefined : val))
    .optional()
    .refine((val) => !val || val.length >= 2, {
      message: "Akun Instagram tidak valid atau terlalu pendek.",
    }),

  relationshipWithRegistrant: z
    .string({ required_error: "Silakan pilih hubungan Anda dengan registran." })
    .min(2, { message: "Hubungan dengan registran belum diisi dengan benar." }),
});

export const scholarshipFormSchema = z.object({
  fullName: z
    .string({ required_error: "Nama wajib diisi" })
    .min(3, { message: "Nama harus minimal 3 karakter" }),
  phoneNumber: z
    .string({ required_error: "Silakan isi nomor telepon Anda." })
    .min(10, { message: "Nomor telepon minimal 10 digit." }),
  email: z
    .string({ required_error: "Email wajib diisi" })
    .email({ message: "Format email tidak valid" }),
  instagramUsername: z
    .string()
    .transform((val) => val.trim())
    .refine((val) => val.length === 0 || val.length >= 2, {
      message: "Akun Instagram minimal 2 karakter jika diisi",
    })
    .optional(),
  institutionName: z
    .string({ required_error: "Institusi wajib diisi" })
    .min(2, { message: "Institusi tidak valid" }),
  classOrMajor: z
    .string({ required_error: "Jurusan wajib diisi" })
    .min(2, { message: "Jurusan tidak valid" }),
  birthDate: z
    .string({ required_error: "Date of birth is required" })
    .min(8, { message: "Invalid date format" }),
  province: z
    .string({ required_error: "Province is required" })
    .trim()
    .min(2, { message: "Province must be at least 2 characters" }),
  districtOrCity: z
    .string({ required_error: "City or regency is required" })
    .trim()
    .min(2, { message: "City or regency must be at least 2 characters" }),
  village: z
    .string({ required_error: "Village is required" })
    .trim()
    .min(2, { message: "Village must be at least 2 characters" }),
  subDistrict: z
    .string({ required_error: "Subdistrict is required" })
    .trim()
    .min(2, { message: "Subdistrict must be at least 2 characters" }),
  fullAddress: z
    .string({ required_error: "Home address is required" })
    .min(5, { message: "Home address must be at least 5 characters" }),
  fatherContact: z
    .string({ required_error: "Father's phone or WhatsApp number is required" })
    .min(10, { message: "Father's contact number is too short" })
    .regex(/^\+?\d+$/, {
      message: "Only digits and optional + are allowed",
    }),
  motherContact: z
    .string({ required_error: "Mother's phone or WhatsApp number is required" })
    .min(10, { message: "Mother's contact number is too short" }),
  studyProgramId: z
    .string({ required_error: "Study program is required" })
    .min(1, { message: "Invalid study program" }),
  currentStatus: z
    .string({ required_error: "Current status is required" })
    .min(1, { message: "Invalid status" }),
});

export const additionalInformationFormSchema = z.object({
  currentProvince: z
    .string({ required_error: "Your current province is required" })
    .min(1, { message: "Province is required" })
    .refine((val) => val !== "undefined", {
      message: "Please select a valid province",
    }),

  totalFamilyMembers: z
    .string({ required_error: "Total number of family members is required" })
    .min(1, { message: "Please enter a valid number" }),

  hasFamilySavings: z.string({
    required_error: "Please select if the head of the family has savings",
  }),

  houseFloorMaterial: z.string({
    required_error: "Please specify the floor material of your house",
  }),

  consumedMeatLastWeek: z.string({
    required_error: "Please answer whether you consumed meat last week",
  }),

  consumedFriedRiceLastWeek: z.string({
    required_error:
      "Please answer whether you consumed fried rice or ready-to-eat rice last week",
  }),

  boughtLaundrySuppliesLastMonth: z.string({
    required_error:
      "Please answer whether your family bought laundry supplies last month",
  }),

  boughtFuelLastMonth: z.string({
    required_error:
      "Please answer whether your family bought fuel or gasoline last month",
  }),

  hasRefrigerator: z.string({
    required_error: "Please answer whether you own a refrigerator",
  }),

  hasCar: z.string({ required_error: "Please answer whether you own a car" }),
});

export const scholarshipRegisterFormSchema = z.object({
  scholarshipInfo: scholarshipFormSchema,
  additionalInfo: additionalInformationFormSchema,
});

export const reRegisterFormSchema = z.object({
  fullName: z
    .string({ required_error: "Nama wajib diisi" })
    .min(3, { message: "Nama harus minimal 3 karakter" }),
  phoneNumber: z
    .string({ required_error: "Nomor telepon wajib diisi" })
    .min(10, { message: "Nomor telepon terlalu pendek" })
    .regex(/^\+?\d+$/, {
      message: "Only digits and optional + are allowed",
    }),
  email: z
    .string({ required_error: "Email wajib diisi" })
    .email({ message: "Format email tidak valid" }),
  studyProgramId: z.coerce
    .number({
      required_error: "Program studi wajib dipilih",
      invalid_type_error: "Program studi harus berupa angka",
    })
    .int({ message: "ID program studi tidak valid" }),
  institutionName: z
    .string({ required_error: "Institusi wajib diisi" })
    .min(2, { message: "Institusi tidak valid" }),
  scholarshipLetter: z
    .union([
      z.string(),
      z
        .instanceof(File)
        .refine(
          (file) =>
            [
              "application/pdf",
              "application/msword",
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            ].includes(file.type),
          {
            message: "Hanya file PDF, DOC, atau DOCX yang diperbolehkan.",
          }
        ),
    ])
    .optional()
    .nullable(),
});

export const studentInformationSchema = z.object({
  studyProgramId: z
    .number({ required_error: "Study program is required" })
    .int({ message: "Invalid study program" }),
  fullName: z
    .string({ required_error: "Full name is required" })
    .min(3, { message: "Full name must be at least 3 characters" }),
  phoneNumber: z
    .string({ required_error: "Nomor telepon wajib diisi" })
    .min(10, { message: "Nomor telepon terlalu pendek" })
    .regex(/^\+?\d+$/, {
      message: "Only digits and optional + are allowed",
    }),
  instagramUsername: z
    .string()
    .min(2, { message: "Instagram username must be at least 2 characters" })
    .optional()
    .or(z.literal("")),
  placeOfBirth: z
    .string({ required_error: "Place of birth is required" })
    .min(2, { message: "Place of birth must be at least 2 characters" }),
  dateOfBirth: z
    .date({
      required_error: "Date of birth is required",
      invalid_type_error: "Date of birth must be a valid date",
    })
    .max(new Date(), { message: "Date of birth cannot be in the future" }),
  gender: z
    .string({ required_error: "Gender is required" })
    .min(2, { message: "Gender must be at least 2 characters" }),
  religion: z
    .string({ required_error: "Religion is required" })
    .min(2, { message: "Religion must be at least 2 characters" }),
  domicileAddress: z
    .string({ required_error: "Domicile address is required" })
    .min(2, { message: "Domicile address must be at least 2 characters" }),
  province: z
    .string({ required_error: "Province is required" })
    .min(2, { message: "Province must be at least 2 characters" }),
  districtOrCity: z
    .string({ required_error: "City or regency is required" })
    .min(2, { message: "City or regency must be at least 2 characters" }),
  village: z
    .string({ required_error: "Village is required" })
    .min(2, { message: "Village must be at least 2 characters" }),
  subDistrict: z
    .string({ required_error: "Subdistrict is required" })
    .min(2, { message: "Subdistrict must be at least 2 characters" }),
  institutionName: z
    .string({ required_error: "Institution name is required" })
    .min(2, { message: "Institution name must be at least 2 characters" }),
  graduationYear: z
    .string({ required_error: "Graduation year is required" })
    .regex(/^\d{4}$/, { message: "Graduation year must be a 4-digit number" })
    .refine((val) => parseInt(val, 10) <= currentYear, {
      message: `Graduation year must not be in the future (max ${currentYear})`,
    }),
  maritalStatus: z
    .string({ required_error: "Marital status is required" })
    .min(2, { message: "Marital status must be at least 2 characters" }),
  employmentStatus: z
    .string({ required_error: "Employment status is required" })
    .min(1, { message: "Employment status must be at least 1 characters" }),
});

export const parentInformationSchema = z.object({
  fatherName: z
    .string({ required_error: "Name of father is required" })
    .min(2, { message: "Name of father must be at least 2 characters" }),
  fatherOccupation: z
    .string({ required_error: "Occupation of father is required" })
    .min(2, { message: "Occupation of father must be at least 2 characters" }),
  fatherContact: z
    .string({ required_error: "Contact number of father is required" })
    .min(10, {
      message: "Contact number of father must be at least 10 characters",
    }),
  motherName: z
    .string({ required_error: "Name of mother is required" })
    .min(2, { message: "Name of mother must be at least 2 characters" }),
  motherOccupation: z
    .string({ required_error: "Occupation of mother is required" })
    .min(2, { message: "Occupation of mother must be at least 2 characters" }),
  motherContact: z
    .string({ required_error: "Contact number of mother is required" })
    .min(10, {
      message: "Contact number of mother must be at least 10 characters",
    }),
  sourceInfoOfHorizonU: z
    .string({ required_error: "Source information is required" })
    .min(2, { message: "Source information must be at least 2 characters" }),
  reasonChooseHorizonU: z
    .string({ required_error: "Reason to choose Horizon U is required" })
    .min(2, {
      message: "Reason to choose Horizon U must be at least 2 characters",
    }),
  ambassadorName: z
    .string()
    .trim()
    .transform((val) => (val === "" ? undefined : val))
    .optional()
    .nullable()
    .refine((val) => val === undefined || val === null || val.length >= 2, {
      message: "Ambassador name must be at least 2 characters",
    }),
  scholarshipLetter: z.string().optional().nullable(),
});

export const assestmentAnswerSchema = z.object({
  answer: z.record(z.string(), z.enum(["A", "B", "C", "D", "E"])),
});

export const createAssessmentAnswerSchema = (questionIds: string[]) =>
  z.object({
    answer: z.object(
      Object.fromEntries(
        questionIds.map((id) => [id, z.enum(["A", "B", "C", "D", "E"])])
      )
    ),
  });

export const newStudentRegistrationSchema = z.object({
  studentInformation: studentInformationSchema,
  parentInformation: parentInformationSchema,
  assestment: assestmentAnswerSchema,
});

export const signInSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Email is not valid" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(5, { message: "Password must be at least 5 characters" }),
});

export const RoleEnum = z.enum(["USER", "ADMIN", "SUPER_ADMIN"]);

export const baseUserSchema = z.object({
  id: z.string().uuid({
    message: "ID must be a valid UUID.",
  }),
  name: z.string({
    required_error: "Name is required.",
    invalid_type_error: "Name must be a string.",
  }),
  email: z
    .string({
      required_error: "Email is required.",
      invalid_type_error: "Email must be a string.",
    })
    .email({
      message: "Invalid email format.",
    }),
  password: z
    .string({
      required_error: "Password is required.",
      invalid_type_error: "Password must be a string.",
    })
    .min(6, {
      message: "Password must be at least 6 characters.",
    }),
  role: RoleEnum.default("USER"),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const createUserSchema = baseUserSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateUserSchema = baseUserSchema
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  })
  .partial({ password: true });
