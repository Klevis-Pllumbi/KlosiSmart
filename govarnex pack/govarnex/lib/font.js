import { DM_Sans,  Poppins } from 'next/font/google'

export const poppins = Poppins({
    weight: ['400', '500', '600', '700', '800', '900'],
    subsets: ['latin'],
    variable: "--thm-font-2",
    display: 'swap',
})
export const DM_sans = DM_Sans({
    weight: ['400', '500', '600', '700'],
    subsets: ['latin'],
    variable: "--thm-font",
    display: 'swap',
})
