/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import {
  HAVE_CAR_ITEMS,
  CONSUMPTION_FRIED_RICE_ITEMS,
  CONSUMPTION_MEAT_ITEMS,
  FAMILY_SAVINGS_ITEMS,
  FUEL_ITEMS,
  HOUSE_FLOOR_MATERIAL_ITEMS,
  LAUNDRY_SUPPLIES_ITEMS,
  REFRIGERATOR_ITEMS,
  TOTAL_FAMILY_MEMBERS_ITEMS,
} from "@/constants";
import { useProvinces } from "@/features";
import { additionalInformationFormSchema } from "@/lib/schema";
import { getContentByLocale } from "@/lib/utils";
import { useScholarshipFormStore } from "@/stores/use-scholarship-register-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { SelectTrigger } from "@radix-ui/react-select";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type FormData = z.infer<typeof additionalInformationFormSchema>;

interface IAdditionalInformationFormProps {
  formRef?: React.MutableRefObject<any>;
  t: any;
  locale: string;
}

const AdditionalInformationForm: React.FC<IAdditionalInformationFormProps> = (
  props
) => {
  const { formRef, t, locale } = props;

  const { formData } = useScholarshipFormStore();

  const form = useForm<FormData>({
    resolver: zodResolver(additionalInformationFormSchema),
    defaultValues: {
      totalFamilyMembers: formData.additionalInfo.totalFamilyMembers,
      hasFamilySavings: formData.additionalInfo.hasFamilySavings,
      consumedMeatLastWeek: formData.additionalInfo.consumedMeatLastWeek,
      consumedFriedRiceLastWeek:
        formData.additionalInfo.consumedFriedRiceLastWeek,
      houseFloorMaterial: formData.additionalInfo.houseFloorMaterial,
      hasRefrigerator: formData.additionalInfo.hasRefrigerator,
      boughtLaundrySuppliesLastMonth:
        formData.additionalInfo.boughtLaundrySuppliesLastMonth,
      hasCar: formData.additionalInfo.hasCar,
      boughtFuelLastMonth: formData.additionalInfo.boughtFuelLastMonth,
      currentProvince: formData.additionalInfo.currentProvince,
    },
    mode: "onChange",
  });

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
  const {
    data: provinces,
    isLoading: isLoadingProvinces,
    isError: isErrorProvinces,
  } = useProvinces();

  return (
    <Form {...form}>
      <form>
        <div className="flex flex-col gap-7 md:gap-[31px] lg:gap-[34px] xl:ga-[37px] 2xl:gap-10">
          <div className="grid grid-cols-1 gap-4 md:gap-[19px] lg:gap-[22px] xl:gap-[25px] 2xl:gap-7">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-[19px] lg:gap-[22px] xl:gap-[25px] 2xl:gap-7">
              <FormField
                control={form.control}
                name="currentProvince"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="main-label">
                      {t("ADDITIONAL-INFORMATION-FORM.FIELD.FIELD-1.label")}
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="mt-2 lg:mt-4">
                        <SelectTrigger className="main-input text-left">
                          <SelectValue
                            placeholder={t(
                              "ADDITIONAL-INFORMATION-FORM.FIELD.FIELD-1.placeholder"
                            )}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="max-h-72 overflow-y-auto">
                        {isLoadingProvinces && (
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
                name="totalFamilyMembers"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="main-label">
                      {t("ADDITIONAL-INFORMATION-FORM.FIELD.FIELD-2.label")} (*)
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="mt-2 lg:mt-4">
                        <SelectTrigger className="main-input text-left">
                          <SelectValue
                            placeholder={t(
                              "ADDITIONAL-INFORMATION-FORM.FIELD.FIELD-2.placeholder"
                            )}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {TOTAL_FAMILY_MEMBERS_ITEMS.map((option) => (
                          <SelectItem
                            key={`${option.id}-${option.value}`}
                            value={option.value}
                          >
                            {getContentByLocale({
                              locale,
                              enContent: option.label_en,
                              idContent: option.label_id,
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-[19px] lg:gap-[22px] xl:gap-[25px] 2xl:gap-7">
              <FormField
                control={form.control}
                name="hasFamilySavings"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="main-label">
                      {t("ADDITIONAL-INFORMATION-FORM.FIELD.FIELD-3.label")} (*)
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="mt-2 lg:mt-4">
                        <SelectTrigger className="main-input text-left">
                          <SelectValue
                            placeholder={t(
                              "ADDITIONAL-INFORMATION-FORM.FIELD.FIELD-3.placeholder"
                            )}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {FAMILY_SAVINGS_ITEMS.map((option) => (
                          <SelectItem
                            key={`${option.id}-${option.value}`}
                            value={option.value}
                          >
                            {getContentByLocale({
                              locale,
                              enContent: option.label_en,
                              idContent: option.label_id,
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
                name="houseFloorMaterial"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="main-label">
                      {t("ADDITIONAL-INFORMATION-FORM.FIELD.FIELD-4.label")} (*)
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="mt-2 lg:mt-4">
                        <SelectTrigger className="main-input text-left">
                          <SelectValue
                            placeholder={t(
                              "ADDITIONAL-INFORMATION-FORM.FIELD.FIELD-4.placeholder"
                            )}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {HOUSE_FLOOR_MATERIAL_ITEMS.map((option) => (
                          <SelectItem
                            key={`${option.id}-${option.value}`}
                            value={option.value}
                          >
                            {getContentByLocale({
                              locale,
                              enContent: option.label_en,
                              idContent: option.label_id,
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-[19px] lg:gap-[22px] xl:gap-[25px] 2xl:gap-7">
              <FormField
                control={form.control}
                name="consumedMeatLastWeek"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="main-label">
                      {t("ADDITIONAL-INFORMATION-FORM.FIELD.FIELD-5.label")} (*)
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="mt-2 lg:mt-4">
                        <SelectTrigger className="main-input text-left">
                          <SelectValue
                            placeholder={t(
                              "ADDITIONAL-INFORMATION-FORM.FIELD.FIELD-5.placeholder"
                            )}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {CONSUMPTION_MEAT_ITEMS.map((option) => (
                          <SelectItem
                            key={`${option.id}-${locale}`}
                            value={option.value}
                          >
                            {getContentByLocale({
                              locale,
                              enContent: option.label_en,
                              idContent: option.label_id,
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
                name="consumedFriedRiceLastWeek"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="main-label">
                      {t("ADDITIONAL-INFORMATION-FORM.FIELD.FIELD-6.label")} (*)
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="mt-2 lg:mt-4">
                        <SelectTrigger className="main-input text-left">
                          <SelectValue
                            placeholder={t(
                              "ADDITIONAL-INFORMATION-FORM.FIELD.FIELD-6.placeholder"
                            )}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {CONSUMPTION_FRIED_RICE_ITEMS.map((option) => (
                          <SelectItem key={option.id} value={option.value}>
                            {getContentByLocale({
                              locale,
                              enContent: option.label_en,
                              idContent: option.label_id,
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-[19px] lg:gap-[22px] xl:gap-[25px] 2xl:gap-7">
              <FormField
                control={form.control}
                name="boughtLaundrySuppliesLastMonth"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="main-label">
                      {t("ADDITIONAL-INFORMATION-FORM.FIELD.FIELD-7.label")} (*)
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="mt-2 lg:mt-4">
                        <SelectTrigger className="main-input text-left">
                          <SelectValue
                            placeholder={t(
                              "ADDITIONAL-INFORMATION-FORM.FIELD.FIELD-7.placeholder"
                            )}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {LAUNDRY_SUPPLIES_ITEMS.map((option) => (
                          <SelectItem
                            key={`${option.id}-${locale}`}
                            value={option.value}
                          >
                            {getContentByLocale({
                              locale,
                              enContent: option.label_en,
                              idContent: option.label_id,
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
                name="boughtFuelLastMonth"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="main-label">
                      {t("ADDITIONAL-INFORMATION-FORM.FIELD.FIELD-8.label")} (*)
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="mt-2 lg:mt-4">
                        <SelectTrigger className="main-input text-left">
                          <SelectValue
                            placeholder={t(
                              "ADDITIONAL-INFORMATION-FORM.FIELD.FIELD-8.placeholder"
                            )}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {FUEL_ITEMS.map((option) => (
                          <SelectItem
                            key={`${option.id}-${option.value}`}
                            value={option.value}
                          >
                            {getContentByLocale({
                              locale,
                              enContent: option.label_en,
                              idContent: option.label_id,
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-[19px] lg:gap-[22px] xl:gap-[25px] 2xl:gap-7">
              <FormField
                control={form.control}
                name="hasRefrigerator"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="main-label">
                      {t("ADDITIONAL-INFORMATION-FORM.FIELD.FIELD-9.label")} (*)
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="mt-2 lg:mt-4">
                        <SelectTrigger className="main-input text-left">
                          <SelectValue
                            placeholder={t(
                              "ADDITIONAL-INFORMATION-FORM.FIELD.FIELD-9.placeholder"
                            )}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {REFRIGERATOR_ITEMS.map((option) => (
                          <SelectItem
                            key={`${option.id}-${option.value}`}
                            value={option.value}
                          >
                            {getContentByLocale({
                              locale,
                              enContent: option.label_en,
                              idContent: option.label_id,
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
                name="hasCar"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="main-label">
                      {t("ADDITIONAL-INFORMATION-FORM.FIELD.FIELD-10.label")}{" "}
                      (*)
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="mt-2 lg:mt-4">
                        <SelectTrigger className="main-input text-left">
                          <SelectValue
                            placeholder={t(
                              "ADDITIONAL-INFORMATION-FORM.FIELD.FIELD-10.placeholder"
                            )}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {HAVE_CAR_ITEMS.map((option) => (
                          <SelectItem
                            key={`${option.id}-${option.value}`}
                            value={option.value}
                          >
                            {getContentByLocale({
                              locale,
                              enContent: option.label_en,
                              idContent: option.label_id,
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
      </form>
    </Form>
  );
};

export default AdditionalInformationForm;
