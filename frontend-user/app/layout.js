import "@/node_modules/react-modal-video/css/modal-video.css"

import "public/assets/css/style.css"


import 'swiper/css'
// import "swiper/css/navigation"
import "swiper/css/pagination"
import 'swiper/css/free-mode';
import { DM_sans, poppins } from '@/lib/font'
import {AuthProvider} from "@/context/AuthContext";
import Providers from "@/app/Providers";
import {PreloaderProvider} from "@/components/elements/PreloaderProvider";

export const metadata = {
    title: 'KlosiSmart',
    description: 'KlosiSmart',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en" className={`${poppins.variable} ${DM_sans.variable}`}>
            <body>
                <PreloaderProvider />
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    )
}
