import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../about-me.css";
const AboutMe: React.FC = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const handleRedirection = () => {
            const isMobile =
                /Mobi|Android/i.test(navigator.userAgent) ||
                window.innerWidth <= 768;

            if (isMobile) {
                window.location.href =
                    "https://github.com/megait004/Steganography";
            } else {
                setTimeout(() => {
                    window.open(
                        "https://github.com/megait004/Steganography",
                        "_blank",
                    );
                    navigate(-1);
                }, 2200);
            }
        };

        handleRedirection();
    }, [navigate]);

    return <div className="loader"></div>;
};

export default AboutMe;
