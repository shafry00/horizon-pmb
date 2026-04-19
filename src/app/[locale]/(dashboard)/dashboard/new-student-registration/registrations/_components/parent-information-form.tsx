"use client";

import RequiredIcon from "@/components/icons/required-icon";
import { Button } from "@/components/ui/button";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  REASON_TO_CHOOSE_HORIZON_U_ITEMS,
  SOURCE_INFORMATION_ABOUT_HORIZON_U_ITEMS,
} from "@/constants";
import {
  getContentByLocale,
  getDefaultInputValue,
  getFieldError,
  getFileNameFromPath,
  getInputValue,
} from "@/lib/utils";
import { TActionResult, TNewStudentRegistrationDetail } from "@/types";
import { ArrowRight, CirclePlus } from "lucide-react";
import { useTranslations } from "next-intl";
import * as React from "react";
import { updateParentInformationById } from "../actions";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import Link from "next/link";
import { useDeleteFile, useUploadFile } from "@/features";
import { AxiosError } from "axios";

interface IParentInformationFormProps {
  registration: TNewStudentRegistrationDetail;
  locale: string;
  functionType?: string;
}

const ParentInformationForm: React.FC<IParentInformationFormProps> = (
  props
) => {
  const { registration, locale, functionType = "edit" } = props;

  const isDisabled = functionType === "detail";
  const { mutate: uploadFileMutation, isPending: isUploading } =
    useUploadFile();
  const { mutate: deleteFileMutation, isPending: isDeleting } = useDeleteFile();
  const t = useTranslations(
    "PAGE.DASHBOARD.REGISTRATION-PAGE.EDIT-PAGE.SECTION.FORM-SECTION.FORM"
  );

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

  const [fileName, setFileName] = React.useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const [uploadedPath, setUploadedPath] = React.useState(
    registration?.scholarshipLetter || ""
  );
  const [csrfToken, setCsrfToken] = React.useState("");

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

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);

    uploadFileMutation(file, {
      onSuccess: (data) => {
        setUploadedPath(data.data.url);
        toast.success("File berhasil diupload", {
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
        toast.error(`Upload gagal: ${message}`, {
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

  const [state, formAction, isPending] = React.useActionState(
    async (
      _prevState: TActionResult,
      formData: FormData
    ): Promise<TActionResult> => {
      return await updateParentInformationById(registration.id, formData);
    },
    initialState
  );
  const formRef = React.useRef<HTMLFormElement>(null);
  const [isDirty, setIsDirty] = React.useState(false);

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
        toast.success(t("PARENT-INFORMATION-FORM.RESPONSE.success"), {
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
          state.message || t("PARENT-INFORMATION-FORM.RESPONSE.error"),
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
      <input type="hidden" name="csrf_token" value={csrfToken} />
      <Card>
        <CardHeader>
          <CardTitle> {t("PARENT-INFORMATION-FORM.title")}</CardTitle>
          <CardDescription>
            {t("PARENT-INFORMATION-FORM.description")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-2 lg:gap-4">
            {/* Father Information Fields*/}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-4">
              {/* Father Name Field */}
              <div className="flex flex-col gap-1">
                <div className="flex flex-col gap-2 lg:gap-4">
                  <Label
                    className={`${
                      getFieldError(state, "fatherName")
                        ? "secondary-label-error"
                        : "secondary-label"
                    }`}
                  >
                    {t("PARENT-INFORMATION-FORM.FIELD.FIELD-1.label")}{" "}
                    <RequiredIcon />
                  </Label>

                  <Input
                    name="fatherName"
                    id="fatherName"
                    className={
                      getFieldError(state, "fatherName")
                        ? "secondary-input-error"
                        : "secondary-input"
                    }
                    placeholder={t(
                      "PARENT-INFORMATION-FORM.FIELD.FIELD-1.placeholder"
                    )}
                    defaultValue={getDefaultInputValue(
                      state,
                      initialState,
                      "fatherName"
                    )}
                    onChange={() => !isDisabled && setIsDirty(true)}
                    disabled={isDisabled}
                  />
                </div>
                {getFieldError(state, "fatherName") && (
                  <p className="text-red-500 text-sm">
                    {getFieldError(state, "fatherName")}
                  </p>
                )}
              </div>

              {/* Father Occupation Fields */}
              <div className="flex flex-col gap-1">
                <div className="flex flex-col gap-2 lg:gap-4">
                  <Label
                    className={
                      getFieldError(state, "fatherOccupation")
                        ? "secondary-label-error"
                        : "secondary-label"
                    }
                  >
                    {t("PARENT-INFORMATION-FORM.FIELD.FIELD-2.label")}{" "}
                    <RequiredIcon />
                  </Label>

                  <Input
                    name="fatherOccupation"
                    id="fatherOccupation"
                    className="secondary-input"
                    placeholder={t(
                      "PARENT-INFORMATION-FORM.FIELD.FIELD-2.placeholder"
                    )}
                    defaultValue={
                      getInputValue(state, "fatherOccupation") ||
                      registration.fatherOccupation
                    }
                    onChange={() => !isDisabled && setIsDirty(true)}
                    disabled={isDisabled}
                  />
                </div>
                {getFieldError(state, "fatherOccupation") && (
                  <p className="text-red-500 text-sm">
                    {getFieldError(state, "fatherOccupation")}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex flex-col gap-2 lg:gap-4">
                  <Label
                    className={
                      getFieldError(state, "fatherContact")
                        ? "secondary-label-error"
                        : "secondary-label"
                    }
                  >
                    {t("PARENT-INFORMATION-FORM.FIELD.FIELD-3.label")}{" "}
                    <RequiredIcon />
                  </Label>

                  <Input
                    name="fatherContact"
                    id="fatherContact"
                    className={
                      getFieldError(state, "fatherContact")
                        ? "secondary-input-error"
                        : "secondary-input"
                    }
                    placeholder={t(
                      "PARENT-INFORMATION-FORM.FIELD.FIELD-3.placeholder"
                    )}
                    defaultValue={getDefaultInputValue(
                      state,
                      initialState,
                      "fatherContact"
                    )}
                    onChange={() => !isDisabled && setIsDirty(true)}
                    disabled={isDisabled}
                  />
                </div>
                {getFieldError(state, "fatherContact") && (
                  <p className="text-red-500 text-sm">
                    {getFieldError(state, "fatherContact")}
                  </p>
                )}
              </div>
            </div>

            {/* Mother Information Fields */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-4">
              {/* Mother Name Field */}
              <div className="flex flex-col gap-1">
                <div className="flex flex-col gap-2 lg:gap-4">
                  <Label
                    className={
                      getFieldError(state, "motherName")
                        ? "secondary-label-error"
                        : "secondary-label"
                    }
                  >
                    {t("PARENT-INFORMATION-FORM.FIELD.FIELD-4.label")}{" "}
                    <RequiredIcon />
                  </Label>

                  <Input
                    name="motherName"
                    id="motherName"
                    className={
                      getFieldError(state, "motherName")
                        ? "secondary-input-error"
                        : "secondary-input"
                    }
                    placeholder={t(
                      "PARENT-INFORMATION-FORM.FIELD.FIELD-4.placeholder"
                    )}
                    defaultValue={getDefaultInputValue(
                      state,
                      initialState,
                      "motherName"
                    )}
                    onChange={() => !isDisabled && setIsDirty(true)}
                    disabled={isDisabled}
                  />
                </div>
                {getFieldError(state, "motherName") && (
                  <p className="text-red-500 text-sm">
                    {getFieldError(state, "motherName")}
                  </p>
                )}
              </div>

              {/* Mother Occupation Field */}
              <div className="flex flex-col gap-1">
                <div className="flex flex-col gap-2 lg:gap-4">
                  <Label
                    className={
                      getFieldError(state, "motherOccupation")
                        ? "secondary-label-error"
                        : "secondary-label"
                    }
                  >
                    {t("PARENT-INFORMATION-FORM.FIELD.FIELD-5.label")}{" "}
                    <RequiredIcon />
                  </Label>

                  <Input
                    name="motherOccupation"
                    id="motherOccupation"
                    className={
                      getFieldError(state, "motherOccupation")
                        ? "secondary-input-error"
                        : "secondary-input"
                    }
                    placeholder={t(
                      "PARENT-INFORMATION-FORM.FIELD.FIELD-5.placeholder"
                    )}
                    defaultValue={getDefaultInputValue(
                      state,
                      initialState,
                      "motherOccupation"
                    )}
                    onChange={() => !isDisabled && setIsDirty(true)}
                    disabled={isDisabled}
                  />
                </div>
                {getFieldError(state, "motherOccupation") && (
                  <p className="text-red-500 text-sm">
                    {getFieldError(state, "motherOccupation")}
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
                    {t("PARENT-INFORMATION-FORM.FIELD.FIELD-6.label")}{" "}
                    <RequiredIcon />
                  </Label>

                  <Input
                    name="motherContact"
                    id="motherContact"
                    className={
                      getFieldError(state, "motherContact")
                        ? "secondary-input-error"
                        : "secondary-input"
                    }
                    placeholder={t(
                      "PARENT-INFORMATION-FORM.FIELD.FIELD-6.placeholder"
                    )}
                    defaultValue={getDefaultInputValue(
                      state,
                      initialState,
                      "motherContact"
                    )}
                    onChange={() => !isDisabled && setIsDirty(true)}
                    disabled={isDisabled}
                  />
                </div>
                {getFieldError(state, "motherContact") && (
                  <p className="text-red-500 text-sm">
                    {getFieldError(state, "motherContact")}
                  </p>
                )}
              </div>
            </div>

            {/* General Questions Fields */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="flex flex-col gap-1">
                <div className="flex flex-col gap-2 lg:gap-4">
                  <Label
                    className={`min-h-12 ${
                      getFieldError(state, "sourceInfoOfHorizonU")
                        ? "secondary-label-error"
                        : "secondary-label"
                    }`}
                  >
                    {t("PARENT-INFORMATION-FORM.FIELD.FIELD-7.label")}{" "}
                    <RequiredIcon />
                  </Label>
                  <Select
                    name="sourceInfoOfHorizonU"
                    defaultValue={
                      getInputValue(state, "sourceInfoOfHorizonU") ||
                      registration.sourceInfoOfHorizonU
                    }
                    onValueChange={() => !isDisabled && setIsDirty(true)}
                    disabled={isDisabled}
                  >
                    <SelectTrigger
                      className={
                        getFieldError(state, "sourceInfoOfHorizonU")
                          ? "secondary-input-error"
                          : "secondary-input"
                      }
                    >
                      <SelectValue
                        placeholder={t(
                          "PARENT-INFORMATION-FORM.FIELD.FIELD-7.placeholder"
                        )}
                      />
                    </SelectTrigger>
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
                </div>
                {getFieldError(state, "sourceInfoOfHorizonU") && (
                  <p className="text-red-500 text-sm">
                    {getFieldError(state, "sourceInfoOfHorizonU")}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex flex-col gap-2 lg:gap-4">
                  <Label
                    className={`min-h-12 ${
                      getFieldError(state, "reasonChooseHorizonU")
                        ? "secondary-label-error"
                        : "secondary-label"
                    }`}
                  >
                    {t("PARENT-INFORMATION-FORM.FIELD.FIELD-8.label")}{" "}
                    <RequiredIcon />
                  </Label>
                  <Select
                    name="reasonChooseHorizonU"
                    defaultValue={
                      getInputValue(state, "reasonChooseHorizonU") ||
                      registration.reasonChooseHorizonU
                    }
                    onValueChange={() => !isDisabled && setIsDirty(true)}
                    disabled={isDisabled}
                  >
                    <SelectTrigger
                      className={
                        getFieldError(state, "reasonChooseHorizonU")
                          ? "secondary-input-error"
                          : "secondary-input"
                      }
                    >
                      <SelectValue
                        placeholder={t(
                          "PARENT-INFORMATION-FORM.FIELD.FIELD-8.placeholder"
                        )}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {REASON_TO_CHOOSE_HORIZON_U_ITEMS.map((reasonChoose) => (
                        <SelectItem
                          key={`${reasonChoose.id}-${reasonChoose.value}`}
                          value={reasonChoose.value}
                        >
                          {getContentByLocale({
                            locale,
                            enContent: reasonChoose.label_en,
                            idContent: reasonChoose.label_id,
                          })}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {getFieldError(state, "reasonChooseHorizonU") && (
                  <p className="text-red-500 text-sm">
                    {getFieldError(state, "reasonChooseHorizonU")}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex flex-col gap-2 lg:gap-4">
                  <Label
                    className={`min-h-12 ${
                      getFieldError(state, "ambassadorName")
                        ? "secondary-label-error"
                        : "secondary-label"
                    }`}
                  >
                    {t("PARENT-INFORMATION-FORM.FIELD.FIELD-9.label")}{" "}
                  </Label>

                  <Input
                    name="ambassadorName"
                    id="ambassadorName"
                    className={
                      getFieldError(state, "ambassadorName")
                        ? "secondary-input-error"
                        : "secondary-input"
                    }
                    placeholder={t(
                      "PARENT-INFORMATION-FORM.FIELD.FIELD-9.placeholder"
                    )}
                    defaultValue={getDefaultInputValue(
                      state,
                      initialState,
                      "ambassadorName"
                    )}
                    onChange={() => !isDisabled && setIsDirty(true)}
                    disabled={isDisabled}
                  />
                </div>
                {getFieldError(state, "ambassadorName") && (
                  <p className="text-red-500 text-sm">
                    {getFieldError(state, "ambassadorName")}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div
                onClick={isDisabled ? () => {} : handleFileClick}
                className={`flex flex-col items-start w-full gap-2 lg:gap-4 ${
                  isDisabled ? "!cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                <Label
                  className={
                    getFieldError(state, "scholarshipLetter")
                      ? "secondary-label-error"
                      : "secondary-label"
                  }
                >
                  {t("PARENT-INFORMATION-FORM.FIELD.FIELD-10.label")}{" "}
                </Label>
                <div
                  className={`w-full cursor-pointer h-20 rounded-[8px] border border-dashed bg-[#FFFDFD] px-4 py-4 flex items-center justify-center gap-3 ${
                    getFieldError(state, "scholarshipLetter")
                      ? "border-red-500"
                      : "border-[#D4D7E3]"
                  }`}
                >
                  {isUploading ? (
                    <span className="text-gray-500 text-sm animate-pulse">
                      ⏳ Uploading file...
                    </span>
                  ) : fileName || uploadedPath ? (
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex items-center gap-2">
                        <span className="truncate">
                          {fileName || getFileNameFromPath(uploadedPath)}
                        </span>
                        {uploadedPath && (
                          <Link
                            href={uploadedPath}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 text-sm underline"
                            onClick={(e) => e.stopPropagation()} // <- penting agar tidak trigger input file
                          >
                            Lihat
                          </Link>
                        )}
                      </div>

                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="text-xs py-1 px-2 h-auto"
                        onClick={(e) => {
                          e.stopPropagation();
                          const filename = uploadedPath?.split("/").pop();
                          if (!filename) return;

                          deleteFileMutation(filename, {
                            onSuccess: (res) => {
                              toast.success(`🗑️ ${res.message}`);
                              setFileName(null);
                              setUploadedPath("");
                              if (fileInputRef.current) {
                                fileInputRef.current.value = "";
                              }
                            },
                            onError: (err) => {
                              const axiosErr = err as AxiosError<{
                                errors: { message: string }[];
                              }>;
                              const message =
                                axiosErr.response?.data?.errors?.[0]?.message ||
                                axiosErr.message;
                              toast.error(`❌ ${message}`);
                            },
                          });
                        }}
                        disabled={isDisabled || isDeleting}
                      >
                        {isDeleting ? "Menghapus..." : "Hapus File"}
                      </Button>
                    </div>
                  ) : (
                    <>
                      <CirclePlus className="text-gray-500" />
                      <span className="text-gray-500">
                        {t(
                          "PARENT-INFORMATION-FORM.FIELD.FIELD-10.placeholder"
                        )}
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
                  disabled={isDisabled}
                />
              </div>

              {getFieldError(state, "scholarshipLetter") && (
                <p className="text-red-500 text-sm">
                  {getFieldError(state, "scholarshipLetter")}
                </p>
              )}
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

export default ParentInformationForm;
