/**
 * Custom wrapper for react-toastify to display toasts with dynamic durations.
 * Provides methods: success, warning, error, and info.
 * Usage example:
 * customToast.success("Message here");
 * customToast.warning("Message here", { position: "bottom-left" });
 */

import { toast } from "react-toastify";

const calculateDuration = (message) => {
    return Math.min(Math.max(message.length * 50, message.length < 20 ? 2000 : 3200), 15000);
};

const customToast = {
    success: (message, options = {}) => {
        toast.success(message, {
            autoClose: calculateDuration(message),
            ...options,
        });
    },
    warning: (message, options = {}) => {
        toast.warning(message, {
            autoClose: calculateDuration(message),
            ...options,
        });
    },
    error: (message, options = {}) => {
        toast.error(message, {
            autoClose: calculateDuration(message),
            ...options,
        });
    },
    info: (message, options = {}) => {
        toast.info(message, {
            autoClose: calculateDuration(message),
            ...options,
        });
    },
};

export default customToast;
