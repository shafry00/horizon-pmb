"use client";

import { createReRegister } from "../actions";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { useDeleteFile, useUploadFile } from "@/features";
import { getFieldError, getInputValue } from "@/lib/utils";

import { TActionResult, TStudyProgram } from "@/types";
import { AxiosError } from "axios";

import { ArrowRight, CirclePlus, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useActionState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "sonner";

const initialState: TActionResult = {
  success: false,
  message: "",
  errors: {},
  inputValues: {},
};

interface IReRegisterFormProps {
  studyPrograms: TStudyProgram[];
}

const ReRegisterForm: React.FC<IReRegisterFormProps> = (props) => {
  const { studyPrograms } = props;
  const [state, formAction, isPending] = useActionState(
    createReRegister,
    initialState
  );

  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = React.useState<string | null>(null);
  const [selectedStudyProgramId, setSelectedStudyProgramId] =
    React.useState<string>("");
  const [captchaToken, setCaptchaToken] = React.useState<string | null>(null);
  const recaptchaRef = React.useRef<ReCAPTCHA | null>(null);
  const [csrfToken, setCsrfToken] = React.useState("");
  const { mutate: uploadFileMutation, isPending: isUploading } =
    useUploadFile();
  const { mutate: deleteFileMutation, isPending: isDeleting } = useDeleteFile();
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

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const [uploadedPath, setUploadedPath] = React.useState("");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("csrf_token", csrfToken);

    uploadFileMutation(file, {
      onSuccess: (data) => {
        setUploadedPath(data.data.url);
        toast.success(" File berhasil diupload", {
          style: {
            backgroundColor: "#D1FAE5",
            border: "1px solid #10B981",
            color: "#065F46",
            fontWeight: "bold",
          },
        });
      },
      onError: (err) => {
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

        setFileName(null);
        setUploadedPath("");
      },
    });
  };

  const t = useTranslations("PAGE.RE-REGISTER-PAGE.SECTION.FORM-SECTION.FORM");

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
        });
        setCaptchaToken(null);
        recaptchaRef.current?.reset();
      } else if (state.message) {
        toast.error(state.message || t("RESPONSE.error"), {
          style: {
            backgroundColor: "#FECACA",
            border: "1px solid #FCA5A5",
            color: "#7F1D1D",
            fontWeight: "bold",
          },
        });
      }

      setFileName(null);
      setUploadedPath("");
      setSelectedStudyProgramId("");
    }
  }, [state, t]);

  return (
    <form action={formAction}>
      <input type="hidden" name="csrf_token" value={csrfToken} />
      <input type="hidden" name="captcha_token" value={captchaToken || ""} />
      <div className="w-full flex flex-col gap-7 md:gap-[31px] lg:gap-[34px] xl:gap-[37px] 2xl:gap-10 text-black">
        <div className="grid grid-cols-1 gap-7 md:gap-[31px] lg:gap-[34px] xl:gap-[37px] 2xl:gap-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 md:gap-[31px] lg:gap-[34px] xl:gap-[37px] 2xl:gap-10">
            <div className="flex flex-col gap-1">
              <div className="flex flex-col gap-2 lg:gap-4">
                <Label className="main-label">
                  {t("FIELD.FIELD-1.label")} (*)
                </Label>
                <Input
                  name="fullName"
                  id="fullName"
                  className="main-input outline-none"
                  placeholder={t("FIELD.FIELD-1.placeholder")}
                  defaultValue={getInputValue(state, "fullName")}
                />
              </div>
              {getFieldError(state, "fullName") && (
                <p className="text-red-500 text-sm">
                  {getFieldError(state, "fullName")}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex flex-col gap-2 lg:gap-4">
                <Label className="main-label">
                  {t("FIELD.FIELD-2.label")} (*)
                </Label>
                <Input
                  name="phoneNumber"
                  id="phoneNumber"
                  className="main-input outline-none"
                  placeholder={t("FIELD.FIELD-2.placeholder")}
                  defaultValue={getInputValue(state, "phoneNumber")}
                />
              </div>
              {getFieldError(state, "phoneNumber") && (
                <p className="text-red-500 text-sm">
                  {getFieldError(state, "phoneNumber")}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex flex-col gap-2 lg:gap-4">
                <Label className="main-label">
                  {t("FIELD.FIELD-3.label")} (*)
                </Label>
                <Input
                  name="email"
                  id="email"
                  className="main-input outline-none"
                  placeholder={t("FIELD.FIELD-3.placeholder")}
                  defaultValue={getInputValue(state, "email")}
                />
              </div>
              {getFieldError(state, "email") && (
                <p className="text-red-500 text-sm">
                  {getFieldError(state, "email")}
                </p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 md:gap-[31px] lg:gap-[34px] xl:gap-[37px] 2xl:gap-10">
            <div className="flex flex-col gap-1">
              <div className="flex flex-col gap-2 lg:gap-4">
                <Label className="main-label">
                  {t("FIELD.FIELD-4.label")} (*)
                </Label>
                <Select
                  name="studyProgramId"
                  value={selectedStudyProgramId}
                  onValueChange={(value) => setSelectedStudyProgramId(value)}
                >
                  <SelectTrigger className="main-input">
                    <SelectValue placeholder={t("FIELD.FIELD-4.placeholder")} />
                  </SelectTrigger>

                  <SelectContent className="max-h-72 overflow-y-auto">
                    {studyPrograms?.map((studyProgram) => (
                      <SelectItem
                        key={studyProgram.id}
                        value={studyProgram.id.toString()}
                      >
                        {studyProgram.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {getFieldError(state, "studyProgram") && (
                <p className="text-red-500 text-sm">
                  {getFieldError(state, "studyProgram")}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex flex-col gap-2 lg:gap-4">
                <Label className="main-label">
                  {t("FIELD.FIELD-5.label")} (*)
                </Label>
                <Input
                  name="institutionName"
                  id="institutionName"
                  className="main-input outline-none"
                  placeholder={t("FIELD.FIELD-5.placeholder")}
                  defaultValue={getInputValue(state, "institutionName")}
                />
              </div>
              {getFieldError(state, "institutionName") && (
                <p className="text-red-500 text-sm">
                  {getFieldError(state, "institutionName")}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div
              onClick={handleFileClick}
              className="flex flex-col gap-2 lg:gap-4"
            >
              <Label className="main-label">{t("FIELD.FIELD-6.label")}</Label>
              <div className="cursor-pointer h-20 rounded-[8px] border border-solid bg-[#FFFDFD] border-[#D4D7E3] px-4 py-4 flex items-center justify-center gap-3">
                {isUploading ? (
                  <span className="text-gray-500 text-sm animate-pulse">
                    Uploading file...
                  </span>
                ) : fileName ? (
                  <>
                    <Button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!fileName) return;

                        const filename = decodeURIComponent(
                          uploadedPath.split("/").pop() || ""
                        );

                        deleteFileMutation(filename, {
                          onSuccess: (res) => {
                            toast.success(res.message);
                            setFileName("");
                            setUploadedPath("");
                            if (fileInputRef.current) {
                              fileInputRef.current.value = "";
                            }
                          },
                          onError: (err) => {
                            toast.error(`Gagal menghapus file: ${err.message}`);
                          },
                        });
                      }}
                      disabled={isDeleting}
                      className="text-red-500 bg-transparent cursor-pointer hover:bg-transparent border-none shadow-none"
                    >
                      {isDeleting ? (
                        <Spinner className="text-red-500" />
                      ) : (
                        <Trash2 />
                      )}
                    </Button>
                    <span className="truncate">{fileName}</span>
                  </>
                ) : (
                  <>
                    <CirclePlus className="text-gray-500" />
                    <span className="text-gray-500">
                      {t("FIELD.FIELD-6.placeholder")}
                    </span>
                  </>
                )}
              </div>
              <input
                type="hidden"
                name="scholarshipLetter"
                value={uploadedPath}
              />
              <input
                ref={fileInputRef}
                id="scholarshipLetter"
                name="scholarshipLetter"
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
            {getFieldError(state, "scholarshipLetter") && (
              <p className="text-red-500 text-sm">
                {getFieldError(state, "scholarshipLetter")}
              </p>
            )}
          </div>
        </div>
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
          onChange={(token) => setCaptchaToken(token)}
        />
        <Button
          disabled={isPending}
          className="cursor-pointer text-primary-foreground capitalize w-fit rounded-[8px] bg-primary border-primary border flex items-center justify-center h-full gap-4 py-[6px] pr-[6px] pl-4"
        >
          {isPending ? <Spinner className="text-white" /> : t("BUTTON.SUBMIT")}{" "}
          <span className="w-9 aspect-square flex items-center justify-center bg-primary-foreground rounded">
            <ArrowRight className="size-6 text-primary" />
          </span>
        </Button>
      </div>
    </form>
  );
};

export default ReRegisterForm;
