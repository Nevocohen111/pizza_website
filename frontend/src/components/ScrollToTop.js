
import { FaAngleUp } from 'react-icons/fa';
import React, { useState, useEffect } from 'react';
import "../App.css";

const ScrollToTop = () => {
    const [showTopBtn, setShowTopBtn] = useState(false);



    useEffect(() => {
        document.body.addEventListener("scroll", () => {
            if (document.body.scrollTop > 1000) {
                setShowTopBtn(true);
            } else {
                setShowTopBtn(false);
            }
        });
    }, []);

    const goToTop = () => {
        document.body.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <div className="top-to-btm">
      
        {showTopBtn && (
            <FaAngleUp
                className="icon-position icon-style"
                onClick={goToTop}
            />
        )}
    </div>
    );
};
export default ScrollToTop;