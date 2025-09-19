import ProtectedRoute from "@/components/elements/ProtectedRoute";

export const metadata = {
    title: "Raporto | KlosiSmart",
    description: "Raportoni një problem ose bëni një kërkesë",
};

export default function ReportLayout({ children }) {
    return<>
        <ProtectedRoute>
            {children}
        </ProtectedRoute>
    </>;
}