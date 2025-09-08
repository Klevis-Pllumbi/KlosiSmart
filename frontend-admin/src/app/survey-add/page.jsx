import Breadcrumb from "@/components/Breadcrumb";
import MasterLayout from "@/masterLayout/MasterLayout";
import SurveyAddLayer from "@/components/SurveyAddLayer";
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
                    <Breadcrumb title='Pyetësor - Shtim' />

                    {/* InvoiceListLayer */}
                    <SurveyAddLayer />
                </MasterLayout>
            </ProtectedRoute>
        </>
    );
};

export default Page;
