/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

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

import { zodResolver } from "@hookform/resolvers/zod";

import { useTranslations } from "next-intl";
import React from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePMBStore } from "@/stores/use-pmb-store";
import { parentInformationSchema } from "@/lib/schema";
import { CirclePlus } from "lucide-react";
import {
  REASON_TO_CHOOSE_HORIZON_U_ITEMS,
  SOURCE_INFORMATION_ABOUT_HORIZON_U_ITEMS,
} from "@/constants";
import { getContentByLocale } from "@/lib/utils";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useDeleteFile, useUploadFile } from "@/features";
import { AxiosError } from "axios";

type FormData = z.infer<typeof parentInformationSchema>;

interface IParentInformationFormProps {
  formRef?: React.MutableRefObject<any>;
  locale: string;
}

const ParentInformationForm: React.FC<IParentInformationFormProps> = (
  props
) => {
  const { formRef, locale } = props;
  const t = useTranslations(
    "PAGE.PMB-PAGE.SECTION.FORM-SECTION.FORM.PARENT-INFORMATION-FORM"
  );
  const { formData } = usePMBStore();
  const [csrfToken, setCsrfToken] = React.useState("");
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const { mutate: uploadFileMutation, isPending: isUploading } =
    useUploadFile();
  const { mutate: deleteFileMutation, isPending: isDeleting } = useDeleteFile();
  const form = useForm<FormData>({
    resolver: zodResolver(parentInformationSchema),
    defaultValues: {
      fatherName: formData.parentInformation.fatherName,
      fatherOccupation: formData.parentInformation.fatherOccupation,
      fatherContact: formData.parentInformation.fatherContact,
      motherName: formData.parentInformation.motherName,
      motherOccupation: formData.parentInformation.motherOccupation,
      motherContact: formData.parentInformation.motherContact,
      sourceInfoOfHorizonU: formData.parentInformation.sourceInfoOfHorizonU,
      reasonChooseHorizonU: formData.parentInformation.reasonChooseHorizonU,
      ambassadorName: formData.parentInformation.ambassadorName,
      scholarshipLetter: formData.parentInformation.scholarshipLetter,
    },
    mode: "onBlur",
  });

  const handleFileUpload = (file: File, onChange: (url: string) => void) => {
    uploadFileMutation(file, {
      onSuccess: (data) => {
        toast.success(" File berhasil diupload", {
          style: {
            backgroundColor: "#D1FAE5",
            border: "1px solid #10B981",
            color: "#065F46",
            fontWeight: "bold",
          },
        });
        onChange(data.data.url);
      },
      onError: (err: any) => {
        const axiosErr = err as AxiosError<{ errors: { message: string }[] }>;
        const message =
          axiosErr.response?.data?.errors?.[0]?.message || axiosErr.message;
        toast.error(` Upload gagal: ${message}`, {
          style: {
            backgroundColor: "#FECACA",
            border: "1px solid #F87171",
            color: "#7F1D1D",
            fontWeight: "bold",
          },
        });
      },
    });
  };

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

  React.useEffect(() => {
    const getCsrfToken = async () => {
      try {
        const res = await fetch("/api/csrf");
        const data = await res.json();
        setCsrfToken(data.token);
      } catch (error) {
        console.error("Gagal mengambil CSRF token", error);
      }
    };

    getCsrfToken();
  }, []);

  return (
    <Form {...form}>
      <input type="hidden" name="csrf_token" value={csrfToken} />
      <div className="flex flex-col gap-7 md:gap-[31px] lg:gap-[34px] xl:ga-[37px] 2xl:gap-10">
        <div className="grid grid-cols-1 gap-4 md:gap-[19px] lg:gap-[22px] xl:gap-[25px] 2xl:gap-7">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-[19px] lg:gap-[22px] xl:gap-[25px] 2xl:gap-7">
            <FormField
              control={form.control}
              name="fatherName"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="main-label">
                    {t("FIELD.FIELD-1.label")} (*)
                  </FormLabel>
                  <FormControl className="mt-2 lg:mt-4">
                    <Input
                      className="main-input"
                      placeholder={t("FIELD.FIELD-1.placeholder")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fatherOccupation"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="main-label">
                    {t("FIELD.FIELD-2.label")} (*)
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
              name="fatherContact"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="main-label">
                    {t("FIELD.FIELD-3.label")} (*)
                  </FormLabel>
                  <FormControl className="mt-2 lg:mt-4">
                    <Input
                      className="main-input"
                      placeholder={t("FIELD.FIELD-3.placeholder")}
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
              name="motherName"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="main-label">
                    {t("FIELD.FIELD-4.label")} (*)
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
              name="motherOccupation"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="main-label">
                    {t("FIELD.FIELD-5.label")} (*)
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
              name="motherContact"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="main-label">
                    {t("FIELD.FIELD-6.label")} (*)
                  </FormLabel>
                  <FormControl className="mt-2 lg:mt-4">
                    <Input
                      className="main-input"
                      placeholder={t("FIELD.FIELD-6.placeholder")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className=" grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-[19px] lg:gap-[22px] xl:gap-[25px] 2xl:gap-7">
            <FormField
              control={form.control}
              name="sourceInfoOfHorizonU"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-black main-label">
                    {t("FIELD.FIELD-7.label")} (*)
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
                      {SOURCE_INFORMATION_ABOUT_HORIZON_U_ITEMS.map(
                        (sourceInfo) => (
                          <SelectItem
                            key={`${sourceInfo.id}-${sourceInfo.value}`}
                            value={sourceInfo.value}
                          >
                            {getContentByLocale({
                              locale,
                              enContent: sourceInfo.label_en,
                              idContent: sourceInfo.label_id,
                            })}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="reasonChooseHorizonU"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-black main-label">
                    {t("FIELD.FIELD-8.label")} (*)
                  </FormLabel>
                  <Select
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    <FormControl className="mt-2 lg:mt-4">
                      <SelectTrigger className="main-input">
                        <SelectValue
                          placeholder={t("FIELD.FIELD-8.placeholder")}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {REASON_TO_CHOOSE_HORIZON_U_ITEMS.map((reason) => (
                        <SelectItem
                          key={`${reason.id}-${reason.value}`}
                          value={reason.value}
                        >
                          {getContentByLocale({
                            locale,
                            enContent: reason.label_en,
                            idContent: reason.label_id,
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
              name="ambassadorName"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="main-label">
                    {t("FIELD.FIELD-9.label")}
                  </FormLabel>
                  <FormControl className="mt-2 lg:mt-4">
                    <Input
                      placeholder={t("FIELD.FIELD-9.placeholder")}
                      className="main-input resize-none"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="scholarshipLetter"
            render={({ field: { onChange, value, ...rest } }) => (
              <FormItem>
                <FormLabel className="main-label">
                  {t("FIELD.FIELD-10.label")}
                </FormLabel>
                <FormControl className="mt-2 lg:mt-4">
                  <div>
                    <label htmlFor="scholarshipLetter">
                      <div className="cursor-pointer border-dashed h-20 rounded-[8px] border bg-[#FFFDFD] border-[#D4D7E3] px-4 py-4 flex items-center justify-center gap-3">
                        {isUploading ? (
                          <span className="text-sm text-gray-500 animate-pulse">
                            ⏳ Sedang mengunggah file...
                          </span>
                        ) : value && typeof value === "string" ? (
                          <span>{value.split("/").pop()}</span>
                        ) : (
                          <>
                            <CirclePlus />
                            <span>{t("FIELD.FIELD-10.placeholder")}</span>
                          </>
                        )}
                      </div>
                    </label>

                    <Input
                      id="scholarshipLetter"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          await handleFileUpload(file, onChange);
                          e.target.value = "";
                        }
                      }}
                      ref={(el) => {
                        fileInputRef.current = el;

                        if (typeof rest.ref === "function") {
                          rest.ref(el);
                        } else if (rest.ref) {
                          (
                            rest.ref as React.MutableRefObject<HTMLInputElement | null>
                          ).current = el;
                        }
                      }}
                    />

                    {value && typeof value === "string" && (
                      <div className="mt-2 lg:mt-4 text-right">
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="text-xs cursor-pointer"
                          disabled={isDeleting}
                          onClick={() => {
                            const filename = value?.split("/").pop();
                            if (!filename) return;

                            deleteFileMutation(filename, {
                              onSuccess: (res) => {
                                toast.success(`🗑️ ${res.message}`);
                                onChange("");
                                if (fileInputRef.current?.value) {
                                  fileInputRef.current.value = "";
                                }
                              },
                              onError: (err: any) => {
                                const msg =
                                  err?.response?.data?.errors?.[0]?.message ||
                                  err.message ||
                                  "Gagal hapus file";
                                toast.error(`❌ ${msg}`);
                              },
                            });
                          }}
                        >
                          {isDeleting ? "Menghapus..." : "Hapus file"}
                        </Button>
                      </div>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
                <FormDescription className="text-[10px] leading-[14px] italic lg:text-[14px] lg:leading-[18px] text-primary">
                  {t("FIELD.FIELD-10.description")}
                </FormDescription>
              </FormItem>
            )}
          />
        </div>
      </div>
    </Form>
  );
};

export default ParentInformationForm;
