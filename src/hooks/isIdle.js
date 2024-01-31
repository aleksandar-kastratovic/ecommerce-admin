import { useState, useEffect } from "react";

export const useIsIdle = () => {
    const [isIdle, setIsIdle] = useState(false);
    const events = ["load", "mousemove", "mousedown", "click", "scroll", "keypress", "touchmove", "resize", "focus", "focusin", "focusout", "touchstart", "touchend", "touchcancel"];

    let timeout;

    const resetTimeout = () => {
        clearTimeout(timeout);
        setIsIdle(false);
        setTimeoutFunc();
    };

    const setTimeoutFunc = () => {
        timeout = window.setTimeout(() => {
            setIsIdle(true);
        }, 5 * 60 * 1000);
    };

    useEffect(() => {
        setTimeoutFunc();
        for (const event of events) {
            window.addEventListener(event, resetTimeout);
        }

        return () => {
            clearTimeout(timeout);
            for (const event of events) {
                window.removeEventListener(event, resetTimeout);
            }
        };
    }, []);
    console.log("isIdle", isIdle);
    return isIdle;
};
