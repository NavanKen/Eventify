import CustomerLayout from "@/layout/customer-layout";

const RootCustomerLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <CustomerLayout>{children}</CustomerLayout>;
};

export default RootCustomerLayout;
