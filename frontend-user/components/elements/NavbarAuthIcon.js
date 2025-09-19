"use client";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { LogOut, UserCircle } from "lucide-react";

const NavbarAuthIcon = () => {
    const { user, logoutUser } = useAuth();

    return (
        <div className="main-header-one__bottom-right-number">
            <ul className="navbar-auth__list">
                {user ? (
                    <li>
                        <button onClick={logoutUser} className="navbar-auth__link" style={{marginRight: "-27px"}}>
                            <LogOut size={25} />
                        </button>
                    </li>
                ) : (
                    <li>
                        <Link href="/login" className="navbar-auth__link" style={{marginTop: "10px", marginRight: "-27px"}}>
                            <UserCircle size={25} style={{marginTop: "10px"}} />
                        </Link>
                    </li>
                )}
            </ul>
        </div>
    );
};

export default NavbarAuthIcon;
