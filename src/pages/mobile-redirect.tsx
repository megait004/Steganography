import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MobileRedirect: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => {
            const isMobile = /Mobi|Android/i.test(navigator.userAgent) || window.innerWidth <= 768;
            if (isMobile) {
                navigate('/mobile');
            } else {
                navigate('/');
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [navigate]);

    return null;
};

export default MobileRedirect;
