import {
  deleteFile,
  getDistricts,
  getProvinces,
  getRegencies,
  getVillages,
  uploadFile,
} from "@/services";
import { TDeleteFileResponse, TUploadFileResponse } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useProvinces = () => {
  return useQuery({
    queryKey: ["provinces"],
    queryFn: getProvinces,
  });
};

export const useRegencies = (provinceId: string) => {
  return useQuery({
    queryKey: ["regencies", provinceId],
    queryFn: () => getRegencies(provinceId),
    enabled: !!provinceId,
  });
};

export const useDistricts = (regencyId: string) => {
  return useQuery({
    queryKey: ["districts", regencyId],
    queryFn: () => getDistricts(regencyId),
    enabled: !!regencyId,
  });
};

export const useVillages = (districtId: string) => {
  return useQuery({
    queryKey: ["villages", districtId],
    queryFn: () => getVillages(districtId),
    enabled: !!districtId,
  });
};

export const useUploadFile = () => {
  return useMutation<TUploadFileResponse, Error, File>({
    mutationFn: async (file: File) => {
      return await uploadFile(file);
    },
  });
};

export const useDeleteFile = () => {
  return useMutation<TDeleteFileResponse, Error, string>({
    mutationFn: deleteFile,
  });
};
