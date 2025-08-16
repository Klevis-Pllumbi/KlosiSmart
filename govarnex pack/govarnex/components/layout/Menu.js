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
                <li className="dropdown megamenu">
                    <Link href="/">Home </Link>
                    <ul>
                        <li>
                            <div className="megamenu-content-box">
                                <div className="container">
                                    <div className="megamenu-content-box__inner">
                                        <div className="row">

                                            {/*Start Home Showcase Item */}
                                            <div className="col-lg-4">
                                                <div className="home-showcase__item">
                                                    <div className="home-showcase__image">
                                                        <img src="assets/images/home-showcase/home-showcase-1-1.jpg"
                                                            alt="" />
                                                        <div className="home-showcase__buttons">
                                                            <Link href="/"
                                                                className="btn-one home-showcase__buttons__item top">
                                                                <span className="txt">Multi
                                                                    Page</span>
                                                            </Link>
                                                            <Link href="/index-one-page"
                                                                className="btn-one home-showcase__buttons__item">
                                                                <span className="txt">One
                                                                    Page</span>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                    <h3 className="home-showcase__title">
                                                        Home Page One
                                                    </h3>
                                                </div>
                                            </div>
                                            {/*End Home Showcase Item */}

                                            {/*Start Home Showcase Item */}
                                            <div className="col-lg-4">
                                                <div className="home-showcase__item">
                                                    <div className="home-showcase__image">
                                                        <img src="assets/images/home-showcase/home-showcase-1-2.jpg"
                                                            alt="" />
                                                        <div className="home-showcase__buttons">
                                                            <Link href="/index-2"
                                                                className="btn-one home-showcase__buttons__item top">
                                                                <span className="txt">Multi
                                                                    Page</span>
                                                            </Link>
                                                            <Link href="/index-2-one-page"
                                                                className="btn-one home-showcase__buttons__item">
                                                                <span className="txt">One
                                                                    Page</span>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                    <h3 className="home-showcase__title">
                                                        Home Page Two
                                                    </h3>
                                                </div>
                                            </div>
                                            {/*End Home Showcase Item */}

                                            {/*Start Home Showcase Item */}
                                            <div className="col-lg-4">
                                                <div className="home-showcase__item">
                                                    <div className="home-showcase__image">
                                                        <img src="assets/images/home-showcase/home-showcase-1-3.jpg"
                                                            alt="" />
                                                        <div className="home-showcase__buttons">
                                                            <Link href="/index-3"
                                                                className="btn-one home-showcase__buttons__item top">
                                                                <span className="txt">Multi
                                                                    Page</span>
                                                            </Link>
                                                            <Link href="/index-3-one-page"
                                                                className="btn-one home-showcase__buttons__item">
                                                                <span className="txt">One
                                                                    Page</span>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                    <h3 className="home-showcase__title">
                                                        Home Page Three
                                                    </h3>
                                                </div>
                                            </div>
                                            {/*End Home Showcase Item */}

                                        </div>
                                    </div>

                                </div>
                            </div>

                        </li>
                    </ul>
                </li>
                <li className="dropdown">
                    <Link href="#">About</Link>
                    <ul>
                        <li><Link href="/about">About Our Company</Link></li>
                        <li><Link href="/history">Our History</Link></li>
                    </ul>
                </li>
                <li className="dropdown">
                    <Link href="#">Services</Link>
                    <ul>
                        <li><Link href="/services">Services</Link></li>
                        <li><Link href="/departments-1">Departments One</Link></li>
                        <li><Link href="/departments-2">Departments Two</Link></li>
                        <li><Link href="/departments-details">Departments Details</Link></li>
                    </ul>
                </li>
                <li className="dropdown">
                    <Link href="#">Pages</Link>
                    <ul>
                        <li><Link href="/testimonials">Testimonials</Link></li>
                        <li><Link href="/faq">Faq</Link></li>
                        <li><Link href="/portfolio-grid">Portfolio One</Link></li>
                        <li><Link href="/portfolio-masonry">Portfolio Two</Link></li>
                        <li><Link href="/team-1">Team One</Link></li>
                        <li><Link href="/team-2">Team Two</Link></li>
                        <li><Link href="/team-details">Team Details</Link></li>
                        <li><Link href="/events-1">Events One</Link></li>
                        <li><Link href="/events-2">Events Two</Link></li>
                        <li><Link href="/event-details">Event Details</Link></li>
                    </ul>
                </li>
                <li className="dropdown">
                    <Link href="#">News</Link>
                    <ul>
                        <li><Link href="/blog-grid">News Grid</Link></li>
                        <li><Link href="/blog-standard">News Standard</Link></li>
                        <li><Link href="/blog-details">News Details</Link></li>
                    </ul>
                </li>
                <li>
                    <Link href="/contact">Contact</Link>
                </li>
            </ul>
        </>
    )
}
