import Breadcrumb from "@/components/Breadcrumb";
import EventDetailsLayer from "@/components/EventDetailsLayer";
import MasterLayout from "@/masterLayout/MasterLayout";
import ProtectedRoute from "@/components/ProtectedRoute";

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
                    <Breadcrumb title='Event - Detaje' />

                    <EventDetailsLayer slug={params.slug} />
                </MasterLayout>
            </ProtectedRoute>
        </>
    );
};

export default Page;
