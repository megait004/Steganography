import { HeroHighlight } from "@components/ui/hero-highlight";
import React, { useState } from "react";
import { FloatingDock } from "@components/ui/floating-dock";
import {
    IconHome,
    IconPhotoScan,
    IconBrandGithub,
    IconPhotoPlus,
} from "@tabler/icons-react";
import { Outlet, useLocation } from "react-router-dom";
import MobileRedirect from "@pages/mobile-redirect";

const Layout: React.FC = () => {
    const location = useLocation();
    const [right, setRight] = useState<boolean>(false);

    React.useEffect(() => {
        if (location.pathname === "/create") {
            setRight(true);
        } else {
            setRight(false);
        }
    }, [location]);

    const items = [
        { title: "Home", icon: <IconHome size={24} />, href: "/" },
        { title: "Create", icon: <IconPhotoPlus size={24} />, href: "/create" },
        {
            title: "My Image",
            icon: <IconPhotoScan size={24} />,
            href: "/my-image",
        },
        {
            title: "About Me",
            icon: <IconBrandGithub size={24} />,
            href: "/about-me",
        },
    ];

    return (
        <HeroHighlight className="flex flex-col items-center justify-center font-bold text-white">
            <MobileRedirect />
            <Outlet />
            <FloatingDock
                items={items}
                desktopClassName={`fixed bottom-10 ${right ? "right-10" : "right-0 left-0"} z-10  w-fit`}
                mobileClassName="hidden"
            />
        </HeroHighlight>
    );
};

export default Layout;
