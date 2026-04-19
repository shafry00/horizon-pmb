import React from "react";
import SiteHeader from "../site-header";

interface IDashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
}

const DashboardLayout: React.FC<IDashboardLayoutProps> = (props) => {
  const { children, title = "Dashboard" } = props;
  return (
    <>
      <SiteHeader title={title} />
      <div className="flex flex-1">
        <div className="@container/main flex flex-1 flex-col gap-2 p-4">
          <div className="flex flex-col gap-4">{children}</div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
