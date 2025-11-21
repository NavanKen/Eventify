import AdminLayout from "@/layout/admin-layout";

const RootAdminLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <AdminLayout>{children}</AdminLayout>;
};

export default RootAdminLayout;
