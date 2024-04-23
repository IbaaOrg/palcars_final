import React, { useState, useEffect } from 'react';
import '../../css/app.css'; // You can include your CSS file for styling

function ScrollToTopButton() {
    const [isVisible, setIsVisible] = useState(false);

    // Show button when user scrolls down 20px
    useEffect(() => {
        document.addEventListener("scroll", toggleVisibility);
        return () => {
            document.removeEventListener("scroll", toggleVisibility);
        };
    }, []);

    const toggleVisibility = () => {
        if (window.pageYOffset > 20) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <div className="scroll-to-top">
            {isVisible &&
                <button onClick={scrollToTop}>
                    ↑
                </button>
            }
        </div>
    );
}

export default ScrollToTopButton;
