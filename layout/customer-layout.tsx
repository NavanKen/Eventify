import DashboardLayout from "./dashboard/dashboard-layout";

const CustomerLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <DashboardLayout type="customers">{children}</DashboardLayout>;
};

export default CustomerLayout;
