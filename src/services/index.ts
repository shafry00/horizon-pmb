import { axiosInstance } from "@/configs/fetcher.configs";
import { handleApiErrorWithAxios } from "@/configs/handleApiError.configs";
import {
  TDeleteFileResponse,
  TDistrict,
  TProvince,
  TRegency,
  TUploadFileResponse,
  TVillage,
} from "@/types";

export const getProvinces = async (): Promise<TProvince[]> => {
  try {
    const response = await axiosInstance.get<TProvince[]>(
      "https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json"
    );
    return response.data;
  } catch (error) {
    throw handleApiErrorWithAxios(error);
  }
};

export const getRegencies = async (provinceId: string): Promise<TRegency[]> => {
  try {
    const response = await axiosInstance.get<TRegency[]>(
      `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${provinceId}.json`
    );
    return response.data;
  } catch (error) {
    throw handleApiErrorWithAxios(error);
  }
};

export const getDistricts = async (regencyId: string): Promise<TDistrict[]> => {
  try {
    const response = await axiosInstance.get<TDistrict[]>(
      `https://www.emsifa.com/api-wilayah-indonesia/api/districts/${regencyId}.json`
    );
    return response.data;
  } catch (error) {
    throw handleApiErrorWithAxios(error);
  }
};

export const getVillages = async (districtId: string): Promise<TVillage[]> => {
  try {
    const response = await axiosInstance.get<TVillage[]>(
      `https://www.emsifa.com/api-wilayah-indonesia/api/villages/${districtId}.json`
    );
    return response.data;
  } catch (error) {
    throw handleApiErrorWithAxios(error);
  }
};

export const uploadFile = async (file: File): Promise<TUploadFileResponse> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axiosInstance.post<TUploadFileResponse>(
    "/api/upload/",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        "x-api-key": process.env.NEXT_PUBLIC_API_KEY!,
      },
    }
  );

  return response.data;
};

export const deleteFile = async (
  filename: string
): Promise<TDeleteFileResponse> => {
  try {
    const response = await axiosInstance.delete<TDeleteFileResponse>(
      `/api/upload/${filename}`,
      {
        headers: {
          "x-api-key": process.env.NEXT_PUBLIC_API_KEY!,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw handleApiErrorWithAxios(error);
  }
};
