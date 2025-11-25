import DashboardLayout from "./dashboard/dashboard-layout";

const StaffLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <DashboardLayout type="staff">{children}</DashboardLayout>;
};

export default StaffLayout;
