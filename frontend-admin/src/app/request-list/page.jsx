import Breadcrumb from "@/components/Breadcrumb";
import MasterLayout from "@/masterLayout/MasterLayout";
import RequestListLayer from "@/components/RequestListLayer";
import ProtectedRoute from "@/components/ProtectedRoute";

export const metadata = {
    title: "Raportime/Kërkesa | KlosiSmart",
};

const Page = () => {
    return (
        <>
            <ProtectedRoute role="ROLE_ADMIN">
                {/* MasterLayout */}
                <MasterLayout>
                    {/* Breadcrumb */}
                    <Breadcrumb title='Raportime/Kërkesa - Lista' />

                    {/* InvoiceListLayer */}
                    <RequestListLayer />
                </MasterLayout>
            </ProtectedRoute>
        </>
    );
};

export default Page;
