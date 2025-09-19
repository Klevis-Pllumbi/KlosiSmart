import Breadcrumb from "@/components/Breadcrumb";
import NewsDetailsLayer from "@/components/child/NewsDetailsLayer";
import MasterLayout from "@/masterLayout/MasterLayout";
import ProtectedRoute from "@/components/ProtectedRoute";

export const metadata = {
  title: "Lajm | KlosiSmart",
};

const Page = ({ params }) => {
  return (
    <>
        <ProtectedRoute role="ROLE_ADMIN">
          {/* MasterLayout */}
          <MasterLayout>
            {/* Breadcrumb */}
            <Breadcrumb title='Lajm - Detaje' />

            <NewsDetailsLayer slug={params.slug} />
          </MasterLayout>
        </ProtectedRoute>
    </>
  );
};

export default Page;
