import Breadcrumb from "@/components/Breadcrumb";
import MasterLayout from "@/masterLayout/MasterLayout";
import SurveyResultLayer from "@/components/SurveyResultLayer";
import ProtectedRoute from "@/components/ProtectedRoute";

export const metadata = {
    title: "Rezultate | KlosiSmart",
};

const Page = ({ params }) => {
    return (
        <>
            <ProtectedRoute role="ROLE_ADMIN">
                {/* MasterLayout */}
                <MasterLayout>
                    {/* Breadcrumb */}
                    <Breadcrumb title='Pyetësor - Resultate' />

                    <SurveyResultLayer surveyId={params.id} />
                </MasterLayout>
            </ProtectedRoute>
        </>
    );
};

export default Page;
