import DashboardLayout from "./dashboard/dashboard-layout";

const AdminLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <DashboardLayout type="admin">{children}</DashboardLayout>;
};

export default AdminLayout;
