import AddEventLayer from "@/components/AddEventLayer";
import Breadcrumb from "@/components/Breadcrumb";
import MasterLayout from "@/masterLayout/MasterLayout";
import ProtectedRoute from "@/components/ProtectedRoute";

export const metadata = {
    title: "Event | KlosiSmart",
};

const Page = () => {
    return (
        <>
            <ProtectedRoute role="ROLE_ADMIN">
                {/* MasterLayout */}
                <MasterLayout>
                    {/* Breadcrumb */}
                    <Breadcrumb title='Event - Shto' />

                    {/* AddBlogLayer */}
                    <AddEventLayer />
                </MasterLayout>
            </ProtectedRoute>
        </>
    );
};

export default Page;
