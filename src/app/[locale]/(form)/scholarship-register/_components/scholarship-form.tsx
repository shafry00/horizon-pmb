/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { scholarshipFormSchema } from "@/lib/schema";
import { cn } from "@/lib/utils";
import { useScholarshipFormStore } from "@/stores/use-scholarship-register-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "lucide-react";

import React from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import {
  useDistricts,
  useProvinces,
  useRegencies,
  useVillages,
} from "@/features";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ACADEMIC_GRADE_ITEMS } from "@/constants";
import { TStudyProgram } from "@/types";

type FormData = z.infer<typeof scholarshipFormSchema>;

interface IScholarshipFormProps {
  formRef?: React.MutableRefObject<any>;
  t: any;
  studyPrograms: TStudyProgram[];
}

const ScholarshipForm: React.FC<IScholarshipFormProps> = (props) => {
  const { formRef, t, studyPrograms } = props;
  const { formData } = useScholarshipFormStore();

  const form = useForm<FormData>({
    resolver: zodResolver(scholarshipFormSchema),
    defaultValues: {
      fullName: formData.scholarshipInfo.fullName || "",
      phoneNumber: formData.scholarshipInfo.phoneNumber,
      email: formData.scholarshipInfo.email,
      instagramUsername: formData.scholarshipInfo.instagramUsername,
      institutionName: formData.scholarshipInfo.institutionName,
      classOrMajor: formData.scholarshipInfo.classOrMajor,
      birthDate: formData.scholarshipInfo.birthDate,
      province: formData.scholarshipInfo.province,
      districtOrCity: formData.scholarshipInfo.districtOrCity,
      subDistrict: formData.scholarshipInfo.subDistrict,
      village: formData.scholarshipInfo.village,
      fullAddress: formData.scholarshipInfo.fullAddress,
      motherContact: formData.scholarshipInfo.motherContact,
      fatherContact: formData.scholarshipInfo.fatherContact,
      studyProgramId: formData.scholarshipInfo.studyProgramId,
      currentStatus: formData.scholarshipInfo.currentStatus,
    },
    mode: "onChange",
  });

  const province = form.watch("province");
  const regency = form.watch("districtOrCity");
  const district = form.watch("subDistrict");

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
    data: districts,
    isLoading: isLoadingDistricts,
    isError: isErrorDistricts,
  } = useDistricts(regency);
  const {
    data: villages,
    isLoading: isLoadingVillages,
    isError: isErrorVillages,
  } = useVillages(district);

  // React.useEffect(() => {
  //   const handleBeforeUnload = (event: BeforeUnloadEvent) => {
  //     const { isFormDirty } = useScholarshipFormStore.getState();

  //     if (isFormDirty) {
  //       event.preventDefault();

  //       event.returnValue = "";
  //     } else {
  //       localStorage.removeItem("scholarship-form");
  //     }
  //   };

  //   window.addEventListener("beforeunload", handleBeforeUnload);

  //   return () => {
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //   };
  // }, []);

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
      <form>
        <div className="flex flex-col gap-7 md:gap-[31px] lg:gap-[34px] xl:ga-[37px] 2xl:gap-10">
          <div className="grid grid-cols-1 gap-4 md:gap-[19px] lg:gap-[22px] xl:gap-[25px] 2xl:gap-7">
            {/* Fullname, Phone Number, Email */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-[19px] lg:gap-[22px] xl:gap-[25px] 2xl:gap-7">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="main-label">
                      {t("SCHOLARSHIP-FORM.FIELD.FIELD-1.label")} (*)
                    </FormLabel>
                    <FormControl className="mt-2 lg:mt-4">
                      <Input
                        className="main-input"
                        placeholder={t(
                          "SCHOLARSHIP-FORM.FIELD.FIELD-1.placeholder"
                        )}
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
                      {t("SCHOLARSHIP-FORM.FIELD.FIELD-2.label")} (*)
                    </FormLabel>
                    <FormControl className="mt-2 lg:mt-4">
                      <Input
                        className="main-input"
                        placeholder={t(
                          "SCHOLARSHIP-FORM.FIELD.FIELD-2.placeholder"
                        )}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="main-label text-primary italic">
                      {t("SCHOLARSHIP-FORM.FIELD.FIELD-2.description")}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="main-label">
                      {t("SCHOLARSHIP-FORM.FIELD.FIELD-3.label")} (*)
                    </FormLabel>
                    <FormControl className="mt-2 lg:mt-4">
                      <Input
                        className="main-input"
                        placeholder={t(
                          "SCHOLARSHIP-FORM.FIELD.FIELD-3.placeholder"
                        )}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Instagram Username, Insitution Name, Class or Major */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-[19px] lg:gap-[22px] xl:gap-[25px] 2xl:gap-7">
              <FormField
                control={form.control}
                name="instagramUsername"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="main-label">
                      {t("SCHOLARSHIP-FORM.FIELD.FIELD-4.label")}
                    </FormLabel>
                    <FormControl className="mt-2 lg:mt-4">
                      <Input
                        className="main-input"
                        placeholder={t(
                          "SCHOLARSHIP-FORM.FIELD.FIELD-4.placeholder"
                        )}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="institutionName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="main-label">
                      {t("SCHOLARSHIP-FORM.FIELD.FIELD-5.label")} (*)
                    </FormLabel>
                    <FormControl className="mt-2 lg:mt-4">
                      <Input
                        className="main-input"
                        placeholder={t(
                          "SCHOLARSHIP-FORM.FIELD.FIELD-5.placeholder"
                        )}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="classOrMajor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="main-label">
                      {t("SCHOLARSHIP-FORM.FIELD.FIELD-6.label")} (*)
                    </FormLabel>
                    <FormControl className="mt-2 lg:mt-4">
                      <Input
                        className="main-input"
                        placeholder={t(
                          "SCHOLARSHIP-FORM.FIELD.FIELD-6.placeholder"
                        )}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Date of Birth, Province, City */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-[19px] lg:gap-[22px] xl:gap-[25px] 2xl:gap-7">
              <FormField
                control={form.control}
                name="birthDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="main-label">Date of birth</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild className="">
                        <FormControl className="mt-2 lg:mt-4">
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal main-input",
                              !field.value && "text-muted-foreground"
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
                          selected={
                            field.value ? new Date(field.value) : undefined
                          }
                          onSelect={(date) => {
                            const isoDate = date?.toISOString().split("T")[0];
                            field.onChange(isoDate);
                          }}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="province"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="main-label">
                      {t("SCHOLARSHIP-FORM.FIELD.FIELD-8.label")}
                    </FormLabel>
                    <Select
                      name="province"
                      key={provinces?.length}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="mt-2 lg:mt-4">
                        <SelectTrigger className="main-input">
                          <SelectValue
                            placeholder={
                              provinces && field.value
                                ? provinces.find(
                                    (prov) => prov.id === field.value
                                  )?.name || "Loading..."
                                : t(
                                    "SCHOLARSHIP-FORM.FIELD.FIELD-8.placeholder"
                                  )
                            }
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
                  <FormItem>
                    <FormLabel className="main-label">
                      {t("SCHOLARSHIP-FORM.FIELD.FIELD-9.label")}
                    </FormLabel>
                    <Select
                      key={JSON.stringify(regencies)}
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
                                : t(
                                    "SCHOLARSHIP-FORM.FIELD.FIELD-9.placeholder"
                                  )
                            }
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="max-h-72 overflow-y-auto">
                        {!isLoadingRegencies && (
                          <div className="p-1 flex items-center justify-center">
                            Loading...
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

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-[19px] lg:gap-[22px] xl:gap-[25px] 2xl:gap-7">
              <FormField
                control={form.control}
                name="subDistrict"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="main-label">
                      {t("SCHOLARSHIP-FORM.FIELD.FIELD-10.label")}
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="mt-2 lg:mt-4">
                        <SelectTrigger className="main-input">
                          <SelectValue
                            placeholder={t(
                              "SCHOLARSHIP-FORM.FIELD.FIELD-10.placeholder"
                            )}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="max-h-72 overflow-y-auto">
                        {!isLoadingDistricts && (
                          <div className="p-1 flex items-center justify-center">
                            Loading...
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

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="village"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="main-label">
                      {t("SCHOLARSHIP-FORM.FIELD.FIELD-11.label")}
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="mt-2 lg:mt-4">
                        <SelectTrigger className="main-input">
                          <SelectValue
                            placeholder={t(
                              "SCHOLARSHIP-FORM.FIELD.FIELD-11.placeholder"
                            )}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="max-h-72 overflow-y-auto">
                        {!isLoadingVillages && (
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

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="fullAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="main-label">
                      {t("SCHOLARSHIP-FORM.FIELD.FIELD-12.label")} (*)
                    </FormLabel>
                    <FormControl className="mt-2 lg:mt-4">
                      <Textarea
                        placeholder={t(
                          "SCHOLARSHIP-FORM.FIELD.FIELD-12.placeholder"
                        )}
                        className="main-input resize-none"
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
                name="fatherContact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="main-label">
                      {t("SCHOLARSHIP-FORM.FIELD.FIELD-13.label")} (*)
                    </FormLabel>
                    <FormControl className="mt-2 lg:mt-4">
                      <Input
                        className="main-input"
                        placeholder={t(
                          "SCHOLARSHIP-FORM.FIELD.FIELD-13.placeholder"
                        )}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="motherContact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="main-label">
                      {t("SCHOLARSHIP-FORM.FIELD.FIELD-14.label")} (*)
                    </FormLabel>
                    <FormControl className="mt-2 lg:mt-4">
                      <Input
                        className="main-input"
                        placeholder={t(
                          "SCHOLARSHIP-FORM.FIELD.FIELD-14.placeholder"
                        )}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="studyProgramId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="main-label">
                      {t("SCHOLARSHIP-FORM.FIELD.FIELD-15.label")}
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="mt-2 lg:mt-4">
                        <SelectTrigger className="main-input">
                          <SelectValue
                            placeholder={t(
                              "SCHOLARSHIP-FORM.FIELD.FIELD-15.placeholder"
                            )}
                          />
                        </SelectTrigger>
                      </FormControl>
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

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-[19px] lg:gap-[22px] xl:gap-[25px] 2xl:gap-7">
              <FormField
                control={form.control}
                name="currentStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="main-label">
                      {t("SCHOLARSHIP-FORM.FIELD.FIELD-16.label")}
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="mt-2 lg:mt-4">
                        <SelectTrigger className="main-input">
                          <SelectValue
                            placeholder={t(
                              "SCHOLARSHIP-FORM.FIELD.FIELD-16.placeholder"
                            )}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {ACADEMIC_GRADE_ITEMS.map((grade) => (
                          <SelectItem
                            key={grade.id}
                            value={grade.id.toString()}
                          >
                            {grade.label}
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
      </form>
    </Form>
  );
};

export default ScholarshipForm;
