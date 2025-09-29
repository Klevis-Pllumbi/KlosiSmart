import Breadcrumb from "@/components/Breadcrumb";
import UsersListLayer from "@/components/UsersListLayer";
import MasterLayout from "@/masterLayout/MasterLayout";
import ProtectedRoute from "@/components/ProtectedRoute";

export const metadata = {
  title: "Përdoruesit | KlosiSmart",
};

const Page = () => {
  return (
    <>
        <ProtectedRoute role="ROLE_ADMIN">
            {/* MasterLayout */}
            <MasterLayout>
                {/* Breadcrumb */}
                <Breadcrumb title='Përdoruesit' />

                {/* UsersListLayer */}
                <UsersListLayer />
            </MasterLayout>
        </ProtectedRoute>
    </>
  );
};

export default Page;
