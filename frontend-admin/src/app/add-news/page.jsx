import AddNewsLayer from "@/components/AddNewsLayer";
import Breadcrumb from "@/components/Breadcrumb";
import MasterLayout from "@/masterLayout/MasterLayout";
import ProtectedRoute from "@/components/ProtectedRoute";

export const metadata = {
  title: "Lajm | KlosiSmart",
};

const Page = () => {
  return (
    <>
        <ProtectedRoute role="ROLE_ADMIN">
          {/* MasterLayout */}
          <MasterLayout>
            {/* Breadcrumb */}
            <Breadcrumb title='Lajm - Shto' />

            {/* AddBlogLayer */}
            <AddNewsLayer />
          </MasterLayout>
        </ProtectedRoute>
    </>
  );
};

export default Page;
