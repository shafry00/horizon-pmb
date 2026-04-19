"use client";

import * as React from "react";
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
import { getDefaultInputValue, getFieldError } from "@/lib/utils";
import { TActionResult, TUser } from "@/types";
import { toast } from "sonner";
import { USER_ROLE_ITEMS } from "@/constants";
import { Spinner } from "@/components/ui/spinner";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import FormModal from "../../../_components/form-modal";
import RequiredIcon from "@/components/icons/required-icon";
import { createUser, updateUserById } from "../actions";

interface IUserFormProps {
  locale: string;
  userById: TUser | null;
  mode: "CREATE" | "EDIT";
}

const UserForm: React.FC<IUserFormProps> = (props) => {
  const { userById, mode = "EDIT" } = props;

  const t = useTranslations(
    mode === "EDIT"
      ? "PAGE.DASHBOARD.USER-PAGE.EDIT-PAGE.SECTION.FORM-SECTION"
      : "PAGE.DASHBOARD.USER-PAGE.CREATE-PAGE.SECTION.FORM-SECTION"
  );
  const [, setOpen] = React.useState(false);

  const formRef = React.useRef<HTMLFormElement>(null);

  const initialState = React.useMemo<TActionResult>(
    () => ({
      success: false,
      message: "",
      errors: {},
      inputValues: userById || {},
    }),
    [userById]
  );

  const [state, formAction, isPending] = React.useActionState(
    async (
      _prevState: TActionResult,
      formData: FormData
    ): Promise<TActionResult> => {
      if (mode === "EDIT" && userById?.id) {
        return await updateUserById(userById.id, formData);
      } else {
        return await createUser(formData);
      }
    },
    initialState
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

  return (
    <FormModal
      title={t("FORM.title")}
      description={t("FORM.description")}
      dialogContentClassName="max-w-[90%] max-h-[90%] lg:max-w-[70%]"
    >
      <form
        ref={formRef}
        action={formAction}
        className="flex flex-col gap-7 max-h-[80%] md:max-h-none overflow-y-auto md:overflow-visible"
      >
        <div className="flex flex-col gap-4 md:gap-[19px] lg:gap-[22px] xl:gap-[25px] 2xl:gap-7">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-[19px] lg:gap-[22px] xl:gap-[25px] 2xl:gap-7">
            {/* Name Field*/}
            <div className="flex flex-col gap-1">
              <div className="flex flex-col gap-2 lg:gap-4">
                <Label
                  className={
                    getFieldError(state, "name")
                      ? "secondary-label-error"
                      : "secondary-label"
                  }
                >
                  {t("FORM.FIELD.FIELD-1.label")} <RequiredIcon />
                </Label>
                <Input
                  name="name"
                  id="name"
                  className={
                    getFieldError(state, "name")
                      ? "secondary-input-error"
                      : "secondary-input"
                  }
                  placeholder={t("FORM.FIELD.FIELD-1.placeholder")}
                  defaultValue={getDefaultInputValue(
                    state,
                    initialState,
                    "name"
                  )}
                  onChange={() => setIsDirty(true)}
                />
              </div>
              {getFieldError(state, "name") && (
                <p className="text-red-500 text-sm">
                  {getFieldError(state, "name")}
                </p>
              )}
            </div>

            {/* Email Field*/}
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
                  onChange={() => setIsDirty(true)}
                />
              </div>
              {getFieldError(state, "email") && (
                <p className="text-red-500 text-sm">
                  {getFieldError(state, "email")}
                </p>
              )}
            </div>

            {/* Role Field */}
            <div className="flex flex-col gap-1">
              <div className="flex flex-col gap-2 lg:gap-4">
                <Label
                  className={
                    getFieldError(state, "role")
                      ? "secondary-label-error"
                      : "secondary-label"
                  }
                >
                  {t("FORM.FIELD.FIELD-3.label")} <RequiredIcon />
                </Label>
                <Select
                  name="role"
                  defaultValue={getDefaultInputValue(
                    state,
                    initialState,
                    "role"
                  )}
                  onValueChange={() => setIsDirty(true)}
                >
                  <SelectTrigger
                    className={
                      getFieldError(state, "role")
                        ? "secondary-input-error"
                        : "secondary-input"
                    }
                  >
                    <SelectValue
                      placeholder={t("FORM.FIELD.FIELD-3.placeholder")}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {USER_ROLE_ITEMS.map((user) => (
                      <SelectItem
                        key={`${user.id}-${user.value}`}
                        value={user.value}
                      >
                        {user.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {getFieldError(state, "role") && (
                <p className="text-red-500 text-sm">
                  {getFieldError(state, "role")}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-1">
              <div className="flex flex-col gap-2 lg:gap-4">
                <Label
                  className={
                    getFieldError(state, "email")
                      ? "secondary-label-error"
                      : "secondary-label"
                  }
                >
                  {t("FORM.FIELD.FIELD-4.label")} <RequiredIcon />
                </Label>
                <Input
                  name="password"
                  id="password"
                  type="password"
                  className={
                    getFieldError(state, "password")
                      ? "secondary-input-error"
                      : "secondary-input"
                  }
                  placeholder={t("FORM.FIELD.FIELD-4.placeholder")}
                  onChange={() => setIsDirty(true)}
                  defaultValue={getDefaultInputValue(
                    state,
                    initialState,
                    "password"
                  )}
                />
              </div>
              {getFieldError(state, "password") && (
                <p className="text-red-500 text-sm">
                  {getFieldError(state, "password")}
                </p>
              )}
            </div>
          </div>
        </div>

        <DialogFooter>
          <div className="items-center md:justify-end flex gap-2">
            <DialogClose asChild>
              <Button
                variant="outline"
                className="rounded-[8px] w-fit flex items-center h-full justify-center gap-[15px] px-4 cursor-pointer"
              >
                {t("FORM.BUTTON.cancel")}
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
                  {t("FORM.BUTTON.submit")}
                  <div className="w-9 aspect-square rounded bg-primary-foreground flex items-center justify-center">
                    <ArrowRight className="size-6 text-primary" />
                  </div>
                </>
              )}
            </Button>
          </div>
        </DialogFooter>
      </form>
    </FormModal>
  );
};

export default UserForm;
