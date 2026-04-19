import React from "react";
import TotalDataSection from "./_components/sections/total-data-section";
import DashboardLayout from "./_components/layouts/dashboard-layout";
import { getDashboardData } from "./services/server";
import { ChartAreaInteractive } from "./_components/chart-area-interactive";
import { eachDayOfInterval } from "date-fns";
const Page = async () => {
  const { data: dashboardData } = await getDashboardData();

  const counts: Record<
    string,
    {
      consultation: number;
      scholarship: number;
      reRegister: number;
      pmb: number;
    }
  > = {};

  dashboardData.dailyData.forEach((entry) => {
    const date = new Date(entry.createdAt).toISOString().split("T")[0]; // format yyyy-mm-dd

    if (!counts[date]) {
      counts[date] = {
        consultation: 0,
        scholarship: 0,
        reRegister: 0,
        pmb: 0,
      };
    }

    if (
      entry.model === "consultation" ||
      entry.model === "scholarship" ||
      entry.model === "reRegister" ||
      entry.model === "pmb"
    ) {
      counts[date][entry.model] += 1;
    }
  });

  const totalVisitors = Object.entries(counts).map(([date, models]) => ({
    date,
    ...models,
  }));

  const today = new Date();
  const startDate = new Date();
  startDate.setDate(today.getDate() - 90);

  const allDates = eachDayOfInterval({
    start: startDate,
    end: today,
  }).map((date) => date.toISOString().split("T")[0]);

  const completedVisitors = allDates.map((date) => {
    const found = totalVisitors.find((item) => item.date === date);
    if (found) return found;
    return {
      date,
      consultation: 0,
      scholarship: 0,
      reRegister: 0,
      pmb: 0,
    };
  });

  return (
    <DashboardLayout title="Dashboard">
      <main className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <TotalDataSection summaries={dashboardData.summary} />
        <div className="px-4 lg:px-6">
          <ChartAreaInteractive totalVisitors={completedVisitors} />
        </div>
      </main>
    </DashboardLayout>
  );
};

export default Page;
