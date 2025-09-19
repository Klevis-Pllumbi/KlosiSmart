import Breadcrumb from "@/components/Breadcrumb";
import EventLayer from "@/components/EventLayer";
import MasterLayout from "@/masterLayout/MasterLayout";
import ProtectedRoute from "@/components/ProtectedRoute";

export const metadata = {
    title: "Evente | KlosiSmart",
};

const Page = () => {
    return (
        <>
            <ProtectedRoute role="ROLE_ADMIN">
                {/* MasterLayout */}
                <MasterLayout>
                    {/* Breadcrumb */}
                    <Breadcrumb title='Evente' />

                    <EventLayer />
                </MasterLayout>
            </ProtectedRoute>
        </>
    );
};

export default Page;
