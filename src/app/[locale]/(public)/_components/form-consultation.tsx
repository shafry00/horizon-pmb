"use client";

import * as React from "react";
import { createConsultation } from "../actions";
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
import { getContentByLocale, getFieldError, getInputValue } from "@/lib/utils";
import { TActionResult } from "@/types";
import { toast } from "sonner";
import { RELATIONSHIP_WITH_REGISTRANT_ITEMS } from "@/constants";
import { Spinner } from "@/components/ui/spinner";
import RequiredIcon from "@/components/icons/required-icon";
import ReCAPTCHA from "react-google-recaptcha";

const initialState: TActionResult = {
  success: false,
  message: "",
  errors: {},
  inputValues: {},
};

interface IFormConsultationProps {
  locale: string;
}

const FormConsultation: React.FC<IFormConsultationProps> = (props) => {
  const { locale } = props;
  const t = useTranslations(
    "PAGE.PUBLIC.HOME-PAGE.SECTION.CONSULTATION-SECTION.CONSULTATION-FORM"
  );
  const formRef = React.useRef<HTMLFormElement>(null);

  const [state, formAction, isPending] = React.useActionState(
    createConsultation,
    initialState
  );
  const [phoneNumber, setPhoneNumber] = React.useState<string | undefined>(
    undefined
  );
  const [relationship, setRelationship] = React.useState<string>("");
  const [isDirty, setIsDirty] = React.useState(false);
  const [csrfToken, setCsrfToken] = React.useState("");
  const [captchaToken, setCaptchaToken] = React.useState<string | null>(null);
  const recaptchaRef = React.useRef<ReCAPTCHA | null>(null);

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
        toast.success(t("RESPONSE.success"), {
          style: {
            backgroundColor: "#34D399",
            border: "1px solid #34D399",
            color: "#ffffff",
            fontWeight: "bold",
          },
        });

        setIsDirty(false);
        formRef.current?.reset();
        setPhoneNumber(undefined);
        setRelationship("");
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
    }
  }, [state, t]);

  return (
    <form ref={formRef} action={formAction} className="flex flex-col gap-7">
      <div className="flex flex-col gap-4 md:gap-[19px] lg:gap-[22px] xl:gap-[25px] 2xl:gap-7">
        {/* Full Name, Email, Relationship with Registrant */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-[19px] lg:gap-[22px] xl:gap-[25px] 2xl:gap-7">
          {/* Full Name */}
          <div className="flex flex-col gap-1">
            <input type="hidden" name="csrf_token" value={csrfToken} />
            <input
              type="text"
              name="honeypot"
              className="hidden"
              autoComplete="off"
            />
            <input
              type="hidden"
              name="captcha_token"
              value={captchaToken || ""}
            />
            <div className="flex flex-col gap-2 lg:gap-4">
              <Label
                className={
                  getFieldError(state, "fullName")
                    ? "main-label-error"
                    : "main-label"
                }
              >
                {t("FIELD.FIELD-1.label")} <RequiredIcon />
              </Label>
              <Input
                name="fullName"
                id="fullName"
                className={
                  getFieldError(state, "fullName")
                    ? "main-input-error"
                    : "main-input"
                }
                placeholder={t("FIELD.FIELD-1.placeholder")}
                defaultValue={getInputValue(state, "fullName")}
                onChange={() => setIsDirty(true)}
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
                    ? "main-label-error"
                    : "main-label"
                }
              >
                {t("FIELD.FIELD-2.label")} <RequiredIcon />
              </Label>
              <Input
                name="email"
                id="email"
                className={
                  getFieldError(state, "email")
                    ? "main-input-error"
                    : "main-input"
                }
                placeholder={t("FIELD.FIELD-2.placeholder")}
                defaultValue={getInputValue(state, "email")}
                onChange={() => setIsDirty(true)}
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
                    ? "main-label-error"
                    : "main-label"
                }
              >
                {t("FIELD.FIELD-3.label")} <RequiredIcon />
              </Label>
              <Select
                name="relationshipWithRegistrant"
                value={relationship}
                onValueChange={(value) => {
                  setRelationship(value);
                  setIsDirty(true);
                }}
              >
                <SelectTrigger
                  aria-label={t("FIELD.FIELD-3.label")}
                  className={
                    getFieldError(state, "relationshipWithRegistrant")
                      ? "main-input-error"
                      : "main-input"
                  }
                >
                  <SelectValue placeholder={t("FIELD.FIELD-3.placeholder")} />
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
                htmlFor="phoneNumber"
                className={
                  getFieldError(state, "phoneNumber")
                    ? "main-label-error"
                    : "main-label"
                }
              >
                {t("FIELD.FIELD-4.label")} <RequiredIcon />
              </Label>
              <input
                id="phoneNumber"
                type="hidden"
                name="phoneNumber"
                value={phoneNumber || ""}
              />
              <PhoneInput
                id="phoneNumber"
                defaultCountry="ID"
                international
                countryCallingCodeEditable={false}
                className={
                  getFieldError(state, "phoneNumber")
                    ? "main-input-error"
                    : "main-input"
                }
                value={phoneNumber}
                onChange={(value) => {
                  setIsDirty(true);
                  setPhoneNumber(value);
                }}
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
                    ? "main-label-error"
                    : "main-label"
                }
              >
                {t("FIELD.FIELD-5.label")}
              </Label>
              <Input
                name="instagramUsername"
                id="instagramUsername"
                className={
                  getFieldError(state, "instagramUsername")
                    ? "main-input-error"
                    : "main-input"
                }
                placeholder={t("FIELD.FIELD-5.placeholder")}
                defaultValue={getInputValue(state, "instagramUsername")}
                onChange={() => setIsDirty(true)}
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

      <ReCAPTCHA
        ref={recaptchaRef}
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
        onChange={(token) => setCaptchaToken(token)}
      />

      <Button
        type="submit"
        disabled={isPending || !captchaToken}
        className={`rounded-[8px] bg-primary w-fit h-full flex items-center gap-[15px] ${
          isPending || !captchaToken ? "p-[6px]" : "pl-4 py-[6px] pr-[6px]"
        }`}
      >
        {isPending ? (
          <Spinner size={"small"} className="text-white" />
        ) : (
          <>
            {t("BUTTON.SUBMIT")}
            <div className="w-9 aspect-square rounded bg-primary-foreground flex items-center justify-center">
              <ArrowRight className="size-6 text-primary" />
            </div>
          </>
        )}
      </Button>
    </form>
  );
};

export default FormConsultation;
