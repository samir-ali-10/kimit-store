import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'
import React, { useState } from 'react'

export default function ToTopButton() {

    let [visible, setVisible] = useState("to_top");

    let toTopButton = () => {
        const scrolled = document.documentElement.scrollTop;
        scrolled >= 120 ? setVisible("to_top active") : setVisible("to_top");
    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    window.addEventListener('scroll', toTopButton);

    return (
        <div className={`${visible} bg-info`} onClick={scrollToTop}>
            <FontAwesomeIcon icon={faChevronUp} />
        </div>
    )
}
