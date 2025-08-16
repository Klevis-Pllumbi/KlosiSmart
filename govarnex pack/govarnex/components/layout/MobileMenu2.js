'use client'
import Link from "next/link"
import { useState } from "react"
export default function MobileMenu({ isSidebar, handleMobileMenu, handleSidebar }) {
    const [isActive, setIsActive] = useState({
        status: false,
        key: "",
    })

    const handleToggle = (key) => {
        if (isActive.key === key) {
            setIsActive({
                status: false,
            })
        } else {
            setIsActive({
                status: true,
                key,
            })
        }
    }
    return (
        <>
            
            {/* End Mobile Menu */}
            <div className="mobile-nav__wrapper">
                <div className="mobile-nav__overlay mobile-nav__toggler" onClick={handleMobileMenu}></div>
                <div className="mobile-nav__content">
                    <span className="mobile-nav__close mobile-nav__toggler" onClick={handleMobileMenu}>
                    <i className="icon-plus"></i>
                    </span>
                    <div className="logo-box">
                    <Link href="/" aria-label="logo image">
                        <img src="assets/images/resources/mobile-nav-logo.png" alt="" />
                    </Link>
                    </div>
                    <div className="mobile-nav__container">
                        <ul className="main-menu__list">
                            
                            <li className="scrollToLink"><Link href="#home" onClick={handleMobileMenu}>Home</Link></li>
                            <li className="scrollToLink"><Link href="#about" onClick={handleMobileMenu}>About</Link></li>
                            <li className="scrollToLink"><Link href="#services1" onClick={handleMobileMenu}>Services</Link></li>
                            <li className="scrollToLink"><Link href="#team" onClick={handleMobileMenu}>Team</Link></li>
                            <li className="scrollToLink"> <Link href="#news" onClick={handleMobileMenu}>News</Link> </li>
                        
                            <li className={isActive.key == 7 ? "dropdown current" : "dropdown"}>
                                <Link href="/#" onClick={handleMobileMenu}>Pages</Link>
                                <ul style={{ display: `${isActive.key == 7 ? "block" : "none"}` }}>
                                    <li><Link href="/" onClick={handleMobileMenu}>Home Page 01</Link></li>
                                    <li><Link href="/index-2" onClick={handleMobileMenu}>Home Page 02</Link></li>
                                    <li><Link href="/index-3" onClick={handleMobileMenu}>Home Page 03</Link></li>
                                </ul>
                                <div className={isActive.key == 7 ? "dropdown-btn open" : "dropdown-btn"} onClick={() => handleToggle(7)}>
                                    <span className="fa fa-angle-right" />
                                </div>
                            </li>
                        </ul>






                    </div>
                    <ul className="mobile-nav__contact list-unstyled">
                    <li>
                        <i className="fa fa-envelope"></i>
                        <a href="mailto:info@example.com">info@example.com</a>
                    </li>
                    <li>
                        <i className="fa fa-phone-alt"></i>
                        <a href="tel:123456789">444 000 777 66</a>
                    </li>
                    </ul>
                    <div className="mobile-nav__social">
                    <a href="#" className="fab fa-twitter"></a>
                    <a href="#" className="fab fa-facebook-square"></a>
                    <a href="#" className="fab fa-pinterest-p"></a>
                    <a href="#" className="fab fa-instagram"></a>
                    </div>
                </div>
            </div>




            <div className="nav-overlay" style={{ display: `${isSidebar ? "block" : "none"}` }} onClick={handleSidebar} />

          

        </>
    )
}
