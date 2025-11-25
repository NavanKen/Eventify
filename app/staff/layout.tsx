import StaffLayout from "@/layout/staff-layout";

const RootStaffLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <StaffLayout>{children}</StaffLayout>;
};

export default RootStaffLayout;
