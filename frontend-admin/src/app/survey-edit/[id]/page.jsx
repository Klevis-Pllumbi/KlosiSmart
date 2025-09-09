import Breadcrumb from "@/components/Breadcrumb";
import MasterLayout from "@/masterLayout/MasterLayout";
import SurveyEditLayer from "@/components/SurveyEditLayer";
import ProtectedRoute from "@/components/ProtectedRoute";

export const metadata = {
    title: "Pyetësor | KlosiSmart",
};

const Page = ({ params }) => {
    return (
        <>
            <ProtectedRoute role="ROLE_ADMIN">
                {/* MasterLayout */}
                <MasterLayout>
                    {/* Breadcrumb */}
                    <Breadcrumb title='Pyetësor - Editim' />

                    {/* InvoiceListLayer */}
                    <SurveyEditLayer surveyId={params.id} />
                </MasterLayout>
            </ProtectedRoute>
        </>
    );
};

export default Page;
