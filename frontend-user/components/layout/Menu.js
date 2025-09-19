import Link from "next/link"
// import { useRouter } from "next/router"

export default function Menu() {
    // const router = useRouter()

    return (
        <>

            {/* <ul className="sub-menu">
                <Link className={router.pathname == "/" ? "active" : ""}>Home Default</Link>
                <Link className={router.pathname == "/index-2" ? "active" : ""}>Home Interior</Link>
            </ul> */}

            <ul className="main-menu__list">
                {/*<li className="dropdown megamenu">*/}
                <li>
                    <Link href="/">Kreu </Link>

                </li>
                <li className="dropdown">
                    <Link href="#">Info</Link>
                    <ul>
                        <li><Link href="/history">Histori</Link></li>
                        <li><Link href="/faq">FAQ</Link></li>
                        <li><Link href="/portfolio-grid">Galeria turistike</Link></li>
                    </ul>
                </li>
                <li>
                    <Link href="/events">Evente</Link>
                </li>
                <li>
                    <Link href="/news">Lajme</Link>
                </li>
                <li>
                    <Link href="/surveys">Pyetësor</Link>
                    {/*<ul>*/}
                    {/*    <li><Link href="/services">Jepni opinionin tuaj</Link></li>*/}
                    {/*    <li><Link href="/departments-1">Pyesi asistentin virtual</Link></li>*/}
                    {/*    <li><Link href="/departments-2">Departments Two</Link></li>*/}
                    {/*    <li><Link href="/departments-details">Departments Details</Link></li>*/}
                    {/*</ul>*/}
                </li>
                <li>
                    <Link href="/contact">Kontakt</Link>
                </li>
            </ul>
        </>
    )
}
