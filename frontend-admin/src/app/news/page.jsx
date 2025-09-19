import Breadcrumb from "@/components/Breadcrumb";
import NewsLayer from "@/components/child/NewsLayer";
import MasterLayout from "@/masterLayout/MasterLayout";
import ProtectedRoute from "@/components/ProtectedRoute";

export const metadata = {
  title: "Lajme | KlosiSmart",
};

const Page = () => {
  return (
    <>
        <ProtectedRoute role="ROLE_ADMIN">
          {/* MasterLayout */}
          <MasterLayout>
            {/* Breadcrumb */}
            <Breadcrumb title='Lajme' />

            {/* BlogLayer */}
            <NewsLayer />
          </MasterLayout>
        </ProtectedRoute>
    </>
  );
};

export default Page;
