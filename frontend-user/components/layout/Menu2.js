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

            <ul className="main-menu__list one-page-scroll-menu">
                
                
                <li className="scrollToLink"><Link href="#home">Home</Link></li>
                <li className="scrollToLink"><Link href="#about">About</Link></li>
                <li className="scrollToLink"><Link href="#services1">Services</Link></li>
                <li className="scrollToLink"><Link href="#team">Team</Link></li>
                <li className="scrollToLink"> <Link href="#news">News</Link> </li>
                <li className="dropdown">
                    <Link href="#">Pages</Link>
                    <ul>
                        <li><Link href="/">Home Page 01</Link></li>
                        <li><Link href="/index-2">Home Page 02</Link></li>
                        <li><Link href="/index-3">Home Page 03</Link></li>
                    </ul>
                </li>
            </ul>
        </>
    )
}
