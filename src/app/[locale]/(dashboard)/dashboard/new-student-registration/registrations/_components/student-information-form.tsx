"use client";

import RequiredIcon from "@/components/icons/required-icon";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  EMPLOYMENT_STATUS_ITEMS,
  GENDER_ITEMS,
  MARITAL_STATUS_ITEMS,
  RELIGION_ITEMS,
} from "@/constants";
import {
  useDistricts,
  useProvinces,
  useRegencies,
  useVillages,
} from "@/features";
import {
  cn,
  getContentByLocale,
  getDefaultInputValue,
  getFieldError,
  getInputValue,
} from "@/lib/utils";
import {
  TActionResult,
  TNewStudentRegistrationDetail,
  TStudyProgram,
} from "@/types";
import { format, parse } from "date-fns";
import { ArrowRight, CalendarIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import * as React from "react";
import PhoneInput from "react-phone-number-input";
import { updateStudentInformationById } from "../actions";
import "react-phone-number-input/style.css";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

interface IStudentInformationFormProps {
  registration: TNewStudentRegistrationDetail;
  studyPrograms: TStudyProgram[];
  locale: string;
  functionType?: "edit" | "detail";
}

const StudentInformationForm: React.FC<IStudentInformationFormProps> = (
  props
) => {
  const { registration, studyPrograms, locale, functionType = "edit" } = props;
  const t = useTranslations(
    "PAGE.DASHBOARD.REGISTRATION-PAGE.EDIT-PAGE.SECTION.FORM-SECTION.FORM"
  );

  const isDisabled = functionType === "detail";

  const initialState = React.useMemo<TActionResult>(
    () => ({
      success: false,
      message: "",
      errors: {},
      inputValues: {
        ...registration,
      },
    }),
    [registration]
  );

  const [state, formAction, isPending] = React.useActionState(
    async (
      _prevState: TActionResult,
      formData: FormData
    ): Promise<TActionResult> => {
      return await updateStudentInformationById(registration.id, formData);
    },
    initialState
  );
  const formRef = React.useRef<HTMLFormElement>(null);
  const [isDirty, setIsDirty] = React.useState(false);

  const [phoneNumber, setPhoneNumber] = React.useState<string | undefined>(
    getInputValue(state, "phoneNumber") || registration.phoneNumber
  );

  const [provinceId, setProvinceId] = React.useState(
    registration.province || ""
  );
  const [regencyId, setRegencyId] = React.useState(
    registration.districtOrCity || ""
  );
  const [districtId, setDistrictId] = React.useState(
    registration.subDistrict || ""
  );
  const [villageId, setVillageId] = React.useState(registration.village || "");
  const birthDateValue =
    typeof registration.dateOfBirth === "string"
      ? parse(registration.dateOfBirth, "yyyy-MM-dd", new Date())
      : registration.dateOfBirth;

  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    birthDateValue
  );
  const {
    data: provinces,
    isLoading: isLoadingProvinces,
    error: isErrorProvinces,
  } = useProvinces();

  const {
    data: regencies,
    isLoading: isLoadingRegencies,
    error: isErrorRegencies,
  } = useRegencies(provinceId);

  const {
    data: districts,
    isLoading: isLoadingDistricts,
    error: isErrorDistricts,
  } = useDistricts(regencyId);

  const {
    data: villages,
    isLoading: isLoadingVillages,
    error: isErrorVillages,
  } = useVillages(districtId);

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
    if (state && state !== initialState) {
      if (state.success) {
        toast.success(t("STUDENT-INFORMATION-FORM.RESPONSE.success"), {
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
        toast.error(
          state.message || t("STUDENT-INFORMATION-FORM.RESPONSE.error"),
          {
            style: {
              backgroundColor: "#FECACA",
              border: "1px solid #FCA5A5",
              color: "#7F1D1D",
              fontWeight: "bold",
            },
          }
        );
      }
    }
  }, [state, initialState, t]);

  return (
    <form ref={formRef} action={isDisabled ? undefined : formAction}>
      <Card>
        <CardHeader>
          <CardTitle> {t("STUDENT-INFORMATION-FORM.title")}</CardTitle>
          <CardDescription>
            {t("STUDENT-INFORMATION-FORM.description")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4">
            {/* Study Program, Full Name, Phone Number Field */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-4">
              {/* Study Program Field */}
              <div className="flex flex-col gap-1">
                <div className="flex flex-col gap-2 lg:gap-4">
                  <Label
                    className={
                      getFieldError(state, "studyProgramId")
                        ? "secondary-label-error"
                        : "secondary-label"
                    }
                  >
                    {t("STUDENT-INFORMATION-FORM.FIELD.FIELD-1.label")}{" "}
                    <RequiredIcon />
                  </Label>
                  <Select
                    name="studyProgramId"
                    defaultValue={getDefaultInputValue(
                      state,
                      initialState,
                      "studyProgramId"
                    ).toString()}
                    onOpenChange={() => !isDisabled && setIsDirty(true)}
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
                      {studyPrograms.map((studyProgram) => (
                        <SelectItem
                          key={`${studyProgram.id}-${studyProgram.name}`}
                          value={studyProgram.id.toString()}
                        >
                          {studyProgram.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {getFieldError(state, "studyProgramId") && (
                  <p className="text-red-500 text-sm">
                    {getFieldError(state, "studyProgramId")}
                  </p>
                )}
              </div>

              {/* Full Name Field */}
              <div className="flex flex-col gap-1">
                <div className="flex flex-col gap-2 lg:gap-4">
                  <Label
                    className={
                      getFieldError(state, "fullName")
                        ? "secondary-label-error"
                        : "secondary-label"
                    }
                  >
                    {t("STUDENT-INFORMATION-FORM.FIELD.FIELD-2.label")}{" "}
                    <RequiredIcon />
                  </Label>

                  <Input
                    name="fullName"
                    id="fullName"
                    className={
                      getFieldError(state, "fullName")
                        ? "secondary-input-error"
                        : "secondary-input"
                    }
                    placeholder={t(
                      "STUDENT-INFORMATION-FORM.FIELD.FIELD-2.placeholder"
                    )}
                    defaultValue={getDefaultInputValue(
                      state,
                      initialState,
                      "fullName"
                    )}
                    onChange={() => !isDisabled && setIsDirty(true)}
                    disabled={isDisabled}
                  />
                </div>
                {getFieldError(state, "fullName") && (
                  <p className="text-red-500 text-sm">
                    {getFieldError(state, "fullName")}
                  </p>
                )}
              </div>

              {/* Phone Number Field */}
              <div className="flex flex-col gap-1">
                <div className="flex flex-col gap-2 lg:gap-4">
                  <Label
                    className={
                      getFieldError(state, "phoneNumber")
                        ? "secondary-label-error"
                        : "secondary-label"
                    }
                  >
                    {t("STUDENT-INFORMATION-FORM.FIELD.FIELD-3.label")}{" "}
                    <RequiredIcon />
                  </Label>
                  <input
                    type="hidden"
                    name="phoneNumber"
                    value={phoneNumber || ""}
                  />
                  <PhoneInput
                    defaultCountry="ID"
                    international
                    countryCallingCodeEditable={false}
                    className={
                      getFieldError(state, "phoneNumber")
                        ? "secondary-input-error"
                        : "secondary-input"
                    }
                    value={phoneNumber}
                    onChange={(value) => {
                      setPhoneNumber(value);
                      if (!isDisabled) {
                        setIsDirty(true);
                      }
                    }}
                    disabled={isDisabled}
                  />
                </div>
                {getFieldError(state, "phoneNumber") && (
                  <p className="text-red-500 text-sm">
                    {getFieldError(state, "phoneNumber")}
                  </p>
                )}
              </div>
            </div>

            {/* Instagram Username, Place of Birth, Date of Birth Field */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Instagram Username Field */}
              <div className="flex flex-col gap-1">
                <div className="flex flex-col gap-2 lg:gap-4">
                  <Label
                    className={
                      getFieldError(state, "instagramUsername")
                        ? "secondary-label-error"
                        : "secondary-label"
                    }
                  >
                    {t("STUDENT-INFORMATION-FORM.FIELD.FIELD-4.label")}
                  </Label>

                  <Input
                    name="instagramUsername"
                    id="instagramUsername"
                    className={
                      getFieldError(state, "instagramUsername")
                        ? "secondary-input-error"
                        : "secondary-input"
                    }
                    placeholder={t(
                      "STUDENT-INFORMATION-FORM.FIELD.FIELD-4.placeholder"
                    )}
                    defaultValue={getDefaultInputValue(
                      state,
                      initialState,
                      "instagramUsername"
                    )}
                  />
                </div>
                {getFieldError(state, "instagramUsername") && (
                  <p className="text-red-500 text-sm">
                    {getFieldError(state, "instagramUsername")}
                  </p>
                )}
              </div>

              {/* Place of Birth Field */}
              <div className="flex flex-col gap-1">
                <div className="flex flex-col gap-2 lg:gap-4">
                  <Label
                    className={
                      getFieldError(state, "placeOfBirth")
                        ? "secondary-label-error"
                        : "secondary-label"
                    }
                  >
                    {t("STUDENT-INFORMATION-FORM.FIELD.FIELD-5.label")}{" "}
                    <RequiredIcon />
                  </Label>

                  <Input
                    name="placeOfBirth"
                    id="placeOfBirth"
                    className={
                      getFieldError(state, "placeOfBirth")
                        ? "secondary-input-error"
                        : "secondary-input"
                    }
                    placeholder={t(
                      "STUDENT-INFORMATION-FORM.FIELD.FIELD-5.placeholder"
                    )}
                    defaultValue={getDefaultInputValue(
                      state,
                      initialState,
                      "placeOfBirth"
                    )}
                    onChange={() => !isDisabled && setIsDirty(true)}
                    disabled={isDisabled}
                  />
                </div>
                {getFieldError(state, "placeOfBirth") && (
                  <p className="text-red-500 text-sm">
                    {getFieldError(state, "placeOfBirth")}
                  </p>
                )}
              </div>

              {/* Date of Birth Field */}
              <div className="flex flex-col gap-1">
                <div className="flex flex-col gap-2 lg:gap-4">
                  <Label
                    className={
                      getFieldError(state, "dateOfBirth")
                        ? "secondary-label-error"
                        : "secondary-label"
                    }
                  >
                    {t("STUDENT-INFORMATION-FORM.FIELD.FIELD-6.label")}{" "}
                    <RequiredIcon />
                  </Label>

                  <Popover>
                    <PopoverTrigger
                      asChild
                      className={
                        getFieldError(state, "dateOfBirth")
                          ? "secondary-input-error"
                          : "secondary-input"
                      }
                      disabled={isDisabled}
                    >
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] justify-start text-left font-normal",
                          !selectedDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate instanceof Date &&
                        !isNaN(selectedDate.getTime()) ? (
                          format(selectedDate, "dd-MM-yyyy")
                        ) : (
                          <span>Pilih tanggal</span>
                        )}
                      </Button>
                    </PopoverTrigger>

                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        initialFocus
                        disabled={isDisabled}
                      />
                    </PopoverContent>
                  </Popover>

                  <input
                    type="hidden"
                    name="dateOfBirth"
                    value={
                      selectedDate instanceof Date &&
                      !isNaN(selectedDate.getTime())
                        ? format(selectedDate, "yyyy-MM-dd")
                        : ""
                    }
                    onChange={() => {
                      if (isDisabled) return;
                      setIsDirty(true);
                    }}
                    disabled={isDisabled}
                  />
                </div>
                {getFieldError(state, "dateOfBirth") && (
                  <p className="text-red-500 text-sm">
                    {getFieldError(state, "dateOfBirth")}
                  </p>
                )}
              </div>
            </div>

            {/* Gender, Religion, Field */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Gender Field */}
              <div className="flex flex-col gap-1">
                <div className="flex flex-col gap-2 lg:gap-4">
                  <Label
                    className={
                      getFieldError(state, "gender")
                        ? "secondary-label-error"
                        : "secondary-label"
                    }
                  >
                    {t("STUDENT-INFORMATION-FORM.FIELD.FIELD-7.label")}{" "}
                    <RequiredIcon />
                  </Label>
                  <Select
                    name="gender"
                    defaultValue={getDefaultInputValue(
                      state,
                      initialState,
                      "gender"
                    )}
                    onValueChange={() => !isDisabled && setIsDirty(true)}
                    disabled={isDisabled}
                  >
                    <SelectTrigger
                      className={
                        getFieldError(state, "gender")
                          ? "secondary-input-error"
                          : "secondary-input"
                      }
                    >
                      <SelectValue
                        placeholder={t(
                          "STUDENT-INFORMATION-FORM.FIELD.FIELD-7.placeholder"
                        )}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {GENDER_ITEMS.map((gender) => (
                        <SelectItem
                          key={`${gender.id}-${gender.value}`}
                          value={gender.value}
                        >
                          {getContentByLocale({
                            locale,
                            enContent: gender.label_en,
                            idContent: gender.label_id,
                          })}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {getFieldError(state, "gender") && (
                  <p className="text-red-500 text-sm">
                    {getFieldError(state, "gender")}
                  </p>
                )}
              </div>

              {/* Religion Field */}
              <div className="flex flex-col gap-1">
                <div className="flex flex-col gap-2 lg:gap-4">
                  <Label
                    className={
                      getFieldError(state, "religion")
                        ? "secondary-label-error"
                        : "secondary-label"
                    }
                  >
                    {t("STUDENT-INFORMATION-FORM.FIELD.FIELD-8.label")}{" "}
                    <RequiredIcon />
                  </Label>
                  <Select
                    name="religion"
                    defaultValue={getDefaultInputValue(
                      state,
                      initialState,
                      "religion"
                    )}
                    onValueChange={() => !isDisabled && setIsDirty(true)}
                    disabled={isDisabled}
                  >
                    <SelectTrigger
                      className={
                        getFieldError(state, "religion")
                          ? "secondary-input-error"
                          : "secondary-input"
                      }
                    >
                      <SelectValue
                        placeholder={t(
                          "STUDENT-INFORMATION-FORM.FIELD.FIELD-8.placeholder"
                        )}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {RELIGION_ITEMS.map((religion) => (
                        <SelectItem
                          key={`${religion.id}-${religion.value}`}
                          value={religion.value}
                        >
                          {religion.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {getFieldError(state, "religion") && (
                  <p className="text-red-500 text-sm">
                    {getFieldError(state, "religion")}
                  </p>
                )}
              </div>

              {/* Domicile Address Field */}
              <div className="flex flex-col gap-1">
                <div className="flex flex-col gap-2 lg:gap-4">
                  <Label
                    className={
                      getFieldError(state, "domicileAddress")
                        ? "secondary-label-error"
                        : "secondary-label"
                    }
                  >
                    {t("STUDENT-INFORMATION-FORM.FIELD.FIELD-9.label")}{" "}
                    <RequiredIcon />
                  </Label>

                  <Textarea
                    name="domicileAddress"
                    id="domicileAddress"
                    className={
                      getFieldError(state, "domicileAddress")
                        ? "secondary-input-error"
                        : "secondary-input"
                    }
                    placeholder={t(
                      "STUDENT-INFORMATION-FORM.FIELD.FIELD-9.placeholder"
                    )}
                    defaultValue={getDefaultInputValue(
                      state,
                      initialState,
                      "domicileAddress"
                    )}
                    onChange={() => !isDisabled && setIsDirty(true)}
                    disabled={isDisabled}
                  />
                </div>
                {getFieldError(state, "domicileAddress") && (
                  <p className="text-red-500 text-sm">
                    {getFieldError(state, "domicileAddress")}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Province Field */}
              <div className="flex flex-col gap-1">
                <div className="flex flex-col gap-2 lg:gap-4">
                  <Label
                    className={
                      getFieldError(state, "province")
                        ? "secondary-label-error"
                        : "secondary-label"
                    }
                  >
                    {t("STUDENT-INFORMATION-FORM.FIELD.FIELD-10.label")}{" "}
                    <RequiredIcon />
                  </Label>
                  <Select
                    name="province"
                    value={provinceId}
                    onValueChange={(value) => {
                      if (isDisabled) return;
                      setProvinceId(value);
                      setRegencyId("");
                      setDistrictId("");
                      setVillageId("");
                      setIsDirty(true);
                    }}
                    disabled={isDisabled}
                  >
                    <SelectTrigger
                      className={
                        getFieldError(state, "province")
                          ? "secondary-input-error"
                          : "secondary-input"
                      }
                    >
                      <SelectValue
                        placeholder={t(
                          "STUDENT-INFORMATION-FORM.FIELD.FIELD-10.placeholder"
                        )}
                      />
                    </SelectTrigger>

                    <SelectContent className="max-h-72 overflow-y-auto">
                      {isLoadingProvinces && (
                        <div className="p-1 flex items-center justify-center">
                          <Spinner className="text-white" />
                        </div>
                      )}
                      {isErrorProvinces && (
                        <div className="p-1 flex items-center justify-center text-red-300">
                          Error loading provinces
                        </div>
                      )}
                      {!isLoadingProvinces &&
                        !isErrorProvinces &&
                        provinces?.map((provincy) => (
                          <SelectItem
                            key={`${provincy.id}-${provincy.name}`}
                            value={provincy.id}
                          >
                            {provincy.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <input type="hidden" name="province" value={provinceId} />
                </div>
                {getFieldError(state, "province") && (
                  <p className="text-red-500 text-sm">
                    {getFieldError(state, "province")}
                  </p>
                )}
              </div>

              {/* Regency Field */}
              <div className="flex flex-col gap-1">
                <div className="flex flex-col gap-2 lg:gap-4">
                  <Label
                    className={
                      getFieldError(state, "districtOrCity")
                        ? "secondary-label-error"
                        : "secondary-label"
                    }
                  >
                    {t("STUDENT-INFORMATION-FORM.FIELD.FIELD-11.label")}{" "}
                    <RequiredIcon />
                  </Label>
                  <Select
                    name="districtOrCity"
                    value={regencyId}
                    onValueChange={(value) => {
                      if (isDisabled) return;
                      setRegencyId(value);
                      setDistrictId("");
                      setVillageId("");
                      setIsDirty(true);
                    }}
                    disabled={!provinceId || isDisabled}
                  >
                    <SelectTrigger
                      className={
                        getFieldError(state, "districtOrCity")
                          ? "secondary-input-error"
                          : "secondary-input"
                      }
                    >
                      <SelectValue
                        placeholder={t(
                          "STUDENT-INFORMATION-FORM.FIELD.FIELD-11.placeholder"
                        )}
                      />
                    </SelectTrigger>

                    <SelectContent className="max-h-72 overflow-y-auto">
                      {isLoadingRegencies && (
                        <div className="p-1 flex items-center justify-center">
                          <Spinner className="text-white" />
                        </div>
                      )}
                      {isErrorRegencies && (
                        <div className="p-1 flex items-center justify-center text-red-300">
                          Error loading Regencies
                        </div>
                      )}
                      {!isLoadingRegencies &&
                        !isErrorRegencies &&
                        regencies?.map((regency) => (
                          <SelectItem
                            key={`${regency.id}-${regency.name}`}
                            value={regency.id}
                          >
                            {regency.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <input
                    type="hidden"
                    name="districtOrCity"
                    value={regencyId}
                  />
                </div>
                {getFieldError(state, "districtOrCity") && (
                  <p className="text-red-500 text-sm">
                    {getFieldError(state, "districtOrCity")}
                  </p>
                )}
              </div>
              {/* District Field */}
              <div className="flex flex-col gap-1">
                <div className="flex flex-col gap-2 lg:gap-4">
                  <Label
                    className={
                      getFieldError(state, "subDistrict")
                        ? "secondary-label-error"
                        : "secondary-label"
                    }
                  >
                    {t("STUDENT-INFORMATION-FORM.FIELD.FIELD-12.label")}{" "}
                    <RequiredIcon />
                  </Label>
                  <Select
                    name="subDistrict"
                    value={districtId}
                    onValueChange={(value) => {
                      if (isDisabled) return;
                      setDistrictId(value);
                      setVillageId("");
                      setIsDirty(true);
                    }}
                    disabled={!regencyId || isDisabled}
                  >
                    <SelectTrigger
                      className={
                        getFieldError(state, "subDistrict")
                          ? "secondary-input-error"
                          : "secondary-input"
                      }
                    >
                      <SelectValue
                        placeholder={t(
                          "STUDENT-INFORMATION-FORM.FIELD.FIELD-12.placeholder"
                        )}
                      />
                    </SelectTrigger>

                    <SelectContent className="max-h-72 overflow-y-auto">
                      {isLoadingDistricts && (
                        <div className="p-1 flex items-center justify-center">
                          <Spinner className="text-white" />
                        </div>
                      )}
                      {isErrorDistricts && (
                        <div className="p-1 flex items-center justify-center text-red-300">
                          Error loading Districts
                        </div>
                      )}
                      {!isLoadingDistricts &&
                        !isErrorDistricts &&
                        districts?.map((district) => (
                          <SelectItem
                            key={`${district.id}-${district.name}`}
                            value={district.id}
                          >
                            {district.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <input type="hidden" name="subDistrict" value={districtId} />
                </div>
                {getFieldError(state, "subDistrict") && (
                  <p className="text-red-500 text-sm">
                    {getFieldError(state, "subDistrict")}
                  </p>
                )}
              </div>
            </div>

            {/* Institution Name, Graduation Year Field*/}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Village Field */}
              <div className="flex flex-col gap-1">
                <div className="flex flex-col gap-2 lg:gap-4">
                  <Label
                    className={
                      getFieldError(state, "village")
                        ? "secondary-label-error"
                        : "secondary-label"
                    }
                  >
                    {t("STUDENT-INFORMATION-FORM.FIELD.FIELD-13.label")}{" "}
                    <RequiredIcon />
                  </Label>
                  <Select
                    name="village"
                    value={villageId}
                    defaultValue={villageId}
                    onValueChange={(value) => {
                      if (isDisabled) return;
                      setVillageId(value);
                      setIsDirty(true);
                    }}
                    disabled={!districtId || isDisabled}
                  >
                    <SelectTrigger
                      className={
                        getFieldError(state, "village")
                          ? "secondary-input-error"
                          : "secondary-input"
                      }
                      id="village"
                    >
                      <SelectValue
                        placeholder={t(
                          "STUDENT-INFORMATION-FORM.FIELD.FIELD-13.placeholder"
                        )}
                      />
                    </SelectTrigger>

                    <SelectContent className="max-h-72 overflow-y-auto">
                      {isLoadingVillages && (
                        <div className="p-1 flex items-center justify-center">
                          Loading...
                        </div>
                      )}
                      {isErrorVillages && (
                        <div className="p-1 flex items-center justify-center text-red-300">
                          Error loading Villages
                        </div>
                      )}
                      {!isLoadingVillages &&
                        !isErrorVillages &&
                        villages?.map((village) => (
                          <SelectItem
                            key={`${village.id}-${village.name}`}
                            value={village.id}
                          >
                            {village.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <input type="hidden" name="village" value={villageId} />
                </div>
                {getFieldError(state, "village") && (
                  <p className="text-red-500 text-sm">
                    {getFieldError(state, "village")}
                  </p>
                )}
              </div>

              {/* Institution Name Field*/}
              <div className="flex flex-col gap-1">
                <div className="flex flex-col gap-2 lg:gap-4">
                  <Label
                    className={
                      getFieldError(state, "institutionName")
                        ? "secondary-label-error"
                        : "secondary-label"
                    }
                  >
                    {t("STUDENT-INFORMATION-FORM.FIELD.FIELD-14.label")}{" "}
                    <RequiredIcon />
                  </Label>

                  <Textarea
                    name="institutionName"
                    id="institutionName"
                    className={
                      getFieldError(state, "institutionName")
                        ? "secondary-input-error"
                        : "secondary-input"
                    }
                    placeholder={t(
                      "STUDENT-INFORMATION-FORM.FIELD.FIELD-14.placeholder"
                    )}
                    defaultValue={getDefaultInputValue(
                      state,
                      initialState,
                      "institutionName"
                    )}
                    onChange={() => !isDisabled && setIsDirty(true)}
                    disabled={isDisabled}
                  />
                </div>
                {getFieldError(state, "fullName") && (
                  <p className="text-red-500 text-sm">
                    {getFieldError(state, "fullName")}
                  </p>
                )}
              </div>

              {/* Graduation Year Field*/}
              <div className="flex flex-col gap-1">
                <div className="flex flex-col gap-2 lg:gap-4">
                  <Label
                    className={
                      getFieldError(state, "graduationYear")
                        ? "secondary-label-error"
                        : "secondary-label"
                    }
                  >
                    {t("STUDENT-INFORMATION-FORM.FIELD.FIELD-15.label")}{" "}
                    <RequiredIcon />
                  </Label>

                  <Input
                    name="graduationYear"
                    id="graduationYear"
                    className={
                      getFieldError(state, "graduationYear")
                        ? "secondary-input-error"
                        : "secondary-input"
                    }
                    placeholder={t(
                      "STUDENT-INFORMATION-FORM.FIELD.FIELD-15.placeholder"
                    )}
                    defaultValue={getDefaultInputValue(
                      state,
                      initialState,
                      "graduationYear"
                    )}
                    onChange={() => !isDisabled && setIsDirty(true)}
                    disabled={isDisabled}
                  />
                </div>
                {getFieldError(state, "graduationYear") && (
                  <p className="text-red-500 text-sm">
                    {getFieldError(state, "graduationYear")}
                  </p>
                )}
              </div>
            </div>

            {/* Marital Status, Employment Status Field*/}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Marital Status Field*/}
              <div className="flex flex-col gap-1">
                <div className="flex flex-col gap-2 lg:gap-4">
                  <Label
                    className={
                      getFieldError(state, "maritalStatus")
                        ? "secondary-label-error"
                        : "secondary-label"
                    }
                  >
                    {t("STUDENT-INFORMATION-FORM.FIELD.FIELD-16.label")}{" "}
                    <RequiredIcon />
                  </Label>
                  <Select
                    name="maritalStatus"
                    defaultValue={getDefaultInputValue(
                      state,
                      initialState,
                      "maritalStatus"
                    )}
                    onValueChange={() => !isDisabled && setIsDirty(true)}
                    disabled={isDisabled}
                  >
                    <SelectTrigger
                      className={
                        getFieldError(state, "maritalStatus")
                          ? "secondary-input-error"
                          : "secondary-input"
                      }
                    >
                      <SelectValue
                        placeholder={t(
                          "STUDENT-INFORMATION-FORM.FIELD.FIELD-16.placeholder"
                        )}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {MARITAL_STATUS_ITEMS.map((maritalStatus) => (
                        <SelectItem
                          key={`${maritalStatus.id}-${maritalStatus.value}`}
                          value={maritalStatus.value}
                        >
                          {getContentByLocale({
                            locale,
                            enContent: maritalStatus.label_en,
                            idContent: maritalStatus.label_id,
                          })}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {getFieldError(state, "maritalStatus") && (
                  <p className="text-red-500 text-sm">
                    {getFieldError(state, "maritalStatus")}
                  </p>
                )}
              </div>

              {/* Employment Status Field*/}
              <div className="flex flex-col gap-1">
                <div className="flex flex-col gap-2 lg:gap-4">
                  <Label
                    className={
                      getFieldError(state, "employmentStatus")
                        ? "secondary-label-error"
                        : "secondary-label"
                    }
                  >
                    {t("STUDENT-INFORMATION-FORM.FIELD.FIELD-17.label")}{" "}
                    <RequiredIcon />
                  </Label>
                  <Select
                    name="employmentStatus"
                    defaultValue={getDefaultInputValue(
                      state,
                      initialState,
                      "employmentStatus"
                    )}
                    onValueChange={() => !isDisabled && setIsDirty(true)}
                    disabled={isDisabled}
                  >
                    <SelectTrigger
                      className={
                        getFieldError(state, "employmentStatus")
                          ? "secondary-input-error"
                          : "secondary-input"
                      }
                    >
                      <SelectValue
                        placeholder={t(
                          "STUDENT-INFORMATION-FORM.FIELD.FIELD-17.placeholder"
                        )}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {EMPLOYMENT_STATUS_ITEMS.map((status) => (
                        <SelectItem
                          key={`${status.id}-${status.value}`}
                          value={status.value}
                        >
                          {getContentByLocale({
                            locale,
                            enContent: status.label_en,
                            idContent: status.label_id,
                          })}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {getFieldError(state, "employmentStatus") && (
                  <p className="text-red-500 text-sm">
                    {getFieldError(state, "employmentStatus")}
                  </p>
                )}
              </div>
            </div>
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

export default StudentInformationForm;
