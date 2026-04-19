"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import PhoneInput from "react-phone-number-input";
import { zodResolver } from "@hookform/resolvers/zod";
import "react-phone-number-input/style.css";
import { useTranslations } from "next-intl";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePMBStore } from "@/stores/use-pmb-store";
import { studentInformationSchema } from "@/lib/schema";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn, getContentByLocale } from "@/lib/utils";
import { format } from "date-fns";
import {
  EMPLOYMENT_STATUS_ITEMS,
  GENDER_ITEMS,
  MARITAL_STATUS_ITEMS,
  RELIGION_ITEMS,
} from "@/constants";
import { Textarea } from "@/components/ui/textarea";
import {
  useDistricts,
  useProvinces,
  useRegencies,
  useVillages,
} from "@/features";
import { StudyProgram } from "@/types";
import RequiredIcon from "@/components/icons/required-icon";

type FormData = z.infer<typeof studentInformationSchema>;

interface IStudentInformationForm {
  studyPrograms: StudyProgram[];
  formRef?: React.MutableRefObject<unknown>;
  locale: string;
}

const StudentInformationForm: React.FC<IStudentInformationForm> = (props) => {
  const { studyPrograms, formRef, locale } = props;
  const t = useTranslations(
    "PAGE.PMB-PAGE.SECTION.FORM-SECTION.FORM.STUDENT-INFORMATION-FORM"
  );

  const { formData } = usePMBStore();

  const form = useForm<FormData>({
    resolver: zodResolver(studentInformationSchema),
    defaultValues: {
      studyProgramId: formData.studentInformation.studyProgramId,
      fullName: formData.studentInformation.fullName,
      phoneNumber: formData.studentInformation.phoneNumber,
      instagramUsername: formData.studentInformation.instagramUsername,
      placeOfBirth: formData.studentInformation.placeOfBirth,
      dateOfBirth: formData.studentInformation.dateOfBirth
        ? new Date(formData.studentInformation.dateOfBirth)
        : undefined,
      gender: formData.studentInformation.gender,
      religion: formData.studentInformation.religion,
      domicileAddress: formData.studentInformation.domicileAddress,
      province: formData.studentInformation.province,
      districtOrCity: formData.studentInformation.districtOrCity,
      subDistrict: formData.studentInformation.subDistrict,
      village: formData.studentInformation.village,
      institutionName: formData.studentInformation.institutionName,
      graduationYear: formData.studentInformation.graduationYear,
      maritalStatus: formData.studentInformation.maritalStatus,
      employmentStatus: formData.studentInformation.employmentStatus,
    },
    mode: "onBlur",
  });
  const province = form?.watch("province");
  const regency = form?.watch("districtOrCity");
  const district = form?.watch("subDistrict");

  const {
    data: provinces,
    isLoading: isLoadingProvinces,
    isError: isErrorProvinces,
  } = useProvinces();
  const {
    data: regencies,
    isLoading: isLoadingRegencies,
    isError: isErrorRegencies,
  } = useRegencies(province);
  const {
    data: villages,
    isLoading: isLoadingVillages,
    isError: isErrorVillages,
  } = useVillages(district);
  const {
    data: districts,
    isLoading: isLoadingDistricts,
    isError: isErrorDistricts,
  } = useDistricts(regency);

  React.useEffect(() => {
    if (formRef) {
      formRef.current = form;
    }

    return () => {
      if (formRef) {
        formRef.current = null;
      }
    };
  }, [form, formRef]);

  return (
    <Form {...form}>
      <div className="flex flex-col gap-7 md:gap-[31px] lg:gap-[34px] xl:ga-[37px] 2xl:gap-10">
        <div className="grid grid-cols-1 gap-4 md:gap-[19px] lg:gap-[22px] xl:gap-[25px] 2xl:gap-7">
          {/* StudyProgram, fullName, phonenumber */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-[19px] lg:gap-[22px] xl:gap-[25px] 2xl:gap-7">
            <FormField
              control={form.control}
              name="studyProgramId"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="main-label">
                    {t("FIELD.FIELD-1.label")} <RequiredIcon />
                  </FormLabel>
                  <Select
                    defaultValue={
                      field.value === 0 ? "" : field.value.toString()
                    }
                    onValueChange={field.onChange}
                  >
                    <FormControl className="mt-2 lg:mt-4">
                      <SelectTrigger className="main-input">
                        <SelectValue
                          placeholder={t("FIELD.FIELD-1.placeholder")}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="max-h-72 overflow-y-auto">
                      {studyPrograms.map((studyProgram) => (
                        <SelectItem
                          key={studyProgram.id}
                          value={studyProgram.id.toString()}
                        >
                          {studyProgram.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="main-label">
                    {t("FIELD.FIELD-2.label")} <RequiredIcon />
                  </FormLabel>
                  <FormControl className="mt-2 lg:mt-4">
                    <Input
                      className="main-input"
                      placeholder={t("FIELD.FIELD-2.placeholder")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="main-label">
                    {t("FIELD.FIELD-3.label")} <RequiredIcon />
                  </FormLabel>
                  <FormControl className="mt-2 lg:mt-4">
                    <div>
                      <PhoneInput
                        {...field}
                        defaultCountry="ID"
                        international
                        countryCallingCodeEditable={false}
                        className="main-input"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-[19px] lg:gap-[22px] xl:gap-[25px] 2xl:gap-7">
            <FormField
              control={form.control}
              name="instagramUsername"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="main-label">
                    {t("FIELD.FIELD-4.label")} <RequiredIcon />
                  </FormLabel>
                  <FormControl className="mt-2 lg:mt-4">
                    <Input
                      className="main-input"
                      placeholder={t("FIELD.FIELD-4.placeholder")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="placeOfBirth"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="main-label">
                    {t("FIELD.FIELD-5.label")} <RequiredIcon />
                  </FormLabel>
                  <FormControl className="mt-2 lg:mt-4">
                    <Input
                      className="main-input"
                      placeholder={t("FIELD.FIELD-5.placeholder")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date of birth</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild className="">
                      <FormControl className="mt-4">
                        <Button
                          variant={"outline"}
                          className={cn(
                            "main-input",
                            !field.value && "text-[#A3A3A3]"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span className="">Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value ?? undefined}
                        onSelect={(date) => field.onChange(date ?? "")}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                      />
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-[19px] lg:gap-[22px] xl:gap-[25px] 2xl:gap-7">
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-black main-label">
                    {t("FIELD.FIELD-7.label")} <RequiredIcon />
                  </FormLabel>
                  <Select
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    <FormControl className="mt-2 lg:mt-4">
                      <SelectTrigger className="main-input">
                        <SelectValue
                          placeholder={t("FIELD.FIELD-7.placeholder")}
                        />
                      </SelectTrigger>
                    </FormControl>
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
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="religion"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-black main-label">
                    {t("FIELD.FIELD-8.label")} <RequiredIcon />
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl className="mt-2 lg:mt-4">
                      <SelectTrigger className="main-input">
                        <SelectValue
                          placeholder={t("FIELD.FIELD-8.placeholder")}
                        />
                      </SelectTrigger>
                    </FormControl>
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
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="domicileAddress"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="main-label">
                    {t("FIELD.FIELD-9.label")} <RequiredIcon />
                  </FormLabel>
                  <FormControl className="mt-2 lg:mt-4">
                    <Textarea
                      placeholder={t("FIELD.FIELD-9.placeholder")}
                      {...field}
                      className="main-input resize-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-[19px] lg:gap-[22px] xl:gap-[25px] 2xl:gap-7">
            <FormField
              control={form.control}
              name="province"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-black main-label">
                    {t("FIELD.FIELD-10.label")} <RequiredIcon />
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl className="mt-2 lg:mt-4">
                      <SelectTrigger className="main-input">
                        <SelectValue
                          placeholder={t("FIELD.FIELD-10.placeholder")}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="max-h-72 overflow-y-auto">
                      {!isLoadingProvinces && (
                        <div className="p-1 flex items-center justify-center">
                          Loading...
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
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="districtOrCity"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-black main-label">
                    {t("FIELD.FIELD-11.label")} <RequiredIcon />
                  </FormLabel>
                  <Select
                    key={regencies?.length}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl className="mt-2 lg:mt-4">
                      <SelectTrigger className="main-input">
                        <SelectValue
                          placeholder={
                            regencies && field.value
                              ? regencies.find((r) => r.id === field.value)
                                  ?.name || "Loading..."
                              : t("FIELD.FIELD-11.placeholder")
                          }
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="max-h-72 overflow-y-auto">
                      {isLoadingRegencies && (
                        <div className="p-1 flex items-center justify-center">
                          Loading...
                        </div>
                      )}
                      {isErrorRegencies && (
                        <div className="p-1 flex items-center justify-center">
                          Error loading regencies
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
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subDistrict"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-black main-label">
                    {t("FIELD.FIELD-12.label")} <RequiredIcon />
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl className="mt-2 lg:mt-4">
                      <SelectTrigger className="main-input">
                        <SelectValue
                          placeholder={t("FIELD.FIELD-12.placeholder")}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="max-h-72 overflow-y-auto">
                      {isLoadingDistricts && (
                        <div className="p-1 flex items-center justify-center">
                          Loading...
                        </div>
                      )}
                      {isErrorDistricts && (
                        <div className="p-1 flex items-center justify-center"></div>
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
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-[19px] lg:gap-[22px] xl:gap-[25px] 2xl:gap-7">
            <FormField
              control={form.control}
              name="village"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-black main-label">
                    {t("FIELD.FIELD-13.label")} <RequiredIcon />
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl className="mt-2 lg:mt-4">
                      <SelectTrigger className="main-input">
                        <SelectValue
                          placeholder={t("FIELD.FIELD-13.placeholder")}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="max-h-72 overflow-y-auto">
                      {isLoadingVillages && (
                        <div className="p-1 flex items-center justify-center">
                          Loading...
                        </div>
                      )}
                      {isErrorVillages && (
                        <div className="p-1 flex items-center justify-center">
                          Error loading villages
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
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="institutionName"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="main-label">
                    {t("FIELD.FIELD-14.label")} <RequiredIcon />
                  </FormLabel>
                  <FormControl className="mt-2 lg:mt-4">
                    <Textarea
                      placeholder={t("FIELD.FIELD-14.placeholder")}
                      className="main-input resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="graduationYear"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="main-label">
                    {t("FIELD.FIELD-15.label")} <RequiredIcon />
                  </FormLabel>
                  <FormControl className="mt-2 lg:mt-4">
                    <Input
                      className="main-input"
                      placeholder={t("FIELD.FIELD-15.placeholder")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-[19px] lg:gap-[22px] xl:gap-[25px] 2xl:gap-7">
            <FormField
              control={form.control}
              name="maritalStatus"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-black main-label">
                    {t("FIELD.FIELD-16.label")} <RequiredIcon />
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl className="mt-2 lg:mt-4">
                      <SelectTrigger className="main-input">
                        <SelectValue
                          placeholder={t("FIELD.FIELD-16.placeholder")}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {MARITAL_STATUS_ITEMS.map((marital) => (
                        <SelectItem
                          key={`${marital.id}-${marital.value}`}
                          value={marital.value}
                        >
                          {getContentByLocale({
                            locale,
                            enContent: marital.label_en,
                            idContent: marital.label_id,
                          })}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="employmentStatus"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-black main-label">
                    {t("FIELD.FIELD-17.label")} <RequiredIcon />
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl className="mt-2 lg:mt-4">
                      <SelectTrigger className="main-input">
                        <SelectValue
                          placeholder={t("FIELD.FIELD-17.placeholder")}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="max-h-72 overflow-y-auto">
                      {EMPLOYMENT_STATUS_ITEMS.map((employmentStatus) => (
                        <SelectItem
                          key={`${employmentStatus.id}-${employmentStatus.value}`}
                          value={employmentStatus.value}
                        >
                          {getContentByLocale({
                            locale,
                            enContent: employmentStatus.label_en,
                            idContent: employmentStatus.label_id,
                          })}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </div>
    </Form>
  );
};

export default StudentInformationForm;
