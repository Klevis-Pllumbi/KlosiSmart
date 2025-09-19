import Breadcrumb from "@/components/Breadcrumb";
import MasterLayout from "@/masterLayout/MasterLayout";
import RequestViewLayer from "@/components/RequestViewLayer";
import ProtectedRoute from "@/components/ProtectedRoute";

export const metadata = {
    title: "Raportim/Kërkesë | KlosiSmart",
};

const Page = ({ params }) => {
    return (
        <>
            <ProtectedRoute role="ROLE_ADMIN">
                {/* MasterLayout */}
                <MasterLayout>
                    {/* Breadcrumb */}
                    <Breadcrumb title='Raport/Kërkesë - Info' />

                    <RequestViewLayer requestId={params.id} />
                </MasterLayout>
            </ProtectedRoute>
        </>
    );
};

export default Page;
