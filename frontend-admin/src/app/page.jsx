import DashBoardLayerOne from "@/components/DashBoardLayerOne";
import MasterLayout from "@/masterLayout/MasterLayout";
import { Breadcrumb } from "react-bootstrap";
import ProtectedRoute from "@/components/ProtectedRoute";

export const metadata = {
    title: "ADMIN | KlosiSmart",
    description:
        "ADMIN | KlosiSmart",
};

const Page = () => {
  return (
    <>
      <ProtectedRoute role="ROLE_ADMIN">
          {/* MasterLayout */}
          <MasterLayout>
              {/* Breadcrumb */}
              <Breadcrumb title='AI' />

              {/* DashBoardLayerOne */}
              <DashBoardLayerOne />
          </MasterLayout>
      </ProtectedRoute>
    </>
  );
};

export default Page;
