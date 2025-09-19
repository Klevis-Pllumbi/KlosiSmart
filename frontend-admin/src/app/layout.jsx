import PluginInit from "@/helper/PluginInit";
import "./font.css";
import "./globals.css";
import Providers from "@/app/Provider";
import {PreloaderProvider} from "@/components/child/PreloaderProvider";

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
        <PreloaderProvider />
        <Providers>
            {children}
        </Providers>
        </body>
        </html>
    );
}
