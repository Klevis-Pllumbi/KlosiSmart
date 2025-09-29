'use client'
import Link from "next/link"
import { useState } from "react"
import NavbarAuthIcon from "@/components/elements/NavbarAuthIcon";
import {useAuth} from "@/context/AuthContext";
import {LogOut, UserCircle} from "lucide-react";
import NavbarChatIcon from "@/components/elements/NavbarChatIcon";
import {Icon} from "@iconify/react";
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

    const { user, logoutUser } = useAuth();

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
                        <img src="/assets/images/resources/mobile-nav-logo.png" alt="" />
                    </Link>
                    </div>
                    <div className="mobile-nav__container">
                        <ul className="main-menu__list">
                            <li className={isActive.key == 3 ? "dropdown current" : "dropdown"}>
                                <Link href="/" onClick={handleMobileMenu}>Kreu</Link>
                            </li>


                            <li className={isActive.key == 4 ? "dropdown current" : "dropdown"}>
                                <Link href="/#" onClick={handleMobileMenu}>Info</Link>
                                <ul style={{display: `${isActive.key == 4 ? "block" : "none"}`}}>
                                    <li><Link href="/history" onClick={handleMobileMenu}>Histori</Link></li>
                                </ul>
                                <ul style={{display: `${isActive.key == 4 ? "block" : "none"}`}}>
                                    <li><Link href="/faq" onClick={handleMobileMenu}>FAQ</Link></li>
                                </ul>
                                <div className={isActive.key == 4 ? "dropdown-btn open" : "dropdown-btn"}
                                     onClick={() => handleToggle(4)}>
                                    <span className="fa fa-angle-right"/>
                                </div>
                            </li>
                            <li className={isActive.key == 6 ? "dropdown current" : "dropdown"}>
                                <Link href="/events" onClick={handleMobileMenu}>Evente</Link>
                            </li>
                            <li className={isActive.key == 7 ? "dropdown current" : "dropdown"}>
                                <Link href="/news" onClick={handleMobileMenu}>Lajme</Link>
                            </li>
                            <li className={isActive.key == 7 ? "dropdown current" : "dropdown"}>
                                <Link href="/surveys" onClick={handleMobileMenu}>Pyetësorë</Link>
                            </li>
                            <li><Link href="/contact" onClick={handleMobileMenu}>Kontakt</Link></li>
                            <li><Link href="/report" onClick={handleMobileMenu}>Raporto një problem</Link></li>
                            <li><NavbarAuthIcon/></li>
                            <li><NavbarChatIcon/></li>
                        </ul>


                    </div>
                    <ul className="mobile-nav__contact list-unstyled">
                        {user ? (
                            <li>
                            <button onClick={logoutUser} className="navbar-auth__link">
                                    <LogOut size={25}/>
                                </button>
                            </li>
                        ) : (
                            <li>
                                <Link href="/login" className="navbar-auth__link" style={{marginTop: "10px"}}>
                                    <UserCircle size={25} style={{marginTop: "10px"}}/>
                                </Link>
                            </li>
                        )}
                        <li>
                            <Link href="/virtual-assistant" className="navbar-auth__link"
                                  style={{marginTop: "10px", marginRight: "-20px"}}>
                                <Icon icon="mdi:robot-happy" width="25" height="25" style={{marginTop: "10px"}}/>
                            </Link>
                        </li>
                        <li>
                            <i className="fa fa-envelope"></i>
                            <a href="mailto:pllumbiklevis1@gmail.com">info@klosismart.com</a>
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
