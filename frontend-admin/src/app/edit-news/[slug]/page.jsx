import Breadcrumb from "@/components/Breadcrumb";
import MasterLayout from "@/masterLayout/MasterLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import AddNewsLayer from "@/components/AddNewsLayer";

export const metadata = {
    title: "Lajm | KlosiSmart",
};

const Page = ({ params }) => {
    return (
        <>
            <ProtectedRoute role="ROLE_ADMIN">
                {/* MasterLayout */}
                <MasterLayout>
                    {/* Breadcrumb */}
                    <Breadcrumb title='Lajm - Modifiko' />

                    <AddNewsLayer slug={params.slug} />
                </MasterLayout>
            </ProtectedRoute>
        </>
    );
};

export default Page;
