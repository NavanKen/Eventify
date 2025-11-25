import StaffLayout from "@/layout/staff-layout";

const RootCustomerLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <StaffLayout>{children}</StaffLayout>;
};

export default RootCustomerLayout;
