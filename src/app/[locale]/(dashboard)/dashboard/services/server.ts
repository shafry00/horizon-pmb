"use server";

import prisma from "@/lib/prisma";
import { TResponseResult } from "@/types";

export async function getTotalVisitors(): Promise<
  TResponseResult<{ model: string; createdAt: Date }[]>
> {
  try {
    const [consultations, scholarships, reRegisters, pmbs] = await Promise.all([
      prisma.consultation.findMany({
        select: { createdAt: true },
      }),
      prisma.scholarship.findMany({
        select: { createdAt: true },
      }),
      prisma.reRegister.findMany({
        select: { createdAt: true },
      }),
      prisma.pMB.findMany({
        select: { createdAt: true },
      }),
    ]);

    const allData = [
      ...consultations.map((d) => ({
        model: "consultation",
        createdAt: d.createdAt,
      })),
      ...scholarships.map((d) => ({
        model: "scholarship",
        createdAt: d.createdAt,
      })),
      ...reRegisters.map((d) => ({
        model: "reRegister",
        createdAt: d.createdAt,
      })),
      ...pmbs.map((d) => ({
        model: "pmb",
        createdAt: d.createdAt,
      })),
    ];

    return {
      success: true,
      message: "Success",
      data: allData,
      error: null,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Failed to get total visitors",
      data: [],
      error: {
        code: 500,
        message: (error as Error).message || "Internal Server Error",
      },
    };
  }
}

export type TDashboardData = {
  dailyData: { model: string; createdAt: Date }[];
  summary: {
    pmb: number;
    reRegister: number;
    consultation: number;
    scholarship: number;
  };
};

export async function getDashboardData(): Promise<
  TResponseResult<TDashboardData>
> {
  try {
    const [
      consultations,
      scholarships,
      reRegisters,
      pmbs,
      pmbCount,
      reRegisterCount,
      consultationCount,
      scholarshipCount,
    ] = await Promise.all([
      prisma.consultation.findMany({ select: { createdAt: true } }),
      prisma.scholarship.findMany({ select: { createdAt: true } }),
      prisma.reRegister.findMany({ select: { createdAt: true } }),
      prisma.pMB.findMany({ select: { createdAt: true } }),
      prisma.pMB.count(),
      prisma.reRegister.count(),
      prisma.consultation.count(),
      prisma.scholarship.count(),
    ]);

    const dailyData = [
      ...consultations.map((d) => ({
        model: "consultation",
        createdAt: d.createdAt,
      })),
      ...scholarships.map((d) => ({
        model: "scholarship",
        createdAt: d.createdAt,
      })),
      ...reRegisters.map((d) => ({
        model: "reRegister",
        createdAt: d.createdAt,
      })),
      ...pmbs.map((d) => ({
        model: "pmb",
        createdAt: d.createdAt,
      })),
    ];

    return {
      success: true,
      message: "Success",
      data: {
        dailyData,
        summary: {
          pmb: pmbCount,
          reRegister: reRegisterCount,
          consultation: consultationCount,
          scholarship: scholarshipCount,
        },
      },
      error: null,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Failed to get dashboard data",
      data: {
        dailyData: [],
        summary: {
          pmb: 0,
          reRegister: 0,
          consultation: 0,
          scholarship: 0,
        },
      },
      error: {
        code: 500,
        message: (error as Error).message || "Internal Server Error",
      },
    };
  }
}
