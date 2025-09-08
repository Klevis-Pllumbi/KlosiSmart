import Breadcrumb from "@/components/Breadcrumb";
import MasterLayout from "@/masterLayout/MasterLayout";
import SurveyListLayer from "@/components/SurveyListLayer";
import ProtectedRoute from "@/components/ProtectedRoute";

export const metadata = {
  title: "Pyetësor | KlosiSmart",
};

const Page = () => {
  return (
    <>
        <ProtectedRoute role="ROLE_ADMIN">
            {/* MasterLayout */}
            <MasterLayout>
                {/* Breadcrumb */}
                <Breadcrumb title='Pyetësor - Lista' />

                {/* InvoiceListLayer */}
                <SurveyListLayer />
            </MasterLayout>
        </ProtectedRoute>
    </>
  );
};

export default Page;
