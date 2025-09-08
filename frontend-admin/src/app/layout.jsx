import PluginInit from "@/helper/PluginInit";
import "./font.css";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

export const metadata = {
    title: "ADMIN | KlosiSmart",
    description:
        "ADMIN | KlosiSmart",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <PluginInit />
        <body suppressHydrationWarning={true}>
        <AuthProvider>
            {children}
        </AuthProvider>
        </body>
        </html>
    );
}
