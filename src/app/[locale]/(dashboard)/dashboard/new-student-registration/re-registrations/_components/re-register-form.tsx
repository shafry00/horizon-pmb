"use client";

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
import { getFieldError, getFileNameFromPath } from "@/lib/utils";

import { TActionResult, TStudyProgram } from "@/types";
import { ReRegister } from "@prisma/client";

import { ArrowRight, CirclePlus } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useActionState } from "react";
import { toast } from "sonner";
import { updateReRegister } from "../actions";
import FormModal from "../../../_components/form-modal";
import { Link } from "@/i18n/navigation";
import RequiredIcon from "@/components/icons/required-icon";
import { getDefaultInputValue } from "../../../../../../../lib/utils";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { useDeleteFile, useUploadFile } from "@/features";
import { AxiosError } from "axios";

interface IReRegisterFormProps {
  studyPrograms: TStudyProgram[];
  reRegistrationById?: ReRegister;
  functionType?: "edit" | "detail";
}

const ReRegisterForm: React.FC<IReRegisterFormProps> = (props) => {
  const { studyPrograms, reRegistrationById, functionType = "edit" } = props;

  const isDisabled = functionType === "detail";
  const { mutate: uploadFileMutation, isPending: isUploading } =
    useUploadFile();
  const { mutate: deleteFileMutation, isPending: isDeleting } = useDeleteFile();
  const initialState = React.useMemo<TActionResult>(
    () => ({
      success: false,
      message: "",
      errors: {},
      inputValues: {
        ...reRegistrationById,
      },
    }),
    [reRegistrationById]
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

  const [state, formAction, isPending] = useActionState(
    async (_prevState: TActionResult, formData: FormData) => {
      if (!reRegistrationById) {
        return {
          success: false,
          message: "Data tidak ditemukan.",
          errors: { _form: ["Data tidak valid."] },
          inputValues: {},
        };
      }

      if (!formData.get("scholarshipLetter") && uploadedPath) {
        formData.set("scholarshipLetter", uploadedPath);
      }

      return await updateReRegister(reRegistrationById.id, formData);
    },
    initialState
  );

  const [, setOpen] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = React.useState<string | null>(null);

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const [uploadedPath, setUploadedPath] = React.useState(
    reRegistrationById?.scholarshipLetter || ""
  );

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

  const t = useTranslations(
    "PAGE.DASHBOARD.RE-REGISTRATION-PAGE.EDIT-PAGE.SECTION.FORM-SECTION.FORM"
  );

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
        setOpen(false);
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
    }
  }, [state, initialState, t]);

  return (
    <FormModal
      title={t("title")}
      description={t("description")}
      dialogContentClassName="max-w-[95%] max-h-[95%] md:max-w-[80%] "
    >
      <form
        action={functionType === "edit" ? formAction : undefined}
        className="overflow-y-auto max-h-[65%] md:max-h-none md:overflow-visible"
      >
        <input type="hidden" name="csrf_token" value={csrfToken} />
        <div className="w-full flex flex-col gap-7 md:gap-[31px] lg:gap-[34px] xl:gap-[37px] 2xl:gap-10 text-black">
          <div className="grid grid-cols-1 gap-7 md:gap-[31px] lg:gap-[34px] xl:gap-[37px] 2xl:gap-10">
            {/*Full Name, Phone Number, Email Field */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 md:gap-[31px] lg:gap-[34px] xl:gap-[37px] 2xl:gap-10">
              {/* Full Name Field  */}
              <div className="flex flex-col gap-1">
                <div className="flex flex-col gap-2 lg:gap-4">
                  <Label
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
                    className={`outline-none ${
                      getFieldError(state, "fullName")
                        ? "secondary-input-error"
                        : "secondary-input"
                    }`}
                    placeholder={t("FIELD.FIELD-1.placeholder")}
                    defaultValue={getDefaultInputValue(
                      state,
                      initialState,
                      "fullName"
                    )}
                    disabled={isDisabled}
                  />
                </div>
                {getFieldError(state, "fullName") && (
                  <p className="text-red-500 text-sm">
                    {getFieldError(state, "fullName")}
                  </p>
                )}
              </div>

              {/* Phone Number Field  */}
              <div className="flex flex-col gap-1">
                <div className="flex flex-col gap-2 lg:gap-4">
                  <Label
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
                    className={`outline-none ${
                      getFieldError(state, "phoneNumber")
                        ? "secondary-input-error"
                        : "secondary-input"
                    }`}
                    placeholder={t("FIELD.FIELD-2.placeholder")}
                    defaultValue={getDefaultInputValue(
                      state,
                      initialState,
                      "phoneNumber"
                    )}
                    disabled={isDisabled}
                  />
                </div>
                {getFieldError(state, "phoneNumber") && (
                  <p className="text-red-500 text-sm">
                    {getFieldError(state, "phoneNumber")}
                  </p>
                )}
              </div>

              {/* Email Field  */}
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
                    className={`outline-none ${
                      getFieldError(state, "email")
                        ? "secondary-input-error"
                        : "secondary-input"
                    }`}
                    placeholder={t("FIELD.FIELD-3.placeholder")}
                    defaultValue={getDefaultInputValue(
                      state,
                      initialState,
                      "email"
                    )}
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

            {/* Study Program, Institution Name Field */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 md:gap-[31px] lg:gap-[34px] xl:gap-[37px] 2xl:gap-10">
              {/* Study Program Field  */}
              <div className="flex flex-col gap-1">
                <div className="flex flex-col gap-2 lg:gap-4">
                  <Label
                    className={
                      getFieldError(state, "studyProgram")
                        ? "secondary-label-error"
                        : "secondary-label"
                    }
                  >
                    {t("FIELD.FIELD-4.label")} <RequiredIcon />
                  </Label>
                  <Select
                    name="studyProgramId"
                    defaultValue={reRegistrationById?.studyProgramId.toString()}
                    disabled={isDisabled}
                  >
                    <SelectTrigger
                      className={
                        getFieldError(state, "studyProgram")
                          ? "secondary-input-error"
                          : "secondary-input"
                      }
                    >
                      <SelectValue
                        placeholder={t("FIELD.FIELD-4.placeholder")}
                      />
                    </SelectTrigger>

                    <SelectContent>
                      {studyPrograms?.map((studyProgram) => (
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
                {getFieldError(state, "studyProgram") && (
                  <p className="text-red-500 text-sm">
                    {getFieldError(state, "studyProgram")}
                  </p>
                )}
              </div>

              {/* Institution Name Field  */}
              <div className="flex flex-col gap-1">
                <div className="flex flex-col gap-2 lg:gap-4">
                  <Label
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
                    className={`outline-none ${
                      getFieldError(state, "institutionName")
                        ? "secondary-input-error"
                        : "secondary-input"
                    }`}
                    placeholder={t("FIELD.FIELD-5.placeholder")}
                    defaultValue={getDefaultInputValue(
                      state,
                      initialState,
                      "institutionName"
                    )}
                    disabled={isDisabled}
                  />
                </div>
                {getFieldError(state, "institutionName") && (
                  <p className="text-red-500 text-sm">
                    {getFieldError(state, "institutionName")}
                  </p>
                )}
              </div>
            </div>

            {/* Scholarship Letter Field  */}
            <div className="flex flex-col gap-1 w-full">
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
                  {t("FIELD.FIELD-6.label")}
                </Label>
                <div
                  className={`w-full cursor-pointer h-20 rounded-[8px] border border-dashed bg-[#FFFDFD] px-4 py-4 flex items-center justify-center gap-3 ${
                    getFieldError(state, "scholarshipLetter")
                      ? "border-red-500"
                      : "border-[#D4D7E3]"
                  }`}
                >
                  {isUploading ? (
                    <div className="text-gray-500 animate-pulse text-sm">
                      ⏳ Mengunggah file...
                    </div>
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
                            onClick={(e) => e.stopPropagation()}
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
                              toast.success(res.message);
                              setFileName("");
                              setUploadedPath("");
                              if (fileInputRef.current) {
                                fileInputRef.current.value = "";
                              }
                            },
                            onError: (err) => {
                              toast.error(
                                `Gagal menghapus file: ${err.message}`
                              );
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
                        {t("FIELD.FIELD-6.placeholder")}
                      </span>
                    </>
                  )}
                </div>

                {/* Input hidden untuk scholarshipLetter */}
                <input
                  type="hidden"
                  name="scholarshipLetter"
                  value={uploadedPath}
                />
                {/* Input file upload */}
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
          <DialogFooter>
            <div className="items-center md:justify-end flex gap-2">
              <DialogClose asChild>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => setOpen(false)}
                  disabled={isPending}
                  className="bg-primary-foreground cursor-pointer rounded-[8px] w-fit h-full flex items-center gap-[15px]"
                >
                  {t("BUTTON.cancel")}
                  <div className="w-9 aspect-square rounded bg-black flex items-center justify-center">
                    <ArrowRight className="size-6 text-primary-foreground" />
                  </div>
                </Button>
              </DialogClose>
              <Button
                type="submit"
                disabled={isPending}
                className={`rounded-[8px] bg-primary w-fit h-fit flex items-center gap-[15px] ${
                  isPending
                    ? "p-[6px] cursor-wait"
                    : "pl-4 py-[6px] pr-[6px] cursor-pointer"
                }`}
              >
                {isPending ? (
                  <Spinner size={"small"} className="text-white" />
                ) : (
                  <>
                    {t("BUTTON.submit")}
                    <div className="w-9 aspect-square rounded bg-primary-foreground flex items-center justify-center">
                      <ArrowRight className="size-6 text-primary" />
                    </div>
                  </>
                )}
              </Button>
            </div>
          </DialogFooter>
        </div>
      </form>
    </FormModal>
  );
};

export default ReRegisterForm;
