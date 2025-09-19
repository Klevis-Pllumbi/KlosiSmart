import Link from "next/link"
import Menu from "../Menu"
import MobileMenu from "../MobileMenu"
import NavbarAuthIcon from "@/components/elements/NavbarAuthIcon";
import NavbarChatIcon from "@/components/elements/NavbarChatIcon";

export default function Header1({ scroll, isMobileMenu, handleMobileMenu, isSidebar, handlePopup, handleSidebar }) {
    return (
        <>
            <header className={`main-header main-header-one ${scroll ? "fixed-header" : ""}`}>

                {/*Start Main Header One Bottom */}
                <div className="main-header-one__bottom">
                    <nav className="main-menu main-menu-one">
                        <div className="main-menu__wrapper clearfix">
                            <div className="auto-container">
                                <div className="main-menu__wrapper-inner">

                                    <div className="main-header-one__bottom-left">
                                        <div className="logo-box-one">
                                            <Link href="/">
                                                <img src="/assets/images/resources/logo-1.png" alt="Logo" title="" />
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

                                        {/*<div className="main-header-one__bottom-right-number">*/}
                                        {/*    <div className="icon">*/}
                                        {/*        <span className="icon-headphones"></span>*/}
                                        {/*    </div>*/}
                                        {/*    <div className="text">*/}
                                        {/*        <p>Telefononi</p>*/}
                                        {/*        <Link href="tel:3336660000">333 666 0000</Link>*/}
                                        {/*    </div>*/}
                                        {/*</div>*/}

                                        <NavbarAuthIcon />

                                        <NavbarChatIcon />

                                        <div className="main-header-one__bottom-right-btn">
                                            <Link className="btn-one" href="/report">
                                                <span className="txt">Raporto një problem</span>
                                            </Link>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
                {/*End Main Header One Bottom */}

                {/* Sticky Header  */}
                <div className={`stricky-header stricked-menu main-menu ${scroll ? "animated slideInDown" : ""}`}>
                <div className="sticky-header__content">
                <nav className="main-menu main-menu-one">
                    <div className="main-menu__wrapper clearfix">
                        <div className="auto-container">
                            <div className="main-menu__wrapper-inner">

                                <div className="main-header-one__bottom-left">
                                    <div className="logo-box-one">
                                        <Link href="/">
                                            <img src="/assets/images/resources/logo-1.png" alt="Logo" title="" />
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

                                    {/*<div className="main-header-one__bottom-right-number">*/}
                                    {/*    <div className="icon">*/}
                                    {/*        <span className="icon-headphones"></span>*/}
                                    {/*    </div>*/}
                                    {/*    <div className="text">*/}
                                    {/*        <p>Telefononi</p>*/}
                                    {/*        <Link href="tel:3336660000">333 666 0000</Link>*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}

                                    <NavbarAuthIcon />

                                    <NavbarChatIcon />

                                    <div className="main-header-one__bottom-right-btn">
                                        <Link className="btn-one" href="/report">
                                            <span className="txt">Raporto një problem</span>
                                        </Link>
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

                <MobileMenu handleMobileMenu={handleMobileMenu} handleSidebar={handleSidebar} isSidebar={isSidebar} />
            </header>
        </>
    )
}
