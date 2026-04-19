"use client";

import * as React from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import "react-phone-number-input/style.css";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  getContentByLocale,
  getDefaultInputValue,
  getFieldError,
} from "@/lib/utils";
import { TActionResult, TConsultationDetail } from "@/types";
import { toast } from "sonner";
import { RELATIONSHIP_WITH_REGISTRANT_ITEMS } from "@/constants";
import { Spinner } from "@/components/ui/spinner";
import { updateConsultationById } from "../actions";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import FormModal from "../../../_components/form-modal";
import RequiredIcon from "@/components/icons/required-icon";

interface IConsultationFormProps {
  locale: string;
  consultationById: TConsultationDetail;
  page: "edit" | "detail";
}

const ConsultationForm: React.FC<IConsultationFormProps> = (props) => {
  const { locale, consultationById, page = "edit" } = props;
  const t = useTranslations(
    page === "edit"
      ? "PAGE.DASHBOARD.CONSULTATION-PAGE.EDIT-PAGE.SECTION.FORM-SECTION"
      : "PAGE.DASHBOARD.CONSULTATION-PAGE.DETAIL-PAGE.SECTION.FORM-SECTION"
  );
  const [, setOpen] = React.useState(false);

  const formRef = React.useRef<HTMLFormElement>(null);

  const initialState = React.useMemo<TActionResult>(
    () => ({
      success: false,
      message: "",
      errors: {},
      inputValues: {
        ...consultationById,
      },
    }),
    [consultationById]
  );

  const [state, formAction, isPending] = React.useActionState(
    async (
      _prevState: TActionResult,
      formData: FormData
    ): Promise<TActionResult> => {
      return await updateConsultationById(consultationById.id, formData);
    },
    initialState
  );

  const [phoneNumber, setPhoneNumber] = React.useState<string | undefined>(
    getDefaultInputValue(state, initialState, "phoneNumber")
  );

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
        toast.success(t("FORM.RESPONSE.success"), {
          style: {
            backgroundColor: "#34D399",
            border: "1px solid #34D399",
            color: "#ffffff",
            fontWeight: "bold",
          },
        });
        setOpen(false);
        setIsDirty(false);
      } else if (state.message) {
        toast.error(state.message || t("FORM.RESPONSE.error"), {
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

  const isReadOnly = page === "detail";

  return (
    <FormModal
      title={t("title")}
      description={t("description")}
      dialogContentClassName="max-w-[90%] max-h-[90%] lg:max-w-[70%]"
    >
      <form
        ref={formRef}
        action={isReadOnly ? undefined : formAction}
        className="flex flex-col gap-7 max-h-[80%] md:max-h-none overflow-y-auto md:overflow-visible"
      >
        <div className="flex flex-col gap-4 md:gap-[19px] lg:gap-[22px] xl:gap-[25px] 2xl:gap-7">
          {/* Full Name, Email, Relationship with Registrant */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-[19px] lg:gap-[22px] xl:gap-[25px] 2xl:gap-7">
            {/* Full Name */}
            <div className="flex flex-col gap-1">
              <div className="flex flex-col gap-2 lg:gap-4">
                <Label
                  className={
                    getFieldError(state, "fullName")
                      ? "secondary-label-error"
                      : "secondary-label"
                  }
                >
                  {t("FORM.FIELD.FIELD-1.label")} <RequiredIcon />
                </Label>
                <Input
                  name="fullName"
                  id="fullName"
                  className={
                    getFieldError(state, "fullName")
                      ? "secondary-input-error"
                      : "secondary-input"
                  }
                  placeholder={t("FORM.FIELD.FIELD-1.placeholder")}
                  defaultValue={getDefaultInputValue(
                    state,
                    initialState,
                    "fullName"
                  )}
                  disabled={isReadOnly}
                  onChange={() => !isReadOnly && setIsDirty(true)}
                />
              </div>
              {getFieldError(state, "fullName") && (
                <p className="text-red-500 text-sm">
                  {getFieldError(state, "fullName")}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1">
              <div className="flex flex-col gap-2 lg:gap-4">
                <Label
                  className={
                    getFieldError(state, "email")
                      ? "secondary-label-error"
                      : "secondary-label"
                  }
                >
                  {t("FORM.FIELD.FIELD-2.label")} <RequiredIcon />
                </Label>
                <Input
                  name="email"
                  id="email"
                  className={
                    getFieldError(state, "email")
                      ? "secondary-input-error"
                      : "secondary-input"
                  }
                  placeholder={t("FORM.FIELD.FIELD-2.placeholder")}
                  defaultValue={getDefaultInputValue(
                    state,
                    initialState,
                    "email"
                  )}
                  disabled={isReadOnly}
                  onChange={() => !isReadOnly && setIsDirty(true)}
                />
              </div>
              {getFieldError(state, "email") && (
                <p className="text-red-500 text-sm">
                  {getFieldError(state, "email")}
                </p>
              )}
            </div>

            {/* Relationship with Registrant */}
            <div className="flex flex-col gap-1">
              <div className="flex flex-col gap-2 lg:gap-4">
                <Label
                  className={
                    getFieldError(state, "relationshipWithRegistrant")
                      ? "secondary-label-error"
                      : "secondary-label"
                  }
                >
                  {t("FORM.FIELD.FIELD-3.label")} <RequiredIcon />
                </Label>
                <Select
                  name="relationshipWithRegistrant"
                  defaultValue={getDefaultInputValue(
                    state,
                    initialState,
                    "relationshipWithRegistrant"
                  )}
                  onValueChange={() => {
                    if (!isReadOnly) setIsDirty(true);
                  }}
                  disabled={isReadOnly}
                >
                  <SelectTrigger
                    className={
                      getFieldError(state, "relationshipWithRegistrant")
                        ? "secondary-input-error"
                        : "secondary-input"
                    }
                  >
                    <SelectValue
                      placeholder={t("FORM.FIELD.FIELD-3.placeholder")}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {RELATIONSHIP_WITH_REGISTRANT_ITEMS.map((relationship) => (
                      <SelectItem
                        key={`${relationship.id}-${relationship.value}`}
                        value={relationship.value}
                      >
                        {getContentByLocale({
                          locale,
                          enContent: relationship.label_en,
                          idContent: relationship.label_id,
                        })}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {getFieldError(state, "relationshipWithRegistrant") && (
                <p className="text-red-500 text-sm">
                  {getFieldError(state, "relationshipWithRegistrant")}
                </p>
              )}
            </div>
          </div>

          {/* Phone Number, Instagram Username */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-[19px] lg:gap-[22px] xl:gap-[25px] 2xl:gap-7">
            {/* Phone Number */}
            <div className="flex flex-col gap-1">
              <div className="flex flex-col gap-2 lg:gap-4">
                <Label
                  className={
                    getFieldError(state, "phoneNumber")
                      ? "secondary-label-error"
                      : "secondary-label"
                  }
                >
                  {t("FORM.FIELD.FIELD-4.label")} <RequiredIcon />
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
                    if (!isReadOnly) setIsDirty(true);
                    setPhoneNumber(value);
                  }}
                  disabled={isReadOnly}
                />
              </div>
              {getFieldError(state, "phoneNumber") && (
                <p className="text-red-500 text-sm">
                  {getFieldError(state, "phoneNumber")}
                </p>
              )}
            </div>

            {/* Instagram Username */}
            <div className="flex flex-col gap-1">
              <div className="flex flex-col gap-2 lg:gap-4">
                <Label
                  className={
                    getFieldError(state, "instagramUsername")
                      ? "secondary-label-error"
                      : "secondary-label"
                  }
                >
                  {t("FORM.FIELD.FIELD-5.label")}
                </Label>
                <Input
                  name="instagramUsername"
                  id="instagramUsername"
                  className={
                    getFieldError(state, "instagramUsername")
                      ? "secondary-input-error"
                      : "secondary-input"
                  }
                  placeholder={t("FORM.FIELD.FIELD-5.placeholder")}
                  defaultValue={getDefaultInputValue(
                    state,
                    initialState,
                    "instagramUsername"
                  )}
                  disabled={isReadOnly}
                  onChange={() => !isReadOnly && setIsDirty(true)}
                />
              </div>
              {getFieldError(state, "instagramUsername") && (
                <p className="text-red-500 text-sm">
                  {getFieldError(state, "instagramUsername")}
                </p>
              )}
            </div>
          </div>
        </div>

        {isReadOnly ? null : (
          <DialogFooter>
            <div className="items-center md:justify-end flex gap-2">
              <DialogClose asChild>
                <Button
                  variant="outline"
                  className="rounded-[8px] w-fit flex items-center h-full justify-center gap-[15px] px-4 cursor-pointer"
                >
                  {t("FORM.BUTTON.CANCEL")}
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
                    {t("FORM.BUTTON.SUBMIT")}
                    <div className="w-9 aspect-square rounded bg-primary-foreground flex items-center justify-center">
                      <ArrowRight className="size-6 text-primary" />
                    </div>
                  </>
                )}
              </Button>
            </div>
          </DialogFooter>
        )}
      </form>
    </FormModal>
  );
};

export default ConsultationForm;
