import Breadcrumb from "@/components/Breadcrumb";
import MasterLayout from "@/masterLayout/MasterLayout";
import RequestMapLayer from "@/components/RequestMapLayer";
import ProtectedRoute from "@/components/ProtectedRoute";

export const metadata = {
    title: "Harta e Raportimeve | KlosiSmart",
};

const Page = () => {
    return (
        <>
            <ProtectedRoute role="ROLE_ADMIN">
                {/* MasterLayout */}
                <MasterLayout>
                    {/* Breadcrumb */}
                    <Breadcrumb title='Raportime/Kërkesa - Harta' />

                    <RequestMapLayer />
                </MasterLayout>
            </ProtectedRoute>
        </>
    );
};

export default Page;
