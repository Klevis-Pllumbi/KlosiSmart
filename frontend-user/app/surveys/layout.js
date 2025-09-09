import ProtectedRoute from "@/components/elements/ProtectedRoute";

export const metadata = {
    title: "Pyetësor | KlosiSmart",
    description: "Jepni opinionin tuaj",
};

export default function SurveyLayout({ children }) {
    return<>
                <ProtectedRoute>
                    {children}
                </ProtectedRoute>
            </>;
}