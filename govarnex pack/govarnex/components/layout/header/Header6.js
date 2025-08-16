import Menu2 from "../Menu2"
import Link from "next/link"
import MobileMenu2 from "../MobileMenu2"
export default function Header6({ scroll, isMobileMenu, handleMobileMenu, isSidebar, handlePopup, handleSidebar }) {
    return (
        <>
            {/* <header className="main-header header-style-three"> */}
            <header className={`main-header header-style-three ${scroll ? "fixed-header" : ""}`}>
                {/*Start Main Header One Top */}
                <div className="main-header-three__top">
                    <div className="auto-container">
                        <div className="main-header-three__top-inner">

                            <div className="main-header-three__top-left">
                                <ul className="header-contact-info-style1">
                                    <li>
                                        <div className="icon">
                                            <span className="icon-mail-1"></span>
                                        </div>
                                        <div className="text">
                                            <p><Link href="mailto:yourmail@email.com">info@example.com</Link></p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="icon">
                                            <span className="icon-wall-clock"></span>
                                        </div>
                                        <div className="text">
                                            <p>Open Hours: Mon - Fri 8.00 am - 6.00 pm</p>
                                        </div>
                                    </li>
                                </ul>

                                <ul className="header-social-link-style1">
                                    <li><Link href="#"><span className="icon-facebook-app-symbol"></span></Link></li>
                                    <li><Link href="#"><span className="icon-twitter"></span></Link></li>
                                    <li><Link href="#"><span className="icon-instagram"></span></Link></li>
                                </ul>

                                <div className="search-box-style1">
                                    <Link href="#" className="main-menu__search search-toggler icon-search" onClick={handlePopup}></Link>
                                </div>
                            </div>

                            <div className="main-header-three-top-right">
                                <div className="header-btn-style1">
                                    <Link className="btn-one" href="#">
                                        <span className="txt">Report an Issues</span>
                                    </Link>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                {/*End Main Header One Top */}
                {/*Start Main Header One Bottom */}
                <div className="main-header-one__bottom main-header-one__bottom-style3">
                    <nav className="main-menu main-menu-one main-menu-one--three">
                        <div className="main-menu__wrapper clearfix">
                            <div className="auto-container">
                                <div className="main-menu__wrapper-inner">

                                    <div className="main-header-one__bottom-left">
                                        <div className="logo-box-three">
                                            <Link href="/">
                                                <img src="assets/images/resources/logo-1.png" alt="Awesome Logo" title="" />
                                            </Link>
                                        </div>
                                    </div>

                                    <div className="main-header-one__bottom-right">
                                        <div className="main-menu-box">
                                            <Link href="#" className="mobile-nav__toggler" onClick={handleMobileMenu}>
                                                <i className="fa fa-bars"></i>
                                            </Link>
                                            <Menu2 />
                                            
                                        </div>

                                        <div className="main-header-one__bottom-right-number">
                                            <div className="icon">
                                                <span className="icon-headphones"></span>
                                            </div>
                                            <div className="text">
                                                <p>Call Anytime</p>
                                                <Link href="tel:3336660000">333 666 0000</Link>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
                {/*End Main Header One Bottom*/}
                {/* Sticky Header  */}
                <div className={`stricky-header stricked-menu main-menu main-menu-one--three ${scroll ? "animated slideInDown" : ""}`}>
                {/*Start Main Header One Bottom */}
                <div className="main-header-one__bottom main-header-one__bottom-style3">
                    <nav className="main-menu main-menu-one main-menu-one--three">
                        <div className="main-menu__wrapper clearfix">
                            <div className="auto-container">
                                <div className="main-menu__wrapper-inner">

                                    <div className="main-header-one__bottom-left">
                                        <div className="logo-box-three">
                                            <Link href="/">
                                                <img src="assets/images/resources/logo-1.png" alt="Awesome Logo" title="" />
                                            </Link>
                                        </div>
                                    </div>

                                    <div className="main-header-one__bottom-right">
                                        <div className="main-menu-box">
                                            <Link href="#" className="mobile-nav__toggler">
                                                <i className="fa fa-bars"></i>
                                            </Link>
                                            <Menu2 />
                                        </div>

                                        <div className="main-header-one__bottom-right-number">
                                            <div className="icon">
                                                <span className="icon-headphones"></span>
                                            </div>
                                            <div className="text">
                                                <p>Call Anytime</p>
                                                <Link href="tel:3336660000">333 666 0000</Link>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
                {/*End Main Header One Bottom */}
                </div>{/* End Sticky Menu */}
                {/* Mobile Menu  */}
                <MobileMenu2 handleMobileMenu={handleMobileMenu} isSidebar={isSidebar} handleSidebar={handleSidebar} />

            </header>

        </>
    )
}
