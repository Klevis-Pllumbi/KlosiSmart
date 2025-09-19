import Breadcrumb from "@/components/Breadcrumb";
import MasterLayout from "@/masterLayout/MasterLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import AddEventLayer from "@/components/AddEventLayer";

export const metadata = {
    title: "Event | KlosiSmart",
};

const Page = ({ params }) => {
    return (
        <>
            <ProtectedRoute role="ROLE_ADMIN">
                {/* MasterLayout */}
                <MasterLayout>
                    {/* Breadcrumb */}
                    <Breadcrumb title='Event - Modifiko' />

                    <AddEventLayer slug={params.slug} />
                </MasterLayout>
            </ProtectedRoute>
        </>
    );
};

export default Page;
