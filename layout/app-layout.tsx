import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";

const AppLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Navbar />
      <div className="bg-background w-full min-h-screen">{children}</div>
      <Footer />
    </>
  );
};

export default AppLayout;
