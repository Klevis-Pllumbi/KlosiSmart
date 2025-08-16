import Menu from "../Menu"
import Link from "next/link"
import MobileMenu from "../MobileMenu"

export default function Header2({ scroll, isMobileMenu, handleMobileMenu, isSidebar, handlePopup, handleSidebar }) {
    return (
        <>
            {/* <header className="main-header header-style-two"> */}
            <header className={`main-header header-style-two ${scroll ? "fixed-header" : ""}`}>
                {/* Header Top */}
                <div className="header-top style-two">
                {/*Start Main Header One Top */}
                    <div className="main-header-one--two__top">
                        <div className="auto-container">
                            <div className="main-header-one--two__top-inner">
                                <div className="main-header-one--two__top-left">
                                    <ul className="main-header-one--two__top-contact-info">
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
                                    <ul className="main-header-one__top-left-social-link">
                                        <li><Link href="#"><span className="icon-facebook-app-symbol"></span></Link></li>
                                        <li><Link href="#"><span className="icon-twitter"></span></Link></li>
                                        <li><Link href="#"><span className="icon-instagram"></span></Link></li>
                                    </ul>

                                    <div className="main-header-one--two__top-left-search">
                                        <Link href="#" className="main-menu__search search-toggler icon-search" onClick={handlePopup}>
                                        </Link>
                                    </div>
                                </div>

                                <div className="main-header-one--two__top-right">
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
                <div className="main-header-one__bottom">

                    <nav className="main-menu main-menu-one main-menu-one--two">
                        <div className="main-menu__wrapper clearfix">
                            <div className="auto-container">
                                <div className="main-menu__wrapper-inner">

                                    <div className="main-header-one__bottom-left">
                                        <div className="logo-box-one">
                                            <div className="logo-box-one__bg"
                                                style={{backgroundImage: 'url(assets/images/shapes/home-v2-logo-bg.png)'}}>
                                            </div>
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
                                            <Menu />
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
                {/* Sticky Header  */}
                <div className={`stricky-header stricked-menu main-menu main-menu-one--two ${scroll ? "animated slideInDown" : ""}`}>
                    {/* Header Upper */}
                    <div className="sticky-header__content">
                    <nav className="main-menu main-menu-one main-menu-one--two">
                    <div className="main-menu__wrapper clearfix">
                        <div className="auto-container">
                            <div className="main-menu__wrapper-inner">

                                <div className="main-header-one__bottom-left">
                                    <div className="logo-box-one">
                                        <div className="logo-box-one__bg"
                                            style={{backgroundImage: 'url(assets/images/shapes/home-v2-logo-bg.png)'}}>
                                        </div>
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
                                        <Menu />
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
                </div>
                {/* End Sticky Menu */}
                {/* Mobile Menu  */}
                <MobileMenu handleMobileMenu={handleMobileMenu} isSidebar={isSidebar} handleSidebar={handleSidebar} />

            </header>

        </>
    )
}
