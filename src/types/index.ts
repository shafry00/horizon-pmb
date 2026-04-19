export type TStudyProgram = {
  id: number;
  image?: string;
  name: string;
  description?: string;
};

export type TProvince = {
  id: string;
  name: string;
};

export type TRegency = {
  id: string;
  province_id: string;
  name: string;
};

export type TDistrict = {
  id: string;
  regency_id: string;
  name: string;
};

export type TVillage = {
  id: string;
  district_id: string;
  name: string;
};

export type TAssessmentQuestion = {
  id: number;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  optionE: string;
};

export type TAssessmentQuestionResponse = {
  success: boolean;
  message: string;
  data: TAssessmentQuestion[];
};

export type TStudyProgramResponse = {
  success: boolean;
  message: string;
  data: TStudyProgram[];
};

export type StudyProgram = {
  id: number;
  name: string;
};

// types/action-result.ts

// export type ErrorCode = "VALIDATION" | "500" | "DB_ERR" | "TIMEOUT" | "UNKNOWN";

// export type TActionResult<T = unknown> = {
//   success: boolean;
//   message: string;
//   data?: T;
//   inputValues?: Record<string, FormDataEntryValue | null>;
//   errors?: Record<string, string[]>;
//   errorCode?: ErrorCode;
// };

export type TActionResult<TData = unknown> =
  | {
      success: true;
      message: string;
      data?: TData;
      inputValues?: Record<string, unknown>;
    }
  | {
      success: false;
      message: string;
      errorCode?: number;
      errors?: Record<string, string[]>;
      inputValues?: Record<string, unknown>;
    };

export type TParams = {
  id?: string;
  locale: string;
};

export type TConsultationDetail = {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  instagramUsername: string | null;
  relationshipWithRegistrant: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TConsultation = {
  id: number;
  fullName: string;
  email: string;
  relationshipWithRegistrant: string;
  createdAt: Date;
};

export type TConsultationResponse = {
  success: boolean;
  message: string;
  data: TConsultation[] | null;
};

export type TConsultationDetailResponse = {
  success: boolean;
  message: string;
  data: TConsultationDetail | null;
};

export type TReRegistrationDetail = {
  id: number;
  fullName: string;
  phoneNumber: string;
  email: string;
  studyProgramId: number;
  institutionName: string;
  scholarshipLetter: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type TReRegistrationDetailResponse = {
  success: boolean;
  message: string;
  data: TReRegistrationDetail | null;
};

export type TApiResponse<T> = {
  status: "success" | "error";
  message: string;
  data: T | null;
  error: string | null;
};

export type TServerResponse<T> = {
  status: "success" | "error";
  message: string;
  data: T | null;
  error: string | null;
};

export type TScholarship = {
  id: number;
  fullName: string;
  email: string;
  institutionName: string;
  studyProgram: {
    name: string;
  };
  createdAt: Date;
};

export type TScholarshipResponse = {
  success: boolean;
  message: string;
  data: TScholarship[] | null;
  error: string | null;
};

export type TScholarshipDetail = {
  id: number;
  fullName: string;
  phoneNumber: string;
  email: string;
  instagramUsername: string | null;
  institutionName: string;
  classOrMajor: string;
  birthDate: string;
  province: string;
  districtOrCity: string;
  subDistrict: string;
  village: string;
  fullAddress: string;
  fatherContact: string;
  motherContact: string;
  currentStatus: string;
  currentProvince: string;
  totalFamilyMembers: string;
  hasFamilySavings: string;
  houseFloorMaterial: string;
  consumedMeatLastWeek: string;
  consumedFriedRiceLastWeek: string;
  boughtLaundrySuppliesLastMonth: string;
  boughtFuelLastMonth: string;
  hasRefrigerator: string;
  hasCar: string;
  createdAt: Date;
  updatedAt: Date;
  studyProgramId: number;
  studyProgram: {
    name: string;
  };
};

export type TNewStudentRegistrationDetail = {
  id: number;
  studyProgramId: number;
  studyProgram?: {
    id: number;
    name: string;
  };

  fullName: string;
  phoneNumber: string;
  instagramUsername?: string | null;
  placeOfBirth: string;
  dateOfBirth: Date | string;
  gender: string;
  religion: string;
  domicileAddress: string;
  province: string;
  districtOrCity: string;
  subDistrict: string;
  village: string;
  institutionName: string;
  graduationYear: string;
  maritalStatus: string;
  employmentStatus: string;

  fatherName: string;
  fatherOccupation: string;
  fatherContact: string;
  motherName: string;
  motherOccupation: string;
  motherContact: string;
  sourceInfoOfHorizonU: string;
  reasonChooseHorizonU: string;
  ambassadorName?: string | null;
  scholarshipLetter?: string | null;

  assessmentAnswers?: {
    questionId: number;
    selectedOption: string;
  }[];

  createdAt: Date | string;
  updatedAt: Date | string;
};

export type TNewStudentRegistrationDetailResponse = {
  success: boolean;
  message: string;
  data: TNewStudentRegistrationDetail | null;
};

export type TNewStudentRegistration = {
  id: number;
  studyProgram: {
    name: string;
  };
  fullName: string;
  phoneNumber: string;
  scholarshipLetter?: string | null;
  createdAt: Date;
};

export type TNewStudentRegistrationResponse = {
  success: boolean;
  message: string;
  data: TNewStudentRegistration[];
};

export type TDataSummary = {
  pmb: number;
  reRegister: number;
  consultation: number;
  scholarship: number;
};

export type TDataSummaryResponse = {
  success: boolean;
  message: string;
  data: TDataSummary;
};

export type TResponseError = {
  code: number;
  message: string;
};
export type TResponseResult<T> = {
  success: boolean;
  message: string;
  data: T;
  error: TResponseError | null;
};

export type TReRegistration = {
  id: number;
  fullName: string;
  email: string;
  studyProgram: TStudyProgram;
  scholarshipLetter?: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type TUser = {
  id: string;
  name: string;
  email: string;
  role: "USER" | "ADMIN" | "SUPER_ADMIN";
  createdAt: string;
  updatedAt: string;
};

export type TUploadFile = {
  originalName: string;
  mimeType: string;
  size: number;
  filename: string;
  path: string;
  url: string;
};

export type TUploadFileResponse = {
  success: boolean;
  message: string;
  data: TUploadFile;
};

export type TDeleteFileResponse = {
  success: boolean;
  message: string;
};
