"use client";

import RequiredIcon from "@/components/icons/required-icon";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { getContentByLocale, getFieldError } from "@/lib/utils";
import { TActionResult, TScholarshipDetail } from "@/types";
import { useTranslations } from "next-intl";
import React, { useActionState } from "react";
import { updateAdditionalInformationById } from "../actions";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProvinces } from "@/features";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import {
  CONSUMPTION_FRIED_RICE_ITEMS,
  CONSUMPTION_MEAT_ITEMS,
  FAMILY_SAVINGS_ITEMS,
  FUEL_ITEMS,
  HAVE_CAR_ITEMS,
  HOUSE_FLOOR_MATERIAL_ITEMS,
  LAUNDRY_SUPPLIES_ITEMS,
  REFRIGERATOR_ITEMS,
  TOTAL_FAMILY_MEMBERS_ITEMS,
} from "@/constants";

interface IAdditionalInformationFormProps {
  scholarshipRegistrationById: TScholarshipDetail;
  functionType?: "edit" | "detail";
  locale: string;
}

const AdditionalInformationForm: React.FC<IAdditionalInformationFormProps> = (
  props
) => {
  const { scholarshipRegistrationById, functionType = "edit", locale } = props;
  const t = useTranslations(
    "PAGE.DASHBOARD.SCHOLARSHIP-REGISTRATION-PAGE.EDIT-PAGE.SECTION.FORM-SECTION.FORM.ADDITIONAL-INFORMATION-FORM"
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
  const [state, formAction, isPending] = useActionState(
    async (
      _prevState: TActionResult,
      formData: FormData
    ): Promise<TActionResult> => {
      return await updateAdditionalInformationById(
        scholarshipRegistrationById.id,
        formData
      );
    },
    initialState
  );

  const [currentProvince, setCurrentProvince] = React.useState(
    scholarshipRegistrationById.currentProvince
  );

  const {
    data: provinces,
    isLoading: isLoadingProvinces,
    error: isErrorProvinces,
  } = useProvinces();

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
              <div className="grid grid-cols-1 gap-2 lg:gap-4">
                {/*Current Province, Total Family Members Field */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-4">
                  {/* Current Province Field */}
                  <div className="flex flex-col gap-1">
                    <div className="flex flex-col gap-2 lg:gap-4">
                      <Label
                        className={
                          getFieldError(state, "province")
                            ? "secondary-label-error"
                            : "secondary-label"
                        }
                      >
                        {t("FIELD.FIELD-1.label")} <RequiredIcon />
                      </Label>
                      <Select
                        name="currentProvince"
                        defaultValue={currentProvince}
                        onValueChange={() => {
                          if (isDisabled) return;
                          setIsDirty(true);
                          setCurrentProvince(currentProvince);
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
                          <SelectValue
                            placeholder={t("FIELD.FIELD-1.placeholder")}
                          />
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
                    </div>
                    {getFieldError(state, "province") && (
                      <p className="text-red-500 text-sm">
                        {getFieldError(state, "province")}
                      </p>
                    )}
                  </div>

                  {/* Total Family Members Field */}
                  <div className="flex flex-col gap-1">
                    <div className="flex flex-col gap-2 lg:gap-4">
                      <Label
                        className={
                          getFieldError(state, "totalFamilyMembers")
                            ? "secondary-label-error"
                            : "secondary-label"
                        }
                      >
                        {t("FIELD.FIELD-2.label")} <RequiredIcon />
                      </Label>
                      <Select
                        name="totalFamilyMembers"
                        defaultValue={
                          scholarshipRegistrationById.totalFamilyMembers
                        }
                        onValueChange={() => {
                          if (isDisabled) return;
                          setIsDirty(true);
                        }}
                        disabled={isDisabled}
                      >
                        <SelectTrigger
                          className={
                            getFieldError(state, "totalFamilyMembers")
                              ? "secondary-input-error"
                              : "secondary-input"
                          }
                        >
                          <SelectValue
                            placeholder={t("FIELD.FIELD-2.placeholder")}
                          />
                        </SelectTrigger>

                        <SelectContent className="max-h-72 overflow-y-auto">
                          {TOTAL_FAMILY_MEMBERS_ITEMS.map((familyMember) => (
                            <SelectItem
                              key={`${familyMember.id}-${familyMember.value}`}
                              value={familyMember.value}
                            >
                              {getContentByLocale({
                                locale,
                                enContent: familyMember.label_en,
                                idContent: familyMember.label_id,
                              })}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    {getFieldError(state, "totalFamilyMembers") && (
                      <p className="text-red-500 text-sm">
                        {getFieldError(state, "totalFamilyMembers")}
                      </p>
                    )}
                  </div>
                </div>

                {/* Has Family Savings, House Floor Material Field */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-4">
                  {/* Has Family Savings Field */}
                  <div className="flex flex-col gap-1">
                    <div className="flex flex-col gap-2 lg:gap-4">
                      <Label
                        className={
                          getFieldError(state, "hasFamilySavings")
                            ? "secondary-label-error"
                            : "secondary-label"
                        }
                      >
                        {t("FIELD.FIELD-3.label")} <RequiredIcon />
                      </Label>
                      <Select
                        name="hasFamilySavings"
                        defaultValue={
                          scholarshipRegistrationById.hasFamilySavings
                        }
                        onValueChange={() => {
                          if (isDisabled) return;
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
                          <SelectValue
                            placeholder={t("FIELD.FIELD-3.placeholder")}
                          />
                        </SelectTrigger>

                        <SelectContent className="max-h-72 overflow-y-auto">
                          {FAMILY_SAVINGS_ITEMS.map((familySaving) => (
                            <SelectItem
                              key={`${familySaving.id}-${familySaving.value}`}
                              value={familySaving.value}
                            >
                              {getContentByLocale({
                                locale,
                                enContent: familySaving.label_en,
                                idContent: familySaving.label_id,
                              })}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    {getFieldError(state, "hasFamilySavings") && (
                      <p className="text-red-500 text-sm">
                        {getFieldError(state, "hasFamilySavings")}
                      </p>
                    )}
                  </div>

                  {/* House Floor Material Field */}
                  <div className="flex flex-col gap-1">
                    <div className="flex flex-col gap-2 lg:gap-4">
                      <Label
                        className={
                          getFieldError(state, "houseFloorMaterial")
                            ? "secondary-label-error"
                            : "secondary-label"
                        }
                      >
                        {t("FIELD.FIELD-4.label")} <RequiredIcon />
                      </Label>
                      <Select
                        name="houseFloorMaterial"
                        defaultValue={
                          scholarshipRegistrationById.houseFloorMaterial
                        }
                        onValueChange={() => {
                          if (isDisabled) return;
                          setIsDirty(true);
                        }}
                        disabled={isDisabled}
                      >
                        <SelectTrigger
                          className={
                            getFieldError(state, "houseFloorMaterial")
                              ? "secondary-input-error"
                              : "secondary-input"
                          }
                        >
                          <SelectValue
                            placeholder={t("FIELD.FIELD-4.placeholder")}
                          />
                        </SelectTrigger>

                        <SelectContent className="max-h-72 overflow-y-auto">
                          {HOUSE_FLOOR_MATERIAL_ITEMS.map(
                            (houseFloorMaterial) => (
                              <SelectItem
                                key={`${houseFloorMaterial.id}-${houseFloorMaterial.value}`}
                                value={houseFloorMaterial.value}
                              >
                                {getContentByLocale({
                                  locale,
                                  enContent: houseFloorMaterial.label_en,
                                  idContent: houseFloorMaterial.label_id,
                                })}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                    </div>
                    {getFieldError(state, "houseFloorMaterials") && (
                      <p className="text-red-500 text-sm">
                        {getFieldError(state, "houseFloorMaterials")}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-4">
                  {/* Consumed Meat Field */}
                  <div className="flex flex-col gap-1">
                    <div className="flex flex-col gap-2 lg:gap-4">
                      <Label
                        className={
                          getFieldError(state, "consumedMeatLastWeek")
                            ? "secondary-label-error"
                            : "secondary-label"
                        }
                      >
                        {t("FIELD.FIELD-5.label")} <RequiredIcon />
                      </Label>
                      <Select
                        name="consumedMeatLastWeek"
                        defaultValue={
                          scholarshipRegistrationById.consumedMeatLastWeek
                        }
                        onValueChange={() => {
                          if (isDisabled) return;
                          setIsDirty(true);
                        }}
                        disabled={isDisabled}
                      >
                        <SelectTrigger
                          className={
                            getFieldError(state, "consumedMeatLastWeek")
                              ? "secondary-input-error"
                              : "secondary-input"
                          }
                        >
                          <SelectValue
                            placeholder={t("FIELD.FIELD-5.placeholder")}
                          />
                        </SelectTrigger>

                        <SelectContent className="max-h-72 overflow-y-auto">
                          {CONSUMPTION_MEAT_ITEMS.map((consumptionMeat) => (
                            <SelectItem
                              key={`${consumptionMeat.id}-${consumptionMeat.value}`}
                              value={consumptionMeat.value}
                            >
                              {getContentByLocale({
                                locale,
                                enContent: consumptionMeat.label_en,
                                idContent: consumptionMeat.label_id,
                              })}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    {getFieldError(state, "consumedMeatLastWeek") && (
                      <p className="text-red-500 text-sm">
                        {getFieldError(state, "consumedMeatLastWeek")}
                      </p>
                    )}
                  </div>

                  {/* Consumed Fried Rice Field */}
                  <div className="flex flex-col gap-1">
                    <div className="flex flex-col gap-2 lg:gap-4">
                      <Label
                        className={
                          getFieldError(state, "consumedFriedRiceLastWeek")
                            ? "secondary-label-error"
                            : "secondary-label"
                        }
                      >
                        {t("FIELD.FIELD-6.label")} <RequiredIcon />
                      </Label>
                      <Select
                        name="consumedFriedRiceLastWeek"
                        defaultValue={
                          scholarshipRegistrationById.consumedFriedRiceLastWeek
                        }
                        onValueChange={() => {
                          if (isDisabled) return;
                          setIsDirty(true);
                        }}
                        disabled={isDisabled}
                      >
                        <SelectTrigger
                          className={
                            getFieldError(state, "consumedFriedRiceLastWeek")
                              ? "secondary-input-error"
                              : "secondary-input"
                          }
                        >
                          <SelectValue
                            placeholder={t("FIELD.FIELD-6.placeholder")}
                          />
                        </SelectTrigger>

                        <SelectContent className="max-h-72 overflow-y-auto">
                          {CONSUMPTION_FRIED_RICE_ITEMS.map(
                            (consumptionFriedRice) => (
                              <SelectItem
                                key={`${consumptionFriedRice.id}-${consumptionFriedRice.value}`}
                                value={consumptionFriedRice.value}
                              >
                                {getContentByLocale({
                                  locale,
                                  enContent: consumptionFriedRice.label_en,
                                  idContent: consumptionFriedRice.label_id,
                                })}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                    </div>
                    {getFieldError(state, "consumedFriedRiceLastWeek") && (
                      <p className="text-red-500 text-sm">
                        {getFieldError(state, "consumedFriedRiceLastWeek")}
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-4">
                  {/* Bought Laundry Supplies Field */}
                  <div className="flex flex-col gap-1">
                    <div className="flex flex-col gap-2 lg:gap-4">
                      <Label
                        className={
                          getFieldError(state, "boughtLaundrySuppliesLastMonth")
                            ? "secondary-label-error"
                            : "secondary-label"
                        }
                      >
                        {t("FIELD.FIELD-7.label")} <RequiredIcon />
                      </Label>
                      <Select
                        name="boughtLaundrySuppliesLastMonth"
                        defaultValue={
                          scholarshipRegistrationById.boughtLaundrySuppliesLastMonth
                        }
                        onValueChange={() => {
                          if (isDisabled) return;
                          setIsDirty(true);
                        }}
                        disabled={isDisabled}
                      >
                        <SelectTrigger
                          className={
                            getFieldError(
                              state,
                              "boughtLaundrySuppliesLastMonth"
                            )
                              ? "secondary-input-error"
                              : "secondary-input"
                          }
                        >
                          <SelectValue
                            placeholder={t("FIELD.FIELD-7.placeholder")}
                          />
                        </SelectTrigger>

                        <SelectContent className="max-h-72 overflow-y-auto">
                          {LAUNDRY_SUPPLIES_ITEMS.map((laundrySupplies) => (
                            <SelectItem
                              key={`${laundrySupplies.id}-${laundrySupplies.value}`}
                              value={laundrySupplies.value}
                            >
                              {getContentByLocale({
                                locale,
                                enContent: laundrySupplies.label_en,
                                idContent: laundrySupplies.label_id,
                              })}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    {getFieldError(state, "boughtLaundrySuppliesLastMonth") && (
                      <p className="text-red-500 text-sm">
                        {getFieldError(state, "boughtLaundrySuppliesLastMonth")}
                      </p>
                    )}
                  </div>

                  {/* Bought Fuel Field */}
                  <div className="flex flex-col gap-1">
                    <div className="flex flex-col gap-2 lg:gap-4">
                      <Label
                        className={
                          getFieldError(state, "boughtFuelLastMonth")
                            ? "secondary-label-error"
                            : "secondary-label"
                        }
                      >
                        {t("FIELD.FIELD-8.label")} <RequiredIcon />
                      </Label>
                      <Select
                        name="boughtFuelLastMonth"
                        defaultValue={
                          scholarshipRegistrationById.boughtFuelLastMonth
                        }
                        onValueChange={() => {
                          if (isDisabled) return;
                          setIsDirty(true);
                        }}
                        disabled={isDisabled}
                      >
                        <SelectTrigger
                          className={
                            getFieldError(state, "boughtFuelLastMonth")
                              ? "secondary-input-error"
                              : "secondary-input"
                          }
                        >
                          <SelectValue
                            placeholder={t("FIELD.FIELD-8.placeholder")}
                          />
                        </SelectTrigger>

                        <SelectContent className="max-h-72 overflow-y-auto">
                          {FUEL_ITEMS.map((fuel) => (
                            <SelectItem
                              key={`${fuel.id}-${fuel.value}`}
                              value={fuel.value}
                            >
                              {getContentByLocale({
                                locale,
                                enContent: fuel.label_en,
                                idContent: fuel.label_id,
                              })}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    {getFieldError(state, "boughtFuelLastMonth") && (
                      <p className="text-red-500 text-sm">
                        {getFieldError(state, "boughtFuelLastMonth")}
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-4">
                  {/* Has Refrigerator Field */}
                  <div className="flex flex-col gap-1">
                    <div className="flex flex-col gap-2 lg:gap-4">
                      <Label
                        className={
                          getFieldError(state, "hasRefrigerator")
                            ? "secondary-label-error"
                            : "secondary-label"
                        }
                      >
                        {t("FIELD.FIELD-9.label")} <RequiredIcon />
                      </Label>
                      <Select
                        name="hasRefrigerator"
                        defaultValue={
                          scholarshipRegistrationById.hasRefrigerator
                        }
                        onValueChange={() => {
                          if (isDisabled) return;
                          setIsDirty(true);
                        }}
                        disabled={isDisabled}
                      >
                        <SelectTrigger
                          className={
                            getFieldError(state, "hasRefrigerator")
                              ? "secondary-input-error"
                              : "secondary-input"
                          }
                        >
                          <SelectValue
                            placeholder={t("FIELD.FIELD-9.placeholder")}
                          />
                        </SelectTrigger>

                        <SelectContent className="max-h-72 overflow-y-auto">
                          {REFRIGERATOR_ITEMS.map((refrigerator) => (
                            <SelectItem
                              key={`${refrigerator.id}-${refrigerator.value}`}
                              value={refrigerator.value}
                            >
                              {getContentByLocale({
                                locale,
                                enContent: refrigerator.label_en,
                                idContent: refrigerator.label_id,
                              })}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    {getFieldError(state, "hasRefrigerator") && (
                      <p className="text-red-500 text-sm">
                        {getFieldError(state, "hasRefrigerator")}
                      </p>
                    )}
                  </div>

                  {/* Has Car Field */}
                  <div className="flex flex-col gap-1">
                    <div className="flex flex-col gap-2 lg:gap-4">
                      <Label
                        className={
                          getFieldError(state, "hasCar")
                            ? "secondary-label-error"
                            : "secondary-label"
                        }
                      >
                        {t("FIELD.FIELD-2.label")} <RequiredIcon />
                      </Label>
                      <Select
                        name="hasCar"
                        defaultValue={scholarshipRegistrationById.hasCar}
                        onValueChange={() => {
                          if (isDisabled) return;
                          setIsDirty(true);
                        }}
                        disabled={isDisabled}
                      >
                        <SelectTrigger
                          className={
                            getFieldError(state, "hasCar")
                              ? "secondary-input-error"
                              : "secondary-input"
                          }
                        >
                          <SelectValue
                            placeholder={t("FIELD.FIELD-10.placeholder")}
                          />
                        </SelectTrigger>

                        <SelectContent className="max-h-72 overflow-y-auto">
                          {HAVE_CAR_ITEMS.map((car) => (
                            <SelectItem
                              key={`${car.id}-${car.value}`}
                              value={car.value}
                            >
                              {getContentByLocale({
                                locale,
                                enContent: car.label_en,
                                idContent: car.label_id,
                              })}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    {getFieldError(state, "hasCar") && (
                      <p className="text-red-500 text-sm">
                        {getFieldError(state, "hasCar")}
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

export default AdditionalInformationForm;
