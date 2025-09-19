import Link from "next/link";
import { Icon } from "@iconify/react";

const NavbarChatIcon = () => {
    return (
        <div className="main-header-one__bottom-right-number">
            <ul className="navbar-auth__list">
                <li>
                    <Link href="/virtual-assistant" className="navbar-auth__link" style={{ marginTop: "10px", marginRight: "-20px" }}>
                        <Icon icon="mdi:robot-happy" width="25" height="25" style={{ marginTop: "10px" }} />
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default NavbarChatIcon;