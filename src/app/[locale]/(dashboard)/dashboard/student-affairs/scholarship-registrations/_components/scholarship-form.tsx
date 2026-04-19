"use client";
import { format, parse } from "date-fns";
import RequiredIcon from "@/components/icons/required-icon";
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
import { cn, getDefaultInputValue, getFieldError } from "@/lib/utils";
import { TActionResult, TScholarshipDetail, TStudyProgram } from "@/types";
import { useTranslations } from "next-intl";
import React, { useActionState } from "react";
import { updateScholarshipById } from "../actions";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useDistricts,
  useProvinces,
  useRegencies,
  useVillages,
} from "@/features";
import { Textarea } from "@/components/ui/textarea";
import { ACADEMIC_GRADE_ITEMS } from "@/constants";
import { ArrowRight, CalendarIcon } from "lucide-react";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

interface IScholarshipFormProps {
  scholarshipRegistrationById: TScholarshipDetail;
  studyPrograms: TStudyProgram[];
  functionType?: "edit" | "detail";
}

const ScholarshipForm: React.FC<IScholarshipFormProps> = (props) => {
  const {
    scholarshipRegistrationById,
    studyPrograms,
    functionType = "edit",
  } = props;
  const t = useTranslations(
    "PAGE.DASHBOARD.SCHOLARSHIP-REGISTRATION-PAGE.EDIT-PAGE.SECTION.FORM-SECTION.FORM.SCHOLARSHIP-FORM"
  );

  const isDisabled = functionType === "detail";

  const initialState = React.useMemo<TActionResult>(
    () => ({
      success: false,
      message: "",
      errors: {},
      inputValues: {
        ...scholarshipRegistrationById,
      },
    }),
    [scholarshipRegistrationById]
  );

  const formRef = React.useRef<HTMLFormElement | null>(null);
  const [, setIsDirty] = React.useState(false);

  const birthDateValue = scholarshipRegistrationById.birthDate
    ? parse(scholarshipRegistrationById.birthDate, "yyyy-MM-dd", new Date())
    : undefined;

  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    birthDateValue
  );

  const [state, formAction, isPending] = useActionState(
    async (
      _prevState: TActionResult,
      formData: FormData
    ): Promise<TActionResult> => {
      return await updateScholarshipById(
        scholarshipRegistrationById.id,
        formData
      );
    },
    initialState
  );

  const [provinceId, setProvinceId] = React.useState(
    scholarshipRegistrationById.province || ""
  );
  const [regencyId, setRegencyId] = React.useState(
    scholarshipRegistrationById.districtOrCity || ""
  );
  const [districtId, setDistrictId] = React.useState(
    scholarshipRegistrationById.subDistrict || ""
  );
  const [villageId, setVillageId] = React.useState(
    scholarshipRegistrationById.village || ""
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
    if (state && state !== initialState) {
      if (state.success) {
        toast.success(t("RESPONSE.success"), {
          style: {
            backgroundColor: "#34D399",
            border: "1px solid #34D399",
            color: "#ffffff",
            fontWeight: "bold",
          },
          duration: 3000,
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
          duration: 3000,
        });
      }
    }
  }, [state, initialState, t]);

  return (
    <form ref={formRef} action={isDisabled ? undefined : formAction}>
      <Card>
        <div className="grid grid-cols-1 gap-8">
          <div className="flex flex-col gap-8">
            <CardHeader>
              <CardTitle> {t("title")}</CardTitle>
              <CardDescription>{t("description")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4">
                {/*Full Name, Phone Number, Email Fields */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-4">
                  {/* Full Name Field */}
                  <div className="flex flex-col gap-1">
                    <div className="flex flex-col gap-2 lg:gap-4">
                      <Label
                        htmlFor="fullName"
                        className={
                          getFieldError(state, "fullName")
                            ? "secondary-label-error"
                            : "secondary-label"
                        }
                      >
                        {t("FIELD.FIELD-1.label")} <RequiredIcon />
                      </Label>
                      <Input
                        name="fullName"
                        id="fullName"
                        className={
                          getFieldError(state, "fullName")
                            ? "secondary-input-error"
                            : "secondary-input"
                        }
                        placeholder={t("FIELD.FIELD-1.placeholder")}
                        defaultValue={getDefaultInputValue(
                          state,
                          initialState,
                          "fullName"
                        )}
                        onChange={() => {
                          if (isDisabled) return;
                          setIsDirty(true);
                        }}
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
                        htmlFor="phoneNumber"
                        className={
                          getFieldError(state, "phoneNumber")
                            ? "secondary-label-error"
                            : "secondary-label"
                        }
                      >
                        {t("FIELD.FIELD-2.label")} <RequiredIcon />
                      </Label>
                      <Input
                        name="phoneNumber"
                        id="phoneNumber"
                        className={
                          getFieldError(state, "phoneNumber")
                            ? "secondary-input-error"
                            : "secondary-input"
                        }
                        placeholder={t("FIELD.FIELD-2.placeholder")}
                        defaultValue={getDefaultInputValue(
                          state,
                          initialState,
                          "phoneNumber"
                        )}
                        onChange={() => {
                          if (isDisabled) return;
                          setIsDirty(true);
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

                  {/* Email Field */}
                  <div className="flex flex-col gap-1">
                    <div className="flex flex-col gap-2 lg:gap-4">
                      <Label
                        className={
                          getFieldError(state, "email")
                            ? "secondary-label-error"
                            : "secondary-label"
                        }
                      >
                        {t("FIELD.FIELD-3.label")} <RequiredIcon />
                      </Label>
                      <Input
                        name="email"
                        id="email"
                        className={
                          getFieldError(state, "email")
                            ? "secondary-input-error"
                            : "secondary-input"
                        }
                        placeholder={t("FIELD.FIELD-3.placeholder")}
                        defaultValue={getDefaultInputValue(
                          state,
                          initialState,
                          "email"
                        )}
                        onChange={() => {
                          if (isDisabled) return;
                          setIsDirty(true);
                        }}
                        disabled={isDisabled}
                      />
                    </div>
                    {getFieldError(state, "email") && (
                      <p className="text-red-500 text-sm">
                        {getFieldError(state, "email")}
                      </p>
                    )}
                  </div>
                </div>

                {/* Instagram Username, Institution, Class or Major Fields */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-4">
                  {/* Instagram Username Field */}
                  <div className="flex flex-col gap-1">
                    <div className="flex flex-col gap-2 lg:gap-4">
                      <Label
                        htmlFor="instagramUsername"
                        className={
                          getFieldError(state, "instagramUsername")
                            ? "secondary-label-error"
                            : "secondary-label"
                        }
                      >
                        {t("FIELD.FIELD-4.label")}
                      </Label>
                      <Input
                        name="instagramUsername"
                        id="instagramUsername"
                        className={
                          getFieldError(state, "instagramUsername")
                            ? "secondary-input-error"
                            : "secondary-input"
                        }
                        placeholder={t("FIELD.FIELD-4.placeholder")}
                        defaultValue={getDefaultInputValue(
                          state,
                          initialState,
                          "instagramUsername"
                        )}
                        onChange={() => {
                          if (isDisabled) return;
                          setIsDirty(true);
                        }}
                        disabled={isDisabled}
                      />
                    </div>
                    {getFieldError(state, "instagramUsername") && (
                      <p className="text-red-500 text-sm">
                        {getFieldError(state, "instagramUsername")}
                      </p>
                    )}
                  </div>

                  {/* Institution Name Field */}
                  <div className="flex flex-col gap-1">
                    <div className="flex flex-col gap-2 lg:gap-4">
                      <Label
                        htmlFor="institutionName"
                        className={
                          getFieldError(state, "institutionName")
                            ? "secondary-label-error"
                            : "secondary-label"
                        }
                      >
                        {t("FIELD.FIELD-5.label")} <RequiredIcon />
                      </Label>
                      <Input
                        name="institutionName"
                        id="institutionName"
                        className={
                          getFieldError(state, "institutionName")
                            ? "secondary-input-error"
                            : "secondary-input"
                        }
                        placeholder={t("FIELD.FIELD-5.placeholder")}
                        defaultValue={getDefaultInputValue(
                          state,
                          initialState,
                          "institutionName"
                        )}
                        onChange={() => {
                          if (isDisabled) return;
                          setIsDirty(true);
                        }}
                        disabled={isDisabled}
                      />
                    </div>
                    {getFieldError(state, "institutionName") && (
                      <p className="text-red-500 text-sm">
                        {getFieldError(state, "institutionName")}
                      </p>
                    )}
                  </div>

                  {/* Class or Major Field */}
                  <div className="flex flex-col gap-1">
                    <div className="flex flex-col gap-2 lg:gap-4">
                      <Label
                        htmlFor="classOrMajor"
                        className={
                          getFieldError(state, "")
                            ? "secondary-label-error"
                            : "secondary-label"
                        }
                      >
                        {t("FIELD.FIELD-6.label")} <RequiredIcon />
                      </Label>
                      <Input
                        name="classOrMajor"
                        id="classOrMajor"
                        className={
                          getFieldError(state, "classOrMajor")
                            ? "secondary-input-error"
                            : "secondary-input"
                        }
                        placeholder={t("FIELD.FIELD-6.placeholder")}
                        defaultValue={getDefaultInputValue(
                          state,
                          initialState,
                          "classOrMajor"
                        )}
                        onChange={() => {
                          if (isDisabled) return;
                          setIsDirty(true);
                        }}
                        disabled={isDisabled}
                      />
                    </div>
                    {getFieldError(state, "classOrMajor") && (
                      <p className="text-red-500 text-sm">
                        {getFieldError(state, "classOrMajor")}
                      </p>
                    )}
                  </div>
                </div>

                {/* Birth Date,Province, Regency Fields */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-4">
                  {/* Birth Date Field */}
                  <div className="flex flex-col gap-1">
                    <div className="flex flex-col gap-2 lg:gap-4">
                      <Label
                        className={
                          getFieldError(state, "birthDate")
                            ? "secondary-label-error"
                            : "secondary-label"
                        }
                      >
                        {t("FIELD.FIELD-7.label")} <RequiredIcon />
                      </Label>

                      <Popover>
                        <PopoverTrigger
                          asChild
                          className={
                            getFieldError(state, "birthDate")
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
                        name="birthDate"
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
                    {getFieldError(state, "birthDate") && (
                      <p className="text-red-500 text-sm">
                        {getFieldError(state, "birthDate")}
                      </p>
                    )}
                  </div>

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
                        {t("FIELD.FIELD-8.label")} <RequiredIcon />
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
                          <SelectValue placeholder={"FIELD-8.placeholder"} />
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
                        {t("FIELD.FIELD-9.label")} <RequiredIcon />
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
                            placeholder={t("FIELD.FIELD-9.placeholder")}
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
                </div>

                {/* District, Village, Full Address Field */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-4">
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
                        {t("FIELD.FIELD-10.label")} <RequiredIcon />
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
                            placeholder={t("FIELD.FIELD-10.placeholder")}
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
                      <input
                        type="hidden"
                        name="subDistrict"
                        value={districtId}
                      />
                    </div>
                    {getFieldError(state, "subDistrict") && (
                      <p className="text-red-500 text-sm">
                        {getFieldError(state, "subDistrict")}
                      </p>
                    )}
                  </div>

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
                        {t("FIELD.FIELD-11.label")} <RequiredIcon />
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
                            placeholder={t("FIELD.FIELD-11.label")}
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

                  {/* Full Address Field */}
                  <div className="flex flex-col gap-1">
                    <div className="flex flex-col gap-2 lg:gap-4">
                      <Label
                        className={
                          getFieldError(state, "fullAddress")
                            ? "secondary-label-error"
                            : "secondary-label"
                        }
                      >
                        {t("FIELD.FIELD-12.label")} <RequiredIcon />
                      </Label>
                      <Textarea
                        name="fullAddress"
                        id="fullAddress"
                        className={
                          getFieldError(state, "fullAddress")
                            ? "secondary-input-error"
                            : "secondary-input"
                        }
                        placeholder={t("FIELD.FIELD-12.placeholder")}
                        defaultValue={getDefaultInputValue(
                          state,
                          initialState,
                          "fullAddress"
                        )}
                        onChange={() => {
                          if (isDisabled) return;
                          setIsDirty(true);
                        }}
                        disabled={isDisabled}
                      />
                    </div>
                    {getFieldError(state, "fullAddress") && (
                      <p className="text-red-500 text-sm">
                        {getFieldError(state, "fullAddress")}
                      </p>
                    )}
                  </div>
                </div>

                {/*Father Contact, Mother Contact, Study Program Field */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-4">
                  {/* Father Contact Field */}
                  <div className="flex flex-col gap-1">
                    <div className="flex flex-col gap-2 lg:gap-4">
                      <Label
                        className={
                          getFieldError(state, "fatherContact")
                            ? "secondary-label-error"
                            : "secondary-label"
                        }
                      >
                        {t("FIELD.FIELD-13.label")} <RequiredIcon />
                      </Label>
                      <Input
                        name="fatherContact"
                        id="fatherContact"
                        className={
                          getFieldError(state, "fatherContact")
                            ? "secondary-input-error"
                            : "secondary-input"
                        }
                        placeholder={t("FIELD.FIELD-13.placeholder")}
                        defaultValue={getDefaultInputValue(
                          state,
                          initialState,
                          "fatherContact"
                        )}
                        onChange={() => {
                          if (isDisabled) return;
                          setIsDirty(true);
                        }}
                        disabled={isDisabled}
                      />
                    </div>
                    {getFieldError(state, "fatherContact") && (
                      <p className="text-red-500 text-sm">
                        {getFieldError(state, "fatherContact")}
                      </p>
                    )}
                  </div>

                  {/* Mother Contact Field */}
                  <div className="flex flex-col gap-1">
                    <div className="flex flex-col gap-2 lg:gap-4">
                      <Label
                        className={
                          getFieldError(state, "motherContact")
                            ? "secondary-label-error"
                            : "secondary-label"
                        }
                      >
                        {t("FIELD.FIELD-14.label")} <RequiredIcon />
                      </Label>
                      <Input
                        name="motherContact"
                        id="motherContact"
                        className={
                          getFieldError(state, "motherContact")
                            ? "secondary-input-error"
                            : "secondary-input"
                        }
                        placeholder={t("FIELD.FIELD-14.placeholder")}
                        defaultValue={getDefaultInputValue(
                          state,
                          initialState,
                          "motherContact"
                        )}
                        onChange={() => {
                          if (isDisabled) return;
                          setIsDirty(true);
                        }}
                        disabled={isDisabled}
                      />
                    </div>
                    {getFieldError(state, "motherContact") && (
                      <p className="text-red-500 text-sm">
                        {getFieldError(state, "motherContact")}
                      </p>
                    )}
                  </div>

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
                        {t("FIELD.FIELD-15.label")} <RequiredIcon />
                      </Label>
                      <Select
                        name="studyProgramId"
                        defaultValue={getDefaultInputValue(
                          state,
                          initialState,
                          "studyProgramId"
                        ).toString()}
                        onValueChange={() => {
                          if (isDisabled) return;
                          setIsDirty(true);
                        }}
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
                            placeholder={t("FIELD.FIELD-15.label")}
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
                    {getFieldError(state, "motherOccupation") && (
                      <p className="text-red-500 text-sm">
                        {getFieldError(state, "motherOccupation")}
                      </p>
                    )}
                  </div>
                </div>

                {/* Current Status Field */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-4">
                  <div className="flex flex-col gap-1">
                    <div className="flex flex-col gap-2 lg:gap-4">
                      <Label
                        className={
                          getFieldError(state, "currentStatus")
                            ? "secondary-label-error"
                            : "secondary-label"
                        }
                      >
                        {t("FIELD.FIELD-16.label")} <RequiredIcon />
                      </Label>
                      <Select
                        name="currentStatus"
                        defaultValue={getDefaultInputValue(
                          state,
                          initialState,
                          "currentStatus"
                        )}
                        onValueChange={() => {
                          if (isDisabled) return;
                          setIsDirty(true);
                        }}
                        disabled={isDisabled}
                      >
                        <SelectTrigger
                          className={
                            getFieldError(state, "currentStatus")
                              ? "secondary-input-error"
                              : "secondary-input"
                          }
                        >
                          <SelectValue
                            placeholder={t("FIELD.FIELD-16.label")}
                          />
                        </SelectTrigger>

                        <SelectContent>
                          {ACADEMIC_GRADE_ITEMS.map((grade) => (
                            <SelectItem
                              key={`${grade.id}-${grade.label}`}
                              value={grade.id.toString()}
                            >
                              {grade.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    {getFieldError(state, "motherOccupation") && (
                      <p className="text-red-500 text-sm">
                        {getFieldError(state, "motherOccupation")}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </div>
        </div>

        {isDisabled ? null : (
          <CardFooter className="flex justify-end">
            <div className="flex items-center gap-2">
              <Button
                type="submit"
                disabled={isPending}
                className={`text-[14px] leading-[18px] font-medium cursor-pointer text-primary-foreground capitalize w-fit rounded-[8px] bg-primary border-primary border flex items-center justify-center h-full gap-4 py-[6px] pr-[6px] ${
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

export default ScholarshipForm;
