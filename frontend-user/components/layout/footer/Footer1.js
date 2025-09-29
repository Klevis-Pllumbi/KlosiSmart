import Link from "next/link"

export default function Footer1() {
    return (
        <>
            {/*Start footer area */}
            <footer className="footer-area">
                <div className="footer-area__shape1">
                    <img src="/assets/images/shapes/footer-v1-shape1.png" alt="#" />
                </div>
                {/*Start Footer */}
                <div className="footer">
                    <div className="auto-container">
                        <div className="row">
                            {/*Start single footer widget */}
                            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 wow animated fadeInUp" data-wow-delay="0.1s">
                                <div className="single-footer-widget">
                                    <div className="our-company-info">
                                        <div className="footer-logo-style1">
                                            <Link href="/">
                                                <img src="/assets/images/footer/logo.png" alt="Awesome Logo"
                                                    title="" />
                                            </Link>
                                        </div>
                                        <div className="our-company-info__text">
                                            <p>Një hap drejt një komuniteti më të lidhur, ku informacioni dhe bashkëpunimi janë gjithmonë në dorën tuaj.</p>
                                        </div>
                                        <ul className="our-company-info__social-link">
                                            <li>
                                                <Link href="#"><span className="icon-facebook-app-symbol"></span></Link>
                                            </li>
                                            <li>
                                                <Link href="#"><span className="icon-twitter"></span></Link>
                                            </li>
                                            <li>
                                                <Link href="#"><span className="icon-instagram"></span></Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            {/*End single footer widget */}


                            {/*Start single footer widget */}
                            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 wow animated fadeInUp" data-wow-delay="0.3s">
                                <div className="single-footer-widget single-footer-widget--explore">
                                    <div className="title">
                                        <h3>Eksploro</h3>
                                    </div>
                                    <div className="footer-widget-links">
                                        <ul>
                                            <li><Link href="/tourism">Turizmi</Link></li>
                                            <li><Link href="/events">Eventet</Link></li>
                                            <li><Link href="/news">Lajmet</Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            {/*End single footer widget */}


                            {/*Start single footer widget */}
                            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 wow animated fadeInUp" data-wow-delay="0.5s">
                                <div className="single-footer-widget single-footer-widget--links">
                                    <div className="title">
                                        <h3>Veprime të shpejta</h3>
                                    </div>
                                    <div className="footer-widget-links">
                                        <ul>
                                            <li><Link href="/surveys">Jep opinion</Link></li>
                                            <li><Link href="/report">Raporto</Link></li>
                                            <li><Link href="/contact">Kontakto</Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            {/*End single footer widget */}


                            {/*Start single footer widget */}
                            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 wow animated fadeInUp" data-wow-delay="0.7s">
                                <div className="single-footer-widget footer-widget--contact">
                                    <div className="title">
                                        <h3>Kontakt</h3>
                                    </div>
                                    <div className="footer-widget--contact-info">
                                        <div className="footer-widget--contact-info-text">
                                            <p>Na gjeni pranë bashkisë Klos, çdo ditë jave nga 08:00 - 16:00, ose nëpërmjet aplikacionit</p>
                                        </div>
                                        <ul>
                                            <li>
                                                <div className="icon">
                                                    <span className="icon-pin"></span>
                                                </div>
                                                <div className="text">
                                                    <p>Bashkia Klos</p>
                                                </div>
                                            </li>

                                            <li>
                                                <div className="icon">
                                                    <span className="icon-mail-1"></span>
                                                </div>
                                                <div className="text">
                                                    <p><Link href="mailto:yourmail@email.com">info@klosismart.com</Link></p>
                                                </div>
                                            </li>

                                            <li>
                                                <div className="icon">
                                                    <span className="icon-telephone"></span>
                                                </div>
                                                <div className="text">
                                                    <p><Link href="tel:3336660000">333 666 0000</Link></p>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            {/*End single footer widget */}
                        </div>
                    </div>
                </div>
                {/*End Footer */}

                <div className="footer-bottom">
                    <div className="container">
                        <div className="bottom-inner text-center">
                            <div className="copyright">
                                <p>© 2025 <Link href="#">KlosiSmart</Link> – Të gjitha të drejtat e rezervuara.</p>
                            </div>
                        </div>
                    </div>
                </div>

            </footer>
            {/*End footer area */}

        </>
    )
}
